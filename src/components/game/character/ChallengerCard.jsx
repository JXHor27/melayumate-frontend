import React from 'react';
import { UserIcon, HeartIcon, ShieldCheckIcon, BoltIcon, FireIcon } from '@heroicons/react/24/solid';

// The StatDisplay also needs to be theme-aware
const StatDisplay = ({ stats, level }) => (
  <div className="mt-4 border-t border-slate-200 dark:border-white/10 pt-3 text-sm text-slate-600 dark:text-gray-300">
    <div className="flex justify-between items-center mb-2">
      <h4 className="font-bold text-base text-slate-800 dark:text-white">Level {level} Stats</h4>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-1">
      {/* Icons now have dark: variant for text color */}
      <div className="flex items-center text-slate-900 dark:text-white"><HeartIcon className="h-4 w-4 mr-2 text-red-500" /> HP: <span className="font-bold ml-auto">{stats.hp}</span></div>
      <div className="flex items-center text-slate-900 dark:text-white"><FireIcon className="h-4 w-4 mr-2 text-orange-500" /> ATK: <span className="font-bold ml-auto">{stats.atk}</span></div>
      <div className="flex items-center text-slate-900 dark:text-white"><ShieldCheckIcon className="h-4 w-4 mr-2 text-blue-500" /> DEF: <span className="font-bold ml-auto">{stats.def}</span></div>
      <div className="flex items-center text-slate-900 dark:text-white"><BoltIcon className="h-4 w-4 mr-2 text-yellow-400" /> SPD: <span className="font-bold ml-auto">{stats.spd}</span></div>
    </div>
  </div>
);


function ChallengerCard({ challenger, onChallenge }) {
  const { characterName, userId, imageUrl, level, username, stats, characterId } = challenger;

  return (
    <div 
      className="
        mx-4 bg-slate-400/50 dark:bg-slate-800/50 
        border-2 border-slate-200 dark:border-slate-700 
        rounded-xl p-4 flex flex-col text-center
        group transform transition-all duration-300 
        hover:border-purple-500 hover:scale-105 hover:bg-slate-50 dark:hover:bg-slate-800
        shadow-lg dark:shadow-none
      "
    >
      {/* Trainer/User Info */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <UserIcon className="h-4 w-4 text-slate-700 dark:text-gray-400"/>
        <p className="font-semibold text-sm text-slate-800 dark:text-gray-300 truncate">{username}</p>
      </div>

      {/* Character Image */}
      <div className="flex-grow">
        <img 
          src={imageUrl} 
          alt={characterName} 
          className="w-full h-32 object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-110" 
        />
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-3">{characterName}</h3>
        <p className="text-purple-600 dark:text-yellow-400 font-mono font-bold">Level {level}</p>
      </div>
      
      {/* Stats (optional) */}
      {stats && <StatDisplay stats={stats} level={level} />}
      
      {/* Battle Button */}
      <div className="mt-4">
        <button 
          onClick={() => onChallenge(characterId, userId)}
          className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 rounded-lg
                     transition-all transform group-hover:shadow-lg group-hover:shadow-purple-500/30 cursor-pointer"
        >
          Battle!
        </button>
      </div>
    </div>
  );
};

export default ChallengerCard;