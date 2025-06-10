import React, { useState } from 'react';
import { Share2, RefreshCw, ZoomIn, ZoomOut, Download } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const MindMap = () => {
  const { documents } = useApp();
  const [selectedDocument, setSelectedDocument] = useState('');
  const [mindMapData, setMindMapData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);

  const mockMindMapData = {
    title: 'Biology Class 10 - Concept Map',
    nodes: [
      {
        id: 'root',
        label: 'Biology Fundamentals',
        x: 400,
        y: 200,
        level: 0,
        color: 'bg-blue-500',
      },
      {
        id: 'cell',
        label: 'Cell Structure',
        x: 200,
        y: 100,
        level: 1,
        color: 'bg-green-500',
        parent: 'root',
      },
      {
        id: 'photosynthesis',
        label: 'Photosynthesis',
        x: 600,
        y: 100,
        level: 1,
        color: 'bg-purple-500',
        parent: 'root',
      },
      {
        id: 'respiration',
        label: 'Cellular Respiration',
        x: 400,
        y: 350,
        level: 1,
        color: 'bg-orange-500',
        parent: 'root',
      },
      {
        id: 'nucleus',
        label: 'Nucleus',
        x: 100,
        y: 50,
        level: 2,
        color: 'bg-teal-500',
        parent: 'cell',
      },
      {
        id: 'mitochondria',
        label: 'Mitochondria',
        x: 300,
        y: 50,
        level: 2,
        color: 'bg-pink-500',
        parent: 'cell',
      },
      {
        id: 'chloroplast',
        label: 'Chloroplast',
        x: 500,
        y: 50,
        level: 2,
        color: 'bg-indigo-500',
        parent: 'photosynthesis',
      },
      {
        id: 'glucose',
        label: 'Glucose Production',
        x: 700,
        y: 50,
        level: 2,
        color: 'bg-yellow-500',
        parent: 'photosynthesis',
      },
    ],
    connections: [
      { from: 'root', to: 'cell' },
      { from: 'root', to: 'photosynthesis' },
      { from: 'root', to: 'respiration' },
      { from: 'cell', to: 'nucleus' },
      { from: 'cell', to: 'mitochondria' },
      { from: 'photosynthesis', to: 'chloroplast' },
      { from: 'photosynthesis', to: 'glucose' },
    ],
  };

  const generateMindMap = async () => {
    if (!selectedDocument) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      setMindMapData(mockMindMapData);
      setIsGenerating(false);
    }, 2000);
  };

  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  };

  const getNodePosition = (node) => ({
    left: `${(node.x * zoomLevel) / 100}px`,
    top: `${(node.y * zoomLevel) / 100}px`,
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Share2 className="w-8 h-8 text-teal-600 dark:text-teal-400" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mind Map</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Visualize concepts and relationships from your documents
        </p>
      </div>

      {/* Document Selection */}
      {!mindMapData && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Select Document
              </h3>
              <select
                value={selectedDocument}
                onChange={(e) => setSelectedDocument(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">Choose a document...</option>
                {documents.map((doc) => (
                  <option key={doc.id} value={doc.name}>
                    {doc.name}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              onClick={generateMindMap}
              disabled={!selectedDocument || isGenerating}
              className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>Generate Mind Map</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Mind Map Viewer */}
      {mindMapData && (
        <div className="space-y-4">
          {/* Controls */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {mindMapData.title}
              </h3>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                  <button
                    onClick={zoomOut}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="px-3 py-1 text-sm font-medium text-gray-900 dark:text-white">
                    {zoomLevel}%
                  </span>
                  <button
                    onClick={zoomIn}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>
                
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
                
                <button
                  onClick={() => setMindMapData(null)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  New Map
                </button>
              </div>
            </div>
          </div>

          {/* Mind Map Canvas */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="relative h-96 overflow-auto bg-gray-50 dark:bg-gray-900">
              <svg
                className="absolute inset-0 w-full h-full"
                style={{ 
                  width: `${800 * zoomLevel / 100}px`, 
                  height: `${400 * zoomLevel / 100}px` 
                }}
              >
                {/* Connections */}
                {mindMapData.connections.map((connection, index) => {
                  const fromNode = mindMapData.nodes.find(n => n.id === connection.from);
                  const toNode = mindMapData.nodes.find(n => n.id === connection.to);
                  
                  if (!fromNode || !toNode) return null;
                  
                  return (
                    <line
                      key={index}
                      x1={(fromNode.x * zoomLevel) / 100}
                      y1={(fromNode.y * zoomLevel) / 100}
                      x2={(toNode.x * zoomLevel) / 100}
                      y2={(toNode.y * zoomLevel) / 100}
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-gray-400 dark:text-gray-600"
                    />
                  );
                })}
              </svg>

              {/* Nodes */}
              {mindMapData.nodes.map((node) => (
                <div
                  key={node.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${node.color} text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:scale-110 transition-transform cursor-pointer`}
                  style={getNodePosition(node)}
                >
                  <div className="text-center">
                    <div className="text-sm font-semibold">{node.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Features */}
      {!mindMapData && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center mb-4">
              <Share2 className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Visual Hierarchy
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Automatically organize concepts in a clear visual hierarchy showing relationships
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
              <ZoomIn className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Interactive Zoom
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Zoom in and out to explore different levels of detail in your concept map
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
              <Download className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Export Options
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Export your mind maps as images or PDFs for presentations and study materials
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MindMap;