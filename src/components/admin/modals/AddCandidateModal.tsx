import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { addManagedCandidate, type RecruitmentStatus } from '../../../store/appStore';
import { showToast } from '../../../store/miniToast';

export default function AddCandidateForm({ onClose, onAdded }: { onClose: () => void; onAdded: () => void; }) {
  const [f, setF] = useState({ name: '', empId: '', currentRole: '', experience: '', location: '', email: '', phone: '', ctc: '', education: '', status: 'Available' as RecruitmentStatus });
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');

  const submit = () => {
    addManagedCandidate({
      ...f, experience: Number(f.experience) || 0, skills, resumeFileName: `${f.name.toLowerCase().replace(/\s/g, '_')}_resume.pdf`,
      recruitmentStatus: f.status, assignedToUserIds: [], aiSummary: '', assignedRecruiter: 'Priya Sharma', recruiterNotes: ''
    });
    showToast(`${f.name} added to pipeline`);
    onAdded(); onClose();
  };

  const s = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));
  const inp = "w-full px-3 py-2 text-sm border border-[#DDE5EF] rounded-lg focus:outline-none focus:border-[#0B4EA2]";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#123A63]/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#DDE5EF] bg-[#F7F9FC]">
          <p className="font-bold text-[#1F2937]">Add New Candidate</p>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-gray-200 text-[#6B7280]"><X size={18} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              ['name', 'Full Name *', 'text'], ['empId', 'Emp ID *', 'text'],
              ['currentRole', 'Current Role *', 'text'], ['experience', 'Experience (yrs)', 'number'],
              ['location', 'Location', 'text'], ['ctc', 'Current CTC', 'text'],
              ['email', 'Email', 'email'], ['phone', 'Phone', 'tel'],
            ].map(([k, label, type]) => (
              <div key={k}>
                <label className="text-xs font-semibold text-[#6B7280] block mb-1">{label}</label>
                <input type={type} value={(f as Record<string, string>)[k]} onChange={(e) => s(k, e.target.value)} className={inp} />
              </div>
            ))}
          </div>
          <div><label className="text-xs font-semibold text-[#6B7280] block mb-1">Education</label><input value={f.education} onChange={(e) => s('education', e.target.value)} className={inp} /></div>
          <div>
            <label className="text-xs font-semibold text-[#6B7280] block mb-1">Skills</label>
            <input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && skillInput) { setSkills(p => [...p, skillInput]); setSkillInput(''); } }} placeholder="Type and press Enter" className={inp} />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {skills.map((sk) => (
                <span key={sk} className="flex items-center gap-1 px-2 py-0.5 bg-[#EFF6FF] text-[#0B4EA2] text-xs rounded-full border border-[#0B4EA2]">
                  {sk} <button type="button" onClick={() => setSkills(p => p.filter(s => s !== sk))}><X size={10} /></button>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-[#DDE5EF] bg-[#F7F9FC] flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-sm text-[#1F2937] border border-[#DDE5EF] bg-white rounded-lg">Cancel</button>
          <button onClick={submit} className="flex items-center gap-1.5 px-4 py-2 bg-[#0B4EA2] text-white text-sm font-semibold rounded-lg hover:bg-[#123A63]">
            <Plus size={14} /> Add Candidate
          </button>
        </div>
      </div>
    </div>
  );
}