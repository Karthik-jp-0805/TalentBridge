import { X } from 'lucide-react';
import type { ManagedCandidate } from '../../../types';
import { STATUS_COLORS, STATUS_LABELS } from '../../../store/appStore';

interface Props {
  candidate: ManagedCandidate;
  onClose: () => void;
}

export default function HistoryDrawer({ candidate, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-end">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative z-10 bg-white w-80 shadow-2xl flex flex-col border-l border-slate-200 animate-slide-in-right">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <div>
            <p className="font-semibold text-slate-800 text-sm">{candidate.name}</p>
            <p className="text-xs text-slate-400 mt-0.5">Status History</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 cursor-pointer"><X size={16} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="relative">
            <div className="absolute left-3.5 top-0 bottom-0 w-px bg-slate-200" />
            <div className="space-y-4">
              {[...candidate.statusHistory].reverse().map((h, i) => {
                const sc = STATUS_COLORS[h.status];
                return (
                  <div key={i} className="flex gap-4 relative">
                    <div className={`w-7 h-7 rounded-full border-2 ${sc.border} ${sc.bg} flex items-center justify-center shrink-0 z-10`}>
                      <div className={`w-2 h-2 rounded-full ${sc.text.replace('text-', 'bg-')}`} />
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold border ${sc.bg} ${sc.text} ${sc.border}`}>
                        {STATUS_LABELS[h.status]}
                      </span>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{h.note}</p>
                      <p className="text-[10px] text-slate-300 mt-0.5">{h.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}