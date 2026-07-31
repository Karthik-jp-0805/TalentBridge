import { useState } from 'react';
import { X, Check, Save } from 'lucide-react';
import type { AppUser, ManagedCandidate } from '../../../types';

export default function AssignModal({ user, allCandidates, onSave, onClose }: {
  user: AppUser;
  allCandidates: ManagedCandidate[];
  onSave: (ids: string[]) => void;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState(new Set(user.assignedCandidateIds));
  
  const toggle = (id: string) => {
    setSelected((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id); else n.add(id);
      return n;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <div>
            <p className="font-semibold text-slate-800 text-[15px]">Assign Candidates</p>
            <p className="text-xs text-slate-400 mt-0.5">{user.name} · {user.email}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 cursor-pointer">
            <X size={16} />
          </button>
        </div>
        <div className="max-h-[360px] overflow-y-auto p-4 space-y-2">
          {allCandidates.map((c) => (
            <label key={c.id} className={`flex items-center gap-3 px-3 py-2.5 border rounded-lg cursor-pointer transition-colors ${selected.has(c.id) ? 'bg-blue-50 border-pepsi-blue/40' : 'border-slate-200 hover:bg-slate-50'}`}>
              <input type="checkbox" checked={selected.has(c.id)} onChange={() => toggle(c.id)} className="accent-pepsi-blue w-4 h-4 cursor-pointer" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800">{c.name}</p>
                <p className="text-xs text-slate-500 truncate">{c.currentRole} · {c.company}</p>
              </div>
              {selected.has(c.id) && <Check size={14} className="text-pepsi-blue shrink-0" />}
            </label>
          ))}
        </div>
        <div className="px-5 py-3 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">{selected.size} candidate{selected.size !== 1 ? 's' : ''} selected</span>
          <button onClick={() => onSave(Array.from(selected))} className="flex items-center gap-1.5 px-4 py-2 bg-pepsi-blue text-white text-sm font-semibold rounded-lg hover:bg-blue-900 transition-colors cursor-pointer">
            <Save size={13} /> Save Access
          </button>
        </div>
      </div>
    </div>
  );
}