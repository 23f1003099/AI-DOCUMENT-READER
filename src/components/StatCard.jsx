import React from 'react';

const StatCard = ({ title, stats, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        {title === 'Recent Documents' && (
          <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium">
            View All Documents
          </button>
        )}
        {title === 'Personalized Suggestions' && (
          <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium">
            Refresh
          </button>
        )}
      </div>
      
      <div className="space-y-3">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {stat.icon && (
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <stat.icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {stat.name || stat.action}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {stat.date || stat.time || stat.description}
                </p>
              </div>
            </div>
            {stat.value && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {stat.value}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatCard;