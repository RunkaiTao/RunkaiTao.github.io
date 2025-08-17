---
permalink: /admin/password-generator/
title: "Password Hash Generator"
layout: single
author_profile: false
sitemap: false
robots: noindex, nofollow
---

# Password Hash Generator

This utility helps you generate secure password hashes for protected blog posts.

<div class="password-generator-container">
  <div class="generator-section">
    <h3>Generate Hash from Password</h3>
    <div class="input-group">
      <label for="password-input">Enter Password:</label>
      <input type="password" id="password-input" class="form-input" placeholder="Enter your password">
      <button id="generate-hash" class="btn-primary">Generate Hash</button>
    </div>
    
    <div id="hash-output" class="output-section" style="display: none;">
      <h4>Generated Hash:</h4>
      <div class="hash-display">
        <code id="hash-value"></code>
        <button id="copy-hash" class="btn-secondary">Copy</button>
      </div>
      
      <h4>Front Matter Example:</h4>
      <div class="code-block">
        <pre id="front-matter-example"></pre>
        <button id="copy-front-matter" class="btn-secondary">Copy</button>
      </div>
    </div>
  </div>
  
  <div class="generator-section">
    <h3>Generate Random Password</h3>
    <div class="input-group">
      <label for="length-input">Password Length:</label>
      <input type="number" id="length-input" class="form-input" value="12" min="8" max="32">
      <button id="generate-random" class="btn-primary">Generate Random Password</button>
    </div>
    
    <div id="random-output" class="output-section" style="display: none;">
      <h4>Generated Password:</h4>
      <div class="password-display">
        <code id="random-password"></code>
        <button id="copy-password" class="btn-secondary">Copy</button>
      </div>
      
      <h4>Hash for this Password:</h4>
      <div class="hash-display">
        <code id="random-hash"></code>
        <button id="copy-random-hash" class="btn-secondary">Copy</button>
      </div>
      
      <h4>Complete Front Matter:</h4>
      <div class="code-block">
        <pre id="complete-front-matter"></pre>
        <button id="copy-complete" class="btn-secondary">Copy</button>
      </div>
    </div>
  </div>
  
  <div class="help-section">
    <h3>How to Use</h3>
    <ol>
      <li><strong>Choose a password</strong> or generate a random one</li>
      <li><strong>Copy the hash</strong> from the output above</li>
      <li><strong>Add to your post's front matter</strong>:
        <pre>---
layout: protected
protected: true
password_hash: "your_generated_hash_here"
password_hint: "Optional hint for users"
---</pre>
      </li>
      <li><strong>Share the password</strong> with authorized readers</li>
    </ol>
    
    <div class="security-notes">
      <h4>Security Notes:</h4>
      <ul>
        <li>Passwords are hashed using SHA-256</li>
        <li>Never store plain passwords in your post files</li>
        <li>Use strong, unique passwords for sensitive content</li>
        <li>Consider using different passwords for different posts</li>
        <li>This tool works entirely in your browser - no data is sent to servers</li>
      </ul>
    </div>
  </div>
</div>

<style>
.password-generator-container {
  max-width: 800px;
  margin: 0 auto;
}

.generator-section {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 0.5rem;
  padding: 2rem;
  margin-bottom: 2rem;
}

.generator-section h3 {
  margin-top: 0;
  color: #333;
  border-bottom: 2px solid #007bff;
  padding-bottom: 0.5rem;
}

.input-group {
  margin-bottom: 1rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}

.form-input {
  width: 100%;
  max-width: 300px;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  font-size: 1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
}

.btn-primary {
  background: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.15s ease-in-out;
}

.btn-primary:hover {
  background: #0056b3;
}

.btn-secondary {
  background: #6c757d;
  color: white;
  border: none;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;
  margin-left: 0.5rem;
}

.btn-secondary:hover {
  background: #545b62;
}

.output-section {
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  padding: 1.5rem;
  margin-top: 1rem;
}

.output-section h4 {
  margin-top: 0;
  color: #333;
  font-size: 1.1rem;
}

.hash-display, .password-display {
  display: flex;
  align-items: center;
  background: #f8f9fa;
  padding: 0.75rem;
  border-radius: 0.25rem;
  border: 1px solid #e9ecef;
  margin-bottom: 1rem;
}

.hash-display code, .password-display code {
  flex: 1;
  background: none;
  color: #e83e8c;
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 0.9rem;
  word-break: break-all;
}

.code-block {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 0.25rem;
  padding: 1rem;
  position: relative;
  margin-bottom: 1rem;
}

.code-block pre {
  margin: 0;
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 0.875rem;
  color: #333;
  white-space: pre-wrap;
}

.help-section {
  background: #e7f3ff;
  border: 1px solid #b8daff;
  border-radius: 0.5rem;
  padding: 2rem;
}

