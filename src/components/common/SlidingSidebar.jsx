import React from 'react';
import { FaRegWindowClose } from 'react-icons/fa';
import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaUser, FaBookOpen, FaVrCardboard, FaShoePrints, FaDog, FaGamepad, FaComments } from "react-icons/fa";
import branding from  "../../assets/images/branding_v2.png";

function SidebarItem({ icon, label, to, onNavigate }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname.startsWith(to);
  return (
    <button
      className={`flex items-center text-left w-full
        px-2 py-1 text-base hover:bg-gray-800 rounded cursor-pointer
        ${isActive 
          ? 'border-1 border-blue-400 bg-gray-800 text-blue-400' 
          : 'hover:bg-gray-800 text-gray-200'}
      `}
      onClick={() => {
        navigate(to);
        if (onNavigate) onNavigate();
      }}
    >
      <span className="mr-3">{icon}</span>
      {label}
    </button>
  );
}

function SlidingSidebar({ open, onClose }) {
  return (
    <div
      className={`sm:hidden fixed top-0 left-0 h-full w-64 bg-zinc-900 text-white shadow-lg z-50
        transform transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="p-4 flex justify-between items-center border-b border-zinc-600">
        <img className="h-10 w-auto" src={branding} alt="Branding" />
        <button onClick={onClose} className="text-white text-xl hover:text-red-400 cursor-pointer">
          <FaRegWindowClose size={29}/>
        </button>
      </div>
      <div className="p-4">
        <div className="text-sm text-gray-400">GENERAL</div>
        <nav className="flex flex-col space-y-1 w-full text-lg">
          <SidebarItem icon={<FaHome size={24}/>} label="Dashboard" to="/dashboard" onNavigate={onClose}/>
          <SidebarItem icon={<FaUser size={24}/>} label="My Profile" to="/profile" onNavigate={onClose}/>
        </nav>
        <div className="text-sm text-gray-400 mt-4">LEARN</div>
        <nav className="flex flex-col space-y-1 w-full">
          <SidebarItem icon={<FaBookOpen size={24}/>} label="Lesson" to="/lesson" onNavigate={onClose}/>
          <SidebarItem icon={<FaVrCardboard size={24}/>} label="Flashcard" to="/flashcard" onNavigate={onClose}/>
          <SidebarItem icon={<FaShoePrints size={24}/>} label="Learn From Situation" to="/situation" onNavigate={onClose}/>
        </nav>
        <div className="text-sm text-gray-400 mt-4">PLAY</div>
        <nav className="flex flex-col space-y-1 w-full">
          <SidebarItem icon={<FaDog size={24}/>} label="Character" to="/character" onNavigate={onClose}/>
          <SidebarItem icon={<FaGamepad size={24}/>} label="Game shop" to="/gameshop" onNavigate={onClose}/>
        </nav>
        <div className="text-sm text-gray-400 mt-4">COMMUNITY</div>
        <nav className="flex flex-col space-y-1 w-full">
          <SidebarItem icon={<FaComments size={24}/>} label="Discussion" to="/discussion" onNavigate={onClose}/>
        </nav>
      </div>
    </div>
  );
}

export default SlidingSidebar;