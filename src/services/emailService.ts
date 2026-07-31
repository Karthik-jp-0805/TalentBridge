import type { EmailPayload } from '../types';

type EmailListener = (email: EmailPayload) => void;
const listeners: EmailListener[] = [];

export function onEmail(fn: EmailListener) {
  listeners.push(fn);
  return () => {
    const i = listeners.indexOf(fn);
    if (i > -1) listeners.splice(i, 1);
  };
}

function dispatch(email: EmailPayload) {
  console.log('[EmailService] Sending email:', email);
  listeners.forEach((fn) => fn(email));
}

export function sendShortlistNotification(candidateName: string, clientEmail: string, clientName: string) {
  dispatch({
    to: clientEmail, toName: clientName,
    subject: `Profile Shortlisted: ${candidateName} — Action Required Within 48hrs`,
    body: `Dear ${clientName},\n\nYou have shortlisted ${candidateName} for further evaluation.`,
    type: 'shortlist', candidateName, timestamp: new Date().toISOString(),
  });
}

export function sendRejectNotification(candidateName: string, clientEmail: string, clientName: string, reason: string) {
  dispatch({
    to: clientEmail, toName: clientName,
    subject: `Profile Feedback Received: ${candidateName}`,
    body: `Dear ${clientName},\n\nThank you for reviewing ${candidateName}'s profile.\n\nWe have recorded your feedback: "${reason}"`,
    type: 'reject', candidateName, timestamp: new Date().toISOString(),
  });
}

export function sendRound1Notification(candidateName: string, clientEmail: string, clientName: string) {
  dispatch({
    to: clientEmail, toName: clientName,
    subject: `Round 1 Scheduled: ${candidateName}`,
    body: `Dear ${clientName},\n\nGreat news! ${candidateName} has been moved to Round 1 of your evaluation pipeline.`,
    type: 'round1', candidateName, timestamp: new Date().toISOString(),
  });
}

export function sendRound1ResultNotification(candidateName: string, clientEmail: string, clientName: string, result: 'selected' | 'rejected', reason: string) {
  const isSelected = result === 'selected';
  dispatch({
    to: clientEmail, toName: clientName,
    subject: `Round 1 ${isSelected ? 'Cleared ✓' : 'Feedback'}: ${candidateName}`,
    body: isSelected ? `Dear ${clientName},\n\n${candidateName} has cleared Round 1.` : `Dear ${clientName},\n\nFeedback recorded: "${reason}"`,
    type: 'round1_result', candidateName, timestamp: new Date().toISOString(),
  });
}

export function sendOnboardEmail(candidateName: string, clientEmail: string, clientName: string) {
  dispatch({
    to: clientEmail, toName: clientName,
    subject: `Onboarding Initiated: ${candidateName} 🎉`,
    body: `Dear ${clientName},\n\nExcellent! You have confirmed onboarding for ${candidateName}.`,
    type: 'onboard', candidateName, timestamp: new Date().toISOString(),
  });
}

export function sendDailySLAReminder(candidateName: string, clientEmail: string, clientName: string, dayCount: number) {
  dispatch({
    to: clientEmail, toName: clientName,
    subject: `⏰ SLA Reminder (Day ${dayCount}): Action pending for ${candidateName}`,
    body: `Dear ${clientName},\n\nThis is your Day ${dayCount} reminder that ${candidateName}'s profile is awaiting your action.`,
    type: 'sla_reminder', candidateName, timestamp: new Date().toISOString(),
  });
}