import React from 'react';

interface CircularTimerProps {
  secondsLeft: number;
  totalSeconds: number;
  formattedTime: string;
  isActive: boolean;
  isPaused: boolean;
  label?: string;
  size?: number;
  strokeWidth?: number;
  warningThreshold?: number; // seconds when to turn amber/red
}

export const CircularTimer: React.FC<CircularTimerProps> = ({
  secondsLeft,
  totalSeconds,
  formattedTime,
  isActive,
  isPaused,
  label = 'TIME REMAINING',
  size = 280,
  strokeWidth = 10,
  warningThreshold = 60
}) => {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;

  // Fraction remaining (1.0 = full, 0.0 = empty)
  const fraction = Math.max(0, Math.min(1, secondsLeft / totalSeconds));
  
  // Offset retracts the circle outline as time decreases
  const strokeDashoffset = circumference * (1 - fraction);

  // Dynamic status color calculation
  const isWarning = secondsLeft > 0 && secondsLeft <= warningThreshold;
  const isDanger = secondsLeft > 0 && secondsLeft <= 10;

  let strokeColor = 'var(--accent)';
  if (isDanger) {
    strokeColor = '#EF4444'; // Red
  } else if (isWarning) {
    strokeColor = '#F59E0B'; // Amber
  }

  return (
    <div className="relative flex flex-col items-center justify-center select-none my-4">
      {/* Outer ambient glow ring when active */}
      {isActive && !isPaused && (
        <div
          className="absolute rounded-full animate-ping opacity-25 pointer-events-none"
          style={{
            width: size - strokeWidth * 2,
            height: size - strokeWidth * 2,
            backgroundColor: strokeColor,
            animationDuration: '3s'
          }}
        />
      )}

      <svg
        width={size}
        height={size}
        className="transform -rotate-90 drop-shadow-xl"
        style={{ overflow: 'visible' }}
      >
        {/* Background Track Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--glass-border)"
          strokeWidth={strokeWidth}
          className="opacity-40"
        />

        {/* Retracting Outline Progress Ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 0.8s linear, stroke 0.5s ease'
          }}
        />
      </svg>

      {/* Central Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
        <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-1">
          {label}
        </span>

        <span
          className="font-mono font-extrabold text-5xl sm:text-6xl tracking-tight text-[var(--text-primary)] transition-colors"
          style={{ color: isDanger ? '#EF4444' : isWarning ? '#F59E0B' : 'var(--text-primary)' }}
        >
          {formattedTime}
        </span>

        {/* Timer status badge */}
        <span className="mt-2 text-[11px] font-mono font-medium px-3 py-0.5 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-secondary)]">
          {isActive && !isPaused
            ? '⏱️ Running'
            : isPaused
            ? '⏸️ Paused'
            : secondsLeft === totalSeconds
            ? ' Ready'
            : ' Finished'}
        </span>
      </div>
    </div>
  );
};
