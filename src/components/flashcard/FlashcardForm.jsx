import { FaRegWindowClose } from "react-icons/fa";

function FlashcardForm({open, formData, onFormDataChange, onClose, onSubmit, isEditing}){
    return(
        <div className={`z-50 fixed top-0 right-0 h-full w-75 bg-slate-300 dark:bg-zinc-800 text-black dark:text-white shadow-lg transform transition-transform duration-300 z-50 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="p-4 flex justify-between items-start border-b-1 border-zinc-600">
            <h3 className="text-lg font-semibold">{isEditing ? "Edit Flashcard" : "Add Flashcard"}</h3>
            <button onClick={onClose} className="text-black dark:text-white text-xl hover:text-red-400 cursor-pointer"><FaRegWindowClose size={29}/></button>
            </div>
            <div className="p-4">
            <input
                type="text"
                maxLength={25}
                placeholder="English"
                className="w-full p-2 mb-1 rounded bg-slate-100 dark:bg-zinc-700 border border-zinc-600"
                value={formData.english}
                onChange={(e) => onFormDataChange({ ...formData, english: e.target.value })}
            />
            <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-5">{formData.english.length}/25 characters</p>
            <input
                type="text"
                placeholder="Malay"
                maxLength={25}
                className="w-full p-2 mb-1 rounded bg-slate-100 dark:bg-zinc-700 border border-zinc-600"
                value={formData.malay}
                onChange={(e) => onFormDataChange({ ...formData, malay: e.target.value })}
            />
            <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-5">{formData.malay.length}/25 characters</p>
            <button
                onClick={onSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full cursor-pointer">
                {isEditing ? "Save" : "Submit"}
            </button>
            </div>
        </div>
    );
}

export default FlashcardForm;