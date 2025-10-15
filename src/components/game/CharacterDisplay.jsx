import React from 'react';
import HealthBar from './HealthBar';

const CharacterDisplay = ({ character, hp, isPlayer, isTakingDamage }) => {
  const positionClass = isPlayer
    ? 'bottom-10 left-10'
    : 'top-10 right-10';
  const infoBoxClass = isPlayer
    ? 'items-start'
    : 'items-end';
  
  const shakeClass = isTakingDamage ? 'custom-animate-shake' : '';

  return (
    <div className={`absolute ${positionClass} w-64 transition-transform duration-300 ${shakeClass}`}>
      <img
        src={character.imageUrl}
        alt={character.name}
        className="w-40 h-40 mx-auto"
      />
      <div className={`bg-gray-800 bg-opacity-80 p-3 rounded-lg shadow-lg flex flex-col ${infoBoxClass}`}>
        <div className="flex justify-between w-full items-baseline">
          <h2 className="text-xl font-bold text-white">{character.name}</h2>
          <span className="text-lg font-mono text-yellow-400">Lv{character.level}</span>
        </div>
        <div className="w-full mt-2">
          <HealthBar current={hp} max={character.maxHp} />
        </div>
      </div>
    </div>
  );
};

export default CharacterDisplay;