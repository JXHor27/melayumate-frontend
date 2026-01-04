import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../api/apiConfig";
import { useAuth } from '../../context/AuthContext';

function useQuestionDetail({ lessonId }) {
    const { token, userId } = useAuth();
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try{
                const response = await fetch(`${API_BASE_URL}/questions/${userId}/${lessonId}`, {
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

                const questions = await response.json();
                const parsedQuestions = questions.map(question => ({
                    ...question, 
                    attributes: JSON.parse(question.attributes) 
                }));
                //console.log("Questions practice : ", parsedQuestions);
                setQuestions(parsedQuestions);
                
            } catch(error) { 
                console.error("Failed to fetch questions practice:", error);
            }
        }   
        fetchData();
    }, []);

  return { questions, setQuestions };
}

export default useQuestionDetail;