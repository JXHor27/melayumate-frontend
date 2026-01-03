import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../api/apiConfig";
import { useAuth } from '../../context/AuthContext';
function usePrimaryCharacterDetail() {
    const { token, userId } = useAuth();
    // just a placeholder structure for primaryCharacter to avoid null references errors
    const [primaryCharacter, setPrimaryCharacter] = useState({
        characterId: null,
        characterName: null,
        characterStatus: null,
        characterType: null,
        imageUrl: null,
        listedAt: null,
        primary: true
    });

    useEffect(() => {
        async function fetchData() {
            try{
                const response = await fetch(`${API_BASE_URL}/character/${userId}/primary`, {
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
                
                const primaryCharacter = await response.json();
                console.log("Primary character: ", primaryCharacter);
                setPrimaryCharacter(primaryCharacter);
                return primaryCharacter;

            } catch (error) {
                console.error("Failed to fetch primary character:", error);
            }
        }   
        fetchData();
    }, []);

  return { primaryCharacter, setPrimaryCharacter };
}

export default usePrimaryCharacterDetail;