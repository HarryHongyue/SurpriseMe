import React from 'react';
import { FaChrome, FaCode, FaRandom } from 'react-icons/fa';

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Key Features
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-primary mb-4">
              <FaRandom className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Random Window Border
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
            Build a striking border for your browser window at random
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-primary mb-4">
              <FaChrome className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Seamless Integration
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Works perfectly with Chrome & Firefox browser. Simple to install and use with minimal configuration.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-primary mb-4">
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
  );
};

export default Features;