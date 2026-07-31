import { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Info } from 'lucide-react';
import { subscribeMiniToast, type MiniToastItem } from '../../store/miniToast';

const ICONS = {
  success: <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />,
  error: <XCircle size={14} className="text-red-500 shrink-0" />,
  info: <Info size={14} className="text-pepsi-blue shrink-0" />,
};

const BORDER = {
  success: 'border-emerald-200',
  error: 'border-red-200',
  info: 'border-blue-200',
};

export default function MiniToastContainer() {
  const [toasts, setToasts] = useState<MiniToastItem[]>([]);

  useEffect(() => subscribeMiniToast(setToasts), []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-[70px] right-4 z-[200] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-2.5 bg-white border ${BORDER[t.type]} rounded-lg px-3.5 py-2.5 shadow-lg pointer-events-auto`}
          style={{ animation: 'toastIn 0.2s ease-out' }}
        >
          {ICONS[t.type]}
          <span className="text-sm font-medium text-slate-700 whitespace-nowrap">{t.message}</span>
        </div>
      ))}
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}