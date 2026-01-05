import { useState, useRef, useEffect } from "react";
import { FaTimes, FaPaperPlane } from 'react-icons/fa';
import MessageItem from "./MessageItem";
function ChatPanel({ messages, onSendMessage, onClose }) {
  const [newMessage, setNewMessage] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  const panelRef = useRef();
  const messagesEndRef = useRef(null);
  useClickOutside(panelRef, onClose);

  // Auto-scroll to the bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const updateDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      const paddedMonth = String(month).padStart(2, '0');
      const paddedDay = String(day).padStart(2, '0');

      setCurrentDate(`${year}-${month}-${paddedMonth}`);
    };

    updateDate(); // Set initial date
    const intervalId = setInterval(updateDate, 1000 * 60 * 60 * 24); // Update daily

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);      
      setNewMessage('');
    }
  };

  return (
    <div ref={panelRef} className="fixed bottom-20 right-4 w-65 sm:w-85 md:w-96 h-[60vh] max-h-[600px] bg-slate-200 dark:bg-gray-800 border border-gray-700 rounded-lg shadow-2xl flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
        <h3 className="dark:font-bold text-lg text-black dark:text-white">MelayuMate Chat</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-black dark:hover:text-white cursor-pointer">
          <FaTimes size={20} />
        </button>
      </div>
    
      
      {/* Message List */}
      <div className="flex-grow p-4 overflow-y-auto space-y-6 overflow-x-hidden">
        {/* Today's Date */}
        <div className="text-center text-gray-700 dark:text-gray-400 text-sm">
          {currentDate}
        </div>
        {messages.map((msg) => (
          <MessageItem key={msg.chatId} msg={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-700 flex-shrink-0">
        <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            maxLength={100}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write a message..."
            className="w-full bg-slate-400 dark:bg-gray-700 text-black dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button type="submit" className="p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 cursor-pointer">
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
};

// --- HELPER HOOK: Detects clicks outside of a referenced component ---
function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export default ChatPanel;
