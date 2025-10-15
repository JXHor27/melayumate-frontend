import React, { useState, useEffect, useCallback } from 'react';
import { battleData as initialData } from '../../data/mockBattleData';
import CharacterDisplay from './CharacterDisplay';
import AttackAnimation from './AttackAnimation';

const BattleScene = () => {
  const [battleData] = useState(initialData);
  const [turnIndex, setTurnIndex] = useState(-1); // Start at -1 to have a "Battle Start" message
  const [playerHp, setPlayerHp] = useState(battleData.player.maxHp);
  const [opponentHp, setOpponentHp] = useState(battleData.opponent.maxHp);
  const [message, setMessage] = useState('');
  const [isBattleOver, setIsBattleOver] = useState(false);
  
  const [takingDamage, setTakingDamage] = useState(null); // 'player' or 'opponent'
  const [animation, setAnimation] = useState({ type: null, targetPosition: {} });

  // Use useCallback to prevent the function from being recreated on every render
  const runTurn = useCallback(async () => {
    if (turnIndex >= battleData.log.length) {
      const winner = battleData.winnerId === battleData.player.id ? battleData.player.name : battleData.opponent.name;
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
    const attacker = currentTurn.attackerId === battleData.player.id ? battleData.player : battleData.opponent;
    const isPlayerAttacking = attacker.id === battleData.player.id;

    // --- RESTRUCTURED TURN SEQUENCE ---

    // 1. Announce the attack
    setMessage(currentTurn.message);
    await new Promise(res => setTimeout(res, 1200));

    // 2. Play the visual impact (hit effect AND shake start)
    setAnimation({ 
      type: attacker.type, 
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
    setMessage('');
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
    <div className="w-full h-screen bg-gray-900 bg-[url('https://i.imgur.com/gthA5K2.jpg')] bg-cover bg-center overflow-hidden relative font-sans">
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

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

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-11/12 max-w-3xl">
        <div className="bg-gray-800 bg-opacity-90 border-4 border-gray-600 rounded-lg text-white text-2xl p-4 h-28 flex items-center justify-center shadow-2xl">
          <p className="text-center">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default BattleScene;