'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemePreset = 'electric-blue' | 'crimson' | 'emerald' | 'violet' | 'amber' | 'custom';

export interface ThemeColors {
  primary: string;      // Main accent hex
  primaryRgb: string;   // "r, g, b" for rgba()
  secondary: string;    // Darker shade
  glow: string;         // Glow rgba string
}

export const THEME_PRESETS: Record<Exclude<ThemePreset, 'custom'>, ThemeColors & { label: string; bg: string }> = {
  'electric-blue': {
    label: 'Electric Blue',
    primary: '#0ea5e9',
    primaryRgb: '14, 165, 233',
    secondary: '#0369a1',
    glow: 'rgba(14, 165, 233, 0.45)',
    bg: 'rgba(14, 165, 233, 0.18)',
  },
  'crimson': {
    label: 'Crimson Red',
    primary: '#ff003c',
    primaryRgb: '255, 0, 60',
    secondary: '#b3002a',
    glow: 'rgba(255, 0, 60, 0.45)',
    bg: 'rgba(255, 0, 60, 0.18)',
  },
  'emerald': {
    label: 'Emerald',
    primary: '#10b981',
    primaryRgb: '16, 185, 129',
    secondary: '#059669',
    glow: 'rgba(16, 185, 129, 0.45)',
    bg: 'rgba(16, 185, 129, 0.18)',
  },
  'violet': {
    label: 'Violet',
    primary: '#8b5cf6',
    primaryRgb: '139, 92, 246',
    secondary: '#6d28d9',
    glow: 'rgba(139, 92, 246, 0.45)',
    bg: 'rgba(139, 92, 246, 0.18)',
  },
  'amber': {
    label: 'Amber Gold',
    primary: '#f59e0b',
    primaryRgb: '245, 158, 11',
    secondary: '#b45309',
    glow: 'rgba(245, 158, 11, 0.45)',
    bg: 'rgba(245, 158, 11, 0.18)',
  },
};

interface ThemeContextType {
  theme: ThemePreset;
  customColors: { primary: string; secondary: string };
  setTheme: (preset: ThemePreset) => void;
  setCustomColors: (colors: { primary: string; secondary: string }) => void;
  currentColors: ThemeColors;
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '14, 165, 233';
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

function darken(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return hex;
  const r = Math.max(0, parseInt(result[1], 16) - 60);
  const g = Math.max(0, parseInt(result[2], 16) - 60);
  const b = Math.max(0, parseInt(result[3], 16) - 60);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function applyTheme(colors: ThemeColors) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--color-primary', colors.primary);
  root.style.setProperty('--color-primary-rgb', colors.primaryRgb);
  root.style.setProperty('--color-secondary', colors.secondary);
  root.style.setProperty('--color-glow', colors.glow);
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemePreset>('electric-blue');
  const [customColors, setCustomColorsState] = useState({ primary: '#0ea5e9', secondary: '#0369a1' });

  // Compute current colors
  const currentColors: ThemeColors = theme === 'custom'
    ? {
        primary: customColors.primary,
        primaryRgb: hexToRgb(customColors.primary),
        secondary: customColors.secondary || darken(customColors.primary),
        glow: `rgba(${hexToRgb(customColors.primary)}, 0.45)`,
      }
    : THEME_PRESETS[theme as Exclude<ThemePreset, 'custom'>];

  // Load saved theme on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('eg_theme');
      if (saved) {
        const { preset, custom } = JSON.parse(saved);
        if (preset) setThemeState(preset);
        if (custom) setCustomColorsState(custom);
      }
    } catch {}
  }, []);

  // Apply CSS vars whenever theme changes
  useEffect(() => {
    applyTheme(currentColors);
  }, [theme, customColors]); // eslint-disable-line

  const setTheme = (preset: ThemePreset) => {
    setThemeState(preset);
    try {
      const saved = JSON.parse(localStorage.getItem('eg_theme') || '{}');
      localStorage.setItem('eg_theme', JSON.stringify({ ...saved, preset }));
    } catch {}
  };

  const setCustomColors = (colors: { primary: string; secondary: string }) => {
    setCustomColorsState(colors);
    setThemeState('custom');
    try {
      localStorage.setItem('eg_theme', JSON.stringify({ preset: 'custom', custom: colors }));
    } catch {}
  };

  return (
    <ThemeContext.Provider value={{ theme, customColors, setTheme, setCustomColors, currentColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
