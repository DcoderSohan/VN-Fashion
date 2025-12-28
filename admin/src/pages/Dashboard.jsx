import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MessageSquare, 
  TrendingUp, 
  Users,
  Loader2,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { bookingsApi, contactsApi } from '../utils/contentApi';
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    confirmedOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    totalContacts: 0,
  });

  useEffect(() => {
    fetchData();
    
    // Listen for custom booking update events (only refresh when booking is actually updated)
    const handleBookingUpdate = () => {
      fetchData();
    };
    window.addEventListener('bookingUpdated', handleBookingUpdate);
    
    // Only auto-refresh when tab is visible and user is not actively working
    let interval;
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab is hidden, clear interval
        if (interval) {
          clearInterval(interval);
          interval = null;
        }
      } else {
        // Tab is visible, start refresh (every 60 seconds - less intrusive)
        interval = setInterval(fetchData, 60000);
      }
    };
    
    // Start interval only if tab is visible
    if (!document.hidden) {
      interval = setInterval(fetchData, 60000); // Refresh every 60 seconds
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
      window.removeEventListener('bookingUpdated', handleBookingUpdate);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [bookingsRes, contactsRes] = await Promise.all([
        bookingsApi.getAll(),
        contactsApi.getAll()
      ]);
      
      const bookingsData = bookingsRes.data || [];
      const contactsData = contactsRes.data || [];
      
      setBookings(bookingsData);
      setContacts(contactsData);

      // Calculate statistics
      const pending = bookingsData.filter(b => b.status === 'pending').length;
      const confirmed = bookingsData.filter(b => b.status === 'confirmed').length;
      const completed = bookingsData.filter(b => b.status === 'completed').length;
      const cancelled = bookingsData.filter(b => b.status === 'cancelled').length;

      setStats({
        totalOrders: bookingsData.length,
        pendingOrders: pending,
        confirmedOrders: confirmed,
        completedOrders: completed,
        cancelledOrders: cancelled,
        totalContacts: contactsData.length,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Prepare data for charts
  const allStatusData = [
    { name: 'Pending', value: stats.pendingOrders, color: '#fbbf24' },
    { name: 'Confirmed', value: stats.confirmedOrders, color: '#10b981' },
    { name: 'Completed', value: stats.completedOrders, color: '#3b82f6' },
    { name: 'Cancelled', value: stats.cancelledOrders, color: '#ef4444' },
  ];
  
  // Filter out zero values for pie chart rendering (but keep all for legend)
  const statusData = allStatusData.filter(item => item.value > 0);

  // Orders by date (last 7 days)
  const getOrdersByDate = () => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const count = bookings.filter(b => {
        const bookingDate = new Date(b.timestamp).toISOString().split('T')[0];
        return bookingDate === dateStr;
      }).length;
      last7Days.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        orders: count
      });
    }
    return last7Days;
  };

  // Orders by status for bar chart
  const statusBarData = [
    { name: 'Pending', orders: stats.pendingOrders },
    { name: 'Confirmed', orders: stats.confirmedOrders },
    { name: 'Completed', orders: stats.completedOrders },
    { name: 'Cancelled', orders: stats.cancelledOrders },
  ];

  const COLORS = ['#fbbf24', '#10b981', '#3b82f6', '#ef4444'];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Monitor your orders, contacts, and business analytics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 opacity-80" />
            <ArrowUpRight className="w-5 h-5 opacity-80" />
          </div>
          <h3 className="text-2xl font-bold">{stats.totalOrders}</h3>
          <p className="text-sm opacity-90">Total Orders</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 opacity-80" />
            <ArrowUpRight className="w-5 h-5 opacity-80" />
          </div>
          <h3 className="text-2xl font-bold">{stats.pendingOrders}</h3>
          <p className="text-sm opacity-90">Pending Orders</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 opacity-80" />
            <ArrowUpRight className="w-5 h-5 opacity-80" />
          </div>
          <h3 className="text-2xl font-bold">{stats.confirmedOrders}</h3>
          <p className="text-sm opacity-90">Confirmed Orders</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl shadow-lg p-6 text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 opacity-80" />
            <ArrowUpRight className="w-5 h-5 opacity-80" />
          </div>
          <h3 className="text-2xl font-bold">{stats.completedOrders}</h3>
          <p className="text-sm opacity-90">Completed Orders</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg p-6 text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 opacity-80" />
            <ArrowDownRight className="w-5 h-5 opacity-80" />
          </div>
          <h3 className="text-2xl font-bold">{stats.cancelledOrders}</h3>
          <p className="text-sm opacity-90">Cancelled Orders</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <MessageSquare className="w-8 h-8 opacity-80" />
            <ArrowUpRight className="w-5 h-5 opacity-80" />
          </div>
          <h3 className="text-2xl font-bold">{stats.totalContacts}</h3>
          <p className="text-sm opacity-90">Total Contacts</p>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders Status Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Orders by Status</h2>
          {statusData.length === 0 ? (
            <div className="flex items-center justify-center h-[300px] text-gray-500">
              <p>No orders data available</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, value, percent }) => {
                    // Only show label if value is significant (> 5% of total)
                    if (percent > 0.05) {
                      return `${name}: ${value}`;
                    }
                    return '';
                  }}
                  outerRadius={100}
                  innerRadius={30}
                  fill="#8884d8"
                  dataKey="value"
                  paddingAngle={2}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value} orders`, name]}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={60}
                  wrapperStyle={{ paddingTop: '20px' }}
                  payload={allStatusData.map((item) => ({
                    value: `${item.name} (${item.value})`,
                    type: 'square',
                    id: item.name,
                    color: item.color,
                  }))}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        {/* Orders Status Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Orders Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusBarData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" fill="#3b82f6" radius={[8, 8, 0, 0]}>
                {statusBarData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Orders Trend Line Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Orders Trend (Last 7 Days)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={getOrdersByDate()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="orders" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Recent Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Refresh
          </button>
        </div>
        {bookings.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No orders yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 p-3 text-left text-sm font-semibold text-gray-700">Order ID</th>
                  <th className="border border-gray-200 p-3 text-left text-sm font-semibold text-gray-700">Customer</th>
                  <th className="border border-gray-200 p-3 text-left text-sm font-semibold text-gray-700">Service/Design</th>
                  <th className="border border-gray-200 p-3 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="border border-gray-200 p-3 text-left text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 10).map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-200 p-3 text-sm text-gray-900">
                      {booking._id?.substring(0, 8) || 'N/A'}
                    </td>
                    <td className="border border-gray-200 p-3 text-sm text-gray-900">
                      {booking.firstName} {booking.lastName}
                    </td>
                    <td className="border border-gray-200 p-3 text-sm text-gray-900">
                      {booking.serviceTitle || booking.designTitle || 'N/A'}
                    </td>
                    <td className="border border-gray-200 p-3 text-sm text-gray-900">
                      {new Date(booking.timestamp).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-200 p-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          booking.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-700'
                            : booking.status === 'completed'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {booking.status || 'pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
