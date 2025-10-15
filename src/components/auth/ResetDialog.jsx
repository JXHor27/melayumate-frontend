import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function ResetDialog({ open, onClose, onSend, onVerifyCode, onResetPassword }) {
    const [step, setStep] = useState("email"); // "email" | "code" | "reset"
    const [resetEmail, setResetEmail] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const [passwordVisible, setPasswordVisible] = useState(false);
    
    function togglePasswordVisibility() {
        setPasswordVisible(!passwordVisible);
    };

    function validateEmail(email){
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };

      function validatePassword(password){
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return regex.test(password);
    };

    async function handleSend() {
        if (!resetEmail.trim()) {
            setError("Please enter your email.");
            return;
        }
        if (!validateEmail(resetEmail)) {
            setError("Please enter a valid email.");
            return;
        }
        setError("");
        try {
            const result = await onSend(resetEmail);
            console.log(result)
            if (!result) {
                setError("Failed to send reset code.");
                return;
            }
            setStep("code");
        } catch (e) {
            setError("Failed to send reset code.");
        }
    };

    async function handleVerifyCode() {
        if (!code.trim()) {
            setError("Please enter the code.");
            return;
        }
        setError("");
        try {
            const result = await onVerifyCode(resetEmail, code);
            console.log(result)
            if (!result) {
                setError("Invalid or expired code.");
                return;
            }
            setStep("reset");
        } catch (e) {
            setError("Invalid or expired code.");
        }
    };

    async function handleResetPassword() {
        if (!newPassword.trim()) {
            setError("Please enter a new password.");
            return;
        }
         if (!validatePassword(newPassword)) {
            setError("Password must be at least 8 characters long, include uppercase, lowercase, number, and special character.");
            return;
        }
        setError("");
        try {
            await onResetPassword(resetEmail, code, newPassword);
            setSuccess(true);
            setTimeout(() => {
                handleClose();
            }, 1000);
        } catch (e) {
            setError("Failed to reset password.");
        }
    };

    const handleClose = () => {
        setResetEmail("");
        setCode("");
        setNewPassword("");
        setError("");
        setSuccess(false);
        setStep("email");
        onClose();
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                {step === "email" && (
                    <>
                        <DialogTitle>Reset Password</DialogTitle>
                        <div className="border-t-1 border-black px-6 py-2">
                            Please enter your email to receive a reset code.
                        </div>
                        <div className="px-6 pb-2">
                            <input
                                type="text"
                                placeholder="Enter your email"
                                className="w-full p-2 rounded bg-zinc-700 text-white"
                                value={resetEmail}
                                onChange={e => setResetEmail(e.target.value)}
                            />
                            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
                        </div>
                        <DialogActions>
                            <Button onClick={handleClose} variant="outlined">Cancel</Button>
                            <Button onClick={handleSend} color="primary" variant="contained">Send Code</Button>
                        </DialogActions>
                    </>
                )}
                {step === "code" && (
                    <>
                        <DialogTitle>Enter Reset Code</DialogTitle>
                        <div className="border-t-1 border-black px-6 py-2">
                            Please check your email for the code and enter it below.
                        </div>
                        <div className="px-6 pb-2">
                            <input
                                type="text"
                                placeholder="Enter code"
                                className="w-full p-2 rounded bg-zinc-700 text-white"
                                value={code}
                                onChange={e => setCode(e.target.value)}
                            />
                            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
                        </div>
                        <DialogActions>
                            <Button onClick={handleClose} variant="outlined">Cancel</Button>
                            <Button onClick={handleVerifyCode} color="primary" variant="contained">Verify</Button>
                        </DialogActions>
                    </>
                )}
                {step === "reset" && (
                    <>
                        <DialogTitle>Set New Password</DialogTitle>
                        <div className="border-t-1 border-black px-6 py-2">
                            Enter your new password.
                        </div>
                        <div className="px-6 pb-2">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                placeholder="New password"
                                className="w-full p-2 rounded bg-zinc-700 text-white"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                            />
                            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
                            {success && <div className="text-green-500 text-sm mt-1">Password reset successfully!</div>}
                            <span><FontAwesomeIcon
                                icon={passwordVisible ? faEyeSlash : faEye}
                                onClick={togglePasswordVisibility}
                                style={{ cursor: 'pointer'}}/>
                            </span>
                        </div>
                        <DialogActions>
                            <Button onClick={handleClose} variant="outlined">Cancel</Button>
                            <Button onClick={handleResetPassword} color="primary" variant="contained">Reset</Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </>
    );
}

export default ResetDialog;