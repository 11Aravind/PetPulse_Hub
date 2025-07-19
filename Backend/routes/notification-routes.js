import express from 'express';
import { 
    getNotifications, 
    markAsRead, 
    markAllAsRead,
    removeNotification,
    removeAllNotifications
} from '../controllers/notification-controller.js';

const router = express.Router();

// Get all notifications (most recent 10)
router.get('/', getNotifications);

// Mark a notification as read
router.patch('/:id/read', markAsRead);

// Mark all notifications as read
router.patch('/read-all', markAllAsRead);

// Remove a specific notification
router.delete('/:id', removeNotification);

// Remove all notifications
router.delete('/', removeAllNotifications);

export default router;
