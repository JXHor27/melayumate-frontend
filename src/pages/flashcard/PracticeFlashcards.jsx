import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaSmile, FaFrown, FaArrowLeft, FaFire } from 'react-icons/fa';
import { GiSmallFire } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import useFlashcardListDetail from '../../hooks/flashcard/useFlashcardListDetail';

const PracticeFlashcards = () => {
  const { listId } = useParams();
  const {list} = useFlashcardListDetail(listId);
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [disableTransition, setDisableTransition] = useState(false);
  const [streak, setStreak] = useState(0);
  const [playStreakAnimation, setPlayStreakAnimation] = useState(false); // New state for animation
  const progress = list.cards.length > 0 ? ((currentIndex + 1) / list.cards.length) * 100 : 0;

   // Effect to reset the animation state after it plays
  useEffect(() => {
    if (playStreakAnimation) {
      const timer = setTimeout(() => {
        setPlayStreakAnimation(false);
      }, 600); // Match animation duration (0.6s)
      return () => clearTimeout(timer);
    }
  }, [playStreakAnimation]);

  function handleNext() {
    setShowAnswer(false);
    setDisableTransition(true);
    setFeedback(null);
    setCurrentIndex((prev) => (prev + 1) % list.cards.length);
  };

  function handleFeedback(isCorrect) {
    setFeedback(isCorrect ? 'yes' : 'no');
    if (isCorrect) {
      setStreak(prevStreak => {
        const newStreak = prevStreak + 1;
        if (newStreak > 0) { // Only animate if streak is positive
          setPlayStreakAnimation(true); // Trigger animation
        }
        return newStreak;
      });
    } else {
      setStreak(0);
      setPlayStreakAnimation(false); // Ensure animation is off on reset
    }
  };

  async function handleFinish() {
    const response = await fetch('http://localhost:8080/user/today/stat/flashcard', {
              method:"POST",
              headers: {
                "Content-Type": "application/json",
              },
               body: JSON.stringify({
                flashcardDone: 1
              }),
    });
    if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
    }

    const expResponse = await fetch('http://localhost:8080/user/today/stat/exp', {
              method:"POST",
              headers: {
                "Content-Type": "application/json",
              },
               body: JSON.stringify({
                currentEXP: streak
              }),
    });
    if (!expResponse.ok) {
        const message = `An error occurred: ${expResponse.statusText}`;
        console.error(message);
        return;
    }

    navigate(`/flashcard/${listId}`)
  }

  const currentCard = list.cards[currentIndex];

  // Dynamic sizing for streak display
  const fireIconSize = 25 + Math.min(streak * 5, 25);  // Base 25, grows by 5 per streak, max +25 (so max 50)
  const streakNumberFontSize = `${1 + Math.min(streak * 0.05, 0.5)}rem`;  // Base 1rem, grows by 0.05rem per streak, max +0.5rem

  return (
     <div className="min-h-screen bg-zinc-900 text-white p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
            <button
                onClick={() => navigate(`/flashcard/${listId}`)}
                className="text-white text-xl hover:text-blue-400 cursor-pointer"> 
                  <FaArrowLeft size={36}/>
            </button>
            {/* Progress Bar */}
            <div className="w-full max-w-md h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                    className="h-full bg-green-500 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
              <div className="flex items-center min-w-[100px]"> {/* Container for streak and title, min-w to prevent squish */}
              
                <div
                  // Add a key that changes with streak to help React re-trigger if CSS alone isn't enough,
                  // but the playStreakAnimation state should handle it.
                  // key={streak} <--- Usually not needed with explicit animation state
                  className={`flex items-center text-orange-400 font-bold mr-4 ${playStreakAnimation ? 'streak-animate-pop' : ''}`}
                >
                  <GiSmallFire
                    className="mr-1 streak-icon-fire" // Added class for potential CSS transitions on icon
                    size={fireIconSize}
                    style={{ transition: 'font-size 0.3s ease-out' }} // React-icons size prop maps to font-size
                  />
                  <span style={{ fontSize: streakNumberFontSize, transition: 'font-size 0.3s ease-out' }}>
                    {streak}
                  </span>
                </div>
              
            </div>
     
          
        </div>
        <div className="h-120 bg-zinc-700 text-white flex flex-col items-center justify-center p-6 rounded-lg">
            {currentCard && (
            <div className="relative w-full max-w-md perspective-normal perspective-origin-top">
                <div
                    className={`relative w-full h-48 transform-3d ${showAnswer ? 'rotate-y-180' : 'rotate-none'} ${disableTransition ? '' : 'transition-transform duration-700'}`}>
                    {/* Front */}
                    <div className="bg-gray-950 border-b-4 border-indigo-700 absolute w-full h-full backface-hidden text-gray-100 text-2xl font-semibold flex items-center justify-center rounded-xl shadow-xl">
                        {currentCard.englishWord}
                    </div>

                    {/* Back */}
                    <div className="bg-gradient-to-br from-purple-600 to-indigo-700 absolute w-full h-full backface-hidden text-white text-2xl font-semibold flex items-center justify-center rounded-xl shadow-xl transform rotate-y-180">
                        {currentCard.malayWord}
                    </div>
                </div>
                {!showAnswer && (
                <button
                    onClick={() => {setShowAnswer(true), setDisableTransition(false);}}
                    className="mt-15 bg-gradient-to-br from-purple-300 to-indigo-500 text-black px-6 py-2 rounded font-semibold shadow transition w-full cursor-pointer">
                        Show Answer
                </button>
                )}

                 {showAnswer && !feedback && (
            <div className="mt-4 text-center">
              <div className="text-white font-medium mb-2">Did you get it right?</div>
              <div className="flex justify-evenly gap-6">
                <button
                  onClick={() => handleFeedback(true)}
                  className="w-1/4 bg-green-500 text-white font-semibold px-4 py-2 rounded transition cursor-pointer"
                >
                  Yes
                </button>
                <button
                  onClick={() => handleFeedback(false)}
                  className="w-1/4 bg-red-500 text-white font-semibold px-4 py-2 rounded transition cursor-pointer"
                >
                  No
                </button>
              </div>
            </div>
          )}

                {feedback && (
                <div className="mt-4 text-center">
                {feedback === 'yes' ? (
                    <div className="flex items-center justify-center gap-2 text-green-400 text-lg font-medium">
                        <FaSmile size={24} /> Great job!
                    </div>
                    ) : (
                    <div className="flex items-center justify-center gap-2 text-red-400 text-lg font-medium">
                        <FaFrown size={24} /> Don't worry, keep trying!
                     </div>
                )}
                    {currentIndex + 1 < list.cards.length ? (
                <button
                  onClick={handleNext}
                  className="w-full mt-4 bg-gradient-to-br from-purple-300 to-indigo-500 text-black px-5 py-2 font-semibold rounded hover:bg-blue-400 transition cursor-pointer">
                  Next
                </button>
              ) : (
                <button
                  onClick={handleFinish}
                  className="w-full mt-4 bg-gradient-to-br from-purple-300 to-indigo-500 text-black font-semibold px-5 py-2 rounded hover:bg-green-500 transition cursor-pointer">
                  Finish Practice <span className='text-base'>(+{streak} EXP)</span>
                </button>
              )}
                </div>
                )}
            </div>
            )}
        </div>
    </div>
  );
 
};

export default PracticeFlashcards;
