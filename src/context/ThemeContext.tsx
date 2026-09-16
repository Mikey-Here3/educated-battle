'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemePreset = 'electric-blue' | 'crimson' | 'emerald' | 'violet' | 'amber' | 'custom';

export interface ThemeColors {
  primary: string;      // Main accent hex
  primaryRgb: string;   // "r, g, b"
  secondary: string;    // Darker complementary shade
  secondaryRgb: string; // "r, g, b"
  accent: string;       // Vibrant highlight / tags / badges
  accentRgb: string;    // "r, g, b"
  glow: string;         // Glow rgba string
}

export const THEME_PRESETS: Record<Exclude<ThemePreset, 'custom'>, ThemeColors & { label: string; bg: string }> = {
  'electric-blue': {
    label: 'Electric Blue',
    primary: '#0ea5e9',
    primaryRgb: '14, 165, 233',
    secondary: '#0369a1',
    secondaryRgb: '3, 105, 161',
    accent: '#38bdf8',
    accentRgb: '56, 189, 248',
    glow: 'rgba(14, 165, 233, 0.45)',
    bg: 'rgba(14, 165, 233, 0.18)',
  },
  'crimson': {
    label: 'Crimson Red',
    primary: '#ff003c',
    primaryRgb: '255, 0, 60',
    secondary: '#b3002a',
    secondaryRgb: '179, 0, 42',
    accent: '#ff4d73',
    accentRgb: '255, 77, 115',
    glow: 'rgba(255, 0, 60, 0.45)',
    bg: 'rgba(255, 0, 60, 0.18)',
  },
  'emerald': {
    label: 'Emerald Green',
    primary: '#10b981',
    primaryRgb: '16, 185, 129',
    secondary: '#047857',
    secondaryRgb: '4, 120, 87',
    accent: '#34d399',
    accentRgb: '52, 211, 153',
    glow: 'rgba(16, 185, 129, 0.45)',
    bg: 'rgba(16, 185, 129, 0.18)',
  },
  'violet': {
    label: 'Violet Cyber',
    primary: '#8b5cf6',
    primaryRgb: '139, 92, 246',
    secondary: '#6d28d9',
    secondaryRgb: '109, 40, 217',
    accent: '#a78bfa',
    accentRgb: '167, 139, 250',
    glow: 'rgba(139, 92, 246, 0.45)',
    bg: 'rgba(139, 92, 246, 0.18)',
  },
  'amber': {
    label: 'Amber Gold',
    primary: '#f59e0b',
    primaryRgb: '245, 158, 11',
    secondary: '#b45309',
    secondaryRgb: '180, 83, 9',
    accent: '#fbbf24',
    accentRgb: '251, 191, 36',
    glow: 'rgba(245, 158, 11, 0.45)',
    bg: 'rgba(245, 158, 11, 0.18)',
  },
};

export interface CustomColorsState {
  primary: string;
  secondary: string;
  accent: string;
}

interface ThemeContextType {
  theme: ThemePreset;
  customColors: CustomColorsState;
  setTheme: (preset: ThemePreset) => void;
  setCustomColors: (colors: CustomColorsState) => void;
  currentColors: ThemeColors;
}

function hexToRgb(hex: string, fallback = '14, 165, 233'): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return fallback;
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

function darken(hex: string, amt = 50): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return hex;
  const r = Math.max(0, parseInt(result[1], 16) - amt);
  const g = Math.max(0, parseInt(result[2], 16) - amt);
  const b = Math.max(0, parseInt(result[3], 16) - amt);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function lighten(hex: string, amt = 40): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return hex;
  const r = Math.min(255, parseInt(result[1], 16) + amt);
  const g = Math.min(255, parseInt(result[2], 16) + amt);
  const b = Math.min(255, parseInt(result[3], 16) + amt);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function applyTheme(colors: ThemeColors) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--color-primary', colors.primary);
  root.style.setProperty('--color-primary-rgb', colors.primaryRgb);
  root.style.setProperty('--color-secondary', colors.secondary);
  root.style.setProperty('--color-secondary-rgb', colors.secondaryRgb);
  root.style.setProperty('--color-accent', colors.accent);
  root.style.setProperty('--color-accent-rgb', colors.accentRgb);
  root.style.setProperty('--color-glow', colors.glow);
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemePreset>('electric-blue');
  const [customColors, setCustomColorsState] = useState<CustomColorsState>({
    primary: '#0ea5e9',
    secondary: '#0369a1',
    accent: '#38bdf8',
  });

  // Compute current colors
  const currentColors: ThemeColors = theme === 'custom'
    ? {
        primary: customColors.primary,
        primaryRgb: hexToRgb(customColors.primary),
        secondary: customColors.secondary || darken(customColors.primary),
        secondaryRgb: hexToRgb(customColors.secondary || darken(customColors.primary)),
        accent: customColors.accent || lighten(customColors.primary),
        accentRgb: hexToRgb(customColors.accent || lighten(customColors.primary)),
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
        if (custom) {
          setCustomColorsState({
            primary: custom.primary || '#0ea5e9',
            secondary: custom.secondary || darken(custom.primary || '#0ea5e9'),
            accent: custom.accent || lighten(custom.primary || '#0ea5e9'),
          });
        }
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

  const setCustomColors = (colors: CustomColorsState) => {
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
