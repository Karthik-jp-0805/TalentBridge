import { Briefcase, FileText, CheckCircle2 } from 'lucide-react';
import type { ManagedCandidate } from '../../types';
import { STATUS_LABELS, STATUS_COLORS } from '../../store/appStore';

interface Props {
  candidate: ManagedCandidate;
  onViewResume: (c: ManagedCandidate) => void;
  onNextStep: (c: ManagedCandidate) => void;
  showRecruiterNotes?: boolean;
}

export default function CandidateCard({ candidate, onViewResume, onNextStep }: Props) {
  const sc = STATUS_COLORS[candidate.recruitmentStatus];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-pepsi-blue/40 transition-all duration-300 flex flex-col h-full">
      <div className="flex-grow">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-extrabold text-xl text-slate-900 leading-tight tracking-tight">{candidate.name}</h3>
            <p className="text-sm text-pepsi-blue font-bold mt-1">{candidate.currentRole}</p>
            
            <div className="flex items-center gap-3 mt-3 text-xs text-slate-500">
              <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-md border border-slate-200 font-medium text-slate-700 shadow-sm">
                <Briefcase size={14} className="text-pepsi-blue" />
                {candidate.experience} Years and {candidate.experienceMonths || 0} Months
              </span>
            </div>
          </div>
          
          <span className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-extrabold tracking-wider uppercase shadow-sm ${sc.bg} ${sc.text} ${sc.border}`}>
            {candidate.recruitmentStatus === 'Selected' && <CheckCircle2 size={12} />}
            {STATUS_LABELS[candidate.recruitmentStatus]}
          </span>
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {candidate.skills.map((skill) => (
            <span key={skill} className="px-2.5 py-1 bg-blue-50/50 text-slate-700 border border-slate-200 text-[11px] font-bold rounded-md">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-2 gap-3">
        <button 
          onClick={() => onViewResume(candidate)} 
          className="flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-lg border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm cursor-pointer"
        >
          <FileText size={14} /> View Resume
        </button>
        <button 
          onClick={() => onNextStep(candidate)} 
          className="flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-lg border-2 border-pepsi-blue bg-pepsi-blue text-white hover:bg-[#1e346b] hover:border-[#1e346b] transition-colors shadow-sm cursor-pointer"
        >
          Update Status
        </button>
      </div>
    </div>
  );
}