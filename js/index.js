document.addEventListener("DOMContentLoaded", () => {
    // Navbar 
    const toggle_btn = document.querySelector(".toggle-btn");
    const navbar = document.querySelector(".navbar");

    toggle_btn.addEventListener("click", () => {
        navbar.classList.toggle("mobile-nav")
    })

    // Scroll Btn
    const scrollBtn = document.getElementById("scrolltop");
    scrollBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    });
    window.addEventListener("scroll", () => {
        if (window.scrollY >= 900) {
            scrollBtn.style.opacity = 1;
        } else {
            scrollBtn.style.opacity = 0;
        }
    });

    // Theme toggle
    const themeToggle = document.getElementById("checkbox");
    const body = document.querySelector("body");
    themeToggle.addEventListener("change", () => {
        body.classList.toggle("dark");
    })
})