import { API_BASE_URL } from "../../api/apiConfig";
import { useAuth } from '../../context/AuthContext';

function useMalayaSpeechService() {
    const { token } = useAuth();

    async function generateAudio(malayText, gender) {
        try {
            const response = await fetch(`${API_BASE_URL}/speech/tts`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    text: malayText,
                    gender: gender
                }),
            });
            if (!response.ok) {
                return null;
            }
            const blob = await response.blob();   
            return blob;
        } catch (error) {
            console.error("Error generating audio:", error);
            alert("Audio generation failed.");
        };
    }

    async function transcribeAudio(audioBlob) {
        console.log("Transcribing audio blob:", audioBlob);
        if (audioBlob == null) {
            console.log("No audio blob provided for transcription.");
            return null;
        }
        // Create a File object from the Blob, giving it a name
        const audioFile = new File([audioBlob], "user_recording.wav", { type: "audio/wav" });

        // 1. Create a FormData object. This is the "envelope".
        const formData = new FormData();
            
        // 2. Add the file to the form data. 
        // The key 'file' MUST match the @RequestParam("file") in your Spring controller.
        formData.append('file', audioFile);
        try {
            const response = await fetch(`${API_BASE_URL}/speech/stt`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });
            if (!response.ok) {
                console.log(response.statusText)
                return null;
            }
            const transcription = await response.text();
            return transcription;
        } catch (error) {
            console.error("Error transcribing audio:", error);
        }
    }

    return { generateAudio, transcribeAudio };
}

export default useMalayaSpeechService;