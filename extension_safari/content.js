// Use browser namespace for cross-browser compatibility
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

// Border element ID
const BORDER_ID = 'surprise-me-border';
let borderObserver = null;

// Create border element
function createBorderElement(color) {
    // Remove existing border if any
    removeBorderElement();
    
    try {
        const borderElement = document.createElement('div');
        borderElement.id = BORDER_ID;
        borderElement.style.cssText = `
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            pointer-events: none !important;
            z-index: 2147483647 !important; /* Maximum z-index */
            border: 8px solid ${color} !important;
            box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.3) !important;
            mix-blend-mode: normal !important;
        `;
        
        // Add to document
        document.documentElement.appendChild(borderElement);
        
        // Set up observer to keep border on top
        setupBorderObserver(borderElement);
        
        return true;
    } catch (error) {
        console.error('Error creating border element:', error);
        return false;
    }
}

// Remove border element
function removeBorderElement() {
    try {
        const existingBorder = document.getElementById(BORDER_ID);
        if (existingBorder) {
            existingBorder.remove();
        }
        
        // Clean up observer if it exists
        if (borderObserver) {
            borderObserver.disconnect();
            borderObserver = null;
        }
        
        return true;
    } catch (error) {
        console.error('Error removing border element:', error);
        return false;
    }
}

// Set up observer to keep border on top
function setupBorderObserver(borderElement) {
    if (borderObserver) {
        borderObserver.disconnect();
    }
    
    borderObserver = new MutationObserver(() => {
        if (borderElement.parentNode !== document.documentElement) {
            document.documentElement.appendChild(borderElement);
        }
    });
    
    borderObserver.observe(document.documentElement, { childList: true });
    
    // Clean up observer when page unloads
    window.addEventListener('unload', () => {
        if (borderObserver) {
            borderObserver.disconnect();
            borderObserver = null;
        }
    });
}

// Listen for messages from popup
browserAPI.runtime.onMessage.addListener((message, sender, sendResponse) => {
    let response = { success: false };
    
    try {
        switch (message.action) {
            case 'setBorderColor':
                response.success = createBorderElement(message.color);
                break;
                
            case 'removeBorderColor':
                response.success = removeBorderElement();
                break;
                
            case 'ping':
                response = { status: 'ready' };
                break;
                
            default:
                console.warn('Unknown action:', message.action);
                break;
        }
    } catch (error) {
        console.error('Error handling message:', error);
        response.error = error.message;
    }
    
    // Send response if available (for async operations)
    if (sendResponse) {
        sendResponse(response);
    }
    
    // Return true to keep the message channel open for async response
    return true;
});

// Initialize when the page is loaded
function initializeBorder() {
    // Check if we're on a restricted page
    if (isRestrictedPage(window.location.href)) {
        return;
    }
    
    // Listen for page visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Initialize border if needed
    browserAPI.runtime.sendMessage({ action: 'getCurrentTabId' }, (response) => {
        if (browserAPI.runtime.lastError) {
            console.warn('Could not get tab ID:', browserAPI.runtime.lastError);
            return;
        }
        
        const tabId = response?.tabId;
        if (tabId) {
            // Get stored color for this tab
            browserAPI.storage.local.get(`color_${tabId}`, (result) => {
                const color = result[`color_${tabId}`];
                if (color) {
                    createBorderElement(color);
                }
            });
        }
    });
}

// Handle page visibility changes
function handleVisibilityChange() {
    if (!document.hidden) {
        // Page became visible, reapply border if needed
        initializeBorder();
    } else {
        // Page is hidden, clean up
        removeBorderElement();
    }
}

// Check if page is restricted (browser pages, extensions, etc.)
function isRestrictedPage(url) {
    if (!url) return true;
    
    const restrictedPatterns = [
        'chrome://',
        'chrome-extension://',
        'edge://',
        'about:',
        'moz-extension://',
        'safari-extension://',
        'safari-web-extension://',
        'file://',
        'data:'
    ];
    
    return restrictedPatterns.some(pattern => url.startsWith(pattern));
}

// Initialize when the DOM is ready
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