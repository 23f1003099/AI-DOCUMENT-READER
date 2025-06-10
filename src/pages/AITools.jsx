import React from 'react';
import { 
  MessageSquare, 
  BookOpen, 
  HelpCircle, 
  CreditCard, 
  Share2, 
  List,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AITools = () => {
  const tools = [
    {
      name: 'Ask AI',
      description: 'Chat with your documents using natural language. Ask questions and get instant answers from your uploaded content.',
      icon: MessageSquare,
      color: 'bg-blue-500',
      href: '/ai-tools/ask-ai',
      features: ['Natural language queries', 'Contextual answers', 'Source citations'],
    },
    {
      name: 'Smart Notes',
      description: 'Automatically generate intelligent, well-structured notes from your documents with key insights highlighted.',
      icon: BookOpen,
      color: 'bg-purple-500',
      href: '/ai-tools/smart-notes',
      features: ['Auto bullet points', 'Key insights', 'Structured format'],
    },
    {
      name: 'Quiz Me',
      description: 'Test your understanding with AI-generated quizzes based on your document content.',
      icon: HelpCircle,
      color: 'bg-green-500',
      href: '/ai-tools/quiz-me',
      features: ['Multiple choice', 'True/false', 'Short answers'],
    },
    {
      name: 'Flashcards',
      description: 'Create interactive flashcards from key points and concepts in your documents for efficient studying.',
      icon: CreditCard,
      color: 'bg-pink-500',
      href: '/ai-tools/flashcards',
      features: ['Key terms', 'Definitions', 'Interactive review'],
    },
    {
      name: 'Mind Map',
      description: 'Visualize concepts and their relationships with automatically generated mind maps.',
      icon: Share2,
      color: 'bg-teal-500',
      href: '/ai-tools/mind-map',
      features: ['Visual hierarchy', 'Concept linking', 'Interactive nodes'],
    },
    {
      name: 'Summary Tool',
      description: 'Get concise, comprehensive summaries of your documents or specific sections.',
      icon: List,
      color: 'bg-orange-500',
      href: '/ai-tools/summary',
      features: ['Full document', 'Section summaries', 'Key points'],
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Sparkles className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">AI Study Tools</h1>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Transform your documents into interactive learning experiences with our AI-powered study tools.
          Each tool is designed to help you understand, remember, and master your content.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.name}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group"
            >
              {/* Tool Header */}
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-16 h-16 ${tool.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {tool.name}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg leading-relaxed">
                {tool.description}
              </p>

              {/* Features */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
                  Features
                </h4>
                <div className="flex flex-wrap gap-2">
                  {tool.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <Link
                to={tool.href}
                className="flex items-center justify-between w-full bg-gray-50 dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-gray-900 dark:text-white p-4 rounded-xl transition-all duration-300 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20"
              >
                <span className="font-medium">Try {tool.name}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          );
        })}
      </div>

      {/* Getting Started */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            To use any of these AI tools, simply upload a document first. Our AI will analyze your content 
            and make it available across all study tools for a seamless learning experience.
          </p>
          <Link
            to="/documents"
            className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
          >
            <span>Upload Documents</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AITools;