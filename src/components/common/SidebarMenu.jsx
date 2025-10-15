import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaUser, FaBookOpen, FaVrCardboard, FaShoePrints, FaDog, FaGamepad, FaComments, FaArrowLeft } from "react-icons/fa";
import branding from  "../../assets/images/branding_v2.png"
import { NavLink } from 'react-router-dom';

function SidebarMenu() {

  function SidebarItem({ icon, label, to }) {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = location.pathname.startsWith(to);
    return (
      <button className={`flex items-center text-left w-full
       px-2 py-1 text-base hover:bg-gray-800 rounded cursor-pointer
       ${isActive 
            ? 'border-1 border-blue-400 bg-gray-800 text-blue-400' 
               : 'hover:bg-gray-800 text-gray-200'}
          `}
            onClick={() => navigate(to)}
      >
      <span className="mr-3">{icon}</span>
      {label}
      </button>
    );
  }

  return (
    <div className={`hidden sm:block w-64 h-screen bg-zinc-900 text-white fixed top-0 left-0 flex flex-col items-start p-6 space-y-1`}>
      <div className="flex items-center space-x-2 text-yellow-400 text-2xl font-bold mb-4">
        {/* Branding Logo */}
        <img className="h-50% w-70 self-start" src={branding} alt="Branding" />
      </div>

      <div className="text-sm text-gray-400">GENERAL</div>
      <nav className="flex flex-col space-y-1 w-full text-lg">
        <SidebarItem icon={<FaHome size={24}/>} label="Dashboard" to="/dashboard"/>
        <SidebarItem icon={<FaUser size={24}/>} label="My Profile" to="/profile" />
      </nav>

      <div className="text-sm text-gray-400 mt-4">LEARN</div>
      <nav className="flex flex-col space-y-1 w-full">
        <SidebarItem icon={<FaBookOpen size={24}/>} label="Lesson" to="/lesson" />
        <SidebarItem icon={<FaVrCardboard size={24}/>} label="Flashcard" to="/flashcard" />
        <SidebarItem icon={<FaShoePrints size={24}/>} label="Learn From Situation" to="/situation"/>
      </nav>

      <div className="text-sm text-gray-400 mt-4">PLAY</div>
      <nav className="flex flex-col space-y-1 w-full">
        <SidebarItem icon={<FaDog size={24}/>} label="Character" to="/character"/>
        <SidebarItem icon={<FaGamepad size={24}/>} label="Game shop" to="/gameshop"/>
      </nav>

      <div className="text-sm text-gray-400 mt-4">COMMUNITY</div>
      <nav className="flex flex-col space-y-1 w-full">
        <SidebarItem icon={<FaComments size={24}/>} label="Discussion" to="/discussion"/>
      </nav>
      
    </div>

   
  );
}
export default SidebarMenu;

// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import branding from  "../../assets/images/branding_v2.png"
// import { 
//   FaHome, FaUser, FaBookOpen, FaVrCardboard, FaShoePrints, 
//   FaDog, FaGamepad, FaComments, FaArrowLeft 
// } from 'react-icons/fa';

// // The SidebarItem sub-component can stay inside or be moved out, it doesn't change.
// function SidebarItem({ icon, label, to }) {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const isActive = location.pathname.startsWith(to);
//   return (
//     <button
//       className={`flex items-center text-left w-full px-2 py-2 text-base rounded cursor-pointer transition-colors
//         ${isActive 
//           ? 'bg-blue-600 text-white font-semibold' 
//           : 'text-gray-300 hover:bg-zinc-800 hover:text-white'
//         }`}
//       onClick={() => navigate(to)}
//     >
//       <span className="mr-4">{icon}</span>
//       {label}
//     </button>
//   );
// }

// // Main component is now simpler and controlled by props
// function SidebarMenu({ isOpen, toggleSidebar }) {
//   return (
//     // The main div now handles positioning and transitions
//     <div
//       className={`
//         fixed top-0 left-0 h-full w-64 bg-zinc-900 text-white
//         flex flex-col p-4 space-y-2 z-50
//         transform transition-transform duration-300 ease-in-out
//         ${isOpen ? 'translate-x-0' : '-translate-x-full'}
//       `}
//     >
//       <div className="flex justify-between items-center mb-6">
//         {/* Branding Logo */}
//         <img className="h-auto w-3/4" src={branding} alt="Branding" />
//         {/* The new "close" button, only visible on mobile layouts */}
//         <button onClick={toggleSidebar} className="text-gray-400 hover:text-white md:hidden">
//           <FaArrowLeft size={24} />
//         </button>
//       </div>

//       <div className="text-sm text-gray-500 font-semibold uppercase tracking-wider">GENERAL</div>
//       <nav className="flex flex-col space-y-1 w-full">
//         <SidebarItem icon={<FaHome size={20}/>} label="Dashboard" to="/dashboard"/>
//         <SidebarItem icon={<FaUser size={20}/>} label="My Profile" to="/profile" />
//       </nav>

//       <div className="text-sm text-gray-500 font-semibold uppercase tracking-wider pt-4">LEARN</div>
//       <nav className="flex flex-col space-y-1 w-full">
//         <SidebarItem icon={<FaBookOpen size={20}/>} label="Lesson" to="/lesson" />
//         <SidebarItem icon={<FaVrCardboard size={20}/>} label="Flashcard" to="/flashcard" />
//         <SidebarItem icon={<FaShoePrints size={20}/>} label="Learn From Situation" to="/situation"/>
//       </nav>

//       {/* Add your other sections here... */}
//       <div className="text-sm text-gray-500 font-semibold uppercase tracking-wider pt-4">PLAY</div>
//       <nav className="flex flex-col space-y-1 w-full">
//         <SidebarItem icon={<FaDog size={20}/>} label="Character" to="/character"/>
//         <SidebarItem icon={<FaGamepad size={20}/>} label="Game shop" to="/gameshop"/>
//       </nav>

//       <div className="text-sm text-gray-500 font-semibold uppercase tracking-wider pt-4">COMMUNITY</div>
//       <nav className="flex flex-col space-y-1 w-full">
//         <SidebarItem icon={<FaComments size={20}/>} label="Discussion" to="/discussion"/>
//       </nav>
//     </div>
//   );
// }

// export default SidebarMenu;