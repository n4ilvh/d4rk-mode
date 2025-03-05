(function () {
    // Save the state to chrome.storage
    chrome.storage.local.set({ darkModeEnabled: true }, () => {
        console.log("Dark mode is ON.");
    });

    // Apply dark mode
    document.documentElement.style.backgroundColor = "#fff";
    document.body.style.backgroundColor = "#fff";
    document.documentElement.style.filter = "invert(1) hue-rotate(180deg)";

    // Function to fix image inversion
    function fixMediaElements() {
        const mediaElements = document.querySelectorAll("img, picture, video, svg, canvas");
        mediaElements.forEach((element) => {
            if (element.dataset.darkModeFixed) return;
            element.style.filter = "invert(1) hue-rotate(180deg)";
            element.dataset.darkModeFixed = "true";
        });
    }

    // Function to exclude specific elements from inversion
    function excludeElementsFromInversion() {
        const excludedSelectors = [
            "button[aria-label='Share']",
            ".icon",
            "svg",
            "img[src*='share']",
        ];
        excludedSelectors.forEach((selector) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element) => {
                element.style.filter = "none";
            });
        });
    }

    // Function to handle Pinterest's background
    function fixPinterestBackground() {
        if (!window.location.hostname.includes("pinterest.com")) return;
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
                fixMediaElements();
                excludeElementsFromInversion();
                fixPinterestBackground();
            }
        });
    });

    const observerConfig = { childList: true, subtree: true };
    observer.observe(document.body, observerConfig);

    // Cleanup observer when the script is removed (optional)
    window.addEventListener("unload", () => {
        observer.disconnect();
    });
})();