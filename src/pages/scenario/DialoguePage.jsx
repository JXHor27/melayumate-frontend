import React, { useState, useEffect } from 'react';
import { FaRegEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import DialogueMessage from '../../components/scenario/DialogueMessage';
import SnackbarAlert from '../../components/common/SnackbarAlert';
import { useAuth } from '../../context/AuthContext';
import useRoot from '../../hooks/common/useRoot';
import useScenarioDetail from '../../hooks/scenario/useScenarioDetail';
import usePracticeManipulation from '../../hooks/dashboard/usePracticeManipulation';
import usePrimaryCharacterDetail from '../../hooks/game/usePrimaryCharacterDetail';
import useStatsManipulation from '../../hooks/dashboard/useStatsManipulation';

function DialoguePage() {
  const { username } = useAuth();
  const navigate = useNavigate();
  const { scenarioId } = useParams();
  const [messages, setMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { errorMessage, setErrorMessage } = useRoot();
  const [dialogueEmptyError, setDialogueEmptyError] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  
  const { scenario } = useScenarioDetail({ scenarioId });
  const { recordPractice } = usePracticeManipulation();
  const { primaryCharacter } = usePrimaryCharacterDetail();
  const { addExp } = useStatsManipulation();

  const isConversationFinished = currentIndex >= scenario.dialogues.length;

  useEffect(() => {
      if (!primaryCharacter.imageUrl) {
        setImageUrl(username.charAt(0).toUpperCase());
      }
      else {
        setImageUrl(primaryCharacter.imageUrl);
      }
  }, [primaryCharacter]);

  function handleNext() {
    if (scenario.dialogues.length === 0) {
      setDialogueEmptyError(true);
      return;
    }
    if (currentIndex < scenario.dialogues.length) {
      setMessages(prev => [...prev, scenario.dialogues[currentIndex]]);
      setCurrentIndex(prev => prev + 1);
    }
  };

  async function handleFinish() {
    const response = await recordPractice("DIALOGUE", scenarioId);
    if(!response) 
      return;
    navigate('/situation');
  }

  return (
     <div className="min-h-screen bg-slate-300 dark:bg-zinc-700 text-white p-6">
        {/* Header buttons */}
        <div className="flex justify-between items-center mb-6">
            <button
              title='Back to Scenario List'
              onClick={() => navigate('/situation')}
              className="text-black dark:text-white text-xl hover:text-blue-400 cursor-pointer"> 
              <FaArrowLeft size={36}/>
            </button>
            <button
                title='Edit Scenario'
                className="text-black dark:text-white text-black px-3 py-2 rounded hover:text-blue-400 cursor-pointer"
                onClick={() => navigate(`/situation/${scenarioId}/edit`)}>
                <FaRegEdit size={36}/>
            </button> 
        </div>

        {/* Dialogue Container */}
        {scenarioId != 101 && (<div className="flex flex-col h-screen bg-slate-200 dark:bg-zinc-800 p-4 rounded-4xl">
            <h1 className="text-center text-gray-800 dark:text-gray-200 text-xl mb-4">{scenario.title}</h1>
      
            {/* Chat Area */}
            <div className="flex-grow overflow-y-auto space-y-6 p-2 sm:p-4 border-t-1 border-black dark:border-white">
                {messages.map((dialogue) => (
                    <DialogueMessage
                        key={dialogue.dialogueId}
                        sender={dialogue.dialogueType}
                        text={dialogue.malay}
                        translation={dialogue.english}
                        avatarSrc={imageUrl}
                        userInitial="U" // You can make this dynamic
                        audioSrc={dialogue.audioUrl}
                />
                ))}
 
            </div>

            {/* Control Area */}
            <div className="flex-shrink-0 pt-4 border-t border-gray-700">
                {currentIndex == 0 && (
                <button
                  onClick={handleNext}
                  className={"text-black w-full py-4 text-lg font-bold rounded-xl bg-gradient-to-br from-green-300 to-emerald-500  cursor-pointer"}>
                 Start
                </button>
                )}
                {currentIndex != 0 && (!isConversationFinished ? 
                <button
                onClick={handleNext}
                className={"w-full py-4 text-lg font-bold rounded-xl bg-gradient-to-br from-green-300 to-emerald-500  cursor-pointer text-black"}
                >
                  Continue
                </button>
                :
                <button
                onClick={handleFinish}
                className={"w-full py-4 text-lg font-bold rounded-xl bg-gradient-to-br from-green-300 to-emerald-500  cursor-pointer text-black"}
                >
                  Finish Practice
                </button>
                )}
            </div>
        </div>)}

         {/* Dialogue Empty Alert */}
          <SnackbarAlert
            open={dialogueEmptyError}
            onClose={() => setDialogueEmptyError(false)}
            severity="error"
            message="Please add a dialogue first."
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

export default DialoguePage;