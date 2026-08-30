import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Mic, ArrowLeft, Sliders, X, Check, Clock } from 'lucide-react';
import type { Topic } from '../../types';
import { CATEGORIES } from '../../data/categories';
import { CircularTimer } from '../common/CircularTimer';

interface ResearchViewProps {
  topic: Topic;
  secondsLeft: number;
  formattedTime: string;
  isActive: boolean;
  isPaused: boolean;
  onStartTimer: (durationSeconds?: number) => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
  onReadyToSpeak: () => void;
  onBackHome: () => void;
}

const PRESET_DURATIONS = [
  { minutes: 3, label: '3 Mins', sub: 'Quick Sprint' },
  { minutes: 5, label: '5 Mins', sub: 'Speed Analysis' },
  { minutes: 10, label: '10 Mins', sub: 'Standard Deep Dive' },
  { minutes: 15, label: '15 Mins', sub: 'Detailed Precedents' },
  { minutes: 20, label: '20 Mins', sub: 'Comprehensive' }
];

export const ResearchView: React.FC<ResearchViewProps> = ({
  topic,
  secondsLeft,
  formattedTime,
  isActive,
  isPaused,
  onStartTimer,
  onPause,
  onResume,
  onReset,
  onReadyToSpeak,
  onBackHome
}) => {
  const [selectedMinutes, setSelectedMinutes] = useState<number>(10);
  const [isTimeModalOpen, setIsTimeModalOpen] = useState<boolean>(false);
  const [customInput, setCustomInput] = useState<string>('10');

  const categoryInfo = CATEGORIES[topic.category] || CATEGORIES.mixed;
  const isIdle = !isActive && !isPaused;

  useEffect(() => {
    // Request notification permission silently if supported
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().catch(() => {});
    }
  }, []);

  const handleSelectMinutes = (mins: number) => {
    setSelectedMinutes(mins);
    setCustomInput(mins.toString());
  };

  const handleApplyCustomInput = () => {
    const val = parseInt(customInput, 10);
    if (!isNaN(val) && val >= 1 && val <= 60) {
      setSelectedMinutes(val);
      setIsTimeModalOpen(false);
    }
  };

  const handleStartCustomTimer = () => {
    onStartTimer(selectedMinutes * 60);
  };

  // Displayed seconds and formatted string based on state
  const totalSecondsForRing = isIdle ? selectedMinutes * 60 : 600;
  const displayedSecondsLeft = isIdle ? selectedMinutes * 60 : secondsLeft;
  const displayedFormattedTime = isIdle
    ? `${String(selectedMinutes).padStart(2, '0')}:00`
    : formattedTime;

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 py-10 max-w-4xl mx-auto w-full animate-fade-in z-10 relative">
      {/* Top Header Bar with Back Button & Badges */}
      <div className="w-full flex items-center justify-between gap-4 mb-6">
        <button
          onClick={onBackHome}
          className="btn-secondary text-xs px-4 py-2.5 flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors group cursor-pointer font-medium"
          title="Back to Home Screen"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-3">
          <span
            className="badge px-3.5 py-1.5"
            style={{
              backgroundColor: `${categoryInfo.color}15`,
              color: categoryInfo.color,
              borderColor: `${categoryInfo.color}30`
            }}
          >
            {categoryInfo.title}
          </span>
          <span className="badge px-3.5 py-1.5 font-medium capitalize text-[var(--text-tertiary)]">
            {topic.difficulty}
          </span>
        </div>
      </div>

      {/* Dramatic Minimal Topic Card */}
      <div className="glass-panel p-8 sm:p-12 w-full text-center mb-8 relative overflow-hidden shadow-2xl">
        <div
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{ backgroundColor: categoryInfo.color }}
        />

        <span className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-3 block font-mono">
          Drawn Legal Topic
        </span>

        <h2 className="heading-topic text-[var(--text-primary)] font-serif leading-tight">
          {topic.title}
        </h2>

        {/* Topic Tags */}
        {topic.tags && topic.tags.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {topic.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs font-medium px-3.5 py-1.5 rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--border-subtle)]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Center Retracting Circular Progress Timer */}
      <div className="flex flex-col items-center mb-8">
        <CircularTimer
          secondsLeft={displayedSecondsLeft}
          totalSeconds={totalSecondsForRing}
          formattedTime={displayedFormattedTime}
          isActive={isActive}
          isPaused={isPaused}
          label={`${isIdle ? selectedMinutes : Math.ceil(secondsLeft / 60)}-MIN RESEARCH TIMER`}
          size={260}
          strokeWidth={10}
          warningThreshold={120}
        />

        {/* Timer Control Buttons */}
        {isIdle ? (
          <div className="relative flex items-center justify-center w-full mt-2">
            <button
              onClick={handleStartCustomTimer}
              className="btn-primary text-sm px-10 py-4 flex items-center gap-2.5 shadow-xl hover:scale-105 transition-all rounded-full cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>START {selectedMinutes}-MIN TIMER</span>
            </button>

            {/* Circular Settings Button aligned gracefully beside centered Start CTA */}
            <button
              onClick={() => setIsTimeModalOpen(true)}
              className="ml-3 w-12 h-12 rounded-full glass-panel border border-[var(--glass-border)] hover:border-[var(--accent)] hover:bg-[var(--accent-subtle)] text-[var(--text-secondary)] hover:text-[var(--accent)] flex items-center justify-center transition-all shadow-xl cursor-pointer group shrink-0"
              title="Configure Research Duration"
              aria-label="Configure Research Duration"
            >
              <Sliders className="w-5 h-5 group-hover:rotate-45 transition-transform" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4 mt-2">
            {isPaused || !isActive ? (
              <button
                onClick={onResume}
                className="btn-secondary text-xs px-5 py-2.5 flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 text-emerald-500 fill-emerald-500" />
                Resume
              </button>
            ) : (
              <button
                onClick={onPause}
                className="btn-secondary text-xs px-5 py-2.5 flex items-center gap-2 cursor-pointer"
              >
                <Pause className="w-4 h-4 text-amber-500 fill-amber-500" />
                Pause
              </button>
            )}

            <button
              onClick={onReset}
              className="btn-secondary text-xs px-5 py-2.5 flex items-center gap-2 cursor-pointer"
              title="Reset timer"
            >
              <RotateCcw className="w-4 h-4 text-[var(--text-tertiary)]" />
              Reset
            </button>
          </div>
        )}
      </div>

      {/* Primary Transition Action: Ready to Speak */}
      <div className="flex flex-col items-center gap-4 w-full max-w-md">
        <button
          onClick={onReadyToSpeak}
          className="btn-primary w-full py-4.5 text-lg font-semibold flex items-center justify-center gap-2.5 rounded-full shadow-2xl cursor-pointer"
        >
          <Mic className="w-5 h-5 text-white" />
          <span>I'm Ready — Speak Now</span>
        </button>
      </div>

      {/* Research Duration Settings Modal */}
      {isTimeModalOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="glass-panel p-6 sm:p-8 max-w-md w-full relative shadow-2xl border border-[var(--glass-border)] rounded-3xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[var(--accent-subtle)] border border-[var(--accent-border)] flex items-center justify-center text-[var(--accent)]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[var(--text-primary)]">
                    Set Research Duration
                  </h3>
                  <p className="text-xs text-[var(--text-tertiary)]">
                    Choose time allocated for Bare Act & legal study.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsTimeModalOpen(false)}
                className="btn-icon p-1.5"
                title="Close"
              >
                <X className="w-4 h-4 text-[var(--text-tertiary)]" />
              </button>
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
              {PRESET_DURATIONS.map((preset) => {
                const isSelected = selectedMinutes === preset.minutes;
                return (
                  <button
                    key={preset.minutes}
                    onClick={() => handleSelectMinutes(preset.minutes)}
                    className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer select-none ${
                      isSelected
                        ? 'bg-[var(--accent-subtle)] border-[var(--accent)] text-[var(--accent)] shadow-md'
                        : 'bg-[var(--bg-surface)] border-[var(--glass-border)] hover:border-[var(--accent-border)] text-[var(--text-primary)]'
                    }`}
                  >
                    <div>
                      <span className="font-mono text-sm font-bold block">
                        {preset.label}
                      </span>
                      <span className="text-[11px] text-[var(--text-tertiary)] block">
                        {preset.sub}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[var(--accent)] text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Custom Minutes Input */}
            <div className="pt-4 border-t border-[var(--glass-border)] mb-6">
              <label className="text-xs font-mono font-medium uppercase tracking-wider text-[var(--text-tertiary)] block mb-2">
                Custom Duration (1 to 60 Mins)
              </label>

              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    className="w-full bg-[var(--bg-surface)] border border-[var(--glass-border)] rounded-xl px-4 py-2.5 text-sm font-mono font-semibold text-[var(--text-primary)] focus:border-[var(--accent)] outline-none"
                    placeholder="e.g. 12"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[var(--text-tertiary)]">
                    mins
                  </span>
                </div>

                <button
                  onClick={handleApplyCustomInput}
                  className="btn-secondary text-xs px-4 py-2.5 cursor-pointer"
                >
                  Set Custom
                </button>
              </div>
            </div>

            {/* Save & Confirm Button */}
            <button
              onClick={() => setIsTimeModalOpen(false)}
              className="btn-primary w-full py-3 text-sm font-semibold flex items-center justify-center gap-2 rounded-xl shadow-lg cursor-pointer"
            >
              <span>Apply {selectedMinutes}-Min Research Time</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
