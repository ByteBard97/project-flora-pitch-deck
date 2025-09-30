const slides = Array.from(document.querySelectorAll('.slide'));
    const progressBar = document.getElementById('progress');
    const counter = document.getElementById('counter');
    const controls = document.querySelector('.controls');
    let currentIndex = 0;
    let fadeTimer = null;

    // Auto-fade controls
    function startFadeTimer() {
      // Clear any existing timer
      if (fadeTimer) {
        clearTimeout(fadeTimer);
      }
      
      // Show controls immediately
      controls.classList.remove('fade-out');
      controls.classList.add('fade-in');
      
      // Start fade out after 2 seconds (1 second stable + 1 second fade)
      fadeTimer = setTimeout(() => {
        controls.classList.remove('fade-in');
        controls.classList.add('fade-out');
      }, 2000);
    }

    // Show controls when user interacts
    function showControls() {
      controls.classList.remove('fade-out');
      controls.classList.add('fade-in');
      startFadeTimer();
    }

    function showSlide(index) {
      // Remove all classes
      slides.forEach(s => {
        s.classList.remove('active', 'prev');
      });
      
      // Wrap around
      currentIndex = (index + slides.length) % slides.length;
      
      // Set classes
      slides[currentIndex].classList.add('active');
      if (currentIndex > 0) {
        slides[currentIndex - 1].classList.add('prev');
      } else {
        slides[slides.length - 1].classList.add('prev');
      }
      
      // Reset scroll position for new slide
      slides[currentIndex].scrollTop = 0;
      
      // Update UI
      counter.textContent = `${currentIndex + 1} / ${slides.length}`;
      progressBar.style.width = `${((currentIndex + 1) / slides.length) * 100}%`;
      
      // Show controls and start fade timer
      showControls();
    }

    // Navigation with control show
    document.getElementById('prev').onclick = () => {
      showControls();
      showSlide(currentIndex - 1);
    };
    
    document.getElementById('next').onclick = () => {
      showControls();
      showSlide(currentIndex + 1);
    };

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          showSlide(currentIndex + 1);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          showSlide(currentIndex - 1);
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
          } else {
            document.exitFullscreen();
          }
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          window.print();
          break;
        case 'Home':
          e.preventDefault();
          showSlide(0);
          break;
        case 'End':
          e.preventDefault();
          showSlide(slides.length - 1);
          break;
      }
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
      // Show controls when touching
      showControls();
    });

    document.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleSwipe();
    });

    function handleSwipe() {
      const horizontalDiff = Math.abs(touchEndX - touchStartX);
      const verticalDiff = Math.abs(touchEndY - touchStartY);
      
      // Only trigger if horizontal swipe is stronger than vertical
      if (horizontalDiff > verticalDiff && horizontalDiff > 50) {
        if (touchEndX < touchStartX) {
          showSlide(currentIndex + 1); // Swipe left = next
        } else {
          showSlide(currentIndex - 1); // Swipe right = previous
        }
      }
    }

    // Initialize
    showSlide(0);

    // Hide mobile hint after first interaction
    let hasInteracted = false;
    function hideHint() {
      if (!hasInteracted) {
        hasInteracted = true;
        const hint = document.querySelector('.mobile-swipe-hint');
        if (hint) {
          hint.style.opacity = '0';
          setTimeout(() => hint.style.display = 'none', 500);
        }
      }
    }

    document.addEventListener('touchstart', hideHint);
    document.addEventListener('click', hideHint);

    // Show controls if user taps anywhere on screen
    document.addEventListener('click', (e) => {
      // Don't trigger if clicking on controls themselves
      if (!e.target.closest('.controls')) {
        showControls();
      }
    });