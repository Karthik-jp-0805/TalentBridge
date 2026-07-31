import type { AppUser, ManagedCandidate, RecruitmentStatus, Client } from '../types';

export const STATUS_SEQUENCE: RecruitmentStatus[] = [
  'Available', 'Applied', 'Screening', 'Shortlisted',
  'Round_1', 'Round_2', 'Round_3',
  'Final_Interview', 'Selected',
];

export const STATUS_LABELS: Record<RecruitmentStatus, string> = {
  Available: 'Available',
  Applied: 'Applied',
  Screening: 'Screening',
  Shortlisted: 'Shortlisted',
  Round_1: 'Round 1',
  Round_2: 'Round 2',
  Round_3: 'Round 3',
  Final_Interview: 'Final Interview',
  Selected: 'Selected',
  Not_Shortlisted: 'Not Shortlisted',
  Rejected: 'Rejected',
  On_Hold: 'On Hold',
};

export const STATUS_COLORS: Record<RecruitmentStatus, { bg: string; text: string; border: string }> = {
  Available:       { bg: 'bg-slate-100',    text: 'text-slate-600',   border: 'border-slate-300' },
  Applied:         { bg: 'bg-slate-100',    text: 'text-slate-600',   border: 'border-slate-300' },
  Screening:       { bg: 'bg-sky-50',       text: 'text-sky-700',     border: 'border-sky-200' },
  Shortlisted:     { bg: 'bg-blue-50',      text: 'text-blue-700',    border: 'border-blue-200' },
  Round_1:         { bg: 'bg-violet-50',    text: 'text-violet-700',  border: 'border-violet-200' },
  Round_2:         { bg: 'bg-purple-50',    text: 'text-purple-700',  border: 'border-purple-200' },
  Round_3:         { bg: 'bg-indigo-50',    text: 'text-indigo-700',  border: 'border-indigo-200' },
  Final_Interview: { bg: 'bg-amber-50',     text: 'text-amber-700',   border: 'border-amber-200' },
  Selected:        { bg: 'bg-emerald-50',   text: 'text-emerald-700', border: 'border-emerald-200' },
  Not_Shortlisted: { bg: 'bg-red-50',       text: 'text-red-600',     border: 'border-red-200' },
  Rejected:        { bg: 'bg-red-50',       text: 'text-red-600',     border: 'border-red-200' },
  On_Hold:         { bg: 'bg-orange-50',    text: 'text-orange-700',  border: 'border-orange-200' },
};

const CLIENTS: Client[] = [
  { id: 'c1', name: 'PepsiCo - Analytics' },
  { id: 'c2', name: 'PepsiCo - Engineering' },
];

const INITIAL_USERS: AppUser[] = [
  { id: 'u_admin', email: 'admin@tigeranalytics.com', name: 'Priya Sharma', role: 'admin', status: 'active', assignedCandidateIds: [], lastLogin: '2024-07-20T09:30:00Z', password: 'Admin@123' },
  { id: 'u_client1', email: 'rajesh.kumar@pepsico.com', name: 'Rajesh Kumar', role: 'client', status: 'active', assignedCandidateIds: ['c1', 'c2', 'c3'], lastLogin: '2024-07-19T14:00:00Z', password: 'Client@123' },
  { id: 'u_client2', email: 'meena.iyer@pepsico.com', name: 'Meena Iyer', role: 'client', status: 'active', assignedCandidateIds: ['c4', 'c5'], lastLogin: '2024-07-18T10:00:00Z', password: 'Client@123' },
  { id: 'u_client3', email: 'vikram.singh@pepsico.com', name: 'Vikram Singh', role: 'client', status: 'active', assignedCandidateIds: ['c6', 'c7'], lastLogin: '2024-07-21T08:15:00Z', password: 'Client@123' },
  { id: 'u_client4', email: 'sarah.jones@pepsico.com', name: 'Sarah Jones', role: 'client', status: 'inactive', assignedCandidateIds: ['c8'], lastLogin: '2024-06-30T11:45:00Z', password: 'Client@123' },
];

