import { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import { API_BASE_URL } from "../../api/apiConfig";
import { useAuth } from '../../context/AuthContext';
const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL;

function useChatRoom() {

    const { token, userId, username } = useAuth();
    const [messages, setMessages] = useState([]);
    const stompClientRef = useRef(null);

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
                //console.log("Messages: ", result);
                setMessages(result);
                }
            catch(error) { 
                console.error("Failed to fetch chat messages:", error);
            }
        }
        fetchMessages();


        // --- 2. Configure and activate the WebSocket connection ---
        const client = new Client({
            brokerURL: WEBSOCKET_URL,       
            connectHeaders: {
                Authorization: `Bearer ${token}`
            },
            onConnect: () => {
                //console.log('Connected to WebSocket!');
                // --- 3. Subscribe to the public topic ---
                client.subscribe('/topic/messages', (message) => {
                    const newMessage = JSON.parse(message.body);
                    // Add the new message to our state, triggering a re-render
                    setMessages(prevMessages => [...prevMessages, newMessage]);
                });
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
        });

        client.activate();
        stompClientRef.current = client;

        // --- 4. Cleanup on component unmount ---
        return () => {
            client.deactivate();
        };
    }, []);

    // --- 5. Function to send a message ---
    function sendMessage(currentLevel, avatar, text) {
        if (stompClientRef.current && stompClientRef.current.connected) {
            stompClientRef.current.publish({
                destination: '/app/chat', // Matches the @MessageMapping in the controller
                body: JSON.stringify({ 
                    userId: userId, 
                    username: username,
                    currentLevel: currentLevel,
                    avatar: avatar,
                    message: text
                }),
            });
        }
    };

    return { messages, sendMessage };
};

export default useChatRoom;