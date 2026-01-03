import formatTimestamp from "../../utility/formatTimestamp";
import { useAuth } from '../../context/AuthContext';

function MessageItem({ msg }) {
  const { username } = useAuth();
  const isImageAvatar =  msg?.avatar.length > 1;

  const isCurrentUser = msg.username === username;

  return (
    
    <div className={`flex items-start gap-3 ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
      {isImageAvatar ? (
        <img
          src={msg.avatar}
          alt={msg.username}
          className="w-14 h-14 rounded-full"
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-gray-500 dark:bg-zinc-700 flex items-center justify-center text-lg font-semibold text-white">
          {msg.avatar}
        </div>
      )}
      <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
        <div className="flex items-center gap-2">
          {!isCurrentUser && (
            <span className="font-bold text-sm text-black dark:text-gray-100">{msg.username}</span>
          )}
          <span className="text-xs px-2 py-0.5 bg-purple-600 text-white rounded-full">
            L{msg.currentLevel}
          </span>
        </div>
        <div className={`mt-1 p-3 rounded-lg w-auto max-w-35 sm:max-w-55 md:max-w-65 break-words ${isCurrentUser ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
          {msg.message}
        </div>
        <span className="text-xs text-gray-900 dark:text-gray-300 mt-1">{formatTimestamp(msg.sentAt)}</span>
      </div>
    </div>
  );
};

export default MessageItem;