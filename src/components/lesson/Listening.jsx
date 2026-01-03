import React, { useState, useEffect, useRef } from 'react';
import { FaPlayCircle, FaPlay, FaPause } from 'react-icons/fa'; // Icon for the play button

function Listening({ question, onSelectAnswer, answerStatus, userAnswer }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const audioRef = useRef(null); // Ref to control the audio element
  const intervalRef = useRef(null);

  // --- NEW STATE FOR CUSTOM PLAYER ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const animationFrameRef = useRef();

  const { attributes, completed: isReviewMode, selectedAnswer: reviewUserAnswer } = question;

   // --- 2. CLEANUP FUNCTION ---
  // A single, reliable function to stop the timer
  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // --- 3. CORE PLAYER CONTROLS ---

  const startTimer = () => {
    // Clear any existing timers before starting a new one
    stopTimer();
    // Set an interval to update the time every 300ms
    intervalRef.current = setInterval(() => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    }, 300); // Update roughly 3 times a second
  };

  const togglePlayPause = () => {
    const wasPlaying = isPlaying;
    setIsPlaying(!wasPlaying);

    if (!wasPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
      stopTimer();
    }
  };

  const onScrub = (value) => {
    // When the user drags the slider, directly update the audio time
    stopTimer(); // Pause updates while scrubbing
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  const onScrubEnd = () => {
    // When the user lets go, restart the timer if it was playing
    if (isPlaying) {
      startTimer();
    }
  };
  
  // --- 4. EFFECTS TO MANAGE THE PLAYER ---

  // --- AUDIO PLAYBACK LOGIC ---
  useEffect(() => {
    console.log("Setting up audio with key:", attributes.reference_audio_url);
    // Construct the full audio URL from the object key
    // In a real app, this base URL would come from a config file or context
    // const s3BaseUrl = 'https://your-s3-bucket.s3.your-region.amazonaws.com';
    if (attributes.reference_audio_url) {
      audioRef.current = new Audio(`${attributes.reference_audio_url}`);
    }
  }, [attributes.reference_audio_url]);

  // Main effect to handle audio source changes
  useEffect(() => {
    // This runs when the `question` prop changes
    const audio = audioRef.current;
    if (audio) {
      // Reset everything for the new question
      stopTimer();
      setIsPlaying(false);
      setCurrentTime(0);
      
      audio.onloadedmetadata = () => {
        setDuration(audio.duration);
      };

      audio.onended = () => {
        setIsPlaying(false);
        stopTimer();
        setCurrentTime(audio.duration); // Make sure it ends at 100%
      };
    }
  }, [question]); // This effect depends only on the question

  // Final cleanup effect when the component unmounts
  useEffect(() => {
    const audio = audioRef.current;
    // Return a cleanup function
    return () => {
      stopTimer();
      if (audio) {
        audio.onloadedmetadata = null;
        audio.onended = null;
      }
    };
  }, []);

  
  
  // Format time helper
  const formatTime = (timeInSeconds) => {
    const floor = Math.floor(timeInSeconds);
    const minutes = Math.floor(floor / 60).toString().padStart(2, '0');
    const seconds = (floor % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };



  function handleSelect(index) {
    setSelectedOption(index);
    // ...we immediately call the function passed down from the parent.
    onSelectAnswer(index);
  };
  


  // --- DYNAMIC STYLING LOGIC (Identical to MultipleChoice) ---
  const getOptionStyle = (index) => {
    if (isReviewMode) {
      if (index === attributes.correct_answer_index) {
        return 'border-green-500 bg-green-500/30 dark:bg-green-500/10'; // Correct answer
      }
      // Note: `reviewUserAnswer` might be a string, so we may need to parse it
      // For multiple choice, let's assume it's the index stored as a string.
      if (index === parseInt(reviewUserAnswer, 10) && index !== attributes.correct_answer_index) {
        return 'border-red-500 bg-red-500/10 opacity-70'; // User's incorrect answer
      }
      return 'border-gray-600 dark:border-zinc-700 opacity-60'; // Other options
    }
    if (answerStatus === 'unanswered') {
      return selectedOption === index
        ? 'border-purple-500 bg-purple-500/10' // Selected
        : 'border-gray-300 dark:border-zinc-700 hover:bg-gray-200/50 dark:hover:bg-zinc-700/50'; // Default
    }
    if (index === attributes.correct_answer_index) {
      return 'border-green-500 bg-green-500/30 dark:bg-green-500/10 text-black dark:text-white'; // Correct answer
    }
    if (index === userAnswer && index !== attributes.correct_answer_index) {
      return 'border-red-500 bg-red-500/10 text-gray-900 dark:text-gray-400 opacity-70'; // Incorrectly chosen answer
    }
    return 'border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-gray-400 opacity-70'; // Other incorrect answers
  };

  return (
    <div className="space-y-8">
      
      {/* --- 5. THE JSX (UNCHANGED BUT NOW IT WORKS) --- */}
      <div className="p-6 bg-slate-300 dark:bg-zinc-800 rounded-2xl shadow-inner">
        <audio
          ref={audioRef}
          src={attributes.reference_audio_url}
          preload="metadata" // Helps get duration faster
        />
        <div className="flex items-center gap-4">
          <button onClick={togglePlayPause} /* ... */ >
            {isPlaying ? <FaPause size={20} className="text-black dark:text-white cursor-pointer" /> : <FaPlay size={20} className="ml-1 text-black dark:text-white cursor-pointer" />}
          </button>
          
          <div className="w-full">
            <input
              type="range"
              min="0"
              max={duration || 0}
              step="0.01"
              value={currentTime}
              onChange={(e) => onScrub(e.target.value)}
              onMouseUp={onScrubEnd}
              onTouchEnd={onScrubEnd}
              className="w-full h-2 ... accent-purple-500"
            />
            <div className="flex justify-between text-xs font-mono text-gray-700 dark:text-gray-400 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- MULTIPLE CHOICE SECTION (Identical JSX to MultipleChoice) --- */}
      <div className="space-y-4">
        {attributes.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            disabled={answerStatus !== 'unanswered'}
            className={`w-full p-4 text-left font-semibold text-black dark:text-white border-2 rounded-lg transition-all duration-200
              ${getOptionStyle(index)}
            `}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Listening;