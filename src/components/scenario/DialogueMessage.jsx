import React from 'react';
import { FaVolumeUp } from 'react-icons/fa'; // Speaker icon

const DialogueMessage = ({ sender, text, translation, avatarSrc, userInitial, audioSrc }) => {
  const isCharacter = sender === 'ques';

  // Function to play audio
  const playAudio = () => {
    console.log("Audio source:", audioSrc);

    if (audioSrc) {
      const audio = new Audio(audioSrc);
      audio.play();
    }
  };

  return (
    <div className={`flex items-end w-full ${isCharacter ? 'justify-start' : 'justify-end'}`}>
      {/* Character Avatar (only shows if sender is 'character') */}
      {isCharacter && (
        <img src={avatarSrc} alt="Character Avatar" className="w-14 h-14 rounded-full" />
      )}

      {/* Message Bubble */}
      <div
        className={`
          w-auto max-w-30 sm:max-w-55 md:max-w-65 break-words
          p-4 rounded-2xl relative
          ${isCharacter ? 'bg-teal-800 text-white rounded-bl-none border-1 border-teal-200' : 'bg-zinc-900 border-1 border-teal-200 text-white rounded-br-none'}
        `}
      >
        {/* Speaker Button (only for character) */}
         {/* Speaker Button (now for anyone with audio) */}
               {audioSrc && (
                 <button
                   onClick={playAudio}
                   // Button is positioned left for character, right for user
                   className={`
                     absolute top-3 p-1 transition-colors cursor-pointer 
                     ${isCharacter 
                       ? 'left-4 text-teal-300 hover:text-white' 
                       : 'right-4 text-indigo-300 hover:text-white'}
                   `}
                   aria-label="Play audio"
                 >
                   <FaVolumeUp
                     size={20}
                     // The icon is flipped horizontally for the user
                     className={`transform transition-transform ${!isCharacter ? '-scale-x-100' : ''}`}
                   />
                 </button>
               )}
               
               {/* Text now gets padding based on who the sender is, if audio exists */}
               <p className={`text-lg ${audioSrc && (isCharacter ? 'pl-10' : 'pr-10')}`}>
                 {text}
               </p>
               <p className={`text-sm text-gray-300 mt-1 ${audioSrc && (isCharacter ? 'pl-10' : 'pr-10')}`}>
                 {translation}
               </p>
      </div>

      {/* User Initial Bubble (only shows if sender is 'user') */}
      {!isCharacter && (
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-500 text-white font-bold text-xl ml-4">
          {userInitial}
        </div>
      )}
    </div>
  );
};

export default DialogueMessage;