import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function ConfirmDialog({ open, onClose, onConfirm, title, message }) {
    return(
        <Dialog open={open} onClose={onClose}>
            <DialogTitle className="dark:bg-gray-800 dark:text-gray-100">{title}</DialogTitle>
            <div className="border-t-1 border-black px-6 py-2 dark:border-white dark:bg-gray-800 dark:text-gray-100">{message}</div>
            <DialogActions className="dark:bg-gray-800 dark:text-gray-100">
                <Button onClick={onClose} variant="contained">Cancel</Button>
                <Button onClick={onConfirm} color="error" variant="contained">Delete</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmDialog;