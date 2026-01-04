import { API_BASE_URL } from "../../api/apiConfig";
import { useAuth } from '../../context/AuthContext';
function useDialogueManipulation({ setScenario, setDialogueConflictError, setDialogueConflictMessage }) {
  const { token } = useAuth();

  // Add New Dialogue //
  async function addDialogue(formData, scenarioId, audioUrl){
    try{
      const response = await fetch(`${API_BASE_URL}/dialogue`, {
                method:"POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                  scenarioId : scenarioId,
                  english : formData.english,
                  malay : formData.malay,
                  dialogueType: formData.dialogueType,
                  dialogueOrder: formData.dialogueOrder,
                  audioUrl: audioUrl
                }),
      });
      if (response.status === 409) {
        const errorData = await response.json();
        const message = `An error occurred: ${errorData.message}`;
        console.error(message); 
        setDialogueConflictError(true);
        setDialogueConflictMessage(errorData.message);
        return null;
      }
      if (!response.ok) {
        const errorData = await response.json();
        const message = `An error occurred: ${errorData.message}`;
        console.error(message);
        return null;
      }
      const newDialogue = await response.json(); 
      //console.log(newDialogue);
      return newDialogue;
    } catch (error) {
        console.error("An error occurred while adding the dialogue:", error);
    }
  };

  // Delete Dialgoue //
  async function deleteDialogue(dialogueId) {
    try {
        const response = await fetch(`${API_BASE_URL}/dialogue/${dialogueId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            const message = `An error occurred: ${errorData.message}`;
            console.error(message);
            return;
        }
        //console.log("Dialogue deleted: ", response.status);
        setScenario(prev => ({
            ...prev,
            dialogues: prev.dialogues.filter(dialogue => dialogue.dialogueId !== dialogueId)
        }));
    } catch (error) {
        console.error("An error occurred while deleting the dialogue:", error);
    }
  }

  // Fetch Dialogues (to refresh dialogue list after add/delete) //
  async function fetchDialogues(scenarioId) {
    try{
      const response = await fetch(`${API_BASE_URL}/dialogue/${scenarioId}`, {
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
      const dialogues = await response.json();
      for (var dialogue of dialogues) {
        // Get the first four lowercase words, "ques" or "resp"
        dialogue.dialogueType = dialogue.dialogueType.toLowerCase().slice(0,4); 
      } 
      setScenario(prev => ({
          ...prev,
          dialogues: dialogues
      }));
    } catch (error) {
        console.error("Failed to fetch dialogues:", error);
    }

  }
  return { addDialogue, deleteDialogue, fetchDialogues };
}

export default useDialogueManipulation;