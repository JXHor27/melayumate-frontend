// --- The Bell Icon Component (This is what you'll put in your Navbar) ---
import { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa'; // Example icons
import NotificationPanel from './NotificationPanel';

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