import React from 'react';

interface LexcriptLogoProps {
  className?: string;
  size?: number;
}

/**
 * Lexcript Official Logo:
 * The letter 'L' forms the central pillar and foundation of the Scales of Justice,
 * balancing spoken testimony (amber) with verified work-product / billing (indigo).
 */
export function LexcriptLogo({ className = '', size = 32 }: LexcriptLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Lexcript Logo"
    >
      <defs>
        {/* Gradient for the central 'L' pillar */}
        <linearGradient id="logoLGradient" x1="10" y1="4" x2="28" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>

        {/* Left pan amber glow */}
        <linearGradient id="leftPanGrad" x1="3" y1="12" x2="11" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>

        {/* Right pan indigo glow */}
        <linearGradient id="rightPanGrad" x1="25" y1="12" x2="33" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
      </defs>

      {/* Balance Crossbeam at Top */}
      <path
        d="M6 10H30"
        stroke="url(#logoLGradient)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Central 'L' Pillar: Starts at center top fulcrum (18, 7), goes down to base (18, 28), and sweeps right to (27, 28) */}
      <path
        d="M18 6V28H28"
        stroke="url(#logoLGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Finial / Diamond at Top of 'L' */}
      <polygon
        points="18,4 20,7 18,9 16,7"
        fill="#fbbf24"
      />

      {/* Scale Pan Strings - Left */}
      <line x1="6" y1="10" x2="3" y2="20" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.8" />
      <line x1="6" y1="10" x2="11" y2="20" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.8" />

      {/* Scale Pan - Left (Amber / Sound intake) */}
      <path
        d="M3 20C3 22.5 6.5 24 7 24C7.5 24 11 22.5 11 20H3Z"
        fill="url(#leftPanGrad)"
      />

      {/* Scale Pan Strings - Right */}
      <line x1="30" y1="10" x2="25" y2="20" stroke="#818cf8" strokeWidth="1" strokeOpacity="0.8" />
      <line x1="30" y1="10" x2="33" y2="20" stroke="#818cf8" strokeWidth="1" strokeOpacity="0.8" />

      {/* Scale Pan - Right (Indigo / Billing Ledger) */}
      <path
        d="M25 20C25 22.5 28.5 24 29 24C29.5 24 33 22.5 33 20H25Z"
        fill="url(#rightPanGrad)"
      />

      {/* Soundwave bars beneath left pan */}
      <line x1="5" y1="26" x2="5" y2="28" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      <line x1="7" y1="26" x2="7" y2="30" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" opacity="0.9" />
      <line x1="9" y1="26" x2="9" y2="27" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" opacity="0.7" />

      {/* Soundwave bars beneath right pan */}
      <line x1="27" y1="26" x2="27" y2="28" stroke="#818cf8" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      <line x1="29" y1="26" x2="29" y2="30" stroke="#818cf8" strokeWidth="1" strokeLinecap="round" opacity="0.9" />
      <line x1="31" y1="26" x2="31" y2="27" stroke="#818cf8" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}
