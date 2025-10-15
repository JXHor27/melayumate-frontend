import { API_BASE_URL } from "../../api/apiConfig";
import { useAuth } from '../../context/AuthContext';

function useDailyGoalManipulation({ setDailyGoal }) {

    const { token, userId } = useAuth();

    // Create Goal
    async function createGoal(goal) {
        try{
            const response = await fetch(`${API_BASE_URL}/stats`, {
                method:"PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    userId: userId, 
                    dailyGoal: goal 
                }),
            });
            if (!response.ok) { 
                const errorData = await response.json();
                const message = `An error occurred: ${errorData.message}`;
                console.error(message);
                return null;
            }
            const result = await response.json();
            console.log("New goal added: ", result);
            return result;
        } catch (error) {
            console.error("Failed to create goal:", error);
        }
    };

    // Fetch goal
    // after new goal updated, re-fetch 
    // (avoid using initial useEffect as API calls are duplicated)
    async function fetchGoal() {
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
        }
        catch(e) { 
            console.error("Failed to fetch daily goal:", error);
        }
    }

    return { createGoal, fetchGoal };

}

export default useDailyGoalManipulation;