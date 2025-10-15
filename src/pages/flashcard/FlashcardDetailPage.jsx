import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegEdit, FaArrowLeft } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import useRoot from '../../hooks/common/useRoot';
import useFlashcardListDetail from '../../hooks/flashcard/useFlashcardListDetail';
import FlashcardRow from '../../components/flashcard/FlashcardRow';
import SnackbarAlert from '../../components/common/SnackbarAlert';

function FlashcardDetailPage() {
  const { listId } = useParams();
  const navigate = useNavigate();
  const { errorMessage, setErrorMessage } = useRoot();
  const { list } = useFlashcardListDetail({ listId });

  const [language, setLanguage] = useState('English');
  const [revealed, setRevealed] = useState({});

  function toggleLanguage(language) {
    setLanguage(language);
    setRevealed({});
  }
     
  function toggleReveal(cardId) {
    setRevealed((prev) => ({ ...prev, [cardId]: !prev[cardId] }));
  };    

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-zinc-900 text-white p-3 sm:p-6">
      {/* Header buttons */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate('/flashcard')}
          className="text-black dark:text-white text-xl hover:text-blue-400 cursor-pointer"
        > 
          <FaArrowLeft size={36}/>
        </button>
        <button
          onClick={() => navigate(`/flashcard/${list.id}/edit`)}
          className="text-black dark:text-white px-3 py-2 rounded hover:text-blue-400 cursor-pointer"
        >
          <FaRegEdit size={36}/>
        </button> 
      </div>

      {/* List title and description */}
      <h1 className="text-black dark:text-white text-2xl font-semibold mb-1">{list.title}</h1>
      <p className="text-black dark:text-gray-300 mb-4">{list.description}</p>

      {/* Language toggle */}
      <div className="flex mb-6">
          <button
            onClick={() => toggleLanguage('English')}
            className={`w-1/4 sm:w-1/8 py-2 font-semibold ${
              language === 'English' ? "bg-gradient-to-br from-yellow-300 to-amber-400 text-black" : "bg-gray-500 hover:bg-gray-400 text-black cursor-pointer"
            } rounded-l-xl`}
          >
            English
          </button>
          <button
            onClick={() => toggleLanguage('Malay') }
            className={`w-1/4 sm:w-1/8 py-2 font-semibold ${
              language === 'Malay' ? "bg-gradient-to-br from-yellow-300 to-amber-400 text-black" : "bg-gray-500 hover:bg-gray-400 text-black cursor-pointer"
            } rounded-r-xl`}
          >
            Malay
          </button>
      </div>

      {/* Flashcard rows */}
      <div className="bg-slate-300 dark:bg-zinc-800 rounded shadow space-y-3 mb-8">
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
          className="cursor-pointer bg-zinc-700 hover:bg-zinc-600 px-3 py-3 rounded text-white text-lg font-semibold shadow"
          onClick={() => navigate(`/flashcard/${list.id}/practice`)}>
          Practice Flashcards
        </button>
      </div>

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
