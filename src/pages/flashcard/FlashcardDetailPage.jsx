import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegEdit, FaArrowLeft, FaRandom, FaLanguage ,FaExchangeAlt   } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import useRoot from '../../hooks/common/useRoot';
import useFlashcardListDetail from '../../hooks/flashcard/useFlashcardListDetail';
import useFlashcardListManipulation from '../../hooks/flashcard/useFlashcardListManipulation';
import FlashcardRow from '../../components/flashcard/FlashcardRow';
import SnackbarAlert from '../../components/common/SnackbarAlert';
import LoadingSpinner from '../../components/common/LoadingSpinner';

function FlashcardDetailPage() {
  const { listId } = useParams();
  const navigate = useNavigate();

  const [language, setLanguage] = useState('English');
  const [revealed, setRevealed] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [cardEmptyError, setCardEmptyError] = useState(false);
  const { errorMessage, setErrorMessage } = useRoot();

  const { list } = useFlashcardListDetail({ listId });
  const { toggleRandomOrder, toggleDeckLanguage } = useFlashcardListManipulation({ setErrorMessage });

  // Deck settings
  const [isRandom, setIsRandom] = useState(list?.random || false);
  const [defaultLanguage, setDefaultLanguage] = useState(list?.defaultLanguage || 'ENGLISH');

  useEffect(() => {
    if(list) {
      setIsLoading(false);
      setIsRandom(!!list.random);
      setDefaultLanguage(list.defaultLanguage || 'ENGLISH');
    }
  }, [list]);

  function toggleLanguage(language) {
    setLanguage(language);
    setRevealed({});
  }
     
  function toggleReveal(cardId) {
    setRevealed((prev) => ({ ...prev, [cardId]: !prev[cardId] }));
  };   

  function handleStartPractice(){
    if(list.cards.length === 0){
      setCardEmptyError(true);
      return;
    }
    navigate(`/flashcard/${listId}/practice`);
  }

  async function handleToggleOrder() {
    const newIsRandom = !isRandom;
    setIsRandom(newIsRandom);
    const result = await toggleRandomOrder(listId, newIsRandom);
      
    if (!result){
      setIsRandom(!newIsRandom); 
      setErrorMessage("Failed to update shuffle setting. Please try again.");
      return;
    }
  };

  async function handleToggleFlip() {
    const newDefaultLanguage = defaultLanguage === 'ENGLISH' ? 'MALAY' : 'ENGLISH';
    setDefaultLanguage(newDefaultLanguage);
    const result = await toggleDeckLanguage(listId, newDefaultLanguage);
    if (!result){
      setDefaultLanguage(defaultLanguage); 
      setErrorMessage("Failed to update language setting. Please try again.");
      return;
    }
  };

  if(isLoading) {
    return <LoadingSpinner/>;
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-zinc-900 text-white p-3 sm:p-6">
      {/* Header buttons */}
      <div className="flex justify-between items-center mb-6">
        <button
          title='Back to Deck List'
          onClick={() => navigate('/flashcard')}
          className="text-black dark:text-white text-xl hover:text-blue-400 cursor-pointer -mt-8"
        > 
          <FaArrowLeft size={36}/>
        </button>

        <div className="flex flex-col items-end gap-2 mr-4">
          <button
            title='Edit Deck'
            onClick={() => navigate(`/flashcard/${list.id}/edit`)}
            className="text-black dark:text-white px-3 py-2 rounded hover:text-blue-400 cursor-pointer "
          >
            <FaRegEdit size={36}/>
          </button>

          {/* Deck Settings */}
           <div className="flex items-center gap-2">
              <button
              onClick={handleToggleOrder}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold transition-colors duration-200 cursor-pointer
                ${isRandom
                  ? 'bg-indigo-600 text-white' // Active state
                  : 'bg-gray-300 dark:bg-zinc-700 text-black dark:text-white' // Inactive state
                }
              `}
              title={isRandom ? 'Disable Shuffle' : 'Shuffle Cards Order'}
              > 
                <FaRandom />
                <span>{isRandom ? 'Shuffled' : 'In Order'}</span>
              </button>

              <button
                  onClick={handleToggleFlip}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold transition-colors duration-200 cursor-pointer
                    ${defaultLanguage === 'MALAY'
                      ? 'bg-blue-500 text-white' // Active state (e.g., when showing Malay first)
                      : 'bg-gray-300 dark:bg-zinc-700 text-black dark:text-white' // Inactive state
                    }
                  `}
                  title="Toggle starting language"
                >
                  <FaExchangeAlt />
                  <span>{defaultLanguage === 'MALAY' ? 'Malay First' : 'English First'}</span>
              </button>
           </div>
        </div>
      </div>

      {/* List title and description */}
      <h1 className="text-black dark:text-white text-2xl font-semibold mb-1">{list.title}</h1>
      <p className="text-black dark:text-gray-300 mb-4">{list.description}</p>

      {/* Language toggle */}
      <div className="flex mb-6">
          <button
            onClick={() => toggleLanguage('English')}
            className={`w-1/4 sm:w-1/8 py-2 font-semibold ${
              language === 'English' ? "bg-gradient-to-br from-yellow-300 to-amber-400 text-black" : "bg-gray-300 hover:bg-gray-400 text-black dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white cursor-pointer"
            } rounded-l-xl`}
          >
            English
          </button>
          <button
            onClick={() => toggleLanguage('Malay') }
            className={`w-1/4 sm:w-1/8 py-2 font-semibold ${
              language === 'Malay' ? "bg-gradient-to-br from-yellow-300 to-amber-400 text-black" : "bg-gray-300 hover:bg-gray-400 text-black dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white cursor-pointer"
            } rounded-r-xl`}
          >
            Malay
          </button>
      </div>

      {/* Flashcard rows */}
      <div className="bg-slate-300 dark:bg-zinc-800 rounded shadow space-y-3 mb-6">
        <div className="space-y-3 max-h-[14rem] overflow-y-auto pr-1">
            {list.cards.map((card) => (
                 <FlashcardRow
                  key={card.flashcardId}
                  card={card}
                  language={language}
                  revealed={revealed}
                  onReveal={toggleReveal}
                />
            ))}
        </div>
      </div>

      {/* Practice button */}
      <div className="flex justify-center">
        <button 
          className="shadow-lg dark:shadow-gray-900 bg-slate-400/50 dark:bg-zinc-700 hover:bg-slate-400 dark:hover:bg-zinc-600 text-gray-900 dark:text-white cursor-pointer px-3 py-3 rounded text-lg font-semibold shadow"
          onClick={handleStartPractice}>
          Practice Flashcards
        </button>
      </div>

      {/* Empty Deck Alert */}
      <SnackbarAlert
        open={cardEmptyError}
        onClose={() => setCardEmptyError(false)}
        severity="error"
        message="This flashcard deck is empty. Please add some flashcards before practicing."
      />

      {/* JWT Expired Alert */}
      <SnackbarAlert
        open={errorMessage}
        anchorOrigin = {{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => setErrorMessage(false)}
        severity="error"
        message="Session expired, please log in again. Redirecting to login page..."
      />
    </div>
  );
};

export default FlashcardDetailPage;