.help-section h3 {
  margin-top: 0;
  color: #004085;
}

.help-section ol {
  padding-left: 1.5rem;
}

.help-section li {
  margin-bottom: 0.5rem;
}

.security-notes {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 0.25rem;
  padding: 1rem;
  margin-top: 1.5rem;
}

.security-notes h4 {
  margin-top: 0;
  color: #856404;
}

.security-notes ul {
  margin-bottom: 0;
  padding-left: 1.5rem;
}

.security-notes li {
  margin-bottom: 0.25rem;
  color: #856404;
}

@media (max-width: 576px) {
  .generator-section {
    padding: 1rem;
  }
  
  .form-input {
    max-width: 100%;
    margin-right: 0;
  }
  
  .hash-display, .password-display {
    flex-direction: column;
    align-items: stretch;
  }
  
  .btn-secondary {
    margin-left: 0;
    margin-top: 0.5rem;
  }
}
</style>

<script>
class PasswordHashGenerator {
  constructor() {
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    document.getElementById('generate-hash').addEventListener('click', () => {
      this.generateHashFromPassword();
    });
    
    document.getElementById('generate-random').addEventListener('click', () => {
      this.generateRandomPassword();
    });
    
    document.getElementById('password-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.generateHashFromPassword();
      }
    });
    
    // Copy button event listeners
    document.getElementById('copy-hash').addEventListener('click', () => {
      this.copyToClipboard(document.getElementById('hash-value').textContent);
    });
    
    document.getElementById('copy-front-matter').addEventListener('click', () => {
      this.copyToClipboard(document.getElementById('front-matter-example').textContent);
    });
    
    document.getElementById('copy-password').addEventListener('click', () => {
      this.copyToClipboard(document.getElementById('random-password').textContent);
    });
    
    document.getElementById('copy-random-hash').addEventListener('click', () => {
      this.copyToClipboard(document.getElementById('random-hash').textContent);
    });
    
    document.getElementById('copy-complete').addEventListener('click', () => {
      this.copyToClipboard(document.getElementById('complete-front-matter').textContent);
    });
  }
  
  async generateHashFromPassword() {
    const passwordInput = document.getElementById('password-input');
    const password = passwordInput.value.trim();
    
    if (!password) {
      alert('Please enter a password');
      return;
    }
    
    try {
      const hash = await this.hashPassword(password);
      this.displayHashResult(hash, password);
    } catch (error) {
      console.error('Error generating hash:', error);
      alert('Error generating hash. Please try again.');
    }
  }
  
  async generateRandomPassword() {
    const lengthInput = document.getElementById('length-input');
    const length = parseInt(lengthInput.value) || 12;
    
    const password = this.createRandomPassword(length);
    const hash = await this.hashPassword(password);
    
    this.displayRandomResult(password, hash);
  }
  
  async hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  
  createRandomPassword(length) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  }
  
  displayHashResult(hash, password) {
    document.getElementById('hash-value').textContent = hash;
    
    const frontMatter = `layout: protected
protected: true
password_hash: "${hash}"
password_hint: "Add a hint here (optional)"`;
    
    document.getElementById('front-matter-example').textContent = frontMatter;
    document.getElementById('hash-output').style.display = 'block';
  }
  
  displayRandomResult(password, hash) {
    document.getElementById('random-password').textContent = password;
    document.getElementById('random-hash').textContent = hash;
    
    const frontMatter = `---
title: "Your Protected Post Title"
layout: protected
protected: true
password_hash: "${hash}"
password_hint: "Contact me for access"
categories:
  - Private
tags:
  - confidential
---`;
    
    document.getElementById('complete-front-matter').textContent = frontMatter;
    document.getElementById('random-output').style.display = 'block';
  }
  
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      this.showCopySuccess();
    } catch (error) {
      // Fallback for older browsers
      this.fallbackCopyTextToClipboard(text);
    }
  }
  
  fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      this.showCopySuccess();
    } catch (error) {
      console.error('Failed to copy text: ', error);
    }
    
    document.body.removeChild(textArea);
  }
  
  showCopySuccess() {
    // Create a temporary success message
    const message = document.createElement('div');
    message.textContent = 'Copied to clipboard!';
    message.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #28a745;
      color: white;
      padding: 0.75rem 1rem;
      border-radius: 0.25rem;
      z-index: 9999;
      animation: fadeInOut 2s ease-in-out;
    `;
    
    document.body.appendChild(message);
    setTimeout(() => {
      document.body.removeChild(message);
    }, 2000);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PasswordHashGenerator();
});

// Add fade animation
const style = document.createElement('style');
style.textContent = `
@keyframes fadeInOut {
  0% { opacity: 0; transform: translateY(-10px); }
  20% { opacity: 1; transform: translateY(0); }
  80% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-10px); }
}
`;
document.head.appendChild(style);
</script>