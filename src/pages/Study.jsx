// Study.jsx
import React, { useState, useRef, useEffect } from 'react';
import {
  HelpCircle,
  StickyNote,
  ListChecks,
  BookOpen,
  Brain,
  Share2,
  Sparkles
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useTheme } from '../contexts/ThemeContext';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import DocumentPreviewPanel from '../components/DocumentPreviewPanel';
import ChatInput from '../components/ChatInput';
import HistoryEntry from '../components/HistoryEntry';
import EmptyState from '../components/EmptyState';

const Study = () => {
  const { documents } = useApp();
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

  const documentSubjects = {
    'Biology_Class10.pdf': [
      { id: 'ch1', title: 'Cell Structure and Function', pages: [1, 2, 3, 4] },
      { id: 'ch2', title: 'Photosynthesis', pages: [5, 6, 7, 8] },
      { id: 'ch3', title: 'Cellular Respiration', pages: [9, 10, 11, 12] },
    ],
    'Modern_History.docx': [
      { id: 'ch1', title: 'Industrial Revolution', pages: [1, 2, 3] },
      { id: 'ch2', title: 'World Wars', pages: [4, 5, 6, 7] },
      { id: 'ch3', title: 'Modern Era', pages: [8, 9, 10] },
    ],
    'Physics_Notes.txt': [
      { id: 'ch1', title: 'Mechanics', pages: [1, 2] },
      { id: 'ch2', title: 'Thermodynamics', pages: [3, 4] },
    ],
  };

  const aiTools = [
    { id: 'ask-ai', name: 'Ask AI', color: 'from-blue-500 to-blue-600', icon: HelpCircle },
    { id: 'smart-notes', name: 'Smart Notes', color: 'from-purple-500 to-purple-600', icon: StickyNote },
    { id: 'quiz-me', name: 'Quiz Me', color: 'from-green-500 to-green-600', icon: ListChecks },
    { id: 'flashcards', name: 'Flashcards', color: 'from-pink-500 to-pink-600', icon: BookOpen },
    { id: 'mind-map', name: 'Mind Map', color: 'from-teal-500 to-teal-600', icon: Brain },
    { id: 'summary', name: 'Summary', color: 'from-orange-500 to-orange-600', icon: Share2 },
    { id: 'evaluate', name: 'Evaluate', color: 'from-red-500 to-red-600', icon: Sparkles },
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
    if (referencedPage) setHighlightedPage(referencedPage);
  };

  const handleToolExecution = async () => {
    if (!selectedDocument || !selectedSubject) return alert('Please select a document and Subject first');
    const currentSubject = getCurrentSubject();
    const selectedToolData = aiTools.find(tool => tool.id === selectedTool);
    setIsProcessing(true);

    setTimeout(() => {
      let output = `This is a simulated response for ${currentSubject.title}`;
      let type = 'text';
      let referencedPage = currentSubject.pages[0];
      addToHistory(selectedToolData, currentSubject, currentInput, output, type, referencedPage);
      setCurrentInput('');
      setIsProcessing(false);
    }, 1500);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [studyHistory]);

  useEffect(() => {
    if (selectedDocument) {
      setDocumentPreview({
        name: selectedDocument,
        totalPages: documentSubjects[selectedDocument]?.reduce((acc, ch) => Math.max(acc, ...ch.pages), 0) || 10,
        currentPage: highlightedPage,
      });
    }
  }, [selectedDocument, highlightedPage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-100 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-700">
      <Navbar />

      <div className="flex pt-16 h-screen">
        <Sidebar
          aiTools={aiTools}
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />

        <div className={`flex-1 flex flex-col transition-all duration-300 ${!previewCollapsed ? 'pr-96' : 'pr-0'}`}>
          <div className="flex-1 overflow-y-auto p-6">
            {studyHistory.length === 0 ? (
              <EmptyState selectedDocument={selectedDocument} selectedSubject={selectedSubject} />
            ) : (
              <div className="max-w-4xl mx-auto">
                {studyHistory.map(entry => (
                  <HistoryEntry key={entry.id} entry={entry} />
                ))}
                <div ref={chatEndRef} />
              </div>
            )}
          </div>

          <ChatInput
            selectedTool={selectedTool}
            currentInput={currentInput}
            setCurrentInput={setCurrentInput}
            handleToolExecution={handleToolExecution}
            isProcessing={isProcessing}
            selectedDocument={selectedDocument}
            selectedSubject={selectedSubject}
            getCurrentSubject={getCurrentSubject}
            aiTools={aiTools}
             isPreviewOpen={!!selectedDocument}
          />
        </div>

        <DocumentPreviewPanel
          previewCollapsed={previewCollapsed}
          setPreviewCollapsed={setPreviewCollapsed}
          documentPreview={documentPreview}
          highlightedPage={highlightedPage}
          documents={documents}
          documentSubjects={documentSubjects}
          selectedDocument={selectedDocument}
          selectedSubject={selectedSubject}
          setSelectedDocument={setSelectedDocument}
          setSelectedSubject={setSelectedSubject}
          setHighlightedPage={setHighlightedPage}
        />
      </div>
    </div>
  );
};

export default Study;
