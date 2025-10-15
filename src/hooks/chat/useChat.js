import { useState, useEffect } from 'react';
import { API_BASE_URL } from "../../api/apiConfig";
import { useAuth } from '../../context/AuthContext';

const POLLING_INTERVAL_MS = 1000; // Poll every 3 seconds

function useChat(){
    const { token, userId, username } = useAuth();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        async function fetchMessages() {
            try{
                const response = await fetch(`${API_BASE_URL}/chat/messages`, {
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
                console.log("Messages: ", result);
                setMessages(prevMessages => {
                    if (JSON.stringify(prevMessages) !== JSON.stringify(result)) {
                        console.log("New chat messages fetched, updating state.");
                        return result;
                    } 
                    console.log(" No changes, return the old state.");
                    return prevMessages; // No changes, return the old state
                });
            }
            catch(error) { 
                console.error("Failed to fetch chat messages:", error);
            }
        }
        fetchMessages();

         // 2. Set up the interval to re-fetch data every POLLING_INTERVAL_MS
        const intervalId = setInterval(fetchMessages, POLLING_INTERVAL_MS);

        // 3. CRITICAL: The Cleanup Function
        // This function is returned by useEffect and will be called when the
        // component unmounts or when the dependencies change.
        return () => {
            console.log("Cleaning up chat interval.");
            clearInterval(intervalId); // This prevents memory leaks!
        };


    }, []);

    // Send Message
    async function sendMessage(currentLevel, avatar, text) {
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
                    message: text
                }),
            });
            if (!response.ok) { 
                const errorData = await response.json();
                const message = `An error occurred: ${errorData.message}`;
                console.error(message);
                return null;
            }
            const newMessage = await response.json();
            console.log("New message added: ", newMessage);
             // "Optimistic update": Add the new message to our local state immediately
            // so the user sees their message right away, without waiting for the next poll.
            setMessages(prevMessages => [...prevMessages, newMessage]);
            return result;
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    return { messages, sendMessage };
}

export default useChat;