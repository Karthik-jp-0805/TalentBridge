import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, History } from 'lucide-react';
import {
  getCandidates, getUsers, updateCandidateRecruitmentStatus, subscribe,
  STATUS_LABELS, STATUS_COLORS, STATUS_SEQUENCE,
} from '../../store/appStore';
import type { ManagedCandidate, RecruitmentStatus } from '../../types';
import { showToast } from '../../store/miniToast';
import HistoryDrawer from './modals/HistoryDrawer';
import AddCandidateModal from './modals/AddCandidateModal';

const ALL_STATUSES: RecruitmentStatus[] = [
  'Available', 'Applied', 'Screening', 'Shortlisted', 'Round_1', 'Round_2', 'Round_3',
  'Final_Interview', 'Selected', 'Not_Shortlisted', 'Rejected', 'On_Hold',
];

export default function CandidateManagement() {
  const [candidates, setCandidates] = useState<ManagedCandidate[]>(getCandidates);
  const [users, setUsers] = useState(getUsers);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<RecruitmentStatus | 'All'>('All');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<RecruitmentStatus>('Applied');
  const [editNote, setEditNote] = useState('');
  const [historyCandidate, setHistoryCandidate] = useState<ManagedCandidate | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    return subscribe(() => { 
      setCandidates(getCandidates()); 
      setUsers(getUsers()); 
    });
  }, []);

  const filtered = candidates.filter((c) => {
    const q = search.toLowerCase();
    const matchQ = !q || c.name.toLowerCase().includes(q) || c.currentRole.toLowerCase().includes(q);
    const matchS = statusFilter === 'All' || c.recruitmentStatus === statusFilter;
    return matchQ && matchS;
  });

  const getUserNames = (ids: string[]) => ids.map((id) => users.find((u) => u.id === id)?.name || id).join(', ') || '—';

  const saveStatus = (id: string) => {
    updateCandidateRecruitmentStatus(id, editStatus, editNote || 'Status updated by admin');
    showToast(`Status updated to ${STATUS_LABELS[editStatus]}`);
    setEditingId(null);
    setEditNote('');
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#F8FAFD]">
      <div className="max-w-[1200px] mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Candidate Roster</h2>
            <p className="text-sm text-slate-500 mt-0.5">Master tracker for Tiger Analytics and PepsiCo.</p>
          </div>
          <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2 bg-pepsi-blue text-white text-sm font-semibold rounded-lg hover:bg-blue-900 shadow-sm cursor-pointer">
            <Plus size={15} /> Add Candidate
          </button>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="pl-8 pr-3 py-1.5 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-pepsi-blue w-52" />
          </div>
          <div className="flex items-center gap-1 flex-wrap">
            <button onClick={() => setStatusFilter('All')} className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer ${statusFilter === 'All' ? 'bg-pepsi-blue text-white' : 'text-slate-500 hover:bg-slate-100'}`}>All</button>
            {ALL_STATUSES.map((s) => {
              const sc = STATUS_COLORS[s];
              return (
                <button key={s} onClick={() => setStatusFilter(s)} className={`px-2.5 py-1 text-xs font-bold rounded-md border transition-colors cursor-pointer ${statusFilter === s ? `${sc.bg} ${sc.text} ${sc.border}` : 'text-slate-500 hover:bg-slate-100 border-transparent'}`}>
                  {STATUS_LABELS[s]}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {['Candidate Name', 'Role', 'Status', 'Next Step', 'Assigned To', 'Recruiter', 'Last Updated', 'History', 'Action'].map((h) => (
                    <th key={h} className="text-left text-[11px] font-bold text-gray-500 uppercase tracking-wide px-4 py-3 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((c) => {
                  const sc = STATUS_COLORS[c.recruitmentStatus];
                  const currentIdx = STATUS_SEQUENCE.indexOf(c.recruitmentStatus);
                  const nextStatus = currentIdx >= 0 && currentIdx < STATUS_SEQUENCE.length - 1 ? STATUS_SEQUENCE[currentIdx + 1] : null;
                  const isEditing = editingId === c.id;

                  return (
                    <tr key={c.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-xs shrink-0">{c.name.charAt(0)}</div>
                          <div>
                            <div className="font-bold text-gray-900 whitespace-nowrap">{c.name}</div>
                            <div className="text-xs text-gray-500">{c.location}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-gray-900 font-medium whitespace-nowrap">{c.currentRole}</div>
                        <div className="text-xs text-gray-500">{c.company}</div>
                      </td>
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <select value={editStatus} onChange={(e) => setEditStatus(e.target.value as RecruitmentStatus)} className="text-xs border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-pepsi-blue">
                            {ALL_STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                          </select>
                        ) : (
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold tracking-wide border ${sc.bg} ${sc.text} ${sc.border}`}>
                            {STATUS_LABELS[c.recruitmentStatus]}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs font-medium text-gray-500 whitespace-nowrap">
                        {nextStatus ? (
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] border ${STATUS_COLORS[nextStatus].bg} ${STATUS_COLORS[nextStatus].text} ${STATUS_COLORS[nextStatus].border}`}>
                            {STATUS_LABELS[nextStatus]}
                          </span>
                        ) : '—'}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-600 font-medium max-w-[140px] truncate">{getUserNames(c.assignedToUserIds)}</td>
                      <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{c.assignedRecruiter}</td>
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{new Date(c.lastUpdated).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => setHistoryCandidate(c)} className="flex items-center gap-1 text-xs text-pepsi-blue hover:underline transition-colors cursor-pointer">
                          <History size={12} /> {c.statusHistory.length}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <div className="space-y-1.5 min-w-[200px]">
                            <input value={editNote} onChange={(e) => setEditNote(e.target.value)} placeholder="Note (optional)" className="w-full text-xs px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-pepsi-blue" />
                            <div className="flex gap-1">
                              <button onClick={() => saveStatus(c.id)} className="flex-1 text-xs font-bold text-pepsi-blue hover:underline cursor-pointer">Save</button>
                              <button onClick={() => setEditingId(null)} className="text-xs font-medium text-gray-500 hover:underline px-1 cursor-pointer">Cancel</button>
                            </div>
                          </div>
                        ) : (
                          <button onClick={() => { setEditingId(c.id); setEditStatus(c.recruitmentStatus); setEditNote(''); }} className="opacity-0 group-hover:opacity-100 flex items-center gap-1 text-xs font-bold text-pepsi-blue hover:underline transition-all px-2 py-1 rounded cursor-pointer">
                            <Edit2 size={11} /> Manage
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="py-14 text-center text-gray-400 text-sm">No candidates found</div>}
          </div>
          <div className="px-5 py-3 border-t border-gray-200 text-xs font-medium text-gray-500 bg-gray-50">
            {filtered.length} of {candidates.length} candidates
          </div>
        </div>
      </div>

      {historyCandidate && <HistoryDrawer candidate={historyCandidate} onClose={() => setHistoryCandidate(null)} />}
      {showAdd && <AddCandidateModal onClose={() => setShowAdd(false)} />}
    </div>
  );
}