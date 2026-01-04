import { API_BASE_URL } from "../../api/apiConfig";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";

function useFlashcardListManipulation({ setLists, setErrorMessage }) {

    const { token, userId } = useAuth();
    const navigate = useNavigate();

    // Add List
    async function addList(title, description) {
        try{
            const response = await fetch(`${API_BASE_URL}/lists`, {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    userId: userId,
                    title: title,
                    description: description
                }),
            });
            if (response.status === 401) {
                sessionStorage.removeItem('token'); // Clear invalid token from storage
                setErrorMessage(true);
                setTimeout(() => { navigate('/'); }, 2000); // Redirect to login page
                return null; 
            }
            if (!response.ok) { 
                const errorData = await response.json();
                const message = `An error occurred: ${errorData.message}`;
                console.error(message);
                return null;
            }
            const newList = await response.json();
            //console.log("New list added: ", newList);
            setLists((prevLists) => [
                ...prevLists,
                newList
            ]);
            return newList;
        } catch (error) {
            console.error("Failed to add list:", error);
        }
    };

    // Edit List
    async function editList(listId, title, description) {
        try{
            const response = await fetch(`${API_BASE_URL}/lists/${listId}`, {
                method: "PATCH",
                headers: { 
                    "Content-Type": "application/json",
                     "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    userId: userId,
                    title: title,
                    description: description,
                }),
            });
            if (response.status === 401) {
                sessionStorage.removeItem('token'); // Clear invalid token from storage
                setErrorMessage(true);
                setTimeout(() => { navigate('/'); }, 2000); // Redirect to login page
                return null; 
            }
            if (!response.ok) { 
                const errorData = await response.json();
                const message = `An error occurred: ${errorData.message}`;
                console.error(message);
                return null;
            }
            const updatedList = await response.json();
            //console.log("List updated: ", updatedList);
            return updatedList;
        } catch (error) {
            console.error("Failed to edit list:", error);
        }
    };

    // Delete List
    async function deleteList(listId) {
        try{
            const response = await fetch(`${API_BASE_URL}/lists/${listId}`, {
                method: "DELETE",
                headers: { 
                    "Content-Type": "application/json",
                     "Authorization": `Bearer ${token}`
                }
            });
            if (response.status === 401) {
                sessionStorage.removeItem('token'); // Clear invalid token from storage
                setErrorMessage(true);
                setTimeout(() => { navigate('/'); }, 2000); // Redirect to login page
                return null; 
            }
            if (!response.ok) {
                const errorData = await response.json();
                const message = `An error occurred: ${errorData.message}`;
                console.error(message);
                return null;
            }
            //console.log("List deleted: ", response.status);
            return response.status;
        } catch (error) {
            console.error("Failed to delete list:", error);
        }
    };

    // Fetch lists
    // after new list added, re-fetch all lists 
    // (avoid using initial useEffect as API calls are duplicated)
    async function fetchLists() {
        try{
            const response = await fetch(`${API_BASE_URL}/lists/user/${userId}`, {
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
            const records = await response.json();
            //console.log("Card lists: ", records);
            setLists(records);
        }
        catch(error) { 
            console.error("Failed to fetch card lists:", error);
        }
    }

    // Toggle cards order
    async function toggleRandomOrder(listId, currentOrder) {
        try{
            const response = await fetch(`${API_BASE_URL}/lists/${listId}/order`, {
                method: "PATCH",
                headers: { 
                    "Content-Type": "application/json",
                     "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    isRandom: currentOrder
                }),
            });
            if (response.status === 401) {
                sessionStorage.removeItem('token'); // Clear invalid token from storage
                setErrorMessage(true);
                setTimeout(() => { navigate('/'); }, 2000); // Redirect to login page
                return null; 
            }
            if (!response.ok) { 
                const errorData = await response.json();
                const message = `An error occurred: ${errorData.message}`;
                console.error(message);
                return null;
            }
            //console.log("Cards order updated: ", response.status);
            return response.status;
        } catch (error) {
            console.error("Failed to update cards order:", error);
        }
    };

    // Toggle deck language
    async function toggleDeckLanguage(listId, currentLanguage) {
        try{
            const response = await fetch(`${API_BASE_URL}/lists/${listId}/language`, {
                method: "PATCH",
                headers: { 
                    "Content-Type": "application/json",
                     "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    defaultLanguage: currentLanguage
                }),
            });
            if (response.status === 401) {
                sessionStorage.removeItem('token'); // Clear invalid token from storage
                setErrorMessage(true);
                setTimeout(() => { navigate('/'); }, 2000); // Redirect to login page
                return null; 
            }
            if (!response.ok) { 
                const errorData = await response.json();
                const message = `An error occurred: ${errorData.message}`;
                console.error(message);
                return null;
            }
            //console.log("Default language updated: ", response.status);
            return response.status;
        } catch (error) {
            console.error("Failed to update deck language:", error);
        }
    };

    return { addList, editList, deleteList, fetchLists, toggleRandomOrder, toggleDeckLanguage };

}

export default useFlashcardListManipulation;