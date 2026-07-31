import { X, Mail, CheckCircle2, AlertCircle, Bell, Clock } from 'lucide-react';
import { useToastStore } from '../../store/toastStore';
import type { EmailPayload } from '../../types';

const TYPE_CONFIG: Record<EmailPayload['type'], { icon: React.ElementType; color: string; label: string }> = {
  shortlist: { icon: CheckCircle2, color: 'text-pepsi-blue', label: 'Shortlist Confirmation' },
  reject: { icon: AlertCircle, color: 'text-red-500', label: 'Rejection Feedback' },
  round1: { icon: Bell, color: 'text-violet-500', label: 'Round 1 Scheduled' },
  round1_result: { icon: CheckCircle2, color: 'text-emerald-500', label: 'Round 1 Result' },
  onboard: { icon: CheckCircle2, color: 'text-emerald-600', label: 'Onboarding Initiated' },
  admin_notify: { icon: Bell, color: 'text-amber-500', label: 'Admin Notification' },
  sla_reminder: { icon: Clock, color: 'text-orange-500', label: 'SLA Reminder' },
};

export default function ToastContainer() {
  const { toasts, dismiss } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-3 max-w-sm w-full">
      {toasts.map(({ id, email }) => {
        const cfg = TYPE_CONFIG[email.type];
        const Icon = cfg.icon;
        return (
          <div
            key={id}
            className="bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden animate-slide-up pointer-events-auto"
            style={{ animation: 'slideUp 0.25s ease-out' }}
          >
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-slate-400" />
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Email Sent
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full bg-slate-100 ${cfg.color}`}>
                  {cfg.label}
                </span>
              </div>
              <button onClick={() => dismiss(id)} className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                <X size={14} />
              </button>
            </div>
            <div className="px-4 py-3">
              <div className="flex items-start gap-2 mb-2">
                <Icon size={15} className={`${cfg.color} mt-0.5 shrink-0`} />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800 leading-snug truncate">
                    {email.subject}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    To: <span className="font-medium text-slate-500">{email.toName}</span> · {email.to}
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mt-1 border-t border-slate-100 pt-2">
                {email.body.split('\n')[0]}
              </p>
            </div>
          </div>
        );
      })}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}