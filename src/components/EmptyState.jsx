import React from 'react';
import { Sparkles } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
      <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
        <Sparkles className="w-10 h-10" />
      </div>
      <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Start Exploring!</h3>
      <p className="mt-2 text-sm">
        Select a document and subject, choose an AI tool, then execute to see results here.
      </p>
    </div>
  );
};

export default EmptyState;
