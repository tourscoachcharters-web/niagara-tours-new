"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera } from 'lucide-react';

export default function ImageWithFallback({ src, alt, className, size, isLogo, fill, width, height, priority }) {
  const [error, setError] = useState(false);
  
  // If the image breaks or doesn't exist, show this UI placeholder
  if (error || !src) {
    return (
      <div className={`${className} bg-slate-100 flex flex-col items-center justify-center text-slate-400 p-2 text-center border border-dashed border-slate-200 rounded-lg relative`}>
        <div className="bg-white p-2 rounded-full mb-1">
          <Camera className="w-4 h-4 text-slate-300" />
        </div>
        <p className="text-[8px] font-black uppercase tracking-tight text-[#0C3136]">{isLogo ? 'Logo' : 'Image'}</p>
        <p className="text-[7px] font-bold text-slate-400">Filename: {src ? src.split('/').pop() : 'Unknown'}</p>
        <p className="text-[8px] font-black text-[#F8A41E]">{size}</p>
      </div>
    );
  }

  // If using Next.js background fill
  if (fill) {
    return <Image src={src} alt={alt} className={className} fill priority={priority} onError={() => setError(true)} />;
  }

  // If using specific Next.js dimensions
  if (width && height) {
    return <Image src={src} alt={alt} className={className} width={width} height={height} priority={priority} onError={() => setError(true)} />;
  }

  // Standard fallback
  return <img src={src} alt={alt} className={className} onError={() => setError(true)} />;
}