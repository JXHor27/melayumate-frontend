import { useState, useEffect } from 'react';
import { BASE_URL } from "../../api/apiConfig";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";
// Custom hook to manage token validation
function useRoot() {
    const { token, username } = useAuth();
    const [errorMessage, setErrorMessage] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function tokenRefresh(){
            try{
                const response = await fetch(`${BASE_URL}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                });
                if (response.status === 401) {
                    sessionStorage.removeItem('token'); // Clear invalid token from storage
                    setErrorMessage(true);
                    setTimeout(() => { navigate('/'); }, 2000); // Redirect to login page
                    return; 
                }
                const message = await response.text();
                //console.log("Ping message: ", message);
            }
            catch (error) {
                console.error("Failed to fetch ping:", error);
            }
        }
        tokenRefresh();
    }, [token]);
    return { errorMessage, setErrorMessage, username };
}

export default useRoot;