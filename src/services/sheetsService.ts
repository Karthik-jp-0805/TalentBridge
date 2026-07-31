import type { SheetColumn } from '../types';

export const DEFAULT_COLUMNS: SheetColumn[] = [
  { key: 'name',           label: 'Full Name',        visibleToClient: true,  type: 'text' },
  { key: 'currentRole',    label: 'Current Role',     visibleToClient: true,  type: 'text' },
  { key: 'company',        label: 'Company',          visibleToClient: true,  type: 'text' },
  { key: 'experience',     label: 'Experience (yrs)', visibleToClient: true,  type: 'number' },
  { key: 'location',       label: 'Location',         visibleToClient: true,  type: 'text' },
  { key: 'noticePeriod',   label: 'Notice Period',    visibleToClient: true,  type: 'badge' },
  { key: 'skills',         label: 'Key Skills',       visibleToClient: true,  type: 'tags' },
  { key: 'ctc',            label: 'Current CTC',      visibleToClient: false, type: 'text' },
  { key: 'email',          label: 'Email',            visibleToClient: false, type: 'text' },
  { key: 'phone',          label: 'Phone',            visibleToClient: false, type: 'text' },
  { key: 'education',      label: 'Education',        visibleToClient: true,  type: 'text' },
  { key: 'status',         label: 'Status',           visibleToClient: false, type: 'badge' },
  { key: 'assignedToClient', label: 'Assigned Client', visibleToClient: false, type: 'text' },
  { key: 'addedOn',        label: 'Date Added',       visibleToClient: false, type: 'date' },
];

let columns = [...DEFAULT_COLUMNS];

export function getSheetColumns(): SheetColumn[] {
  return [...columns];
}

export function toggleColumnVisibility(key: string, visible: boolean): void {
  columns = columns.map((c) => (c.key === key ? { ...c, visibleToClient: visible } : c));
}

export function getClientVisibleKeys(): string[] {
  return columns.filter((c) => c.visibleToClient).map((c) => c.key);
}