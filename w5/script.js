// Space Explorer JavaScript 

// DOM Elements
const rocketElement = document.getElementById('rocket');
const launchBtn = document.getElementById('launch-btn');
const toggleBtn = document.getElementById('toggle-btn');
const addAlienBtn = document.getElementById('add-alien-btn');
const messageDisplay = document.getElementById('message-display');
const missionStatus = document.getElementById('mission-status');
const fuelElement = document.getElementById('fuel');
const fuelPercentage = document.getElementById('fuel-percentage');
const alienContainer = document.getElementById('alien-container');
const starsContainer = document.getElementById('stars-container');
const spaceScene = document.querySelector('.space-scene');

// Variables
let isNightMode = false;
let isLaunched = false;
let fuelLevel = 100;
let messageIndex = 0;
let alienCount = 0;
const maxAliens = 5;
let fuelInterval;

// Fun messages for the message display
const funMessages = [
    "Welcome, Commander! Your mission awaits.",
    "Houston, we have a party! 🎉",
    "One small click for you, one giant leap for web development!",
    "The stars look beautiful tonight, don't they?",
    "Aliens are friendly... most of the time!",
    "Space fact: You can't hear screams in space. Or bad jokes.",
    "Warning: Excessive clicking may cause spontaneous dancing.",
    "Ground Control to Major Tom: Are you having fun yet?",
    "Remember: In space, no one can hear you debug.",
    "Fun fact: The universe is expanding. Just like your coding skills!"
];

// Emoji collection for aliens
const alienEmojis = ['👽', '👾', '🛸', '🤖', '👹', '🧞‍♂️', '🧚‍♀️', '🧛‍♂️'];

// Initialize the page
function initPage() {
    createStars(50);
    updateFuelDisplay();
    
    // Set up event listeners
    launchBtn.addEventListener('click', handleLaunch);
    toggleBtn.addEventListener('click', toggleNightMode);
    addAlienBtn.addEventListener('click', addAlien);
    document.addEventListener('keydown', handleKeyPress);
}

// Create stars in the space scene
function createStars(count) {
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random size between 1 and 3 pixels
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Random animation delay
        star.style.animationDelay = `${Math.random() * 1}s`;
        
        // Add to container and hide initially
        starsContainer.appendChild(star);
        star.style.display = 'none';
    }
}

// Show or hide stars based on night mode
function toggleStars(show) {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.style.display = show ? 'block' : 'none';
    });
}

// Toggle night mode
function toggleNightMode() {
    isNightMode = !isNightMode;
    document.body.classList.toggle('night-mode', isNightMode);
    toggleStars(isNightMode);
    
    // Update message display
    if (isNightMode) {
        changeMessage("Night mode activated! Watch the stars twinkle! ✨");
    } else {
        changeMessage("Daytime restored! Time to soak up some virtual sun. ☀️");
    }
}

// Handle rocket launch
function handleLaunch() {
    if (isLaunched || fuelLevel < 20) {
        changeMessage(fuelLevel < 20 ? "Not enough fuel for launch! Add more fuel!" : "Rocket already launched! Reload to try again.");
        return;
    }
    
    isLaunched = true;
    rocketElement.classList.add('launched');
    missionStatus.textContent = "Mission Status: Launch in Progress!";
    launchBtn.disabled = true;
    
    // Start fuel consumption
    startFuelConsumption();
    
    // Change message after delay
    setTimeout(() => {
        missionStatus.textContent = "Mission Status: Mission Accomplished!";
        changeMessage("Rocket successfully launched! Congratulations, Commander! 🎯");
    }, 3000);
}

// Start consuming fuel
function startFuelConsumption() {
    fuelInterval = setInterval(() => {
        fuelLevel -= 5;
        if (fuelLevel <= 0) {
            fuelLevel = 0;
            clearInterval(fuelInterval);
        }
        updateFuelDisplay();
    }, 300);
}

// Update fuel display
function updateFuelDisplay() {
    fuelElement.value = fuelLevel;
    fuelPercentage.textContent = `${fuelLevel}%`;
    
    // Change color based on fuel level
    if (fuelLevel < 30) {
        fuelElement.style.accentColor = '#f44336'; // Red for low fuel
    } else if (fuelLevel < 60) {
        fuelElement.style.accentColor = '#ff9800'; // Orange for medium fuel
    } else {
        fuelElement.style.accentColor = '#4CAF50'; // Green for high fuel
    }
}

// Add alien to the scene
function addAlien() {
    if (alienCount >= maxAliens) {
        changeMessage("Whoa! Too many aliens already! The mothership is full! 🛸");
        return;
    }
    
    // Create alien element
    const alien = document.createElement('div');
    alien.classList.add('alien');
    
    // Pick random alien emoji
    const randomEmoji = alienEmojis[Math.floor(Math.random() * alienEmojis.length)];
    alien.textContent = randomEmoji;
    
    // Random position
    alien.style.left = `${Math.random() * 80 + 10}%`;
    
    // Add click handler to remove alien
    alien.addEventListener('click', function() {
        this.style.transform = 'scale(0)';
        this.style.opacity = '0';
        this.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            this.remove();
            alienCount--;
            changeMessage(`Alien ${randomEmoji} returned to its home planet! Safe travels!`);
        }, 500);
    });
    
    // Add to container
    alienContainer.appendChild(alien);
    alienCount++;
    
    changeMessage(`A wild ${randomEmoji} appeared! Click on it to send it home.`);
    
    // Add some fuel when alien is added
    fuelLevel = Math.min(100, fuelLevel + 10);
    updateFuelDisplay();
}

// Change message with animation
function changeMessage(message) {
    messageDisplay.style.opacity = 0;
    
    setTimeout(() => {
        messageDisplay.textContent = message;
        messageDisplay.style.opacity = 1;
    }, 300);
}

// Cycle through fun messages
function cycleMessage() {
    messageIndex = (messageIndex + 1) % funMessages.length;
    changeMessage(funMessages[messageIndex]);
}

// Handle keyboard shortcuts
function handleKeyPress(e) {
    switch(e.key) {
        case 'l':
        case 'L':
            handleLaunch();
            break;
        case 'n':
        case 'N':
            toggleNightMode();
            break;
        case 'a':
        case 'A':
            addAlien();
            break;
        case 'm':
        case 'M':
            cycleMessage();
            break;
    }
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', initPage);