import React from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const Sidebar = ({ aiTools, selectedTool, setSelectedTool, sidebarCollapsed, setSidebarCollapsed }) => {
  return (
    <div className={`${sidebarCollapsed ? 'w-16' : 'w-80'} transition-all duration-300 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-r border-white/20 dark:border-gray-700/20`}>
      <div className="p-4 border-b border-white/20 dark:border-gray-700/20">
        <div className="flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">AI Study Tools</h2>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
          >
            {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {aiTools.map((tool) => {
            const Icon = tool.icon || Sparkles; // Fallback if no icon
            const isActive = selectedTool === tool.id;

            return (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? `bg-gradient-to-r ${tool.color} text-white shadow-lg transform scale-105`
                    : 'text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {!sidebarCollapsed && (
                  <div className="text-left">
                    <div className="font-medium">{tool.name}</div>
                    <div className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                      {tool.description || ''}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
