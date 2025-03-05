(function () {
    // Remove the state from chrome.storage
    chrome.storage.local.remove("darkModeEnabled", () => {
        console.log("Dark mode is OFF.");
    });

    // Reset dark mode
    document.documentElement.style.filter = "none";
    document.documentElement.style.backgroundColor = "";
    document.body.style.backgroundColor = "";

    // Function to reset media elements
    function resetMediaElements() {
        const mediaElements = document.querySelectorAll("img, picture, video, svg, canvas");
        mediaElements.forEach((element) => {
            element.style.filter = "none";
            delete element.dataset.darkModeFixed;
        });
    }

    // Function to reset Pinterest's background
    function resetPinterestBackground() {
        if (!window.location.hostname.includes("pinterest.com")) return;
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
                resetMediaElements();
                resetPinterestBackground();
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