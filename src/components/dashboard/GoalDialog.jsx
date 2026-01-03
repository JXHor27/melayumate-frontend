import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
function GoalDialog( { open, onClose, goalInput, onGoalInputChange, handleSaveGoal, disabled } ){
    return (
        <Dialog open={open} onClose={onClose} className="rounded-2xl">
            <DialogTitle className="dark:bg-gray-800 dark:text-gray-100">Daily Practice Goal</DialogTitle>
            <div className="px-6 py-2 border-t-1 border-black dark:border-white dark:bg-gray-800 text-black dark:text-gray-100">
                <label className="block mb-1 text-gray-700 dark:text-gray-100">Number of practices per day:</label>
                <input
                type="number"
                min={0}
                max={100}
                value={goalInput}
                onChange={(e) => onGoalInputChange( e.target.value )}
                className="w-full p-2 rounded border border-gray-300"
                />
            </div>
            <DialogActions className="dark:bg-gray-800">
                <Button onClick={onClose} variant="outlined">Cancel</Button>
                <Button
                    onClick={handleSaveGoal}
                    variant="contained"
                    disabled={disabled}
                    sx={{
                        '&.Mui-disabled': {
                            '.dark &': {
                                bgcolor: '#263238',
                                color: '#455a64',
                                boxShadow: 'none'
                            }
                        },
                    }}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}



export default GoalDialog;