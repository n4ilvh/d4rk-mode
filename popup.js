document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector(".popup")) {
        let buttonOn = false; // Default state
        const button = document.querySelector(".button");
        const circle = document.querySelector(".circle");

        if (chrome && chrome.storage && chrome.storage.local) {
            // Retrieve the saved state from storage
            chrome.storage.local.get("buttonOn", (data) => {
                buttonOn = data.buttonOn || false;

                // Set initial UI state
                if (button && circle) {
                    if (buttonOn) {
                        circle.style.animation = "moveCircleOn 0s forwards";
                        button.style.animation = "changeBackgroundOn 0s forwards";
                    } else {
                        circle.style.animation = "moveCircleOff 0s forwards";
                        button.style.animation = "changeBackgroundOff 0s forwards";
                    }
                } else {
                    console.error("Button or circle elements not found.");
                }
            });
        }

        // Add click event listener to toggle state
        button.addEventListener("click", () => {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                const tabId = tabs[0].id; // Get the active tab ID
                const tabUrl = tabs[0].url; // Get the URL of the active tab

                if (tabUrl && !tabUrl.startsWith("chrome://")) {
                    buttonOn = !buttonOn; // Toggle state

                    // Save updated state in storage
                    chrome.storage.local.set({ buttonOn }, () => {
                        console.log("Saved buttonOn state:", buttonOn);
                    });

                    // Send a message to the background script
                    chrome.runtime.sendMessage({
                        action: "toggleDarkMode",
                        tabId: tabId,
                        script: buttonOn ? ["appOn.js"] : ["appOff.js"], // Adjust based on state
                    });

                    // Update UI
                    if (buttonOn) {
                        circle.style.animation = "moveCircleOn 0.5s forwards";
                        button.style.animation = "changeBackgroundOn 0.5s forwards";
                    } else {
                        circle.style.animation = "moveCircleOff 0.5s forwards";
                        button.style.animation = "changeBackgroundOff 0.5s forwards";
                    }
                } else {
                    alert("Cannot access chrome:// webpages. Sorry for any inconveniences.");
                }
            });
        });
    }
});