const INITIAL_CANDIDATES: ManagedCandidate[] = [
  {
    id: 'c1', name: 'Arjun Mehta', currentRole: 'Data Engineer', company: 'Infosys', experience: 6, experienceMonths: 2, location: 'Bengaluru', noticePeriod: '30 days',
    skills: ['React', 'Node.js', 'AWS', 'Python', 'SQL', 'Docker', 'Kubernetes', 'Snowflake'], email: 'arjun.mehta@email.com', phone: '+91 98765 43210', resumeFileName: 'arjun_mehta_resume.pdf', ctc: '18 LPA',
    education: 'B.Tech, BITS Pilani', aiSummary: 'Arjun is a full-stack engineer with 6 years of experience.', addedOn: '2024-06-10', recruitmentStatus: 'Round_1',
    assignedToUserIds: ['u_client1'], recruiterNotes: 'Strong technical profile.', lastUpdated: '2024-07-18T10:00:00Z', assignedRecruiter: 'Priya Sharma',
    statusHistory: [{ status: 'Round_1', note: 'Client confirmed Round 1', date: '2024-07-01' }],
  },
  {
    id: 'c2', name: 'Priya Nair', currentRole: 'Product Manager', company: 'Flipkart', experience: 8, experienceMonths: 5, location: 'Delhi NCR', noticePeriod: '60 days',
    skills: ['Agile', 'SQL', 'Figma', 'Jira', 'Product Strategy', 'A/B Testing', 'Stakeholder Mgmt'], email: 'priya.nair@email.com', phone: '+91 87654 32109', resumeFileName: 'priya_nair_resume.pdf', ctc: '35 LPA',
    education: 'MBA, IIM Bangalore', aiSummary: 'Priya brings 8 years of product management experience.', addedOn: '2024-06-12', recruitmentStatus: 'Shortlisted',
    assignedToUserIds: ['u_client1'], recruiterNotes: 'Excellent PM background.', lastUpdated: '2024-07-15T09:00:00Z', assignedRecruiter: 'Priya Sharma',
    statusHistory: [{ status: 'Shortlisted', note: 'Shared with Rajesh', date: '2024-06-25' }],
  },
  {
    id: 'c3', name: 'Neha Gupta', currentRole: 'Data Scientist', company: 'Mu Sigma', experience: 4, experienceMonths: 11, location: 'Hyderabad', noticePeriod: '15 days',
    skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'], email: 'neha.g@email.com', phone: '+91 76543 21098', resumeFileName: 'neha_gupta_resume.pdf', ctc: '14 LPA',
    education: 'M.Sc Statistics', aiSummary: 'Strong ML background.', addedOn: '2024-06-15', recruitmentStatus: 'Available',
    assignedToUserIds: ['u_client1'], recruiterNotes: 'Ready for deployment.', lastUpdated: '2024-07-20T09:00:00Z', assignedRecruiter: 'Priya Sharma',
    statusHistory: [{ status: 'Available', note: 'Profile cleared screening', date: '2024-06-20' }],
  },
  {
    id: 'c4', name: 'Rahul Desai', currentRole: 'Cloud Architect', company: 'TCS', experience: 9, experienceMonths: 0, location: 'Mumbai', noticePeriod: '90 days',
    skills: ['AWS', 'Azure', 'Kubernetes', 'Terraform'], email: 'rahul.d@email.com', phone: '+91 65432 10987', resumeFileName: 'rahul_desai_resume.pdf', ctc: '28 LPA',
    education: 'B.E Computer Science', aiSummary: 'Expert in multi-cloud architecture.', addedOn: '2024-06-18', recruitmentStatus: 'Selected',
    assignedToUserIds: ['u_client2'], recruiterNotes: 'Offer released.', lastUpdated: '2024-07-21T10:00:00Z', assignedRecruiter: 'Priya Sharma',
    statusHistory: [{ status: 'Selected', note: 'Offer accepted by candidate', date: '2024-07-21' }],
  }
];

