import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaRegWindowClose } from 'react-icons/fa';
import SentenceBuilding from '../../components/lesson/SentenceBuilding';
import MultipleChoice from '../../components/lesson/MultipleChoice';
import Listening from '../../components/lesson/Listening';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import SnackbarAlert from '../../components/common/SnackbarAlert';
import useQuestionDetail from '../../hooks/lesson/useQuestionDetail';
import useQuestionManipulation from '../../hooks/lesson/useQuestionManipulation';
import usePracticeManipulation from '../../hooks/dashboard/usePracticeManipulation';

// --- MOCK DATA (Replace with API call) ---
const mockQuestions = [
  { id: 'que_01', type: 'SENTENCE_BUILDING', prompt: 'Arrange the words to form a correct sentence.', attributes: { component_words: ['makan', 'suka', 'saya', 'nasi'], correct_sentence: 'Saya suka makan nasi.' } },
  { id: 'que_02', type: 'MULTIPLE_CHOICE', prompt: 'What is the English translation for "selamat pagi"?', attributes: { options: ['Good Night', 'Good Afternoon', 'Good Morning', 'Good Evening'], correct_answer_index: 2 } },
  { id: 'que_03', type: 'LISTENING', prompt: 'Listen to the audio and choose the correct English translation.', attributes: { reference_audio_key: 'audio/xyz.wav', options: ['I like to eat rice.', 'She likes to sleep.', 'He likes to run.'], correct_answer_index: 0 } },
];

// A mapping from the question type string to the component itself
const QUESTION_COMPONENTS = {
  SENTENCE_BUILDING: SentenceBuilding,
  MULTIPLE_CHOICE: MultipleChoice,
  LISTENING: Listening,
};

function QuestionPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const [isLoading, setIsLoading] = useState(true);
  const [answerStatus, setAnswerStatus] = useState('unanswered'); // 'unanswered', 'correct', 'incorrect'
  const [userAnswer, setUserAnswer] = useState(null);
  const [feedback, setFeedback] = useState({ open: false, message: '', severity: 'info' });

  const { questions, setQuestions} = useQuestionDetail({ lessonId });
  const { answerQuestion } = useQuestionManipulation();
  const { recordPractice } = usePracticeManipulation();

  useEffect(() => {
    if (questions){
      setIsLoading(false)
    }
  }, [lessonId]);
    
  async function handleCheckAnswer() {
   // setUserAnswer(selectedAnswer); // Store what the user chose
   if (userAnswer === null) return;
   console.log("Selected answer:", userAnswer);
    // --- This is where you would call your backend to validate the answer ---
    // For now, we'll do the logic on the frontend
    const currentQuestion = questions[currentQuestionIndex];
    let isCorrect = false;
        
    if (currentQuestion.questionType === 'MULTIPLE_CHOICE' || currentQuestion.questionType === 'LISTENING') {
        isCorrect = userAnswer === currentQuestion.attributes.correct_answer_index;
    } 
    else if (currentQuestion.questionType === 'SENTENCE_BUILDING') {
        isCorrect = userAnswer === currentQuestion.attributes.correct_sentence;
    }
    console.log("Is the answer correct?", isCorrect);
    setAnswerStatus(isCorrect ? 'correct' : 'incorrect');
    const result = await answerQuestion(currentQuestion.questionId, lessonId, userAnswer, isCorrect);
    if (!result){
      setFeedback({ open: true, message: 'Error answering question. Please try again', severity: 'error' });  
      return;
    }
  };

  function handleContinue() {
    setAnswerStatus('unanswered');
    setUserAnswer(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } 
    else {
      // Lesson finished! Navigate to a summary page.
      // alert('Lesson Complete!');
      const response = recordPractice("LESSON", lessonId);
      if (!response){
        setFeedback({ open: true, message: 'Error recording practice. Please try again', severity: 'error' });  
        return;
      }
      navigate('/lesson');
    }
  };
  
  if (isLoading) {
    return <LoadingSpinner/>;
  }

  if (questions.length === 0) {
    return (
      <div className="bg-zinc-900 min-h-screen p-4 text-white">
        {/* --- Header with just the Exit button --- */}
        <div className="flex justify-start mb-8">
            <button onClick={() => navigate('/lesson')} className="text-black dark:text-white text-xl hover:text-red-400 cursor-pointer">
                <FaRegWindowClose size={36} />
            </button>
        </div>

        {/* --- Empty State Message --- */}
        <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">This Lesson is Empty</h2>
            <p className="text-gray-400 mb-6">
                Questions are being prepared. Please check back later!
            </p>
            <button
                onClick={() => navigate('/lesson')}
                className="px-6 py-3 bg-purple-600 font-bold rounded-lg hover:bg-purple-700"
            >
                Back to Lessons
            </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const ActiveQuestionComponent = QUESTION_COMPONENTS[currentQuestion.questionType];
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isCheckButtonDisabled = userAnswer === null ;
  const isReviewModeForCurrentQuestion = currentQuestion.completed;
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-zinc-900">
      {/* Header with Progress Bar */}
      <header className="p-4">
        <div className="flex items-center gap-4 max-w-3xl mx-auto">
            <button onClick={() => navigate('/lesson')} className="text-black dark:text-white text-xl hover:text-red-400 cursor-pointer">
                <FaRegWindowClose size={36} />
            </button>
          <div className="w-full bg-slate-300 dark:bg-zinc-700 rounded-full h-4">
            <div className="bg-purple-600 h-4 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>
      </header>

      {/* Main Question Area */}
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-3xl p-4">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-8">{currentQuestion.promptText}</h2>
          {ActiveQuestionComponent && (
            <ActiveQuestionComponent 
              key={currentQuestion.questionId} // Add key to force re-mount on question change
              question={currentQuestion}
              onSelectAnswer={setUserAnswer} 
              answerStatus={answerStatus}
              userAnswer={userAnswer}
            />
          )}
        </div>
      </main>

      {/* Footer for Feedback */}
      <footer className={`p-4 transition-colors duration-300
        ${answerStatus === 'correct' ? 'bg-green-300 dark:bg-green-900' : ''}
        ${answerStatus === 'incorrect' ? 'bg-red-300 dark:bg-red-900' : ''}
      `}>
        <div className="max-w-3xl mx-auto">
         {isReviewModeForCurrentQuestion ? (
            <button
              onClick={handleContinue}
              className="w-full py-3 px-6 bg-blue-500 text-white font-bold rounded-lg cursor-pointer hover:opacity-80"
            >
              {currentQuestionIndex < questions.length - 1 ? 'Continue' : 'Finish Review'}
            </button>
          ) : (
            // Otherwise, use the existing practice mode logic
            <>
              {answerStatus === 'unanswered' ? (
                <button
                  onClick={handleCheckAnswer}
                  id="check-button"
                  disabled={isCheckButtonDisabled}
                  className={`w-full py-3 px-6 bg-yellow-400 text-black font-bold rounded-lg ${isCheckButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-80'}`}
                >
                  Check
                </button>
              ) : (
                <button
                  onClick={handleContinue}
                  className={`w-full py-3 px-6 font-bold rounded-lg cursor-pointer
                    ${answerStatus === 'correct' ? 'bg-green-500 text-white' : 'bg-red-500 text-white hover:opacity-80'}
                  `}
                >
                 {currentQuestionIndex < questions.length - 1 ? 'Continue' : 'Finish Lesson'}
                </button>
              )}
            </>
          )}
        </div>
      </footer>

      <SnackbarAlert
        open={feedback.open}
        onClose={() => setFeedback({ ...feedback, open: false })}
        severity={feedback.severity}
        message={feedback.message}
      />
    </div>
  );
}

export default QuestionPage;