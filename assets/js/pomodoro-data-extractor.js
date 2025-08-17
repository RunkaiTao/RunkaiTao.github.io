/**
 * Pomodoro Data Extractor
 * Helper script to extract data from Marinara Pomodoro Extension
 * 
 * Instructions:
 * 1. Open Chrome with Marinara extension
 * 2. Go to chrome-extension://lojgmehidjdhhbmpjfamhpkpodfcodef/modules/options.html#/history
 * 3. Open browser console (F12)
 * 4. Paste this script and run it
 * 5. Copy the output to update _data/activity.yml
 */

function extractPomodoroData() {
    console.log('🍅 Pomodoro Data Extractor');
    console.log('Attempting to extract data from Marinara extension...');
    
    // Method 1: Try to access extension's local storage
    try {
        chrome.storage.local.get(null, (data) => {
            console.log('Extension data:', data);
            processMarinaraData(data);
        });
    } catch (error) {
        console.log('Chrome storage API not available, trying alternative methods...');
        tryAlternativeMethods();
    }
}

function processMarinaraData(data) {
    const pomodoroSessions = {};
    
    // Look for pomodoro session data in various possible formats
    Object.keys(data).forEach(key => {
        if (key.includes('pomodoro') || key.includes('session') || key.includes('history')) {
            console.log(`Found potential data in key: ${key}`, data[key]);
            
            // Try to parse date-based session data
            if (Array.isArray(data[key])) {
                data[key].forEach(session => {
                    if (session.date || session.timestamp) {
                        const date = new Date(session.date || session.timestamp);
                        const dateStr = date.toISOString().split('T')[0];
                        pomodoroSessions[dateStr] = (pomodoroSessions[dateStr] || 0) + 1;
                    }
                });
            }
        }
    });
    
    if (Object.keys(pomodoroSessions).length > 0) {
        outputPomodoroYAML(pomodoroSessions);
    } else {
        console.log('No pomodoro session data found. Trying manual extraction...');
        manualExtractionInstructions();
    }
}

function tryAlternativeMethods() {
    console.log('Trying alternative extraction methods...');
    
    // Method 2: Look for DOM elements that might contain session data
    const historyElements = document.querySelectorAll('[class*="history"], [class*="session"], [class*="pomodoro"]');
    
    if (historyElements.length > 0) {
        console.log('Found potential history elements:', historyElements);
        
        // Try to extract data from visible elements
        historyElements.forEach((element, index) => {
            console.log(`Element ${index}:`, element.textContent);
        });
    }
    
    // Method 3: Look for data in local storage with common keys
    const commonKeys = ['pomodoro', 'marinara', 'sessions', 'history', 'stats'];
    const foundData = {};
    
    commonKeys.forEach(key => {
        const data = localStorage.getItem(key);
        if (data) {
            try {
                foundData[key] = JSON.parse(data);
                console.log(`Found data in localStorage['${key}']:`, foundData[key]);
            } catch (e) {
                foundData[key] = data;
                console.log(`Found raw data in localStorage['${key}']:`, data);
            }
        }
    });
    
    if (Object.keys(foundData).length === 0) {
        manualExtractionInstructions();
    }
}

function outputPomodoroYAML(sessions) {
    console.log('\n📊 Extracted Pomodoro Data (YAML format):');
    console.log('Copy the following to your _data/activity.yml file:\n');
    
    const yamlOutput = Object.entries(sessions)
        .sort(([a], [b]) => b.localeCompare(a)) // Sort by date descending
        .map(([date, count]) => `  ${date}: ${count}`)
        .join('\n');
    
    console.log('pomodoro:');
    console.log(yamlOutput);
    
    console.log('\n📋 Quick copy format for manual entry:');
    Object.entries(sessions)
        .sort(([a], [b]) => b.localeCompare(a))
        .slice(0, 10) // Show last 10 days
        .forEach(([date, count]) => {
            console.log(`${date}: ${count} sessions`);
        });
}

function manualExtractionInstructions() {
    console.log('\n📖 Manual Extraction Instructions:');
    console.log('Since automatic extraction isn\'t working, here\'s how to manually get your data:');
    console.log('');
    console.log('1. Look at the Marinara extension history page');
    console.log('2. For each day, count the completed pomodoro sessions');
    console.log('3. Update your _data/activity.yml file with the format:');
    console.log('   pomodoro:');
    console.log('     2024-12-16: 8  # Replace with actual count');
    console.log('     2024-12-15: 6');
    console.log('     # etc...');
    console.log('');
    console.log('4. Alternative: Export data if the extension supports it');
    console.log('5. Set up a daily routine to update the count');
    
    // Try to help with current day
    const today = new Date().toISOString().split('T')[0];
    console.log(`\n⏰ Today is ${today} - how many pomodoros have you completed?`);
}

// Enhanced extractor that works with different extension formats
function universalPomodoroExtractor() {
    console.log('🔍 Universal Pomodoro Data Extractor');
    
    // Check for various pomodoro extension signatures
    const extensions = [
        {
            name: 'Marinara',
            check: () => window.location.href.includes('lojgmehidjdhhbmpjfamhpkpodfcodef'),
            extract: extractMarinaraData
        },
        {
            name: 'Forest',
            check: () => document.querySelector('[class*="forest"]'),
            extract: extractForestData
        },
        {
            name: 'Toggl',
            check: () => document.querySelector('[class*="toggl"]'),
            extract: extractTogglData
        },
        {
            name: 'Generic',
            check: () => true,
            extract: extractGenericData
        }
    ];
    
    const detectedExtension = extensions.find(ext => ext.check());
    
    if (detectedExtension) {
        console.log(`📱 Detected: ${detectedExtension.name}`);
        detectedExtension.extract();
    }
}

function extractMarinaraData() {
    // Marinara-specific extraction
    console.log('Extracting from Marinara extension...');
    extractPomodoroData();
}

function extractForestData() {
    console.log('Forest app not directly supported. Please export manually.');
    manualExtractionInstructions();
}

function extractTogglData() {
    console.log('Toggl detected. Looking for time tracking data...');
    // Could potentially integrate with Toggl API
    manualExtractionInstructions();
}

function extractGenericData() {
    console.log('Generic extraction mode...');
    tryAlternativeMethods();
}

// Utility function to generate sample data for testing
function generateSamplePomodoroData(days = 30) {
    console.log(`🧪 Generating ${days} days of sample pomodoro data:`);
    
    const sampleData = {};
    const today = new Date();
    
    for (let i = 0; i < days; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        // Generate realistic pomodoro counts (0-8 sessions per day)
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
        const baseActivity = isWeekend ? 0.4 : 0.8;
        
        if (Math.random() < baseActivity) {
            const sessions = Math.floor(Math.random() * 8) + 1;
            sampleData[dateStr] = sessions;
        }
    }
    
    outputPomodoroYAML(sampleData);
}

// Main execution
console.log('🚀 Pomodoro Data Extractor loaded!');
console.log('Available functions:');
console.log('- extractPomodoroData(): Extract from current page');
console.log('- universalPomodoroExtractor(): Try multiple extraction methods');
console.log('- generateSamplePomodoroData(30): Generate sample data for testing');
console.log('');
console.log('Run one of these functions to get started!');

// Auto-run if we detect we're on a pomodoro extension page
if (window.location.href.includes('pomodoro') || 
    window.location.href.includes('marinara') ||
    window.location.href.includes('lojgmehidjdhhbmpjfamhpkpodfcodef')) {
    
    console.log('🎯 Pomodoro extension detected! Auto-running extraction...');
    setTimeout(() => {
        universalPomodoroExtractor();
    }, 1000);
}