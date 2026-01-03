import { API_BASE_URL } from "../../api/apiConfig";
import { useAuth } from '../../context/AuthContext';
function useBattleSimulation() {
  const { token, userId } = useAuth();

  // Start a Battle //
  async function startBattle(challengerUsername, challengerId, defenderId, defenderUserId) {
    try{
      const response = await fetch(`${API_BASE_URL}/battle/challenge`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            challengerUsername: challengerUsername,
            challengerCharacterId: challengerId,
            opponentCharacterId: defenderId,
            opponentUserId: defenderUserId
          })
      });
      if (!response.ok) {
        const errorData = await response.json();
        const message = `An error occurred: ${errorData.message}`;
        console.error(message);
        return;
      }
      const result = await response.json();
      console.log("Battle started successfully:", result);
      return result;
    } catch (error) {
        console.error("Failed to start battle:", error);
    }

  }

  // Delete a Battle log //
  async function deleteBattle(battleId) {
    try{
      const response = await fetch(`${API_BASE_URL}/battle/${battleId}`, {
          method: 'DELETE',
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
      const result = response.status;
      console.log("Battle deleted successfully:", result);
      return result;
    } catch (error) {
        console.error("Failed to delete battle:", error);
    }

  }

   // Get Battle Results //
  async function fetchBattleLog(battleId) {
    try{
      const response = await fetch(`${API_BASE_URL}/battle/result/${battleId}`, {
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
      console.log("Battle log fetched successfully:", result);
      return result;
    } catch (error) {
        console.error("Failed to fetch battle log:", error);
    }

  }
  return { startBattle, deleteBattle, fetchBattleLog };
}

export default useBattleSimulation;