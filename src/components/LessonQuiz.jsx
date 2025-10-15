import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LessonQuiz() {
   const navigate = useNavigate(); // For navigating back

  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const question = {
    text: "What is the Malay word for 'Three'?",
    options: [
      { id: 1, text: "Satu", isCorrect: false },
      { id: 2, text: "Tiga", isCorrect: true },
      { id: 3, text: "Lima", isCorrect: false },
      { id: 4, text: "Dua", isCorrect: false },
    ],
  };

  const handleOptionClick = (option) => {
    if (!isAnswered) {
      setSelectedOption(option);
      setIsAnswered(true);
    }
  };

  function getOptionStyle(option){
    if (!isAnswered) return "bg-black hover:bg-gray-500";

    if (option.isCorrect) return "bg-green-600 border-green-600";
    if (selectedOption === option) return "bg-red-300 border-red-600";
    return "bg-red-600";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-yellow-200 p-6">
      <div className="w-full max-w-xl bg-gray-800 p-8 rounded-lg shadow-lg">
        {/* Back Button */}
        <button
          onClick={() => navigate("/lesson")} // ← Change path based on your route
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm px-4 py-1 rounded-full shadow"
        >
          ← Back to Lessons
        </button>

        {/* Topic Title */}
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Topic: Numbers</h2>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full mb-8">
          <div className="bg-yellow-400 h-2 rounded-full w-1/5 transition-all duration-500"></div>
        </div>

        {/* Question */}
        <div className="mb-6 text-xl font-semibold text-white">
          {question.text}
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-4">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option)}
              disabled={isAnswered}
              className={`p-4 rounded-lg border text-left font-medium transition ${getOptionStyle(option)}`}
            >
              {option.text}
            </button>
          ))}
        </div>

        {/* Feedback Message */}
        {isAnswered && (
          <div className="mt-6 text-center text-lg font-semibold">
            {selectedOption.isCorrect ? (
              <span className="text-green-600">Correct! 🎉</span>
            ) : (
              <span className="text-red-600">Oops! The correct answer is <strong>Tiga</strong>.</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default LessonQuiz;