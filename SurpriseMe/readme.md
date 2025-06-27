# SurpriseMe - Browser Border Color Extension

[English](#english)

<a name="english"></a>

## English Version

A Chrome extension similar to VSCode's Peacock feature that adds colorful borders to browser windows, helping you distinguish between different browser windows.

### Features

- 🎨 **Random Color Borders**: Click the extension icon to add a random color border to the current browser window
- 🎯 **Independent Windows**: Each browser window has its own border color setting
- 🔄 **Instant Switching**: Change or remove border colors anytime
- 💾 **Auto-Save**: Color settings are automatically saved and persist after page refresh
- 🎪 **No Restrictions**: Works regardless of browser theme or account settings
- 🚀 **Performance Optimized**: Lightweight design that doesn't affect browser performance

### Installation

#### 1. Download Files
Save the following files to the same folder:
- `manifest.json`
- `popup.html`
- `popup.js`
- `content.js`
- `background.js`
- `styles.css`

#### 2. Prepare Icon Files
Create the following icon files (you can use any PNG images):
- `icon16.png` (16x16 pixels)
- `icon48.png` (48x48 pixels)
- `icon128.png` (128x128 pixels)

#### 3. Install the Extension
1. Open Chrome browser
2. Enter `chrome://extensions/` in the address bar
3. Enable "Developer mode" in the top-right corner
4. Click "Load unpacked"
5. Select the folder containing all files
6. Extension installed!

### How to Use

#### Basic Usage
1. Click the extension icon in the browser toolbar
2. Click "Random Border Color" in the popup
3. The browser border will immediately change to a random color
4. Click "Remove Border Color" to remove the border

#### Advanced Features
- **Multi-window Support**: Each browser window has its own border color
- **Auto-save**: Color settings are automatically saved and persist when reopening pages
- **Live Preview**: The popup displays a preview of the current border color

### Technical Implementation

#### Core Technologies
- **Manifest V3**: Uses the latest Chrome extension API
- **Content Scripts**: Injects border elements into pages
- **Storage API**: Saves color settings for each tab
- **Message Passing**: Communication between popup and content script

#### Border Implementation
- Uses `position: fixed` to create a border element covering the entire viewport
- Sets `pointer-events: none` to ensure it doesn't interfere with page interactions
- Uses the highest `z-index` to ensure the border is always visible
- Implements `mix-blend-mode` for color blending effects

### File Structure

```
surprise-me/
├── manifest.json          # Extension configuration
├── popup.html            # Popup interface
├── popup.js              # Popup logic
├── content.js            # Content script
├── background.js         # Background script
├── styles.css            # Styles
├── icon16.png            # 16x16 icon
├── icon48.png            # 48x48 icon
└── icon128.png           # 128x128 icon
```

### Color Scheme

The extension includes 35 carefully selected colors:
- Includes warm, cool, and neutral tones
- Ensures good visibility on various backgrounds
- Moderate saturation to avoid being too harsh on the eyes

### Notes

1. **Compatibility**: Only supports Chrome browser (and other Chromium-based browsers)
2. **Permissions**: The extension needs access to all websites to add border effects
3. **Performance**: Border elements use CSS hardware acceleration for minimal performance impact
4. **Privacy**: All data is stored locally and not uploaded to any server

### Troubleshooting

#### Border Not Showing
- Check if the extension is properly installed and enabled
- Try refreshing the page
- Check if the browser is blocking content scripts

#### Color Not Saving
- Make sure the browser allows the extension to access storage permissions
- Check if you're using incognito mode

#### Extension Not Loading
- Ensure all files are in the same folder
- Check if the manifest.json syntax is correct
- Try reloading the extension

### Version History

#### v1.0.0
- Initial release
- Support for random color borders
- Support for saving and removing colors
- Support for independent settings for multiple windows

### Developer Information

To customize colors or modify functionality, you can edit the source code files. The extension uses standard Chrome Extension API, making it easy to extend and modify.