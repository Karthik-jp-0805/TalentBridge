import { useState, useMemo } from 'react';
import { Eye, EyeOff, Grid3x3, RefreshCw, CheckCircle2 } from 'lucide-react';
import { getCandidates } from '../../store/appStore';
import { getSheetColumns, toggleColumnVisibility } from '../../services/sheetsService';
import type { SheetColumn } from '../../types';

const STATUS_COLORS: Record<string, string> = {
  Available: 'bg-slate-100 text-slate-600',
  Applied: 'bg-slate-100 text-slate-600',
  Screening: 'bg-sky-50 text-sky-700',
  Shortlisted: 'bg-blue-50 text-blue-700',
  Round_1: 'bg-violet-50 text-violet-700',
  Round_2: 'bg-purple-50 text-purple-700',
  Round_3: 'bg-indigo-50 text-indigo-700',
  Final_Interview: 'bg-amber-50 text-amber-700',
  Selected: 'bg-emerald-50 text-emerald-700',
  Not_Shortlisted: 'bg-red-50 text-red-600',
  Rejected: 'bg-red-50 text-red-600',
  On_Hold: 'bg-orange-50 text-orange-700',
};

function CellValue({ col, value }: { col: SheetColumn; value: unknown }) {
  if (value === null || value === undefined) return <span className="text-gray-300">—</span>;

  if (col.type === 'tags' && Array.isArray(value)) {
    return (
      <div className="flex flex-wrap gap-1">
        {(value as string[]).slice(0, 3).map((v) => (
          <span key={v} className="px-1.5 py-0.5 bg-gray-100 text-gray-700 text-[10px] rounded font-medium">{v}</span>
        ))}
        {value.length > 3 && <span className="text-[10px] text-gray-400">+{value.length - 3}</span>}
      </div>
    );
  }

  if (col.type === 'badge') {
    const label = String(value).replace(/_/g, ' ');
    const colorClass = STATUS_COLORS[String(value)] || 'bg-gray-100 text-gray-600';
    return <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${colorClass}`}>{label}</span>;
  }

  return <span className="text-gray-700 text-xs font-medium">{String(value)}</span>;
}

export default function SheetsView() {
  const [columns, setColumns] = useState<SheetColumn[]>(getSheetColumns());
  const candidates = useMemo(() => getCandidates(), []);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleToggle = (key: string, visible: boolean) => {
    toggleColumnVisibility(key, visible);
    setColumns(getSheetColumns());
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1500); 
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col p-6 bg-[#F8FAFD]">
      <div className="max-w-[1200px] w-full mx-auto flex-1 flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Grid3x3 className="h-6 w-6 text-pepsi-blue" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Master Data Integration</h2>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <button onClick={handleSync} disabled={isSyncing} className="flex items-center gap-2 bg-pepsi-blue text-white px-4 py-2 rounded-md hover:bg-blue-900 text-sm font-bold disabled:opacity-70 cursor-pointer transition-colors shadow-sm">
              <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Syncing...' : 'Sync Now'}
            </button>
            <span className="text-xs text-green-600 font-bold flex items-center gap-1">
              <CheckCircle2 size={12} /> Last synced: 7:38:59 PM (2 records)
            </span>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="w-[300px] min-w-[300px] border-r border-gray-200 bg-white flex flex-col overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <p className="text-sm font-bold text-gray-900">Client View Visibility</p>
            </div>
            <div className="flex-1 divide-y divide-gray-100">
              {columns.map((col) => (
                <div key={col.key} className={`flex items-center justify-between px-6 py-3 hover:bg-blue-50/30 transition-colors ${col.visibleToClient ? '' : 'opacity-60 bg-gray-50'}`}>
                  <p className="text-sm text-gray-900 font-medium">{col.label}</p>
                  <button onClick={() => handleToggle(col.key, !col.visibleToClient)} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer border ${col.visibleToClient ? 'bg-blue-50 text-pepsi-blue border-blue-200 hover:bg-blue-100' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}>
                    {col.visibleToClient ? <><Eye size={12} /> Visible</> : <><EyeOff size={12} /> Hidden</>}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-auto bg-gray-50/30">
            <table className="w-full text-left text-sm border-collapse min-w-[900px]">
              <thead className="sticky top-0 z-10 shadow-sm">
                <tr>
                  <th className="bg-gray-100 border-b border-gray-200 px-4 py-3 text-[11px] font-bold text-gray-500 uppercase w-8">#</th>
                  {columns.map((col) => (
                    <th key={col.key} className={`border-b border-gray-200 px-4 py-3 text-[11px] font-bold uppercase whitespace-nowrap ${col.visibleToClient ? 'bg-blue-50 text-pepsi-blue' : 'bg-gray-100 text-gray-400'}`}>
                      <div className="flex items-center gap-1.5">
                        {col.visibleToClient ? <Eye size={12} className="text-pepsi-blue" /> : <EyeOff size={12} className="text-gray-400" />}
                        {col.label}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate, rowIdx) => (
                  <tr key={candidate.id} className="hover:bg-blue-50/20 transition-colors bg-white">
                    <td className="border-b border-gray-100 px-4 py-3 text-gray-400 font-mono text-[10px] bg-gray-50/50">{rowIdx + 1}</td>
                    {columns.map((col) => (
                      <td key={col.key} className={`border-b border-gray-100 px-4 py-3 ${!col.visibleToClient ? 'bg-gray-50' : ''}`}>
                        {!col.visibleToClient ? <span className="text-gray-300 italic text-[10px] font-bold uppercase tracking-wider">Hidden</span> : <CellValue col={col} value={(candidate as unknown as Record<string, unknown>)[col.key]} />}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}