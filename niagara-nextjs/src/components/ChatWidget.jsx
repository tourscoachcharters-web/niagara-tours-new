"use client";
import React, { useState, useEffect } from 'react';

export default function ChatWidget() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'CHAT_WIDGET_STATE') {
        setIsChatOpen(event.data.isOpen);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <iframe 
      src="https://multi-agent-chat-rho.vercel.app/?mode=embed&site=Niagara+Travels" 
      title="Live Support"
      allowTransparency={true}
      style={{
        position: 'fixed', 
        bottom: '0', 
        right: '0', 
        width: isChatOpen ? '400px' : '100px', 
        height: isChatOpen ? '600px' : '100px', 
        border: 'none', 
        zIndex: 999999, 
        background: 'transparent', 
        pointerEvents: 'auto',
        transition: 'all 0.3s ease-in-out'
      }}
    />
  );
}