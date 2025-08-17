/**
 * Password Protection System for Jekyll Blog Posts
 * Provides client-side password protection with session management
 */

class PasswordProtection {
    constructor() {
        this.protectionData = null;
        this.sessionKey = null;
        this.maxAttempts = 5;
        this.attemptCount = 0;
        this.lockoutTime = 15 * 60 * 1000; // 15 minutes in milliseconds
        
        this.init();
    }
    
    init() {
        // Load protection data from script tag
        const dataElement = document.getElementById('protection-data');
        if (!dataElement) {
            console.error('Protection data not found');
            return;
        }
        
        try {
            this.protectionData = JSON.parse(dataElement.textContent);
            this.sessionKey = this.protectionData.sessionKey;
        } catch (error) {
            console.error('Failed to parse protection data:', error);
            return;
        }
        
        // Check if already unlocked in this session
        if (this.isUnlocked()) {
            this.showContent();
            return;
        }
        
        // Check if user is locked out
        if (this.isLockedOut()) {
            this.showLockoutMessage();
            return;
        }
        
        // Set up password form
        this.setupPasswordForm();
        
        // Load attempt count from localStorage
        this.loadAttemptCount();
    }
    
    setupPasswordForm() {
        const form = document.getElementById('password-form');
        const input = document.getElementById('password-input');
        const submitBtn = form.querySelector('.password-submit');
        const errorDiv = document.getElementById('password-error');
        
        if (!form || !input || !submitBtn) {
            console.error('Password form elements not found');
            return;
        }
        
        // Handle form submission
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handlePasswordSubmit(input.value, submitBtn, errorDiv);
        });
        
        // Handle Enter key
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                form.dispatchEvent(new Event('submit'));
            }
        });
        
        // Focus on password input
        input.focus();
        
        // Clear error on input
        input.addEventListener('input', () => {
            this.hideError(errorDiv);
        });
    }
    
    async handlePasswordSubmit(password, submitBtn, errorDiv) {
        if (!password.trim()) {
            this.showError(errorDiv, 'Please enter a password');
            return;
        }
        
        // Show loading state
        this.setLoadingState(submitBtn, true);
        
        try {
            // Add small delay to prevent timing attacks
            await this.delay(Math.random() * 500 + 500);
            
            const isValid = await this.verifyPassword(password);
            
            if (isValid) {
                this.onPasswordSuccess();
            } else {
                this.onPasswordFailure(errorDiv);
            }
        } catch (error) {
            console.error('Password verification error:', error);
            this.showError(errorDiv, 'An error occurred. Please try again.');
        } finally {
            this.setLoadingState(submitBtn, false);
        }
    }
    
    async verifyPassword(password) {
        if (!this.protectionData.passwordHash) {
            console.error('No password hash configured');
            return false;
        }
        
        // Hash the entered password
        const hashedPassword = await this.hashPassword(password);
        
        // Compare with stored hash
        return this.secureCompare(hashedPassword, this.protectionData.passwordHash);
    }
    
    async hashPassword(password) {
        // Use SHA-256 for password hashing
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
    
    secureCompare(a, b) {
        // Timing-safe comparison to prevent timing attacks
        if (a.length !== b.length) {
            return false;
        }
        
        let result = 0;
        for (let i = 0; i < a.length; i++) {
            result |= a.charCodeAt(i) ^ b.charCodeAt(i);
        }
        
        return result === 0;
    }
    
    onPasswordSuccess() {
        // Reset attempt count
        this.attemptCount = 0;
        this.saveAttemptCount();
        
        // Save success state to session storage
        sessionStorage.setItem(this.sessionKey, 'unlocked');
        
        // Show content
        this.showContent();
        
        // Track successful unlock (for analytics)
        this.trackEvent('password_unlock_success');
    }
    
    onPasswordFailure(errorDiv) {
        this.attemptCount++;
        this.saveAttemptCount();
        
        const remainingAttempts = this.maxAttempts - this.attemptCount;
        
        if (remainingAttempts <= 0) {
            this.lockout();
        } else {
            let message = 'Incorrect password. ';
            if (remainingAttempts <= 2) {
                message += `${remainingAttempts} attempt${remainingAttempts === 1 ? '' : 's'} remaining.`;
            } else {
                message += 'Please try again.';
            }
            this.showError(errorDiv, message);
        }
        
        // Track failed attempt
        this.trackEvent('password_unlock_failure', { attemptCount: this.attemptCount });
    }
    
    lockout() {
        const lockoutEnd = Date.now() + this.lockoutTime;
        localStorage.setItem(`${this.sessionKey}_lockout`, lockoutEnd.toString());
        this.showLockoutMessage();
        
        // Track lockout event
        this.trackEvent('password_lockout');
    }
    
    isLockedOut() {
        const lockoutEnd = localStorage.getItem(`${this.sessionKey}_lockout`);
        if (!lockoutEnd) return false;
        
        const now = Date.now();
        const lockoutEndTime = parseInt(lockoutEnd);
        
        if (now < lockoutEndTime) {
            return true;
        } else {
            // Lockout period expired, clear it
            localStorage.removeItem(`${this.sessionKey}_lockout`);
            this.attemptCount = 0;
            this.saveAttemptCount();
            return false;
        }
    }
    
    showLockoutMessage() {
        const container = document.querySelector('.password-form-container');
        if (!container) return;
        
        const lockoutEnd = localStorage.getItem(`${this.sessionKey}_lockout`);
        const timeRemaining = parseInt(lockoutEnd) - Date.now();
        const minutesRemaining = Math.ceil(timeRemaining / (1000 * 60));
        
        container.innerHTML = `
            <div class="lockout-message">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Too Many Failed Attempts</h3>
                <p>You have been temporarily locked out due to too many failed password attempts.</p>
                <p>Please try again in approximately <strong>${minutesRemaining} minute${minutesRemaining === 1 ? '' : 's'}</strong>.</p>
                <button onclick="location.reload()" class="btn btn-secondary">Refresh Page</button>
            </div>
        `;
    }
    
    showContent() {
        const prompt = document.getElementById('password-prompt');
        const content = document.getElementById('protected-post-content');
        
        if (prompt && content) {
            prompt.style.display = 'none';
            content.style.display = 'block';
            
            // Scroll to top of content
            content.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Track content view
        this.trackEvent('protected_content_viewed');
    }
    
    isUnlocked() {
        return sessionStorage.getItem(this.sessionKey) === 'unlocked';
    }
    
    loadAttemptCount() {
        const stored = localStorage.getItem(`${this.sessionKey}_attempts`);
        this.attemptCount = stored ? parseInt(stored) : 0;
    }
    
    saveAttemptCount() {
        localStorage.setItem(`${this.sessionKey}_attempts`, this.attemptCount.toString());
    }
    
    setLoadingState(button, loading) {
        const submitText = button.querySelector('.submit-text');
        const spinner = button.querySelector('.loading-spinner');
        
        if (loading) {
            button.disabled = true;
            submitText.style.display = 'none';
            spinner.style.display = 'inline';
        } else {
            button.disabled = false;
            submitText.style.display = 'inline';
            spinner.style.display = 'none';
        }
    }
    
    showError(errorDiv, message) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        
        // Add shake animation
        errorDiv.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            errorDiv.style.animation = '';
        }, 500);
    }
    
    hideError(errorDiv) {
        errorDiv.style.display = 'none';
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    trackEvent(eventName, data = {}) {
        // Track events for analytics (if available)
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                custom_parameter_1: data,
                page_title: document.title,
                page_location: window.location.href
            });
        }
        
        // Console log for debugging
        console.log(`Password Protection Event: ${eventName}`, data);
    }
}

