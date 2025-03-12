(function () {
    // Save the state to chrome.storage
    chrome.storage.local.set({ darkModeEnabled: true }, () => {
        console.log("Dark mode is ON.");
    });

    // Get the current website's domain
    const hostname = window.location.hostname;

    // Apply dark mode based on the website
    if (hostname.includes("pinterest.com")) {
        // Custom logic for Pinterest
        document.documentElement.style.backgroundColor = "#fff";
        document.body.style.backgroundColor = "#fff";
        document.documentElement.style.filter = "invert(1) hue-rotate(180deg)";

        // Fix Pinterest's background
        const pinterestBg = document.querySelector("[data-test-id='fullPageWrapper']");
        if (pinterestBg) {
            pinterestBg.style.backgroundColor = "#fff";
        }

        // Fix images and pins
        const pins = document.querySelectorAll("img[src*='pinimg.com']");
        pins.forEach((pin) => {
            pin.style.filter = "invert(1) hue-rotate(180deg)";
        });

        // Exclude share buttons and icons from inversion
        const shareButtons = document.querySelectorAll("button[aria-label='Share']");
        shareButtons.forEach((button) => {
            button.style.filter = "none";
        });

        const icons = document.querySelectorAll(".icon");
        icons.forEach((icon) => {
            icon.style.filter = "none";
        });
    } 
    
    else if (hostname.includes("docs.google.com")){
        document.documentElement.style.backgroundColor = "#fff";
        document.body.style.backgroundColor = "#fff";
        document.documentElement.style.filter = "invert(1) hue-rotate(180deg)";

        const images = document.querySelectorAll(".kix-canvas-tile-content");
    images.forEach((img) => {
        img.style.filter = "invert(1) hue-rotate(180deg)";
    });
    }

    else {
        // Default dark mode for other websites
        document.documentElement.style.backgroundColor = "#fff";
        document.body.style.backgroundColor = "#fff";
        document.documentElement.style.filter = "invert(1) hue-rotate(180deg)";
        
    }

    // Function to fix image inversion
    function fixMediaElements() {
        const mediaElements = document.querySelectorAll("img, picture, video, svg");
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

    // Run the functions initially
    fixMediaElements();
    excludeElementsFromInversion();

    // Observer to handle dynamically loaded content
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === "childList") {
                fixMediaElements();
                excludeElementsFromInversion();
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