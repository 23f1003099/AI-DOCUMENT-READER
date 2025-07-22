// /components/HistoryEntry.jsx
import React from 'react';
import { Clock } from 'lucide-react';

const HistoryEntry = ({ entry, handleHistoryClick }) => {
  const Icon = entry.tool.icon;
  return (
    <div key={entry.id} className="mb-6 group">
      <div className="flex items-center space-x-3 mb-3">
        <div className={`w-8 h-8 bg-gradient-to-r ${entry.tool.color} rounded-lg flex items-center justify-center shadow-lg`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 dark:text-white">
            {entry.tool.name} - {entry.Subject.title}
          </h4>
          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
            <Clock className="w-3 h-3" />
            <span>{entry.timestamp.toLocaleString()}</span>
            {entry.referencedPage && (
              <>
                <span>•</span>
                <span>Page {entry.referencedPage}</span>
              </>
            )}
          </div>
        </div>
        <button
          onClick={() => handleHistoryClick(entry)}
          className="opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          Open Tool
        </button>
      </div>

      {/* Input */}
      {entry.input && (
        <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-gray-700 dark:text-gray-300">{entry.input}</p>
        </div>
      )}

      {/* Output */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
        {entry.type === 'text' && <p className="text-sm text-gray-700 dark:text-gray-300">{entry.output}</p>}

        {entry.type === 'notes' && (
          <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans">{entry.output}</pre>
        )}

        {entry.type === 'quiz' && (
          <div className="space-y-3">
            <p className="font-medium text-gray-900 dark:text-white">Interactive Quiz Generated</p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <p className="font-medium text-sm text-gray-900 dark:text-white mb-2">
                {entry.output.questions[0].question}
              </p>
              <div className="space-y-1">
                {entry.output.questions[0].options.map((option, idx) => (
                  <div key={idx} className="text-xs text-gray-600 dark:text-gray-400">
                    {String.fromCharCode(65 + idx)}. {option}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {entry.type === 'flashcards' && (
          <div className="space-y-2">
            <p className="font-medium text-gray-900 dark:text-white">Flashcards Created</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {entry.output.slice(0, 2).map((card, idx) => (
                <div key={idx} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-xs font-medium text-gray-900 dark:text-white mb-1">{card.front}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{card.back}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {entry.type === 'mindmap' && (
          <div className="space-y-2">
            <p className="font-medium text-gray-900 dark:text-white">Mind Map Created</p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-center space-x-4">
                {entry.output.nodes.slice(0, 3).map((node, idx) => (
                  <div
                    key={idx}
                    className={`px-3 py-1 bg-gradient-to-r ${entry.tool.color} text-white rounded-full text-xs`}
                  >
                    {node.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {entry.type === 'summary' && (
          <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans">{entry.output}</pre>
        )}

        {entry.type === 'evaluation' && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">{entry.output.score}%</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">Overall Score</span>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <h5 className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">Strengths</h5>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  {entry.output.strengths.map((s, idx) => (<li key={idx}>• {s}</li>))}
                </ul>
              </div>
              <div>
                <h5 className="text-sm font-medium text-orange-600 dark:text-orange-400 mb-1">Areas to Improve</h5>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  {entry.output.improvements.map((i, idx) => (<li key={idx}>• {i}</li>))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryEntry;
