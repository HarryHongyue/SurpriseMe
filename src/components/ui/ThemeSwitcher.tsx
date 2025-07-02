import React, { useState, useEffect, useRef } from 'react';

/**
 * Redesigned theme switcher component
 * Proper theme color hierarchy: background, primary color, text, accent
 * Now only responsible for color selection, not mode selection
 */
interface ThemeSwitcherProps {}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeColor, setActiveColor] = useState<string>('indigo');
  const themeSwitcherRef = useRef<HTMLDivElement>(null);

  // Theme configurations - each color has light and dark modes
  // Light theme configurations
  const lightThemes = [
    { 
      id: 'default', 
      name: 'Ocean Blue', 
      gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)',
      cssVars: {
        '--primary-color': '#3b82f6',
        '--secondary-color': '#2563eb',
        '--accent-color': '#1d4ed8',
        '--text-color': '#1e3a8a',
        '--body-text': '#1f2937',
        '--light-text': '#f9fafb',
        '--bg-primary': '#f9fafb',
        '--bg-secondary': '#f3f4f6',
        '--bg-tertiary': '#e5e7eb',
        '--border-color': '#d1d5db',
        '--header-bg': 'rgba(249, 250, 251, 0.95)',
        '--card-bg': '#ffffff',
        '--button-text': '#ffffff'
      }
    },
    { 
      id: 'indigo', 
      name: 'Royal Indigo', 
      gradient: 'linear-gradient(135deg, #6366f1, #4f46e5)',
      cssVars: {
        '--primary-color': '#6366f1',
        '--secondary-color': '#4f46e5',
        '--accent-color': '#4338ca',
        '--text-color': '#3730a3',
        '--body-text': '#1f2937',
        '--light-text': '#f9fafb',
        '--bg-primary': '#f9fafb',
        '--bg-secondary': '#f3f4f6',
        '--bg-tertiary': '#e5e7eb',
        '--border-color': '#d1d5db',
        '--header-bg': 'rgba(249, 250, 251, 0.95)',
        '--card-bg': '#ffffff',
        '--button-text': '#ffffff'
      }
    },
    { 
      id: 'emerald', 
      name: 'Fresh Emerald', 
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
      cssVars: {
        '--primary-color': '#10b981',
        '--secondary-color': '#059669',
        '--accent-color': '#047857',
        '--text-color': '#065f46',
        '--body-text': '#1f2937',
        '--light-text': '#f9fafb',
        '--bg-primary': '#f9fafb',
        '--bg-secondary': '#f3f4f6',
        '--bg-tertiary': '#e5e7eb',
        '--border-color': '#d1d5db',
        '--header-bg': 'rgba(249, 250, 251, 0.95)',
        '--card-bg': '#ffffff',
        '--button-text': '#ffffff'
      }
    },
    { 
      id: 'rose', 
      name: 'Vibrant Rose', 
      gradient: 'linear-gradient(135deg, #f43f5e, #e11d48)',
      cssVars: {
        '--primary-color': '#f43f5e',
        '--secondary-color': '#e11d48',
        '--accent-color': '#be123c',
        '--text-color': '#9f1239',
        '--body-text': '#1f2937',
        '--light-text': '#f9fafb',
        '--bg-primary': '#f9fafb',
        '--bg-secondary': '#f3f4f6',
        '--bg-tertiary': '#e5e7eb',
        '--border-color': '#d1d5db',
        '--header-bg': 'rgba(249, 250, 251, 0.95)',
        '--card-bg': '#ffffff',
        '--button-text': '#ffffff'
      }
    },
    { 
      id: 'amber', 
      name: 'Golden Amber', 
      gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
      cssVars: {
        '--primary-color': '#f59e0b',
        '--secondary-color': '#d97706',
        '--accent-color': '#b45309',
        '--text-color': '#92400e',
        '--body-text': '#1f2937',
        '--light-text': '#f9fafb',
        '--bg-primary': '#f9fafb',
        '--bg-secondary': '#f3f4f6',
        '--bg-tertiary': '#e5e7eb',
        '--border-color': '#d1d5db',
        '--header-bg': 'rgba(249, 250, 251, 0.95)',
        '--card-bg': '#ffffff',
        '--button-text': '#ffffff'
      }
    },
    { 
      id: 'violet', 
      name: 'Rich Violet', 
      gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      cssVars: {
        '--primary-color': '#8b5cf6',
        '--secondary-color': '#7c3aed',
        '--accent-color': '#6d28d9',
        '--text-color': '#5b21b6',
        '--body-text': '#1f2937',
        '--light-text': '#f9fafb',
        '--bg-primary': '#f9fafb',
        '--bg-secondary': '#f3f4f6',
        '--bg-tertiary': '#e5e7eb',
        '--border-color': '#d1d5db',
        '--header-bg': 'rgba(249, 250, 251, 0.95)',
        '--card-bg': '#ffffff',
        '--button-text': '#ffffff'
      }
    }
  ];
  
  // Dark theme configurations
  const darkThemes = [
    { 
      id: 'default', 
      name: 'Ocean Blue Dark', 
      gradient: 'linear-gradient(135deg, #1d4ed8, #1e40af)',
      cssVars: {
        '--primary-color': '#3b82f6',
        '--secondary-color': '#2563eb',
        '--accent-color': '#60a5fa',
        '--text-color': '#93c5fd',
        '--body-text': '#e2e8f0',
        '--light-text': '#ffffff',
        '--bg-primary': '#0f172a',
        '--bg-secondary': '#1e293b',
        '--bg-tertiary': '#334155',
        '--border-color': '#475569',
        '--header-bg': 'rgba(15, 23, 42, 0.95)',
        '--card-bg': '#1e293b',
        '--button-text': '#ffffff'
      }
    },
    { 
      id: 'indigo', 
      name: 'Royal Indigo Dark', 
      gradient: 'linear-gradient(135deg, #4f46e5, #4338ca)',
      cssVars: {
        '--primary-color': '#6366f1',
        '--secondary-color': '#4f46e5',
        '--accent-color': '#818cf8',
        '--text-color': '#a5b4fc',
        '--body-text': '#e2e8f0',
        '--light-text': '#ffffff',
        '--bg-primary': '#0f172a',
        '--bg-secondary': '#1e293b',
        '--bg-tertiary': '#334155',
        '--border-color': '#475569',
        '--header-bg': 'rgba(15, 23, 42, 0.95)',
        '--card-bg': '#1e293b',
        '--button-text': '#ffffff'
      }
    },
    { 
      id: 'emerald', 
      name: 'Fresh Emerald Dark', 
      gradient: 'linear-gradient(135deg, #059669, #047857)',
      cssVars: {
        '--primary-color': '#10b981',
        '--secondary-color': '#059669',
        '--accent-color': '#34d399',
        '--text-color': '#6ee7b7',
        '--body-text': '#e2e8f0',
        '--light-text': '#ffffff',
        '--bg-primary': '#0f172a',
        '--bg-secondary': '#1e293b',
        '--bg-tertiary': '#334155',
        '--border-color': '#475569',
        '--header-bg': 'rgba(15, 23, 42, 0.95)',
        '--card-bg': '#1e293b',
        '--button-text': '#ffffff'
      }
    },
    { 
      id: 'rose', 
      name: 'Vibrant Rose Dark', 
      gradient: 'linear-gradient(135deg, #e11d48, #be123c)',
      cssVars: {
        '--primary-color': '#f43f5e',
        '--secondary-color': '#e11d48',
        '--accent-color': '#fb7185',
        '--text-color': '#fda4af',
        '--body-text': '#e2e8f0',
        '--light-text': '#ffffff',
        '--bg-primary': '#0f172a',
        '--bg-secondary': '#1e293b',
        '--bg-tertiary': '#334155',
        '--border-color': '#475569',
        '--header-bg': 'rgba(15, 23, 42, 0.95)',
        '--card-bg': '#1e293b',
        '--button-text': '#ffffff'
      }
    },
    { 
      id: 'amber', 
      name: 'Golden Amber Dark', 
      gradient: 'linear-gradient(135deg, #d97706, #b45309)',
      cssVars: {
        '--primary-color': '#f59e0b',
        '--secondary-color': '#d97706',
        '--accent-color': '#fbbf24',
        '--text-color': '#fcd34d',
        '--body-text': '#e2e8f0',
        '--light-text': '#ffffff',
        '--bg-primary': '#0f172a',
        '--bg-secondary': '#1e293b',
        '--bg-tertiary': '#334155',
        '--border-color': '#475569',
        '--header-bg': 'rgba(15, 23, 42, 0.95)',
        '--card-bg': '#1e293b',
        '--button-text': '#ffffff'
      }
    },
    { 
      id: 'violet', 
      name: 'Rich Violet Dark', 
      gradient: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
      cssVars: {
        '--primary-color': '#8b5cf6',
        '--secondary-color': '#7c3aed',
        '--accent-color': '#a78bfa',
        '--text-color': '#c4b5fd',
        '--body-text': '#e2e8f0',
        '--light-text': '#ffffff',
        '--bg-primary': '#0f172a',
        '--bg-secondary': '#1e293b',
        '--bg-tertiary': '#334155',
        '--border-color': '#475569',
        '--header-bg': 'rgba(15, 23, 42, 0.95)',
        '--card-bg': '#1e293b',
        '--button-text': '#ffffff'
      }
    }
  ];
  
  // Only display light themes for selection
  const colorThemes = lightThemes;

  // Get theme configuration based on color and mode
  const getThemeByColorAndMode = (colorId: string, isDarkMode: boolean) => {
    const themes = isDarkMode ? darkThemes : lightThemes;
    return themes.find(theme => theme.id === colorId);
  };
  
  // Apply color theme
  const applyColorTheme = (colorId: string) => {
    // Get current mode
    const bodyClasses = document.body.classList;
    const isDarkMode = bodyClasses.contains('dark-mode');
    
    console.log('Applying theme:', colorId, 'isDarkMode:', isDarkMode);
    
    // Get theme configuration for current mode
    const theme = getThemeByColorAndMode(colorId, isDarkMode);
    
    if (!theme) {
      console.error('Theme not found for:', colorId, isDarkMode);
      return;
    }

    // Remove old color theme classes
    const themeClassesToRemove = Array.from(bodyClasses).filter(cls =>
      cls.endsWith('-theme') && !cls.includes('mode')
    );
    themeClassesToRemove.forEach(cls => bodyClasses.remove(cls));

    // Add new color theme class
    bodyClasses.add(`${colorId}-theme`);

    // Apply CSS variables
    const root = document.documentElement;
    Object.entries(theme.cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value as string);
    });

    // Dispatch color change event
    window.dispatchEvent(new CustomEvent('colorChange', {
      detail: {
        colorId: colorId,
        isDarkMode: isDarkMode
      }
    }));
    
    console.log(`Applied ${isDarkMode ? 'dark' : 'light'} theme for color: ${colorId}`);
  };

  // Handle color selection
  const handleColorChange = (colorId: string) => {
    console.log('Color change clicked:', colorId);
    setActiveColor(colorId);
    
    // Apply color theme
    applyColorTheme(colorId);

    // Close palette after selection with delay for visual feedback
    setTimeout(() => {
      setIsOpen(false);
    }, 300);

    // Save selection to local storage
    localStorage.setItem('selectedColorTheme', colorId);
  };

  // Toggle theme palette visibility
  const toggleThemePanel = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Toggle theme panel clicked');
    setIsOpen(!isOpen);
  };

  // Initialize theme
  useEffect(() => {
    // Apply default color
    const savedColorId = localStorage.getItem('selectedColorTheme') || 'indigo';
    setActiveColor(savedColorId);
    
    // Check current mode and apply theme
    const isDarkMode = document.body.classList.contains('dark-mode');
    applyColorTheme(savedColorId);
    
    // Close palette when clicking outside
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
      
      // Apply theme for current color with new mode
      if (colorId) {
        applyColorTheme(colorId);
      } else {
        applyColorTheme(activeColor);
      }
    };

    // 监听来自 Header 的主题应用事件
    const handleApplyTheme = (event: Event) => {
      const customEvent = event as CustomEvent;
      const { colorId, isDarkMode } = customEvent.detail;
      
      console.log('ThemeSwitcher received applyTheme event:', { colorId, isDarkMode });
      
      // 获取对应颜色和模式的主题配置
      const theme = getThemeByColorAndMode(colorId, isDarkMode);
      
      if (!theme) {
        console.error('Theme not found for:', colorId, isDarkMode);
        return;
      }
      
      // 应用 CSS 变量
      const root = document.documentElement;
      Object.entries(theme.cssVars).forEach(([key, value]) => {
        root.style.setProperty(key, value as string);
      });
      
      console.log(`Applied ${isDarkMode ? 'dark' : 'light'} theme for color: ${colorId}`);
    };

    window.addEventListener('modeChange', handleModeChange as EventListener);
    window.addEventListener('applyTheme', handleApplyTheme as EventListener);
    
    return () => {
      window.removeEventListener('modeChange', handleModeChange as EventListener);
      window.removeEventListener('applyTheme', handleApplyTheme as EventListener);
    };
  }, [activeColor]);

  return (
    <>
      {/* Inline styles */}
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
      `}</style>

      <div className={`floating-theme-switcher ${isOpen ? 'open' : ''}`} ref={themeSwitcherRef}>
        {/* Theme options panel */}
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
        
        {/* Main palette button */}
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
