
  const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slider img');
    let index = 0;
    let slideWidth = slides[0].clientWidth;

    function updateSlide() {
        slider.style.transform = `translateX(${-index * slideWidth}px)`;
    }

    // Auto slide dengan infinite loop
    function autoSlide() {
        index++;
        if (index >= slides.length) {
            index = 0; // kembali ke foto pertama
        }
        updateSlide();
    }

    let interval = setInterval(autoSlide, 3000);

    // Resize handler agar responsif
    window.addEventListener('resize', () => {
        slideWidth = slides[0].clientWidth;
        updateSlide();
    });

    // ---- Manual swipe (drag) ----
    let startX = 0;
    let moveX = 0;
    let isDragging = false;

    const startDrag = (x) => {
        isDragging = true;
        startX = x;
        clearInterval(interval);
    };

    const moveDrag = (x) => {
        if (!isDragging) return;
        moveX = x - startX;
        slider.style.transform = `translateX(${moveX - index * slideWidth}px)`;
    };

    const endDrag = () => {
        if (!isDragging) return;
        isDragging = false;

        if (moveX < -50) index++;      // Geser kiri → next
        else if (moveX > 50) index--;  // Geser kanan → prev

        // Infinite loop manual
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        updateSlide();
        interval = setInterval(autoSlide, 3000);
    };

    // Mouse event
    slider.addEventListener('mousedown', (e) => startDrag(e.clientX));
    slider.addEventListener('mousemove', (e) => moveDrag(e.clientX));
    slider.addEventListener('mouseup', endDrag);
    slider.addEventListener('mouseleave', endDrag);

    // Touch event (HP)
    slider.addEventListener('touchstart', (e) => startDrag(e.touches[0].clientX));
    slider.addEventListener('touchmove', (e) => moveDrag(e.touches[0].clientX));
    slider.addEventListener('touchend', endDrag);