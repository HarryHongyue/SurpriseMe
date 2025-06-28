"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

// Define theme types
type Theme = 'blue' | 'purple' | 'green' | 'orange';

// Define context type
interface ThemeContextType {
  theme: Theme;
  darkMode: boolean;
  setTheme: (theme: Theme) => void;
  toggleDarkMode: () => void;
}

// Create context with default values
const ThemeContext = createContext<ThemeContextType>({
  theme: 'blue',
  darkMode: false,
  setTheme: () => {},
  toggleDarkMode: () => {},
});

// Hook to use theme context
export const useTheme = () => useContext(ThemeContext);

// Theme provider component props interface
interface ThemeProviderProps {
  children: ReactNode;
}

// Theme provider component
export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>('blue');
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize theme and dark mode from localStorage
  useEffect(() => {
    // Check for saved theme preferences
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedTheme = localStorage.getItem('theme') as Theme || 'blue';
    
    setDarkMode(savedDarkMode);
    setThemeState(savedTheme);
    
    // Apply dark mode if saved
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Apply theme
    document.documentElement.classList.remove('theme-purple', 'theme-green', 'theme-orange');
    if (savedTheme !== 'blue') {
      document.documentElement.classList.add(`theme-${savedTheme}`);
    }
    
    setMounted(true);
  }, []);

  // Set theme function
  const setTheme = (newTheme: Theme) => {
    // Remove all theme classes
    document.documentElement.classList.remove('theme-purple', 'theme-green', 'theme-orange');
    
    // Add new theme class if not blue (default)
    if (newTheme !== 'blue') {
      document.documentElement.classList.add(`theme-${newTheme}`);
    }
    
    // Update state and localStorage
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Toggle dark mode function
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    
    // Toggle dark class on html element
    document.documentElement.classList.toggle('dark', newDarkMode);
    
    // Update state and localStorage
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  // Prevents hydration mismatch by only rendering content after client-side hydration
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, darkMode, setTheme, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
