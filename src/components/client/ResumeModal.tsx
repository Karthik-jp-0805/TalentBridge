import { X, Download, Briefcase, GraduationCap } from 'lucide-react';
import type { ManagedCandidate } from '../../types';

interface Props {
  candidate: ManagedCandidate;
  onClose: () => void;
}

export default function ResumeModal({ candidate, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-end bg-black/40 backdrop-blur-sm" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="relative z-10 w-full max-w-4xl bg-gray-50 shadow-2xl flex flex-col h-full animate-slide-in-right overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-200 bg-white shadow-sm z-10">
          <div>
            <h2 className="font-extrabold text-gray-900 text-xl tracking-tight">{candidate.name}</h2>
            <p className="text-sm font-bold text-pepsi-blue mt-1">{candidate.currentRole} · {candidate.company}</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-sm font-bold text-pepsi-blue border-2 border-pepsi-blue rounded-lg px-4 py-2 hover:bg-blue-50 transition-colors shadow-sm cursor-pointer">
              <Download size={16} /> Download PDF
            </button>
            <button onClick={onClose} className="p-2 rounded-full text-gray-400 bg-gray-100 hover:text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content Area - 2 Columns */}
        <div className="flex flex-1 overflow-hidden">
          
          {/* Main Document Body (Sanitized) */}
          <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-4">
            <div className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-2 ml-1">Resume Preview</div>
            
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-10 max-w-[650px] mx-auto w-full font-sans">
              <div className="border-b-4 border-pepsi-blue pb-5 mb-8">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">{candidate.name}</h1>
                <p className="text-lg text-pepsi-blue font-bold mt-2">{candidate.currentRole}</p>
                {/* Notice: Contact Info deliberately omitted for privacy */}
              </div>

              <div className="mb-8">
                <h2 className="text-sm font-extrabold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-100 pb-2">Experience</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-base text-gray-800">{candidate.currentRole}</p>
                      <p className="text-xs font-bold text-pepsi-blue bg-blue-50 px-2 py-1 rounded-md">{candidate.experience} yrs, {candidate.experienceMonths} mos</p>
                    </div>
                    <p className="text-sm text-gray-500 font-bold mt-1">{candidate.company}</p>
                    <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                      Led cross-functional initiatives driving measurable business outcomes. Collaborated with stakeholders across product, engineering, and design to deliver high-impact projects on time and within scope. Demonstrated strong proficiency in core technologies and agile methodologies.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-sm font-extrabold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-100 pb-2">Education</h2>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg border border-gray-100">
                    <GraduationCap size={18} className="text-gray-500" />
                  </div>
                  <p className="text-sm font-bold text-gray-800">{candidate.education}</p>
                </div>
              </div>

              <div className="mb-4">
                <h2 className="text-sm font-extrabold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-100 pb-2">Technical Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1.5 bg-gray-50 text-gray-700 text-xs font-bold rounded-lg border border-gray-200 shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Highlights (Sanitized) */}
          <div className="w-[320px] min-w-[320px] bg-white border-l border-gray-200 flex flex-col p-6 overflow-y-auto">
            <h3 className="text-xs font-extrabold text-gray-400 tracking-widest uppercase mb-5">Profile Highlights</h3>
            
            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-1">Total Exp</div>
                <div className="text-lg font-extrabold text-gray-900">{candidate.experience} <span className="text-sm text-gray-500 font-bold">yrs</span></div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-1">Notice</div>
                <div className="text-sm font-extrabold text-gray-900 mt-1">{candidate.noticePeriod}</div>
              </div>
            </div>

            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5 shadow-sm">
              <div className="text-[10px] font-extrabold text-pepsi-blue uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Briefcase size={12} /> Top Skills Alignment
              </div>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.slice(0, 4).map((skill) => (
                  <span key={skill} className="px-2.5 py-1 bg-white text-pepsi-blue text-[11px] font-bold rounded-md border border-blue-100 shadow-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Notice: CTC and AI Summary deliberately omitted for client privacy */}
            <div className="mt-auto pt-6">
              <p className="text-[10px] font-bold text-gray-400 text-center uppercase tracking-widest">Confidential Document</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}