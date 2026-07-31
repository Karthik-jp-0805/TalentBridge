import { useState, useEffect } from 'react';
import { UserPlus, Shield, ShieldOff, Search, Users, ChevronDown, ChevronUp, Eye } from 'lucide-react';
import { getUsers, getCandidates, toggleUserStatus, assignCandidatesToUser, subscribe } from '../../store/appStore';
import { showToast } from '../../store/miniToast';
import type { AppUser, ManagedCandidate } from '../../types';
import AssignModal from './modals/AssignModal';
import AddUserModal from './modals/AddUserModal';

export default function AccessManagement() {
  const [users, setUsers] = useState<AppUser[]>(getUsers);
  const [candidates, setCandidates] = useState<ManagedCandidate[]>(getCandidates);
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [assigningUser, setAssigningUser] = useState<AppUser | null>(null);
  const [showAddUser, setShowAddUser] = useState(false);

  useEffect(() => {
    return subscribe(() => { 
      setUsers(getUsers()); 
      setCandidates(getCandidates()); 
    });
  }, []);

  const clientUsers = users.filter((u) => u.role === 'client');
  const filtered = clientUsers.filter(
    (u) => !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleAssignSave = (ids: string[]) => {
    if (!assigningUser) return;
    assignCandidatesToUser(assigningUser.id, ids);
    showToast('Candidate access updated successfully');
    setAssigningUser(null);
  };

  const handleToggle = (id: string, name: string, currentStatus: string) => {
    toggleUserStatus(id);
    showToast(currentStatus === 'active' ? `${name}'s access revoked` : `${name}'s access restored`);
  };

  const activeCount = clientUsers.filter((u) => u.status === 'active').length;

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#F8FAFD]">
      <div className="max-w-[900px] mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Access Management</h2>
            <p className="text-sm text-slate-500 mt-0.5">{activeCount} active · {clientUsers.length} total authorized users</p>
          </div>
          <button onClick={() => setShowAddUser(true)} className="flex items-center gap-2 px-4 py-2 bg-pepsi-blue text-white text-sm font-semibold rounded-lg hover:bg-blue-900 transition-colors shadow-sm cursor-pointer">
            <UserPlus size={15} /> Add PepsiCo User
          </button>
        </div>

        <div className="relative max-w-xs">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search authorized users..." className="w-full pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-pepsi-blue focus:border-pepsi-blue" />
        </div>

        <div className="space-y-3">
          {filtered.map((user) => {
            const assignedCandidates = candidates.filter((c) => user.assignedCandidateIds.includes(c.id));
            const isExpanded = expandedId === user.id;

            return (
              <div key={user.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="flex items-center gap-4 px-5 py-4">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1A56DB] to-[#3B82F6] flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-slate-800 text-sm">{user.name}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${user.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-400 border-slate-200'}`}>
                        {user.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500 shrink-0">
                    <div className="text-center hidden sm:block">
                      <div className="font-bold text-slate-700 text-base">{assignedCandidates.length}</div>
                      <div className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">Profiles</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-4">
                    <button onClick={() => setAssigningUser(user)} className="flex items-center gap-1 text-xs font-medium text-pepsi-blue hover:bg-blue-50 px-2.5 py-1.5 rounded-md border border-blue-200 transition-colors cursor-pointer">
                      <Users size={12} /> Assign
                    </button>
                    <button onClick={() => handleToggle(user.id, user.name, user.status)} className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-md border transition-colors cursor-pointer ${user.status === 'active' ? 'text-red-600 border-red-200 hover:bg-red-50' : 'text-emerald-600 border-emerald-200 hover:bg-emerald-50'}`}>
                      {user.status === 'active' ? <><ShieldOff size={12} /> Revoke</> : <><Shield size={12} /> Restore</>}
                    </button>
                    <button onClick={() => setExpandedId(isExpanded ? null : user.id)} className="p-1.5 rounded-md text-slate-400 hover:bg-slate-100 transition-colors cursor-pointer">
                      {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-slate-100 px-5 py-3 bg-slate-50">
                    {assignedCandidates.length === 0 ? (
                      <p className="text-xs text-slate-400 italic">No candidates assigned. Click "Assign" to grant visibility.</p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {assignedCandidates.map((c) => (
                          <span key={c.id} className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 font-medium">
                            <Eye size={10} className="text-pepsi-blue" />
                            {c.name} <span className="text-slate-400">·</span> <span className="text-slate-400">{c.currentRole}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <Users size={28} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">No users found</p>
            </div>
          )}
        </div>
      </div>

      {assigningUser && <AssignModal user={assigningUser} allCandidates={candidates} onSave={handleAssignSave} onClose={() => setAssigningUser(null)} />}
      {showAddUser && <AddUserModal onClose={() => setShowAddUser(false)} />}
    </div>
  );
}