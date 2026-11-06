import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authApi } from '../../api/authApi';
import { Sparkles, ArrowRight, Lock, Mail, AlertCircle, User, ShieldCheck, Building2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await authApi.login(email, password);
      login(data);

      if (data.role === 'STUDENT') {
        navigate('/student/dashboard');
      } else if (data.role === 'TPO') {
        navigate('/tpo/dashboard');
      } else if (data.role === 'RECRUITER') {
        navigate('/recruiter/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (quickEmail: string) => {
    setEmail(quickEmail);
    setPassword('password123');
    setError(null);
    setLoading(true);

    try {
      const data = await authApi.login(quickEmail, 'password123');
      login(data);

      if (data.role === 'STUDENT') {
        navigate('/student/dashboard');
      } else if (data.role === 'TPO') {
        navigate('/tpo/dashboard');
      } else if (data.role === 'RECRUITER') {
        navigate('/recruiter/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Quick login failed. Ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-3 group">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 flex items-center justify-center font-black text-slate-950 text-xl shadow-sm group-hover:scale-105 transition-transform">
            P
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-slate-900">
            Place<span className="text-amber-500">Pilot</span>
          </span>
        </Link>
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Sign In to PlacePilot
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Enter your credentials or choose a pre-configured role account
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        {/* Quick Role Fill Card */}
        <div className="mb-4 bg-amber-50/70 border border-amber-200 rounded-2xl p-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-2.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Instant One-Click Demo Logins</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('student@placepilot.edu')}
              className="px-2.5 py-2 text-xs font-semibold bg-white text-slate-800 rounded-xl border border-amber-200/80 hover:bg-amber-100/50 hover:border-amber-400 transition-all flex flex-col items-center gap-1 text-center"
            >
              <User className="w-3.5 h-3.5 text-amber-600" />
              <span>Student</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('tpo@placepilot.edu')}
              className="px-2.5 py-2 text-xs font-semibold bg-white text-slate-800 rounded-xl border border-amber-200/80 hover:bg-amber-100/50 hover:border-amber-400 transition-all flex flex-col items-center gap-1 text-center"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
              <span>TPO Admin</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('recruiter@abctech.com')}
              className="px-2.5 py-2 text-xs font-semibold bg-white text-slate-800 rounded-xl border border-amber-200/80 hover:bg-amber-100/50 hover:border-amber-400 transition-all flex flex-col items-center gap-1 text-center"
            >
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Recruiter</span>
            </button>
          </div>
          <p className="text-[10px] text-amber-700/80 mt-2 text-center">
            Clicking any button fills credentials and authenticates immediately.
          </p>
        </div>

        {/* Form Box */}
        <div className="bg-white py-8 px-6 shadow-sm border border-slate-200/90 rounded-2xl sm:px-8">
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-700">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@placepilot.edu"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all text-slate-900"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-500 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Registration Links */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center space-y-2">
            <p className="text-xs text-slate-500">Don't have an account yet?</p>
            <div className="flex items-center justify-center gap-4 text-xs font-semibold">
              <Link
                to="/register/student"
                className="text-amber-600 hover:text-amber-700 hover:underline"
              >
                Register as Student
              </Link>
              <span className="text-slate-300">•</span>
              <Link
                to="/register/recruiter"
                className="text-blue-600 hover:text-blue-700 hover:underline"
              >
                Register as Recruiter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

