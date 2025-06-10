import React, { useState } from 'react';
import { List, FileText, Copy, Download, RefreshCw, BookOpen } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const Summary = () => {
  const { documents } = useApp();
  const [selectedDocument, setSelectedDocument] = useState('');
  const [summaryType, setSummaryType] = useState('full');
  const [summary, setSummary] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSummary = async () => {
    if (!selectedDocument) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      const mockSummaries = {
        full: `# Complete Summary: ${selectedDocument}

## Executive Summary
This document provides a comprehensive overview of fundamental biological concepts essential for Class 10 students. The content covers cellular structure, photosynthesis, respiration, and their interconnected processes.

## Key Topics Covered

### 1. Cell Structure and Function
- **Cell Theory**: All living organisms are composed of cells, which serve as the basic unit of life
- **Organelles**: Nucleus (control center), mitochondria (powerhouse), chloroplasts (photosynthesis)
- **Cell Membrane**: Selective permeability and transport mechanisms

### 2. Photosynthesis
- **Process**: Plants convert sunlight, water, and carbon dioxide into glucose and oxygen
- **Location**: Primarily occurs in chloroplasts within leaf cells
- **Importance**: Foundation of most food chains and oxygen production

### 3. Cellular Respiration
- **Function**: Breakdown of glucose to release energy for cellular activities
- **Location**: Occurs in mitochondria
- **Products**: ATP (energy), carbon dioxide, and water

## Main Conclusions
The document establishes clear connections between cellular structures and their functions, emphasizing how photosynthesis and respiration work together to maintain life processes. Students should understand these concepts as foundational to more advanced biology topics.

## Study Recommendations
- Focus on understanding processes rather than memorizing facts
- Practice diagram labeling for cell structures
- Understand the relationship between photosynthesis and respiration
- Review energy transfer concepts

*Summary generated on ${new Date().toLocaleDateString()}*`,

        brief: `# Brief Summary: ${selectedDocument}

## Main Points
- **Cell Biology**: Covers basic cell structure including nucleus, mitochondria, and chloroplasts
- **Photosynthesis**: Process by which plants make food using sunlight, water, and CO2
- **Respiration**: How cells break down glucose to release energy
- **Energy Flow**: Connection between photosynthesis and respiration in ecosystems

## Key Takeaways
This document explains fundamental life processes at the cellular level. Students should understand how cells are organized, how plants make food, and how organisms release energy from food.

## Essential Concepts
1. Cell theory and organelle functions
2. Photosynthesis equation and process
3. Cellular respiration and ATP production
4. Interconnection of life processes

*Generated on ${new Date().toLocaleDateString()}*`,

        bullets: `# Key Points: ${selectedDocument}

## Cell Structure
• Cells are the basic unit of all living things
• Nucleus controls cell activities and contains genetic material
• Mitochondria are the powerhouse of the cell, producing energy
• Chloroplasts in plant cells conduct photosynthesis
• Cell membrane controls what enters and exits the cell

## Photosynthesis
• Plants use sunlight, water, and carbon dioxide to make glucose
• Process occurs mainly in the leaves, specifically in chloroplasts
• Produces oxygen as a byproduct, which is essential for life
• Equation: 6CO2 + 6H2O + sunlight → C6H12O6 + 6O2

## Cellular Respiration
• Process of breaking down glucose to release energy (ATP)
• Occurs in mitochondria of all living cells
• Requires oxygen and produces carbon dioxide and water
• Opposite process to photosynthesis

## Connections
• Photosynthesis and respiration are complementary processes
• Plants do both photosynthesis and respiration
• Animals depend on plants for oxygen and glucose
• Carbon and oxygen cycles connect all living things

*Generated on ${new Date().toLocaleDateString()}*`
      };

      setSummary(mockSummaries[summaryType]);
      setIsGenerating(false);
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    alert('Summary copied to clipboard!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <List className="w-8 h-8 text-orange-600 dark:text-orange-400" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Summary Tool</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Generate concise, comprehensive summaries of your documents
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Document
            </label>
            <select
              value={selectedDocument}
              onChange={(e) => setSelectedDocument(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Choose a document...</option>
              {documents.map((doc) => (
                <option key={doc.id} value={doc.name}>
                  {doc.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Summary Type
            </label>
            <select
              value={summaryType}
              onChange={(e) => setSummaryType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="full">Full Summary</option>
              <option value="brief">Brief Overview</option>
              <option value="bullets">Key Points</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={generateSummary}
              disabled={!selectedDocument || isGenerating}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <List className="w-4 h-4" />
                  <span>Generate</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Summary Display */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Generated Summary
          </h3>
          
          {summary && (
            <div className="flex space-x-2">
              <button
                onClick={copyToClipboard}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors"
              >
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          )}
        </div>
        
        <div className="p-6">
          {summary ? (
            <div className="prose dark:prose-invert max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-gray-900 dark:text-white">
                {summary}
              </pre>
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No summary generated yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Select a document and summary type, then click "Generate" to create a summary
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Summary Types Info */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
            <BookOpen className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Full Summary
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Comprehensive overview with detailed explanations, conclusions, and study recommendations
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Brief Overview
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Concise summary focusing on main points and essential takeaways
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
            <List className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Key Points
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Bulleted list of important concepts and facts for quick reference
          </p>
        </div>
      </div>
    </div>
  );
};

export default Summary;