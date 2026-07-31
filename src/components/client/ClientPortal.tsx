import { useState, useEffect } from 'react';
import { Search, Users, LogOut } from 'lucide-react';
import CandidateCard from './CandidateCard';
import UpdateStatusDrawer from './UpdateStatusDrawer';
import ResumeModal from './ResumeModal';
import { getCandidatesForUser, getAuth, logout, subscribe } from '../../store/appStore';
import type { ManagedCandidate } from '../../types';
import { useNavigate } from 'react-router-dom';

export default function ClientPortal() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState<ManagedCandidate[]>(() =>
    auth.userId ? getCandidatesForUser(auth.userId) : []
  );
  const [search, setSearch] = useState('');
  const [resumeCandidate, setResumeCandidate] = useState<ManagedCandidate | null>(null);
  const [updateStatusCandidate, setUpdateStatusCandidate] = useState<ManagedCandidate | null>(null);

  useEffect(() => {
    return subscribe(() => {
      if (auth.userId) setCandidates(getCandidatesForUser(auth.userId));
    });
  }, [auth.userId]);

  const filtered = candidates.filter((c) => {
    const q = search.toLowerCase();
    return !q || c.name.toLowerCase().includes(q) || c.currentRole.toLowerCase().includes(q) || c.skills.some((s) => s.toLowerCase().includes(q));
  });

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="flex h-full w-full bg-[#F8FAFD]">
      {/* Sidebar intentionally removed per markup instructions for full-width layout */}
      <main className="flex-1 overflow-y-auto">
        
        {/* Top Header / Search Bar */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="relative w-full max-w-lg">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by candidate name, role, or skill..."
              className="w-full pl-10 pr-4 py-2.5 text-sm font-medium border-2 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-0 focus:border-pepsi-blue transition-colors placeholder:text-gray-400"
            />
          </div>
          
          <div className="flex items-center gap-4 ml-auto">
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
              <Users size={16} className="text-pepsi-blue" />
              <span className="text-sm font-extrabold text-pepsi-blue">{filtered.length}</span>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Profiles</span>
            </div>
            <div className="w-[1px] h-6 bg-gray-200 mx-1"></div>
            <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm font-bold text-gray-500 hover:text-gray-800 bg-white hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-gray-200">
              <LogOut size={16} /> Sign out
            </button>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="max-w-[1400px] mx-auto px-8 pt-8 pb-4">
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Review Pipeline</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            Welcome back, <span className="font-bold text-gray-800">{auth.name}</span>. Here are the profiles awaiting your review.
          </p>
        </div>

        {/* Candidate Cards Grid */}
        <div className="max-w-[1400px] mx-auto p-8 pt-2 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-min">
          {filtered.length === 0 ? (
            <div className="col-span-full py-24 flex flex-col items-center justify-center bg-white rounded-2xl border border-dashed border-gray-300">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
                <Users size={28} className="text-gray-300" />
              </div>
              <p className="text-gray-800 font-extrabold text-lg">No profiles found</p>
              <p className="text-sm font-medium text-gray-500 mt-1 max-w-sm text-center">We couldn't find any candidates matching your search criteria. Try adjusting your terms.</p>
            </div>
          ) : (
            filtered.map((c) => (
              <CandidateCard
                key={c.id}
                candidate={c}
                onViewResume={() => setResumeCandidate(c)}
                onNextStep={() => setUpdateStatusCandidate(c)}
                showRecruiterNotes={true}
              />
            ))
          )}
        </div>
      </main>

      {/* Slide-over Modals */}
      {resumeCandidate && <ResumeModal candidate={resumeCandidate} onClose={() => setResumeCandidate(null)} />}
      {updateStatusCandidate && <UpdateStatusDrawer candidate={updateStatusCandidate} onClose={() => setUpdateStatusCandidate(null)} />}
    </div>
  );
}