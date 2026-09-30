import React from 'react';
import { Info, Sparkles } from 'lucide-react';

interface DisclaimerBannerProps {
  type?: 'demo' | 'ai-estimate' | 'prototype';
  message?: string;
  className?: string;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({
  type = 'prototype',
  message,
  className = ''
}) => {
  const defaultMessages = {
    demo: 'Demo Dataset: Agricultural data and market prices are simulated for hackathon evaluation.',
    'ai-estimate': 'Prototype AI estimate: Recommendations are generated using demo agronomic models. Always verify with qualified agricultural experts.',
    prototype: 'Hackathon Prototype: Track 4 (AgriN & Regenerative Agricultural Intelligence). Live API connectivity can be configured for production.'
  };

  const text = message || defaultMessages[type];

  return (
    <div
      className={`flex items-center gap-2 px-3.5 py-1.5 bg-[#eef8f2] border border-[#d8f3dc] text-[#1b4332] text-xs rounded-lg ${className}`}
    >
      <Sparkles className="w-3.5 h-3.5 text-[#2d6a4f] shrink-0" />
      <span className="font-medium text-[#1b4332]">{text}</span>
    </div>
  );
};
