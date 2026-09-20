'use client';

import React, { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PwaRegister() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if running standalone (already installed)
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true
    ) {
      setIsStandalone(true);
      return;
    }

    // Register Service Worker in production / supported environments
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => {
            // Check for updates periodically
            reg.onupdatefound = () => {
              const installingWorker = reg.installing;
              if (installingWorker) {
                installingWorker.onstatechange = () => {
                  if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    // New content available
                    console.log('[SW] New content available; please refresh.');
                  }
                };
              }
            };
          })
          .catch((err) => {
            console.warn('[SW] Registration failed:', err);
          });
      });
    }

    // Listen for PWA install prompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstallPrompt(null);
    }
  };

  // If already installed, dismissed, or no prompt available, don't show prompt
  if (isStandalone || isDismissed || !installPrompt) {
    return null;
  }

  return (
    <aside
      aria-label="Install App"
      className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 max-w-sm w-[calc(100vw-2rem)] sm:w-auto bg-slate-900/95 border border-rose-500/30 rounded-2xl p-4 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-rose-400 flex items-center justify-center text-white shrink-0 shadow-md shadow-rose-600/30">
          <Download className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0 pr-2">
          <h4 className="text-sm font-semibold text-white">Install BookByShow App</h4>
          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
            Get faster access, offline showtimes, and instant price drop alerts on your home screen.
          </p>
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={handleInstallClick}
              className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold tracking-wide transition shadow-sm active:scale-95"
            >
              Install Now
            </button>
            <button
              onClick={() => setIsDismissed(true)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
            >
              Not Now
            </button>
          </div>
        </div>
        <button
          onClick={() => setIsDismissed(true)}
          className="text-slate-400 hover:text-white p-1 -mr-1 -mt-1 transition rounded-lg hover:bg-slate-800"
          aria-label="Close install prompt"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
