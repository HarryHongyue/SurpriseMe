import React, { useState, useEffect } from 'react';
import ArcBlackLogo from '../../assets/images/Arc black logo.png';
import ArcWhiteLogo from '../../assets/images/Arc white logo.png';
import { useLanguage } from '../../i18n/LanguageProvider';

const ArcBrowserButton: React.FC = () => {
  // Get translation function
  const { t } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // 检测当前主题模式
  useEffect(() => {
    // 初始检查
    const checkTheme = () => {
      const bodyClasses = document.body.classList;
      setIsDarkMode(bodyClasses.contains('dark-mode'));
    };
    
    // 监听主题变化事件
    const handleModeChange = () => {
      checkTheme();
    };
    
    // 初始检查
    checkTheme();
    
    // 添加事件监听
    window.addEventListener('modeChange', handleModeChange);
    
    // 清理
    return () => {
      window.removeEventListener('modeChange', handleModeChange);
    };
  }, []);

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
          src={isDarkMode ? ArcWhiteLogo : ArcBlackLogo}
          alt="Arc Browser"
          className="w-full h-full object-contain"
        />
      </div>
      <span className="text-sm font-medium">{t('download.arc', 'Arc')}</span>
    </a>
  );
};

export default ArcBrowserButton;