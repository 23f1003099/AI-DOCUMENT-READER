import React from 'react';
import { 
  FileText, 
  MessageSquare, 
  BookOpen, 
  HelpCircle, 
  CreditCard, 
  Share2, 
  List,
  TrendingUp,
  Brain,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import UploadZone from '../components/UploadZone';
import StatCard from '../components/StatCard';

const Dashboard = () => {
  const { documents, aiActivity, usageStats } = useApp();

  const aiTools = [
    {
      name: 'Ask AI',
      description: 'Chat with your documents',
      icon: MessageSquare,
      color: 'bg-blue-500',
      href: '/ai-tools/ask-ai',
    },
    {
      name: 'Smart Notes',
      description: 'Auto-generate intelligent notes',
      icon: BookOpen,
      color: 'bg-purple-500',
      href: '/ai-tools/smart-notes',
    },
    {
      name: 'Quiz Me',
      description: 'Test your understanding',
      icon: HelpCircle,
      color: 'bg-green-500',
      href: '/ai-tools/quiz-me',
    },
    {
      name: 'Flashcards',
      description: 'Key points for quick review',
      icon: CreditCard,
      color: 'bg-pink-500',
      href: '/ai-tools/flashcards',
    },
    {
      name: 'Mind Map',
      description: 'Visualize concept relationships',
      icon: Share2,
      color: 'bg-teal-500',
      href: '/ai-tools/mind-map',
    },
    {
      name: 'Summary Tool',
      description: 'Get concise document summaries',
      icon: List,
      color: 'bg-orange-500',
      href: '/ai-tools/summary',
    },
  ];

  const suggestions = [
    {
      action: 'Try the "Quiz Me" tool for your recent Biology document.',
      description: 'Great for checking understanding of biology content',
      icon: Lightbulb,
    },
    {
      action: 'Generate Flashcards from Modern History notes.',
      description: 'Perfect for quiz prep',
      icon: Brain,
    },
    {
      action: 'Visualize Physics topics using Mind Map.',
      description: 'See conceptual links',
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 rounded-2xl p-8 text-white">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">
              Meet Your <span className="text-yellow-300">AI</span>
              <br />
              Document Assistant
            </h1>
            <p className="text-lg text-indigo-100 mb-6">
              Upload documents, ask questions, generate notes, 
              summarize content, and study smarter using AI-powered tools.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                <FileText className="w-4 h-4" />
                <span className="text-sm">Upload PDFs/Word</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm">Ask AI</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm">Smart Notes</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                <HelpCircle className="w-4 h-4" />
                <span className="text-sm">Quiz Me</span>
              </div>
            </div>

            <Link
              to="/study"
              className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
            >
              <span>Start Study Session</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Start</h3>
            <UploadZone />
          </div>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Documents */}
        <StatCard
          title="Recent Documents"
          stats={documents.map(doc => ({
            name: doc.name,
            date: doc.uploadDate,
            icon: FileText,
          }))}
        />

        {/* Usage Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Usage Stats</h3>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{usageStats.documents}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Documents</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">{usageStats.questions}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">AI Questions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{usageStats.flashcards}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Flashcards</div>
            </div>
          </div>
        </div>

        {/* AI Activity */}
        <StatCard
          title="AI Activity"
          stats={aiActivity.map(activity => ({
            action: activity.action,
            time: activity.document,
            description: activity.time,
          }))}
        />
      </div>

      {/* AI Study Tools */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">AI Study Tools</h2>
          <Link
            to="/study"
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium flex items-center space-x-1"
          >
            <span>Open Study Session</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.name}
                to={tool.href}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${tool.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Personalized Suggestions */}
      <StatCard
        title="Personalized Suggestions"
        stats={suggestions}
      />
    </div>
  );
};

export default Dashboard;