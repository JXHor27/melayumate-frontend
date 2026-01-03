import { FaCalendarCheck, FaCheckCircle } from 'react-icons/fa'; // Example icons
import { GiCrossedSwords } from "react-icons/gi";
import { BookOpenIcon } from '@heroicons/react/24/outline'; // Using the clean outline style
import formatRelativeTime from '../../utility/formatRelativeTime';
function NotificationItem({ notification }) {
  const ICONS = {
    REMINDER: {
      icon: <FaCalendarCheck />,
      bgColor: 'bg-yellow-500/30 dark:bg-yellow-500/20',
      textColor: 'text-yellow-500 dark:text-yellow-400',
    },
    ACHIEVEMENT: {
      icon: <FaCheckCircle />,
      bgColor: 'bg-green-500/30 dark:bg-green-500/20',
      textColor: 'text-green-500 dark:text-green-400',
    },
    BATTLE_CHALLENGE: {
      icon: <GiCrossedSwords size={20}/>,
      bgColor: 'bg-red-500/20',
      textColor: 'text-red-500 dark:text-red-400',
    },
    NEW_LESSON_AVAILABLE: {
      icon: <BookOpenIcon className="h-5 w-5" />,
      bgColor: 'bg-blue-500/30 dark:bg-blue-500/20',
      textColor: 'text-blue-500 dark:text-blue-400',
    },
  };

  const { icon, bgColor, textColor } = ICONS[notification.notificationType] || ICONS.GOAL_REMINDER;

  return (
    <div className={`flex items-start p-4 transition-colors duration-200 ${notification.isRead ? 'opacity-60' : 'hover:bg-gray-300/70 dark:hover:bg-gray-700/50'}`}>
      {/* Icon */}
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4 ${bgColor} ${textColor}`}>
        {icon}
      </div>
      {/* Content */}
      <div className="flex-grow">
        <p className="font-semibold text-gray-900 dark:text-gray-100">{notification.title}</p>
        <p className="text-sm text-gray-800 dark:text-gray-300">{notification.message}</p>
        <p className="text-xs text-gray-700 dark:text-gray-500 mt-1">{formatRelativeTime(notification.createdAt)}</p>
      </div>
      {/* Unread Dot */}
      {!notification.isRead && (
        <div className="flex-shrink-0 w-2.5 h-2.5 bg-blue-500 rounded-full ml-4 mt-1"></div>
      )}
    </div>
  );
};

export default NotificationItem;