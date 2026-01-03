import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function VerifyEmailDialog({ email, open, onClose, onVerifyCode }) {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");

    async function handleVerifyCode() {
        if (!code.trim()) {
            setError("Please enter the code.");
            return;
        }
        setError("");
        try {
            const result = await onVerifyCode(email, code);
            if (!result) {
                setError("Invalid or expired code.");
                return;
            }
            handleClose();
        } catch (e) {
            setError("Invalid or expired code.");
        }
    };

    const handleClose = () => {
        setCode("");
        setError("");
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle className="dark:bg-zinc-900 dark:text-white">Enter Verification Code</DialogTitle>
                <div className="border-t-1 border-black dark:border-white text-black dark:text-white dark:bg-zinc-900 px-6 py-2">
                    Please check your email for the code and enter it below.
                </div>
                 <div className="px-6 pb-2 dark:bg-zinc-900">
                    <input
                        type="text"
                        placeholder="Enter code"
                        maxLength={6}
                        className="w-full p-2 rounded bg-zinc-300 text-black dark:bg-zinc-700 dark:text-white"
                        value={code}
                        onChange={e => setCode(e.target.value)}
                    />
                    {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
                </div>
                <DialogActions className="dark:bg-zinc-900">
                    <Button onClick={handleClose} variant="outlined">Cancel</Button>
                    <Button onClick={handleVerifyCode} color="primary" variant="contained">Verify</Button>
                </DialogActions>
        </Dialog>
    );
}

export default VerifyEmailDialog;