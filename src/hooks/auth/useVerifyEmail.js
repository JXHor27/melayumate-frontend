import { API_BASE_URL } from "../../api/apiConfig";
function useVerifyEmail() {
       async function verifyEmail(username, email, password) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/verify-email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, email, password })
            });
            return response;
        } catch (error) {
            console.error("Failed to verify email:", error);
        }
    }

     async function verifyEmailCode(email, code) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/verify-email-code`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, code })
            });     
            if (!response.ok) {
                const errorData = await response.json();
                const message = `An error occurred: ${errorData.message}`;
                console.error(message);
                return false;
            }       
            return true;
        } catch (error) {
            console.error("Failed to verify email code:", error);
        }
    }
    return { verifyEmail, verifyEmailCode }
}

export default useVerifyEmail;