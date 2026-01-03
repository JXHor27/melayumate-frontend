import { API_BASE_URL } from "../../api/apiConfig";
import { useAuth } from '../../context/AuthContext';

function usePracticeManipulation() {
    const { token, userId } = useAuth();

    // Record one practice session
    async function recordPractice (practiceType, learningSessionId, correctCount = null, totalCount = null) {
        try{
            const response = await fetch(`${API_BASE_URL}/practice`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json", 
                    "Authorization": `Bearer ${token}` 
                },
                body: JSON.stringify({
                    userId: userId,
                    practiceType: practiceType,
                    learningSessionId: learningSessionId,
                    correctCount: correctCount,
                    totalCount: totalCount,
                }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                const message = `An error occurred: ${errorData.message}`;
                console.error(message);
                return null;
            }
            const newRecord = await response.json();
            console.log("New practice record added: ", newRecord);
            return newRecord;
        }
        catch(error) {
            console.error("Failed to record practice session:", error);
        }
    };


    // Fetch cards
    // after new card added, re-fetch all cards 
    // (avoid using initial useEffect as API calls are duplicated)
    async function fetchCards(listId) {
        try{
            const response = await fetch(`${API_BASE_URL}/cards/${listId}`, {
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
                
            const cardsData = await response.json();
            console.log("card data: ", cardsData);
            setList(prev => ({ 
                ...prev, 
                cards: cardsData 
            }));
            
        } catch (error) {
            console.error("Failed to fetch cards:", error);
        }
    }
   
    return { recordPractice };
}

export default usePracticeManipulation;