"use client";

import React from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About SurpriseMe</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              SurpriseMe is a Chrome extension that brings surprise and joy to your browsing experience.
              Discover new content, get random facts, and enjoy unexpected moments during your web surfing.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/download" className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">
                  Download
                </Link>
              </li>
            </ul>
            
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-4">Other Sites</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://www.harryhongyue.site" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">
                  Main Website
                </a>
              </li>
              <li>
                <a href="https://harry.harryhongyue.site" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">
                  Personal Info
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Connect</h3>
            <div className="flex space-x-4 mb-6">
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                <FaGithub className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a href="mailto:your.email@example.com" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                <FaEnvelope className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8">
          <p className="text-gray-500 dark:text-gray-400 text-center">
            &copy; {new Date().getFullYear()} SurpriseMe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
