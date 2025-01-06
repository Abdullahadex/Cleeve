document.addEventListener('DOMContentLoaded', function() {
    let slideIndex = 0;
    let timeoutHandle;
    showSlides();

    // Add click handlers for dots
    const dots = document.getElementsByClassName("dot");
    for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener('click', () => {
            clearTimeout(timeoutHandle);
            slideIndex = i;
            showSlides();
        });
    }

    function showSlides() {
        let slides = document.getElementsByClassName("slides");
        let dots = document.getElementsByClassName("dot");
        
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
            dots[i].classList.remove("active-dot");
        }
        
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}
        
        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].classList.add("active-dot");
        
        timeoutHandle = setTimeout(showSlides, 4000);
    }
}); 