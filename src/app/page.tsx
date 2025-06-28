import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import { FaChrome, FaDownload, FaCode, FaRandom } from 'react-icons/fa';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Surprise<span className="text-primary-500">Me</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            A Chrome extension that brings surprise and joy to your browsing experience
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#download" 
              className="px-8 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors flex items-center gap-2"
            >
              <FaDownload /> Download Now
            </a>
            <a 
              href="https://github.com/yourusername/SurpriseMe" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-3 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
            >
              <FaCode /> View Source
            </a>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Key Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-primary-500 mb-4">
                <FaRandom className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Random Surprises
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get delightful surprises while browsing the web. From fun facts to inspirational quotes.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-primary-500 mb-4">
                <FaChrome className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Seamless Integration
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Works perfectly with Chrome browser. Simple to install and use with minimal configuration.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-primary-500 mb-4">
                <FaCode className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Open Source
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Fully open source and customizable. Contribute to the project or modify it for your needs.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Download Section */}
      <section id="download" className="py-20 px-4 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Download SurpriseMe
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Get started with SurpriseMe in just a few clicks. Available for Chrome browser.
          </p>
          
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Chrome Extension
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Version 1.0.0
                </p>
              </div>
              <a 
                href="https://chrome.google.com/webstore/detail/your-extension-id" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors flex items-center gap-2"
              >
                <FaChrome /> Add to Chrome
              </a>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Alternatively, you can download the extension directly and install it manually:
              </p>
              <div className="mt-4">
                <a 
                  href="/SurpriseMe.crx" 
                  download
                  className="px-6 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors inline-flex items-center gap-2"
                >
                  <FaDownload /> Download .crx file
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            About SurpriseMe
          </h2>
          
          <div className="prose dark:prose-invert max-w-3xl mx-auto">
            <p>
              SurpriseMe was created to bring unexpected moments of joy and discovery to your everyday browsing experience. 
              In a world where our online activities often become routine, SurpriseMe introduces an element of surprise 
              that can spark curiosity, creativity, and delight.
            </p>
            <p>
              This extension is part of a collection of projects by Harry Hongyue. You can explore more of my work on my 
              <a href="https://www.harryhongyue.site" className="text-primary-500 hover:text-primary-600"> main website</a> or 
              learn more about me on my <a href="https://harry.harryhongyue.site" className="text-primary-500 hover:text-primary-600">personal page</a>.
            </p>
            <p>
              SurpriseMe is open source and contributions are welcome. Feel free to fork the project, submit issues, or contribute code on GitHub.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
      <BackToTop />
    </main>
  );
}
