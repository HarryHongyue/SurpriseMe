import React from 'react';
import { FaShieldAlt, FaUserShield, FaLock } from 'react-icons/fa';

const Privacy: React.FC = () => {
  return (
    <section id="privacy" className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <FaShieldAlt className="text-5xl text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Privacy Policy
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your privacy is important to us. Here's how SurpriseMe handles your data.
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 mb-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <FaUserShield className="text-3xl text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No Data Collection
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                We don't collect any personal information or browsing history
              </p>
            </div>
            <div className="text-center">
              <FaLock className="text-3xl text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Local Storage Only
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                All settings are stored locally in your browser
              </p>
            </div>
            <div className="text-center">
              <FaShieldAlt className="text-3xl text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No Third Parties
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                No data sharing with external services
              </p>
            </div>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 border-l-4 border-primary">
              <p className="text-gray-800 dark:text-gray-200 leading-relaxed mb-4">
                <strong>This extension (SurpriseMe) does not collect, store, share, or upload any personal information, sensitive data, or browsing history.</strong>
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                All settings and data are kept locally in your browser and used only for personalization of the extension.
              </p>
              <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-600">
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  For any questions, please contact the developer:
                </p>
                <a 
                  href="mailto:harryhongyue@outlook.com" 
                  className="text-primary hover:underline font-medium"
                >
                  harryhongyue@outlook.com
                </a>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                  — SurpriseMe developer
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Privacy;