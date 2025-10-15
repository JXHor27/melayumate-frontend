import React, { useState, useEffect, use } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit, FaPlus, FaArrowLeft, FaRegWindowClose, FaMicrophone } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import useRoot from '../../hooks/common/useRoot';
import useAudioFileManipulation from '../../hooks/scenario/useAudioFileManipulation';
import useDialogueManipulation from '../../hooks/scenario/useDialogueManipulation';
import useScnarioManipulation from '../../hooks/scenario/useScenarioManipulation';
import useScenarioDetail from '../../hooks/scenario/useScenarioDetail';
import DialogueForm from '../../components/scenario/DialogueForm';
import SnackbarAlert from '../../components/common/SnackbarAlert';
import ConfirmDialog from '../../components/common/ConfirmDialog';
const ScenarioEditPage = () => {
  const { scenarioId } = useParams();
  const navigate = useNavigate();

  /* Error handling alert section */
  const [titleEmptyError, setTitleEmptyError] = useState(false);
  const [englishEmptyError, setEnglishEmptyError] = useState(false);
  const [malayEmptyError, setMalayEmptyError] = useState(false);
  const [orderEmptyError, setOrderEmptyError] = useState(false);
  const [dialogueAddedSuccess, setDialogueAddedSuccess] = useState(false);
  const [dialogueDeletedSuccess, setDialogueDeletedSuccess] = useState(false);
  const [scenarioEditedSuccess, setScenarioEditedSuccess] = useState(false);
  const [dialogueConflictError, setDialogueConflictError] = useState(false);
  const [dialogueConflictMessage, setDialogueConflictMessage] = useState('');

  /* Form handling section */
  const [showForm, setShowForm] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioObjectUrl, setAudioObjectUrl] = useState(null);
  const [recordAudioBlob, setRecordAudioBlob] = useState(null);
  const [recordUrl, setRecordUrl] = useState(null);
  const [dialogueType, setDialogueType] = useState("QUESTION"); // "QUESTION" or "RESPONSE"
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [formData, setFormData] = useState({
    scenarioId: '',    
    english: '',
    malay: '',
    dialogueOrder: '',
    dialogueType: ''
  });
  const [scenarioData, setScenarioData] = useState({
      title: '',
      description: ''
  });

  /* Custom Hooks and API section */
  const { errorMessage, setErrorMessage } = useRoot();
  const { scenario, setScenario } = useScenarioDetail({ scenarioId });
  const { uploadAudio, deleteAudio } = useAudioFileManipulation();
  const { addDialogue, deleteDialogue, fetchDialogues } = useDialogueManipulation({ setScenario, setDialogueConflictError, setDialogueConflictMessage });
  const { editScenario, deleteScenario } = useScnarioManipulation({ setScenario });

  const isScenarioUnchanged =
      scenarioData &&
      scenarioData.title === scenario.title &&
      scenarioData.description === scenario.description;
  
  useEffect(() => {
    setScenarioData({
        title: scenario.title,
        description: scenario.description
    })
  }, [scenario]);

  function handleAudioBlob(blob) {
    setAudioBlob(blob);
  };

  function handleAudioObjectUrl(url) {
    setAudioObjectUrl(url)
  }

  function handleRecordBlob(blob) {
    setRecordAudioBlob(blob);
  };

  function handleRecordUrl(url) {
    setRecordUrl(url);
  }
  
  function handleDialogueType(type) {
    setDialogueType(type);
    setFormData({ ...formData,  dialogueType: type });
  }

  useEffect(() => {
    setDialogueType("QUESTION");
    setFormData({ malay: '', english: '', dialogueOrder: '',  dialogueType: "QUESTION" });
  }, [])

  function handleOpenForm() {
    setShowForm(true);
    setDialogueType("QUESTION");
    setFormData({ malay: '', english: '', dialogueOrder: '',  dialogueType: "QUESTION" });
    setAudioBlob(null);
    setAudioObjectUrl(null);
    setRecordAudioBlob(null);
    setRecordUrl(null);
  }

  function handleCloseForm() {
    setShowForm(false);
  }

  async function handleAddDialogue(formData, scenarioId, audioUrl) {
    const dialogue = await addDialogue(formData, scenarioId, audioUrl);
    if (!dialogue)
      return;
    await fetchDialogues(scenarioId);
    handleCloseForm();
    setDialogueAddedSuccess(true);
  }

  async function handleSubmit() {
    try {
      if (!formData.english.trim()){
        setEnglishEmptyError(true);
        return;
      }
      if (!formData.malay.trim()){
        setMalayEmptyError(true);
        return;
      }
      if (!formData.dialogueOrder.trim()){
        setOrderEmptyError(true);
        return;
      }
      var audioUrl = null;
      if (!audioBlob && !recordAudioBlob) {
        console.log("No audio to upload.");
        audioUrl = null;
      } else if (!audioBlob && recordAudioBlob) {
        console.log("Uploading recorded audio to S3...");
        audioUrl = await uploadAudio(recordAudioBlob);
      } else{
        console.log("Uploading AI-generated audio to S3...");
        audioUrl = await uploadAudio(audioBlob);
      }

      await handleAddDialogue(formData, scenarioId, audioUrl);

    } catch (error) {
      console.error("An error occurred during submission:", error);  
    }
  }

  // Delete Dialogue //
  async function handleDeleteDialogue(dialogue) {
    await deleteAudio(dialogue.objectKey);
    await deleteDialogue(dialogue.dialogueId);
    setDialogueDeletedSuccess(true);
  }

  // Edit Scenario //
  async function handleEditScenario(){
     if (!scenarioData.title.trim()){
      setTitleEmptyError(true)
      return;
    }
    await editScenario(scenario.id, scenarioData.title, scenarioData.description);
    setScenario(prev => ({
        ...prev,
        title: scenarioData.title,
        description: scenarioData.description
    }));
    setScenarioEditedSuccess(true);
  }

  async function handleDeleteScenario() {
    await deleteScenario(scenario.id);
    navigate('/situation');
  };

  function handleOrderChange(e) {
    const value = e.target.value;
    if (value === '') {
      setFormData({ ...formData, dialogueOrder: '' });
      return;
    }
    const numValue = Number(value);
    if (Number.isInteger(numValue) && numValue >= 1 && numValue <= 5) {
      setFormData({ ...formData, dialogueOrder: value });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-4 sm:p-6 relative">
  
     {/* Create Dialogue Form Overlay */}
      {showForm && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowForm(false)}
          style={{ pointerEvents: "auto" }}
        />
      )}

      {/* Top buttons */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(`/situation/${scenarioId}`)}
          className="text-white text-xl hover:text-red-400 cursor-pointer"> 
            <FaRegWindowClose size={36}/>
        </button>
        <div className="flex gap-2">
          <button
            onClick={handleOpenForm}
            className="bg-yellow-300 hover:bg-yellow-400 text-black px-4 py-2 font-semibold rounded cursor-pointer"
          >
            Add Dialogue
          </button>
          <button
            onClick={() => setConfirmDelete(true)}
            className="text-white px-4 py-2 rounded hover:text-blue-400 cursor-pointer"
          >
            <FaTrash size={26} />
          </button>
        </div>
      </div>

      {/* Editable list title/description */}
      <div className="mb-1">
        <input
          type="text"
          maxLength={20}
          value={scenarioData.title}
          onChange={(e) => setScenarioData({ ...scenarioData, title: e.target.value})}
          placeholder="Title"
          className="w-full text-xl font-bold bg-zinc-700 text-white px-4 py-2 rounded"
        />
        <p className="text-sm text-zinc-400 mb-3">{scenarioData.title.length}/20 characters</p>
        <input
          type="text"
          value={scenarioData.description}
          maxLength={60}
          onChange={(e) => setScenarioData({ ...scenarioData, description: e.target.value})}
          placeholder="Description (Optional)"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded"
        />
         <p className="text-sm text-zinc-400 ">{scenarioData.description.length}/60 characters</p>
      </div>
      {/* Save Changes Button */}
      <div className="flex justify-end mb-6">
          <button
              onClick={handleEditScenario}
              className="bg-zinc-700 hover:bg-zinc-600 text-white font-semibold px-6 py-3 rounded shadow cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isScenarioUnchanged}>
          Save Changes
          </button>
      </div>

      {/* Scenario Questions List */}
      <table className="w-full text-left mt-6 table-fixed">
        <thead>
            <tr className="text-sm text-gray-300 border-b-2 border-sky-800">
            <th className="py-2 pr-1">Malay</th>
            <th className="py-2 pr-1">English</th>
            <th className="py-2 text-right sm:text-left pr-1">Type</th>
            <th className="py-2 text-right sm:text-left pr-1">Order</th>
            <th className="py-2 text-right pr-4">Options</th>
            </tr>
        </thead>
        <tbody>
            {scenario.dialogues.map((dialogue) => (
            <tr key={dialogue.dialogueId} className="border-b">
            <td className="py-3 pr-2 w-3/8 text-sm sm:text-base sm:w-2/6 break-words">{dialogue.malay}</td>
            <td className="py-3 pr-2 w-3/8 text-sm sm:text-base sm:w-2/6 break-words">{dialogue.english}</td>
            <td className="py-3 text-right text-sm sm:text-base sm:text-left pr-1 w-1/8 sm:w-1/6">{dialogue.dialogueType}</td>
            <td className="py-3 text-right sm:text-left pr-1 w-1/8 sm:w-1/6">{dialogue.dialogueOrder}</td>
            <td className="py-3 text-right pr-4 space-x-3">
            <button onClick={() => handleDeleteDialogue(dialogue)} className="text-gray-600 hover:text-red-500 cursor-pointer">
              <FaTrash size={26}/>
            </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>

      {/* Sliding Dialogue Creation Form */}
      <DialogueForm
        open={showForm}
        formData={formData}
        setFormData={setFormData}
        onClose={(handleCloseForm)}
        onSubmit={handleSubmit}
        handleOrderChange={handleOrderChange}
        handleAudioBlob={handleAudioBlob}
        audioObjectUrl={audioObjectUrl}
        handleAudioObjectUrl={handleAudioObjectUrl}
        handleRecordBlob={handleRecordBlob}
        handleRecordUrl={handleRecordUrl}
        recordUrl={recordUrl}
        dialogueType={dialogueType}
        handleDialogueType={handleDialogueType}
      />

      {/* Scenario Delete Confirmation */}
      <ConfirmDialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={handleDeleteScenario}
        title="Confirm Deletion"
        message="Are you sure you want to delete this scenario?"
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

      {/* Malay Empty Alert */}
      <SnackbarAlert
        open={orderEmptyError}
        onClose={() => setOrderEmptyError(false)}
        severity="error"
        message="Please fill in order."
      />

      {/* Dialogue Added Alert */}
      <SnackbarAlert
        open={dialogueAddedSuccess}
        onClose={() => setDialogueAddedSuccess(false)}
        severity="success"
        message="Dialogue added."
      />

      {/* Dialogue Added Alert */}
      <SnackbarAlert
        open={dialogueDeletedSuccess}
        onClose={() => setDialogueDeletedSuccess(false)}
        severity="success"
        message="Dialogue deleted."
      />

      {/* Edit Scenario Alert */}
      <SnackbarAlert
        open={scenarioEditedSuccess}
        onClose={() => setScenarioEditedSuccess(false)}
        severity="success"
        message="Scenario edited."
      />

       {/* Dialogue Conflict Alert */}
      <SnackbarAlert
        open={dialogueConflictError}
        anchorOrigin = {{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2500}
        onClose={() => setDialogueConflictError(false)}
        severity="error"
        message={dialogueConflictMessage}
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

export default ScenarioEditPage;
