import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppProvider } from './contexts/AppContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Documents from './pages/Documents';
import AITools from './pages/AITools';
import Profile from './pages/Profile';
import Study from './pages/Study';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import AskAI from './pages/tools/AskAI';
import SmartNotes from './pages/tools/SmartNotes';
import QuizMe from './pages/tools/QuizMe';
import Flashcards from './pages/tools/Flashcards';
import MindMap from './pages/tools/MindMap';
import Summary from './pages/tools/Summary';

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <Router>
          <Routes>
            {/* Authentication pages without layout */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            
            {/* Study page without layout for full-screen experience */}
            <Route path="/study" element={<Study />} />
            
            {/* Other pages with layout */}
            <Route path="/*" element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/documents" element={<Documents />} />
                  <Route path="/ai-tools" element={<AITools />} />
                  <Route path="/ai-tools/ask-ai" element={<AskAI />} />
                  <Route path="/ai-tools/smart-notes" element={<SmartNotes />} />
                  <Route path="/ai-tools/quiz-me" element={<QuizMe />} />
                  <Route path="/ai-tools/flashcards" element={<Flashcards />} />
                  <Route path="/ai-tools/mind-map" element={<MindMap />} />
                  <Route path="/ai-tools/summary" element={<Summary />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </Layout>
            } />
          </Routes>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;