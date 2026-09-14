'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { WalletSection } from '@/components/WalletSection';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';

export default function WalletPage() {
  const [userBalance] = useState<number>(1250);

  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-0">
      <Navbar userBalance={userBalance} />
      
      <main className="flex-grow pt-4">
        <WalletSection userBalance={userBalance} />
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
