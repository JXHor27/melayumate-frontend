import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from '../../components/common/Banner';
import SlidingSidebar from '../../components/common/SlidingSidebar';
import MyStatusCard from '../../components/game/character/MyStatusCard';
import ChallengerCard from '../../components/game/character/ChallengerCard';
import { useAuth } from '../../context/AuthContext';
import usePrimaryCharacterDetail from '../../hooks/game/usePrimaryCharacterDetail';
import useBattleListing from '../../hooks/game/useBattleListing';
import useListedChallengersDetail from '../../hooks/game/useListedChallengersDetail';
import useBattleSimulation from '../../hooks/game/useBattleSimulation';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import SnackbarAlert from '../../components/common/SnackbarAlert';

const BattleLobbyPage = () => {
  const { username } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [characterEmptyError, setCharacterEmptyError] = useState(false);
  const navigate = useNavigate();
  
  const { primaryCharacter, setPrimaryCharacter } = usePrimaryCharacterDetail();
  const { listedChallengers, setListedChallengers } = useListedChallengersDetail()
  const { listCharacter, unlistCharacter, fetchPrimaryCharacter } = useBattleListing({ setPrimaryCharacter });
  const { startBattle } = useBattleSimulation();


  function handleSidebarToggle(){
    setSidebarOpen(!sidebarOpen);
  }

  async function handleListCharacter() {
    //console.log("ACTION: Listing character for battle...");
    const result = await listCharacter(primaryCharacter.characterId);
    if (!result) {
      return;
    }
    await fetchPrimaryCharacter();
  };

  async function handleUnlistCharacter() {
    //console.log("ACTION: Unlisting character...");
    const result = await unlistCharacter(primaryCharacter.characterId);
    if (!result) {
      return;
    }
    await fetchPrimaryCharacter();
  };

  async function handleChallenge(defenderInstanceId, defenderUserId) {
    if (primaryCharacter.characterId === null) {
      setCharacterEmptyError(true);
      return;
    }
    const result = await startBattle(username, primaryCharacter.characterId, defenderInstanceId, defenderUserId);
    if (!result) {
      return;
    }
    //console.log("ACTION: Starting battle with ID", result.battleId);
    navigate(`/battle/challenge/${result.battleId}`);
  };


 if(!listedChallengers){
  return <LoadingSpinner />;
 }
  
  return (
    <div className="flex">
      {/* Mobile Sidebar Component */}
      <SlidingSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setSidebarOpen(false)}
          style={{ pointerEvents: "auto" }}
        />
      )}

      {/* Main Content */}
      <div className="ml-0 sm:ml-64 flex-1 bg-slate-100 dark:bg-zinc-800 text-white min-h-screen py-8">
        {/* Battle Lobby Banner */}
        <Banner header="Battle Lobby" title="Battle" onOpen={sidebarOpen} handleSidebarToggle={handleSidebarToggle} />
          
          {primaryCharacter.characterId !== null ? 
          (<div className="max-w-4xl mb-12">
          <h2 className="text-2xl font-semibold dark:font-bold text-gray-900 dark:text-white mb-4 ml-4 sm:ml-4">My Status</h2>
            <MyStatusCard 
              character={primaryCharacter} 
              onList={handleListCharacter} 
              onUnlist={handleUnlistCharacter} 
            />
          </div>) : (   
            <div className="p-12 bg-white dark:bg-slate-800/50 rounded-lg text-center text-gray-500 dark:text-gray-500 border-2 border-dashed border-gray-300 dark:border-slate-700">
              <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">No Primary Character</h3>
              <p>You have no character. Please choose one first.</p>
            </div>
            )}


      

        <div className="max-w-6xl">
          <h2 className="text-2xl font-semibold dark:font-bold text-gray-900 dark:text-white mb-4 ml-4 sm:ml-4">Available Challengers</h2>
          { listedChallengers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listedChallengers.map(challenger => (
                <ChallengerCard 
                  key={challenger.characterId} 
                  challenger={challenger} 
                  onChallenge={handleChallenge} 
                />
              ))}
            </div>
          ) : (
            <>
            <div className="p-12 bg-white dark:bg-slate-800/50 rounded-lg text-center text-gray-500 dark:text-gray-500 border-2 border-dashed border-gray-300 dark:border-slate-700">
                  <h3 className="text-2xl font-bold mb-2 text-slate-800 dark:text-white">The Arena is Quiet...</h3>
                  <p>No challengers are listed for battle. List your character to be the first!</p>
            </div>
            </>
          )}
        </div>

        {/* No Character Alert */}
        <SnackbarAlert
          open={characterEmptyError}
          onClose={() => setCharacterEmptyError(false)}
          severity="error"
          message="Please select a character first."
        />
      </div>
    </div>
  );

   
};

export default BattleLobbyPage;