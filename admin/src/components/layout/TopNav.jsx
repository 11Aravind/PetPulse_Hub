import { useState, useEffect } from 'react';
import { FiMenu, FiBell, FiSearch, FiUser, FiLogOut, FiCheck, FiAlertCircle, FiShoppingBag, FiUsers, FiSettings } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TopNav = ({ onMenuClick }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:5001/api/notifications');
      if (response.data.success) {
        setNotifications(response.data.notifications);
        setUnreadCount(response.data.unreadCount);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast.error('Failed to load notifications');
    } finally {
      setIsLoading(false);
    }
  };

  const removeNotification = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/notifications/${id}`);
      // Update local state to remove the notification
      setNotifications(prev => prev.filter(n => n._id !== id));
      setUnreadCount(prev => prev - 1);
    } catch (error) {
      console.error('Error removing notification:', error);
      toast.error('Failed to remove notification');
    }
  };

  const removeAllNotifications = async () => {
    try {
      await axios.delete('http://localhost:5001/api/notifications');
      setNotifications([]);
      setUnreadCount(0);
    } catch (error) {
      console.error('Error removing all notifications:', error);
      toast.error('Failed to clear notifications');
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchNotifications();
    
    // Poll for new notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order':
        return <FiShoppingBag className="text-blue-500" />;
      case 'user':
        return <FiUsers className="text-green-500" />;
      case 'system':
        return <FiSettings className="text-yellow-500" />;
      default:
        return <FiAlertCircle className="text-gray-500" />;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminId');
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          {/* <button
            onClick={onMenuClick}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <FiMenu className="w-6 h-6" />
          </button> */}
          
          {/* <div className="relative mx-4">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FiSearch className="text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div> */}
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button 
              onClick={() => {
                setIsNotificationOpen(!isNotificationOpen);
                if (!isNotificationOpen) {
                  fetchNotifications();
                }
              }}
              className="p-2 text-gray-600 rounded-full hover:bg-gray-100 relative focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <FiBell className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50">
                <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-medium text-gray-900">Notifications</h3>
                  {notifications.length > 0 && (
                    <button 
                      onClick={removeAllNotifications}
                      className="text-xs text-red-600 hover:text-red-800"
                    >
                      Clear all
                    </button>
                  )}
                </div>
                
                <div className="max-h-96 overflow-y-auto">
                  {isLoading ? (
                    <div className="p-4 text-center text-gray-500">
                      Loading notifications...
                    </div>
                  ) : notifications.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                      {notifications.map((notification) => (
                        <div key={notification._id} className="group p-3 hover:bg-gray-50 cursor-pointer">
                          <div className="flex justify-between items-start">
                            <div 
                              className="flex-1"
                              onClick={() => {
                                // Add navigation based on notification type if needed
                                // navigate(`/admin/${notification.type}/${notification.referenceId}`);
                              }}
                            >
                              <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                  {getNotificationIcon(notification.type)}
                                </div>
                                <div className="ml-3 flex-1">
                                  <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900">
                                      {notification.title}
                                    </p>
                                    {!notification.isRead && (
                                      <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-500 mt-1">
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-gray-400 mt-1">
                                    {new Date(notification.createdAt).toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeNotification(notification._id);
                              }}
                              className="ml-2 p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Remove notification"
                            >
                              &times;
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No notifications
                    </div>
                  )}
                </div>
                

              </div>
            )}
          </div>
          
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <FiUser className="text-indigo-600" />
              </div>
              <span className="hidden md:inline-block text-sm font-medium text-gray-700">
                Admin
              </span>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <FiLogOut className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
