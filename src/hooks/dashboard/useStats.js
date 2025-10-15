import { useState, useEffect } from 'react';
import { API_BASE_URL } from "../../api/apiConfig";
import { useAuth } from '../../context/AuthContext';
function useStats(){
    const { token, userId } = useAuth();
    const [dailyGoal, setDailyGoal] = useState(0);
    const [currentLevel, setCurrentLevel] = useState(0);
    const [avatar, setAvatar] = useState(0);

    useEffect(() => {
        async function fetchUserStats() {
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
                console.log("Daily goal: ", result);
                setDailyGoal(result.dailyGoal);
                setCurrentLevel(result.currentLevel);
            }
            catch(e) { 
                console.error("Failed to fetch daily goal:", error);
            }
        }
        fetchUserStats();
    }, []);
    return { dailyGoal, setDailyGoal, currentLevel };
}

export default useStats;