import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, UserPlus, Loader2 } from 'lucide-react';
import api from '../utils/api';

const Signup = () => {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }
    try {
      const response = await api.post('/admin/register', {
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('currentAdmin', JSON.stringify({
        _id: response.data._id,
        email: response.data.email,
        avatar: response.data.avatar || '',
      }));
      setLoading(false);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: '#f5f4f2', fontFamily: "'Unbounded', system-ui, sans-serif" }}
    >
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-black text-white flex-col items-center justify-center p-16">
        <div className="max-w-sm text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-6">Admin Portal</p>
          <h1
            className="text-6xl font-light leading-tight mb-4"
            style={{ fontFamily: "'Cormorant Garamond', 'Times New Roman', serif", letterSpacing: '0.15em' }}
          >
            VN<br />FASHION
          </h1>
          <div className="w-12 h-px bg-white/30 mx-auto mb-6" />
          <p className="text-sm text-gray-400 leading-relaxed tracking-wide">
            Create your admin account to manage the fashion studio.
          </p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-10 text-center">
            <h1
              className="text-3xl font-light text-black tracking-[0.2em] uppercase"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              VN FASHION
            </h1>
            <p className="text-[10px] text-gray-400 tracking-widest uppercase mt-1">Admin Portal</p>
          </div>

          <h2 className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-1">Get started</h2>
          <p
            className="text-3xl text-black mb-8 font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Create Account
          </p>

          {error && (
            <div className="border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-xs mb-6 tracking-wide">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="signup-email" className="block text-[10px] font-medium tracking-widest uppercase text-gray-500 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="email"
                  id="signup-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 bg-white text-sm focus:outline-none focus:border-black transition-colors"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="signup-password" className="block text-[10px] font-medium tracking-widest uppercase text-gray-500 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="password"
                  id="signup-password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 bg-white text-sm focus:outline-none focus:border-black transition-colors"
                  placeholder="At least 6 characters"
                />
              </div>
            </div>

            <div>
              <label htmlFor="signup-confirm" className="block text-[10px] font-medium tracking-widest uppercase text-gray-500 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="password"
                  id="signup-confirm"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 bg-white text-sm focus:outline-none focus:border-black transition-colors"
                  placeholder="Re-enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 text-xs font-medium tracking-widest uppercase hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <><Loader2 size={14} className="animate-spin" /> Creating account...</>
              ) : (
                <><UserPlus size={14} /> Create Account</>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-black font-medium hover:underline underline-offset-2">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
