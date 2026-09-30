import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, ArrowRight, Sprout, ShieldAlert, Sparkles, AlertCircle } from 'lucide-react';
import { useAuth, UserRole } from '../../context/AuthContext';
import { useAppState } from '../../context/AppStateContext';

interface LoginPageProps {
  onSuccess: (role: UserRole) => void;
  onNavigateSignup: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onSuccess, onNavigateSignup }) => {
  const { login, loginAsTestUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMessage, setForgotMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      // Determine destination
      const savedUser = JSON.parse(localStorage.getItem('farmsale_user') || '{}');
      onSuccess(savedUser.role || 'farmer');
    } else {
      setError(result.error || 'Authentication failed. Please verify your credentials.');
    }
  };

  const handleTestLogin = async (role: UserRole) => {
    setLoading(true);
    await loginAsTestUser(role);
    setLoading(false);
    onSuccess(role);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail })
      });
      const data = await res.json();
      setForgotMessage(data.message || 'Password reset link sent.');
    } catch {
      setForgotMessage('Instructions have been sent if this email is registered.');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-[#f4f7f4] via-[#fbfbfa] to-white">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#1b4332] text-white shadow-agri-md mb-2">
            <Sprout className="w-7 h-7 text-emerald-300" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
            Sign in to FarmSale
          </h1>
          <p className="text-xs sm:text-sm text-gray-600">
            Grow with demand. Sell with confidence.
          </p>
        </div>

        {/* Evaluation Test Accounts Notice */}
        <div className="bg-[#eef8f2] border border-[#d8f3dc] rounded-2xl p-4 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#1b4332] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Evaluation Test Accounts</span>
            </span>
            <span className="text-[10px] bg-emerald-200/70 text-emerald-900 font-semibold px-2 py-0.5 rounded-full">
              1-Click Sign In
            </span>
          </div>
          <p className="text-[11px] text-emerald-900/80 leading-relaxed">
            For evaluation, instantly access role dashboards with pre-seeded data, or log in with a new account.
          </p>
          <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
            <button
              type="button"
              onClick={() => handleTestLogin('farmer')}
              className="py-1.5 px-2.5 bg-white hover:bg-emerald-50 text-[#1b4332] font-bold rounded-lg border border-emerald-300 transition-colors text-left shadow-2xs"
            >
              Farmer (Ramesh) &rarr;
            </button>
            <button
              type="button"
              onClick={() => handleTestLogin('buyer')}
              className="py-1.5 px-2.5 bg-white hover:bg-blue-50 text-blue-900 font-bold rounded-lg border border-blue-200 transition-colors text-left shadow-2xs"
            >
              Buyer (Sahyadri) &rarr;
            </button>
            <button
              type="button"
              onClick={() => handleTestLogin('fpo')}
              className="py-1.5 px-2.5 bg-white hover:bg-[#f5ebe0] text-[#6f4e37] font-bold rounded-lg border border-[#d5bdaf] transition-colors text-left shadow-2xs"
            >
              FPO (Cooperative) &rarr;
            </button>
            <button
              type="button"
              onClick={() => handleTestLogin('admin')}
              className="py-1.5 px-2.5 bg-white hover:bg-purple-50 text-purple-900 font-bold rounded-lg border border-purple-200 transition-colors text-left shadow-2xs"
            >
              Admin (Oversight) &rarr;
            </button>
          </div>
        </div>

        {/* Login Form Box */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-5">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@farmsale.in"
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[#1b4332] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-gray-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(true)}
                  className="text-[11px] font-bold text-emerald-800 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[#1b4332] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2 text-gray-400 hover:text-gray-700 p-0.5"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-[#1b4332] border-gray-300 rounded focus:ring-[#1b4332]"
              />
              <label htmlFor="remember-me" className="ml-2 block text-xs text-gray-600 font-medium">
                Keep me signed in
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#1b4332] text-white font-bold rounded-xl hover:bg-[#143628] disabled:opacity-50 transition-colors shadow-agri-sm flex items-center justify-center gap-2 text-sm"
            >
              <span>{loading ? 'Authenticating...' : 'Sign in to Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 border-t border-gray-100 text-center text-xs text-gray-600">
            <span>Do not have an account? </span>
            <button
              onClick={onNavigateSignup}
              className="font-bold text-[#1b4332] hover:underline"
            >
              Create an account
            </button>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-xl border border-gray-200">
            <h3 className="text-base font-bold text-gray-900">
              Reset Your Password
            </h3>
            <p className="text-xs text-gray-600">
              Enter your registered email address and we will send you password reset instructions.
            </p>

            {forgotMessage ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs">
                {forgotMessage}
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-3 text-xs">
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
                />
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setForgotModalOpen(false);
                      setForgotMessage(null);
                    }}
                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#1b4332] text-white font-bold rounded-lg"
                  >
                    Send Instructions
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
