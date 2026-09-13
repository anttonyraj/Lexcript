'use client';

import React from 'react';

interface LexcriptLogoProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

/**
 * Lexcript Official Logo:
 * A natural, elegant Scales of Justice with an organically embedded serif 'L' shape
 * forming the central pillar and foundation. Features a smooth, continuous gravitational
 * balancing animation where the left and right pans flow up and down in gentle equilibrium.
 */
export function LexcriptLogo({ className = '', size = 36, animated = true }: LexcriptLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Lexcript Logo — Scales of Justice with Embedded L"
    >
      <defs>
        {/* L Pillar & Pedestal Gradient: Amber gold descending into royal indigo */}
        <linearGradient id="lPillarGrad" x1="18" y1="4" x2="30" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="35%" stopColor="#f59e0b" />
          <stop offset="85%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>

        {/* Natural Left Dish (Amber / Client Intake) */}
        <radialGradient id="leftDishGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="70%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </radialGradient>

        {/* Natural Right Dish (Indigo / Vault Ledger) */}
        <radialGradient id="rightDishGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#a5b4fc" />
          <stop offset="70%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#4338ca" />
        </radialGradient>

        {/* Soft shadow under dishes */}
        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#f59e0b" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* ========================================================================= */}
      {/* 1. STATIONARY EMBEDDED "L" PILLAR & PEDESTAL                              */}
      {/* ========================================================================= */}
      <g id="embedded-L-pillar">
        {/* Finial / Crown at the top pivot point */}
        <circle cx="20" cy="8" r="2.2" fill="#fef08a" />
        <polygon points="20,4.5 21.8,7.5 20,8.5 18.2,7.5" fill="#f59e0b" />

        {/* The 'L' Spine: Vertical column curving smoothly into serif foot */}
        <path
          d="M18.8 8.5H21.2L21 28.5C21 29.5 21.6 30 22.8 30H30C30.8 30 31.5 30.6 31.5 31.4C31.5 32.2 30.8 32.8 30 32.8H20.5C18.5 32.8 17.5 31.4 17.5 29.5L18.8 8.5Z"
          fill="url(#lPillarGrad)"
        />

        {/* Classical Pedestal / Plinth Base */}
        <path
          d="M14 33H33C33.5 33 34 33.5 34 34C34 34.5 33.5 35 33 35H14C13.5 35 13 34.5 13 34C13 33.5 13.5 33 14 33Z"
          fill="#f59e0b"
          opacity="0.9"
        />
        <rect x="29" y="28.5" width="2" height="3" rx="0.8" fill="#818cf8" opacity="0.85" />
      </g>

      {/* ========================================================================= */}
      {/* 2. ANIMATED TILTING CROSSBEAM & FLOWING SCALE PANS                         */}
      {/* ========================================================================= */}
      <g className={animated ? 'scale-beam-motion' : ''}>
        {/* Natural Curved Balance Crossbeam with tapered finial loops */}
        <path
          d="M7 11.5C11.5 10 16 9.2 20 9.2C24 9.2 28.5 10 33 11.5"
          stroke="url(#lPillarGrad)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Central Pivot Ring */}
        <circle cx="20" cy="9.2" r="1.5" fill="#080d1a" stroke="#f59e0b" strokeWidth="1.2" />

        {/* LEFT SUSPENSION HOOK & DISH */}
        <g id="left-pan-assembly" className={animated ? 'scale-pan-left-motion' : ''}>
          {/* Suspension Eyelet Loop */}
          <circle cx="7" cy="11.5" r="1.1" fill="none" stroke="#f59e0b" strokeWidth="1" />
          {/* Natural Cords / Chains */}
          <line x1="7" y1="12.5" x2="3.2" y2="22" stroke="#f59e0b" strokeWidth="0.8" strokeOpacity="0.85" />
          <line x1="7" y1="12.5" x2="11.8" y2="22" stroke="#f59e0b" strokeWidth="0.8" strokeOpacity="0.85" />

          {/* Natural Shallow Curved Scale Dish (Left) */}
          <path
            d="M2.5 22C2.5 25.5 6.5 26.8 7.5 26.8C8.5 26.8 12.5 25.5 12.5 22C12.5 21.6 12 21.6 11.5 21.7C9 22.4 6 22.4 3.5 21.7C3 21.6 2.5 21.6 2.5 22Z"
            fill="url(#leftDishGrad)"
            filter="url(#softGlow)"
          />
          <path
            d="M3.8 22.2C5.5 23.2 9.5 23.2 11.2 22.2"
            stroke="#fef08a"
            strokeWidth="0.6"
            strokeLinecap="round"
            opacity="0.8"
          />
        </g>

        {/* RIGHT SUSPENSION HOOK & DISH */}
        <g id="right-pan-assembly" className={animated ? 'scale-pan-right-motion' : ''}>
          {/* Suspension Eyelet Loop */}
          <circle cx="33" cy="11.5" r="1.1" fill="none" stroke="#818cf8" strokeWidth="1" />
          {/* Natural Cords / Chains */}
          <line x1="33" y1="12.5" x2="28.2" y2="22" stroke="#818cf8" strokeWidth="0.8" strokeOpacity="0.85" />
          <line x1="33" y1="12.5" x2="37.8" y2="22" stroke="#818cf8" strokeWidth="0.8" strokeOpacity="0.85" />

          {/* Natural Shallow Curved Scale Dish (Right) */}
          <path
            d="M27.5 22C27.5 25.5 31.5 26.8 32.5 26.8C33.5 26.8 37.5 25.5 37.5 22C37.5 21.6 37 21.6 36.5 21.7C34 22.4 31 22.4 28.5 21.7C28 21.6 27.5 21.6 27.5 22Z"
            fill="url(#rightDishGrad)"
          />
          <path
            d="M28.8 22.2C30.5 23.2 34.5 23.2 36.2 22.2"
            stroke="#c7d2fe"
            strokeWidth="0.6"
            strokeLinecap="round"
            opacity="0.8"
          />
        </g>
      </g>

      {/* Embedded CSS animation for pure SVG portability */}
      <style>{`
        .scale-beam-motion {
          transform-origin: 20px 9.2px;
          animation: balanceTilt 4.8s ease-in-out infinite alternate;
        }
        .scale-pan-left-motion {
          transform-origin: 7px 11.5px;
          animation: counterBalanceLeft 4.8s ease-in-out infinite alternate;
        }
        .scale-pan-right-motion {
          transform-origin: 33px 11.5px;
          animation: counterBalanceRight 4.8s ease-in-out infinite alternate;
        }
        @keyframes balanceTilt {
          0% { transform: rotate(-4deg); }
          50% { transform: rotate(0deg); }
          100% { transform: rotate(4deg); }
        }
        @keyframes counterBalanceLeft {
          0% { transform: rotate(4deg) translateY(-1px); }
          50% { transform: rotate(0deg) translateY(0px); }
          100% { transform: rotate(-4deg) translateY(1px); }
        }
        @keyframes counterBalanceRight {
          0% { transform: rotate(4deg) translateY(1px); }
          50% { transform: rotate(0deg) translateY(0px); }
          100% { transform: rotate(-4deg) translateY(-1px); }
        }
      `}</style>
    </svg>
  );
}
