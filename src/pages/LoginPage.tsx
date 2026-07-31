import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { login } from '../store/appStore';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600)); // simulate network delay
    const result = login(email.trim(), password);
    setLoading(false);
    if (!result.ok) {
      setError(result.error || 'Login failed.');
      return;
    }
    const auth = JSON.parse(sessionStorage.getItem('auth') || '{}');
    navigate(auth.role === 'admin' ? '/admin' : '/client', { replace: true });
  };

  const fill = (e: string, p: string) => { 
    setEmail(e); 
    setPassword(p); 
    setError(''); 
  };

  return (
    <div className="min-h-screen bg-brand-gradient flex flex-col items-center justify-center p-4 absolute inset-0 z-50">
      <div className="mb-8 text-center flex flex-col items-center">
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm mb-6 border border-slate-100">
          <img src="/assets/Tiger Analytics Logo.png" alt="Tiger Analytics" className="h-6 object-contain" />
          <div className="w-[1px] h-6 bg-slate-300"></div>
          <img src="/assets/Pepsico Logo.png" alt="PepsiCo" className="h-6 object-contain" />
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight drop-shadow-md">Talent Exchange Portal</h1>
        <p className="text-sm text-white/90 mt-1 font-medium drop-shadow-sm">Enterprise Recruitment & Workflow</p>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-[400px] overflow-hidden">
        <div className="bg-pepsi-blue px-6 py-4">
          <p className="text-white font-semibold text-[15px]">Sign in to your account</p>
          <p className="text-blue-200 text-xs mt-0.5">Use your official corporate email address</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Corporate Email Address
            </label>
            <div className="relative">
              <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                placeholder="name@pepsico.com"
                required
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pepsi-blue focus:border-pepsi-blue placeholder:text-slate-300"
              />
            </div>
            {email && !email.toLowerCase().endsWith('@pepsico.com') && !email.toLowerCase().endsWith('@tigeranalytics.com') && (
              <p className="text-[11px] text-amber-600 mt-1 flex items-center gap-1">
                <AlertCircle size={10} /> Authorized domains only
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Password</label>
            <div className="relative">
              <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="••••••••"
                required
                className="w-full pl-9 pr-9 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pepsi-blue focus:border-pepsi-blue"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5">
              <AlertCircle size={14} className="text-red-500 mt-0.5 shrink-0" />
              <p className="text-xs text-red-600">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-pepsi-blue text-white text-sm font-semibold rounded-lg hover:bg-blue-900 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Verifying...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="px-6 pb-6 space-y-2">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Demo accounts</p>
          <div className="grid grid-cols-1 gap-1.5">
            {[
              { label: 'Admin', email: 'admin@tigeranalytics.com', pw: 'Admin@123', color: 'bg-blue-50 text-pepsi-blue border-blue-200 hover:bg-blue-100' },
              { label: 'Client · Rajesh', email: 'rajesh.kumar@pepsico.com', pw: 'Client@123', color: 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100' },
              { label: 'Client · Meena', email: 'meena.iyer@pepsico.com', pw: 'Client@123', color: 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100' },
            ].map(({ label, email: e, pw, color }) => (
              <button
                key={e}
                type="button"
                onClick={() => fill(e, pw)}
                className={`flex items-center justify-between px-3 py-2 border rounded-lg text-xs font-medium transition-colors cursor-pointer ${color}`}
              >
                <span>{label}</span>
                <span className="font-mono opacity-70">{e}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}