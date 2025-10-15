import fireBot from '../assets/images/fire-bot.png';
import steelBot from '../assets/images/steel-bot.png';
import iceBot from '../assets/images/ice-bot.png';
import grassBot from '../assets/images/grass-bot.png';
import groundBot from '../assets/images/ground-bot.png'
import electricBot from '../assets/images/electric-bot.png'
import waterBot from '../assets/images/water-bot.png'

export const ALL_CHARACTERS = [
  {
    id: 'fire',
    name: 'Fire Bot',
    type: 'Fire',
    imageUrl: fireBot,
    unlockLevel: 1,
    description: 'A fiery companion, full of energy and warmth.',
    glowColor: 'shadow-orange-500/50',
  },
  {
    id: 'water',
    name: 'Water Bot',
    type: 'Water',
    imageUrl: waterBot,
    unlockLevel: 1,
    description: 'Calm and collected, this bot goes with the flow.',
    glowColor: 'shadow-blue-500/50',
  },
  {
    id: 'grass',
    name: 'Grass Bot',
    type: 'Grass',
    imageUrl: grassBot,
    unlockLevel: 1,
    description: 'A resilient bot, deeply connected to nature.',
    glowColor: 'shadow-green-500/50',
  },
  {
    id: 'steel',
    name: 'Steel Bot',
    type: 'Steel',
    imageUrl: steelBot,
    unlockLevel: 5,
    description: 'Incredibly durable and steadfast in any situation.',
    glowColor: 'shadow-gray-400/50',
  },
  {
    id: 'electric',
    name: 'Electric Bot',
    type: 'Electric',
    imageUrl: electricBot, 
    unlockLevel: 5,
    description: 'Crackles with high-voltage energy and lightning speed.',
    glowColor: 'shadow-yellow-400/50',
  },
  {
    id: 'ground',
    name: 'Ground Bot',
    type: 'Ground',
    imageUrl: groundBot, 
    unlockLevel: 10,
    description: 'A sturdy and grounded bot with immense power.',
    glowColor: 'shadow-amber-700/50',
  },
];