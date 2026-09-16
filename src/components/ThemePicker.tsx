'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Palette, X, Check, ChevronRight, Sparkles } from 'lucide-react';
import { useTheme, THEME_PRESETS, ThemePreset } from '@/context/ThemeContext';

const PRESETS: { key: ThemePreset; label: string; primary: string; secondary: string; accent: string }[] = [
  { key: 'electric-blue', label: 'Electric Blue', primary: '#0ea5e9', secondary: '#0369a1', accent: '#38bdf8' },
  { key: 'emerald',       label: 'Emerald Green', primary: '#10b981', secondary: '#047857', accent: '#34d399' },
  { key: 'violet',        label: 'Violet Cyber',  primary: '#8b5cf6', secondary: '#6d28d9', accent: '#a78bfa' },
  { key: 'amber',         label: 'Amber Gold',    primary: '#f59e0b', secondary: '#b45309', accent: '#fbbf24' },
  { key: 'crimson',       label: 'Crimson Red',   primary: '#ff003c', secondary: '#b3002a', accent: '#ff4d73' },
];

export const ThemePicker: React.FC = () => {
  const { theme, setTheme, customColors, setCustomColors } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showCustom, setShowCustom] = useState(theme === 'custom');
  
  const [localPrimary, setLocalPrimary] = useState(customColors.primary || '#0ea5e9');
  const [localSecondary, setLocalSecondary] = useState(customColors.secondary || '#0369a1');
  const [localAccent, setLocalAccent] = useState(customColors.accent || '#38bdf8');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleApplyCustom = () => {
    setCustomColors({
      primary: localPrimary,
      secondary: localSecondary,
      accent: localAccent,
    });
    setOpen(false);
  };

  const modalContent = open ? (
    <div className="fixed inset-0 z-[99999] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Solid Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity" 
        onClick={() => setOpen(false)} 
      />

      {/* Bottom Sheet on Mobile, Centered Modal on Desktop */}
      <div 
        className="relative z-[100000] w-full max-w-md rounded-t-[32px] sm:rounded-3xl border border-white/20 bg-[#0a0f1d] p-5 sm:p-6 shadow-[0_-15px_50px_rgba(0,0,0,0.9)] max-h-[88vh] overflow-y-auto animate-in slide-in-from-bottom-5 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Handle */}
        <div className="sm:hidden w-12 h-1.5 rounded-full bg-white/25 mx-auto mb-4" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'rgba(var(--color-primary-rgb), 0.2)', border: '1px solid var(--color-primary)' }}
            >
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="text-white text-sm font-black uppercase tracking-wider font-display">Theme Studio</h3>
              <p className="text-[10px] text-white/50">Full website color customization</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={() => setOpen(false)} 
            className="w-8 h-8 rounded-lg bg-surface-200 flex items-center justify-center text-white/60 hover:text-white transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Presets List */}
        <div className="space-y-2 mb-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Preset Themes (One-Click)
          </span>
          {PRESETS.map((p) => {
            const isSelected = theme === p.key;
            return (
              <button
                key={p.key}
                type="button"
                onClick={() => {
                  setTheme(p.key);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all ${
                  isSelected 
                    ? 'border-white/40 bg-surface-200/90 shadow-md ring-1 ring-white/30' 
                    : 'border-white/10 bg-surface-100/50 hover:bg-surface-200/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Swatches circle */}
                  <div className="flex -space-x-1.5 items-center">
                    <span className="h-5 w-5 rounded-full border border-black/50 shadow-sm" style={{ backgroundColor: p.primary }} />
                    <span className="h-4 w-4 rounded-full border border-black/50 shadow-sm" style={{ backgroundColor: p.secondary }} />
                    <span className="h-3 w-3 rounded-full border border-black/50 shadow-sm" style={{ backgroundColor: p.accent }} />
                  </div>
                  <span className={`text-xs font-bold ${isSelected ? 'text-white font-black' : 'text-slate-300'}`}>
                    {p.label}
                  </span>
                </div>
                {isSelected && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-black">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Custom Color Mode Accordion */}
        <div className="border-t border-white/10 pt-3">
          <button
            type="button"
            onClick={() => setShowCustom(!showCustom)}
            className="w-full flex items-center justify-between py-2 text-xs font-bold text-slate-300 hover:text-white"
          >
            <span className="flex items-center gap-1.5">
              <Palette className="h-3.5 w-3.5 text-primary" />
              <span>Custom Hex Colors (Advanced)</span>
            </span>
            <ChevronRight className={`h-4 w-4 transition-transform ${showCustom ? 'rotate-90' : ''}`} />
          </button>

          {showCustom && (
            <div className="mt-3 space-y-3 p-3.5 rounded-2xl bg-surface-200/60 border border-white/10">
              {/* Primary Color Picker */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] font-bold text-white/70 uppercase">Primary Color (Buttons & Glows)</label>
                  <span className="text-[10px] font-mono text-white/40">{localPrimary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={localPrimary}
                    onChange={(e) => setLocalPrimary(e.target.value)}
                    className="h-8 w-8 rounded-lg cursor-pointer border-0 bg-transparent p-0.5"
                  />
                  <input
                    type="text"
                    value={localPrimary}
                    onChange={(e) => setLocalPrimary(e.target.value)}
                    maxLength={7}
                    className="flex-1 bg-surface-100 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Secondary Color Picker */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] font-bold text-white/70 uppercase">Secondary (Gradients)</label>
                  <span className="text-[10px] font-mono text-white/40">{localSecondary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={localSecondary}
                    onChange={(e) => setLocalSecondary(e.target.value)}
                    className="h-8 w-8 rounded-lg cursor-pointer border-0 bg-transparent p-0.5"
                  />
                  <input
                    type="text"
                    value={localSecondary}
                    onChange={(e) => setLocalSecondary(e.target.value)}
                    maxLength={7}
                    className="flex-1 bg-surface-100 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Accent Color Picker */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] font-bold text-white/70 uppercase">Accent Color (Badges & Highlights)</label>
                  <span className="text-[10px] font-mono text-white/40">{localAccent}</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={localAccent}
                    onChange={(e) => setLocalAccent(e.target.value)}
                    className="h-8 w-8 rounded-lg cursor-pointer border-0 bg-transparent p-0.5"
                  />
                  <input
                    type="text"
                    value={localAccent}
                    onChange={(e) => setLocalAccent(e.target.value)}
                    maxLength={7}
                    className="flex-1 bg-surface-100 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleApplyCustom}
                className="w-full mt-2 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white shadow-lg transition"
                style={{ backgroundColor: localPrimary }}
              >
                Apply Custom Color Theme
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;

  return (
    <div className="relative inline-block">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(!open);
        }}
        aria-label="Change Theme Colors"
        title="Customize Theme Colors"
        className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-white/15 bg-[#0e1424] text-slate-200 transition-all hover:border-primary hover:text-white"
        style={{ borderColor: open ? 'var(--color-primary)' : undefined }}
      >
        <Palette className="h-4 w-4 text-primary" />
        {/* Active glowing color indicator */}
        <span
          className="absolute bottom-1.5 right-1.5 h-2 w-2 rounded-full ring-1 ring-black"
          style={{ backgroundColor: 'var(--color-primary)', boxShadow: '0 0 6px var(--color-primary)' }}
        />
      </button>

      {/* Render via Portal to body to prevent clipping or navbar stacking context issues */}
      {mounted && modalContent ? createPortal(modalContent, document.body) : null}
    </div>
  );
};
