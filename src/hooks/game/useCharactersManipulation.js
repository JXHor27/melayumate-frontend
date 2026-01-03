import { API_BASE_URL } from "../../api/apiConfig";
import { useAuth } from '../../context/AuthContext';
function useCharactersManipulation({ setOwnedCharacters }) {
  const { token, userId } = useAuth();

  // Acquire/Unlock Character //
  async function acquireCharacter(templateId) {
    try{
      const response = await fetch(`${API_BASE_URL}/character/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            templateId: templateId
          })
      });
      if (!response.ok) {
        const errorData = await response.json();
        const message = `An error occurred: ${errorData.message}`;
        console.error(message);
        return;
      }
      const result = response.status;
      console.log("Character acquired successfully:", result);
      return result;
    } catch (error) {
        console.error("Failed to acquire character:", error);
    }

  }

   // Set Character as Primary //
  async function setPrimaryCharacter(characterId) {
    try{
      const response = await fetch(`${API_BASE_URL}/character/${userId}/primary`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            characterId: characterId
          })
      });
      if (!response.ok) {
        const errorData = await response.json();
        const message = `An error occurred: ${errorData.message}`;
        console.error(message);
        return;
      }
      const result = response.status;
      console.log("Character set as primary successfully:", result);
      return result;
    } catch (error) {
        console.error("Failed to set primary character:", error);
    }

  }

  // Fetch characters
  // after new character unlocked/set as primary, re-fetch all characters
  // (avoid using initial useEffect as API calls are duplicated)
  async function fetchOwnedCharacters() {
    try{
      const response = await fetch(`${API_BASE_URL}/character/${userId}/owned`, {
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
                
      const ownedCharacters = await response.json();
      console.log("Owned characters: ", ownedCharacters);
      setOwnedCharacters(ownedCharacters);
      return ownedCharacters;
      } catch (error) {
        console.error("Failed to fetch owned characters:", error);
      }
  }


  return { acquireCharacter, setPrimaryCharacter, fetchOwnedCharacters };
}

export default useCharactersManipulation;