import { useState } from "react";
import { FaCommentDots } from 'react-icons/fa';
import ChatPanel from "./ChatPanel";
import useChatRoom from "../../hooks/chat/useChatRoom";

function ChatWidget({ avatar, currentLevel }) {
  const [isOpen, setIsOpen] = useState(false);

  const { messages, sendMessage } = useChatRoom(); 

  function handleSendMessage(text) {
    sendMessage(currentLevel, avatar, text);
  };

  function openChat() {
    setIsOpen(true);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {!isOpen && (
        <button 
          onClick={openChat}
          className="relative w-16 h-16 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-transform hover:scale-110 cursor-pointer"
        >
          <FaCommentDots size={28} />
        </button>
      )}

      {isOpen && (
          <ChatPanel 
           messages={messages}
          onSendMessage={handleSendMessage}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ChatWidget;