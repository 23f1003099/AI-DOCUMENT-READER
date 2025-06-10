import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Biology_Class10.pdf',
      uploadDate: '2 days ago',
      size: '2.4 MB',
      type: 'pdf',
    },
    {
      id: 2,
      name: 'Modern_History.docx',
      uploadDate: '4 days ago',
      size: '1.8 MB',
      type: 'docx',
    },
    {
      id: 3,
      name: 'Physics_Notes.txt',
      uploadDate: '1 week ago',
      size: '856 KB',
      type: 'txt',
    },
  ]);

  const [aiActivity, setAiActivity] = useState([
    {
      id: 1,
      action: 'Summarized',
      document: 'Biology_Class10.pdf',
      time: '2 hours ago',
    },
    {
      id: 2,
      action: 'Generated Notes',
      document: 'Modern_History.docx',
      time: '5 hours ago',
    },
    {
      id: 3,
      action: 'Quiz Created',
      document: 'Physics_Notes.txt',
      time: '1 day ago',
    },
  ]);

  const [usageStats] = useState({
    documents: 16,
    questions: 132,
    flashcards: 91,
  });

  const [user, setUser] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    avatar: null,
    preferences: {
      notifications: true,
      autoSave: true,
      darkMode: false,
    },
  });

  const addDocument = (doc) => {
    setDocuments([...documents, { ...doc, id: Date.now() }]);
  };

  const addAiActivity = (activity) => {
    setAiActivity([...aiActivity, { ...activity, id: Date.now() }]);
  };

  return (
    <AppContext.Provider
      value={{
        documents,
        aiActivity,
        usageStats,
        user,
        addDocument,
        addAiActivity,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};