import { API_BASE_URL } from "../../api/apiConfig";
import { useAuth } from '../../context/AuthContext';
function useChatManipulation() {

    const { token, userId, username } = useAuth();

    // Send Message
    async function createMessage(currentLevel, avatar, message) {
        try{
            const response = await fetch(`${API_BASE_URL}/chat/messages`, {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    userId: userId, 
                    username: username,
                    currentLevel: currentLevel,
                    avatar: avatar,
                    message: message
                }),
            });
            if (!response.ok) { 
                const errorData = await response.json();
                const message = `An error occurred: ${errorData.message}`;
                console.error(message);
                return null;
            }
            const result = await response.json();
            console.log("New message added: ", result);
            return result;
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };


    return { createMessage };

}

export default useChatManipulation;