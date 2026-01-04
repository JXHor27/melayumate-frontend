import { API_BASE_URL } from "../../api/apiConfig";
import { useAuth } from '../../context/AuthContext';

function useStatsManipulation() {

    const { token, userId } = useAuth();

    // Create Goal
    async function createGoal(goal) {
        try{
            const response = await fetch(`${API_BASE_URL}/stats/goal`, {
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
            //console.log("New goal added: ", result);
            return result;
        } catch (error) {
            console.error("Failed to create goal:", error);
        }
    };

    // Add EXP
    async function addExp(expAmount) {
        try{
            const response = await fetch(`${API_BASE_URL}/stats/${userId}/exp`, {
                method:"PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    expAmount: expAmount
                }),
            });
            if (!response.ok) { 
                const errorData = await response.json();
                const message = `An error occurred: ${errorData.message}`;
                console.error(message);
                return null;
            }
            const result = response.status;
            //console.log("EXP added result status code: ", result);
            return result;
        } catch (error) {
            console.error("Failed to add EXP:", error);
        }
    };



    // Fetch stats
    // after new goal updated, re-fetch stats
    // (avoid using initial useEffect as API calls are duplicated)
    async function fetchStats() {
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
            //console.log("Fetched game stats: ", result);
            return result;
            // setDailyGoal(result.dailyGoal);
        }
        catch(e) { 
            console.error("Failed to fetch daily goal:", error);
        }
    }

    return { createGoal, addExp, fetchStats };

}

export default useStatsManipulation;