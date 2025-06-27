// 预定义的漂亮颜色数组
const COLORS = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
    '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2',
    '#A3E4D7', '#F9E79F', '#FADBD8', '#D5DBDB', '#AED6F1',
    '#A9DFBF', '#F4D03F', '#E8DAEF', '#D1F2EB', '#FCF3CF',
    '#FF7675', '#74B9FF', '#00B894', '#FDCB6E', '#E17055',
    '#6C5CE7', '#FD79A8', '#00CEC9', '#55A3FF', '#FF9FF3'
];

// 生成随机颜色
function getRandomColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
}

// 获取当前标签页
async function getCurrentTab() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab;
}

// 更新颜色预览
function updateColorPreview(color) {
    const preview = document.getElementById('colorPreview');
    const code = document.getElementById('colorCode');
    
    if (color) {
        preview.style.backgroundColor = color;
        code.textContent = color;
    } else {
        preview.style.backgroundColor = 'transparent';
        code.textContent = 'None';
    }
}

// 加载当前颜色
async function loadCurrentColor() {
    try {
        const tab = await getCurrentTab();
        const result = await chrome.storage.local.get([`color_${tab.id}`]);
        const currentColor = result[`color_${tab.id}`];
        updateColorPreview(currentColor);
    } catch (error) {
        console.error('Error loading current color:', error);
    }
}

// 设置随机颜色
async function setRandomColor() {
    try {
        const tab = await getCurrentTab();
        const randomColor = getRandomColor();
        
        // 检查是否是受限页面
        if (isRestrictedPage(tab.url)) {
            alert('This page does not support border functionality\n(chrome://, edge://, about: and other system pages)');
            return;
        }
        
        // 保存颜色到存储
        await chrome.storage.local.set({ [`color_${tab.id}`]: randomColor });
        
        // 尝试注入content script并发送消息
        try {
            await injectContentScriptIfNeeded(tab.id);
            await chrome.tabs.sendMessage(tab.id, {
                action: 'setBorderColor',
                color: randomColor
            });
            
            // 更新预览
            updateColorPreview(randomColor);
            
        } catch (messageError) {
            console.log('Message sending failed, trying alternative method');
            // 如果消息发送失败，尝试直接注入代码
            await injectBorderDirectly(tab.id, randomColor);
            updateColorPreview(randomColor);
        }
        
    } catch (error) {
        console.error('Error setting random color:', error);
        alert('Failed to set border color, please refresh the page and try again');
    }
}

// 移除颜色
async function removeColor() {
    try {
        const tab = await getCurrentTab();
        
        // 检查是否是受限页面
        if (isRestrictedPage(tab.url)) {
            alert('This page does not support border functionality');
            return;
        }
        
        // 从存储中移除
        await chrome.storage.local.remove([`color_${tab.id}`]);
        
        // 尝试发送消息到content script
        try {
            await chrome.tabs.sendMessage(tab.id, {
                action: 'removeBorderColor'
            });
        } catch (messageError) {
            // 如果消息发送失败，直接注入移除代码
            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: () => {
                    const border = document.getElementById('surprise-me-border');
                    if (border) border.remove();
                }
            });
        }
        
        // 更新预览
        updateColorPreview(null);
        
    } catch (error) {
        console.error('Error removing color:', error);
        alert('Failed to remove border color, please refresh the page and try again');
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', async () => {
    // 加载当前颜色
    await loadCurrentColor();
    
    // 绑定事件
    document.getElementById('randomColor').addEventListener('click', setRandomColor);
    document.getElementById('removeColor').addEventListener('click', removeColor);
});

// 检查是否是受限页面
function isRestrictedPage(url) {
    const restrictedPatterns = [
        'chrome://',
        'chrome-extension://',
        'edge://',
        'about:',
        'moz-extension://',
        'file://'
    ];
    
    return restrictedPatterns.some(pattern => url.startsWith(pattern));
}

// 注入content script（如果需要）
async function injectContentScriptIfNeeded(tabId) {
    try {
        // 尝试ping content script
        await chrome.tabs.sendMessage(tabId, { action: 'ping' });
    } catch (error) {
        // 如果ping失败，注入content script
        await chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['content.js']
        });
        
        // 等待一小段时间让脚本初始化
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}

// 直接注入边框代码
async function injectBorderDirectly(tabId, color) {
    await chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: (color) => {
            const BORDER_ID = 'surprise-me-border';
            
            // 移除已存在的边框
            const existingBorder = document.getElementById(BORDER_ID);
            if (existingBorder) {
                existingBorder.remove();
            }
            
            // 创建新边框
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
        },
        args: [color]
    });
}