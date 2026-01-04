import { useState, useEffect } from 'react';
import { API_BASE_URL } from "../../api/apiConfig";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";

function useScenarioList() {
    const { token, userId } = useAuth();
    const [scenarioList, setScenarioList] = useState([]);

    useEffect(() => {
        async function fetchData(){
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
                //console.log("All scenarios:", scenarios);
                setScenarioList(scenarios);
            }
            catch (error) {
                console.error("Failed to fetch scenarios:", error);
            }
        }
        fetchData();
    }, []);
    return { scenarioList, setScenarioList };
}

export default useScenarioList;