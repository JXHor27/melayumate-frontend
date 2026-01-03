import { API_BASE_URL } from "../../api/apiConfig";
import { useAuth } from '../../context/AuthContext';
function useQuestionManipulation() {
  const { token, userId } = useAuth();

  // Answer a question //
  async function answerQuestion(questionId, lessonId, selectedAnswer, isCorrect) {
    try{
      const response = await fetch(`${API_BASE_URL}/questions/answer`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            userId: userId,
            questionId: questionId,
            lessonId: lessonId,
            selectedAnswer: selectedAnswer,
            correct: isCorrect
          })
      });
      if (!response.ok) {
        const errorData = await response.json();
        const message = `An error occurred: ${errorData.message}`;
        console.error(message);
        return;
      }
      const result = await response.json();
      console.log("Question answered successfully:", result);
      return result;
    } catch (error) {
        console.error("Failed to answer question:", error);
    }

  }


   // Get Battle Results //
  async function fetchBattleLog(battleId) {
    try{
      const response = await fetch(`${API_BASE_URL}/battle/result/${battleId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
      });
      if (!response.ok) {
        const errorData = await response.json();
        const message = `An error occurred: ${errorData.message}`;
        console.error(message);
        return;
      }
      const result = await response.json();
      console.log("Battle log fetched successfully:", result);
      return result;
    } catch (error) {
        console.error("Failed to fetch battle log:", error);
    }

  }
  return { answerQuestion, fetchBattleLog };
}

export default useQuestionManipulation;