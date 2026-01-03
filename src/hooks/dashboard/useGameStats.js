import { useState, useEffect } from 'react';
import { API_BASE_URL } from "../../api/apiConfig";
import { useAuth } from '../../context/AuthContext';
function useGameStats(){
    const { token, userId } = useAuth();
    const [dailyGoal, setDailyGoal] = useState(0);
    const [currentLevel, setCurrentLevel] = useState(1); // to avoid view glitching on character unlock page load
    const [currentExp, setCurrentExp] = useState(0);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        async function fetchGameStats() {
            try{
                const response = await fetch(`${API_BASE_URL}/stats/${userId}`, {
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
                console.log("Game stats: ", result);
                setDailyGoal(result.dailyGoal);
                setCurrentLevel(result.currentLevel);
                setCurrentExp(result.currentExp);
            }
            catch(error) { 
                console.error("Failed to fetch game stats:", error);
            }
        }
        fetchGameStats();
        setIsLoading(false);
    }, []);
    return { isLoading, dailyGoal, setDailyGoal, currentLevel, currentExp };
}

export default useGameStats;