'use client';

import React, { useState } from 'react';
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
  const [showCustom, setShowCustom] = useState(theme === 'custom');
  
  const [localPrimary, setLocalPrimary] = useState(customColors.primary || '#0ea5e9');
  const [localSecondary, setLocalSecondary] = useState(customColors.secondary || '#0369a1');
  const [localAccent, setLocalAccent] = useState(customColors.accent || '#38bdf8');

  const handleApplyCustom = () => {
    setCustomColors({
      primary: localPrimary,
      secondary: localSecondary,
      accent: localAccent,
    });
    setOpen(false);
  };

  return (
    <div className="relative inline-block">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
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

      {/* Modal / Popover */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Solid Backdrop */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
            onClick={() => setOpen(false)} 
          />

          {/* Opaque Content Box (No See-Through Mess) */}
          <div 
            className="relative z-[101] w-full max-w-sm rounded-3xl border border-white/15 bg-[#0b1020] p-5 shadow-[0_0_50px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
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
                      setShowCustom(false);
                      setLocalPrimary(p.primary);
                      setLocalSecondary(p.secondary);
                      setLocalAccent(p.accent);
                    }}
                    className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl border transition-all ${
                      isSelected 
                        ? 'border-primary bg-surface-200 shadow-md' 
                        : 'border-white/10 bg-surface-100/60 hover:bg-surface-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* 3 Color Tri-dots (Primary, Secondary, Accent) */}
                      <div className="flex items-center -space-x-1.5">
                        <span className="h-4 w-4 rounded-full ring-2 ring-black shrink-0" style={{ backgroundColor: p.primary }} />
                        <span className="h-3.5 w-3.5 rounded-full ring-2 ring-black shrink-0" style={{ backgroundColor: p.secondary }} />
                        <span className="h-3 w-3 rounded-full ring-2 ring-black shrink-0" style={{ backgroundColor: p.accent }} />
                      </div>
                      <span className="text-xs font-bold text-white">{p.label}</span>
                    </div>
                    {isSelected && <Check className="h-4 w-4 text-primary" />}
                  </button>
                );
              })}
            </div>

            {/* Custom Color Mode Accordion */}
            <div className="border-t border-white/10 pt-3">
              <button
                type="button"
                onClick={() => setShowCustom(!showCustom)}
                className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-surface-100/60 hover:bg-surface-200 text-xs font-bold text-white transition"
              >
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4 text-primary" />
                  <span>Custom Color Tuning (Primary, Secondary, Accent)</span>
                </div>
                <ChevronRight className={`h-4 w-4 transition-transform ${showCustom ? 'rotate-90 text-primary' : 'text-white/40'}`} />
              </button>

              {showCustom && (
                <div className="mt-3.5 space-y-3 p-3.5 rounded-2xl bg-surface-200/80 border border-white/10 animate-fade-in">
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
                      <label className="text-[10px] font-bold text-white/70 uppercase">Secondary Color (Borders & Gradients)</label>
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
      )}
    </div>
  );
};
