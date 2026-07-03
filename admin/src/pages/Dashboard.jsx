import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MessageSquare, 
  TrendingUp,
  Loader2,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw
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

const THEME_COLORS = ['#1a1a1a', '#555555', '#888888', '#cccccc'];

const statCards = (stats) => [
  { label: 'Total Orders', value: stats.totalOrders, icon: Calendar, trend: 'up', note: 'All time' },
  { label: 'Pending', value: stats.pendingOrders, icon: TrendingUp, trend: 'up', note: 'Needs attention' },
  { label: 'Confirmed', value: stats.confirmedOrders, icon: Calendar, trend: 'up', note: 'In progress' },
  { label: 'Completed', value: stats.completedOrders, icon: ArrowUpRight, trend: 'up', note: 'Fulfilled' },
  { label: 'Cancelled', value: stats.cancelledOrders, icon: ArrowDownRight, trend: 'down', note: 'Closed' },
  { label: 'Contacts', value: stats.totalContacts, icon: MessageSquare, trend: 'up', note: 'Enquiries' },
];

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
    
    const handleBookingUpdate = () => fetchData();
    window.addEventListener('bookingUpdated', handleBookingUpdate);
    
    let interval;
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (interval) { clearInterval(interval); interval = null; }
      } else {
        interval = setInterval(fetchData, 60000);
      }
    };
    
    if (!document.hidden) interval = setInterval(fetchData, 60000);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      if (interval) clearInterval(interval);
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

  const allStatusData = [
    { name: 'Pending', value: stats.pendingOrders, color: '#1a1a1a' },
    { name: 'Confirmed', value: stats.confirmedOrders, color: '#555555' },
    { name: 'Completed', value: stats.completedOrders, color: '#888888' },
    { name: 'Cancelled', value: stats.cancelledOrders, color: '#cccccc' },
  ];
  
  const statusData = allStatusData.filter(item => item.value > 0);

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

  const statusBarData = [
    { name: 'Pending', orders: stats.pendingOrders },
    { name: 'Confirmed', orders: stats.confirmedOrders },
    { name: 'Completed', orders: stats.completedOrders },
    { name: 'Cancelled', orders: stats.cancelledOrders },
  ];

  const getStatusStyle = (status) => {
    const styles = {
      pending: 'border border-gray-300 text-gray-700 bg-gray-50',
      confirmed: 'border border-black text-black bg-white',
      completed: 'border border-gray-700 text-white bg-gray-800',
      cancelled: 'border border-red-200 text-red-600 bg-red-50',
    };
    return styles[status] || styles.pending;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="animate-spin text-black" size={36} />
      </div>
    );
  }

  const cards = statCards(stats);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 
            className="text-4xl sm:text-5xl font-light text-black mb-1"
            style={{ fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" }}
          >
            Dashboard
          </h1>
          <p className="text-xs text-gray-400 tracking-widest uppercase">Overview & Analytics</p>
        </div>
        <button
          onClick={fetchData}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-xs font-medium tracking-widest uppercase text-gray-600 hover:bg-black hover:text-white hover:border-black transition-all duration-200"
        >
          <RefreshCw size={13} />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="bg-white border border-gray-200 p-5 hover:border-black transition-colors duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <Icon size={18} className="text-gray-400" />
                {card.trend === 'up' 
                  ? <ArrowUpRight size={14} className="text-gray-400" />
                  : <ArrowDownRight size={14} className="text-gray-400" />
                }
              </div>
              <p className="text-3xl font-light text-black mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {card.value}
              </p>
              <p className="text-[10px] font-medium text-gray-500 tracking-widest uppercase">{card.label}</p>
              <p className="text-[10px] text-gray-300 mt-0.5">{card.note}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white border border-gray-200 p-6"
        >
          <h2 className="text-sm font-medium text-black tracking-widest uppercase mb-6">Orders by Status</h2>
          {statusData.length === 0 ? (
            <div className="flex items-center justify-center h-[280px] text-gray-400 text-sm">
              No orders data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => percent > 0.08 ? `${(percent * 100).toFixed(0)}%` : ''}
                  outerRadius={100}
                  innerRadius={50}
                  dataKey="value"
                  paddingAngle={2}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} orders`, name]}
                  contentStyle={{ border: '1px solid #e5e7eb', borderRadius: 0, fontSize: '12px' }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={50}
                  wrapperStyle={{ paddingTop: '16px', fontSize: '11px' }}
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

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white border border-gray-200 p-6"
        >
          <h2 className="text-sm font-medium text-black tracking-widest uppercase mb-6">Orders Distribution</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={statusBarData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ border: '1px solid #e5e7eb', borderRadius: 0, fontSize: '12px' }} />
              <Bar dataKey="orders" radius={[0, 0, 0, 0]}>
                {statusBarData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={THEME_COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Line Chart */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white border border-gray-200 p-6"
      >
        <h2 className="text-sm font-medium text-black tracking-widest uppercase mb-6">Orders Trend — Last 7 Days</h2>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={getOrdersByDate()}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ border: '1px solid #e5e7eb', borderRadius: 0, fontSize: '12px' }} />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#1a1a1a"
              strokeWidth={2}
              dot={{ fill: '#1a1a1a', r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Recent Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white border border-gray-200"
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-sm font-medium text-black tracking-widest uppercase">Recent Orders</h2>
        </div>
        
        {bookings.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Calendar className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-xs tracking-widest uppercase">No orders yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left text-[10px] font-medium tracking-widest uppercase text-gray-400 px-6 py-3">Order ID</th>
                  <th className="text-left text-[10px] font-medium tracking-widest uppercase text-gray-400 px-4 py-3">Customer</th>
                  <th className="text-left text-[10px] font-medium tracking-widest uppercase text-gray-400 px-4 py-3">Service</th>
                  <th className="text-left text-[10px] font-medium tracking-widest uppercase text-gray-400 px-4 py-3">Date</th>
                  <th className="text-left text-[10px] font-medium tracking-widest uppercase text-gray-400 px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 10).map((booking, i) => (
                  <tr key={booking._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3.5 text-xs text-gray-500 font-mono">
                      #{booking._id?.substring(0, 8) || 'N/A'}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-black font-medium">
                      {booking.firstName} {booking.lastName}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-gray-500">
                      {booking.serviceTitle || booking.designTitle || 'N/A'}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-gray-400">
                      {new Date(booking.timestamp).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`px-2.5 py-1 text-[10px] font-medium tracking-widest uppercase ${getStatusStyle(booking.status)}`}>
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
