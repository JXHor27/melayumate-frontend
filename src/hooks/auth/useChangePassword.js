import { API_BASE_URL } from "../../api/apiConfig";
import { useAuth } from '../../context/AuthContext';
// through my profile page, for authenticated user
function useChangePassword({ setPasswordUpdateError, setPasswordUpdateMessage }) {
    const { token, userId } = useAuth();

    async function changePassword(oldPassword, newPassword, confirmNewPassword) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    userId:  userId,
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                    confirmNewPassword: confirmNewPassword
                })
            });
            if (response.status === 400) {
                const errorData = await response.json();
                const message = `An error occurred: ${errorData.message}`;
                console.error(message); 
                setPasswordUpdateError(true);
                setPasswordUpdateMessage(errorData.message);
                return null;
            }
            const result = await response.json();
            return result.message;
        } catch (error) {
            console.error("Failed to change password:", error);
        }
    }
    return { changePassword };
}

export default useChangePassword;