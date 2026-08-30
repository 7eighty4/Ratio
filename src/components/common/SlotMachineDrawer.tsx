import React, { useState, useEffect, useRef } from 'react';
import { Dices, CheckCircle2, Layers } from 'lucide-react';
import type { Topic } from '../../types';
import { TOPICS } from '../../data/topics';
import { CATEGORIES } from '../../data/categories';

interface SlotMachineDrawerProps {
  targetTopic: Topic;
  onComplete: () => void;
  enableSound?: boolean;
}

export const SlotMachineDrawer: React.FC<SlotMachineDrawerProps> = ({
  targetTopic,
  onComplete,
  enableSound = true
}) => {
  const [prevTitle, setPrevTitle] = useState<string>('');
  const [currentDisplayTitle, setCurrentDisplayTitle] = useState<string>('Drawing legal topic...');
  const [nextTitle, setNextTitle] = useState<string>('');
  const [currentCategory, setCurrentCategory] = useState<string>('SELECTING');
  const [categoryColor, setCategoryColor] = useState<string>('var(--accent)');
  const [isLanded, setIsLanded] = useState<boolean>(false);
  const [blurAmount, setBlurAmount] = useState<number>(2);

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play subtle mechanical slot tick audio using Web Audio API synth
  const playSlotTick = (pitch = 440) => {
    if (!enableSound) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(pitch, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      // Ignore web audio errors
    }
  };

  useEffect(() => {
    const startTime = Date.now();
    const DURATION = 3000; // 3 seconds total spin duration

    const pool = TOPICS.filter((t) => t.id !== targetTopic.id);
    const getRandomTopic = () => pool[Math.floor(Math.random() * pool.length)] || targetTopic;

    let timeoutId: ReturnType<typeof setTimeout>;
    let tickCount = 0;

    // Initialize drum state
    const tPrev = getRandomTopic();
    const tCurr = getRandomTopic();
    const tNext = getRandomTopic();
    setPrevTitle(tPrev.title);
    setCurrentDisplayTitle(tCurr.title);
    setNextTitle(tNext.title);

    const spinStep = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / DURATION);

      if (progress < 1) {
        // Deceleration physics: min 40ms -> max 420ms
        const minInterval = 40;
        const maxInterval = 420;
        const currentInterval = minInterval + (maxInterval - minInterval) * Math.pow(progress, 2.2);

        // Motion blur decreases as deceleration happens
        const calculatedBlur = Math.max(0, 2.5 * (1 - progress));
        setBlurAmount(calculatedBlur);

        const samplePrev = getRandomTopic();
        const sampleCurr = getRandomTopic();
        const sampleNext = getRandomTopic();

        const catInfo = CATEGORIES[sampleCurr.category] || CATEGORIES.mixed;

        setPrevTitle(samplePrev.title);
        setCurrentDisplayTitle(sampleCurr.title);
        setNextTitle(sampleNext.title);
        setCurrentCategory(catInfo.title);
        setCategoryColor(catInfo.color || 'var(--accent)');

        tickCount++;
        playSlotTick(340 + (tickCount % 6) * 45);

        timeoutId = setTimeout(spinStep, currentInterval);
      } else {
        // LAND ON TARGET TOPIC
        const targetCatInfo = CATEGORIES[targetTopic.category] || CATEGORIES.mixed;

        setPrevTitle(getRandomTopic().title);
        setCurrentDisplayTitle(targetTopic.title);
        setNextTitle(getRandomTopic().title);
        setCurrentCategory(targetCatInfo.title);
        setCategoryColor(targetCatInfo.color || 'var(--accent)');
        setBlurAmount(0);
        setIsLanded(true);

        playSlotTick(880); // Chime

        // Hold display for 700ms then call onComplete
        setTimeout(() => {
          onComplete();
        }, 750);
      }
    };

    spinStep();

    return () => {
      clearTimeout(timeoutId);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [targetTopic, onComplete, enableSound]);

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-xl z-50 flex items-center justify-center p-6 animate-fade-in select-none">
      {/* Immersive Background Atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[var(--accent)]/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-emerald-500/15 blur-[120px] pointer-events-none" />

      {/* Main Glass Theater Stage Container */}
      <div className="glass-panel p-8 sm:p-14 max-w-3xl w-full text-center relative overflow-hidden shadow-2xl border border-[var(--glass-border)] rounded-3xl">
        {/* Stage Header Badge */}
        <div className="flex items-center justify-center mb-8">
          <div className={`inline-flex items-center gap-2.5 px-5 py-2 rounded-full border text-xs font-semibold uppercase tracking-widest transition-all shadow-md ${
            isLanded
              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40 shadow-emerald-500/20'
              : 'bg-[var(--accent-subtle)] text-[var(--accent)] border-[var(--accent-border)]'
          }`}>
            {isLanded ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-bounce" />
                <span>Topic Locked In!</span>
              </>
            ) : (
              <>
                <Dices className="w-4 h-4 text-[var(--accent)] animate-spin" style={{ animationDuration: '1.2s' }} />
                <span>Selecting Legal Concept...</span>
              </>
            )}
          </div>
        </div>

        {/* Practice Category Indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-tertiary)] flex items-center gap-1.5 font-medium">
            <Layers className="w-3.5 h-3.5 text-[var(--accent)]" />
            Category:
          </span>
          <span
            className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border transition-all"
            style={{
              backgroundColor: `${categoryColor}20`,
              color: categoryColor,
              borderColor: `${categoryColor}40`
            }}
          >
            {currentCategory}
          </span>
        </div>

        {/* 3D Slot Machine Drum Window (Multi-Row Display) */}
        <div className="relative my-6 p-6 sm:p-10 rounded-2xl bg-[var(--bg-surface)] border-2 border-[var(--glass-border)] shadow-2xl overflow-hidden min-h-[260px] flex flex-col justify-between items-center transition-all">
          {/* Slot Reel Gradient Mask Overlay (Top & Bottom Fade) */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[var(--bg-surface)] to-transparent pointer-events-none z-20 opacity-95" />
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--bg-surface)] to-transparent pointer-events-none z-20 opacity-95" />

          {/* Active Center Frame Brackets & Neon Focus Box */}
          <div className={`absolute inset-x-4 top-1/2 -translate-y-1/2 h-24 rounded-xl border-2 transition-all pointer-events-none z-10 shadow-lg ${
            isLanded
              ? 'border-[var(--accent)] bg-[var(--accent-subtle)]/40 shadow-[var(--accent)]/20 scale-[1.02]'
              : 'border-[var(--accent-border)] bg-[var(--accent-subtle)]/20'
          }`}>
            {/* Corner Crosshairs */}
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[var(--accent)]" />
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-[var(--accent)]" />
            <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-[var(--accent)]" />
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[var(--accent)]" />
          </div>

          {/* Upper Row (Entering/Exiting Topic) */}
          <div className="w-full text-center opacity-30 scale-90 transition-all font-serif text-sm sm:text-base text-[var(--text-tertiary)] py-1 truncate pointer-events-none">
            {prevTitle}
          </div>

          {/* Active Center Row (Target Topic Display) */}
          <div className="w-full py-4 relative z-10 flex items-center justify-center my-auto">
            <h2
              className={`font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-tight transition-all ${
                isLanded
                  ? 'scale-105 text-[var(--accent)] font-bold drop-shadow-md'
                  : 'text-[var(--text-primary)]'
              }`}
              style={{
                filter: isLanded ? 'none' : `blur(${blurAmount}px)`
              }}
            >
              {currentDisplayTitle}
            </h2>
          </div>

          {/* Lower Row (Entering/Exiting Topic) */}
          <div className="w-full text-center opacity-30 scale-90 transition-all font-serif text-sm sm:text-base text-[var(--text-tertiary)] py-1 truncate pointer-events-none">
            {nextTitle}
          </div>
        </div>
      </div>
    </div>
  );
};
