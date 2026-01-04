import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; 
import SnackbarAlert from "../common/SnackbarAlert";
import ResetDialog from "./ResetDialog";
import useResetPassword from "../../hooks/auth/useResetPassword";
function LoginForm() {
    const navigate = useNavigate();
    const { login } = useAuth(); 
    const { sendResetCode, verifyResetCode, resetPassword } = useResetPassword();

    /* Error handling alert section */
    const [credentialError, setCredentialError] = useState(false);
    const [usernameEmptyError, setUsernameEmptyError] = useState(false);
    const [passwordEmptyError, setPasswordEmptyError] = useState(false);

    /* Input handling section */
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    /* Forget Password state section */
    const [showResetModal, setShowResetModal] = useState(false);
    const [sendCodeSuccess, setSendCodeSuccess] = useState(false);


    function handleCloseSnackbar() {
      setCredentialError(false);
      setUsernameEmptyError(false);
      setPasswordEmptyError(false);
      setSendCodeSuccess(false);
    }
    
    function togglePasswordVisibility() {
        setPasswordVisible(!passwordVisible);
    };

    function handleForgetPassword(e) {
      e.preventDefault();
      //console.log("Forget Password Clicked");
      setShowResetModal(true);
    }

    async function handleSendCode(email) {
      const result = await sendResetCode(email);
      //console.log(result);
      if (!result) {
        return null;
      }
      //console.log("Reset code sent to:", email);
      setSendCodeSuccess(true);
      return result;
    }

    async function handleVerifyCode(email, code) {
      const result = await verifyResetCode(email, code);  
      if (!result) {
        return false;
      }  
      //console.log("Reset code verified for:", email);
      return result;
    }

    async function handleResetPassword(email, code, newPassword) {
      const result = await resetPassword(email, code, newPassword);
       if (!result) {
        return false;
      }  
      //console.log("Reset password for:", email);
      return result;
    }

    async function handleLogin(e) {
        e.preventDefault();

        if (!username.trim()){
          setUsernameEmptyError(true);
          return;
        }

        if (!password.trim()){
          setPasswordEmptyError(true);
          return;
        }

        const success = await login(username, password);
        if (success) {
          navigate('/dashboard');
        } else {
          setCredentialError(true);
        }
    }

    return (
      <>
        <form onSubmit={handleLogin} className="space-y-4">
            <input
                type="text"
                maxLength={10}
                placeholder="Username"
                className="w-full p-3 rounded-lg bg-zinc-100 text-black placeholder-gray-600 dark:bg-zinc-700 dark:text-white dark:placeholder-gray-300"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
           <div className="w-full p-3 rounded-lg bg-zinc-100 text-black placeholder-gray-600 dark:bg-zinc-700 dark:text-white dark:placeholder-gray-300 flex justify-between items-center focus-within:ring-2" >
              <input
                type={passwordVisible ? "text" : "password"}
                maxLength={16}
                placeholder="Password"
                className="display:none w-full rounded-full outline-none placeholder-gray-600 dark:placeholder-gray-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              /> 
                <span><FontAwesomeIcon
                  icon={passwordVisible ? faEyeSlash : faEye}
                  onClick={togglePasswordVisibility}
                  style={{ cursor: 'pointer'}}/>
                </span>
            </div>
          <button
            type="submit"
            className="shadow-lg w-full p-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 active:scale-95 active:bg-yellow-500 transition transform cursor-pointer"
          >
            Login
          </button>

          <button onClick={handleForgetPassword} className="ml-auto text-sm text-gray-900 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none cursor-pointer">
            Forget Password?
          </button>

          {/* Invalid Credential Alert */}
          <SnackbarAlert
            open={credentialError}
            anchorOrigin={{ vertical:"top", horizontal:"center" }}    
            onClose={handleCloseSnackbar}
            severity="error"
            message="Invalid username or password"
          />

          {/* Username Empty Alert */}
          <SnackbarAlert
            open={usernameEmptyError}
            anchorOrigin={{ vertical:"top", horizontal:"center" }}
            onClose={handleCloseSnackbar}
            severity="error"
            message="Please fill in username"
          />

          {/* Password Empty Alert */}
          <SnackbarAlert
            open={passwordEmptyError}
            anchorOrigin={{ vertical:"top", horizontal:"center" }}
            onClose={handleCloseSnackbar}
            severity="error"
            message="Please fill in password"
          />
        </form>

        <ResetDialog
          open={showResetModal}
          onClose={() => setShowResetModal(false)}
          onSend={handleSendCode}
          onVerifyCode={handleVerifyCode}
          onResetPassword={handleResetPassword}
        />

        {/* Send Code Success Alert */}
        <SnackbarAlert
            open={sendCodeSuccess}
            anchorOrigin={{ vertical:"top", horizontal:"center" }}
            onClose={() => setSendCodeSuccess(false)}
            severity="success"
            message="If the account exists, a reset code has been sent."
          />
      </>
      );
}

export default LoginForm;