type StoreListener = () => void;
const listeners = new Set<StoreListener>();

let users: AppUser[] = [...INITIAL_USERS];
let candidates: ManagedCandidate[] = [...INITIAL_CANDIDATES];

function notify() { listeners.forEach((fn) => fn()); }
export function subscribe(fn: StoreListener) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export interface AuthState { userId: string | null; email: string | null; name: string | null; role: 'admin' | 'client' | null; }
const stored = sessionStorage.getItem('auth');
let auth: AuthState = stored ? (JSON.parse(stored) as AuthState) : { userId: null, email: null, name: null, role: null };

export function getAuth(): AuthState { return { ...auth }; }

export function login(email: string, password: string): { ok: boolean; error?: string } {
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return { ok: false, error: 'This email is not authorized. Contact your admin.' };
  if (user.status === 'inactive') return { ok: false, error: 'Your account has been deactivated. Contact your admin.' };
  if (user.password !== password) return { ok: false, error: 'Incorrect password.' };
  
  auth = { userId: user.id, email: user.email, name: user.name, role: user.role };
  users = users.map((u) => (u.id === user.id ? { ...u, lastLogin: new Date().toISOString() } : u));
  sessionStorage.setItem('auth', JSON.stringify(auth));
  notify();
  return { ok: true };
}

export function logout() {
  auth = { userId: null, email: null, name: null, role: null };
  sessionStorage.removeItem('auth');
  notify();
}

export function getUsers(): AppUser[] { return [...users]; }
export function getClients(): Client[] { return [...CLIENTS]; }
export function getCandidates(): ManagedCandidate[] { return [...candidates]; }

export function getCandidatesForUser(userId: string): ManagedCandidate[] {
  const user = users.find((u) => u.id === userId);
  if (!user) return [];
  return candidates.filter((c) => user.assignedCandidateIds.includes(c.id));
}

export function addUser(u: Omit<AppUser, 'id' | 'lastLogin'>): AppUser {
  const newUser: AppUser = { ...u, id: `u_${Date.now()}`, lastLogin: null };
  users = [newUser, ...users];
  notify();
  return newUser;
}

export function toggleUserStatus(id: string) {
  users = users.map((u) => (u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u));
  notify();
}

export function assignCandidatesToUser(userId: string, candidateIds: string[]) {
  users = users.map((u) => (u.id === userId ? { ...u, assignedCandidateIds: candidateIds } : u));
  candidates = candidates.map((c) => {
    const shouldHave = users.filter((u) => u.assignedCandidateIds.includes(c.id)).map((u) => u.id);
    return { ...c, assignedToUserIds: shouldHave };
  });
  notify();
}

export function addManagedCandidate(c: Omit<ManagedCandidate, 'id' | 'addedOn' | 'lastUpdated' | 'statusHistory'>): ManagedCandidate {
  const now = new Date().toISOString();
  const newC: ManagedCandidate = {
    ...c, id: `c_${Date.now()}`, addedOn: now.split('T')[0], lastUpdated: now,
    statusHistory: [{ status: c.recruitmentStatus, note: 'Profile added', date: now.split('T')[0] }],
  };
  candidates = [newC, ...candidates];
  notify();
  return newC;
}

export function updateCandidateRecruitmentStatus(candidateId: string, status: RecruitmentStatus, note: string) {
  const now = new Date().toISOString();
  candidates = candidates.map((c) =>
    c.id === candidateId
      ? { ...c, recruitmentStatus: status, lastUpdated: now, statusHistory: [...c.statusHistory, { status, note, date: now.split('T')[0] }] }
      : c
  );
  notify();
}