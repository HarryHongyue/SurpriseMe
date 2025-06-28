import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import { FaChrome, FaDownload, FaCode, FaQuestionCircle, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

export default function Download() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Download SurpriseMe
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Get started with SurpriseMe in just a few clicks
          </p>
        </div>
      </section>
      
      {/* Download Options */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Chrome Web Store */}
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <FaChrome className="h-12 w-12 text-primary-500 mr-4" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Chrome Web Store
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                The recommended way to install SurpriseMe is through the Chrome Web Store. 
                This ensures you always get automatic updates when new versions are released.
              </p>
              <a 
                href="https://chrome.google.com/webstore/detail/your-extension-id" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors inline-flex items-center gap-2"
              >
                <FaChrome /> Add to Chrome
              </a>
            </div>
            
            {/* Direct Download */}
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <FaDownload className="h-12 w-12 text-primary-500 mr-4" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Direct Download
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                If you prefer to install the extension manually, you can download the latest 
                version directly from our website. This is useful for developers or advanced users.
              </p>
              <a 
                href="/SurpriseMe.crx" 
                download
                className="px-6 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors inline-flex items-center gap-2"
              >
                <FaDownload /> Download .crx file
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Installation Guide */}
      <section className="py-20 px-4 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Installation Guide
          </h2>
          
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Installing from Chrome Web Store
            </h3>
            
            <ol className="space-y-6 mb-12">
              <li className="flex">
                <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-primary-500 text-white font-bold mr-4">
                  1
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Visit the Chrome Web Store
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Click on the "Add to Chrome" button above to go directly to the SurpriseMe page on the Chrome Web Store.
                  </p>
                </div>
              </li>
              
              <li className="flex">
                <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-primary-500 text-white font-bold mr-4">
                  2
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Click "Add to Chrome"
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    On the Chrome Web Store page, click the blue "Add to Chrome" button in the top right corner.
                  </p>
                </div>
              </li>
              
              <li className="flex">
                <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-primary-500 text-white font-bold mr-4">
                  3
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Confirm Installation
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    A popup will appear asking you to confirm. Click "Add extension" to proceed with the installation.
                  </p>
                </div>
              </li>
              
              <li className="flex">
                <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-primary-500 text-white font-bold mr-4">
                  4
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Start Using SurpriseMe
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Once installed, you'll see the SurpriseMe icon in your Chrome toolbar. Click on it to start using the extension.
                  </p>
                </div>
              </li>
            </ol>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Manual Installation (for developers)
            </h3>
            
            <ol className="space-y-6">
              <li className="flex">
                <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-primary-500 text-white font-bold mr-4">
                  1
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Download the Extension
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Click the "Download .crx file" button above to download the extension file to your computer.
                  </p>
                </div>
              </li>
              
              <li className="flex">
                <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-primary-500 text-white font-bold mr-4">
                  2
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Open Chrome Extensions Page
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    In Chrome, navigate to chrome://extensions/ by typing it in the address bar, or go to Menu → More Tools → Extensions.
                  </p>
                </div>
              </li>
              
              <li className="flex">
                <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-primary-500 text-white font-bold mr-4">
                  3
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Enable Developer Mode
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Toggle on the "Developer mode" switch in the top right corner of the extensions page.
                  </p>
                </div>
              </li>
              
              <li className="flex">
                <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-primary-500 text-white font-bold mr-4">
                  4
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Install the Extension
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Drag and drop the downloaded .crx file onto the Chrome extensions page. Click "Add extension" when prompted.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <FaQuestionCircle className="text-primary-500 mr-2" />
                Is SurpriseMe free to use?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, SurpriseMe is completely free to download and use. We may introduce premium features in the future, but the core functionality will always remain free.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <FaQuestionCircle className="text-primary-500 mr-2" />
                Will SurpriseMe slow down my browser?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                No, SurpriseMe is designed to be lightweight and efficient. It runs in the background without affecting your browsing performance.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <FaQuestionCircle className="text-primary-500 mr-2" />
                Is my data safe with SurpriseMe?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Absolutely. SurpriseMe processes all data locally on your device and doesn't send your personal information to any servers. Your privacy is our top priority.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <FaQuestionCircle className="text-primary-500 mr-2" />
                How do I report a bug or suggest a feature?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                You can report bugs or suggest features by visiting our GitHub repository and creating an issue. We welcome all feedback and contributions from the community.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-100 dark:bg-gray-800 text-center">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Download SurpriseMe now and transform your browsing experience with delightful surprises.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://chrome.google.com/webstore/detail/your-extension-id" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors flex items-center gap-2"
            >
              <FaChrome /> Add to Chrome
            </a>
            <Link 
              href="/features" 
              className="px-8 py-3 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
            >
              Learn More <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
      <BackToTop />
    </main>
  );
}
