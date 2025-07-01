import React from 'react';
import ArcBlackLogo from '../../assets/images/Arc black logo.png';
import ArcWhiteLogo from '../../assets/images/Arc white logo.png';

const ArcBrowserButton: React.FC = () => {
  // 简单检查：如果CSS变量--bg-primary是深色，就是暗色主题
  const isDarkTheme = () => {
    const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--bg-primary');
    return bgColor.includes('#0f0f23'); // 你的深色背景色
  };

  return (
    <a 
      href="https://chrome.google.com/webstore/detail/your-extension-id" 
      target="_blank" 
      rel="noopener noreferrer"
      className="browser-store-btn flex flex-col items-center p-4 rounded-lg transition-all duration-300"
      style={{
        backgroundColor: 'var(--bg-tertiary)',
        color: 'var(--body-text)',
      }}
    >
      <div className="relative w-8 h-8 mb-2">
        <img 
          src={isDarkTheme() ? ArcWhiteLogo : ArcBlackLogo}
          alt="Arc Browser"
          className="w-full h-full object-contain"
        />
      </div>
      <span className="text-sm font-medium">Arc</span>
    </a>
  );
};

export default ArcBrowserButton;