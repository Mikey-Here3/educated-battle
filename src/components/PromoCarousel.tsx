'use client';

import React, { useState, useEffect } from 'react';
import { PROMO_BANNERS, PromoBanner } from '../data/mockData';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';

interface PromoCarouselProps {
  onOpenWallet: () => void;
  onJoinCommunity: () => void;
  onExploreTournaments: () => void;
}

export const PromoCarousel: React.FC<PromoCarouselProps> = ({
  onOpenWallet,
  onJoinCommunity,
  onExploreTournaments,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PROMO_BANNERS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PROMO_BANNERS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + PROMO_BANNERS.length) % PROMO_BANNERS.length);
  };

  const currentBanner: PromoBanner = PROMO_BANNERS[currentIndex];

  const handleAction = (action: string) => {
    if (action === 'deposit') onOpenWallet();
    else if (action === 'community') onJoinCommunity();
    else onExploreTournaments();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-8">
      <div className="relative overflow-hidden rounded-3xl border border-neon-purple/40 bg-surface-200 shadow-[0_0_40px_rgba(168,85,247,0.2)]">
        
        {/* Animated Banner Container */}
        <div className={`relative min-h-[260px] sm:min-h-[300px] bg-gradient-to-r ${currentBanner.gradient} p-6 sm:p-10 flex flex-col justify-between transition-all duration-700`}>
          
          {/* Top Badge */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center space-x-2 rounded-xl bg-neon-purple/30 px-3.5 py-1.5 text-xs font-black uppercase text-neon-cyan border border-neon-purple/50 backdrop-blur-md">
              <Sparkles className="h-4 w-4 animate-spin text-neon-cyan" />
              <span>{currentBanner.badge}</span>
            </div>

            {/* Slide Indicators */}
            <div className="flex items-center space-x-2">
              {PROMO_BANNERS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? 'w-8 bg-neon-cyan shadow-[0_0_10px_#00f0ff]' : 'w-2.5 bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Banner Main Body */}
          <div className="my-4 max-w-2xl">
            <h2 className="text-2xl sm:text-4xl font-black text-white font-display uppercase tracking-tight drop-shadow-md">
              {currentBanner.title}
            </h2>
            <p className="mt-2 text-sm sm:text-lg text-slate-200 font-medium leading-relaxed">
              {currentBanner.subtitle}
            </p>
          </div>

          {/* Action Button & Carousel Arrow Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => handleAction(currentBanner.ctaAction)}
              className="inline-flex items-center space-x-2 rounded-xl bg-white text-slate-950 font-black px-6 py-3 text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all hover:bg-neon-cyan hover:scale-105 active:scale-95"
            >
              <span>{currentBanner.ctaText}</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrev}
                className="rounded-xl border border-white/20 bg-black/40 p-2 text-white hover:bg-black/70 hover:border-white/50 transition-all"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNext}
                className="rounded-xl border border-white/20 bg-black/40 p-2 text-white hover:bg-black/70 hover:border-white/50 transition-all"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
