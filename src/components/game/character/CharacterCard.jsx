import React from 'react';
import { StarIcon, CheckCircleIcon, HeartIcon, ShieldCheckIcon, BoltIcon, FireIcon } from '@heroicons/react/24/solid';

const StatDisplay = ({ stats, level }) => (
  <div className="mt-4 border-t border-black/60 dark:border-white/30 pt-4 text-sm text-gray-800 dark:text-gray-300">
    <div className="flex justify-between items-center mb-2">
      <h4 className="font-bold text-base text-gray-900 dark:text-gray-100">Level {level} Stats</h4>
    </div>
    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
      <div className="flex items-center"><HeartIcon className="h-4 w-4 mr-2 text-red-600 dark:text-red-400" /> HP: <span className="font-bold ml-auto">{stats.hp}</span></div>
      <div className="flex items-center"><FireIcon className="h-4 w-4 mr-2 text-orange-600 dark:text-orange-400" /> ATK: <span className="font-bold ml-auto">{stats.atk}</span></div>
      <div className="flex items-center"><ShieldCheckIcon className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" /> DEF: <span className="font-bold ml-auto">{stats.def}</span></div>
      <div className="flex items-center"><BoltIcon className="h-4 w-4 mr-2 text-yellow-600 dark:text-yellow-300" /> SPD: <span className="font-bold ml-auto">{stats.spd}</span></div>
    </div>
  </div>
);

function CharacterCard({ template, status, level, stats, onClick }) {
  let cardStyles = 'bg-slate-800/50 border-slate-700';
  let buttonText = '';
  let buttonClass = '';
  let isClickable = false;

  switch (status) {
    case 'PRIMARY':
      cardStyles = 'bg-yellow-500/25 dark:bg-yellow-500/10 border-yellow-400 scale-105 shadow-2xl shadow-yellow-500/20';
      break;
    case 'OWNED':
      cardStyles = 'bg-blue-500/25 dark:bg-blue-500/10 border-blue-400';
      break;
    case 'SELECTABLE':
      isClickable = true;
      buttonText = 'Choose Partner';
      buttonClass = 'bg-green-600 hover:bg-green-500 cursor-pointer';
      cardStyles = 'border-green-500 hover:border-green-400 hover:bg-green-500/10';
      break;
    case 'UNLOCKABLE':
      isClickable = true;
      buttonText = `Unlock (Lv. ${template.unlockLevel})`;
      buttonClass = 'bg-purple-600 hover:bg-purple-500 cursor-pointer';
      cardStyles = 'border-purple-500 hover:border-purple-400 hover:bg-purple-500/10';
      break;
    case 'LOCKED':
      cardStyles = 'bg-black/20 border-slate-800 opacity-60';
      buttonText = `Locked (Lv. ${template.unlockLevel})`;
      buttonClass = 'bg-gray-700 cursor-not-allowed';
      break;
    case 'AVAILABLE':
      cardStyles = 'bg-black/20 border-slate-700 opacity-80';
      buttonText = `Available at Lv. ${template.unlockLevel}`; // Or just 'Available'
      buttonClass = 'bg-gray-600 cursor-default';
      break;
    default:
      break;
  }

  return (
    <div
      onClick={() => isClickable && onClick && onClick()}
      className={`relative rounded-2xl p-4 border-2 text-white text-center
                 transition-all duration-300 transform hover:-translate-y-2
                 ${cardStyles} ${isClickable ? 'cursor-pointer' : ''}`}
    >
      {/* Badges */}
      {status === 'PRIMARY' && (
        <div className="absolute -top-3 -right-1 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg">
          <StarIcon className="h-4 w-4 mr-1" /> Primary
        </div>
      )}
      {status === 'OWNED' && (
        <div className="absolute top-1 right-1 bg-blue-500/50 text-white px-2 py-0.5 rounded-full text-xs font-semibold flex items-center backdrop-blur-sm">
          <CheckCircleIcon className="h-4 w-4 mr-1" /> Owned
        </div>
      )}

      {/* Main Content */}
      <img src={template.imageUrl} alt={template.characterName} className="w-full h-40 object-contain mb-4 drop-shadow-lg" />
      <h3 className="text-gray-900 dark:text-white text-2xl font-bold">{template.characterName}</h3>
      <p className="font-semibold text-purple-600 dark:text-purple-300">{template.characterType} Type</p>

      {stats && <StatDisplay stats={stats} level={level} />}

      {/* Buttons */}
      <div className="mt-4">
        {buttonText && (
          <button
            disabled={!isClickable}
            className={`w-full py-2.5 rounded-lg font-bold text-white transition-colors ${buttonClass}`}
          >
            {buttonText}
          </button>
        )}
        {status === 'OWNED' && (
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent card's onClick from firing
              onClick && onClick();
            }}
            className="w-full py-2.5 rounded-lg font-bold text-white bg-slate-600 hover:bg-slate-500 transition-colors cursor-pointer"
          >
            Set as Primary
          </button>
        )}
      </div>
    </div>
  );
}

export default CharacterCard;