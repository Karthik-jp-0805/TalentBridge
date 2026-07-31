import { useState, useEffect } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import type { ManagedCandidate, RecruitmentStatus } from '../../types';
import { updateCandidateRecruitmentStatus } from '../../store/appStore';
import { showToast } from '../../store/miniToast';
import { sendRound1Notification, sendRound1ResultNotification, sendRejectNotification } from '../../services/emailService';

interface Props {
  candidate: ManagedCandidate;
  onClose: () => void;
}

const WORKFLOW_OPTIONS: { label: string; value: RecruitmentStatus }[] = [
  { label: 'Shortlisted', value: 'Shortlisted' },
  { label: 'Round 1', value: 'Round_1' },
  { label: 'Round 2', value: 'Round_2' },
  { label: 'Selected', value: 'Selected' },
  { label: 'On Hold', value: 'On_Hold' },
  { label: 'Not Shortlisted', value: 'Not_Shortlisted' },
];

export default function UpdateStatusDrawer({ candidate, onClose }: Props) {
  const [selectedStatus, setSelectedStatus] = useState<RecruitmentStatus>(candidate.recruitmentStatus);
  const [showPopup, setShowPopup] = useState(false);
  const [remarks, setRemarks] = useState('');

  // Reset state if a different candidate is selected
  useEffect(() => {
    setSelectedStatus(candidate.recruitmentStatus);
    setShowPopup(false);
    setRemarks('');
  }, [candidate]);

  const handleInitialClick = (status: RecruitmentStatus) => {
    setSelectedStatus(status);
    setShowPopup(true);
  };

  const handleSave = () => {
    const finalRemarks = remarks || 'Status updated via Client Portal';
    updateCandidateRecruitmentStatus(candidate.id, selectedStatus, finalRemarks);
    
    // Trigger respective simulated emails based on selection
    if (selectedStatus === 'Round_1') {
      sendRound1Notification(candidate.name, 'admin@tigeranalytics.com', 'Admin');
    } else if (selectedStatus === 'Selected') {
      sendRound1ResultNotification(candidate.name, 'admin@tigeranalytics.com', 'Admin', 'selected', finalRemarks);
    } else if (selectedStatus === 'Not_Shortlisted') {
      sendRejectNotification(candidate.name, 'admin@tigeranalytics.com', 'Admin', finalRemarks);
    }

    showToast('Updated and Email Sent');
    showToast('SLA FOR CURRENT STAGE IS 2 DAYS', 'info');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-end bg-black/30 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative z-10 w-full max-w-[400px] bg-white shadow-2xl flex flex-col h-full border-l border-slate-200 animate-slide-in-right">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-white">
          <h2 className="font-extrabold text-slate-900 text-lg tracking-tight">Update Status</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 p-1.5 rounded-full transition-colors cursor-pointer">
            <X size={18} />
          </button>
        </div>

        {/* Candidate Info */}
        <div className="px-6 py-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-extrabold text-2xl text-slate-900">{candidate.name}</h3>
          <p className="text-sm font-bold text-pepsi-blue mt-1.5">{candidate.currentRole}</p>
        </div>

        {/* Body */}
        <div className="flex-1 p-6 overflow-y-auto">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Workflow Stage</p>
          <div className="grid grid-cols-2 gap-3">
            {WORKFLOW_OPTIONS.map((opt) => {
              const isSelected = selectedStatus === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => handleInitialClick(opt.value)}
                  className={`py-3.5 px-4 rounded-xl text-sm font-bold border-2 transition-all cursor-pointer text-center shadow-sm ${
                    isSelected
                      ? 'bg-pepsi-blue text-white border-pepsi-blue'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-pepsi-blue hover:text-pepsi-blue'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* Remarks Popup Section */}
          {showPopup && (
            <div className="mt-8 p-5 bg-blue-50 border border-blue-100 rounded-xl animate-slide-in-right shadow-inner">
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">Remarks (Optional)</label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Share your remarks here..."
                rows={4}
                className="w-full px-4 py-3 text-sm font-medium border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pepsi-blue resize-none shadow-sm"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 flex gap-3 bg-white shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)]">
          <button onClick={onClose} className="flex-1 py-3 bg-white text-slate-700 text-sm font-bold border-2 border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
            Cancel
          </button>
          <button 
            onClick={handleSave} 
            disabled={!showPopup}
            className="flex-1 py-3 bg-pepsi-blue text-white text-sm font-bold rounded-xl border-2 border-pepsi-blue hover:bg-blue-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}