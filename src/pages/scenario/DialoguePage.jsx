import React, { useState, useEffect, useRef } from 'react';
import { FaRegEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import chat from '../../assets/images/ground-bot.png';
import DialogueMessage from '../../components/scenario/DialogueMessage';
import SnackbarAlert from '../../components/common/SnackbarAlert';
import useRoot from '../../hooks/common/useRoot';
import useScenarioDetail from '../../hooks/scenario/useScenarioDetail';
import usePracticeManipulation from '../../hooks/dashboard/usePracticeManipulation';
 const DialoguePage = () => {
  const navigate = useNavigate();
  const { scenarioId } = useParams();
  const [messages, setMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const chatEndRef = useRef(null);

  const { errorMessage, setErrorMessage } = useRoot();
  const { scenario } = useScenarioDetail({ scenarioId });
  const { recordPractice } = usePracticeManipulation();

  const isConversationFinished = currentIndex >= scenario.dialogues.length;

    // const sortDialogueData = (data) => {
    //     if (!data || !Array.isArray(data)) return []; // Guard against invalid input

    //     return [...data].sort((a, b) => {
    //         const orderA = Number(a.questionOrder);
    //         const orderB = Number(b.questionOrder);
    //         if (orderA !== orderB) {
    //             return orderA - orderB;
    //         }
    //         const typePriority = { 'question': 0, 'response': 1 };
    //         return typePriority[a.questionType] - typePriority[b.questionType];
    //     });
    // };


  // Automatically scroll to the bottom when new messages are added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  const handleNext = () => {
    if (currentIndex < scenario.dialogues.length) {
      setMessages(prev => [...prev, scenario.dialogues[currentIndex]]);
      setCurrentIndex(prev => prev + 1);
    }
  };

  async function handleFinish() {
    const response = await recordPractice("DIALOGUE");
    if(!response) 
      return;
    navigate('/situation');
    // const response = await fetch('http://localhost:8080/user/today/stat/scenario', {
    //       method:"POST",
    //       headers: {
    //           "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //       scenarioDone: 1
    //       }),
    // });
    // if (!response.ok) {
    //     const message = `An error occurred: ${response.statusText}`;
    //     console.error(message);
    //     return;
    // }

    // const expResponse = await fetch('http://localhost:8080/user/today/stat/exp', {
    //       method:"POST",
    //       headers: {
    //           "Content-Type": "application/json",
    //       },
    //        body: JSON.stringify({
    //       currentEXP: 2
    //       }),
    // });
    // if (!expResponse.ok) {
    //     const message = `An error occurred: ${expResponse.statusText}`;
    //     console.error(message);
    //     return;
    // }
    // navigate(`/situation`)
  }

  return (
     <div className="min-h-screen bg-zinc-800 text-white p-6">
        {/* Header buttons */}
        <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => navigate('/situation')}
              className="text-white text-xl hover:text-blue-400 cursor-pointer"> 
              <FaArrowLeft size={36}/>
            </button>
            <button
                className="text-white text-black px-3 py-2 rounded hover:text-blue-400 cursor-pointer"
                onClick={() => navigate(`/situation/${scenarioId}/edit`)}>
                <FaRegEdit size={36}/>
            </button> 
        </div>

        {/* Dialogue Container */}
        {scenarioId != 101 && (<div className="flex flex-col h-screen bg-zinc-950 p-4 rounded-4xl">
            <h1 className="text-center text-gray-200 text-xl mb-4">{scenario.title}</h1>
      
            {/* Chat Area */}
            <div className="flex-grow overflow-y-auto space-y-6 p-4 border-t-1 border-white">
                {messages.map((dialogue) => (
                    <DialogueMessage
                        key={dialogue.dialogueId}
                        sender={dialogue.dialogueType}
                        text={dialogue.malay}
                        translation={dialogue.english}
                        avatarSrc={chat}
                        userInitial="U" // You can make this dynamic
                        audioSrc={dialogue.audioUrl}
                />
                ))}
            {/* Empty div to help scroll to the bottom */}
            <div ref={chatEndRef} />
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
                  Finish <span className='text-base'>(+2 EXP)</span>
                </button>
                )}
            </div>
        </div>)}

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