'use client';

import React, { useState } from 'react';
import { Palette, X, Check, ChevronRight } from 'lucide-react';
import { useTheme, THEME_PRESETS, ThemePreset } from '@/context/ThemeContext';

const PRESETS: { key: ThemePreset; label: string; color: string }[] = [
  { key: 'electric-blue', label: 'Electric Blue', color: '#0ea5e9' },
  { key: 'emerald',       label: 'Emerald',        color: '#10b981' },
  { key: 'violet',        label: 'Violet',          color: '#8b5cf6' },
  { key: 'amber',         label: 'Amber Gold',      color: '#f59e0b' },
  { key: 'crimson',       label: 'Crimson Red',     color: '#ff003c' },
];

export const ThemePicker: React.FC = () => {
  const { theme, setTheme, customColors, setCustomColors } = useTheme();
  const [open, setOpen] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const [localPrimary, setLocalPrimary] = useState(customColors.primary);
  const [localSecondary, setLocalSecondary] = useState(customColors.secondary);

  const applyCustom = () => {
    setCustomColors({ primary: localPrimary, secondary: localSecondary });
    setShowCustom(false);
  };

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Change Theme"
        title="Change Theme"
        className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-surface-200/80 text-slate-300 transition-all hover:border-primary hover:text-white"
        style={{ borderColor: open ? 'var(--color-primary)' : undefined }}
      >
        <Palette className="h-4 w-4" />
        {/* Active color dot */}
        <span
          className="absolute bottom-1.5 right-1.5 h-2 w-2 rounded-full border border-black"
          style={{ backgroundColor: 'var(--color-primary)' }}
        />
      </button>

      {/* Panel */}
      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          <div className="absolute right-0 top-12 z-50 w-64 rounded-2xl border border-white/10 bg-surface-100/98 p-4 shadow-2xl backdrop-blur-xl animate-fade-in">
            <div className="flex items-center justify-between mb-3">
              <p className="text-white text-xs font-bold uppercase tracking-wider">Theme Color</p>
              <button onClick={() => setOpen(false)} className="text-white/30 hover:text-white transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Preset swatches */}
            <div className="space-y-1.5 mb-3">
              {PRESETS.map(p => (
                <button
                  key={p.key}
                  onClick={() => { setTheme(p.key); setShowCustom(false); }}
                  className="flex items-center gap-3 w-full px-3 py-2 rounded-xl transition-all hover:bg-surface-200 group"
                  style={{
                    background: theme === p.key ? `rgba(${p.key === 'electric-blue' ? '14,165,233' : p.key === 'emerald' ? '16,185,129' : p.key === 'violet' ? '139,92,246' : p.key === 'amber' ? '245,158,11' : '255,0,60'}, 0.12)` : undefined,
                    borderWidth: theme === p.key ? '1px' : '1px',
                    borderStyle: 'solid',
                    borderColor: theme === p.key ? p.color : 'transparent',
                  }}
                >
                  <span
                    className="h-5 w-5 rounded-full flex-shrink-0 ring-2 ring-black/30 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: p.color }}
                  />
                  <span className="text-xs font-medium text-white/80 flex-1 text-left">{p.label}</span>
                  {theme === p.key && <Check className="h-3.5 w-3.5 text-white/80" />}
                </button>
              ))}
            </div>

            {/* Custom section */}
            <div className="border-t border-white/10 pt-3">
              <button
                onClick={() => setShowCustom(!showCustom)}
                className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-xs font-medium text-white/70 hover:bg-surface-200 hover:text-white transition-all"
                style={{
                  background: theme === 'custom' ? 'rgba(var(--color-primary-rgb), 0.12)' : undefined,
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: theme === 'custom' ? 'var(--color-primary)' : 'transparent',
                }}
              >
                <span
                  className="h-5 w-5 rounded-full flex-shrink-0 ring-2 ring-black/30 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400"
                />
                <span className="flex-1 text-left">Custom Color</span>
                {theme === 'custom' ? <Check className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
              </button>

              {showCustom && (
                <div className="mt-3 space-y-3 animate-fade-in">
                  <div>
                    <label className="text-[10px] text-white/50 mb-1 block uppercase tracking-wide">Primary Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={localPrimary}
                        onChange={e => setLocalPrimary(e.target.value)}
                        className="h-8 w-8 rounded-lg cursor-pointer border-0 bg-transparent p-0.5"
                      />
                      <input
                        type="text"
                        value={localPrimary}
                        onChange={e => { if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) setLocalPrimary(e.target.value); }}
                        className="flex-1 bg-surface-200 border border-white/10 rounded-lg px-2 py-1.5 text-white text-xs font-mono focus:outline-none focus:border-primary"
                        placeholder="#0ea5e9"
                        maxLength={7}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-white/50 mb-1 block uppercase tracking-wide">Secondary (optional)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={localSecondary}
                        onChange={e => setLocalSecondary(e.target.value)}
                        className="h-8 w-8 rounded-lg cursor-pointer border-0 bg-transparent p-0.5"
                      />
                      <input
                        type="text"
                        value={localSecondary}
                        onChange={e => { if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) setLocalSecondary(e.target.value); }}
                        className="flex-1 bg-surface-200 border border-white/10 rounded-lg px-2 py-1.5 text-white text-xs font-mono focus:outline-none focus:border-primary"
                        placeholder="#0369a1"
                        maxLength={7}
                      />
                    </div>
                  </div>
                  <button
                    onClick={applyCustom}
                    className="w-full py-2 rounded-xl text-xs font-bold text-white transition-all"
                    style={{ background: 'var(--color-primary)' }}
                  >
                    Apply Custom Theme
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
