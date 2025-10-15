import React from 'react';
import { StarIcon, CheckCircleIcon, HeartIcon, ShieldCheckIcon, BoltIcon, FireIcon } from '@heroicons/react/24/solid';

const StatDisplay = ({ stats, level }) => (
  <div className="mt-4 border-t border-gray-700 pt-3 text-sm text-gray-300">
    <div className="flex justify-between items-center mb-2">
      <h4 className="font-bold text-base text-white">Level {level} Stats</h4>
    </div>
    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
      <div className="flex items-center"><HeartIcon className="h-4 w-4 mr-2 text-red-500" /> HP: <span className="font-bold ml-1">{stats.hp}</span></div>
      <div className="flex items-center"><FireIcon className="h-4 w-4 mr-2 text-orange-500" /> ATK: <span className="font-bold ml-1">{stats.atk}</span></div>
      <div className="flex items-center"><ShieldCheckIcon className="h-4 w-4 mr-2 text-blue-500" /> DEF: <span className="font-bold ml-1">{stats.def}</span></div>
      <div className="flex items-center"><BoltIcon className="h-4 w-4 mr-2 text-yellow-400" /> SPD: <span className="font-bold ml-1">{stats.spd}</span></div>
    </div>
  </div>
);


const CharacterCard = ({ template, status, level, stats, onClick }) => {
  // ... (switch logic for borderColor, buttonText, etc. remains exactly the same)
  // ...
   let borderColor = 'border-gray-700';
  let isClickable = false;
  let buttonText = '';
  let buttonClass = 'bg-gray-600 cursor-default';

  switch (status) {
    case 'PRIMARY':
      borderColor = 'border-yellow-400 scale-105 shadow-lg shadow-yellow-500/30';
      break;
    case 'OWNED':
      borderColor = 'border-blue-500';
      break;
    case 'SELECTABLE':
      isClickable = true;
      buttonText = 'Choose';
      buttonClass = 'bg-green-600 hover:bg-green-500 cursor-pointer';
      borderColor = 'border-green-500 hover:border-green-400';
      break;
    case 'UNLOCKABLE':
      isClickable = true;
      buttonText = 'Unlock';
      buttonClass = 'bg-purple-600 hover:bg-purple-500 cursor-pointer';
      borderColor = 'border-purple-500 hover:border-purple-400';
      break;
    default:
      break;
  }

    const handleCardClick = () => {
    if (isClickable && onClick) {
      onClick(template.id);
    }
  };

  return (
     <div
      className={`relative bg-gray-800 rounded-lg p-4 border-2 transition-all duration-300 ${borderColor}`}
      onClick={status === 'OWNED' && onClick ? () => onClick(template.instanceId) : null}
    >
      {/* ... (Badges like "Primary" and "Owned" remain exactly the same) ... */}
       {status === 'PRIMARY' && (
        <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-bold flex items-center z-10">
          <StarIcon className="h-4 w-4 mr-1" />
          Primary
        </div>
      )}
      {status === 'OWNED' && (
        <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center z-10">
          <CheckCircleIcon className="h-4 w-4 mr-1" />
          Owned
        </div>
      )}

      <img src={template.imageUrl} alt={template.name} className="w-full h-32 object-contain mb-3" />
      <h3 className="text-center text-xl font-bold text-white">{template.name}</h3>
      <p className="text-center text-gray-400">{template.type} Type</p>

      {/* NEW: Conditionally render the StatDisplay for owned characters */}
      {stats && <StatDisplay stats={stats} level={level} />}

      {/* ... (Button rendering logic remains exactly the same) ... */}
        {/* Renders the action button if one is needed */}
      {buttonText && (
        <button
          onClick={handleCardClick}
          className={`w-full mt-4 py-2 rounded-lg font-bold text-white transition-colors ${buttonClass}`}
        >
          {buttonText}
        </button>
      )}
      
      {/* Renders a "Set as Primary" button for owned, non-primary characters */}
      {status === 'OWNED' && (
         <button
         onClick={() => onClick(template.instanceId)}
         className="w-full mt-4 py-2 rounded-lg font-bold text-white bg-gray-600 hover:bg-gray-500 cursor-pointer transition-colors"
       >
         Set as Primary
       </button>
      )}
    </div>
  );
};

export default CharacterCard;