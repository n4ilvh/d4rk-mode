(function () {
    // Apply dark mode filter to the entire page
    document.documentElement.style.backgroundColor = "#fff";
    document.body.style.backgroundColor = "#fff";
    document.documentElement.style.filter = "invert(1) hue-rotate(180deg)";

    // Function to fix image inversion
    function fixMediaElements() {
        const mediaElements = document.querySelectorAll("img, picture, video, svg, canvas");
        mediaElements.forEach((element) => {
            // Skip elements that are already fixed
            if (element.dataset.darkModeFixed) return;

            // Apply inversion fix
            element.style.filter = "invert(1) hue-rotate(180deg)";
            element.dataset.darkModeFixed = "true"; // Mark as fixed
        });
    }

    // Function to exclude specific elements from inversion (e.g., share buttons)
    function excludeElementsFromInversion() {
        const excludedSelectors = [
            "button[aria-label='Share']", // Example: Share button
            ".icon", // Example: Icons with class "icon"
            "svg", // Example: All SVGs
            "img[src*='share']", // Example: Share icons in images
        ];

        excludedSelectors.forEach((selector) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element) => {
                element.style.filter = "none"; // Disable inversion for these elements
            });
        });
    }

    // Function to handle Pinterest's background
    function fixPinterestBackground() {
        if (!window.location.hostname.includes("pinterest.com")) return;

        // Use a more flexible selector for Pinterest's background
        const pinterestBg = document.querySelector("[data-test-id='fullPageWrapper']");
        if (pinterestBg) {
            pinterestBg.style.backgroundColor = "#fff";
        }
    }

    // Run the functions initially
    fixMediaElements();
    excludeElementsFromInversion();
    fixPinterestBackground();

    // Observer to handle dynamically loaded content
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === "childList") {
                fixMediaElements(); // Fix new images/media
                excludeElementsFromInversion(); // Exclude new elements from inversion
                fixPinterestBackground(); // Fix Pinterest background
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