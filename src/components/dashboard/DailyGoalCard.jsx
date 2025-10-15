import React, { useState } from 'react';
import { FaFlagCheckered } from 'react-icons/fa'; // Example icon

// This would be the component for the card itself
const DailyGoalCard = ({ progress, goal, onEditClick }) => {
  const fraction = (progress / goal) > 1 ? 1 : progress / goal
  const percentage = goal > 0 ? Math.round(fraction * 100) : 0;
  const circumference = 2 * Math.PI * 54; // 2 * pi * radius

  return (
    <div 
      onClick={onEditClick} // The whole card is clickable
      className="relative p-6 rounded-2xl border-2 border-slate-600 bg-slate-800 text-white cursor-pointer hover:bg-slate-600 dark:hover:bg-slate-700/50 transition-colors duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg">Daily Goal</h3>
          <p className="text-3xl font-bold mt-2">{progress} / {goal} <span className="text-lg font-medium">Completed</span></p>
        </div>
        {/* The Progress Ring */}
        <div className="relative w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 120 120">
            {/* Background Circle */}
            <circle cx="60" cy="60" r="54" fill="none" strokeWidth="12" className="stroke-slate-700" />
            {/* Progress Circle */}
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              strokeWidth="12"
              className="stroke-purple-500"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: circumference - (percentage / 100) * circumference,
                transform: 'rotate(-90deg)',
                transformOrigin: '50% 50%',
                transition: 'stroke-dashoffset 0.5s ease-out'
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-purple-300">{percentage}%</span>
          </div>
        </div>
      </div>
      <p className="text-sm text-slate-400 mt-4">Click to set a new goal.</p>
    </div>
  );
};

export default DailyGoalCard;