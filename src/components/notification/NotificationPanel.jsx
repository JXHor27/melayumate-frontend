// --- The Main Notification Panel Component ---
import { useRef, useEffect } from "react";
import NotificationItem from "./NotificationItem";
function NotificationPanel({ notifications, onMarkAllAsRead, onClose }) {
  const panelRef = useRef();
  useClickOutside(panelRef, onClose);

  return (
    <div
      ref={panelRef}
      className="absolute top-full right-0 mt-2 w-65 md:w-96 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl text-white z-50"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h3 className="font-bold text-lg">Notifications</h3>
        <button
          onClick={onMarkAllAsRead}
          className="text-sm text-blue-400 hover:underline focus:outline-none cursor-pointer"
        >
          Mark all as read
        </button>
      </div>

      {/* Notification List */}
      <div className="max-h-[70vh] overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <NotificationItem key={notif.notificationId} notification={notif} />
          ))
        ) : (
          <p className="p-8 text-center text-gray-400">You have no new notifications.</p>
        )}
      </div>
    </div>
  );
};

// --- HELPER HOOK: Detects clicks outside of a referenced component ---
function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
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

export default NotificationPanel;