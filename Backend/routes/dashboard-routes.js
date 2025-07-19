import express from 'express';
import { getDashboardStats, getRecentActivity } from '../controllers/dashboard-controller.js';

const router = express.Router();

// Get dashboard statistics
router.get('/stats', getDashboardStats);

// Get recent activity
router.get('/recent-activity', getRecentActivity);

export default router;
