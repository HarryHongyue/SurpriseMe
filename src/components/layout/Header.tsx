import React, { useState, useEffect, useRef } from 'react';

/**
 * Header component with proper layout:
 * Left: Logo + Site Name
 * Right: Navigation Menu + Language Switcher
 */
const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState<boolean>(false);
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState<boolean>(false);
  const [currentLanguage, setCurrentLanguage] = useState<string>('EN');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const projectTimeoutRef = useRef<number | null>(null);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Load saved language - 不使用localStorage，改用内存存储
    setCurrentLanguage('EN');
    
    // 检查当前主题模式
    const bodyClasses = document.body.classList;
    const initialDarkMode = bodyClasses.contains('dark-mode');
    setIsDarkMode(initialDarkMode);
    
    // 确保模式类存在（如果都不存在，默认为浅色模式）
    if (!bodyClasses.contains('dark-mode') && !bodyClasses.contains('light-mode')) {
      bodyClasses.add('light-mode');
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // 监听颜色变更事件
  useEffect(() => {
    const handleColorChange = (event: CustomEvent) => {
      // 颜色变更时不需要重新应用模式，ThemeSwitcher已经处理了颜色主题
      // 这里不做任何操作，避免触发不必要的modeChange事件
      console.log('Header received colorChange event, but not triggering mode change');
    };
    
    window.addEventListener('colorChange', handleColorChange as EventListener);
    
    return () => {
      window.removeEventListener('colorChange', handleColorChange as EventListener);
    };
  }, [isDarkMode]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsLanguageDropdownOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Toggle language dropdown
  const toggleLanguageDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  // Handle language change
  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang.toUpperCase());
    setIsLanguageDropdownOpen(false);
    setIsMobileMenuOpen(false); // Close mobile menu if open
    
    // Trigger language change event
    window.dispatchEvent(new CustomEvent('languageChange', { detail: lang }));
  };

  // Handle project dropdown
  const handleProjectMouseEnter = () => {
    if (projectTimeoutRef.current) {
      window.clearTimeout(projectTimeoutRef.current);
    }
    setIsProjectDropdownOpen(true);
  };

  const handleProjectMouseLeave = () => {
    projectTimeoutRef.current = window.setTimeout(() => {
      setIsProjectDropdownOpen(false);
    }, 300); // 300ms延迟，给用户足够时间移动鼠标
  };

  // Handle navigation click
  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };
  
  // 切换明暗模式
  const toggleDarkMode = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    applyThemeMode(newDarkMode);
    
    // 打印调试信息
    console.log('Toggle dark mode:', newDarkMode);
  };
  
  // 应用主题模式（亮色/暗色）
  const applyThemeMode = (darkMode: boolean) => {
    const bodyClasses = document.body.classList;
    
    // 移除现有的模式类
    if (bodyClasses.contains('light-mode')) bodyClasses.remove('light-mode');
    if (bodyClasses.contains('dark-mode')) bodyClasses.remove('dark-mode');
    
    // 添加新的模式类
    bodyClasses.add(darkMode ? 'dark-mode' : 'light-mode');
    
    // 获取当前颜色主题
    const currentColorTheme = Array.from(bodyClasses)
      .find(cls => cls.endsWith('-theme') && !cls.includes('mode'));
    
    // 如果没有颜色主题，默认使用indigo
    const colorId = currentColorTheme ? currentColorTheme.replace('-theme', '') : 'indigo';
    if (!currentColorTheme) {
      bodyClasses.add('indigo-theme');
    }
    
    // 触发主题模式变更事件
    window.dispatchEvent(new CustomEvent('modeChange', { 
      detail: { 
        isDarkMode: darkMode,
        colorId: colorId
      } 
    }));
    
    // 直接调用 ThemeSwitcher 中的 applyColorTheme 函数来应用对应的颜色主题
    // 这将保持当前颜色不变，但会切换明暗模式
    try {
      // 使用 CustomEvent 来触发颜色主题应用
      // ThemeSwitcher 会监听这个事件并应用对应的主题
      window.dispatchEvent(new CustomEvent('applyTheme', {
        detail: {
          colorId: colorId,
          isDarkMode: darkMode
        }
      }));
      
      console.log(`Requested theme application for ${colorId} in ${darkMode ? 'dark' : 'light'} mode`);
    } catch (error) {
      console.error('Failed to apply theme:', error);
    }
    
    console.log(`Applied ${darkMode ? 'dark' : 'light'} mode for color: ${colorId}`);
  };

  return (
    <>
      {/* 内联样式来确保覆盖所有可能的样式冲突 */}
      <style>{`
        /* 确保导航链接没有边框 */
        .nav-links a,
        .nav-links a:hover,
        .nav-links a:focus,
        .nav-links a:active,
        .nav-links a:visited {
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
          text-decoration: none !important;
        }

        /* 移除所有可能的默认边框和轮廓 */
        *:focus {
          outline: none !important;
        }

        a:focus,
        button:focus,
        input:focus,
        textarea:focus,
        select:focus {
          outline: none !important;
          box-shadow: 0 0 0 2px var(--primary-color) !important;
        }

        /* 语言切换按钮样式修复 */
        .language-btn {
          background-color: transparent !important;
          border: 1px solid var(--primary-color) !important;
          color: var(--primary-color) !important;
        }

        .language-btn:hover {
          background-color: var(--primary-color) !important;
          color: var(--button-text) !important;
        }

        /* 语言下拉菜单修复 */
        .language-dropdown {
          background-color: var(--card-bg) !important;
          border: 1px solid var(--border-color) !important;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .language-dropdown li {
          color: var(--body-text) !important;
          background-color: transparent;
        }

        .language-dropdown li:hover {
          background-color: var(--bg-tertiary) !important;
          color: var(--primary-color) !important;
        }

        .language-dropdown li.active {
          color: var(--primary-color) !important;
          background-color: var(--bg-tertiary) !important;
        }

        /* 语言切换器和项目切换器容器修复 */
        .language-switcher {
          position: relative;
        }

        .language-hover-wrapper .hover-dropdown {
          background-color: var(--card-bg) !important;
          border: 1px solid var(--border-color) !important;
          right: 0;
          left: auto;
        }

        /* 主题模式切换按钮样式 */
        .theme-mode-switcher {
          margin-left: 15px;
          z-index: 100;
        }
        
        .mode-toggle-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          background-color: var(--bg-primary);
          color: var(--primary-color);
          box-shadow: none;
          position: relative;
          overflow: hidden;
        }
        
        .mode-toggle-btn:hover {
          transform: rotate(15deg) scale(1.1);
          color: #ffffff;
          background-color: var(--primary-color);
        }
        
        .mode-toggle-btn.light {
          background-color: #ffffff;
          color: #6366f1; /* 确保图标在浅色模式下可见 */
          border-color: #6366f1;
        }
        
        .mode-toggle-btn.dark {
          background-color: #1e293b;
          color: #f8fafc;
          border-color: #f8fafc;
        }
        
        /* 添加按钮点击效果 */
        .mode-toggle-btn:active {
          transform: scale(0.95);
        }
        
        /* 添加图标样式 */
        .mode-toggle-btn i {
          font-size: 1.2rem;
        }
        
        @media (max-width: 768px) {
          .theme-mode-switcher {
            margin-left: 10px;
          }
          
          .mode-toggle-btn {
            width: 32px;
            height: 32px;
          }
        }

        /* 项目下拉菜单样式 - 使用JavaScript控制显示 */
        .project-hover-wrapper {
          position: relative;
          display: inline-block;
        }

        .project-hover-wrapper .project-dropdown {
          display: none;
          position: absolute;
          top: calc(100% + 15px); /* 保持15px间距 */
          right: 0;
          background-color: var(--card-bg) !important;
          border: 1px solid var(--border-color) !important;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          border-radius: 5px;
          min-width: max-content;
          white-space: nowrap;
          z-index: 1000;
          padding: 0;
          margin: 0;
          list-style: none;
          opacity: 0;
          transform: translateY(-10px);
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .project-hover-wrapper .project-dropdown.show {
          display: block;
          opacity: 1;
          transform: translateY(0);
        }

        .project-dropdown li {
          padding: 10px 15px;
          color: var(--body-text) !important;
          background-color: transparent;
          border-bottom: 1px solid var(--border-color);
          text-align: right;
          font-size: 14px;
        }

        .project-dropdown li:last-child {
          border-bottom: none;
        }

        .project-dropdown li:hover {
          background-color: var(--bg-tertiary) !important;
          color: var(--primary-color) !important;
        }

        .project-dropdown li a {
          color: inherit !important;
          text-decoration: none !important;
          display: block;
          width: 100%;
          height: 100%;
          white-space: nowrap;
        }

        /* 统一下拉菜单字体大小 */
        .language-dropdown li {
          color: var(--body-text) !important;
          background-color: transparent;
          font-size: 14px;
          text-align: right;
          padding: 10px 15px;
        }

        .language-dropdown {
          background-color: var(--card-bg) !important;
          border: 1px solid var(--border-color) !important;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          min-width: max-content;
          white-space: nowrap;
        }

        /* 移动端汉堡菜单 */
        .hamburger .line {
          background-color: var(--text-color) !important;
        }

        /* 移动端导航 */
        .nav-links {
          background-color: transparent !important;
          border: none;
        }
        
        /* 导航链接项 */
        .nav-links li {
          background-color: transparent !important;
        }

        /* 确保Logo颜色正确应用 */
        .logo-link span {
          color: var(--primary-color) !important;
        }

        /* 确保导航链接颜色正确应用 */
        .nav-links a {
          color: var(--primary-color) !important;
        }

        .nav-links a:hover {
          color: var(--primary-color) !important;
        }

        .nav-links a.active {
          color: var(--primary-color) !important;
        }

        /* 确保导航链接下划线使用主题色 */
        .nav-links a::after {
          background-color: var(--primary-color) !important;
        }

        /* 移动端项目下拉菜单 - 已移除不需要的样式 */
        
        /* 清除导航链接所有边框 */
        .clean-link {
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
          background: transparent !important;
          background-color: transparent !important;
        }
      `}</style>

      <header className={`${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <nav>
            {/* Left side: Logo + Site Name */}
            <div className="logo">
              <a href="#home" className="logo-link">
                <img src="/logo.png" alt="SurpriseMe Logo" style={{ height: '40px', width: 'auto' }} />
                <span>SurpriseMe</span>
              </a>
            </div>

            {/* Right side: Navigation Menu (Desktop) */}
            <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
              <li><a href="#home" className="active clean-link">Home</a></li>
              <li><a href="#features" className="clean-link">Features</a></li>
              <li><a href="#download" className="clean-link">Download</a></li>
              <li><a href="#privacy" className="clean-link">Privacy</a></li>
            {/* Projects with controlled dropdown */}
            <li className="project-switcher">
                <div 
                  className="project-hover-wrapper"
                  onMouseEnter={handleProjectMouseEnter}
                  onMouseLeave={handleProjectMouseLeave}
                >
                  <a href="#projects" className="clean-link">
                   Other Projects
                  </a>
                  <ul className={`project-dropdown ${isProjectDropdownOpen ? 'show' : ''}`}>
                  <li>
                      <a 
                        href="https://harryhongyue.site/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Resources Site
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://odesolver.harryhongyue.site/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        ODE Solver
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              
              
              
              {/* Language Switcher (Mobile - inside menu) */}
              <li className="language-switcher-mobile">
                <div className="language-switcher">
                  <button 
                    className="language-btn"
                    onClick={toggleLanguageDropdown}
                  >
                    {currentLanguage} <i className="fas fa-globe"></i>
                  </button>
                  <ul className={`language-dropdown ${isLanguageDropdownOpen ? 'active' : ''}`}>
                    <li 
                      className={currentLanguage === 'EN' ? 'active' : ''}
                      onClick={() => handleLanguageChange('en')}
                    >
                      English
                    </li>
                    <li 
                      className={currentLanguage === 'ZH' ? 'active' : ''}
                      onClick={() => handleLanguageChange('zh')}
                    >
                      中文
                    </li>
                    <li 
                      className={currentLanguage === 'NL' ? 'active' : ''}
                      onClick={() => handleLanguageChange('nl')}
                    >
                      Nederlands
                    </li>
                  </ul>
                </div>
              </li>
            </ul>

            {/* Language Switcher (Desktop) - hover effect */}
            <div className="language-switcher desktop-only">
              <div className="language-hover-wrapper">
                <button className="language-btn">
                  {currentLanguage} <i className="fas fa-globe"></i>
                </button>
                <ul className="language-dropdown hover-dropdown">
                  <li 
                    className={currentLanguage === 'EN' ? 'active' : ''}
                    onClick={() => handleLanguageChange('en')}
                  >
                    English
                  </li>
                  <li 
                    className={currentLanguage === 'ZH' ? 'active' : ''}
                    onClick={() => handleLanguageChange('zh')}
                  >
                    中文
                  </li>
                  <li 
                    className={currentLanguage === 'NL' ? 'active' : ''}
                    onClick={() => handleLanguageChange('nl')}
                  >
                    Nederlands
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Theme Mode Switcher */}
            <div className="theme-mode-switcher">
              <button 
                className={`mode-toggle-btn ${isDarkMode ? 'dark' : 'light'}`}
                onClick={(e) => toggleDarkMode(e)}
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                type="button"
              >
                {isDarkMode ? (
                  <i className="fas fa-sun"></i>
                ) : (
                  <i className="fas fa-moon" style={{color: '#000'}}></i>
                )}
              </button>
            </div>

            {/* Mobile Hamburger Menu */}
            <div className="hamburger" onClick={toggleMobileMenu}>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;