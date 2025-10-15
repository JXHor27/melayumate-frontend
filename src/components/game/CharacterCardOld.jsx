import React from 'react';
import { LockClosedIcon } from '@heroicons/react/24/solid'; // npm install @heroicons/react

const CharacterCardOld = ({ character, isUnlocked, isSelected, onSelect }) => {
  const cardClasses = `
    relative rounded-lg p-4 border-2 transition-all duration-300
    ${isSelected ? 'border-yellow-400 scale-105' : 'border-gray-700'}
    ${isUnlocked ? 'cursor-pointer hover:border-yellow-300' : 'cursor-not-allowed'}
  `;

  const imageClasses = `
    w-full h-40 object-contain transition-all duration-300
    ${!isUnlocked ? 'filter grayscale opacity-30' : ''}
  `;

  const glowClasses = `
    absolute inset-0 rounded-lg blur-xl opacity-75
    ${character.glowColor}
    ${isSelected ? 'animate-pulse' : 'opacity-0'}
    transition-opacity duration-500
  `;

  return (
    <div className={cardClasses} onClick={() => isUnlocked && onSelect(character.id)}>
      <div className="relative">
        <div className={glowClasses}></div>
        <img src={character.imageUrl} alt={character.name} className={imageClasses} />
        
        {!isUnlocked && (
          <div className="absolute inset-0 bg-black bg-opacity-60 rounded-md flex flex-col items-center justify-center text-white">
            <LockClosedIcon className="h-10 w-10 mb-2" />
            <span className="font-bold">Unlocks at Level {character.unlockLevel}</span>
          </div>
        )}
      </div>
      <div className="text-center mt-3">
        <p className={`font-bold text-lg ${!isUnlocked ? 'text-gray-500' : 'text-white'}`}>
          {character.name}
        </p>
        <p className={`text-sm ${!isUnlocked ? 'text-gray-600' : 'text-gray-400'}`}>
          {character.type} Type
        </p>
      </div>
    </div>
  );
};

export default CharacterCardOld;