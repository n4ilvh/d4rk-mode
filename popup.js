document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector(".popup")) {
        const button = document.querySelector(".button");
        const circle = document.querySelector(".circle");

        // Check the global dark mode state
        chrome.storage.local.get("darkModeEnabled", (data) => {
            let buttonOn = data.darkModeEnabled || false; // Default to false if not set
            console.log("Retrieved dark mode state from storage:", buttonOn ? "ON" : "OFF");

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

            // Add click event listener to toggle state
            button.addEventListener("click", () => {
                buttonOn = !buttonOn; // Toggle state
                console.log("Toggling dark mode to:", buttonOn ? "ON" : "OFF");

                // Save the updated global state
                chrome.storage.local.set({ darkModeEnabled: buttonOn }, () => {
                    console.log("Saved dark mode state to storage:", buttonOn ? "ON" : "OFF");
                });

                // Send a message to the background script to inject the appropriate script
                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    if (tabs[0]?.id) {
                        console.log(`Sending message to inject ${buttonOn ? "appOn.js" : "appOff.js"}`);
                        chrome.runtime.sendMessage({
                            action: "toggleDarkMode",
                            tabId: tabs[0].id,
                            script: buttonOn ? "appOn.js" : "appOff.js", // Script to inject
                        });
                    }
                });

                // Update UI
                if (buttonOn) {
                    circle.style.animation = "moveCircleOn 0.5s forwards";
                    button.style.animation = "changeBackgroundOn 0.5s forwards";
                } else {
                    circle.style.animation = "moveCircleOff 0.5s forwards";
                    button.style.animation = "changeBackgroundOff 0.5s forwards";
                }
            });
        });
    }
});