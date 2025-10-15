import React from 'react';

// Simple SVG for a fire burst
const FireIcon = () => (
  <svg className="w-24 h-24 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
    <path d="M13.59 3.59c-.38-.38-.89-.59-1.42-.59s-1.04.21-1.42.59l-5.08 5.08c-.78.78-.78 2.05 0 2.83l5.08 5.08c.78.78 2.05.78 2.83 0l5.08-5.08c.78-.78.78-2.05 0-2.83L13.59 3.59z"/>
  </svg>
);

// Simple SVG for a steel/physical hit
const SteelIcon = () => (
  <svg className="w-24 h-24 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
     <path d="M20.71,6.29l-3-3a1,1,0,0,0-1.42,0l-12,12a1,1,0,0,0,0,1.42l3,3a1,1,0,0,0,1.42,0l12-12A1,1,0,0,0,20.71,6.29ZM7,15.59,5.41,14,12,7.41,13.59,9,7,15.59Z"/>
  </svg>
);


const AttackAnimation = ({ type, targetPosition }) => {
  if (!type) return null;

  const animationClass = 'absolute z-20 animate-burst-out';

  const getIcon = () => {
    switch (type) {
      case 'Fire':
        return <FireIcon />;
      case 'Steel':
        return <SteelIcon />;
      // Add cases for 'Water', 'Grass', etc.
      default:
        return <SteelIcon />; // Default hit effect
    }
  };

  return (
    <div className={animationClass} style={targetPosition}>
      {getIcon()}
    </div>
  );
};

export default AttackAnimation;