import { useState, useMemo, useEffect } from 'react';
import { LayoutList, Shield, Grid3x3, LogOut } from 'lucide-react';
import { getCandidates, getUsers, getAuth, logout, subscribe, type ManagedCandidate } from '../../store/appStore';
import { useNavigate } from 'react-router-dom';
import AccessManagement from './AccessManagement';
import CandidateManagement from './CandidateManagement';
import SheetsView from './SheetsView';

type Tab = 'candidates' | 'access' | 'sheets';

function StatPill({ label, value, bgClass }: { label: string; value: number; bgClass: string }) {
  return (
    <div className={`flex flex-col items-center justify-center p-3 rounded-xl border border-gray-200 shadow-sm ${bgClass}`}>
      <span className="text-2xl font-bold text-gray-900 mb-0.5 leading-none">{value}</span>
      <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wide text-center">{label}</span>
    </div>
  );
}

export default function AdminDashboard() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState<ManagedCandidate[]>(getCandidates);
  const [users, setUsers] = useState(getUsers);
  const [activeTab, setActiveTab] = useState<Tab>('candidates');

  useEffect(() => {
    return subscribe(() => { 
      setCandidates(getCandidates()); 
      setUsers(getUsers()); 
    });
  }, []);

  const stats = useMemo(() => ({
    total: candidates.length,
    clients: users.filter((u) => u.role === 'client').length,
    available: candidates.filter((c) => c.recruitmentStatus === 'Available').length,
    shortlisted: candidates.filter((c) => c.recruitmentStatus === 'Shortlisted').length,
    round1: candidates.filter((c) => c.recruitmentStatus === 'Round_1').length,
    round2: candidates.filter((c) => c.recruitmentStatus === 'Round_2').length,
    notShortlisted: candidates.filter((c) => c.recruitmentStatus === 'Not_Shortlisted').length,
    onHold: candidates.filter((c) => c.recruitmentStatus === 'On_Hold').length,
    selected: candidates.filter((c) => c.recruitmentStatus === 'Selected').length,
  }), [candidates, users]);

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#F8FAFD]">
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-[1200px] mx-auto">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Recruiter Dashboard</h1>
            <p className="text-sm text-slate-500 mt-0.5">Signed in as <span className="font-medium text-slate-700">{auth.name}</span></p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 hover:bg-slate-100 px-3 py-2 rounded-lg transition-colors cursor-pointer">
            <LogOut size={13} /> Sign out
          </button>
        </div>

        {/* 9 KPI Cards as per Markup Image 7 */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-2 mt-6 max-w-[1200px] mx-auto">
          <StatPill label="Total Cands" value={stats.total} bgClass="bg-white" />
          <StatPill label="Client View" value={stats.clients} bgClass="bg-blue-50" />
          <StatPill label="Available" value={stats.available} bgClass="bg-gray-50" />
          <StatPill label="Shortlisted" value={stats.shortlisted} bgClass="bg-sky-50" />
          <StatPill label="Round 1" value={stats.round1} bgClass="bg-violet-50" />
          <StatPill label="Round 2" value={stats.round2} bgClass="bg-purple-50" />
          <StatPill label="Not Shortlisted" value={stats.notShortlisted} bgClass="bg-red-50" />
          <StatPill label="On Hold" value={stats.onHold} bgClass="bg-orange-50" />
          <StatPill label="Selected" value={stats.selected} bgClass="bg-emerald-50" />
        </div>

        <div className="flex items-center gap-1 mt-6 max-w-[1200px] mx-auto border-b border-slate-200 -mb-4 pb-0">
          <button onClick={() => setActiveTab('candidates')} className={`flex items-center gap-1.5 px-4 py-2 text-sm font-bold border-b-2 transition-colors -mb-px cursor-pointer ${activeTab === 'candidates' ? 'border-pepsi-blue text-pepsi-blue' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
            <LayoutList size={14} /> Candidate Management
          </button>
          <button onClick={() => setActiveTab('access')} className={`flex items-center gap-1.5 px-4 py-2 text-sm font-bold border-b-2 transition-colors -mb-px cursor-pointer ${activeTab === 'access' ? 'border-pepsi-blue text-pepsi-blue' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
            <Shield size={14} /> Access Management
          </button>
          <button onClick={() => setActiveTab('sheets')} className={`flex items-center gap-1.5 px-4 py-2 text-sm font-bold border-b-2 transition-colors -mb-px cursor-pointer ${activeTab === 'sheets' ? 'border-pepsi-blue text-pepsi-blue' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
            <Grid3x3 size={14} /> Google Sheets Sync
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        {activeTab === 'candidates' && <CandidateManagement />}
        {activeTab === 'access'     && <AccessManagement />}
        {activeTab === 'sheets'     && <SheetsView />}
      </div>
    </div>
  );
}