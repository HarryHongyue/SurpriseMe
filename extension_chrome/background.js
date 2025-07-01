// 监听来自content script的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getCurrentTabId') {
        // 返回发送消息的标签页ID
        sendResponse({ tabId: sender.tab?.id });
    }
});

// 监听标签页关闭事件，清理存储
chrome.tabs.onRemoved.addListener((tabId) => {
    // 清理该标签页的颜色数据
    chrome.storage.local.remove([`color_${tabId}`]);
});

// 监听扩展安装/更新事件
chrome.runtime.onInstalled.addListener(() => {
    console.log('Browser Peacock extension installed/updated');
});