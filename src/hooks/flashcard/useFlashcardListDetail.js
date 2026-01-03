import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../api/apiConfig";
import { useAuth } from '../../context/AuthContext';

function useFlashcardListDetail({ listId }) {
    const { token } = useAuth();
    const [list, setList] = useState({
        id: null,
        title: "",
        description: "",
        cards: [],
    });

    useEffect(() => {
        async function fetchData() {
            try{
                const listResp = await fetch(`${API_BASE_URL}/lists/${listId}`, {
                    method: 'GET', 
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                const cardsResp = await fetch(`${API_BASE_URL}/cards/${listId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!listResp.ok) {
                    const errorData = await listResp.json();
                    const message = `An error occurred: ${errorData.message}`;
                    console.error(message);
                    return;
                }
                if (!cardsResp.ok) {
                    const errorData = await cardsResp.json();
                    const message = `An error occurred: ${errorData.message}`;
                    console.error(message);
                    return;
                }
                
                const listData = await listResp.json();
                const cardsData = await cardsResp.json();
                console.log("list data: ", listData);
                console.log("card data: ", cardsData);
                setList({
                    id: listData.flashcardListId,
                    title: listData.title,
                    description: listData.description,
                    random: listData.random,
                    defaultLanguage: listData.defaultLanguage,
                    cards: cardsData,
                });
                
            } catch(error) { 
                console.error("Failed to fetch list and cards:", error);
            }
        }   
        fetchData();
    }, []);

  return { list, setList };
}

export default useFlashcardListDetail;