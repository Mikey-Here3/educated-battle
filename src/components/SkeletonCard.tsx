'use client';

import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="rounded-3xl border border-purple-900/30 bg-surface-200/50 p-5 space-y-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-6 w-24 rounded-lg bg-surface-300" />
        <div className="h-6 w-20 rounded-lg bg-surface-300" />
      </div>
      <div className="h-7 w-3/4 rounded-xl bg-surface-300" />
      <div className="grid grid-cols-3 gap-2 py-3 border-y border-purple-900/20">
        <div className="h-10 rounded-xl bg-surface-300" />
        <div className="h-10 rounded-xl bg-surface-300" />
        <div className="h-10 rounded-xl bg-surface-300" />
      </div>
      <div className="h-3 w-full rounded-full bg-surface-300" />
      <div className="h-10 w-full rounded-xl bg-surface-300" />
    </div>
  );
};
