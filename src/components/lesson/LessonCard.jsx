import React from 'react';
import { FaPlay, FaCheckCircle, FaBookOpen } from 'react-icons/fa';

function LessonCard({ lesson, onStart }) {
  // Calculate progress and completion status
  const totalQuestions = lesson.questionCount || 0;
  const completedQuestions = lesson.completedQuestions || 0;
  const isCompleted = totalQuestions > 0 && completedQuestions >= totalQuestions;
  const progressPercentage = totalQuestions > 0 ? (completedQuestions / totalQuestions) * 100 : 0;

  return (
    <div 
      className={`relative bg-slate-300 dark:bg-zinc-900 rounded-2xl shadow-lg p-6 transition-all duration-300 transform hover:-translate-y-2
        ${isCompleted ? 'border-2 border-green-500' : 'border-2 border-transparent'}
      `}
    >
      {/* Chapter Number Badge */}
      {/* <div className="absolute -top-4 -left-4 w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md">
        {lesson.chapterNumber}
      </div> */}

      {isCompleted && (
        <div className="absolute top-4 right-4 text-green-500">
          <FaCheckCircle size={24} title="Completed" />
        </div>
      )}

      {/* Card Content */}
      <div className="pt-8">
        <h2 className="text-xl sm:text-2xl font-semibold dark:font-bold text-black dark:text-white mb-2">{lesson.title}</h2>
        <p className="text-gray-900 dark:text-gray-300 text-sm mb-4 h-10">{lesson.description}</p>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center text-xs text-gray-900 dark:text-gray-300 mb-1">
            <span>Progress</span>
            <span>{completedQuestions} / {totalQuestions}</span>
          </div>
          <div className="w-full bg-slate-500 dark:bg-zinc-700 rounded-full h-2.5">
            <div 
              className="bg-purple-600 h-2.5 rounded-full" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onStart}
          className="w-full mt-4 py-3 px-6 bg-yellow-400 text-black font-bold rounded-lg flex items-center justify-center gap-2
            hover:bg-yellow-500 transition-colors duration-200 shadow-lg shadow-indigo-300 dark:shadow-xs cursor-pointer"
        >
          {isCompleted ? <FaBookOpen /> : <FaPlay />}
          <span>{isCompleted ? 'Review Lesson' : 'Start Lesson'}</span>
        </button>
      </div>
    </div>
  );
};

export default LessonCard;