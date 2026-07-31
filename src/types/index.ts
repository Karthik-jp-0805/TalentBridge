export type RecruitmentStatus =
  | 'Available'
  | 'Applied'
  | 'Screening'
  | 'Shortlisted'
  | 'Round_1'
  | 'Round_2'
  | 'Round_3'
  | 'Final_Interview'
  | 'Selected'
  | 'Not_Shortlisted'
  | 'Rejected'
  | 'On_Hold';

export interface AppUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'client';
  status: 'active' | 'inactive';
  assignedCandidateIds: string[];
  lastLogin: string | null;
  password: string;
}

export interface ManagedCandidate {
  id: string;
  name: string;
  currentRole: string;
  company: string;
  experience: number;
  experienceMonths: number;
  location: string;
  noticePeriod: string;
  skills: string[];
  email: string;
  phone: string;
  resumeFileName: string;
  ctc: string;
  education: string;
  aiSummary: string;
  addedOn: string;
  recruitmentStatus: RecruitmentStatus;
  assignedToUserIds: string[];
  recruiterNotes: string;
  lastUpdated: string;
  assignedRecruiter: string;
  statusHistory: { status: RecruitmentStatus; note: string; date: string }[];
}

export interface Client {
  id: string;
  name: string;
}

export interface EmailPayload {
  to: string;
  toName: string;
  subject: string;
  body: string;
  type: 'shortlist' | 'reject' | 'round1' | 'round1_result' | 'onboard' | 'admin_notify' | 'sla_reminder';
  candidateName: string;
  timestamp: string;
}

export interface SheetColumn {
  key: string;
  label: string;
  visibleToClient: boolean;
  type: 'text' | 'number' | 'badge' | 'tags' | 'date';
}