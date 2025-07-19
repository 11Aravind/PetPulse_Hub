import Notification from '../models/notification-model.js';

export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find()
            .sort({ createdAt: -1 })
            .limit(10);
            
        const unreadCount = await Notification.countDocuments({ isRead: false });
        
        res.status(200).json({
            success: true,
            notifications,
            unreadCount
        });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching notifications'
        });
    }
};

export const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndUpdate(
            id,
            { isRead: true },
            { new: true }
        );
        
        if (!notification) {
            return res.status(404).json({
                success: false,
                message: 'Notification not found'
            });
        }
        
        res.status(200).json({
            success: true,
            notification
        });
    } catch (error) {
        console.error('Error marking notification as read:', error);
        res.status(500).json({
            success: false,
            message: 'Error marking notification as read'
        });
    }
};

export const markAllAsRead = async (req, res) => {
    try {
        await Notification.updateMany(
            { isRead: false },
            { $set: { isRead: true } }
        );
        
        res.status(200).json({
            success: true,
            message: 'All notifications marked as read'
        });
    } catch (error) {
        console.error('Error marking all notifications as read:', error);
        res.status(500).json({
            success: false,
            message: 'Error marking all notifications as read'
        });
    }
};

// Helper function to create a new notification
// export const createNotification = async (title, message, type, referenceId = null) => {
//     try {
//         const notification = new Notification({
//             title,
//             message,
//             type,
//             referenceId
//         });
        
//         await notification.save();
//         return notification;
//     } catch (error) {
//         console.error('Error creating notification:', error);
//         throw error;
//     }
// };

export const createNotification = async (title, message, type = 'info', referenceId = null) => {
    try {
        const notification = new Notification({
            title,
            message,
            type,
            referenceId,
            isRead: false
        });
        
        await notification.save();
        return notification;
    } catch (error) {
        console.error('Error creating notification:', error);
        throw error;
    }
};

export const removeAllNotifications = async (req, res) => {
    try {
        await Notification.deleteMany();
        res.status(200).json({
            success: true,
            message: 'All notifications removed'
        });
    } catch (error) {
        console.error('Error removing all notifications:', error);
        res.status(500).json({
            success: false,
            message: 'Error removing all notifications'
        });
    }
};

export const removeNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndDelete(id);
        if (!notification) {
            return res.status(404).json({
                success: false,
                message: 'Notification not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Notification removed'
        });
    } catch (error) {
        console.error('Error removing notification:', error);
        res.status(500).json({
            success: false,
            message: 'Error removing notification'
        });
    }
};
