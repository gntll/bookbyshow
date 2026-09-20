'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { X, Bell, Check, Mail } from 'lucide-react';

export function PriceAlertModal() {
  const { alertTarget, closeAlertModal } = useApp();
  const [email, setEmail] = useState('');
  const [targetPrice, setTargetPrice] = useState<number>(() => {
    return alertTarget ? Math.floor(alertTarget.currentLowest * 0.85) : 15;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!alertTarget) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/alerts/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          targetId: alertTarget.id || alertTarget.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          targetType: alertTarget.type || 'movie',
          title: alertTarget.title,
          initialPrice: alertTarget.currentLowest,
          targetPrice,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to activate alert');
      }

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        closeAlertModal();
      }, 2000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="alert-title"
    >
      <div
        className="relative w-full max-w-md bg-[#0e1015] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-neutral-800 bg-neutral-950/80 relative">
          <button
            onClick={closeAlertModal}
            className="absolute top-5 right-5 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-[#e51821]/50 flex items-center justify-center text-[#e51821] mb-3">
            <Bell className="w-5 h-5" />
          </div>

          <h3 id="alert-title" className="text-xl font-bold text-white tracking-tight">
            Create Price Drop Alert
          </h3>
          <p className="text-sm text-neutral-300 mt-0.5">
            Tracking: <span className="text-white font-semibold">{alertTarget.title}</span>
          </p>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#e51821] text-white flex items-center justify-center mx-auto font-bold">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">Alert Activated</h4>
            <p className="text-sm text-neutral-300 max-w-xs mx-auto">
              We will notify <span className="text-white font-medium">{email}</span> if the verified total drops below ${targetPrice}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm text-neutral-200 mb-1.5 font-medium">
                <span>Alert me when total price drops below:</span>
                <span className="text-[#e51821] font-black text-base">${targetPrice}</span>
              </div>
              <input
                type="range"
                min="10"
                max={Math.ceil(alertTarget.currentLowest * 1.5)}
                value={targetPrice}
                onChange={(e) => setTargetPrice(Number(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#e51821]"
              />
              <div className="flex justify-between text-xs text-neutral-400 mt-1">
                <span>$10</span>
                <span>Current lowest: ${alertTarget.currentLowest.toFixed(2)}</span>
                <span>${Math.ceil(alertTarget.currentLowest * 1.5)}</span>
              </div>
            </div>

            <div>
              <label htmlFor="alert-email" className="block text-sm text-neutral-200 font-medium mb-1.5">
                Your Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="alert-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-400 focus:outline-none focus:border-[#e51821] transition-colors"
                />
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/50 text-red-200 text-xs font-medium">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#e51821] hover:bg-[#c9121a] disabled:opacity-50 text-white font-bold text-sm rounded-lg transition-colors shadow-md shadow-red-950/40 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  <span>Activating Alert...</span>
                </>
              ) : (
                <span>Activate Price Drop Alert</span>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
