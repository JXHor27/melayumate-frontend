import React, { useState, useEffect, useMemo } from 'react';

// Helper function to shuffle an array (Fisher-Yates algorithm)
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

function SentenceBuilding({ question, onSelectAnswer, answerStatus }) {
  // The user's constructed sentence, as an array of objects
  const [constructedSentence, setConstructedSentence] = useState([]);
  // The available words in the word bank, also as an array of objects
  const [wordBank, setWordBank] = useState([]);

  const isReviewMode = question.completed;
  const { attributes } = question;

  const initialShuffledWords = useMemo(() => 
    shuffleArray(
      // Map the words to objects with a unique ID for stable keys
      attributes.component_words.map((word, index) => ({ id: index, text: word }))
    ), 
    [attributes.component_words]
  );
  
  // Initialize the state when the component mounts
  useEffect(() => {
    if (!isReviewMode) {
      setWordBank(initialShuffledWords);
      setConstructedSentence([]);
    }
  }, [initialShuffledWords, isReviewMode]);

  // 3. PARENT COMMUNICATION
  useEffect(() => {
    // We only want to communicate with the parent in practice mode.
    if (isReviewMode || answerStatus !== 'unanswered') return;
    //console.log(constructedSentence);
    //console.log(answerStatus)
    // 1. Join the array of word objects into a final sentence string.
    const finalSentence = constructedSentence.map(w => w.text).join(' ');

    // 2. Call the function from the parent to update the 'selectedAnswer' state.
    // If the sentence is empty, we pass `null` to disable the Check button.
    onSelectAnswer(finalSentence.length > 0 ? finalSentence : null);

  }, [constructedSentence, isReviewMode, answerStatus, onSelectAnswer]);

  // 2. LOGIC FOR MOVING WORDS
  const selectWord = (wordObject) => {
    // Add the word to the sentence
    setConstructedSentence([...constructedSentence, wordObject]);
    // Remove the word from the word bank
    setWordBank(wordBank.filter(w => w.id !== wordObject.id));
  };
  
  const deselectWord = (wordObject) => {
    // Add the word back to the word bank
    setWordBank([...wordBank, wordObject]);
    // Remove the word from the sentence
    setConstructedSentence(constructedSentence.filter(w => w.id !== wordObject.id));
  };


  // --- REVIEW MODE LOGIC ---
  const renderReviewView = () => {
    const correctWords = attributes.correct_sentence.split(' ');
    // The user's answer is a string, e.g., "saya makan nasi suka"
    const userWords = question.selectedAnswer ? question.selectedAnswer.split(' ') : [];

    return (
      <div className="space-y-6">
        {/* User's Answer */}
        <div>
          <h4 className="text-sm font-bold text-gray-700 dark:text-gray-400 mb-2">YOUR ANSWER</h4>
          <div className="w-full min-h-[4rem] p-4 bg-slate-300 dark:bg-zinc-800 rounded-lg flex flex-wrap gap-2">
            {userWords.map((word, index) => (
              <span key={index} className="px-4 py-2 bg-white dark:bg-zinc-900 text-black dark:text-white font-semibold rounded-lg shadow-md">
                {word}
              </span>
            ))}
            {userWords.length === 0 && <span className="text-gray-400">You did not answer this question.</span>}
          </div>
        </div>

        {/* Correct Answer with "Diff" Styling */}
        <div>
          <h4 className="text-sm font-bold text-green-700 dark:text-green-400 mb-2">CORRECT ANSWER</h4>
          <div className="w-full min-h-[4rem] p-4 bg-green-500/40 dark:bg-green-500/20 rounded-lg flex flex-wrap gap-2">
            {correctWords.map((correctWord, index) => {
              const userWord = userWords[index];
              const isWordCorrect = userWord === correctWord;
              
              // Style the word green if correct, red if incorrect or missing
              return (
                <span 
                  key={index} 
                  className={`px-4 py-2 font-semibold rounded-lg shadow-md
                    ${isWordCorrect
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    }
                  `}
                >
                  {correctWord}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    );
  };


  // 4. THE UI (JSX)
  // --- PRACTICE MODE UI (Extracted from the old return statement) ---
  const renderPracticeView = () => (
    <div className="flex flex-col items-center">
      {/* Sentence Construction Area */}
      <div 
        className={`w-full min-h-[6rem] p-4 bg-slate-200 dark:bg-zinc-800 rounded-lg border-b-4
          ${answerStatus === 'unanswered' ? 'border-gray-400 dark:border-zinc-600' : ''}
          ${answerStatus === 'correct' ? 'border-green-500' : ''}
          ${answerStatus === 'incorrect' ? 'border-red-500' : ''}
        `}
      >
        <div className="flex flex-wrap gap-2">
          {constructedSentence.map(word => (
            <button
              key={word.id}
              onClick={() => answerStatus === 'unanswered' && deselectWord(word)}
              disabled={answerStatus !== 'unanswered'}
              className="px-4 py-2 bg-white dark:bg-zinc-900 text-black dark:text-white font-semibold rounded-lg shadow-md cursor-pointer"
            >
              {word.text}
            </button>
          ))}
        </div>
      </div>
      
      <div className="w-full h-px bg-gray-300 dark:bg-zinc-700 my-8"></div>
      
      {/* Word Bank Area */}
      <div className="flex flex-wrap justify-center gap-3">
        {wordBank.sort((a, b) => a.id - b.id).map(word => (
          <button
            key={word.id}
            onClick={() => answerStatus === 'unanswered' && selectWord(word)}
            disabled={answerStatus !== 'unanswered'}
            className="px-4 py-2 bg-slate-300 dark:bg-zinc-700 text-black dark:text-white font-semibold rounded-lg shadow-md
                       hover:bg-gray-200 dark:hover:bg-zinc-600 transform hover:-translate-y-1 transition-all duration-150"
          >
            {word.text}
          </button>
        ))}
      </div>
    </div>
  );

  const renderPracticeFeedback = () => {
    const isCorrect = answerStatus === 'correct';

    return (
      <div className="mt-8 text-center">
        <h3 className={`text-2xl font-bold ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
          {isCorrect ? 'Excellent!' : 'Not quite...'}
        </h3>
        {!isCorrect && (
          <div className="mt-4">
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">CORRECT ANSWER:</p>
            <p className="text-lg font-bold text-black dark:text-white">{attributes.correct_sentence}</p>
          </div>
        )}
      </div>
    );
  };

  // --- FINAL RENDER ---
  // The component decides which view to render based on the mode.
   return (
    <div>
      {isReviewMode ? renderReviewView() : renderPracticeView()}

      {/* 
        Conditionally render the feedback UI *after* an answer has been submitted
        in practice mode.
      */}
      {!isReviewMode && answerStatus !== 'unanswered' && renderPracticeFeedback()}
    </div>
  );
};

export default SentenceBuilding;