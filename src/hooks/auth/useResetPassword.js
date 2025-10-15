import { API_BASE_URL } from "../../api/apiConfig";
function useResetPassword() {
    async function sendResetCode(email) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });
            const result = await response.json();
            return result.message;
        } catch (error) {
            console.error("Failed to send reset code:", error);
        }
    }

    async function verifyResetCode(email, code) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/verify-reset-code`, {
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
            console.error("Failed to verify reset code:", error);
        }
    }

    async function resetPassword(email, code, newPassword) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, code, newPassword })
            });
             if (!response.ok) {
                const errorData = await response.json();
                const message = `An error occurred: ${errorData.message}`;
                console.error(message);
                return null;
            }
            const result = await response.json();
            return result.message;
        } catch (error) {
            console.error(error);
        }
    }
    return { sendResetCode, verifyResetCode, resetPassword };
}

export default useResetPassword;