let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const progressBar = document.getElementById('progressFill');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slideCounter = document.getElementById('slideCounter');
const keyboardHint = document.getElementById('keyboardHint');

// Initialize
function init() {
    updateSlides();
    
    // Hide keyboard hint after 4 seconds
    setTimeout(() => {
        if(keyboardHint) {
            keyboardHint.classList.add('hidden');
        }
    }, 4000);
}

// Navigation functions
function nextSlide() {
    if (currentSlide < slides.length - 1) {
        currentSlide++;
        updateSlides();
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlides();
    }
}

function goToSlide(index) {
    if (index >= 0 && index < slides.length) {
        currentSlide = index;
        updateSlides();
    }
}

// Update UI
function updateSlides() {
    // Update slides visibility and classes
    slides.forEach((slide, index) => {
        slide.classList.remove('active', 'exit-left');
        
        if (index === currentSlide) {
            slide.classList.add('active');
        } else if (index < currentSlide) {
            slide.classList.add('exit-left');
        } else {
            // Future slides just stay transformed right (default CSS)
            slide.style.transform = ''; 
        }
    });

    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });

    // Update buttons
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === slides.length - 1;

    // Update counter
    slideCounter.textContent = `${currentSlide + 1} / ${slides.length}`;

    // Update progress bar
    const progress = ((currentSlide + 1) / slides.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// Event Listeners
// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'Space' || e.key === 'Enter') {
        nextSlide();
        e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
        prevSlide();
        e.preventDefault();
    }
});

// Touch swipe navigation
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swiped left (next)
        nextSlide();
    } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swiped right (prev)
        prevSlide();
    }
}

// Start
init();
