"use client";

import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-primary-500 text-white shadow-lg hover:bg-primary-600 transition-all duration-300 z-50 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50"
          aria-label="Back to top"
        >
          <FaArrowUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
};

export default BackToTop;
