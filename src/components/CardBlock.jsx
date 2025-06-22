import React from 'react';

function CardBlock({ icon, title, subtitle, variant }) {
  const isRecent = variant === 'recent';
  
  return (
    <div
      className={`rounded-2xl p-6 w-80 shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border
      ${isRecent
        ? 'bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:to-gray-800 border-gray-200 dark:border-gray-700'
        : 'bg-gradient-to-br from-indigo-100 to-purple-200 dark:from-slate-800 dark:to-slate-700 border-gray-300 dark:border-gray-700'}`}
    >
      <div className="flex justify-between items-center mb-5">{icon}</div>
      <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">{title}</h3>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  );
}

export default CardBlock;