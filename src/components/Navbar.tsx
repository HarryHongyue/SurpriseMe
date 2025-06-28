"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes, FaGithub, FaLinkedin, FaMoon, FaSun, FaPalette } from 'react-icons/fa';
import { useTheme } from './ThemeProvider';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const { theme, darkMode, setTheme, toggleDarkMode } = useTheme();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Toggle dark mode is now handled by ThemeProvider

  // Change theme - now using ThemeProvider
  const changeTheme = (newTheme: 'blue' | 'purple' | 'green' | 'orange') => {
    setTheme(newTheme);
    setIsThemeMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white dark:bg-gray-900 shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-900 dark:text-white">SurpriseMe</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link href="/features" className="text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium">
              Features
            </Link>
            <Link href="/download" className="text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium">
              Download
            </Link>
            
            {/* External site links */}
            <div className="border-l border-gray-300 dark:border-gray-700 pl-4 ml-2">
              <a href="https://www.harryhongyue.site" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium">
                Main Site
              </a>
              <a href="https://harry.harryhongyue.site" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium">
                Personal Info
              </a>
            </div>
            
            {/* Social links */}
            <div className="flex items-center space-x-2 ml-4">
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <FaGithub className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
            
            {/* Theme toggle */}
            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
            </button>
            
            {/* Theme selector */}
            <div className="relative">
              <button 
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400 p-2 rounded-full relative"
                aria-label="Change theme"
              >
                <FaPalette className="h-5 w-5" />
                <div className={`w-2 h-2 rounded-full absolute bottom-1 right-1 ${theme === 'blue' ? 'bg-primary-500' : theme === 'purple' ? 'bg-purple-500' : theme === 'green' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
              </button>
              
              {isThemeMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50">
                  <button 
                    onClick={() => changeTheme('blue')} 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                  >
                    <div className="w-4 h-4 rounded-full bg-primary-500 mr-2"></div>
                    Blue (Default)
                  </button>
                  <button 
                    onClick={() => changeTheme('purple')} 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                  >
                    <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
                    Purple
                  </button>
                  <button 
                    onClick={() => changeTheme('green')} 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                  >
                    <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                    Green
                  </button>
                  <button 
                    onClick={() => changeTheme('orange')} 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                  >
                    <div className="w-4 h-4 rounded-full bg-orange-500 mr-2"></div>
                    Orange
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleDarkMode} 
              className="text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400 p-2 rounded-full"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <FaTimes className="block h-6 w-6" />
              ) : (
                <FaBars className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 shadow-lg">
          <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400">
            Home
          </Link>
          <Link href="/features" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400">
            Features
          </Link>
          <Link href="/download" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400">
            Download
          </Link>
          
          <div className="border-t border-gray-300 dark:border-gray-700 pt-2 mt-2">
            <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Other Sites
            </h3>
            <a href="https://www.harryhongyue.site" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400">
              Main Site
            </a>
            <a href="https://harry.harryhongyue.site" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400">
              Personal Info
            </a>
          </div>
          
          <div className="border-t border-gray-300 dark:border-gray-700 pt-2 mt-2">
            <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Theme
            </h3>
            <button 
              onClick={() => changeTheme('blue')} 
              className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <div className="w-4 h-4 rounded-full bg-primary-500 mr-2"></div>
              Blue (Default)
            </button>
            <button 
              onClick={() => changeTheme('purple')} 
              className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
              Purple
            </button>
            <button 
              onClick={() => changeTheme('green')} 
              className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
              Green
            </button>
            <button 
              onClick={() => changeTheme('orange')} 
              className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <div className="w-4 h-4 rounded-full bg-orange-500 mr-2"></div>
              Orange
            </button>
          </div>
          
          <div className="border-t border-gray-300 dark:border-gray-700 pt-2 mt-2">
            <div className="flex justify-center space-x-4 py-2">
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <FaGithub className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <FaLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
