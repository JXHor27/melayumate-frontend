import React from 'react';
import { useState } from 'react';
//import { useGame } from '../context/GameContext';
import { ALL_CHARACTERS } from '../../data/characters';
import CharacterCard from './CharacterCard';

const CharacterSelection = () => {
 // const { unlockedCharacters, selectedCharacterId, setSelectedCharacterId } = useGame();

 // const unlockedIds = new Set(unlockedCharacters.map(c => c.id));
 const [selectedCharacterId, setSelectedCharacterId] = useState('fire');
  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-white mb-8">
        Choose Your Character
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {ALL_CHARACTERS.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            isUnlocked={true}
            isSelected={selectedCharacterId === character.id}
            onSelect={setSelectedCharacterId}
          />
        ))}
      </div>
    </div>
  );
};

export default CharacterSelection;