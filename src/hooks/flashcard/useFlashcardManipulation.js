import { API_BASE_URL } from "../../api/apiConfig";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";

function useFlashcardManipulation({ setList, setErrorMessage }) {
    const { token } = useAuth();
    const navigate = useNavigate();

    // Add Card
    async function addCard (listId, english, malay){
        try{
            const response = await fetch(`${API_BASE_URL}/cards/card`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json", 
                    "Authorization": `Bearer ${token}` 
                },
                body: JSON.stringify({
                    flashcardListId: listId,
                    englishWord: english,
                    malayWord: malay,
                }),
            });
            if (response.status === 401) {
                sessionStorage.removeItem('token'); 
                setErrorMessage(true);
                setTimeout(() => { navigate('/'); }, 2000); 
                return null; 
            }
            if (!response.ok) {
                const errorData = await response.json();
                const message = `An error occurred: ${errorData.message}`;
                console.error(message);
                return null;
            }
            const newCard = await response.json();
            console.log("New card added: ", newCard);

            setList(prev => ({ 
                ...prev, 
                cards: [...prev.cards, newCard] 
            }));
            return newCard;
        }
        catch(error) {
            console.error("Failed to add card:", error);
        }
    };

    // Edit Card
    async function editCard(listId, cardId, english, malay) {
        try{
            const response = await fetch(`${API_BASE_URL}/cards/card/${cardId}`, {
                method: "PATCH",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                },
                body: JSON.stringify({
                    flashcardListId: listId,
                    englishWord: english,
                    malayWord: malay,
                }),
            });
            if (response.status === 401) {
                sessionStorage.removeItem('token'); 
                setErrorMessage(true);
                setTimeout(() => { navigate('/'); }, 2000); 
                return null; 
            }
            if (!response.ok) {
                const errorData = await response.json();
                const message = `An error occurred: ${errorData.message}`;
                console.error(message);
                return null;
            }
            const updatedCard = await response.json();
            console.log("Card updated: ", updatedCard);
            setList(prev => ({
            ...prev,
            cards: prev.cards.map(card =>
                card.flashcardId === cardId ? updatedCard : card
            ),
            }));
            return updatedCard;
        } 
        catch (error) {
            console.error("Failed to edit card:", error);
        }
    };

    // Delete Card
    async function deleteCard(cardId) {
        try{
            const response = await fetch(`${API_BASE_URL}/cards/card/${cardId}`, {
                method: "DELETE",
                headers: { 
                    "Content-Type": "application/json",
                     "Authorization": `Bearer ${token}` 
                 }
            });
            if (response.status === 401) {
                sessionStorage.removeItem('token'); 
                setErrorMessage(true);
                setTimeout(() => { navigate('/'); }, 2000); 
                return null; 
            }
            if (!response.ok) {
                const errorData = await response.json();
                const message = `An error occurred: ${errorData.message}`;
                console.error(message);
                return null;
            }
            console.log("Card deleted: ", response.status);

            setList(prev => ({
                ...prev,
                cards: prev.cards.filter(card => card.flashcardId !== cardId),
            }))
        } catch (error) {
            console.error("Failed to delete card:", error);
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

    return { addCard, editCard, deleteCard, fetchCards };
}

export default useFlashcardManipulation;