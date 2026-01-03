import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CharacterDisplay from '../../components/game/battle/CharacterDisplay';
import AttackAnimation from '../../components/game/battle/AttackAnimation';
import useBattleSimulation from '../../hooks/game/useBattleSimulation';

function BattleScenePage() {
  const navigate = useNavigate();
  const { battleId } = useParams();
  const { fetchBattleLog } = useBattleSimulation();
  const [ battleData, setBattleData ] = useState({
    player: {
      characterId: '',
      characterName: '',
      characterType: '',
      imageUrl: null, 
      level: 0,
      stats: {
        hp: 0,
        atk: 0,
        def: 0,
        spd: 0,
      },
      templateId: ''
    },
    opponent: {
      characterId: '',
      characterName: '',
      characterType: '',
      imageUrl: null, 
      level: 0,
      stats: {
        hp: 0,
        atk: 0,
        def: 0,
        spd: 0,
      },
      templateId: ''
    },
    winnerId: '',
    log: [
    ],
  })
  
  useEffect(() => {
    fetchBattleLog(battleId)
      .then(data => {
        console.log("Battle data received:", data);
          setBattleData(data);
          setPlayerHp(data.player.stats.hp);
          setOpponentHp(data.opponent.stats.hp);
      })
      .catch(error => console.error("Failed to fetch battle results:", error));
  }, []); 


  const [turnIndex, setTurnIndex] = useState(-1); // Start at -1 to have a "Battle Start" message
  const [playerHp, setPlayerHp] = useState(battleData.player.stats.hp);
  const [opponentHp, setOpponentHp] = useState(battleData.opponent.stats.hp);
  const [message, setMessage] = useState('');
  const [isBattleOver, setIsBattleOver] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false); // New state to track if we've skipped
  const [takingDamage, setTakingDamage] = useState(null); // 'player' or 'opponent'
  const [animation, setAnimation] = useState({ type: null, targetPosition: {} });

  async function handleSkipToEnd() {
    if (isBattleOver) {
      // If the battle is already over, the button acts as a true exit button
      navigate(-1); // Go back to the previous page
      return;
    }
    
    // Find the loser and their final HP
    const loserId = battleData.winnerId === battleData.player.characterId ? battleData.opponent.characterId : battleData.player.characterId;
    if (loserId === battleData.player.characterId) {
      setPlayerHp(0);
      setOpponentHp(battleData.opponent.stats.hp - battleData.log.filter(t => t.attackerId === battleData.player.characterId).reduce((sum, turn) => sum + turn.damage, 0));
    } else {
      setOpponentHp(0);
      setPlayerHp(battleData.player.stats.hp - battleData.log.filter(t => t.attackerId === battleData.opponent.characterId).reduce((sum, turn) => sum + turn.damage, 0));

    }

    setIsSkipped(true); 
    // Force the battle to the end state
    setTurnIndex(battleData.log.length);  
    //setIsBattleOver(true);
    // const winner = battleData.winnerId === battleData.player.characterId ? battleData.player.characterName : battleData.opponent.characterName;
    // setMessage(`${winner} is victorious!`);
  };

  // Use useCallback to prevent the function from being recreated on every render
  const runTurn = useCallback(async () => {
    if (turnIndex >= battleData.log.length) {
      const winner = battleData.winnerId === battleData.player.characterId ? battleData.player.characterName : battleData.opponent.characterName;
      setMessage(`${winner} is victorious!`);
      setIsBattleOver(true);
      return;
    }

    if (turnIndex === -1) {
      setMessage('The battle begins!');
      await new Promise(res => setTimeout(res, 1500));
      setTurnIndex(0);
      return;
    }

    const currentTurn = battleData.log[turnIndex];
    const attacker = currentTurn.attackerId === battleData.player.characterId ? battleData.player : battleData.opponent;
    const isPlayerAttacking = attacker.characterId === battleData.player.characterId;

    // --- RESTRUCTURED TURN SEQUENCE ---

    // 1. Announce the attack
    setMessage(currentTurn.message);
    await new Promise(res => setTimeout(res, 1200));

    // 2. Play the visual impact (hit effect AND shake start)
    setAnimation({ 
      type: currentTurn.animationType, 
      targetPosition: isPlayerAttacking ? { top: '25%', right: '25%' } : { bottom: '25%', left: '25%' } 
    });
    setTakingDamage(isPlayerAttacking ? 'opponent' : 'player');
    
    // 3. After a very brief delay, apply the damage so the HP bar moves while shaking
    await new Promise(res => setTimeout(res, 100));
    if (isPlayerAttacking) {
      setOpponentHp(prev => Math.max(0, prev - currentTurn.damage));
    } else {
      setPlayerHp(prev => Math.max(0, prev - currentTurn.damage));
    }

    // 4. Wait for the shake and HP bar animations to complete
    await new Promise(res => setTimeout(res, 1000));

    // 5. Clean up the effects for the next turn
    setAnimation({ type: null });
    setTakingDamage(null);
    //setMessage('');
    await new Promise(res => setTimeout(res, 500));

    // 6. Advance to the next turn
    setTurnIndex(prev => prev + 1);

  }, [turnIndex, battleData]);

  // The main effect hook that triggers the turn sequence
  useEffect(() => {
    if (!isBattleOver) {
      runTurn();
    }
  }, [runTurn, isBattleOver]);

  return (
    <div className="bg-[#f9fafb] bg-[radial-gradient(ellipse_80%_50%_at_50%_95%,rgba(99,102,241,0.70),transparent)] dark:bg-[#111827] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_95%,rgba(79,70,229,0.2),transparent)] w-full h-screen overflow-hidden relative font-sans">
      {/* <div className="absolute inset-0 bg-black bg-opacity-20">
        
      </div> */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 w-11/12 max-w-3xl">
        <div className="bg-gray-300 dark:bg-gray-800 bg-opacity-90 border-4 border-gray-200 dark:border-gray-600 rounded-lg text-black dark:text-white text-lg p-1 sm:p-4 h-20 flex items-center justify-center shadow-2xl">
          <p className="text-center">{message}</p>
        </div>
      </div>

      <CharacterDisplay 
        character={battleData.opponent} 
        hp={opponentHp} 
        isPlayer={false}
        isTakingDamage={takingDamage === 'opponent'}
      />
      <CharacterDisplay 
        character={battleData.player} 
        hp={playerHp} 
        isPlayer={true}
        isTakingDamage={takingDamage === 'player'}
      />
      
      <AttackAnimation type={animation.type} targetPosition={animation.targetPosition} />


      {/* Skip & Finish Button */}
      <div className="absolute bottom-2 right-3 z-20 cursor-pointer">
        <button 
          onClick={handleSkipToEnd}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-8 rounded-lg transition-colors text-base"
        >
          {isBattleOver || isSkipped ? 'Finish' : 'Skip'}
        </button>
      </div>

    </div>
  );
};

export default BattleScenePage;