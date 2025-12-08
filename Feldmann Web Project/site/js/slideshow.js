let currentSlide = 0; // track current slide
const slides = document.querySelectorAll('.slide'); // all slides

function showNextSlide() { // show next slide
    slides[currentSlide].classList.remove('active'); // hide current slide
    currentSlide = (currentSlide + 1) % slides.length; // move to next slide
    slides[currentSlide].classList.add('active'); // show next slide
}

setInterval(showNextSlide, 5000); // change slide every 5 seconds