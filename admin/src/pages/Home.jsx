import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Register the required components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const StatCard = ({ title, value, icon, color }) => (
    <div className="col-md-3 mb-4">
        <div className="card border-0 shadow-sm h-100" style={{ backgroundColor: color, color: 'white' }}>
            <div className="card-body d-flex align-items-center">
                <div className="me-3">
                    <i className={`fas fa-${icon} fa-3x`}></i>
                </div>
                <div>
                    <h6 className="mb-0">{title}</h6>
                    <h3 className="mb-0">{value}</h3>
                </div>
            </div>
        </div>
    </div>
);

const RecentActivity = ({ title, items, type }) => (
    <div className="card h-100">
        <div className="card-header bg-white">
            <h6 className="mb-0">{title}</h6>
        </div>
        <div className="card-body p-0">
            <ul className="list-group list-group-flush">
                {items && items.length > 0 ? (
                    items.map((item, index) => (
                        <li key={index} className="list-group-item border-0">
                            {type === 'order' && (
                                <div>
                                    <div className="d-flex justify-content-between">
                                        <span><strong>Order #{item._id.slice(-6)}</strong></span>
                                        <span>₹{item.totelamount / 100}</span>
                                    </div>
                                    <div className="text-muted small">
                                        {item.userId?.name || 'Guest'}
                                    </div>
                                </div>
                            )}
                            {type === 'product' && (
                                <div className="d-flex align-items-center">
                                    <img 
                                        src={`http://localhost:5001/${item.image}`} 
                                        alt={item.name} 
                                        style={{ width: '40px', height: '40px', objectFit: 'cover', marginRight: '10px' }} 
                                    />
                                    <div>
                                        <div>{item.name}</div>
                                        <div className="text-muted small">₹{item.newPrice}</div>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))
                ) : (
                    <li className="list-group-item text-muted">No recent {type} found</li>
                )}
            </ul>
        </div>
    </div>
);

const Home = () => {
    const [stats, setStats] = useState(null);
    const [recentActivity, setRecentActivity] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const [statsRes, activityRes] = await Promise.all([
                axios.get('http://localhost:5001/api/dashboard/stats'),
                axios.get('http://localhost:5001/api/dashboard/recent-activity')
            ]);

            if (statsRes.data.success) {
                setStats(statsRes.data.stats);
            }

            if (activityRes.data.success) {
                setRecentActivity(activityRes.data.recentActivity);
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    // Chart data
    const salesChartData = {
        labels: stats?.labels || [],
        datasets: [
            {
                label: 'Sales (₹)',
                data: stats?.monthlySales || [],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
            {
                label: 'Orders',
                data: stats?.orderCounts || [],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                type: 'line',
                yAxisID: 'y1',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Sales & Orders Overview',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Sales (₹)',
                },
            },
            y1: {
                beginAtZero: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false,
                },
                title: {
                    display: true,
                    text: 'Orders',
                },
            },
        },
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid py-4">
            <h2 className="mb-4">Dashboard Overview</h2>
            
            {/* Stats Cards */}
            <div className="row mb-4">
                <StatCard 
                    title="Total Revenue" 
                    value={`₹${stats?.totalRevenue / 100 || '0'}`} 
                    icon="dollar-sign" 
                    color="#4e73df"
                />
                <StatCard 
                    title="Total Orders" 
                    value={stats?.totalOrders || '0'} 
                    icon="shopping-cart" 
                    color="#1cc88a"
                />
                <StatCard 
                    title="Total Products" 
                    value={stats?.totalProducts || '0'} 
                    icon="box" 
                    color="#f6c23e"
                />
                <StatCard 
                    title="Total Users" 
                    value={stats?.totalUsers || '0'} 
                    icon="users" 
                    color="#e74a3b"
                />
            </div>

            {/* Charts */}
            <div className="row mb-4">
                <div className="col-lg-8 mb-4">
                    <div className="card shadow h-100">
                        <div className="card-body">
                            <Bar data={salesChartData} options={chartOptions} />
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 mb-4">
                    <div className="card shadow h-100">
                        <div className="card-body">
                            <h6 className="mb-3">Top Selling Products</h6>
                            {stats?.topProducts && stats.topProducts.length > 0 ? (
                                <ul className="list-group list-group-flush">
                                    {stats.topProducts.map((product, index) => (
                                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                            <span>{product._id}</span>
                                            <span className="badge bg-primary rounded-pill">
                                                {product.totalQuantity} sold
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="text-muted">No sales data available</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="row">
                <div className="col-md-6 mb-4">
                    <RecentActivity 
                        title="Recent Orders" 
                        items={recentActivity?.orders} 
                        type="order" 
                    />
                </div>
                <div className="col-md-6 mb-4">
                    <RecentActivity 
                        title="Recently Added Products" 
                        items={recentActivity?.products} 
                        type="product" 
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
