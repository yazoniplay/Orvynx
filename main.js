/* =========================================================
   ORVYNX
   Minimal interactions
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------------
       Smooth reveal for page sections
    ----------------------------------------------- */

    const sections = document.querySelectorAll(
        ".statement, .product-section, .features, .developers, .cta"
    );

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.08
        }
    );

    sections.forEach((section) => {
        observer.observe(section);
    });


    /* -----------------------------------------------
       Navigation shadow on scroll
    ----------------------------------------------- */

    const nav = document.querySelector(".nav");

    function updateNavigation() {

        if (!nav) return;

        if (window.scrollY > 10) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }

    }

    updateNavigation();

    window.addEventListener(
        "scroll",
        updateNavigation,
        { passive: true }
    );


    /* -----------------------------------------------
       Early access buttons
       Temporary interaction for V0
    ----------------------------------------------- */

    const earlyAccessLinks = document.querySelectorAll(
        'a[href="#early-access"]'
    );

    earlyAccessLinks.forEach((link) => {

        link.addEventListener("click", () => {

            console.log(
                "Orvynx early access requested"
            );

        });

    });

});
