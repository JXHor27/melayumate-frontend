import React from 'react';
import HealthBar from './HealthBar';

const CharacterDisplay = ({ character, hp, isPlayer, isTakingDamage }) => {
  const positionClass = isPlayer
    ? 'bottom-12 left-2 sm:bottom-10 sm:left-10'
    : 'top-30 right-2 sm:top-25 sm:right-10';
  const infoBoxClass = isPlayer
    ? 'items-start'
    : 'items-end';
  
  const shakeClass = isTakingDamage ? 'custom-animate-shake' : '';

  return (
    <div className={`absolute ${positionClass} w-64 transition-transform duration-300 ${shakeClass}`}>
      <img
        src={character.imageUrl}
        alt={character.characterName}
        className="w-32 h-32 sm:w-40 sm:h-40 mx-auto"
      />
      <div className={`bg-slate-100 border-1 border-slate-900 dark:bg-gray-800 bg-opacity-80 p-3 rounded-lg shadow-lg flex flex-col ${infoBoxClass}`}>
        <div className="flex justify-between w-full items-baseline">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{character.characterName}</h2>
          <span className="text-lg font-mono text-amber-600 dark:text-yellow-400">Lv{character.level}</span>
        </div>
        <div className="w-full mt-2">
          <HealthBar current={hp} max={character.stats.hp} />
        </div>
      </div>
    </div>
  );
};

export default CharacterDisplay;