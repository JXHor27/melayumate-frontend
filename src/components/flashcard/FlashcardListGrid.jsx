import { GiCardExchange } from "react-icons/gi";

function FlashcardListGrid({ list, onOpen }){
    return(
        <div
            className="w-57 h-70 bg-gradient-to-b from-sky-950 to-gray-950 to-20% text-black rounded-lg p-4 shadow-md hover:shadow-lg transition-all flex flex-col justify-evenly items-center m-6 border-t-2 border-blue-500"
        >
            <div className="flex self-start -mt-5">
            <GiCardExchange size={25} color="white" />
            <p className="text-sm text-gray-200 ml-3">{list.flashcardNumber} cards</p>
            </div>
            <h2 className="text-lg text-gray-200 font-semibold mb-2 break-all">{list.title}</h2>
            <p className="text-sm text-gray-400 mb-4 break-all">{list.description}</p>
            <button
                className="border-b-2 border-cyan-300 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded w-full cursor-pointer"
                onClick={() => onOpen(list.flashcardListId)}
            >
            Open
            </button>
        </div>
    );
}


export default FlashcardListGrid;