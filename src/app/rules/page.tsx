'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { RulesAndFAQ } from '@/components/RulesAndFAQ';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';

export default function RulesPage() {
  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-0">
      <Navbar userBalance={1250} />
      
      <main className="flex-grow pt-4">
        <RulesAndFAQ />
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
