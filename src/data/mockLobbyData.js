// This simulates the data for the currently logged-in user's primary character
// We'll simulate two states: 'IDLE' and 'LISTED_FOR_BATTLE'
export const MOCK_USER_PRIMARY_CHARACTER = {
  instanceId: 101,
  templateId: 1,
  name: 'PyroBot',
  type: 'Fire',
  imageUrl: "https://melayumate-bucket.s3.ap-southeast-2.amazonaws.com/images/characters/fire-bot.png",
  level: 15,
  status: 'IDLE', // Change to 'LISTED_FOR_BATTLE' to see the other state
};

// This simulates the data from `GET /api/battle/listings`
export const MOCK_CHALLENGERS = [
  {
    instanceId: 201,
    templateId: 4,
    name: 'FerroBot',
    type: 'Steel',
    imageUrl: "https://melayumate-bucket.s3.ap-southeast-2.amazonaws.com/images/characters/steel-bot.png",
    level: 14,
    username: 'RivalAlex',
    stats: { hp: 85, atk: 24, def: 48, spd: 16 },
  },
  {
    instanceId: 202,
    templateId: 5,
    name: 'VoltBot',
    type: 'Electric',
    imageUrl: "https://melayumate-bucket.s3.ap-southeast-2.amazonaws.com/images/characters/electric-bot.png", // Placeholder
    level: 16,
    username: 'SparkySarah',
    stats: { hp: 92, atk: 40, def: 25, spd: 48 },
  },
  {
    instanceId: 203,
    templateId: 2,
    name: 'PhytoBot',
    type: 'Grass',
    imageUrl: "https://melayumate-bucket.s3.ap-southeast-2.amazonaws.com/images/characters/grass-bot.png", // Placeholder
    level: 15,
    username: 'GardenerBen',
    stats: { hp: 100, atk: 28, def: 34, spd: 23 },
  },
  {
    instanceId: 204,
    templateId: 6,
    name: 'TerraBot',
    type: 'Ground',
    imageUrl: "https://melayumate-bucket.s3.ap-southeast-2.amazonaws.com/images/characters/ground-bot.png", // Placeholder
    level: 13,
    username: 'DiggerDave',
    stats: { hp: 101, atk: 31, def: 41, spd: 14 },
  },
];