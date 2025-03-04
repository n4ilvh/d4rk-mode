(function () {
    // Reset dark mode filter for the entire page
    document.documentElement.style.filter = "none";
    document.documentElement.style.backgroundColor = "";
    document.body.style.backgroundColor = "";

    // Function to reset media elements (images, pictures, videos, etc.)
    function resetMediaElements() {
        const mediaElements = document.querySelectorAll("img, picture, video, svg, canvas");
        mediaElements.forEach((element) => {
            // Reset the filter and remove the dark mode fix marker
            element.style.filter = "none";
            delete element.dataset.darkModeFixed;
        });
    }

    // Function to reset Pinterest's background (if applicable)
    function resetPinterestBackground() {
        if (!window.location.hostname.includes("pinterest.com")) return;

        // Reset the background color for Pinterest's wrapper
        const pinterestBg = document.querySelector("[data-test-id='fullPageWrapper']");
        if (pinterestBg) {
            pinterestBg.style.backgroundColor = "";
        }
    }

    // Run the functions initially
    resetMediaElements();
    resetPinterestBackground();

    // Observer to handle dynamically loaded content
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === "childList") {
                resetMediaElements(); // Reset new images/media
                resetPinterestBackground(); // Reset Pinterest background
            }
        });
    });

    // Observe only relevant parts of the DOM for better performance
    const observerConfig = { childList: true, subtree: true };
    observer.observe(document.body, observerConfig);

    // Cleanup observer when the script is removed (optional)
    window.addEventListener("unload", () => {
        observer.disconnect();
    });
})();