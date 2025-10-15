// --- The Bell Icon Component (This is what you'll put in your Navbar) ---
import { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa'; // Example icons
import NotificationPanel from './NotificationPanel';

const mockNotifications = [
  {
    id: 'notif1',
    type: 'GOAL_REMINDER',
    title: 'Daily Goal Reminder',
    message: "You're close to your daily goal of 2 practices! Keep up the great work.",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
  },
  {
    id: 'notif2',
    type: 'ACHIEVEMENT',
    title: 'Streak Unlocked!',
    message: 'You have completed your daily goal for 3 days in a row. Amazing!',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
  },
  {
    id: 'notif3',
    type: 'ACHIEVEMENT',
    title: 'Level Up!',
    message: 'Congratulations, you have reached Level 5!',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7 * 4).toISOString(), // 4 weeks ago
  },
  {
    id: 'notif4',
    type: 'ACHIEVEMENT',
    title: 'Level Udfsfsdfsp!',
    message: 'Congratulations, you have reached Level 5!',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7 * 4).toISOString(), // 4 weeks ago
  },
  {
    id: 'notif5',
    type: 'ACHIEVEMENT',
    title: 'Level Udfsfsdfsp!',
    message: 'asdasdasd, you have reached Level 5!',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7 * 4).toISOString(), // 4 weeks ago
  },
];

function NotificationBell({ parentNotifications, readNotifications }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(parentNotifications);

  useEffect(() => {
      console.log("Notifications updated:", parentNotifications)
      setNotifications(parentNotifications);
  }, [parentNotifications]);

 // const hasNotifications = notifications === null ? true : false;
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  async function handleMarkAllAsRead() {
    if (notifications.length == 0)
      return;
    const result = await readNotifications();
    if (!result)
      return;
    setNotifications(
      notifications.map((notif) => ({ ...notif, isRead: true }))
    );
  };
 
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-400 hover:text-white focus:outline-none cursor-pointer"
      >
        <FaBell size={22} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
        )}
      </button>

      {isOpen && (
        <NotificationPanel
          notifications={notifications}
          onMarkAllAsRead={handleMarkAllAsRead}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default NotificationBell;