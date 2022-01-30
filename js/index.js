document.addEventListener("DOMContentLoaded", () => {
    // Navbar 
    const toggle_btn = document.querySelector(".toggle-btn");
    const navbar = document.querySelector(".navbar");

    toggle_btn.addEventListener("click", () => {
        navbar.classList.toggle("mobile-nav")
    })

    // Animations

    AOS.init({
        offset: 200,
        delay: 100,
        duration: 1000,
      });

})