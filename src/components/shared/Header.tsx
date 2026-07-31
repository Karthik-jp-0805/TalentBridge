import { Users, Shield } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { getAuth } from '../../store/appStore';

export default function Header() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const auth = getAuth();

  if (!auth.userId) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B2341] border-b border-slate-200 h-14">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-md shadow-sm">
          <img src="/assets/Tiger Analytics Logo.png" alt="Tiger Analytics" className="h-5 object-contain" />
          <div className="w-[1px] h-5 bg-slate-300"></div>
          <img src="/assets/Pepsico Logo.png" alt="PepsiCo" className="h-5 object-contain" />
        </div>

        <nav className="flex items-center gap-1">
          {auth.role === 'client' && (
            <Link to="/client" className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors text-white hover:bg-white/10">
              <Users size={14} /> My Profiles
            </Link>
          )}
          {auth.role === 'admin' && (
            <>
              <Link to="/client" className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${!isAdmin ? 'bg-white/10 text-white' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}>
                <Users size={14} /> Client View
              </Link>
              <Link to="/admin" className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${isAdmin ? 'bg-white/10 text-white' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}>
                <Shield size={14} /> Admin
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}