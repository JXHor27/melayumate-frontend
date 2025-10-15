import React, { useState, useMemo } from 'react';
import { ALL_TEMPLATES, INITIAL_USER_STATE, INITIAL_OWNED_CHARACTERS } from '../../data/mockCharacterSystem';
import CharacterCard from '../../components/game/CharacterCard';

// The formula for calculating stats based on user level
const calculateStats = (baseStats, level) => {
  return {
    hp: baseStats.hp + Math.floor(level * 2.5),
    atk: baseStats.atk + Math.floor(level * 1.2),
    def: baseStats.def + Math.floor(level * 1.2),
    spd: baseStats.spd + Math.floor(level * 0.8),
  };
};

const GameShopPage = () => {
  const [user, setUser] = useState(INITIAL_USER_STATE);
  const [ownedCharacters, setOwnedCharacters] = useState(INITIAL_OWNED_CHARACTERS);

  const handleSelectStarter = (templateId) => {
    const newInstanceId = Date.now();
    setOwnedCharacters([{ instanceId: newInstanceId, templateId: templateId }]);
    setUser(prev => ({ ...prev, primaryCharacterInstanceId: newInstanceId }));
  };

  const handleUnlockPartner = (templateId) => {
    const newInstanceId = Date.now();
    setOwnedCharacters(prev => [...prev, { instanceId: newInstanceId, templateId: templateId }]);
  };
  
  const handleSetPrimary = (instanceId) => setUser(prev => ({ ...prev, primaryCharacterInstanceId: instanceId }));
  const simulateLevelUp = () => setUser(prev => ({...prev, level: prev.level + 1}));
  const getTemplateForInstance = (instance) => ALL_TEMPLATES.find(t => t.id === instance.templateId);

  // --- RENDER LOGIC: We determine which "view" to show ---

  let currentView;
  
  if (ownedCharacters.length === 0) {
    // VIEW 1: Choose Starter
    const starterTemplates = ALL_TEMPLATES.filter(t => t.unlockLevel === 0);
    currentView = (
      <div>
        <h1 className="text-4xl font-bold text-center text-yellow-300 mb-2">Choose Your First Partner</h1>
        <p className="text-center text-gray-400 mb-8">This will be your first companion on your learning journey.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {starterTemplates.map(template => (
            <CharacterCard key={template.id} template={template} status="SELECTABLE" onClick={handleSelectStarter} />
          ))}
        </div>
      </div>
    );
  } else if (ownedCharacters.length === 1 && user.level >= 5) {
    // VIEW 2: Choose Second Partner
    const tier1Templates = ALL_TEMPLATES.filter(t => t.unlockLevel === 5);
    currentView = (
      <div>
        <h1 className="text-4xl font-bold text-center text-purple-400 mb-2">Choose Your Second Partner</h1>
        <p className="text-center text-gray-400 mb-8">This choice is permanent. Choose the companion who will complete your team!</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {tier1Templates.map(template => (
            <CharacterCard key={template.id} template={template} status="UNLOCKABLE" onClick={handleUnlockPartner} />
          ))}
        </div>
      </div>
    );
  } else {
    // VIEW 3: Final Collection View
    currentView = (
      <div>
        <h2 className="text-3xl font-bold text-yellow-300 mb-6">Your Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {ownedCharacters.map(instance => {
            const template = getTemplateForInstance(instance);
            const status = user.primaryCharacterInstanceId === instance.instanceId ? 'PRIMARY' : 'OWNED';
            const stats = calculateStats(template.baseStats, user.level);
            return (
              <CharacterCard 
                key={instance.instanceId} 
                template={{...template, instanceId: instance.instanceId}} 
                status={status}
                level={user.level}
                stats={stats}
                onClick={handleSetPrimary} 
              />
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
       <div className="ml-64 flex-1 w-220 bg-zinc-800 min-h-screen py-8">
          {/* Game Shop Banner */}
          <div className="flex items-center bg-zinc-700 text-white rounded-md p-4 mb-8 shadow">
              <p className="ml-4 text-lg">Game Shop</p>
              <p className='ml-auto'>MelayuMate <span className='text-zinc-400'>{'>'} Shop</span></p>
          </div> 
            
      <div className="text-center mb-10 p-4 bg-gray-800 rounded-lg max-w-md mx-auto">
        <p className="text-2xl font-bold">User Level: {user.level}</p>
        <button onClick={simulateLevelUp} className="mt-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
          Simulate +1 Level
        </button>
      </div>

      {currentView}
    </div>
    </div>
  );
};

export default GameShopPage;
