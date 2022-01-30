document.addEventListener("DOMContentLoaded", () => {
    // Navbar 
    const toggle_btn = document.querySelector(".toggle-btn");
    const navbar = document.querySelector(".navbar");

    toggle_btn.addEventListener("click", () => {
        navbar.classList.toggle("mobile-nav")
    })
})