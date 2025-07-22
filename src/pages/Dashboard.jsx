import React, { useState } from 'react';
import {
  CreditCard, HelpCircle, List, Share2,
  Brain, TrendingUp, BookOpen, Globe2, GraduationCap, FileSearch
} from 'lucide-react';
import UploadZone from '../components/UploadZone';
import CarouselContainer from '../components/CarouselContainer';
import CardBlock from '../components/CardBlock';

const recentActivities = [
  { id: 1, title: "Flashcards generated for Physics", date: "2025-06-20", icon: <CreditCard className="w-8 h-8 text-indigo-600" /> },
  { id: 2, title: "Quiz created for Biology", date: "2025-06-19", icon: <HelpCircle className="w-8 h-8 text-green-600" /> },
  { id: 3, title: "Summary made for History", date: "2025-06-18", icon: <List className="w-8 h-8 text-orange-600" /> },
  { id: 4, title: "Mind Map for Geography", date: "2025-06-17", icon: <Share2 className="w-8 h-8 text-purple-600" /> },
];

const subjects = [
  { id: 1, name: "Biology", icon: <Brain className="w-10 h-10 text-indigo-500" /> },
  { id: 2, name: "Physics", icon: <TrendingUp className="w-10 h-10 text-indigo-500" /> },
  { id: 3, name: "History", icon: <BookOpen className="w-10 h-10 text-indigo-500" /> },
  { id: 4, name: "Geography", icon: <Globe2 className="w-10 h-10 text-indigo-500" /> },
  { id: 5, name: "Maths", icon: <GraduationCap className="w-10 h-10 text-indigo-500" /> },
  { id: 6, name: "Computer Science", icon: <FileSearch className="w-10 h-10 text-indigo-500" /> },
];

function Dashboard() {
  const [recentIndex, setRecentIndex] = useState(0);
  const [subjectIndex, setSubjectIndex] = useState(0);
  const visibleCount = 3;

  return (
    <div className="space-y-14">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-white shadow-2xl flex flex-col lg:flex-row justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-6">Welcome to <span className="text-yellow-300">AI Study Genius</span></h1>
          <p className="text-lg text-indigo-100 mb-8">Chat with your notes, generate flashcards & quizzes instantly. Prepare smarter.</p>
        </div>
        <div className="bg-white/10 rounded-xl p-6 shadow-xl">
          <h3 className="text-xl font-semibold mb-4">Quick Upload</h3>
          <UploadZone />
        </div>
      </div>

      {/* Recent Activities */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Recent Activities</h2>
        </div>

        <CarouselContainer
          index={recentIndex}
          visibleCount={visibleCount}
          total={recentActivities.length}
          onPrev={() => setRecentIndex(prev => prev - 1)}
          onNext={() => setRecentIndex(prev => prev + 1)}
        >
          {recentActivities.map(act => (
            <CardBlock
              key={act.id}
              icon={<div className="p-3 bg-indigo-100 rounded-full">{act.icon}</div>}
              title={act.title}
              subtitle={act.date}
              variant="recent"
            />
          ))}
        </CarouselContainer>
      </div>

      {/* Subjects */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Your Subjects</h2>
        </div>

        <CarouselContainer
          index={subjectIndex}
          visibleCount={visibleCount}
          total={subjects.length}
          onPrev={() => setSubjectIndex(prev => prev - 1)}
          onNext={() => setSubjectIndex(prev => prev + 1)}
        >
          {subjects.map(sub => (
            <CardBlock
              key={sub.id}
              icon={<div className="p-3 bg-white rounded-full shadow">{sub.icon}</div>}
              title={sub.name}
              variant="subject"
            />
          ))}
        </CarouselContainer>
      </div>
    </div>
  );
}

export default Dashboard;
