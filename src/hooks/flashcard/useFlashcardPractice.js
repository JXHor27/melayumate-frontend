import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../api/apiConfig";
import { useAuth } from '../../context/AuthContext';

function useFlashcardPractice({ listId }) {
    const { token } = useAuth();
    const [list, setList] = useState({
        id: null,
        title: "",
        description: "",
        random: false,
        defaultLanguage: "ENGLISH",
        cards: [],
    });

    useEffect(() => {
        async function fetchData() {
            try{
                const response = await fetch(`${API_BASE_URL}/cards/${listId}/practice`, {
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

                const data = await response.json();
                console.log("flashcard practice : ", data);
                setList({
                    id: data.flashcardListId,
                    title: data.title,
                    description: data.description,
                    random: data.random,
                    defaultLanguage: data.defaultLanguage,
                    cards: data.cards
                });
                
            } catch(error) { 
                console.error("Failed to fetch practice cards:", error);
            }
        }   
        fetchData();
    }, []);

  return { list, setList };
}

export default useFlashcardPractice;