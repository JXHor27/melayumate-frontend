import React from 'react';
import { FaVolumeUp } from 'react-icons/fa'; // Speaker icon

const DialogueMessage = ({ sender, text, translation, avatarSrc, userInitial, audioSrc }) => {
  const isCharacter = sender === 'ques';
  const isImageAvatar =  avatarSrc?.length > 1;

  // Function to play audio
  const playAudio = () => {
    //console.log("Audio source:", audioSrc);

    if (audioSrc) {
      const audio = new Audio(audioSrc);
      audio.play();
    }
  };

  return (
    <div className={`flex items-end w-full ${isCharacter ? 'justify-start' : 'justify-end'}`}>
      {/* Character Avatar (only shows if sender is 'character') */}
      {isCharacter && (
        isImageAvatar ? (
          <img
            src={avatarSrc} 
            alt="Character Avatar"
            className="w-18 h-18 sm:w-22 sm:h-22 rounded-full"
          />
        ) : (
          <div className="flex items-center justify-center w-13 h-13 rounded-full bg-teal-500 text-white font-bold text-xl mr-4">
            {avatarSrc}
          </div>
        )
      )}
      {/* Message Bubble */}
      <div
        className={`
          w-auto max-w-30 sm:max-w-55 md:max-w-65 break-words
          p-2 sm:p-4 rounded-2xl relative
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
                       ? 'left-2 text-teal-300 hover:text-white' 
                       : 'right-2 text-indigo-300 hover:text-white'}
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
               <p className={`text-lg ${audioSrc && (isCharacter ? 'pl-8 sm:pl-10' : 'pr-8 sm:pr-10')}`}>
                 {text}
               </p>
               <p className={`text-sm text-gray-300 mt-1 ${audioSrc && (isCharacter ? 'pl-8 sm:pl-10' : 'pr-8 sm:pr-10')}`}>
                 {translation}
               </p>
      </div>

      {/* User Initial Bubble (only shows if sender is 'user') */}
      {!isCharacter && (
        <div className="flex items-center justify-center w-13 h-13 rounded-full bg-indigo-500 text-white font-bold text-xl ml-4">
          {userInitial}
        </div>
      )}
    </div>
  );
};

export default DialogueMessage;