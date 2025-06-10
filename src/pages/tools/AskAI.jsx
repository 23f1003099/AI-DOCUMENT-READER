import React, { useState } from 'react';
import { Send, MessageSquare, FileText, Brain } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const AskAI = () => {
  const { documents } = useApp();
  const [selectedDocument, setSelectedDocument] = useState('');
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([
    {
      type: 'ai',
      content: 'Hello! I\'m your AI assistant. Select a document and ask me any questions about its content.',
    },
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage = { type: 'user', content: message };
    const aiResponse = {
      type: 'ai',
      content: `Based on the document "${selectedDocument || 'your selected document'}", here's what I found: This is a simulated AI response. In a real implementation, this would analyze your document content and provide contextual answers.`,
    };

    setConversation([...conversation, userMessage, aiResponse]);
    setMessage('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <MessageSquare className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Ask AI</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Chat with your documents using natural language queries
        </p>
      </div>

      {/* Document Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Select Document
        </h3>
        <select
          value={selectedDocument}
          onChange={(e) => setSelectedDocument(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Choose a document to chat with...</option>
          {documents.map((doc) => (
            <option key={doc.id} value={doc.name}>
              {doc.name}
            </option>
          ))}
        </select>
      </div>

      {/* Chat Interface */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Messages */}
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {conversation.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {msg.type === 'ai' && (
                    <Brain className="w-4 h-4 mt-1 text-blue-600 dark:text-blue-400" />
                  )}
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex space-x-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={
                selectedDocument
                  ? `Ask a question about ${selectedDocument}...`
                  : 'Select a document first...'
              }
              disabled={!selectedDocument}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
            />
            <button
              onClick={handleSendMessage}
              disabled={!message.trim() || !selectedDocument}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Questions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Questions
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            'Summarize the main points',
            'What are the key takeaways?',
            'Explain this concept in simple terms',
            'What questions might this appear on a test?',
          ].map((question, index) => (
            <button
              key={index}
              onClick={() => setMessage(question)}
              disabled={!selectedDocument}
              className="text-left p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 transition-colors disabled:opacity-50"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AskAI;