import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../api/apiConfig";
import { useAuth } from '../../context/AuthContext';
function useUnlockableCharactersDetail({ currentLevel }) {
    const { token } = useAuth();
    const [charactersTemplate, setCharactersTemplate] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try{
                const response = await fetch(`${API_BASE_URL}/character/unlock/${currentLevel}`, {
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
                const templates = await response.json();
                //console.log("Characters template: ", templates);
               
                setCharactersTemplate(templates);
                
            } catch (error) {
                console.error("Failed to fetch character templates:", error);
            }
        }   
        fetchData();
    }, [currentLevel]);

  return { charactersTemplate };
} 

export default useUnlockableCharactersDetail;