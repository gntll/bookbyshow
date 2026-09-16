'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { X, Bell, Check, ShieldCheck, Mail } from 'lucide-react';

export function PriceAlertModal() {
  const { alertTarget, closeAlertModal } = useApp();
  const [email, setEmail] = useState('');
  const [targetPrice, setTargetPrice] = useState<number>(() => {
    return alertTarget ? Math.floor(alertTarget.currentLowest * 0.85) : 15;
  });
  const [isSuccess, setIsSuccess] = useState(false);

  if (!alertTarget) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      closeAlertModal();
    }, 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="alert-title"
    >
      <div
        className="relative w-full max-w-md bg-[#0e1320] border border-[#1e2638] rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-[#1e2638] bg-gradient-to-r from-[#141b2b] to-[#0e1320] relative">
          <button
            onClick={closeAlertModal}
            className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-3">
            <Bell className="w-5 h-5" />
          </div>

          <h3 id="alert-title" className="text-xl font-bold text-white tracking-tight">
            Create Price Drop Alert
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Tracking: <span className="text-white font-medium">{alertTarget.title}</span>
          </p>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-white">Alert Activated!</h4>
            <p className="text-xs text-gray-400 max-w-xs mx-auto">
              We will notify <span className="text-white font-semibold">{email}</span> the instant prices drop below ${targetPrice} or premium seats release.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-gray-300 mb-1.5 font-medium">
                <span>Alert me when total price drops below:</span>
                <span className="text-amber-400 font-bold text-sm">${targetPrice}</span>
              </div>
              <input
                type="range"
                min="10"
                max={Math.ceil(alertTarget.currentLowest * 1.5)}
                value={targetPrice}
                onChange={(e) => setTargetPrice(Number(e.target.value))}
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                <span>$10</span>
                <span>Current lowest: ${alertTarget.currentLowest.toFixed(2)}</span>
                <span>${Math.ceil(alertTarget.currentLowest * 1.5)}</span>
              </div>
            </div>

            <div>
              <label htmlFor="alert-email" className="block text-xs text-gray-300 font-medium mb-1.5">
                Your Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="alert-email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#131929] border border-[#1e2638] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm shadow-lg shadow-amber-500/20 transition-all"
            >
              Set Instant Price Drop Alert
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Zero spam. Unsubscribe anytime with 1 click.</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
