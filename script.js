document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const darkModeToggle = document.getElementById('darkModeToggle');
    const animationToggle = document.getElementById('animationToggle');
    const resetBtn = document.getElementById('resetBtn');
    const animateBtn = document.getElementById('animateBtn');
    const animatedElement = document.getElementById('animatedElement');
    const images = document.querySelectorAll('.zoom-animation');
    
    // Load preferences from localStorage
    loadPreferences();
    
    // Event listeners
    darkModeToggle.addEventListener('change', toggleDarkMode);
    animationToggle.addEventListener('change', toggleAnimations);
    resetBtn.addEventListener('click', resetPreferences);
    animateBtn.addEventListener('click', triggerAnimation);
    
    // Add hover effect to images
    images.forEach(img => {
        img.addEventListener('mouseenter', () => {
            if (animationToggle.checked) {
                img.style.transform = 'scale(1.05)';
            }
        });
        
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });
    
    // Functions
    function loadPreferences() {
        // Load dark mode preference
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        }
        
        // Load animation preference
        if (localStorage.getItem('animations') === 'enabled') {
            animationToggle.checked = true;
        } else if (localStorage.getItem('animations') === 'disabled') {
            animationToggle.checked = false;
            disableAnimations();
        }
    }
    
    function toggleDarkMode() {
        if (darkModeToggle.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
    }
    
    function toggleAnimations() {
        if (animationToggle.checked) {
            enableAnimations();
            localStorage.setItem('animations', 'enabled');
        } else {
            disableAnimations();
            localStorage.setItem('animations', 'disabled');
        }
    }
    
    function enableAnimations() {
        // Re-enable all animations
        animateBtn.classList.add('pulse-animation');
        document.querySelectorAll('.zoom-animation').forEach(el => {
            el.style.transition = 'transform 0.3s ease';
        });
    }
    
    function disableAnimations() {
        // Disable all animations
        animateBtn.classList.remove('pulse-animation');
        document.querySelectorAll('.zoom-animation').forEach(el => {
            el.style.transition = 'none';
        });
    }
    
    function resetPreferences() {
        // Reset to default preferences
        localStorage.removeItem('darkMode');
        localStorage.removeItem('animations');
        
        // Update UI
        document.body.classList.remove('dark-mode');
        darkModeToggle.checked = false;
        animationToggle.checked = true;
        
        // Re-enable animations
        enableAnimations();
    }
    
    function triggerAnimation() {
        if (!animationToggle.checked) return;
        
        // Remove any existing animation classes
        animatedElement.classList.remove('spin', 'bounce', 'slide');
        
        // Trigger reflow to restart animation
        void animatedElement.offsetWidth;
        
        // Randomly select an animation
        const animations = ['spin', 'bounce', 'slide'];
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        
        // Apply the animation
        animatedElement.classList.add(randomAnimation);
        
        // Remove the class after animation completes
        setTimeout(() => {
            animatedElement.classList.remove(randomAnimation);
        }, 1000);
    }
});