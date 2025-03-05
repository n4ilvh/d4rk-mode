chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "toggleDarkMode") {
        const tabId = message.tabId;
        const scriptToInject = message.script;

        if (tabId && scriptToInject) {
            // Inject the specified script into the active tab
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: [scriptToInject],
            })
        }
    }
});