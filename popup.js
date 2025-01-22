document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector(".popup")) {
        const button = document.querySelector(".button");
        const circle = document.querySelector(".circle");

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tabUrl = tabs[0]?.url; // Get the URL of the active tab

            if (!tabUrl) {
                console.error("Tab URL not found.");
                return;
            }

            const domain = new URL(tabUrl).hostname; // Extract the domain from the URL
            let buttonOn = false; // Default state for this domain

            // Check if the domain's state is saved
            chrome.storage.local.get(domain, (data) => {
                buttonOn = data[domain] || false;

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

            // Add click event listener to toggle state
            button.addEventListener("click", () => {
                buttonOn = !buttonOn; // Toggle state

                // Save the updated state for this domain
                chrome.storage.local.set({ [domain]: buttonOn }, () => {
                    console.log(`Saved state for ${domain}:`, buttonOn);
                });

                // Send a message to the background script
                chrome.runtime.sendMessage({
                    action: "toggleDarkMode",
                    tabId: tabs[0].id,
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
            });
        });
    }
});
