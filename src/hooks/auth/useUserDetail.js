import { useState, useEffect } from 'react';
import { API_BASE_URL } from "../../api/apiConfig";
import { useAuth } from '../../context/AuthContext';
function useUserDetail(){
    const { token, userId } = useAuth();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        oldPassword: "",
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        async function fetchUserDetail() {
            try{
                const response = await fetch(`${API_BASE_URL}/auth/user/${userId}`, {
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
                //console.log("User details: ", result);
                setFormData({
                    ...formData,
                    username: result.username,
                    email: result.email,
                });

            }
            catch(e) { 
                console.error("Failed to fetch user details:", error);
            }
        }
        fetchUserDetail();
    }, []);
    return { formData, setFormData };
}

export default useUserDetail;