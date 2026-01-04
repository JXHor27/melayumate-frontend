import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../api/apiConfig";
import { useAuth } from '../../context/AuthContext';
function useScenarioDetail({ scenarioId }) {
    const { token } = useAuth();
    const [scenario, setScenario] = useState({
        id: null,
        title: "",
        description: "",
        dialogues: [],
    });

    useEffect(() => {
        async function fetchData() {
            try{
                const scenarioResp = await fetch(`${API_BASE_URL}/scenario/${scenarioId}`, {
                    method: 'GET', 
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                const dialogueResp = await fetch(`${API_BASE_URL}/dialogue/${scenarioId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!scenarioResp.ok) {
                    const errorData = await scenarioResp.json();
                    const message = `An error occurred: ${errorData.message}`;
                    console.error(message);
                    return;
                }
                if (!dialogueResp.ok) {
                    const errorData = await dialogueResp.json();
                    const message = `An error occurred: ${errorData.message}`;
                    console.error(message);
                    return;
                }
                
                const scenarioData = await scenarioResp.json();
                const dialogueData = await dialogueResp.json();
                //console.log("scenario data: ", scenarioData);
                //console.log("dialogue data: ", dialogueData);
                for (var dialogue of dialogueData) {
                    // Get the first four lowercase words, "ques" or "resp"
                    dialogue.dialogueType = dialogue.dialogueType.toLowerCase().slice(0,4); 
                }
                setScenario({
                    id: scenarioData.scenarioId,
                    title: scenarioData.title,
                    description: scenarioData.description,
                    dialogues: dialogueData,
                });
                
            } catch (error) {
                console.error("Failed to fetch scenario and dialogue:", error);
            }
        }   
        fetchData();
    }, []);

  return { scenario, setScenario };
}

export default useScenarioDetail;