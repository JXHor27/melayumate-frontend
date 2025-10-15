import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
function GoalDialog( { open, onClose, goalInput, onGoalInputChange, handleSaveGoal, disabled } ) {
    return (
        <Dialog open={open} onClose={onClose} className="rounded-2xl">
            <DialogTitle className="">Daily Practice Goal</DialogTitle>
            <div className="px-6 py-2 border-t-1">
                <label className="block mb-1 text-gray-700">Number of practices per day:</label>
                <input
                type="number"
                min={0}
                value={goalInput}
                onChange={(e) => onGoalInputChange( e.target.value )}
                className="w-full p-2 rounded border border-gray-300"
                />
            </div>
            <DialogActions>
                <Button onClick={onClose} variant="outlined">Cancel</Button>
                <Button onClick={handleSaveGoal} variant="contained" disabled={disabled}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}



export default GoalDialog;