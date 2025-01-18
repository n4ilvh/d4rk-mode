document.addEventListener("DOMContentLoaded", () =>{
    if (document.querySelector(".popup")) {
        const button = document.querySelector(".button");
        const circle = document.querySelector(".circle");

        let buttonOn = false;

        button.addEventListener("click", () => {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                const tabId = tabs[0].id; // Get the active tab ID
                const tabUrl = tabs[0].url; // Get the URL of the active tab

                // Check if the tab is not a chrome:// URL
                if (tabUrl && !tabUrl.startsWith("chrome://")) {
                    // Send a message to the background script to toggle dark mode
                    chrome.runtime.sendMessage({
                        action: "toggleDarkMode",
                        tabId: tabId, // Pass the tabId
                        script: buttonOn ? ["appOff.js"] : ["appOn.js"] // Send the appropriate script based on the state
                    });

                    // Update UI based on the state
                    if (!buttonOn) {
                        buttonOn = true;
                        circle.style.animation = "moveCircleOn 0.5s forwards";
                        button.style.animation = "changeBackgroundOn 0.5s forwards";


                    } else {
                        buttonOn = false;
                        circle.style.animation = "moveCircleOff 0.5s forwards";
                        button.style.animation = "changeBackgroundOff 0.5s forwards";
                    }

                } else {
                    // Show an error message if trying to access a chrome:// URL
                    
                    alert("Cannot access chrome:// webpages. Sorry for any inconveniences.")
                }
            });
        });
    }
})
   
