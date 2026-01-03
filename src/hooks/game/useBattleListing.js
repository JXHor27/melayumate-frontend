import { API_BASE_URL } from "../../api/apiConfig";
import { useAuth } from '../../context/AuthContext';
function useBattleListing({ setPrimaryCharacter }) {
  const { token, userId } = useAuth();

  // List Primary Character for Battle //
  async function listCharacter(characterId) {
    try{
      const response = await fetch(`${API_BASE_URL}/lobby/${userId}/list`, {
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
      console.log("Character listed successfully:", result);
      return result;
    } catch (error) {
        console.error("Failed to list character:", error);
    }

  }

   // Unlist Primary Character from Battle //
  async function unlistCharacter(characterId) {
    try{
      const response = await fetch(`${API_BASE_URL}/lobby/${userId}/unlist`, {
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
      console.log("Character unlisted successfully:", result);
      return result;
    } catch (error) {
        console.error("Failed to unlist primary character:", error);
    }

  }

  
  // Fetch primary character
  // after primary character listed/unlisted, re-fetch primary character
  // (avoid using initial useEffect as API calls are duplicated)
  async function fetchPrimaryCharacter() {
    try{
      const response = await fetch(`${API_BASE_URL}/character/${userId}/primary`, {
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
                
      const primaryCharacter = await response.json();
      console.log("Primary character: ", primaryCharacter);
      setPrimaryCharacter(primaryCharacter);
      return primaryCharacter;
      } catch (error) {
        console.error("Failed to fetch primary character:", error);
      }
  }


  return { listCharacter, unlistCharacter, fetchPrimaryCharacter };
}

export default useBattleListing;