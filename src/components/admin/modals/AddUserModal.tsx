import { useState } from 'react';
import { X, UserPlus } from 'lucide-react';
import { addUser } from '../../../store/appStore';
import { showToast } from '../../../store/miniToast';

export default function AddUserModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', password: 'Client@123' });
  const [error, setError] = useState('');
  const s = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.name.trim()) { setError('Name is required'); return; }
    if (!form.email.toLowerCase().endsWith('@pepsico.com')) { setError('Email must end with @pepsico.com'); return; }
    addUser({
      name: form.name, email: form.email.toLowerCase(), role: 'client',
      status: 'active', assignedCandidateIds: [], password: form.password || 'Client@123',
    });
    showToast('User access granted successfully');
    onClose();
  };

  const inputCls = 'w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pepsi-blue focus:border-pepsi-blue';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <p className="font-semibold text-slate-800">Add Authorized User</p>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 cursor-pointer"><X size={16} /></button>
        </div>
        <div className="p-5 space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Full Name</label>
            <input value={form.name} onChange={(e) => s('name', e.target.value)} placeholder="e.g. Rajesh Kumar" className={inputCls} />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">PepsiCo Email *</label>
            <input value={form.email} onChange={(e) => s('email', e.target.value)} placeholder="name@pepsico.com" type="email" className={inputCls} />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Temporary Password</label>
            <input value={form.password} onChange={(e) => s('password', e.target.value)} className={inputCls} />
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
        <div className="px-5 pb-5 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-sm text-slate-500 hover:bg-slate-100 rounded-lg cursor-pointer">Cancel</button>
          <button onClick={submit} className="flex items-center gap-1.5 px-4 py-2 bg-pepsi-blue text-white text-sm font-semibold rounded-lg hover:bg-blue-900 cursor-pointer">
            <UserPlus size={14} /> Add User
          </button>
        </div>
      </div>
    </div>
  );
}