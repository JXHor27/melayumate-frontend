function FlashcardRow({ card, language, revealed, onReveal }){
    return (
        <div className="flex justify-center items-center bg-slate-300 dark:bg-zinc-800 p-2 rounded shadow">
            <div className={`rounded-l-xl bg-gradient-to-br from-purple-600 to-indigo-700 ${language === 'English' ? "text-white font-normal":"text-gray-300 italic font-semibold"} px-2 py-2 w-1/2 sm:w-1/4 text-center break-words h-16 md:h-16 lg:h-auto`}>
            {language === 'Malay'
                ? revealed[card.flashcardId]
                ? <p className='text-white not-italic font-normal'>{card.englishWord}</p>
                : <p className='cursor-pointer' onClick={() => onReveal(card.flashcardId)}>Reveal</p>
                : card.englishWord}
            </div>
            <div className={`rounded-r-xl bg-white ${language === 'English' ? "text-gray-700 italic font-semibold":"text-black font-normal"} px-2 py-2 w-1/2 sm:w-1/3 text-center break-words h-16 md:h-16 lg:h-auto`}>
            {language === 'English'
                ? revealed[card.flashcardId]
                ? <p className='text-black not-italic font-normal'>{card.malayWord}</p>
                : <p className='cursor-pointer' onClick={() => onReveal(card.flashcardId)}>Reveal</p>
                : card.malayWord}
            </div>
        </div>
    );
}

export default FlashcardRow;