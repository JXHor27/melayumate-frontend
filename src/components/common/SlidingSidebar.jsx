import React from 'react';
import { FaRegWindowClose } from 'react-icons/fa';
import { useNavigate, useLocation } from "react-router-dom";
import { HomeIcon, UserIcon, BookOpenIcon, RectangleStackIcon, ChatBubbleBottomCenterTextIcon, DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { GiCrossedSwords, GiVintageRobot } from "react-icons/gi";
import branding from  "../../assets/images/branding_v3.png";

function SidebarItem({ icon, label, to, onNavigate }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname.startsWith(to);
  return (
    <button
      className={`flex items-center text-left w-full
        px-2 py-1 text-base hover-bg-slate-500 dark:hover:bg-gray-800 rounded cursor-pointer
        ${isActive 
          ? 'border-1 border-blue-400 bg-slate-300 dark:bg-gray-800 text-blue-600 dark:text-blue-400' 
          : 'hover:bg-slate-300 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-200'}
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
      className={`sm:hidden fixed top-0 left-0 h-full w-64 bg-slate-50 shadow-2xl dark:bg-zinc-900 text-white shadow-lg z-50
        transform transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="p-4 flex justify-between items-center border-b border-zinc-600">
        <img className="h-12 w-auto" src={branding} alt="Branding" />
        <button onClick={onClose} className="text-gray-900 dark:text-white text-xl hover:text-red-400 cursor-pointer">
          <FaRegWindowClose size={29}/>
        </button>
      </div>
      <div className="p-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">GENERAL</div>
        <nav className="flex flex-col space-y-1 w-full text-lg">
          <SidebarItem icon={<HomeIcon className="h-6 w-6" size={24}/>} label="Dashboard" to="/dashboard" onNavigate={onClose}/>
          <SidebarItem icon={<UserIcon className="h-6 w-6" size={24}/>} label="My Profile" to="/profile" onNavigate={onClose}/>
        </nav>
        <div className="text-sm text-gray-600 dark:text-gray-400 mt-4">LEARN</div>
        <nav className="flex flex-col space-y-1 w-full">
          <SidebarItem icon={<BookOpenIcon className="h-6 w-6" />} label="Lesson" to="/lesson" onNavigate={onClose}/>
          <SidebarItem icon={<RectangleStackIcon className="h-6 w-6" size={24}/>} label="Flashcard" to="/flashcard" onNavigate={onClose}/>
          <SidebarItem icon={<ChatBubbleBottomCenterTextIcon  className="h-6 w-6" size={24}/>} label="Learn From Situation" to="/situation" onNavigate={onClose}/>
        </nav>
        <div className="text-sm text-gray-600 dark:text-gray-400 mt-4">PLAY</div>
        <nav className="flex flex-col space-y-1 w-full">
          <SidebarItem icon={<GiVintageRobot size={24}/>} label="Character" to="/character" onNavigate={onClose}/>
        <SidebarItem icon={<GiCrossedSwords size={24}/>} label="Battle" to="/battle" onNavigate={onClose}/>
        </nav>
        <div className="text-sm text-gray-600 dark:text-gray-400 mt-4">DOCUMENTATION</div>
        <nav className="flex flex-col space-y-1 w-full">
          <SidebarItem icon={<DocumentMagnifyingGlassIcon className="h-6 w-6" size={24}/>} label="User Guide" to="/guide" onNavigate={onClose}/>
        </nav>
      </div>
    </div>
  );
}

export default SlidingSidebar;