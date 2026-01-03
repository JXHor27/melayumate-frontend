import React from "react";
import { FaRegWindowClose } from "react-icons/fa";
import AudioSelection from "./AudioSelection";

function DialogueForm({
  open,
  formData,
  setFormData,
  onClose,
  onSubmit,
  handleOrderChange,
  handleAudioBlob,
  audioObjectUrl,
  handleAudioObjectUrl,
  handleRecordBlob,
  handleRecordUrl,
  recordUrl,
  dialogueType, // "QUESTION" or "RESPONSE"
  handleDialogueType
}) {
    function changeDialogueType(type) {
      handleDialogueType(type);
    }
    return (
        <div className={`fixed top-0 right-0 h-full w-75 bg-slate-300 dark:bg-zinc-800 text-black dark:text-white shadow-lg transform transition-transform duration-300 z-50 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="p-3 flex justify-between items-start border-b-1 border-zinc-600">
                {/* Slider Button */}
                <div className="flex items-center space-x-2">
                <button
                    className={`px-4 py-1 rounded-l-md font-semibold transition-colors cursor-pointer ${
                    dialogueType === "QUESTION"
                        ? "bg-blue-500 text-white"
                        : "bg-zinc-400 dark:bg-zinc-700 text-gray-900 dark:text-gray-300 hover:bg-zinc-500"
                    }`}
                    onClick={() => changeDialogueType("QUESTION")}
                    type="button"
                >
                    Question
                </button>
                <button
                    className={`px-4 py-1 rounded-r-md font-semibold transition-colors cursor-pointer ${
                    dialogueType === "RESPONSE"
                        ? "bg-blue-500 text-white"
                        : "bg-zinc-400 dark:bg-zinc-700 text-gray-900 dark:text-gray-300 hover:bg-zinc-500"
                    }`}
                    onClick={() => changeDialogueType("RESPONSE")}
                    type="button"
                >
                    Response
                </button>
                </div>
                <button onClick={onClose} className="text-black dark:text-white text-xl hover:text-red-400 cursor-pointer">
                    <FaRegWindowClose size={29}/>
                </button>
            </div>
            <div className="p-4">
            <input
                type="text"
                maxLength={35}
                placeholder="English"
                className="w-full p-2 mb-1 rounded bg-slate-100 dark:bg-zinc-700 border border-zinc-600"
                value={formData.english}
                onChange={(e) => setFormData({ ...formData, english: e.target.value })}
            />
            <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-3">{formData.english.length}/35 characters</p>
            <input
                type="text"
                placeholder="Malay"
                maxLength={35}
                className="w-full p-2 mb-1 rounded bg-slate-100 dark:bg-zinc-700 border border-zinc-600"
                value={formData.malay}
                onChange={(e) => setFormData({ ...formData, malay: e.target.value })}
            />
            <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-3">{formData.malay.length}/35 characters</p>
            <input
                type='number'
                min={1}
                max={5}
                placeholder='Order (1-5)'
                className="w-full p-2 mb-1 rounded bg-slate-100 dark:bg-zinc-700 border border-zinc-600"
                value={formData.dialogueOrder}
                onChange={handleOrderChange}
            />
            <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-2">Order to be presented from 1 to 5</p>
            <AudioSelection 
                malayText={formData.malay} 
                generateBlobData={handleAudioBlob} 
                generateObjectUrl={handleAudioObjectUrl} 
                audioObjectUrl={audioObjectUrl} 
                generateRecordBlobData={handleRecordBlob} 
                generateRecordUrl={handleRecordUrl} 
                recordUrl={recordUrl} 
            />
            <button
                onClick={onSubmit}
                className="shadow-lg bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full cursor-pointer"
            >
                Submit
            </button>
            </div>
        </div>
    );
};
export default DialogueForm;

