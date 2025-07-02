// Use browser namespace for cross-browser compatibility
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

// Listen for messages from content script
browserAPI.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getCurrentTabId') {
        // Return the tab ID that sent the message
        sendResponse({ tabId: sender.tab?.id });
    }
    return true; // Required for async response
});

// Listen for tab close events to clean up storage
browserAPI.tabs.onRemoved.addListener((tabId) => {
    // Clean up color data for the closed tab
    browserAPI.storage.local.remove([`color_${tabId}`]);
});

// Listen for extension installation/update events
browserAPI.runtime.onInstalled.addListener(() => {
    console.log('SurpriseMe extension installed/updated');
});