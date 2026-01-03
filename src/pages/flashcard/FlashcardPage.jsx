import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Banner from '../../components/common/Banner';
import SlidingSidebar from '../../components/common/SlidingSidebar';
import SnackbarAlert from '../../components/common/SnackbarAlert';
import FlashcardDeck from '../../components/flashcard/FlashcardDeck';
import CreateListForm from '../../components/flashcard/CreateListForm';
import useRoot from '../../hooks/common/useRoot';
import useFlashcardLists from "../../hooks/flashcard/useFlashcardLists";
import useFlashcardListManipulation from '../../hooks/flashcard/useFlashcardListManipulation';
function FlashcardPage() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [titleEmptyError, setTitleEmptyError] = useState(false)
  const [listCreatedSuccess, setListCreatedSuccess] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  /* Custom Hooks and API section */
  const { errorMessage, setErrorMessage } = useRoot();
  const { lists, setLists } = useFlashcardLists();
  const { addList, fetchLists } = useFlashcardListManipulation({ setLists, setErrorMessage })

  function handleSidebarToggle(){
    setSidebarOpen(!sidebarOpen);
  }

  async function handleCreateList() {
    if (!formData.title.trim()){
        setTitleEmptyError(true);
        return;
    }
    const newList = await addList(formData.title, formData.description);
    if(!newList) return;
    await fetchLists();
    setFormData({ title: '', description: '' });
    setShowForm(false);
    setListCreatedSuccess(true);
  };

  function handleOpenForm() {
    setShowForm(true);
    setFormData({ title: "", description: "" });
  }

  return (
    <div className="flex">
      {/* Mobile Sidebar Component */}
      <SlidingSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setSidebarOpen(false)}
          style={{ pointerEvents: "auto" }}
        />
      )}

      {/* Create List Form Overlay */}
      {showForm && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowForm(false)}
          style={{ pointerEvents: "auto" }}
        />
      )}

      {/* Main Content */}
      <div className="ml-0 sm:ml-64 flex-1 w-220 bg-slate-100 dark:bg-zinc-800 min-h-screen py-8">

        {/* Flashcard Banner */}
        <Banner header="Flashcard" title="Flashcard" onOpen={sidebarOpen} handleSidebarToggle={handleSidebarToggle} />
        
        {/* Create List Button */}
        <div className="flex justify-end mr-4 mb-6">
            <button
                onClick={handleOpenForm}
                className="shadow-lg dark:shadow-gray-800 bg-yellow-300 hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded cursor-pointer">
            Create Deck
            </button>
        </div>

        {/* Create List Form */}
        <CreateListForm
          open={showForm}
          formData={formData}
          onFormDataChange={setFormData}
          onClose={() => {
            setShowForm(false);
          }}
          onSubmit={handleCreateList}
        />

       {/* Flashcard Lists Grid */}
      <div className="mx-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
        {lists.map((list) => (
           <FlashcardDeck
                  key={list.flashcardListId}
                  list={list}
                  onOpen={(id) => navigate(`/flashcard/${id}`)}
                />
        ))}
      </div>

        {/* Success List Created Alert */}
        <SnackbarAlert
          open={listCreatedSuccess}
          onClose={() => setListCreatedSuccess(false)}
          severity="success"
          message="List created."
        />
        
        {/* Title Empty Alert */}
        <SnackbarAlert
          open={titleEmptyError}
          onClose={() => setTitleEmptyError(false)}
          severity="error"
          message="Please fill in a title."
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
    </div>
  );
};

export default FlashcardPage;
