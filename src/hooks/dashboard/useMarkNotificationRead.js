import { API_BASE_URL } from "../../api/apiConfig";
import { useAuth } from '../../context/AuthContext';

function useMarkNotificationRead() {

    const { token, userId } = useAuth();

    // Mark notifications as read
    async function readNotifications() {
        try{
            const response = await fetch(`${API_BASE_URL}/notification/${userId}`, {
                method:"PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!response.ok) { 
                const errorData = await response.json();
                const message = `An error occurred: ${errorData.message}`;
                console.error(message);
                return null;
            }
            const result = response.status;
            //console.log("Notifications marked as read: ", result);
            return result;
        } catch (error) {
            console.error("Failed to read notifications:", error);
        }
    };

    return { readNotifications };

}

export default useMarkNotificationRead;