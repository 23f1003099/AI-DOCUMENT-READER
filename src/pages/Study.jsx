import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  BookOpen, 
  HelpCircle, 
  CreditCard, 
  Share2, 
  List,
  Upload,
  ChevronLeft,
  ChevronRight,
  X,
  Send,
  RotateCcw,
  Download,
  Copy,
  FileText,
  Brain,
  Sparkles,
  Clock,
  ChevronDown,
  ChevronUp,
  Plus,
  Eye,
  Target,
  Home,
  Settings,
  User,
  Search,
  Filter,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { useTheme } from '../contexts/ThemeContext';

const Study = () => {
  const { documents, addDocument } = useApp();
  const { isDark } = useTheme();
  const [selectedTool, setSelectedTool] = useState('ask-ai');
  const [selectedDocument, setSelectedDocument] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [previewCollapsed, setPreviewCollapsed] = useState(false);
  const [studyHistory, setStudyHistory] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [documentPreview, setDocumentPreview] = useState(null);
  const [highlightedPage, setHighlightedPage] = useState(1);
  const chatEndRef = useRef(null);

  // Mock Subject data with page references
  const documentSubjects = {
    'Biology_Class10.pdf': [
      { id: 'ch1', title: 'Cell Structure and Function', pages: [1, 2, 3, 4], content: 'Subject 1 content about cells...' },
      { id: 'ch2', title: 'Photosynthesis', pages: [5, 6, 7, 8], content: 'Subject 2 content about photosynthesis...' },
      { id: 'ch3', title: 'Cellular Respiration', pages: [9, 10, 11, 12], content: 'Subject 3 content about respiration...' },
    ],
    'Modern_History.docx': [
      { id: 'ch1', title: 'Industrial Revolution', pages: [1, 2, 3], content: 'Subject 1 about industrial revolution...' },
      { id: 'ch2', title: 'World Wars', pages: [4, 5, 6, 7], content: 'Subject 2 about world wars...' },
      { id: 'ch3', title: 'Modern Era', pages: [8, 9, 10], content: 'Subject 3 about modern era...' },
    ],
    'Physics_Notes.txt': [
      { id: 'ch1', title: 'Mechanics', pages: [1, 2], content: 'Subject 1 about mechanics...' },
      { id: 'ch2', title: 'Thermodynamics', pages: [3, 4], content: 'Subject 2 about thermodynamics...' },
    ],
  };

  const aiTools = [
    {
      id: 'ask-ai',
      name: 'Ask AI',
      icon: MessageSquare,
      color: 'from-blue-500 to-blue-600',
      description: 'Chat with your documents',
    },
    {
      id: 'smart-notes',
      name: 'Smart Notes',
      icon: BookOpen,
      color: 'from-purple-500 to-purple-600',
      description: 'Generate intelligent notes',
    },
    {
      id: 'quiz-me',
      name: 'Quiz Me',
      icon: HelpCircle,
      color: 'from-green-500 to-green-600',
      description: 'Test your understanding',
    },
    {
      id: 'flashcards',
      name: 'Flashcards',
      icon: CreditCard,
      color: 'from-pink-500 to-pink-600',
      description: 'Interactive study cards',
    },
    {
      id: 'mind-map',
      name: 'Mind Map',
      icon: Share2,
      color: 'from-teal-500 to-teal-600',
      description: 'Visualize concepts',
    },
    {
      id: 'summary',
      name: 'Summary',
      icon: List,
      color: 'from-orange-500 to-orange-600',
      description: 'Concise summaries',
    },
    {
      id: 'evaluate',
      name: 'Evaluate',
      icon: Target,
      color: 'from-red-500 to-red-600',
      description: 'Performance evaluation',
    },
  ];

  const getCurrentSubject = () => {
    if (!selectedDocument || !selectedSubject) return null;
    const Subjects = documentSubjects[selectedDocument] || [];
    return Subjects.find(ch => ch.id === selectedSubject);
  };

  const addToHistory = (tool, Subject, input, output, type = 'text', referencedPage = null) => {
    const newEntry = {
      id: Date.now(),
      tool,
      Subject,
      document: selectedDocument,
      input,
      output,
      type,
      referencedPage,
      timestamp: new Date(),
    };
    setStudyHistory(prev => [...prev, newEntry]);
    
    // Update document preview if there's a referenced page
    if (referencedPage) {
      setHighlightedPage(referencedPage);
    }
  };

  const handleToolExecution = async () => {
    if (!selectedDocument || !selectedSubject) {
      alert('Please select a document and Subject first');
      return;
    }

    const currentSubject = getCurrentSubject();
    const selectedToolData = aiTools.find(tool => tool.id === selectedTool);
    
    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      let output = '';
      let type = 'text';
      let referencedPage = currentSubject.pages[0]; // Default to first page of Subject

      switch (selectedTool) {
        case 'ask-ai':
          output = `Based on "${currentSubject.title}" (Page ${referencedPage}), here's what I found: ${currentInput || 'This is a simulated AI response about the Subject content with specific page references.'}`;
          break;
        case 'smart-notes':
          output = `# Smart Notes: ${currentSubject.title}\n\n## Key Concepts (Pages ${currentSubject.pages.join(', ')})\n• Important concept 1\n• Important concept 2\n• Important concept 3\n\n## Summary\nThis Subject covers fundamental concepts that are essential for understanding the Subject matter.`;
          type = 'notes';
          break;
        case 'quiz-me':
          output = {
            questions: [
              {
                question: `What is the main topic of ${currentSubject.title}?`,
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correct: 0,
                page: referencedPage
              }
            ]
          };
          type = 'quiz';
          break;
        case 'flashcards':
          output = [
            { front: `Key term from ${currentSubject.title}`, back: 'Definition and explanation of the key term', page: referencedPage },
            { front: 'Important concept', back: 'Detailed explanation of the concept', page: referencedPage + 1 }
          ];
          type = 'flashcards';
          break;
        case 'mind-map':
          output = {
            title: currentSubject.title,
            nodes: [
              { id: 'root', label: currentSubject.title, x: 200, y: 100, page: referencedPage },
              { id: 'concept1', label: 'Key Concept 1', x: 100, y: 50, page: referencedPage },
              { id: 'concept2', label: 'Key Concept 2', x: 300, y: 50, page: referencedPage + 1 }
            ]
          };
          type = 'mindmap';
          break;
        case 'summary':
          output = `## Summary: ${currentSubject.title}\n\nThis Subject (Pages ${currentSubject.pages.join('-')}) provides an overview of key concepts and their applications. The main points include fundamental principles and practical examples.`;
          type = 'summary';
          break;
        case 'evaluate':
          output = {
            score: 85,
            strengths: ['Good understanding of basic concepts', 'Clear grasp of terminology'],
            improvements: ['Need more practice with applications', 'Review complex relationships'],
            recommendations: ['Focus on practical examples', 'Create more flashcards for key terms']
          };
          type = 'evaluation';
          break;
      }

      addToHistory(selectedToolData, currentSubject, currentInput, output, type, referencedPage);
      setCurrentInput('');
      setIsProcessing(false);
    }, 1500);
  };

  const handleHistoryClick = (entry) => {
    // Navigate to the specific tool page with pre-selected Subject
    const toolPath = `/ai-tools/${entry.tool.id}`;
    // In a real app, you'd use React Router to navigate with state
    window.location.href = `${toolPath}?document=${entry.document}&Subject=${entry.Subject.id}`;
  };

  const renderHistoryEntry = (entry) => {
    const Icon = entry.tool.icon;
    
    return (
      <div 
        key={entry.id}
        className="mb-6 group"
      >
        {/* Tool Header */}
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
          {entry.type === 'text' && (
            <p className="text-sm text-gray-700 dark:text-gray-300">{entry.output}</p>
          )}
          {entry.type === 'notes' && (
            <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans">
              {entry.output}
            </pre>
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
                    <div className="text-xs font-medium text-gray-900 dark:text-white mb-1">
                      {card.front}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {card.back}
                    </div>
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
                    <div key={idx} className={`px-3 py-1 bg-gradient-to-r ${entry.tool.color} text-white rounded-full text-xs`}>
                      {node.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {entry.type === 'summary' && (
            <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans">
              {entry.output}
            </pre>
          )}
          {entry.type === 'evaluation' && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {entry.output.score}%
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Overall Score</span>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <h5 className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">Strengths</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    {entry.output.strengths.map((strength, idx) => (
                      <li key={idx}>• {strength}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-orange-600 dark:text-orange-400 mb-1">Areas to Improve</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    {entry.output.improvements.map((improvement, idx) => (
                      <li key={idx}>• {improvement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [studyHistory]);

  useEffect(() => {
    // Set document preview when document is selected
    if (selectedDocument) {
      setDocumentPreview({
        name: selectedDocument,
        totalPages: documentSubjects[selectedDocument]?.reduce((acc, ch) => Math.max(acc, ...ch.pages), 0) || 10,
        currentPage: highlightedPage
      });
    }
  }, [selectedDocument, highlightedPage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Glassmorphic Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-white/20 dark:border-gray-700/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Learnado Study
                </span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/" className="p-2 rounded-lg hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors">
                <Home className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </Link>
              <button className="p-2 rounded-lg hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors">
                <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button className="p-2 rounded-lg hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors">
                <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16 h-screen">
        {/* Glassmorphic Left Sidebar - AI Tools */}
        <div className={`${sidebarCollapsed ? 'w-16' : 'w-80'} transition-all duration-300 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-r border-white/20 dark:border-gray-700/20`}>
          {/* Sidebar Header */}
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

          {/* AI Tools List */}
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
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* ChatGPT-style Chat Area */}
          <div className="flex-1 overflow-y-auto p-6">
            {studyHistory.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Start Your AI Study Session
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  Select a document, Subject, and AI tool to begin your intelligent study experience
                </p>
                {(!selectedDocument || !selectedSubject) && (
                  <div className="backdrop-blur-xl bg-orange-100/70 dark:bg-orange-900/70 border border-orange-200/50 dark:border-orange-700/50 rounded-xl p-4 max-w-md mx-auto">
                    <p className="text-sm text-orange-700 dark:text-orange-300">
                      Please select a document and Subject from the preview panel
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="max-w-4xl mx-auto">
                {studyHistory.map(renderHistoryEntry)}
                <div ref={chatEndRef} />
              </div>
            )}
          </div>

          {/* ChatGPT-style Input Area */}
          <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-t border-white/20 dark:border-gray-700/20 p-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex space-x-4">
                <div className="flex-1">
                  {selectedTool === 'ask-ai' ? (
                    <input
                      type="text"
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleToolExecution()}
                      placeholder={
                        selectedDocument && selectedSubject
                          ? `Ask a question about ${getCurrentSubject()?.title}...`
                          : 'Select a document and Subject first...'
                      }
                      disabled={!selectedDocument || !selectedSubject || isProcessing}
                      className="w-full px-6 py-4 backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 border border-white/20 dark:border-gray-700/20 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50 shadow-lg"
                    />
                  ) : (
                    <div className="w-full px-6 py-4 backdrop-blur-xl bg-gray-100/70 dark:bg-gray-700/70 border border-white/20 dark:border-gray-700/20 rounded-2xl text-gray-700 dark:text-gray-300 shadow-lg">
                      {selectedDocument && selectedSubject
                        ? `Generate ${aiTools.find(t => t.id === selectedTool)?.name} for ${getCurrentSubject()?.title}`
                        : 'Select a document and Subject first...'
                      }
                    </div>
                  )}
                </div>
                
                <button
                  onClick={handleToolExecution}
                  disabled={!selectedDocument || !selectedSubject || isProcessing}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-2xl flex items-center space-x-2 transition-all duration-300 shadow-lg transform hover:scale-105 disabled:transform-none"
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
              
              {selectedDocument && selectedSubject && (
                <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
                  Using {aiTools.find(t => t.id === selectedTool)?.name} on "{getCurrentSubject()?.title}"
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Floating Glassmorphic Document Preview */}
        <div className={`fixed top-20 right-4 ${previewCollapsed ? 'w-16' : 'w-80'} transition-all duration-300 z-40`}>
          <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border border-white/20 dark:border-gray-700/20 rounded-2xl shadow-2xl overflow-hidden">
            {/* Preview Header */}
            <div className="p-4 border-b border-white/20 dark:border-gray-700/20">
              <div className="flex items-center justify-between">
                {!previewCollapsed && (
                  <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">Documents</h3>
                  </div>
                )}
                <button
                  onClick={() => setPreviewCollapsed(!previewCollapsed)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  {previewCollapsed ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {!previewCollapsed && (
              <>
                {/* Document Preview */}
                {documentPreview && (
                  <div className="p-4 border-b border-white/20 dark:border-gray-700/20">
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg p-4 mb-3">
                      <div className="text-center">
                        <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                          {documentPreview.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Page {documentPreview.currentPage} of {documentPreview.totalPages}
                        </div>
                        {highlightedPage && (
                          <div className="mt-2 px-2 py-1 bg-yellow-200 dark:bg-yellow-800 rounded text-xs text-yellow-800 dark:text-yellow-200">
                            Referenced in AI response
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Documents & Subjects */}
                <div className="max-h-96 overflow-y-auto p-4">
                  <div className="space-y-3">
                    {documents.map((doc) => (
                      <div key={doc.id} className="backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 border border-white/20 dark:border-gray-700/20">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">{doc.name}</h4>
                        <div className="space-y-1">
                          {(documentSubjects[doc.name] || []).map((Subject) => (
                            <button
                              key={Subject.id}
                              onClick={() => {
                                setSelectedDocument(doc.name);
                                setSelectedSubject(Subject.id);
                                setHighlightedPage(Subject.pages[0]);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all duration-300 ${
                                selectedDocument === doc.name && selectedSubject === Subject.id
                                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                                  : 'bg-white/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-gray-600/50'
                              }`}
                            >
                              <div className="font-medium">{Subject.title}</div>
                              <div className={`text-xs ${
                                selectedDocument === doc.name && selectedSubject === Subject.id
                                  ? 'text-white/70'
                                  : 'text-gray-500 dark:text-gray-400'
                              }`}>
                                Pages {Subject.pages.join(', ')}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Study;