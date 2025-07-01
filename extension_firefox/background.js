// Firefox compatible background script
const browser = window.chrome || window.browser;

// 监听来自content script的消息
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getCurrentTabId') {
        // 返回发送消息的标签页ID
        sendResponse({ tabId: sender.tab?.id });
    }
});

// 监听标签页关闭事件，清理存储
browser.tabs.onRemoved.addListener((tabId) => {
    // 清理该标签页的颜色数据
    browser.storage.local.remove([`color_${tabId}`]);
});

// 监听扩展安装/更新事件
browser.runtime.onInstalled.addListener(() => {
    console.log('SurpriseMe extension installed/updated');
});