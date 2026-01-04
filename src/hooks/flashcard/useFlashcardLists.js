import { useState, useEffect } from 'react';
import { API_BASE_URL } from "../../api/apiConfig";
import { useAuth } from '../../context/AuthContext';
function useFlashcardLists(){
    const { token, userId } = useAuth();
    const [lists, setLists] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try{
                const response = await fetch(`${API_BASE_URL}/lists/user/${userId}`, {
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
                const records = await response.json();
                //console.log("Card lists: ", records);
                setLists(records);
            }
            catch(error) { 
                console.error("Failed to fetch card lists:", error);
            }
        }
        fetchData();
    }, []);
    return { lists, setLists };
}

export default useFlashcardLists;