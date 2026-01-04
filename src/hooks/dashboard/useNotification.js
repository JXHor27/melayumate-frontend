import { useState, useEffect } from 'react';
import { API_BASE_URL } from "../../api/apiConfig";
import { useAuth } from '../../context/AuthContext';
function useNotification(){
    const { token, userId } = useAuth();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        async function fetchNotifications() {
            try{
                const response = await fetch(`${API_BASE_URL}/notification/${userId}`, {
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
                //console.log("Notifications: ", result);
                setNotifications(result);
            }
            catch(error) { 
                console.error("Failed to fetch notifications:", error);
            }
        }
        fetchNotifications();
    }, []);
    return { notifications, setNotifications };
}

export default useNotification;