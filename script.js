/* =========================================================
   IKHWANUL KIRAM - GITHUB PAGES SAFE SCRIPT
   ========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PREMIUM LOADER
       ===================================================== */
    const loader = document.getElementById("ikhwan-loader");
    const progressBar = document.getElementById("ikhwan-progress-bar");

    if (loader && progressBar) {
        let progress = 0;
        let finished = false;

        const updateProgress = () => {
            if (finished) return;

            progress += Math.random() * 2.5 + 1.2;
            progress = Math.min(progress, 100);
            progressBar.style.width = `${progress}%`;

            if (progress >= 100) {
                finished = true;

                setTimeout(() => {
                    loader.classList.add("ikhwan-hidden");

                    setTimeout(() => {
                        if (loader && loader.parentNode) {
                            loader.remove();
                        }
                        document.documentElement.classList.remove("ikhwan-loading");
                        document.body.classList.remove("ikhwan-loading");
                    }, 850);
                }, 350);

                return;
            }

            setTimeout(updateProgress, 45);
        };

        updateProgress();
    }


    /* =====================================================
       STICKY HEADER
       ===================================================== */
    const header = document.getElementById("header");

    const handleHeader = () => {
        if (!header) return;
        header.classList.toggle("active", window.scrollY > 80);
    };


    /* =====================================================
       MOBILE MENU
       ===================================================== */
    const menuBtn = document.getElementById("menu-btn");
    const nav = document.querySelector("nav");

    if (menuBtn && nav) {
        menuBtn.addEventListener("click", () => {
            nav.classList.toggle("active");
            menuBtn.setAttribute(
                "aria-expanded",
                nav.classList.contains("active") ? "true" : "false"
            );
        });

        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("active");
                menuBtn.setAttribute("aria-expanded", "false");
            });
        });
    }


    /* =====================================================
       ACTIVE MENU
       ===================================================== */
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav ul li a[href^='#']");

    const updateActiveMenu = () => {
        let current = "";
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            if (
                scrollPosition >= section.offsetTop &&
                scrollPosition < section.offsetTop + section.offsetHeight
            ) {
                current = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${current}`
            );
        });
    };


    /* =====================================================
       GENIX SOCIAL CARD CLICK EFFECT
       ===================================================== */
    document.querySelectorAll(".genix-item, .genix-social-card").forEach(item => {
        item.addEventListener("click", function () {
            this.classList.add("clicked");
            setTimeout(() => this.classList.remove("clicked"), 300);
        });
    });


    /* =====================================================
       DARK / LIGHT MODE
       ===================================================== */
    const themeBtn = document.getElementById("theme-btn");

    if (themeBtn) {
        const icon = themeBtn.querySelector("i");

        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("light");

            const isLight = document.body.classList.contains("light");

            if (icon) {
                icon.className = isLight
                    ? "ri-sun-line"
                    : "ri-moon-line";
            }

            try {
                localStorage.setItem("ikhwan-theme", isLight ? "light" : "dark");
            } catch (error) {
                // localStorage may be unavailable in some browser modes.
            }
        });

        try {
            if (localStorage.getItem("ikhwan-theme") === "light") {
                document.body.classList.add("light");
                if (icon) icon.className = "ri-sun-line";
            }
        } catch (error) {
            // Ignore storage errors.
        }
    }


    /* =====================================================
       BACK TO TOP
       ===================================================== */
    const topBtn = document.querySelector(".scroll-top");

    const handleTopButton = () => {
        if (!topBtn) return;
        topBtn.classList.toggle("show", window.scrollY > 500);
    };


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */
    const revealElements = document.querySelectorAll(
        ".service-card,.portfolio-card,.testimonial-card,.about-wrapper,.exp-card,.info-box,.contact-form"
    );

    const reveal = () => {
        const windowHeight = window.innerHeight;

        revealElements.forEach(el => {
            const top = el.getBoundingClientRect().top;

            if (top < windowHeight - 80) {
                el.classList.add("fade-up", "show");
            }
        });
    };


    /* =====================================================
       COUNTER
       ===================================================== */
    const counters = document.querySelectorAll(".exp-card h2");
    let counterStarted = false;

    const startCounter = () => {
        if (counterStarted || counters.length === 0) return;

        const experience = document.querySelector(".experience");
        if (!experience) return;

        if (experience.getBoundingClientRect().top < window.innerHeight - 120) {
            counterStarted = true;

            counters.forEach(counter => {
                const original = counter.textContent.trim();
                const match = original.match(/([\d.]+)/);

                if (!match) return;

                const target = parseInt(match[1], 10);
                const suffix = original.includes("%") ? "%" : "+";
                const duration = 1300;
                const startTime = performance.now();

                const update = now => {
                    const progress = Math.min((now - startTime) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const value = Math.floor(target * eased);

                    counter.textContent = `${value}${suffix}`;

                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        counter.textContent = `${target}${suffix}`;
                    }
                };

                requestAnimationFrame(update);
            });
        }
    };


    /* =====================================================
       CUSTOM CURSOR
       Disabled automatically for touch devices.
       ===================================================== */
    const cursor = document.querySelector(".cursor");
    const cursor2 = document.querySelector(".cursor2");

    if (cursor && cursor2 && window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener("mousemove", e => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;

            cursor2.style.left = `${e.clientX}px`;
            cursor2.style.top = `${e.clientY}px`;
        });
    }


    /* =====================================================
       PORTFOLIO FILTER BUTTON STATE
       ===================================================== */
    const filterBtns = document.querySelectorAll(".portfolio-filter button");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(item => item.classList.remove("active"));
            btn.classList.add("active");
        });
    });


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href");

            if (!href || href === "#") return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });


    /* =====================================================
       FLOAT IMAGE EFFECT
       Disabled on touch devices.
       ===================================================== */
    const image = document.querySelector(".image-box");

    if (image && window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener("mousemove", e => {
            const x = (window.innerWidth / 2 - e.clientX) / 45;
            const y = (window.innerHeight / 2 - e.clientY) / 45;

            image.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
        });

        document.addEventListener("mouseleave", () => {
            image.style.transform = "rotateY(0deg) rotateX(0deg)";
        });
    }


    /* =====================================================
       FOOTER YEAR
       ===================================================== */
    const footerYear = document.querySelector("footer span");

    if (footerYear) {
        footerYear.textContent = `© ${new Date().getFullYear()} All Rights Reserved`;
    }


    /* =====================================================
       SCROLL EVENTS - ONE LISTENER
       ===================================================== */
    const onScroll = () => {
        handleHeader();
        handleTopButton();
        updateActiveMenu();
        reveal();
        startCounter();
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // Initial state on page load.
    onScroll();
});
