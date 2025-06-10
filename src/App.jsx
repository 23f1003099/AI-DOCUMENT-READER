import logo from './logo.svg';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Homepage from './pages/Homepage';
// import About from './pages/About';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Homepage />} />
//         <Route path="/about" element={<About />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppProvider } from './contexts/AppContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Documents from './pages/Documents';
import AITools from './pages/AITools';
import Profile from './pages/Profile';
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
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;