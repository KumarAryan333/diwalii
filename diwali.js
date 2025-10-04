// Diwali Website JavaScript
let audioEnabled = false;
let audioContext = null;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeAudio();
    createParticleEffects();
    startContinuousAnimations();
    addClickEffects();
    console.log('🎆 Happy Diwali Website Loaded! 🎆');
});

// Audio Functions
function initializeAudio() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        console.log('Web Audio API not supported');
    }
}

function playDiwaliSound(type = 'burst') {
    if (!audioEnabled || !audioContext) return;
    
    try {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        switch (type) {
            case 'burst':
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.3);
                break;
                
            case 'firework':
                oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.2);
                gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.5);
                break;
                
            case 'sparkle':
                oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(2000, audioContext.currentTime + 0.1);
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.2);
                break;
        }
    } catch (e) {
        console.log('Audio playback error:', e);
    }
}

function toggleAudio() {
    audioEnabled = !audioEnabled;
    const audioBtn = document.querySelector('.audio-btn i');
    
    if (audioEnabled) {
        audioBtn.className = 'fas fa-volume-up';
        audioBtn.parentElement.style.background = 'linear-gradient(45deg, #10b981, #059669)';
        showNotification('🔊 Audio enabled! Enjoy the festive sounds!', 'success');
        
        // Play a welcome sound
        setTimeout(() => playDiwaliSound('sparkle'), 500);
    } else {
        audioBtn.className = 'fas fa-volume-mute';
        audioBtn.parentElement.style.background = 'linear-gradient(45deg, #6b7280, #4b5563)';
        showNotification('🔇 Audio muted', 'info');
    }
}

// Cracker Burst Function
function burstCracker(element) {
    // Add burst animation to the clicked cracker
    element.style.animation = 'none';
    element.style.transform = 'scale(1.2)';
    
    // Play sound
    playDiwaliSound('burst');
    
    // Create explosion effect
    createExplosionEffect(element);
    
    // Create particles
    createBurstParticles(element);
    
    // Show burst message
    showBurstMessage(element);
    
    // Reset animation after a delay
    setTimeout(() => {
        element.style.animation = '';
        element.style.transform = '';
    }, 1000);
    
    // Add celebration effect
    createCelebrationEffect();
}

function createExplosionEffect(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create explosion circle
    const explosion = document.createElement('div');
    explosion.style.cssText = `
        position: fixed;
        left: ${centerX - 50}px;
        top: ${centerY - 50}px;
        width: 100px;
        height: 100px;
        background: radial-gradient(circle, rgba(255, 215, 0, 0.8), rgba(255, 107, 107, 0.6), transparent);
        border-radius: 50%;
        animation: explosionEffect 1s ease-out forwards;
        z-index: 1000;
        pointer-events: none;
    `;
    
    document.body.appendChild(explosion);
    
    // Remove after animation
    setTimeout(() => {
        if (explosion.parentNode) {
            explosion.remove();
        }
    }, 1000);
}

