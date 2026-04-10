import { useEffect, useState } from 'react';

interface ToastItem {
  id: number;
  message: string;
  icon?: string;
  type?: 'default' | 'success' | 'info' | 'new';
}

let _setToasts: React.Dispatch<React.SetStateAction<ToastItem[]>> | null = null;
let _idCounter = 0;

export function showToast(message: string, icon?: string, type: ToastItem['type'] = 'default') {
  if (!_setToasts) return;
  const id = ++_idCounter;
  _setToasts(prev => [...prev, { id, message, icon, type }]);
  setTimeout(() => {
    _setToasts?.(prev => prev.filter(t => t.id !== id));
  }, 3500);
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  _setToasts = setToasts;

  useEffect(() => {
    return () => { _setToasts = null; };
  }, []);

  const typeStyles: Record<string, string> = {
    default: 'border-border-base bg-bg-overlay',
    success: 'border-accent-emerald/30 bg-bg-overlay',
    info:    'border-accent-blue/30 bg-bg-overlay',
    new:     'border-accent-blue/40 bg-bg-overlay shadow-glow-blue',
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map(t => (
        <div
          key={t.id}
          role="alert"
          className={`
            pointer-events-auto animate-toast-in
            flex items-center gap-3 px-4 py-3 rounded-xl
            border backdrop-blur-glass
            text-sm font-medium font-body text-text-primary
            shadow-modal
            ${typeStyles[t.type ?? 'default']}
          `}
        >
          {t.icon && <span className="text-base leading-none">{t.icon}</span>}
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
