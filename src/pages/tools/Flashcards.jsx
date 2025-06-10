import React, { useState } from 'react';
import { CreditCard, RotateCcw, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const Flashcards = () => {
  const { documents } = useApp();
  const [selectedDocument, setSelectedDocument] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const mockFlashcards = [
    {
      front: 'What is Photosynthesis?',
      back: 'The process by which plants use sunlight, water, and carbon dioxide to create oxygen and energy in the form of sugar.',
    },
    {
      front: 'What is the Mitochondria?',
      back: 'The powerhouse of the cell - organelles that generate most of the chemical energy needed to power the cell\'s biochemical reactions.',
    },
    {
      front: 'Define Cell Theory',
      back: '1. All living things are made of cells\n2. Cells are the basic unit of life\n3. All cells come from other cells',
    },
    {
      front: 'What is DNA?',
      back: 'Deoxyribonucleic acid - the hereditary material in humans and almost all other organisms that contains genetic instructions.',
    },
    {
      front: 'What is Osmosis?',
      back: 'The movement of water molecules through a selectively permeable membrane from an area of high water concentration to low water concentration.',
    },
  ];

  const generateFlashcards = async () => {
    if (!selectedDocument) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      setFlashcards(mockFlashcards);
      setCurrentCard(0);
      setIsFlipped(false);
      setIsGenerating(false);
    }, 2000);
  };

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setIsFlipped(false);
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <CreditCard className="w-8 h-8 text-pink-600 dark:text-pink-400" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Flashcards</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Study key concepts with interactive flashcards
        </p>
      </div>

      {/* Document Selection */}
      {flashcards.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Select Document
              </h3>
              <select
                value={selectedDocument}
                onChange={(e) => setSelectedDocument(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="">Choose a document...</option>
                {documents.map((doc) => (
                  <option key={doc.id} value={doc.name}>
                    {doc.name}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              onClick={generateFlashcards}
              disabled={!selectedDocument || isGenerating}
              className="bg-pink-600 hover:bg-pink-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  <span>Generate Flashcards</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Flashcard Interface */}
      {flashcards.length > 0 && (
        <div className="space-y-6">
          {/* Progress */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Card {currentCard + 1} of {flashcards.length}
              </span>
              <button
                onClick={() => setFlashcards([])}
                className="text-sm text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 font-medium"
              >
                New Set
              </button>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-pink-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentCard + 1) / flashcards.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Flashcard */}
          <div className="flex justify-center">
            <div
              className="relative w-full max-w-md h-80 cursor-pointer"
              onClick={flipCard}
            >
              <div className={`absolute inset-0 w-full h-full transition-transform duration-600 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                {/* Front */}
                <div className="absolute inset-0 w-full h-full backface-hidden bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
                  <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                    <div className="text-sm text-pink-600 dark:text-pink-400 font-medium mb-4">
                      QUESTION
                    </div>
                    <div className="text-xl font-semibold text-gray-900 dark:text-white leading-relaxed">
                      {flashcards[currentCard]?.front}
                    </div>
                    <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                      Click to reveal answer
                    </div>
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-pink-50 dark:bg-pink-900/20 rounded-2xl border border-pink-200 dark:border-pink-700 shadow-lg">
                  <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                    <div className="text-sm text-pink-600 dark:text-pink-400 font-medium mb-4">
                      ANSWER
                    </div>
                    <div className="text-lg text-gray-900 dark:text-white leading-relaxed whitespace-pre-line">
                      {flashcards[currentCard]?.back}
                    </div>
                    <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                      Click to flip back
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={prevCard}
              className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 p-3 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={flipCard}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Flip Card</span>
            </button>
            
            <button
              onClick={nextCard}
              className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 p-3 rounded-full transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Study Progress */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Study Session
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                  {flashcards.length}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Total Cards</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {currentCard + 1}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Reviewed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {flashcards.length - currentCard - 1}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Remaining</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {Math.round(((currentCard + 1) / flashcards.length) * 100)}%
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Progress</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features */}
      {flashcards.length === 0 && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center mb-4">
              <CreditCard className="w-6 h-6 text-pink-600 dark:text-pink-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Key Terms
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Automatically extract and create flashcards from important terms and definitions
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
              <RotateCcw className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Interactive Review
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Flip cards with click or swipe gestures for engaging study sessions
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
              <RefreshCw className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Progress Tracking
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Track your study progress and review cards you found challenging
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flashcards;