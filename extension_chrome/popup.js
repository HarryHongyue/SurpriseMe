// 扩展的漂亮颜色数组
const PREDEFINED_COLORS = [
    // 原始颜色
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
    '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2',
    '#A3E4D7', '#F9E79F', '#FADBD8', '#D5DBDB', '#AED6F1',
    '#A9DFBF', '#F4D03F', '#E8DAEF', '#D1F2EB', '#FCF3CF',
    '#FF7675', '#74B9FF', '#00B894', '#FDCB6E', '#E17055',
    '#6C5CE7', '#FD79A8', '#00CEC9', '#55A3FF', '#FF9FF3',
    
    // 新增的更多颜色
    // 暖色调
    '#FF8A80', '#FF5722', '#FF9800', '#FFC107', '#FFEB3B',
    '#CDDC39', '#8BC34A', '#4CAF50', '#009688', '#00BCD4',
    
    // 冷色调
    '#03A9F4', '#2196F3', '#3F51B5', '#673AB7', '#9C27B0',
    '#E91E63', '#F44336', '#795548', '#607D8B', '#9E9E9E',
    
    // 渐变色系
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
    
    // 彩虹色系
    '#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF',
    '#4B0082', '#9400D3', '#FF1493', '#00FFFF', '#ADFF2F',
    
    // 自然色系
    '#8FBC8F', '#20B2AA', '#87CEEB', '#DDA0DD', '#F0E68C',
    '#FFB6C1', '#FFA07A', '#98FB98', '#87CEFA', '#DDA0DD',
    
    // 深色系
    '#2F4F4F', '#8B4513', '#A0522D', '#CD853F', '#D2691E',
    '#B22222', '#DC143C', '#FF4500', '#FF8C00', '#DAA520',
    
    // 渐变系列
    '#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe',
    '#00f2fe', '#43e97b', '#38f9d7', '#ffecd2', '#fcb69f'
];

// 生成纯随机颜色（HSL方式，确保颜色饱和度和亮度合适）
function generateRandomColor() {
    const hue = Math.floor(Math.random() * 360);        // 0-360度的色相
    const saturation = Math.floor(Math.random() * 40) + 60; // 60-100%的饱和度
    const lightness = Math.floor(Math.random() * 30) + 40;  // 40-70%的亮度
    
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

// 生成RGB随机颜色
function generateRandomRGBColor() {
    const r = Math.floor(Math.random() * 200) + 55; // 55-255
    const g = Math.floor(Math.random() * 200) + 55; // 55-255
    const b = Math.floor(Math.random() * 200) + 55; // 55-255
    
    return `rgb(${r}, ${g}, ${b})`;
}

// 生成十六进制随机颜色
function generateRandomHexColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// 获取随机颜色（混合预定义颜色和随机生成）
function getRandomColor() {
    const randomChoice = Math.random();
    
    if (randomChoice < 0.5) {
        // 50% 概率使用预定义颜色
        return PREDEFINED_COLORS[Math.floor(Math.random() * PREDEFINED_COLORS.length)];
    } else if (randomChoice < 0.75) {
        // 25% 概率使用HSL随机颜色
        return generateRandomColor();
    } else if (randomChoice < 0.9) {
        // 15% 概率使用RGB随机颜色
        return generateRandomRGBColor();
    } else {
        // 10% 概率使用纯十六进制随机颜色
        return generateRandomHexColor();
    }
}

// 获取纯随机颜色
function getPureRandomColor() {
    const methods = [generateRandomColor, generateRandomRGBColor, generateRandomHexColor];
    const randomMethod = methods[Math.floor(Math.random() * methods.length)];
    return randomMethod();
}

// 获取暖色调颜色
function getWarmColor() {
    const warmColors = [
        '#FF6B6B', '#FF8A80', '#FF5722', '#FF9800', '#FFC107', 
        '#FFEB3B', '#FF7675', '#FDCB6E', '#E17055', '#FF4500',
        '#FF8C00', '#DAA520', '#F44336', '#E91E63', '#FF1493',
        '#FFB6C1', '#FFA07A', '#F0E68C', '#FFEAA7', '#F8C471'
    ];
    
    // 70% 概率使用预定义暖色，30% 概率生成暖色调随机颜色
    if (Math.random() < 0.7) {
        return warmColors[Math.floor(Math.random() * warmColors.length)];
    } else {
        // 生成暖色调HSL颜色 (红色到黄色范围: 0-60度)
        const hue = Math.floor(Math.random() * 60);
        const saturation = Math.floor(Math.random() * 40) + 60;
        const lightness = Math.floor(Math.random() * 30) + 40;
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
}

// 获取冷色调颜色
function getCoolColor() {
    const coolColors = [
        '#4ECDC4', '#45B7D1', '#96CEB4', '#85C1E9', '#74B9FF',
        '#00B894', '#00CEC9', '#55A3FF', '#03A9F4', '#2196F3',
        '#3F51B5', '#673AB7', '#9C27B0', '#00BCD4', '#009688',
        '#4CAF50', '#8BC34A', '#87CEEB', '#87CEFA', '#20B2AA',
        '#4facfe', '#00f2fe', '#43e97b', '#38f9d7'
    ];
    
    // 70% 概率使用预定义冷色，30% 概率生成冷色调随机颜色
    if (Math.random() < 0.7) {
        return coolColors[Math.floor(Math.random() * coolColors.length)];
    } else {
        // 生成冷色调HSL颜色 (青色到紫色范围: 180-300度)
        const hue = Math.floor(Math.random() * 120) + 180;
        const saturation = Math.floor(Math.random() * 40) + 60;
        const lightness = Math.floor(Math.random() * 30) + 40;
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
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

// 通用设置颜色函数
async function setColor(colorGenerator, actionName = 'setting color') {
    try {
        const tab = await getCurrentTab();
        const color = colorGenerator();
        
        // 检查是否是受限页面
        if (isRestrictedPage(tab.url)) {
            alert('This page does not support border functionality\n(chrome://, edge://, about: and other system pages)');
            return;
        }
        
        // 保存颜色到存储
        await chrome.storage.local.set({ [`color_${tab.id}`]: color });
        
        // 尝试注入content script并发送消息
        try {
            await injectContentScriptIfNeeded(tab.id);
            await chrome.tabs.sendMessage(tab.id, {
                action: 'setBorderColor',
                color: color
            });
            
            // 更新预览
            updateColorPreview(color);
            
        } catch (messageError) {
            console.log('Message sending failed, trying alternative method');
            // 如果消息发送失败，尝试直接注入代码
            await injectBorderDirectly(tab.id, color);
            updateColorPreview(color);
        }
        
    } catch (error) {
        console.error(`Error ${actionName}:`, error);
        alert('Failed to set border color, please refresh the page and try again');
    }
}

// 设置随机颜色
async function setRandomColor() {
    await setColor(getRandomColor, 'setting random color');
}

// 设置纯随机颜色
async function setPureRandomColor() {
    await setColor(getPureRandomColor, 'setting pure random color');
}

// 设置暖色调
async function setWarmColor() {
    await setColor(getWarmColor, 'setting warm color');
}

// 设置冷色调
async function setCoolColor() {
    await setColor(getCoolColor, 'setting cool color');
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
    document.getElementById('pureRandomColor').addEventListener('click', setPureRandomColor);
    document.getElementById('warmColor').addEventListener('click', setWarmColor);
    document.getElementById('coolColor').addEventListener('click', setCoolColor);
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