import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../api/apiConfig";
import { useAuth } from '../../context/AuthContext';
function useListedChallengersDetail() {
    const { token, userId } = useAuth();
    const [listedChallengers, setListedChallengers] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try{
                const response = await fetch(`${API_BASE_URL}/lobby/${userId}/challengers`, {
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
                
                const listedChallengers = await response.json();
                //console.log("Listed challengers: ", listedChallengers);
                setListedChallengers(listedChallengers);
                
            } catch (error) {
                console.error("Failed to fetch owned characters:", error);
            }
        }   
        fetchData();
    }, []);

  return { listedChallengers, setListedChallengers };
}

export default useListedChallengersDetail;