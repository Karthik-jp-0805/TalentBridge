import { useState, useEffect } from 'react';
import { onEmail } from '../services/emailService';
import type { EmailPayload } from '../types';

export interface Toast {
  id: string;
  email: EmailPayload;
}

export function useToastStore() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const unsub = onEmail((email) => {
      const id = String(Date.now() + Math.random());
      setToasts((prev) => [...prev, { id, email }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 7000);
    });
    return unsub;
  }, []);

  const dismiss = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return { toasts, dismiss };
}