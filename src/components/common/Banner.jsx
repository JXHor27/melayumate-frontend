import React, { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
function Banner({header, title, onOpen, handleSidebarToggle}){

    function sendSidebarToParent() {
        handleSidebarToggle(!onOpen);
    }

    return(
        <div className="bg-slate-200 text-gray-900 dark:bg-zinc-700 dark:text-white flex items-center rounded-md p-4 mb-8 shadow">
            <button onClick={sendSidebarToParent} className="mr-2 text-black dark:text-white text-xl hover:text-blue-400 cursor-pointer sm:hidden">
                <FaBars />
            </button>
            <p className="ml-4 text-lg mr-6">{header}</p>
            <p className='ml-auto'>MelayuMate <span className='text-zinc-400'>{'>'} {title}</span></p>
        </div> 
    )
}

export default Banner;