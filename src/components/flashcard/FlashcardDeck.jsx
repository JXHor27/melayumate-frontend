import React from 'react';
import { FaBook, FaLayerGroup } from "react-icons/fa";

// Helper to pick a color theme based on the ID
const getDeckStyle = (listId) => {
  const styles = [
    { gradient: 'from-blue-400 to-sky-400 dark:from-blue-500 to-sky-500', shadow: 'shadow-blue-500/30' },
    { gradient: 'from-purple-400 to-indigo-400 dark:from-purple-500 to-indigo-500', shadow: 'shadow-purple-500/30' },
    { gradient: 'from-emerald-400 to-green-400 dark:from-emerald-500 to-green-500', shadow: 'shadow-emerald-500/30' },
    { gradient: 'from-rose-400 to-red-400 dark:from-rose-500 to-red-500', shadow: 'shadow-rose-500/30' },
  ];
  const index = listId.charCodeAt(listId.length - 1) % styles.length;
  return styles[index];
};

const FlashcardDeck = ({ list, onOpen }) => {
  const { gradient, shadow } = getDeckStyle(list.flashcardListId);

  return (
    <div
      className={`ml-6 my-6 bg-slate-300 dark:bg-gray-700 group relative w-57 h-72 rounded-xl p-6 flex flex-col justify-between
                 text-black dark:text-white overflow-hidden shadow-lg transform transition-all duration-300
                 hover:shadow-2xl hover:-translate-y-2 ${shadow}`}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} -z-10`}></div>
      
      {/* 3D "Spine" Effect */}
      <div className={`absolute top-0 left-0 h-full w-5 bg-black/20`}></div>
      
      {/* Top Section */}
      <div>
        <h2 className="text-2xl font-bold break-words">{list.title}</h2>
        <p className="text-gray-800 dark:text-gray-200 text-sm mt-1 break-words h-10">{list.description}</p>
      </div>

      {/* Bottom Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <FaLayerGroup />
          <span className="font-semibold">{list.flashcardNumber || 0} cards</span>
        </div>
        <button
          className="bg-white/90 text-black font-bold py-2 px-4 rounded-lg cursor-pointer
                     transform transition-transform duration-300 group-hover:scale-105"
          onClick={() => onOpen(list.flashcardListId)}
        >
          Open
        </button>
      </div>
    </div>
  );
};

export default FlashcardDeck;