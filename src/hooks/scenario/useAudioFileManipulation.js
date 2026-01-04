import { API_BASE_URL } from "../../api/apiConfig";
import { useAuth } from '../../context/AuthContext';

function useAudioFileManipulation() {
    const { token } = useAuth();

    async function uploadAudio(audioBlob) {
        if (audioBlob == null) {
            //console.log("No audio blob provided for upload.");
            return null;
        }
        // 1. Create a new File object from the Blob
        // We give it a filename, which is required for multipart/form-data.
        const audioFile = new File([audioBlob], "malay_audio.wav", { type: "audio/wav" });

        // 2. Create a FormData object
        // This is the standard way to send files to a server.
        const formData = new FormData();
        
        // The key "file" must match the parameter name in your Spring Boot controller
        formData.append("file", audioFile);

        try {
            const response = await fetch(`${API_BASE_URL}/files/upload`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server responded with ${response.status}: ${errorText}`);
            }

            // Here, we're expecting the backend to return the objectKey of the uploaded file.
            const objectKey = await response.text();
            //console.log("File uploaded successfully. objectKey:", objectKey);

            // You can now do something with the objectKey, like saving it to your state
            return objectKey;

        } catch (error) {
            console.error("Error uploading file:", error);
        }
    }

    async function deleteAudio(objectKey) {
            if (objectKey == null) {
                //console.log("No audio to delete.");
                return;
            }
            //console.log("Deleting audio with objectKey:", objectKey);
            try {
                const response = await fetch(`${API_BASE_URL}/files/${objectKey}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                //console.log("Audio deleted: ", response.status);
                if (!response.ok) {
                    const errorData = await response.json();
                    const message = `An error occurred: ${errorData.message}`;  
                    console.error(message);
                    throw new Error(message);
                }
                //console.log("Audio deleted: ", response.status);
            } catch (error) {
                console.error("Error deleting audio:", error);
            }
        }
    return { uploadAudio, deleteAudio };
}
export default useAudioFileManipulation