// Utility class for password management
class PasswordUtils {
    static async generateHash(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
    
    static generateRandomPassword(length = 12) {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
        let password = '';
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        return password;
    }
    
    static showPasswordGenerator() {
        const password = this.generateRandomPassword();
        const hash = this.generateHash(password);
        
        console.log('Generated Password:', password);
        console.log('Password Hash (for front matter):', hash);
        
        // Also show in alert for easy copying
        alert(`Generated Password: ${password}\n\nAdd this to your post front matter:\npassword_hash: "${hash}"`);
    }
}

// CSS for additional animations and styles
const additionalStyles = `
<style>
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.lockout-message {
    text-align: center;
    padding: 2rem;
    background: #fff3cd;
    border: 1px solid #ffeaa7;
    border-radius: 0.5rem;
    color: #856404;
}

.lockout-message i {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #dc3545;
}

.lockout-message h3 {
    margin-bottom: 1rem;
    color: #721c24;
}

.btn-secondary {
    background: #6c757d;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
    margin-top: 1rem;
}

.btn-secondary:hover {
    background: #545b62;
}
</style>
`;

// Initialize password protection when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add additional styles
    document.head.insertAdjacentHTML('beforeend', additionalStyles);
    
    // Initialize password protection
    window.passwordProtection = new PasswordProtection();
    
    // Make utility functions available globally (for development)
    window.PasswordUtils = PasswordUtils;
});

// Add console helper for developers
console.log('Password Protection System Loaded');
console.log('Use PasswordUtils.showPasswordGenerator() to generate a new password and hash');