"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { MapPin } from 'lucide-react';

const ContactLocationMap = dynamic(
  () => import('@/components/DynamicMap').then((mod) => mod.ContactLocationMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[360px] bg-slate-100 rounded-2xl animate-pulse flex flex-col items-center justify-center gap-2 text-slate-400 font-bold text-xs">
        <MapPin className="w-6 h-6 text-[#0C3136] animate-bounce" />
        <span>Loading Interactive Location Map...</span>
      </div>
    ),
  }
);

export default function ContactMapWrapper({ defaultView = 'office' }) {
  return (
    <div className="w-full h-full min-h-[360px]">
      <ContactLocationMap defaultView={defaultView} />
    </div>
  );
}
