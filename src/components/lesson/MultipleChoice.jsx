import React, { useState, useEffect } from 'react';

function MultipleChoice({ question, onSelectAnswer, answerStatus, userAnswer }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const { attributes, completed: isReviewMode, selectedAnswer: reviewUserAnswer } = question;

  function handleSelect(index) {
    setSelectedOption(index);
    // ...we immediately call the function passed down from the parent.
    onSelectAnswer(index);
  };

  const getOptionStyle = (index) => {
    if (isReviewMode) {
      if (index === attributes.correct_answer_index) {
        return 'border-green-500 bg-green-500/30 dark:bg-green-500/10'; // Correct answer
      }
      // Note: `reviewUserAnswer` might be a string, so we may need to parse it
      // For multiple choice, let's assume it's the index stored as a string.
      if (index === parseInt(reviewUserAnswer, 10) && index !== attributes.correct_answer_index) {
        return 'border-red-500 bg-red-500/10 opacity-70'; // User's incorrect answer
      }
      return 'border-gray-600 dark:border-zinc-700 opacity-60'; // Other options
    }

    if (answerStatus === 'unanswered') {
      return selectedOption === index
        ? 'border-purple-500 bg-purple-500/10' // Selected
        : 'border-gray-300 dark:border-zinc-700 hover:bg-gray-200/50 dark:hover:bg-zinc-700/50'; // Default
    }
    // After answering
    if (index === attributes.correct_answer_index) {
      return 'border-green-500 bg-green-500/30 dark:bg-green-500/10 text-black dark:text-white'; // Correct answer
    }
    if (index === userAnswer && index !== attributes.correct_answer_index) {
      return 'border-red-500 bg-red-500/10 text-gray-900 dark:text-gray-400 opacity-70'; // Incorrectly chosen answer
    }
    return 'border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-gray-400 opacity-70'; // Other incorrect answers
  };

  return (
    <div className="space-y-4">
      {attributes.options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleSelect(index)}
          disabled={isReviewMode || answerStatus !== 'unanswered'}
          className={`w-full p-4 text-left font-semibold text-black dark:text-white border-2 rounded-lg transition-all duration-200
            ${getOptionStyle(index)}
          `}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default MultipleChoice;