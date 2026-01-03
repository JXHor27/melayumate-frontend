import { API_BASE_URL } from "../../api/apiConfig";
import { useAuth } from '../../context/AuthContext';
function useScnarioManipulation( { setScenarioList } ) {
    const { token, userId } = useAuth();

    // Create Scenario // 
    async function createScenario(title, description) {
        try{
            const response = await fetch(`${API_BASE_URL}/scenario`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    userId: userId,
                    title: title,
                    description: description
                })
            });
            if (!response.ok) {
                const errorData = await response.json();
                const message = `An error occurred: ${errorData.message}`;
                console.error(message);
                return;
            }
            const createdScenario = await response.json();
            console.log("Created scenario:", createdScenario);
        }
        catch (error) {
            console.error("Failed to create scenario:", error);
        }
    }

    // Edit Scenario //
    async function editScenario(scenarioId, title, description) {
        try{
            const response = await fetch(`${API_BASE_URL}/scenario/${scenarioId}`, {
                method:"PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    userId: userId,
                    title: title,
                    description: description
                }),
            });
             if (!response.ok) {
                const errorData = await response.json();
                const message = `An error occurred: ${errorData.message}`;
                console.error(message);
                return;
            }
            const updatedScenario = await response.json();
            console.log("Updated scenario:", updatedScenario);
        }
        catch (error) {
            console.error("Failed to edit scenario:", error);
        }
    }

    // Fetch Scenarios //
    // after new scenario added, re-fetch all scenarios 
    // (avoid using initial useEffect as API calls are duplicated)
    async function fetchScenarios(){
         try{
            const response = await fetch(`${API_BASE_URL}/scenario/user/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                const message = `An error occurred: ${errorData.message}`;
                console.error(message);
                return;
            }
            const scenarios = await response.json();
            setScenarioList(scenarios);
            console.log("All scenarios:", scenarios);
        }
        catch (error) {
            console.error("Failed to fetch scenarios:", error);
        }
    }

    // Delete scenario //
    async function deleteScenario(scenarioId) {
        try{
            const response = await fetch(`${API_BASE_URL}/scenario/${scenarioId}`, {        
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!response.ok) {
                const errorData = await response.json();
                const message = `An error occurred: ${errorData.message}`;
                console.error(message);
                return;
            }
            console.log("Deleted scenario:", scenarioId);
        }
        catch (error) {
            console.error("Failed to delete scenario:", error);
        }
    }

    return { createScenario, editScenario, fetchScenarios, deleteScenario };
}

export default useScnarioManipulation;