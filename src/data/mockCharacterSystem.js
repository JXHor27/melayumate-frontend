import fireBot from '../assets/images/fire-bot.png';
import steelBot from '../assets/images/steel-bot.png';
import iceBot from '../assets/images/ice-bot.png';
import grassBot from '../assets/images/grass-bot.png';
import groundBot from '../assets/images/ground-bot.png'
import electricBot from '../assets/images/electric-bot.png'
import waterBot from '../assets/images/water-bot.png'


export const ALL_TEMPLATES = [
  // Tier 0 Starters
  { id: 1, name: 'Fire Bot', type: 'Fire', unlockLevel: 0, imageUrl: fireBot, baseStats: { hp: 55, atk: 12, def: 8, spd: 10 } },
  { id: 2, name: 'Grass Bot', type: 'Grass', unlockLevel: 0, imageUrl: grassBot, baseStats: { hp: 60, atk: 10, def: 10, spd: 8 } },
  { id: 3, name: 'Water Bot', type: 'Water', unlockLevel: 0, imageUrl: waterBot, baseStats: { hp: 58, atk: 11, def: 9, spd: 9 } },
  // Tier 1 Unlocks
  { id: 4, name: 'Steel Bot', type: 'Steel', unlockLevel: 5, imageUrl: steelBot, baseStats: { hp: 50, atk: 10, def: 20, spd: 5 } },
  { id: 5, name: 'Electric Bot', type: 'Electric', unlockLevel: 5, imageUrl: electricBot, baseStats: { hp: 52, atk: 15, def: 7, spd: 18 } },
  { id: 6, name: 'Ground Bot', type: 'Ground', unlockLevel: 5, imageUrl: groundBot, baseStats: { hp: 65, atk: 14, def: 15, spd: 4 } },
];

export const INITIAL_USER_STATE = {
  id: 1,
  level: 0,
  exp: 0,
  primaryCharacterInstanceId: null,
};

export const INITIAL_OWNED_CHARACTERS = [];