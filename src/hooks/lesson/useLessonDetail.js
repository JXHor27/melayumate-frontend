import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../api/apiConfig";
import { useAuth } from '../../context/AuthContext';

function useLessonDetail() {
    const { token, userId } = useAuth();
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try{
                const response = await fetch(`${API_BASE_URL}/lessons/available/${userId}`, {
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

                const lessons = await response.json();
                //console.log("Lesson practice : ", lessons);
                setLessons(lessons);
                
            } catch(error) { 
                console.error("Failed to fetch lesson practice:", error);
            }
        }   
        fetchData();
    }, []);

  return { lessons, setLessons };
}

export default useLessonDetail;