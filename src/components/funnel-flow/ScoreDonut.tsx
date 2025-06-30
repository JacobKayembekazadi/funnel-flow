'use client';

import React from 'react';

interface ScoreDonutProps {
  score: number;
}

const ScoreDonut: React.FC<ScoreDonutProps> = ({ score }) => {
  const percentage = score * 10;
  const circumference = 2 * Math.PI * 18; // 2 * pi * radius
  const offset = circumference - (percentage / 100) * circumference;

  let colorClass = 'text-green-400';
  if (score < 7) colorClass = 'text-yellow-400';
  if (score < 4) colorClass = 'text-red-400';

  return (
    <div className={`relative w-12 h-12 flex-shrink-0 flex items-center justify-center font-bold text-lg ${colorClass}`}>
      <svg className="absolute w-full h-full" viewBox="0 0 40 40">
        <circle className="text-slate-700" strokeWidth="4" stroke="currentColor" fill="transparent" r="18" cx="20" cy="20" />
        <circle
          className={colorClass}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="18"
          cx="20"
          cy="20"
          transform="rotate(-90 20 20)"
        />
      </svg>
      {score}
    </div>
  );
};

export default ScoreDonut;
