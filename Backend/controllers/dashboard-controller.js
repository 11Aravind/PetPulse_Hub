import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import User from "../models/User.js";

export const getDashboardStats = async (req, res) => {
    try {
        // Get total number of products
        const totalProducts = await Product.countDocuments();
        
        // Get total number of categories
        const totalCategories = await Category.countDocuments();
        
        // Get total number of users (excluding admins)
        const totalUsers = await User.countDocuments({ isAdmin: false });
        
        // Get total orders and revenue
        const orders = await Order.find({});
        const totalOrders = orders.length;
        const totalRevenue = orders.reduce((sum, order) => sum + (order.totelamount || 0), 0);
        
        // Get recent orders (last 5)
        const recentOrders = await Order.find({})
            .sort({ dateOfOrder: -1 })
            .limit(5)
            .populate('userId', 'name email')
            .lean();
            
        // Get sales data for the last 6 months
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        
        const monthlySales = await Order.aggregate([
            {
                $match: {
                    status: 'success',
                    dateOfOrder: { $gte: sixMonthsAgo }
                }
            },
            {
                $group: {
                    _id: { $month: { $toDate: '$dateOfOrder' } },
                    total: { $sum: '$totelamount' },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        
        // Format monthly sales data for the chart
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const salesData = Array(6).fill(0);
        const orderCounts = Array(6).fill(0);
        
        monthlySales.forEach(sale => {
            const monthIndex = sale._id - 1; // MongoDB months are 1-12
            const dataIndex = Math.max(0, monthNames.length - 6 + monthIndex);
            if (dataIndex >= 0) {
                salesData[dataIndex] = sale.total;
                orderCounts[dataIndex] = sale.count;
            }
        });
        
        // Get top selling products
        const topProducts = await Order.aggregate([
            { $unwind: '$items' },
            {
                $group: {
                    _id: '$items.name',
                    totalQuantity: { $sum: '$items.quantity' },
                    totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
                }
            },
            { $sort: { totalQuantity: -1 } },
            { $limit: 5 }
        ]);
        
        res.status(200).json({
            success: true,
            stats: {
                totalProducts,
                totalCategories,
                totalUsers,
                totalOrders,
                totalRevenue: totalRevenue.toFixed(2),
                monthlySales: salesData,
                orderCounts,
                recentOrders,
                topProducts,
                labels: monthNames.slice(-6) // Last 6 months
            }
        });
        
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching dashboard statistics',
            error: error.message
        });
    }
};

export const getRecentActivity = async (req, res) => {
    try {
        // Get recent orders, products, and user signups
        const recentOrders = await Order.find()
            .sort({ dateOfOrder: -1 })
            .limit(5)
            .populate('userId', 'name email')
            .lean();
            
        const recentProducts = await Product.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .lean();
            
        const recentUsers = await User.find({ isAdmin: false })
            .sort({ createdAt: -1 })
            .limit(5)
            .lean();
            
        res.status(200).json({
            success: true,
            recentActivity: {
                orders: recentOrders,
                products: recentProducts,
                users: recentUsers
            }
        });
        
    } catch (error) {
        console.error('Error fetching recent activity:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching recent activity',
            error: error.message
        });
    }
};
