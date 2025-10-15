import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const lessonData = {
  1: [
    { id: 1, title: "Greetings", status: "completed" },
    { id: 2, title: "Numbers", status: "active" },
    { id: 3, title: "Family", status: "locked" },
    { id: 4, title: "Food", status: "locked" },
  ],
  2: [
    { id: 1, title: "Directions", status: "locked" },
    { id: 2, title: "Shopping", status: "locked" },
    { id: 3, title: "Colors", status: "locked" },
  ],
  // Add levels 3–5 similarly
};

const statusStyles = {
  completed: "bg-green-400 border-green-600",
  active: "bg-yellow-400 border-yellow-600 animate-bounce",
  locked: "bg-gray-300 border-gray-400 opacity-50",
};

function LessonPage() {
  const navigate = useNavigate();
    
  const [selectedLevel, setSelectedLevel] = useState(1);

  const levels = [1, 2, 3];
  const lessons = lessonData[selectedLevel] || [];

  function handleNavigate(){
    navigate(`/lesson/numbers`); 
  }

  return (
    <div className="flex">

      {/* Main Content */}
      <div className="ml-64 flex-1 w-220 bg-zinc-800  min-h-screen py-8">
        {/* Lesson Banner */}
        <div className="flex items-center bg-zinc-700 text-white rounded-md p-4 mb-8 shadow">
            <p className="ml-4 text-lg">Lesson</p>
            <p className='ml-auto'>MelayuMate <span className='text-zinc-400'>{'>'} Lesson</span></p>
        </div> 

        {/* Level Selector */}
        <div className="flex justify-around mb-10 mt-10 px-8">
          {levels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`cursor-pointer px-4 py-2 rounded-full border font-semibold transition md:w-1/6 ${
                selectedLevel === lvl
                  ? "bg-yellow-400 text-black"
                  : "bg-gray-200 text-gray-700 hover:bg-yellow-100"
              }`}
            >
              Level {lvl}
            </button>
          ))}
        </div>

        {/* Checkpoint Layout */}
        {/* <div className="flex flex-wrap gap-8 justify-start px-8">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              onClick={handleNavigate}
              className={`cursor-pointer w-24 h-24 rounded-full border-4 flex items-center justify-center shadow-md transition ${statusStyles[lesson.status]}`}
            >
              <span className="text-center font-semibold text-white text-sm">
                {lesson.title}
              </span>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}

export default LessonPage;
