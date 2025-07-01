import React, { useState, useEffect, useRef } from 'react';

/**
 * 重新设计的主题切换器组件
 * 正确的主题色彩层次：背景、主色调、文本、强调色
 * 现在只负责颜色选择，不负责模式选择
 */
interface ThemeSwitcherProps {
  // Optional props can be added here
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeColor, setActiveColor] = useState<string>('indigo');
  const themeSwitcherRef = useRef<HTMLDivElement>(null);

  // 重新设计的主题配置 - 每种颜色都有明暗两种模式
  // 浅色主题配置
  const lightThemes = [
    { 
      id: 'default', 
      name: 'Ocean Blue', 
      gradient: 'linear-gradient(135deg, #2d99bd, #49b1d4)',
      cssVars: {
        '--primary-color': '#2d99bd',
        '--secondary-color': '#49b1d4',
        '--accent-color': '#1a73e8',
        '--text-color': '#2d99bd',
        '--body-text': '#333333',
        '--light-text': '#ffffff',
        '--bg-primary': '#ffffff',
        '--bg-secondary': '#f8fafc',
        '--bg-tertiary': '#e2e8f0',
        '--border-color': '#e2e8f0',
        '--header-bg': 'rgba(255, 255, 255, 0.95)',
        '--card-bg': '#ffffff',
        '--button-text': '#ffffff'
      }
    },
    { 
      id: 'purple', 
      name: 'Purple', 
      gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
      cssVars: {
        '--primary-color': '#8b5cf6',
        '--secondary-color': '#a78bfa',
        '--accent-color': '#7c3aed',
        '--text-color': '#8b5cf6',
        '--body-text': '#333333',
        '--light-text': '#ffffff',
        '--bg-primary': '#ffffff',
        '--bg-secondary': '#faf7ff',
        '--bg-tertiary': '#f3f0ff',
        '--border-color': '#e9e5ff',
        '--header-bg': 'rgba(255, 255, 255, 0.95)',
        '--card-bg': '#ffffff',
        '--button-text': '#ffffff'
      }
    },
    { 
      id: 'emerald', 
      name: 'Emerald', 
      gradient: 'linear-gradient(135deg, #10b981, #34d399)',
      cssVars: {
        '--primary-color': '#10b981',
        '--secondary-color': '#34d399',
        '--accent-color': '#059669',
        '--text-color': '#10b981',
        '--body-text': '#333333',
        '--light-text': '#ffffff',
        '--bg-primary': '#ffffff',
        '--bg-secondary': '#f7fef9',
        '--bg-tertiary': '#ecfdf5',
        '--border-color': '#d1fae5',
        '--header-bg': 'rgba(255, 255, 255, 0.95)',
        '--card-bg': '#ffffff',
        '--button-text': '#ffffff'
      }
    },
    { 
      id: 'orange', 
      name: 'Orange', 
      gradient: 'linear-gradient(135deg, #f97316, #fb923c)',
      cssVars: {
        '--primary-color': '#f97316',
        '--secondary-color': '#fb923c',
        '--accent-color': '#ea580c',
        '--text-color': '#f97316',
        '--body-text': '#333333',
        '--light-text': '#ffffff',
        '--bg-primary': '#ffffff',
        '--bg-secondary': '#fffbf5',
        '--bg-tertiary': '#fff7ed',
        '--border-color': '#fed7aa',
        '--header-bg': 'rgba(255, 255, 255, 0.95)',
        '--card-bg': '#ffffff',
        '--button-text': '#ffffff'
      }
    },
    { 
      id: 'rose', 
      name: 'Rose', 
      gradient: 'linear-gradient(135deg, #e11d48, #f43f5e)',
      cssVars: {
        '--primary-color': '#e11d48',
        '--secondary-color': '#f43f5e',
        '--accent-color': '#be123c',
        '--text-color': '#e11d48',
        '--body-text': '#333333',
        '--light-text': '#ffffff',
        '--bg-primary': '#ffffff',
        '--bg-secondary': '#fffbfc',
        '--bg-tertiary': '#fff1f2',
        '--border-color': '#fce7f3',
        '--header-bg': 'rgba(255, 255, 255, 0.95)',
        '--card-bg': '#ffffff',
        '--button-text': '#ffffff'
      }
    },
    { 
      id: 'indigo', 
      name: 'Indigo', 
      gradient: 'linear-gradient(135deg, #6366f1, #818cf8)',
      cssVars: {
        '--primary-color': '#6366f1',
        '--secondary-color': '#818cf8',
        '--accent-color': '#4f46e5',
        '--text-color': '#6366f1',
        '--body-text': '#333333',
        '--light-text': '#ffffff',
        '--bg-primary': '#ffffff',
        '--bg-secondary': '#fafaff',
        '--bg-tertiary': '#eef2ff',
        '--border-color': '#e0e7ff',
        '--header-bg': 'rgba(255, 255, 255, 0.95)',
        '--card-bg': '#ffffff',
        '--button-text': '#ffffff'
      }
    },
  ];
  
  // 暗色主题配置
  const darkThemes = [
    { 
      id: 'default', 
      name: 'Ocean Blue Dark', 
      gradient: 'linear-gradient(135deg, #1a5f7a, #2d99bd)',
      cssVars: {
        '--primary-color': '#4fb3d9',
        '--secondary-color': '#6bc5e8',
        '--accent-color': '#2d99bd',
        '--text-color': '#4fb3d9',
        '--body-text': '#e2e8f0',
        '--light-text': '#ffffff',
        '--bg-primary': '#0f172a',
        '--bg-secondary': '#1e293b',
        '--bg-tertiary': '#334155',
        '--border-color': '#334155',
        '--header-bg': 'rgba(15, 23, 42, 0.95)',
        '--card-bg': '#1e293b',
        '--button-text': '#ffffff'
      }
    },
    { 
      id: 'purple', 
      name: 'Purple Dark', 
      gradient: 'linear-gradient(135deg, #5b21b6, #7c3aed)',
      cssVars: {
        '--primary-color': '#a78bfa',
        '--secondary-color': '#c4b5fd',
        '--accent-color': '#8b5cf6',
        '--text-color': '#a78bfa',
        '--body-text': '#e2e8f0',
        '--light-text': '#ffffff',
        '--bg-primary': '#1a0f2e',
        '--bg-secondary': '#2d1b4e',
        '--bg-tertiary': '#4c2a6b',
        '--border-color': '#4c2a6b',
        '--header-bg': 'rgba(26, 15, 46, 0.95)',
        '--card-bg': '#2d1b4e',
        '--button-text': '#ffffff'
      }
    },
    { 
      id: 'emerald', 
      name: 'Emerald Dark', 
      gradient: 'linear-gradient(135deg, #065f46, #10b981)',
      cssVars: {
        '--primary-color': '#34d399',
        '--secondary-color': '#6ee7b7',
        '--accent-color': '#10b981',
        '--text-color': '#34d399',
        '--body-text': '#e2e8f0',
        '--light-text': '#ffffff',
        '--bg-primary': '#0f1e17',
        '--bg-secondary': '#1a2f23',
        '--bg-tertiary': '#2d4a37',
        '--border-color': '#2d4a37',
        '--header-bg': 'rgba(15, 30, 23, 0.95)',
        '--card-bg': '#1a2f23',
        '--button-text': '#ffffff'
      }
    },
    { 
      id: 'orange', 
      name: 'Orange Dark', 
      gradient: 'linear-gradient(135deg, #c2410c, #ea580c)',
      cssVars: {
        '--primary-color': '#fb923c',
        '--secondary-color': '#fdba74',
        '--accent-color': '#f97316',
        '--text-color': '#fb923c',
        '--body-text': '#e2e8f0',
        '--light-text': '#ffffff',
        '--bg-primary': '#1f0f0a',
        '--bg-secondary': '#3a1a0f',
        '--bg-tertiary': '#5c2d1a',
        '--border-color': '#5c2d1a',
        '--header-bg': 'rgba(31, 15, 10, 0.95)',
        '--card-bg': '#3a1a0f',
        '--button-text': '#ffffff'
      }
    },
    { 
      id: 'rose', 
      name: 'Rose Dark', 
      gradient: 'linear-gradient(135deg, #9f1239, #be123c)',
      cssVars: {
        '--primary-color': '#f43f5e',
        '--secondary-color': '#fb7185',
        '--accent-color': '#e11d48',
        '--text-color': '#f43f5e',
        '--body-text': '#e2e8f0',
        '--light-text': '#ffffff',
        '--bg-primary': '#1f0a0e',
        '--bg-secondary': '#3a0f1a',
        '--bg-tertiary': '#5c1a2b',
        '--border-color': '#5c1a2b',
        '--header-bg': 'rgba(31, 10, 14, 0.95)',
        '--card-bg': '#3a0f1a',
        '--button-text': '#ffffff'
      }
    },
    { 
      id: 'indigo', 
      name: 'Indigo Dark', 
      gradient: 'linear-gradient(135deg, #4338ca, #5b21b6)',
      cssVars: {
        '--primary-color': '#818cf8',
        '--secondary-color': '#a5b4fc',
        '--accent-color': '#6366f1',
        '--text-color': '#818cf8',
        '--body-text': '#e2e8f0',
        '--light-text': '#ffffff',
        '--bg-primary': '#0f0f23',
        '--bg-secondary': '#1a1a3a',
        '--bg-tertiary': '#2d2d5f',
        '--border-color': '#2d2d5f',
        '--header-bg': 'rgba(15, 15, 35, 0.95)',
        '--card-bg': '#1a1a3a',
        '--button-text': '#ffffff'
      }
    }
  ];
  
  // 合并所有主题供展示使用 - 只展示浅色主题供选择
  const colorThemes = lightThemes;

  // 根据当前模式获取对应的主题配置
  const getThemeByColorAndMode = (colorId: string, isDarkMode: boolean) => {
    const themeList = isDarkMode ? darkThemes : lightThemes;
    return themeList.find(t => t.id === colorId);
  };

  // 应用颜色主题
  const applyColorTheme = (colorId: string) => {
    const bodyClasses = document.body.classList;
    const isDarkMode = bodyClasses.contains('dark-mode');
    const theme = getThemeByColorAndMode(colorId, isDarkMode);
    
    if (!theme) return;

    // 移除旧的颜色主题类
    const themeClassesToRemove = Array.from(bodyClasses).filter(cls =>
      cls.endsWith('-theme') && !cls.includes('mode')
    );
    themeClassesToRemove.forEach(cls => bodyClasses.remove(cls));

    // 添加新的颜色主题类
    bodyClasses.add(`${colorId}-theme`);

    // 应用CSS变量
    const root = document.documentElement;
    Object.entries(theme.cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value as string);
    });

    // 触发颜色变更事件
    window.dispatchEvent(new CustomEvent('colorChange', {
      detail: {
        colorId: colorId,
        isDarkMode: isDarkMode
      }
    }));
    
    console.log(`Applied ${isDarkMode ? 'dark' : 'light'} theme for color: ${colorId}`);
  };

  // 处理颜色选择
  const handleColorChange = (colorId: string) => {
    console.log('Color change clicked:', colorId);
    setActiveColor(colorId);
    
    // 获取当前模式
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // 应用颜色主题
    applyColorTheme(colorId);

    // 延迟关闭调色板，让用户看到选中效果
    setTimeout(() => {
      setIsOpen(false);
    }, 300);

    // 保存选择到本地存储
    localStorage.setItem('selectedColorTheme', colorId);
  };

  // 切换调色板显示状态
  const toggleThemePanel = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Toggle theme panel clicked');
    setIsOpen(!isOpen);
  };

  // 初始化主题
  useEffect(() => {
    // 立即应用默认颜色
    const savedColorId = localStorage.getItem('selectedColorTheme') || 'indigo';
    setActiveColor(savedColorId);
    
    // 检查当前模式并应用对应的主题
    const isDarkMode = document.body.classList.contains('dark-mode');
    const theme = getThemeByColorAndMode(savedColorId, isDarkMode);
    
    if (theme) {
      // 应用主题类
      const bodyClasses = document.body.classList;
      const themeClassesToRemove = Array.from(bodyClasses).filter(cls =>
        cls.endsWith('-theme') && !cls.includes('mode')
      );
      themeClassesToRemove.forEach(cls => bodyClasses.remove(cls));
      bodyClasses.add(`${savedColorId}-theme`);
      
      // 应用CSS变量
      const root = document.documentElement;
      Object.entries(theme.cssVars).forEach(([key, value]) => {
        root.style.setProperty(key, value as string);
      });
      
      console.log(`Initialized ${isDarkMode ? 'dark' : 'light'} theme for color: ${savedColorId}`);
    } else {
      // 如果没有找到对应的主题，则应用默认主题
      applyColorTheme(savedColorId);
    }
    
    // 点击外部关闭调色板
    const handleClickOutside = (event: MouseEvent) => {
      if (
        themeSwitcherRef.current && 
        !themeSwitcherRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 监听模式变更事件
  useEffect(() => {
    const handleModeChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      const { isDarkMode, colorId } = customEvent.detail;
      
      // 如果有颜色ID，则应用该颜色的主题
      if (colorId) {
        // 获取对应模式的主题配置并应用
        const theme = getThemeByColorAndMode(colorId, isDarkMode);
        if (theme) {
          // 应用CSS变量
          const root = document.documentElement;
          Object.entries(theme.cssVars).forEach(([key, value]) => {
            root.style.setProperty(key, value as string);
          });
          console.log(`Mode change: Applied ${isDarkMode ? 'dark' : 'light'} theme for color: ${colorId}`);
        }
      } else {
        // 否则应用当前选中的颜色主题
        applyColorTheme(activeColor);
      }
    };

    window.addEventListener('modeChange', handleModeChange);
    
    return () => {
      window.removeEventListener('modeChange', handleModeChange);
    };
  }, [activeColor]);

  return (
    <>
      {/* 内联样式 */}
      <style>{`
        .floating-theme-switcher {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 1000;
          display: flex;
          align-items: flex-end;
          gap: 20px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .palette-toggle-btn {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
          border: none;
          color: var(--button-text);
          font-size: 1.4rem;
          cursor: pointer;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
        }

        .palette-toggle-btn:hover {
          transform: scale(1.1) rotate(10deg);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
        }

        .floating-theme-switcher.open .palette-toggle-btn {
          transform: rotate(180deg);
          background: linear-gradient(135deg, var(--accent-color), var(--primary-color));
        }

        .theme-palette {
          background: var(--card-bg);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border: 1px solid var(--border-color);
          opacity: 0;
          visibility: hidden;
          transform: translateX(20px) scale(0.9);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          min-width: 280px;
        }

        .theme-palette.visible {
          opacity: 1;
          visibility: visible;
          transform: translateX(0) scale(1);
        }

        .palette-title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-color);
          margin-bottom: 15px;
          text-align: center;
          letter-spacing: 0.5px;
        }

        .theme-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          padding: 5px;
        }

        .theme-color-option {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          cursor: pointer;
          border: 3px solid;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .theme-color-option.light {
          border-color: #ffffff;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .theme-color-option.dark {
          border-color: #1f2937;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .theme-color-option:hover {
          transform: scale(1.15);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .theme-color-option.active {
          transform: scale(1.1);
          border-width: 4px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
        }

        .active-indicator {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          color: #1f2937;
          animation: checkmark 0.3s ease;
        }

        @keyframes checkmark {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .floating-theme-switcher {
            bottom: 20px;
            right: 20px;
          }
          
          .palette-toggle-btn {
            width: 50px;
            height: 50px;
            font-size: 1.2rem;
          }
          
          .theme-palette {
            min-width: 240px;
            padding: 15px;
          }
          
          .theme-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
          }
          
          .theme-color-option {
            width: 40px;
            height: 40px;
          }
        }

        /* 全局背景和基础颜色 */
        body {
          background-color: var(--bg-primary) !important;
          color: var(--body-text) !important;
          transition: all 0.3s ease;
        }

        /* 区块背景层次 */
        .hero {
          background-color: var(--bg-primary) !important;
          color: var(--body-text) !important;
        }

        .about {
          background-color: var(--bg-secondary) !important;
          color: var(--body-text) !important;
        }

        .projects {
          background-color: var(--bg-primary) !important;
          color: var(--body-text) !important;
        }

        .skills {
          background-color: var(--bg-secondary) !important;
          color: var(--body-text) !important;
        }

        .contact {
          background-color: var(--bg-primary) !important;
          color: var(--body-text) !important;
        }

        /* 头部样式 */
        header {
          background-color: var(--header-bg) !important;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          border-bottom: 1px solid var(--border-color);
        }

        /* 导航样式 */
        .logo {
          color: var(--primary-color) !important;
        }

        .nav-links a {
          color: var(--text-color) !important;
          transition: color 0.3s ease;
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
        }

        .nav-links a:hover {
          color: var(--primary-color) !important;
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
        }

        .nav-links a::after {
          background-color: var(--primary-color) !important;
        }

        /* 移除导航链接的边框 */
        .nav-links li a {
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
        }

        /* 按钮样式 */
        .btn {
          transition: all 0.3s ease;
        }

        .primary-btn {
          background-color: var(--primary-color) !important;
          color: var(--button-text) !important;
          border: none;
        }

        .primary-btn:hover {
          background-color: var(--secondary-color) !important;
          color: var(--button-text) !important;
        }

        .secondary-btn {
          background-color: transparent !important;
          color: var(--primary-color) !important;
          border: 2px solid var(--primary-color) !important;
        }

        .secondary-btn:hover {
          background-color: var(--primary-color) !important;
          color: var(--button-text) !important;
        }

        /* 卡片样式 */
        .project-card,
        .contact-form,
        .skill-category {
          background-color: var(--card-bg) !important;
          border: 1px solid var(--border-color);
          color: var(--body-text) !important;
          transition: all 0.3s ease;
        }

        .project-card:hover {
          border-color: var(--primary-color) !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        /* 标题和文本 */
        h1, h2, h3, h4, h5, h6 {
          color: var(--body-text) !important;
        }

        .section-title {
          color: var(--body-text) !important;
        }

        .section-title::after {
          background-color: var(--primary-color) !important;
        }

        .highlight {
          color: var(--primary-color) !important;
        }

        /* 表单控件 */
        .form-control {
          background-color: var(--bg-secondary) !important;
          border: 1px solid var(--border-color) !important;
          color: var(--body-text) !important;
        }

        .form-control:focus {
          border-color: var(--primary-color) !important;
          box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
        }

        .form-control::placeholder {
          color: rgba(0, 0, 0, 0.5) !important;
        }

        /* 深色主题下的表单控件 */
        body.dark-mode .form-control::placeholder {
          color: rgba(255, 255, 255, 0.5) !important;
        }

        /* 过滤按钮 */
        .filter-btn {
          background-color: var(--bg-tertiary) !important;
          color: var(--body-text) !important;
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
        }

        .filter-btn.active,
        .filter-btn:hover {
          background-color: var(--primary-color) !important;
          color: var(--button-text) !important;
          border-color: var(--primary-color) !important;
        }

        /* 技能进度条 */
        .skill-bar {
          background-color: var(--bg-tertiary) !important;
        }

        .skill-progress {
          background-color: var(--primary-color) !important;
        }

        /* 项目标签 */
        .project-tags span {
          background-color: var(--bg-tertiary) !important;
          color: var(--body-text) !important;
          border: 1px solid var(--border-color);
        }

        /* 联系信息图标 */
        .contact-item i {
          color: var(--primary-color) !important;
        }

        .detail i {
          color: var(--primary-color) !important;
        }

        /* 技能类别标题 */
        .skill-category h3 {
          color: var(--primary-color) !important;
        }

        /* 汉堡菜单 */
        .hamburger .line {
          background-color: var(--text-color) !important;
        }

        /* 移动端导航 */
        .nav-links {
          background-color: var(--header-bg) !important;
          border: 1px solid var(--border-color);
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

        .language-btn {
          background-color: transparent !important;
          border: 1px solid var(--primary-color) !important;
          color: var(--primary-color) !important;
        }

        .language-btn:hover {
          background-color: var(--primary-color) !important;
          color: var(--button-text) !important;
        }

        /* 语言切换器容器修复 */
        .language-switcher {
          position: relative;
        }

        .language-hover-wrapper .hover-dropdown {
          background-color: var(--card-bg) !important;
          border: 1px solid var(--border-color) !important;
        }

        /* Footer 样式 */
        footer {
          background: var(--bg-secondary) !important;
          color: var(--body-text) !important;
          border-top: 1px solid var(--border-color);
        }

        footer .footer-column h3 {
          color: var(--text-color) !important;
        }

        footer .footer-links a {
          color: var(--body-text) !important;
          transition: color 0.3s ease;
        }

        footer .footer-links a:hover {
          color: var(--primary-color) !important;
        }

        footer .logo {
          color: var(--primary-color) !important;
        }

        .social-links a {
          background: var(--bg-tertiary) !important;
          border: 1px solid var(--border-color) !important;
          color: var(--text-color) !important;
        }

        .social-links a:hover {
          background: var(--primary-color) !important;
          border-color: var(--primary-color) !important;
          color: var(--button-text) !important;
        }

        .footer-bottom {
          background: var(--bg-tertiary) !important;
          border-top: 1px solid var(--border-color);
        }

        .footer-bottom p,
        .footer-bottom a {
          color: var(--body-text) !important;
        }

        .footer-bottom a:hover {
          color: var(--primary-color) !important;
        }

        /* 确保所有主题的按钮和链接正确应用颜色 */
        a, 
        a:visited,
        .nav-links a,
        .footer-links a {
          color: var(--text-color) !important;
        }

        a:hover,
        .nav-links a:hover,
        .footer-links a:hover {
          color: var(--primary-color) !important;
        }

        /* 强制应用主题色到特定元素 */
        .btn.primary-btn,
        button.primary-btn,
        input[type="submit"].primary-btn {
          background-color: var(--primary-color) !important;
          color: var(--button-text) !important;
        }

        .btn.primary-btn:hover,
        button.primary-btn:hover,
        input[type="submit"].primary-btn:hover {
          background-color: var(--secondary-color) !important;
          color: var(--button-text) !important;
        }

        /* 确保所有图标使用主题色 */
        .fa,
        .fas,
        .far,
        .fab,
        i[class*="fa-"] {
          color: inherit;
        }

        .contact-item i,
        .detail i,
        .social-links i {
          color: var(--primary-color) !important;
        }

        /* 确保高亮文本使用主题色 */
        .highlight,
        .text-primary,
        .color-primary {
          color: var(--primary-color) !important;
        }

        /* 全局焦点样式重置 */
        *:focus {
          outline: none !important;
        }
        
        /* 导航链接特殊处理 - 完全移除所有可能的边框和轮廓 */
        .nav-links *,
        .nav-links *::before,
        .nav-links *::after,
        .nav-link-no-border,
        .nav-link-no-border::before,
        .nav-link-no-border::after,
        [class*="nav-"] {
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
          -webkit-box-shadow: none !important;
          -moz-box-shadow: none !important;
          text-decoration: none !important;
          -webkit-tap-highlight-color: transparent !important;
        }
        
        /* 导航链接的所有状态 */
        .nav-links a,
        .nav-links a:link,
        .nav-links a:visited,
        .nav-links a:hover,
        .nav-links a:active,
        .nav-links a:focus,
        .nav-links a:focus-visible,
        .nav-links a.active,
        .nav-link-no-border,
        .nav-link-no-border:link,
        .nav-link-no-border:visited,
        .nav-link-no-border:hover,
        .nav-link-no-border:active,
        .nav-link-no-border:focus,
        .nav-link-no-border:focus-visible,
        .nav-link-no-border.active {
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
          -webkit-box-shadow: none !important;
          -moz-box-shadow: none !important;
          background-color: transparent !important;
          text-decoration: none !important;
          -webkit-appearance: none !important;
          -moz-appearance: none !important;
          appearance: none !important;
        }
        
        /* 表单元素焦点样式 - 不包括导航链接 */
        input:focus,
        textarea:focus,
        select:focus,
        button:focus:not([class*="nav"]):not(.nav-links *):not(.nav-link-no-border) {
          outline: none !important;
          box-shadow: 0 0 0 2px var(--primary-color) !important;
        }
        
        /* 普通链接焦点样式 - 不包括导航链接 */
        a:focus:not([class*="nav"]):not(.nav-links *):not(.nav-link-no-border) {
          outline: none !important;
          box-shadow: 0 0 0 2px var(--primary-color) !important;
        }
        
        /* 确保导航链接的父元素也没有边框 */
        .nav-links li {
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
          background: transparent !important;
        }
      `}</style>

      <div className={`floating-theme-switcher ${isOpen ? 'open' : ''}`} ref={themeSwitcherRef}>
        {/* 主题选项面板 */}
        <div className={`theme-palette ${isOpen ? 'visible' : ''}`}>
          <div className="palette-title">Choose Color</div>
          <div className="theme-grid">
            {colorThemes.map((theme) => (
              <div
                key={theme.id}
                className={`theme-color-option ${activeColor === theme.id ? 'active' : ''}`}
                style={{ 
                  background: theme.gradient,
                  borderColor: '#fff'
                }}
                title={theme.name}
                onClick={() => handleColorChange(theme.id)}
              >
                {activeColor === theme.id && (
                  <div className="active-indicator">
                    <span>✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* 主调色板按钮 */}
        <button 
          className="palette-toggle-btn" 
          onClick={(e) => toggleThemePanel(e)}
          title="Change Theme Colors"
          type="button"
        >
          🎨
        </button>
      </div>
    </>
  );
};

export default ThemeSwitcher;