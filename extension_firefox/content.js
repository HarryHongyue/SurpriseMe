// 创建边框元素的ID
const BORDER_ID = 'surprise-me-border';

// 创建边框元素
function createBorderElement(color) {
    // 移除已存在的边框
    removeBorderElement();
    
    const borderElement = document.createElement('div');
    borderElement.id = BORDER_ID;
    borderElement.style.cssText = `
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        pointer-events: none !important;
        z-index: 999999999 !important;
        border: 8px solid ${color} !important;
        box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.3) !important;
        mix-blend-mode: normal !important;
    `;
    
    document.documentElement.appendChild(borderElement);
}

// 移除边框元素
function removeBorderElement() {
    const existingBorder = document.getElementById(BORDER_ID);
    if (existingBorder) {
        existingBorder.remove();
    }
}

// Firefox compatible content script
const browser = window.chrome || window.browser;

// 监听来自popup的消息
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'setBorderColor') {
        createBorderElement(message.color);
        sendResponse({ success: true });
    } else if (message.action === 'removeBorderColor') {
        removeBorderElement();
        sendResponse({ success: true });
    } else if (message.action === 'ping') {
        // 响应ping消息，确认content script已加载
        sendResponse({ status: 'ready' });
    }
    
    return true; // 保持消息通道开放
});

// 页面加载时检查是否有保存的颜色 (Firefox compatible)
async function initializeBorder() {
    try {
        // 获取当前标签页ID需要通过runtime API
        const response = await browser.runtime.sendMessage({ action: 'getCurrentTabId' });
        if (response && response.tabId) {
            const result = await browser.storage.local.get([`color_${response.tabId}`]);
            const savedColor = result[`color_${response.tabId}`];
            
            if (savedColor) {
                createBorderElement(savedColor);
            }
        }
    } catch (error) {
        // 如果获取失败，使用备用方法
        console.log('Using fallback initialization method');
    }
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeBorder);
} else {
    initializeBorder();
}

// 监听页面可见性变化，确保边框始终存在
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // 页面变为可见时，检查边框是否还在
        setTimeout(() => {
            const border = document.getElementById(BORDER_ID);
            if (!border) {
                initializeBorder();
            }
        }, 100);
    }
});