chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "toggleDarkMode") {
        // Retrieve the tab ID from the sender (popup or other source)
        const tabId = message.tabId;

        // Inject the appropriate script based on the button's state
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: message.script // either appOn.js or appOff.js
        }).then(() =>{
            console.log(`${scriptToInject} injected successfully`)
        }).catch((error) =>{
            console.error(`Error injecting`)
        });
    }
});