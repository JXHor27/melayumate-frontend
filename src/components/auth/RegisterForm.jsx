import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../../context/AuthContext"; 
import SnackbarAlert from "../common/SnackbarAlert";
import VerifyEmailDialog from "./VerifyEmailDialog";
import ValidationRequirements from './ValidationRequirements'; 

import useVerifyEmail from "../../hooks/auth/useVerifyEmail";
function RegisterForm() {
    const { register } = useAuth();
    const { verifyEmail, verifyEmailCode } = useVerifyEmail();

    /* Error handling alert section */
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordLengthError, setPasswordLengthError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [usernameTakenError, setUsernameTakenError] = useState(false);
    const [emailTakenError, setEmailTakenError] = useState(false);

    /* Input handling section */
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [validations, setValidations] = useState({
      usernameLength: false,
      passwordLength: false,
      passwordPattern: false,
      emailDomain: false,
    });

    const [isFormValid, setIsFormValid] = useState(false);

    // --- VALIDATION LOGIC ---
  // This effect runs every time the user types in the email or password fields
  useEffect(() => {
    const hasUsernameLength = username.trim().length >=3 && username.trim().length <=10;
    // Check password requirements
    const hasPasswordLength = password.trim().length >= 8 && password.trim().length <= 16;
    const hasPasswordPattern = validatePassword(password);

    // Check email requirement
    const hasEmailDomain = validateEmail(email);

    // Update the validation state
    const newValidations = {
      usernameLength: hasUsernameLength,
      passwordLength: hasPasswordLength,
      passwordPattern: hasPasswordPattern,
      emailDomain: hasEmailDomain,
    };
    setValidations(newValidations);

    // Check if all validations have passed
    setIsFormValid(Object.values(newValidations).every(Boolean));

  }, [username, email, password]);

    const [showVerifyModal, setShowVerifyModal] = useState(false);
    const [sendCodeSuccess, setSendCodeSuccess] = useState(false);

    function handleCloseSnackbar() {
        setRegisterSuccess(false);
        setUsernameError(false);
        setEmailError(false);
        setPasswordLengthError(false);
        setPasswordError(false);
        setUsernameTakenError(false);
        setEmailTakenError(false);
    };

    function togglePasswordVisibility() {
        setPasswordVisible(!passwordVisible);
    };
    
    function validateEmail(email){
        const regex = /^[A-Za-z0-9._%+-]+@(siswa\.)?um\.edu\.my$/;
        return regex.test(email);
    };
    
    function validatePassword(password){
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
        return regex.test(password);
    };

    async function handleValidation(e){
        e.preventDefault();
    
        if (username.trim().length < 3 || username.trim().length > 10) {
            setUsernameError(true);
            return;
        }
    
        if (!validateEmail(email)) {
            setEmailError(true);
            return;
        }

        if (password.trim().length < 8 || password.trim().length > 16) {
          setPasswordLengthError(true);
          return;
        }
    
        if (!validatePassword(password)) {
            setPasswordError(true);
            return;
        }
        const response = await verifyEmail(username, email, password);
        if (!response.ok) {
          const result = await response.json();
          const message = `An error occurred: ${response.status} ${result.message}`;
          console.error(message);
          if (result.message.includes("Email already registered")) {
            setEmailTakenError(true);
          } else if (result.message.includes("Username already exists")) {
            setUsernameTakenError(true);
          }
          return;
        }
        setSendCodeSuccess(true);
        setShowVerifyModal(true);
    }
    
    async function handleRegister(email, code) {
        const verification = await verifyEmailCode(email, code);
        if (!verification) {
          const message = `Email verification failed.`;
          console.error(message); 
          return null;
        }

        const response = await register(username, email, password);
        if (!response.ok) {
          const result = await response.json();
          const message = `An error occurred: ${response.status} ${result.message}`;
          console.error(message);
          return null;
        }

        const result = await response.json();
        //console.log(result);
        setRegisterSuccess(true);
        return result;
    };
    
    return (
        <form onSubmit={handleValidation} className="space-y-4">
          <input
                type="text"
                maxLength={10}
                placeholder="Username"
                className="w-full px-3 py-2 rounded-lg bg-zinc-100 text-black placeholder-gray-600 dark:bg-zinc-700 dark:text-white dark:placeholder-gray-300"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
          />
          <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 rounded-lg bg-zinc-100 text-black placeholder-gray-600 dark:bg-zinc-700 dark:text-white dark:placeholder-gray-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
          />
          <div className="w-full px-3 py-2 rounded-lg bg-zinc-100 text-black placeholder-gray-600 dark:bg-zinc-700 dark:text-white dark:placeholder-gray-300 flex justify-between items-center focus-within:ring-2" >
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
           <ValidationRequirements validations={validations} />
          <button
            type="submit"
            className="shadow-lg w-full p-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 active:scale-95 active:bg-yellow-500  transition transform cursor-pointer"
          >
            Register
          </button>

          {/* Register Success Alert */}
          <SnackbarAlert
            open={registerSuccess}
            anchorOrigin={{ vertical:"top", horizontal:"center" }}
            onClose={handleCloseSnackbar}
            severity="success"
            message="Register Success"
          />

          {/* Invalid Username Alert */}
          <SnackbarAlert
            open={usernameError}
            anchorOrigin={{ vertical:"top", horizontal:"center" }}
            onClose={handleCloseSnackbar}
            severity="error"
            message="Username must be between 3 and 10 characters long."
          />

          {/* Invalid Email Alert */}
          <SnackbarAlert
            open={emailError}
            anchorOrigin={{ vertical:"top", horizontal:"center" }}
            onClose={handleCloseSnackbar}
            severity="error"
            message='Please use a valid "siswa.um.edu.my" email address.'
          />

           {/* Invalid Password Length Alert */}
          <SnackbarAlert
            open={passwordLengthError}
            anchorOrigin={{ vertical:"top", horizontal:"center" }}
            onClose={handleCloseSnackbar}
            severity="error"
            message="Password must be between 8 and 16 characters long."
          />

           {/* Invalid Password Alert */}
          <SnackbarAlert
            open={passwordError}
            anchorOrigin={{ vertical:"top", horizontal:"center" }}
            autoHideDuration={2500}
            onClose={handleCloseSnackbar}
            severity="error"
            message="Password must include uppercase, lowercase, number, and special character."
          />

          {/* Username Taken Alert */}
          <SnackbarAlert
            open={usernameTakenError}
            anchorOrigin={{ vertical:"top", horizontal:"center" }}
            onClose={handleCloseSnackbar}
            severity="error"
            message="Username already taken"
          />

          {/* Email Taken Alert */}
          <SnackbarAlert
            open={emailTakenError}
            anchorOrigin={{ vertical:"top", horizontal:"center" }}
            onClose={handleCloseSnackbar}
            severity="error"
            message="Email already registered"
          />

           {/* Send Code Success Alert */}
          <SnackbarAlert
            open={sendCodeSuccess}
            anchorOrigin={{ vertical:"top", horizontal:"center" }}
            onClose={() => setSendCodeSuccess(false)}
            severity="success"
            message="A verification code has been sent to email."
          />

          <VerifyEmailDialog
            email={email}
            open={showVerifyModal}
            onClose={() => setShowVerifyModal(false)}
            onVerifyCode={handleRegister}
          />
        </form>
      );
}

export default RegisterForm;