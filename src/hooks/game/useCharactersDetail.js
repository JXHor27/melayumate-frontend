import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../api/apiConfig";
import { useAuth } from '../../context/AuthContext';
function useCharactersDetail() {
    const { token, userId } = useAuth();
    const [ownedCharacters, setOwnedCharacters] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try{
                const response = await fetch(`${API_BASE_URL}/character/${userId}/owned`, {
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
                
                const ownedCharacters = await response.json();
                console.log("Owned characters: ", ownedCharacters);
                setOwnedCharacters(ownedCharacters);
                
            } catch (error) {
                console.error("Failed to fetch owned characters:", error);
            }
        }   
        fetchData();
    }, []);

  return { ownedCharacters, setOwnedCharacters };
}

export default useCharactersDetail;