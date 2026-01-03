import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../../common/LoadingSpinner';

const MyStatusCard = ({ character, onList, onUnlist }) => {
  if (!character) {
    return <LoadingSpinner />;
  }

  const isListed = character.characterStatus === 'LISTED_FOR_BATTLE';

  useEffect(() => {
    console.log(isListed);
  }, [])

  return (
    // The gradient border works well in both themes.
    <div className="mx-4 relative p-1 bg-gradient-to-br from-purple-600 via-blue-500 to-yellow-400 rounded-2xl shadow-lg">
      <div className="p-6 bg-white dark:bg-slate-800 rounded-xl flex flex-col md:flex-row items-center gap-6">
        {/* Character Image */}
        <div className="relative flex-shrink-0">
          <img 
            src={character.imageUrl} 
            alt={character.name} 
            className="w-32 h-32 drop-shadow-lg/50 relative z-10" 
          />
          {isListed && (
            <div className="absolute inset-0 bg-green-500/40 dark:bg-green-500/30 rounded-full animate-ping"></div>
          )}
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-3xl font-bold text-slate-800 dark:text-white">{character.name}</h3>
          <p className="font-semibold text-lg mt-1">
            <span className="text-gray-600 dark:text-gray-400">Status: </span>
            <span className={isListed ? 'text-green-500 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}>
              {isListed ? 'Waiting for Challengers' : 'Idle'}
            </span>
          </p>
        </div>
        
        {/* Buttons (Already have strong background colors that work well) */}
        {isListed ? (
          <button 
            onClick={onUnlist} 
            className="w-full md:w-auto bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg cursor-pointer"
          >
            Cancel Listing
          </button>
        ) : (
          <button
            onClick={onList} 
            className="w-full md:w-auto bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg cursor-pointer"
          >
            List for Battle
          </button>
        )}
      </div>
    </div>
  );
};

export default MyStatusCard;