function createBurstParticles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create multiple particles
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.innerHTML = '✨';
        particle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            font-size: 1rem;
            animation: particleExplosion 2s ease-out forwards;
            animation-delay: ${i * 0.05}s;
            z-index: 1001;
            pointer-events: none;
        `;
        
        document.body.appendChild(particle);
        
        // Remove after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 2000);
    }
}

function showBurstMessage(element) {
    const messages = [
        '🎆 Amazing! 🎆',
        '✨ Fantastic! ✨',
        '🎊 Wonderful! 🎊',
        '💥 Awesome! 💥',
        '🌟 Brilliant! 🌟',
        '🎇 Spectacular! 🎇',
        '💫 Incredible! 💫',
        '🔥 Excellent! 🔥'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    const messageDiv = document.createElement('div');
    messageDiv.textContent = randomMessage;
    messageDiv.style.cssText = `
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 2rem;
        font-weight: bold;
        color: #ffd700;
        text-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
        animation: messageBurst 2s ease-out forwards;
        z-index: 1002;
        pointer-events: none;
    `;
    
    document.body.appendChild(messageDiv);
    
    // Remove after animation
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 2000);
}

function createCelebrationEffect() {
    // Create floating hearts
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = ['💖', '💕', '💗', '💝', '💘'][Math.floor(Math.random() * 5)];
            heart.style.cssText = `
                position: fixed;
                left: ${Math.random() * window.innerWidth}px;
                top: ${window.innerHeight}px;
                font-size: 1.5rem;
                animation: heartFloat 3s ease-out forwards;
                z-index: 1003;
                pointer-events: none;
            `;
            
            document.body.appendChild(heart);
            
            // Remove after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.remove();
                }
            }, 3000);
        }, i * 200);
    }
}

// Fireworks Function
function triggerFireworks() {
    playDiwaliSound('firework');
    
    // Create multiple fireworks
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createSingleFirework();
        }, i * 300);
    }
    
    // Show fireworks message
    setTimeout(() => {
        showNotification('🎆 Fireworks launched! Enjoy the show! 🎆', 'success');
    }, 1000);
}

function createSingleFirework() {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * (window.innerHeight * 0.6) + 100;
    
    // Create firework burst
    const firework = document.createElement('div');
    firework.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: radial-gradient(circle, #ffd700, #ff6b6b);
        border-radius: 50%;
        animation: customFireworkBurst 3s ease-out forwards;
        z-index: 1004;
        pointer-events: none;
    `;
    
    document.body.appendChild(firework);
    
    // Create sparkle particles
    for (let i = 0; i < 16; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            font-size: 0.8rem;
            animation: sparkleExplosion 2.5s ease-out forwards;
            animation-delay: ${i * 0.1}s;
            z-index: 1005;
            pointer-events: none;
        `;
        
        document.body.appendChild(sparkle);
        
        // Remove after animation
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.remove();
            }
        }, 2500);
    }
    
    // Remove firework after animation
    setTimeout(() => {
        if (firework.parentNode) {
            firework.remove();
        }
    }, 3000);
}

// Particle Effects
function createParticleEffects() {
    const particlesContainer = document.getElementById('particles');
    
    // Create floating particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 215, 0, 0.6);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${5 + Math.random() * 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// Continuous Animations
function startContinuousAnimations() {
    // Random sparkle generation
    setInterval(() => {
        if (Math.random() < 0.3) {
            createRandomSparkle();
        }
    }, 2000);
    
    // Random heart generation
    setInterval(() => {
        if (Math.random() < 0.2) {
            createRandomHeart();
        }
    }, 3000);
}

function createRandomSparkle() {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.cssText = `
        position: fixed;
        left: ${Math.random() * window.innerWidth}px;
        top: ${Math.random() * window.innerHeight}px;
        font-size: 1.2rem;
        animation: randomSparkle 4s ease-out forwards;
        z-index: 1006;
        pointer-events: none;
    `;
    
    document.body.appendChild(sparkle);
    
    // Remove after animation
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.remove();
        }
    }, 4000);
}

function createRandomHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = ['💖', '💕', '💗', '💝', '💘'][Math.floor(Math.random() * 5)];
    heart.style.cssText = `
        position: fixed;
        left: ${Math.random() * window.innerWidth}px;
        top: ${Math.random() * window.innerHeight}px;
        font-size: 1.3rem;
        animation: randomHeart 5s ease-out forwards;
        z-index: 1007;
        pointer-events: none;
    `;
    
    document.body.appendChild(heart);
    
    // Remove after animation
    setTimeout(() => {
        if (heart.parentNode) {
            heart.remove();
        }
    }, 5000);
}

// Click Effects
function addClickEffects() {
    document.addEventListener('click', function(e) {
        // Create ripple effect
        createRippleEffect(e.clientX, e.clientY);
        
        // Play sparkle sound occasionally
        if (Math.random() < 0.1) {
            playDiwaliSound('sparkle');
        }
    });
}

function createRippleEffect(x, y) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        left: ${x - 25}px;
        top: ${y - 25}px;
        width: 50px;
        height: 50px;
        border: 2px solid rgba(255, 215, 0, 0.6);
        border-radius: 50%;
        animation: rippleEffect 1s ease-out forwards;
        z-index: 1008;
        pointer-events: none;
    `;
    
    document.body.appendChild(ripple);
    
    // Remove after animation
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
    }, 1000);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 4000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
}

// Keyboard Shortcuts
document.addEventListener('keydown', function(e) {
    // Space bar for fireworks
    if (e.code === 'Space') {
        e.preventDefault();
        triggerFireworks();
    }
    
    // Enter for random cracker burst
    if (e.code === 'Enter') {
        e.preventDefault();
        const crackers = document.querySelectorAll('.cracker-item');
        const randomCracker = crackers[Math.floor(Math.random() * crackers.length)];
        burstCracker(randomCracker);
    }
    
    // M for mute/unmute
    if (e.key === 'm' || e.key === 'M') {
        toggleAudio();
    }
});

// Add CSS for new animations
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes explosionEffect {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(3);
            opacity: 0;
        }
    }
    
    @keyframes particleExplosion {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes messageBurst {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
        }
    }
    
    @keyframes heartFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes customFireworkBurst {
        0% {
            transform: scale(0);
            opacity: 1;
            box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.7);
        }
        50% {
            transform: scale(1);
            opacity: 0.8;
            box-shadow: 0 0 30px 15px rgba(255, 215, 0, 0.3);
        }
        100% {
            transform: scale(4);
            opacity: 0;
            box-shadow: 0 0 60px 30px rgba(255, 215, 0, 0);
        }
    }
    
    @keyframes sparkleExplosion {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 300 - 150}px, ${Math.random() * 300 - 150}px) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
    
    @keyframes randomSparkle {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.2) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes randomHeart {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.3) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes rippleEffect {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    .particle {
        pointer-events: none;
    }
`;
document.head.appendChild(additionalStyles);

// Welcome message
setTimeout(() => {
    showNotification('🎆 Welcome to Diwali Celebration! Click crackers, launch fireworks, and enjoy! 🎆', 'success');
}, 2000);

// Instructions
setTimeout(() => {
    showNotification('💡 Tip: Press SPACE for fireworks, ENTER for random cracker, M to toggle audio! 💡', 'info');
}, 5000);