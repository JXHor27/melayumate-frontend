import React, { useEffect } from 'react';
import {  FaShoppingCart, FaPlane, FaUtensils, FaHospital, FaBook, 
    FaComments, FaBus, FaHome, FaTshirt, FaMusic, FaFutbol, FaSwimmer  } from 'react-icons/fa';
// --- DEFINE YOUR KEYWORD-BASED STYLES ---
const STYLES_BY_KEYWORD = [
  { 
    keywords: ['market', 'shop', 'buy', 'store', 'shopping', 'mall'], 
    icon: <FaShoppingCart size={28}/>, 
    gradient: 'from-amber-500 to-yellow-500' 
  },
  { 
    keywords: ['airport', 'plane', 'travel', 'flight', 'holiday'], 
    icon: <FaPlane size={28}/>, 
    gradient: 'from-sky-500 to-blue-500' 
  },
  { 
    keywords: ['restaurant', 'eat', 'food', 'cafe', 'dinner', 'lunch', 'drink', 'breakfast', 'stall'], 
    icon: <FaUtensils size={28}/>, 
    gradient: 'from-red-500 to-pink-500' 
  },
  { 
    keywords: ['hospital', 'doctor', 'clinic', 'sick', 'health', 'medicine', 'healthy'], 
    icon: <FaHospital size={28}/>, 
    gradient: 'from-teal-500 to-cyan-500' 
  },
  { 
    keywords: ['library', 'book', 'read', 'study', 'class', 'classroom', 'university', 'school', 'learn', 'baca', 'lecture'], 
    icon: <FaBook size={28}/>, 
    gradient: 'from-blue-600 to-indigo-600'
  },
  {
    keywords: ['family', 'friends', 'people', 'meeting', 'social', 'party', 'home', 'house', 'keluarga'],
    icon: <FaHome size={28}/>,
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    keywords: ['clothing', 'shirt', 'dress', 'fashion', 'wear', 'baju'],
    icon: <FaTshirt size={28}/>,
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    keywords: ['movie', 'cinema', 'watch', 'hobby', 'music', 'song', 'listen', 'film', 'lagu', 'play'],
    icon: <FaMusic size={28}/>,
    gradient: 'from-purple-500 to-violet-500'
  },
  {
    keywords: ['transport', 'bus', 'grab', 'taxi', 'train', 'lrt', 'mrt' ,'station'],
    icon: <FaBus size={28}/>,
    gradient: 'from-orange-500 to-red-500'
  }, 
  {
    keywords: ['sport', 'fitness', 'exercise', 'game', 'play', 'gym', 'run', 'sukan'],
    icon: <FaFutbol size={28}/>, 
    gradient: 'from-lime-500 to-green-500'
  },
  {
    keywords: ['swimming', 'swim', 'water', 'pool', 'beach', 'berenang'],
    icon: <FaSwimmer size={28}/>,
    gradient: 'from-cyan-500 to-blue-500'
  }
];

// A fallback style for when no keywords match
const DEFAULT_STYLE = { 
  icon: <FaComments size={28}/>, 
  gradient: 'from-gray-500 to-gray-600' 
};

const getDynamicCardStyle = (scenario) => {

  if (!scenario || !scenario.title) {
    return DEFAULT_STYLE;
  }
  // case-insensitive matching
  const title = scenario.title.toLowerCase(); 

  const foundStyle = STYLES_BY_KEYWORD.find(style => 
    style.keywords.some(keyword => title.includes(keyword))
  );

  return foundStyle || DEFAULT_STYLE; 
};

function ScenarioCard({ scenario, onSelect }) {

  const { icon, gradient } = getDynamicCardStyle(scenario);

  return (
    <div
      onClick={onSelect}
      className="relative p-6 rounded-2xl bg-slate-300 dark:bg-zinc-700 shadow-lg cursor-pointer
                 group transform transition-transform duration-300 hover:-translate-y-2"
    >
      {/* Icon with gradient background */}
      <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-white
                      bg-gradient-to-br ${gradient} shadow-lg mb-4
                      transition-transform duration-300 group-hover:scale-110`}>
        {icon}
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold text-black dark:text-white mb-2 break-words">{scenario.title}</h2>
      
      {/* Description */}
      <p className="text-gray-800 dark:text-gray-300 text-sm h-12 mb-4 break-words">{scenario.description}</p>

      {/* Footer with stats */}
      <div className="border-t border-gray-300 dark:border-zinc-700 pt-4 flex items-center justify-start gap-2 text-gray-500 dark:text-gray-300">
        <FaComments />
        <span className="text-sm font-semibold">{scenario.dialogueNumber || 0} Dialogues</span>
      </div>
    </div>
  );
};

export default ScenarioCard;