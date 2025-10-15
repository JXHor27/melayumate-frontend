import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function OkDialog({ open, onClose, title, message }) {
    return(
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <div className="border-t-1 border-black px-6 py-2">{message}</div>
            <DialogActions>
                <Button onClick={onClose} color="primary" variant="contained">OK</Button>
            </DialogActions>
        </Dialog>
    );
}

export default OkDialog;