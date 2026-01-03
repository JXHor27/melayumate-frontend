import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit, FaPlus, FaArrowLeft, FaRegWindowClose } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import SnackbarAlert from '../../components/common/SnackbarAlert';
import FlashcardForm from '../../components/flashcard/FlashcardForm';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import useRoot from '../../hooks/common/useRoot';
import useFlashcardListDetail from '../../hooks/flashcard/useFlashcardListDetail';
import useFlashcardManipulation from '../../hooks/flashcard/useFlashcardManipulation';
import useFlashcardListManipulation from '../../hooks/flashcard/useFlashcardListManipulation';
function FlashcardEditPage() {
  const { listId } = useParams();
  const navigate = useNavigate();

  /* Error handling alert section */
  const [titleEmptyError, setTitleEmptyError] = useState(false)
  const [englishEmptyError, setEnglishEmptyError] = useState(false)
  const [malayEmptyError, setMalayEmptyError] = useState(false)
  const [cardAddedSuccess, setCardAddedSuccess] = useState(false)
  const [listEditedSuccess, setListEditedSuccess] = useState(false)
  const [cardEditedSuccess, setCardEditedSuccess] = useState(false)

  /* Form handling section */
  const [editingCard, setEditingCard] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    cardId: '',
    english: '',
    malay: '',
    editingCardId: null,
  });
  const [listData, setListData] = useState({
    title: '',
    description: ''
  });

  /* Custom Hooks and API section */
  const { errorMessage, setErrorMessage } = useRoot();
  const { list, setList } = useFlashcardListDetail({ listId });
  const { addCard, editCard, deleteCard, fetchCards } = useFlashcardManipulation({ setList, setErrorMessage });
  const { editList, deleteList } = useFlashcardListManipulation({ setList, setErrorMessage });
  const isListUnchanged =
    listData &&
    listData.title === list.title &&
    listData.description === list.description;

  useEffect(() => {
    setListData({
        title: list.title,
        description: list.description
    })
  }, [list]);
  
  async function handleAddCard() {
    if (!formData.english.trim()){
        setEnglishEmptyError(true);
        return;
    }
    if (!formData.malay.trim()){
        setMalayEmptyError(true);
        return;
    }
    const newCard = await addCard(list.id, formData.english, formData.malay);
    if(!newCard) return;
    await fetchCards(list.id);
    setFormData({ malay: '', english: '' });
    setShowForm(false);
    setCardAddedSuccess(true);
  };

  function handleEditCard(card) {
    setShowForm(true);
    setFormData({
      cardId: card.flashcardId,
      english: card.englishWord,
      malay: card.malayWord,
      editingCardId: card.flashcardId
    });
    setEditingCard(card.flashcardId);
  };

  async function handleSaveCard() {
    if (!formData.english.trim()){
        setEnglishEmptyError(true);
        return;
    }
    if (!formData.malay.trim()){
        setMalayEmptyError(true);
        return;
    }
    const updatedCard = await editCard(list.id, formData.cardId, formData.english, formData.malay);
    if(!updatedCard) return;
    setShowForm(false);
    setFormData({ english: "", malay: "" });
    setCardEditedSuccess(true);
  };

  async function handleDeleteCard(cardId) {
    await deleteCard(cardId);
  };

  async function handleEditList() {
     if (!listData.title.trim()){
      setTitleEmptyError(true)
      return;
    }
    const updatedList = await editList(list.id, listData.title, listData.description);
    if(!updatedList) return;
    setList(prev => ({
        ...prev,
        title: listData.title,
        description: listData.description
    }));
    setListEditedSuccess(true);
  }

  function handleDelete() {
    setConfirmDelete(true);
  }

  async function handleDeleteList() {
    const response = await deleteList(list.id);
    if(!response) return;
    navigate('/flashcard');
  };

  function handleOpenForm(){
     setShowForm(true); 
     setEditingCard(null);
     setFormData({ english: "", malay: "" });
  }

  return (
     <div className="min-h-screen bg-slate-100 dark:bg-zinc-900 text-black dark:text-white p-2 pt-4 sm:p-6 relative">
      {/* Create Card Form Overlay */}
      {showForm && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowForm(false)}
          style={{ pointerEvents: "auto" }}
        />
      )}

      {/* Top buttons */}
      <div className="flex justify-between items-center mb-6 text-black dark:text-white">
        <button
          title ='Close Edit Deck'
          onClick={() => navigate(`/flashcard/${list.id}`)}
          className="text-xl hover:text-red-400 cursor-pointer"> 
            <FaRegWindowClose size={36}/>
        </button>
        <div className="flex gap-3">
          <button
            onClick={handleOpenForm}
            className="shadow-lg dark:shadow-gray-800 text-black bg-yellow-300 hover:bg-yellow-400 px-4 py-2 font-semibold rounded cursor-pointer"
          >
             Add Card
          </button>
          <button
            title = "Delete Deck"
            onClick={handleDelete}
            className="px-4 py-2 rounded hover:text-blue-400 cursor-pointer"
          >
            <FaTrash size={26} />
          </button>
        </div>
      </div>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={handleDeleteList}
        title="Confirm Deletion"
        message="Are you sure you want to delete this deck?"
      />

      {/* Editable list title/description */}
      <div className="mb-1">
        <input
          type="text"
          maxLength={25}
          value={listData.title}
          onChange={(e) => setListData({ ...listData, title: e.target.value})}
          placeholder="Title"
          className="w-full text-xl font-bold bg-slate-300 dark:bg-zinc-700 text-black dark:text-white px-4 py-2 rounded"
        />
        <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-3">{listData.title.length}/25 characters</p>
        <input
          type="text"
          value={listData.description}
          maxLength={60}
          onChange={(e) => setListData({ ...listData, description: e.target.value})}
          placeholder="Description (Optional)"
          className="w-full bg-slate-300 dark:bg-zinc-700 text-black dark:text-white px-4 py-2 rounded"
        />
         <p className="text-sm text-zinc-600 dark:text-zinc-300 ">{listData.description.length}/60 characters</p>
      </div>
      
      {/* Save Changes Button */}
     <div className="flex justify-end mb-6">
        <button
            onClick={handleEditList}
            className="shadow-lg dark:shadow-gray-900 bg-slate-400/50 dark:bg-zinc-700 hover:bg-slate-400 dark:hover:bg-zinc-600 text-gray-900 dark:text-white font-semibold px-6 py-3 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isListUnchanged}>
        Save Changes
        </button>
     </div>

      {/* Flashcards Table */}
      <table className="w-full text-left mt-6 table-fixed">
        <thead>
            <tr className="text-sm text-slate-600 dark:text-gray-300 border-b-2 border-sky-800">
            <th className="py-2">English</th>
            <th className="py-2">Malay</th>
            <th className="py-2 text-right pr-4">Options</th>
            </tr>
        </thead>
        <tbody>
            {list.cards.map((card) => (
            <tr key={card.flashcardId} className="border-b">
            <td className="py-3 break-words">{card.englishWord}</td>
            <td className="py-3 break-words">{card.malayWord}</td>
            <td className="py-3 text-right pr-4 sm:space-x-3">
            <button onClick={() => handleEditCard(card)} className="text-gray-600 hover:text-blue-500 cursor-pointer">
              <FaEdit size={26} />
            </button>
            <button onClick={() => handleDeleteCard(card.flashcardId)} className="text-gray-600 hover:text-red-500 cursor-pointer">
              <FaTrash size={26}/>
            </button>
          </td>
        </tr>
        ))}
        </tbody>
      </table>

      {/* Slide-in Form */}
      <FlashcardForm
        open={showForm}
        formData={formData}
        onFormDataChange={setFormData}
        onClose={() => {setShowForm(false)}}
        onSubmit={editingCard ? handleSaveCard : handleAddCard}
        isEditing={!!editingCard}
      />

      {/* Title Empty Alert */}
      <SnackbarAlert
        open={titleEmptyError}
        onClose={() => setTitleEmptyError(false)}
        severity="error"
        message="Please fill in a title."
      />

      {/* English Empty Alert */}
      <SnackbarAlert
        open={englishEmptyError}
        onClose={() => setEnglishEmptyError(false)}
        severity="error"
        message="Please fill in English word."
      />

      {/* Malay Empty Alert */}
      <SnackbarAlert
        open={malayEmptyError}
        onClose={() => setMalayEmptyError(false)}
        severity="error"
        message="Please fill in Malay word."
      />

      {/* Card Added Alert */}
      <SnackbarAlert
        open={cardAddedSuccess}
        onClose={() => setCardAddedSuccess(false)}
        severity="success"
        message="Card added."
      />

      {/* Edit List Alert */}
      <SnackbarAlert
        open={listEditedSuccess}
        onClose={() => setListEditedSuccess(false)}
        severity="success"
        message="List edited."
      />

      {/* Edit Card Alert */}
      <SnackbarAlert
        open={cardEditedSuccess}
        onClose={() => setCardEditedSuccess(false)}
        severity="success"
        message="Card edited."
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

export default FlashcardEditPage;
