import fireBot from '../assets/images/fire-bot.png';
import steelBot from '../assets/images/steel-bot.png';

export const battleData = {
  player: {
    id: 'char1',
    name: 'PyroBot',
    type: 'Fire',
    level: 15,
    maxHp: 80,
    imageUrl: fireBot, // Fire Bot Image
  },
  opponent: {
    id: 'char2',
    name: 'FerroBot',
    type: 'Steel',
    level: 14,
    maxHp: 85,
    imageUrl: steelBot, // Steel Bot Image
  },
  winnerId: 'char1',
  log: [
    {
      turn: 1,
      attackerId: 'char1',
      defenderId: 'char2',
      damage: 12,
      message: "PyroBot attacks!",
    },
    {
      turn: 2,
      attackerId: 'char2',
      defenderId: 'char1',
      damage: 8,
      message: "FerroBot strikes back!",
    },
    {
      turn: 3,
      attackerId: 'char1',
      defenderId: 'char2',
      damage: 13,
      message: "PyroBot unleashes a fiery blast!",
    },
    {
      turn: 4,
      attackerId: 'char1',
      defenderId: 'char2',
      damage: 11,
      message: "A critical hit from PyroBot!",
    },
    {
      turn: 5,
      attackerId: 'char2',
      defenderId: 'char1',
      damage: 9,
      message: "FerroBot holds its ground!",
    },
    // ... more turns until one faints
  ],
};

// Fill out the rest of the battle log for a complete simulation
let playerHp = battleData.player.maxHp;
let opponentHp = battleData.opponent.maxHp;
battleData.log.forEach(turn => {
  if (turn.attackerId === 'char1') {
    opponentHp -= turn.damage;
  } else {
    playerHp -= turn.damage;
  }
});

while (playerHp > 0 && opponentHp > 0) {
    const lastTurn = battleData.log[battleData.log.length - 1];
    const nextAttacker = lastTurn.attackerId === 'char1' ? 'char2' : 'char1';
    const nextDefender = nextAttacker === 'char1' ? 'char2' : 'char1';
    const damage = Math.floor(Math.random() * 5) + 8; // Random damage between 8-12

    battleData.log.push({
        turn: lastTurn.turn + 1,
        attackerId: nextAttacker,
        defenderId: nextDefender,
        damage,
        message: `${nextAttacker === 'char1' ? 'PyroBot' : 'FerroBot'} attacks again!`
    });
    if (nextDefender === 'char1') playerHp -= damage;
    else opponentHp -= damage;
}
battleData.winnerId = playerHp > 0 ? 'char1' : 'char2';