/* =====================================================
   GENIX STUDIO — GITHUB PAGES SAFE JAVASCRIPT
===================================================== */

(() => {
    "use strict";

    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

    /* =====================================================
       WHATSAPP
    ===================================================== */
    const whatsappNumber = "6281376119087";

    const whatsappMessage = [
        "Halo Genix Studio 👋",
        "",
        "Saya tertarik dengan paket Graduation Photography.",
        "",
        "Saya ingin melihat demo kontrak dan menanyakan ketersediaan jadwal.",
        "",
        "Nama:",
        "Paket:",
        "Tanggal yang diinginkan:",
        "",
        "Terima kasih."
    ].join("\n");

    function setupWhatsApp() {
        const button = $("#whatsappButton");
        if (!button) return;

        button.href =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(whatsappMessage);

        button.target = "_blank";
        button.rel = "noopener noreferrer";
    }

    /* =====================================================
       PREMIUM LOADER
    ===================================================== */
    function setupLoader() {
        const loader = $("#ikhwan-loader");
        const bar = $("#ikhwan-progress-bar");

        if (!loader || !bar) return;

        let progress = 0;
        let loaded = document.readyState === "complete";
        let finished = false;

        const setProgress = value => {
            progress = Math.max(progress, Math.min(100, value));
            bar.style.width = progress + "%";
        };

        const finish = () => {
            if (finished) return;
            finished = true;

            setProgress(100);

            setTimeout(() => {
                loader.classList.add("ikhwan-hidden");

                setTimeout(() => {
                    if (loader.parentNode) {
                        loader.remove();
                    }
                }, 850);
            }, 350);
        };

        const timer = setInterval(() => {
            if (finished) {
                clearInterval(timer);
                return;
            }

            if (!loaded) {
                // Never falsely reach 100% while the page is still loading.
                if (progress < 88) {
                    setProgress(progress + Math.random() * 3 + 0.8);
                }
            } else {
                setProgress(progress + 5);

                if (progress >= 100) {
                    clearInterval(timer);
                    finish();
                }
            }
        }, 45);

        window.addEventListener("load", () => {
            loaded = true;

            setTimeout(() => {
                setProgress(100);
                clearInterval(timer);
                finish();
            }, 180);
        }, { once: true });

        // Absolute safety fallback.
        setTimeout(() => {
            if (!finished) {
                loaded = true;
                setProgress(100);
                clearInterval(timer);
                finish();
            }
        }, 8000);
    }

    /* =====================================================
       REVEAL
    ===================================================== */
    function setupReveal() {
        const items = $$(
            ".price-card, .extra-card, .note, .portfolio-item, .contract-card"
        );

        if (!items.length) return;

        items.forEach((item, index) => {
            item.style.opacity = "0";
            item.style.transform = "translateY(24px)";
            item.style.transition =
                `opacity .7s ease ${Math.min(index * 45, 350)}ms,
                 transform .7s ease ${Math.min(index * 45, 350)}ms`;
        });

        const show = item => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
        };

        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        show(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.08 });

            items.forEach(item => observer.observe(item));
        } else {
            items.forEach(show);
        }
    }

    /* =====================================================
       FOOTER
    ===================================================== */
    function setupFooter() {
        const footer = $("footer p");
        if (!footer) return;

        footer.textContent =
            `© ${new Date().getFullYear()} Genix Studio. All rights reserved.`;
    }

    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */
    function setupSmoothScroll() {
        $$('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener("click", event => {
                const selector = anchor.getAttribute("href");

                if (!selector || selector === "#") return;

                let target = null;

                try {
                    target = $(selector);
                } catch (_) {
                    return;
                }

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            });
        });
    }

    /* =====================================================
       START
    ===================================================== */
    function init() {
        setupWhatsApp();
        setupLoader();
        setupReveal();
        setupFooter();
        setupSmoothScroll();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init, { once: true });
    } else {
        init();
    }
})();
