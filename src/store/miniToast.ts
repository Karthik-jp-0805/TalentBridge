export interface MiniToastItem {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

type Listener = (toasts: MiniToastItem[]) => void;

let toasts: MiniToastItem[] = [];
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((fn) => fn([...toasts]));
}

export function subscribeMiniToast(fn: Listener) {
  listeners.add(fn);
  fn([...toasts]);
  return () => listeners.delete(fn);
}

export function showToast(message: string, type: MiniToastItem['type'] = 'success') {
  const id = `t_${Date.now()}_${Math.random()}`;
  toasts = [...toasts, { id, message, type }];
  notify();
  
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    notify();
  }, 2500);
}