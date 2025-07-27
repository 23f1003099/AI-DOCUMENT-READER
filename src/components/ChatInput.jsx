import React from 'react';
import { RotateCcw, Send } from 'lucide-react';

const ChatInput = ({
  selectedTool,
  currentInput,
  setCurrentInput,
  handleToolExecution,
  selectedDocument,
  selectedSubject,
  isProcessing,
  aiTools,
  getCurrentSubject,
  isPreviewOpen
}) => {
  return (
    <div className="w-full border-t backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 border-white/20 dark:border-gray-700/20 px-4 py-4">
      <div className={`mx-auto ${isPreviewOpen ? 'max-w-4xl' : 'w-full'}`}>
        <div className="flex w-full items-center gap-4">
          <div className="flex-1 relative flex-shrink-0">
            {selectedTool === 'ask-ai' ? (
              <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleToolExecution()}
                placeholder={
                  selectedDocument && selectedSubject
                    ? `Ask a question about ${getCurrentSubject()?.title}...`
                    : 'Select a document and subject first...'
                }
                disabled={!selectedDocument || !selectedSubject || isProcessing}
                className="w-full px-6 py-4 bg-white/80 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50 shadow-lg"
              />
            ) : (
              <div className="w-full px-6 py-4 bg-gray-100/80 dark:bg-gray-700/80 border border-gray-300 dark:border-gray-700 rounded-2xl text-gray-700 dark:text-gray-300 shadow-lg">
                {selectedDocument && selectedSubject
                  ? `Generate ${aiTools.find(t => t.id === selectedTool)?.name} for ${getCurrentSubject()?.title}`
                  : 'Select a document and subject first...'}
              </div>
            )}
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={handleToolExecution}
              disabled={!selectedDocument || !selectedSubject || isProcessing}
              className="bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-4 rounded-2xl flex items-center gap-2 transition-all duration-300 shadow-lg transform hover:scale-105 disabled:transform-none"
            >
              {isProcessing ? (
                <>
                  <RotateCcw className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Execute</span>
                </>
              )}
            </button>
          </div>
        </div>

        {selectedDocument && selectedSubject && (
          <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
            Using {aiTools.find(t => t.id === selectedTool)?.name} on "{getCurrentSubject()?.title}"
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInput;
