import formatTimestamp from "../../utility/formatTimestamp";
import { useAuth } from '../../context/AuthContext';
import chat from '../../assets/images/steel-bot.png';

function MessageItem({ msg }) {
  const { username } = useAuth();

  const isCurrentUser = msg.username === username;

  return (
    <div className={`flex items-start gap-3 ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
      <img src={chat} alt={msg.username} className="w-14 h-14 rounded-full" />
      <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
        <div className="flex items-center gap-2">
          {!isCurrentUser && (
            <span className="font-bold text-sm text-gray-100">{msg.username}</span>
          )}
          <span className="text-xs px-2 py-0.5 bg-purple-600 text-white rounded-full">
            L{msg.currentLevel}
          </span>
        </div>
        <div className={`mt-1 p-3 rounded-lg w-auto max-w-35 sm:max-w-55 md:max-w-65 break-words ${isCurrentUser ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
          {msg.message}
        </div>
        <span className="text-xs text-gray-500 mt-1">{formatTimestamp(msg.sentAt)}</span>
      </div>
    </div>
  );
};

export default MessageItem;