'use client';

import React, { useId } from 'react';

/**
 * Deposition Acoustic Waveform:
 * An authentic legal speech waveform visualizer that spans across the hero background.
 * Features speaker separation channels (Counsel in Amber -> Deponent in Indigo),
 * millisecond timeline rulers, and an oscillating playhead sweep.
 */
export function DepositionWaveform() {
  const maskId = useId();
  // Array of 56 simulated audio bar heights (percentage 15% - 95%) reflecting human speech cadence
  const barHeights = [
    25, 40, 18, 55, 75, 45, 90, 60, 30, 85, 95, 70, 40, 20, 60, 80, 50, 92, 65, 35,
    25, 50, 78, 90, 60, 30, 45, 80, 95, 70, 40, 65, 85, 50, 90, 60, 30, 75, 95, 65,
    35, 55, 80, 45, 90, 70, 35, 60, 85, 40, 75, 55, 30, 65, 45, 20
  ];

  return (
    <div
      aria-hidden="true"
      className="w-full max-w-5xl mx-auto my-8 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800/80 bg-white/40 dark:bg-slate-950/40 backdrop-blur-md relative overflow-hidden shadow-sm dark:shadow-2xl select-none"
    >
      {/* Top Legal Metadata Bar */}
      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-3 border-b border-slate-200/60 dark:border-slate-800/60 pb-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-ping" />
          <span className="font-semibold text-amber-800 dark:text-amber-400">CH 1: EXAMINING COUNSEL</span>
          <span className="text-slate-400 dark:text-slate-600">|</span>
          <span>16.0 kHz Mono</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-slate-400 dark:text-slate-500">
          <span>LINE: 14</span>
          <span>CONFIDENCE: 99.4%</span>
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold">CH 2: DEPONENT</span>
        </div>
      </div>

      {/* Acoustic Waveform Visualizer Canvas */}
      <div className="relative h-24 sm:h-28 flex items-center justify-between gap-[3px] sm:gap-[5px] px-2 py-2 overflow-hidden">
        {/* Fine Horizontal Center Zero-Crossing Line */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-slate-300/60 dark:bg-slate-800/80 z-0" />

        {/* Animated Sweeping Playhead Laser */}
        <div className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-amber-400 via-white to-indigo-400 shadow-[0_0_12px_rgba(245,158,11,0.8)] z-20 animate-playhead-sweep pointer-events-none" />

        {/* Waveform Equalizer Bars */}
        {barHeights.map((h, i) => {
          // Color transition: Left side (0-28) is amber, right side (29-55) is indigo
          const isCounsel = i < 28;
          const animDelay = (i % 8) * 0.15;
          const animDuration = 1.2 + (i % 5) * 0.2;

          return (
            <div
              key={i}
              className="flex-1 flex flex-col items-center justify-center h-full z-10"
            >
              <div
                style={{
                  height: `${h}%`,
                  animation: `wavePulse ${animDuration}s ease-in-out ${animDelay}s infinite alternate`,
                }}
                className={`w-full rounded-full transition-all duration-300 ${
                  isCounsel
                    ? 'bg-gradient-to-t from-amber-500/80 via-amber-400 to-amber-300 dark:from-amber-600/70 dark:via-amber-400 dark:to-amber-300 shadow-[0_0_6px_rgba(245,158,11,0.25)]'
                    : 'bg-gradient-to-t from-indigo-500/80 via-indigo-400 to-sky-300 dark:from-indigo-600/70 dark:via-indigo-400 dark:to-sky-300 shadow-[0_0_6px_rgba(99,102,241,0.25)]'
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Millisecond Timeline Ruler */}
      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-2 pt-1.5 border-t border-slate-200/60 dark:border-slate-800/60">
        <span>00:00.00</span>
        <span className="hidden sm:inline">00:05.00</span>
        <span>00:10.00</span>
        <span className="hidden sm:inline">00:15.00</span>
        <span>00:20.00</span>
        <span className="hidden sm:inline">00:25.00</span>
        <span className="text-indigo-600 dark:text-indigo-400 font-bold">00:30.00 [SYNC]</span>
      </div>

      <style jsx>{`
        @keyframes wavePulse {
          0% {
            transform: scaleY(0.5);
            opacity: 0.65;
          }
          100% {
            transform: scaleY(1.1);
            opacity: 1;
          }
        }
        @keyframes sweep {
          0% {
            left: 0%;
          }
          50% {
            left: 98%;
          }
          100% {
            left: 0%;
          }
        }
        .animate-playhead-sweep {
          animation: sweep 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
