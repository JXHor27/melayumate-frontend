import React, { useState } from 'react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Banner from '../../components/common/Banner';
import SlidingSidebar from '../../components/common/SlidingSidebar';
import CharacterCard from '../../components/game/character/CharacterCard';
import useUnlockableCharactersDetail from '../../hooks/game/useUnlockableCharactersDetail';
import useCharactersManipulation from '../../hooks/game/useCharactersManipulation';
import useCharactersDetail from '../../hooks/game/useCharactersDetail';
import useGameStats from '../../hooks/dashboard/useGameStats';

function CharacterPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const { currentLevel, currentExp } = useGameStats();
  const { ownedCharacters, setOwnedCharacters } = useCharactersDetail();
  const { acquireCharacter, setPrimaryCharacter, fetchOwnedCharacters } = useCharactersManipulation({ setOwnedCharacters });
  const { charactersTemplate } = useUnlockableCharactersDetail({ currentLevel });

  function handleSidebarToggle(){
    setSidebarOpen(!sidebarOpen);
  }

  async function handleSelectStarter(templateId) {
    const result = await acquireCharacter(templateId);
    if (!result) {
      return;
    }
    await fetchOwnedCharacters();
  };

  async function handleUnlockPartner(templateId) {
    const result = await acquireCharacter(templateId);
    if (!result) {
      return;
    }
    await fetchOwnedCharacters();
  };
  
  async function handleSetPrimary(instanceId){
    const result = await setPrimaryCharacter(instanceId);
    if (!result) {
      return;
    }
    await fetchOwnedCharacters();
  }
  
  // --- RENDER LOGIC: We determine which "view" to show ---

  // --- RENDER LOGIC ---
  if (!ownedCharacters || !charactersTemplate) {
    return <LoadingSpinner />;
  }

  const isChoosingStarter = ownedCharacters.length === 0;
  // A new state to separate the "Choose Second Partner" view from the final collection
  const isChoosingSecond = ownedCharacters.length === 2;

  // Determine the status for each template in the full collection view
  function getTemplateStatus(template) {
    if (ownedCharacters.some(owned => owned.templateId === template.templateId)) {
      return 'OWNED_IN_COLLECTION'; // A special status to prevent clicking
    }

    if (template.unlockLevel === 0) {
      // ...and the user is NOT in the "Choose Starter" phase (meaning they've already picked one)...
      if (!isChoosingStarter) {
      // ...then this character is simply "Available" to be unlocked later.
        return 'AVAILABLE';
      }
    }

    if (template.unlockLevel === 1) {
      // ...and the user is NOT in the "Choose Starter" phase (meaning they've already picked one)...
      if (isChoosingSecond) {
      // ...then this character is simply "Available" to be unlocked later.
        return 'AVAILABLE';
      }
    }
    return currentLevel >= template.unlockLevel ? 'UNLOCKABLE' : 'LOCKED';
  };

  return (
    <div className="flex">
      <SlidingSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setSidebarOpen(false)} />}
        
      {/* Main Content with new background */}
      <div className="ml-0 sm:ml-64 flex-1 bg-slate-100 dark:bg-zinc-800 text-white min-h-screen py-8">
        <Banner header="My Characters" title="Character Roster" onOpen={sidebarOpen} handleSidebarToggle={handleSidebarToggle} />

        <div className="p-4 sm:p-8">
          
          {/* VIEW 1: Choose Starter */}
          {isChoosingStarter && (
            <div className="text-center p-8 bg-slate-300/70 dark:bg-slate-900/50 rounded-2xl">
              <h1 className="text-4xl font-semibold dark:font-bold text-gray-900 dark:text-white mb-2">Choose Your First Partner</h1>
              <p className="text-gray-900 dark:text-gray-400 mb-8 max-w-2xl mx-auto">This will be your first companion on your learning journey. Choose wisely! It is a one-way choice.</p>
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {charactersTemplate.filter(t => t.unlockLevel === 0).map(template => (
                  <CharacterCard 
                    key={template.templateId} 
                    template={template} 
                    status="SELECTABLE" 
                    onClick={() => handleSelectStarter(template.templateId)} 
                  />
                ))}
              </div>
            </div>
          )}

          {/* This section renders for ALL views where the user has at least one character */}
          {!isChoosingStarter && (
            <div className="space-y-12">
              {/* "Your Team" Section */}
              <div>
                <h2 className="text-3xl font-semibold dark:font-bold text-gray-900 dark:text-white mb-6 text-left">Your Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {ownedCharacters.map(instance => {
                    const status = instance.primary ? 'PRIMARY' : 'OWNED';
                    return (
                      <CharacterCard 
                        key={instance.characterId} 
                        template={instance} // The instance data from backend
                        status={status}
                        level={currentLevel}
                        stats={instance.stats}
                        onClick={() => handleSetPrimary(instance.characterId)} 
                      />
                    );
                  })}
                </div>
              </div>
              
              {/* "Unlock New Partners" Section */}
              <div>
                <h2 className="text-3xl font-semibold dark:font-bold text-black dark:text-white mb-1 text-center">
                  {isChoosingSecond ? 'Choose Your Second Partner!' : 'Partners Pool'}
                </h2>
                <h1 className="text-base font-normal dark:font-normal text-black dark:text-white mb-6 text-center">
                  {isChoosingSecond ? 'Choose wisely! It is a one-way choice.' : 'They are waiting their owners!'}
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {charactersTemplate.map(template => (
                    <CharacterCard 
                      key={template.templateId} 
                      template={template}
                      status={getTemplateStatus(template)}
                      onClick={() => handleUnlockPartner(template.templateId)} 
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterPage;
