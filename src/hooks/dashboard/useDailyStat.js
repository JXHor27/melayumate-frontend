import { useState, useEffect } from 'react';
import { API_BASE_URL } from "../../api/apiConfig";
import { useAuth } from '../../context/AuthContext';
function useDailyStat(){
    const { token, userId } = useAuth();
    const [flashcardDone, setFlashcardDone] = useState(0);
    const [dialogueDone, setDialogueDone] = useState(0);
    const [lessonDone, setLessonDone] = useState(0)

    useEffect(() => {
        async function fetchDailyStat() {
            try{
                const response = await fetch(`${API_BASE_URL}/practice/${userId}`, {
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
                console.log("Daily stat: ", result);
                setFlashcardDone(result.flashcardDone);
                setDialogueDone(result.dialogueDone);
                setLessonDone(result.lessonDone);
            }
            catch(e) { 
                console.error("Failed to fetch daily goal:", error);
            }
        }
        fetchDailyStat();
    }, []);
    return { flashcardDone, dialogueDone, lessonDone };
}

export default useDailyStat;