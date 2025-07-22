import React from 'react';

const SidebarToolList = ({ aiTools, selectedTool, setSelectedTool, sidebarCollapsed }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="space-y-2">
        {aiTools.map((tool) => {
          const Icon = tool.icon;
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
                    {tool.description}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarToolList;
