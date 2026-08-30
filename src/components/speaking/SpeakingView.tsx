import { useState } from 'react';
import { Mic, MicOff, Square, AlertCircle, Play, ArrowLeft } from 'lucide-react';
import type { Topic } from '../../types';
import { CircularTimer } from '../common/CircularTimer';

interface SpeakingViewProps {
  topic: Topic;
  secondsLeft?: number;
  formattedTime: string;
  isRecording: boolean;
  audioLevels: number[];
  permissionError: string | null;
  isMicAvailable?: boolean;
  defaultRecordAudio?: boolean;
  onStartSpeaking: (recordAudio: boolean) => void;
  onStopSpeaking: () => void;
  onBackHome?: () => void;
}

export const SpeakingView: React.FC<SpeakingViewProps> = ({
  topic,
  secondsLeft = 60,
  formattedTime,
  isRecording,
  audioLevels,
  permissionError,
  defaultRecordAudio = true,
  onStartSpeaking,
  onStopSpeaking,
  onBackHome
}) => {
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [recordAudio, setRecordAudio] = useState<boolean>(defaultRecordAudio);

  const handleStart = () => {
    setHasStarted(true);
    onStartSpeaking(recordAudio);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 max-w-2xl mx-auto w-full animate-fade-in z-10 relative">
      {/* Top Header Bar with Back Button */}
      {onBackHome && (
        <div className="w-full flex items-center justify-start mb-6">
          <button
            onClick={onBackHome}
            className="btn-secondary text-xs px-3.5 py-2 flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors group cursor-pointer"
            title="Back to Home Screen"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-2 block">
          Speaking Practice
        </span>
        <h2 className="heading-hero font-serif text-[var(--text-primary)]">
          Now explain it.
        </h2>
      </div>

      {/* Topic Title Reference Card */}
      <div className="glass-card p-6 w-full text-center mb-6 border border-[var(--glass-border)]">
        <span className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] font-semibold block mb-1">
          Topic
        </span>
        <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          {topic.title}
        </h3>
      </div>

      {/* Mic Permission Warning Notice if any */}
      {permissionError && recordAudio && (
        <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs flex items-start gap-3 w-full">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">{permissionError}</p>
            <p className="mt-1 opacity-80">
              You can still use the 60-second timer to practice speaking out loud.
            </p>
          </div>
        </div>
      )}

      {!hasStarted ? (
        /* Pre-speaking CTA */
        <div className="flex flex-col items-center gap-6 my-2 text-center w-full max-w-md">
          {/* Audio Recording Toggle Card */}
          <div
            onClick={() => setRecordAudio(!recordAudio)}
            className="w-full glass-card p-4 flex items-center justify-between gap-4 cursor-pointer hover:border-[var(--accent)] transition-all select-none text-left"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                recordAudio
                  ? 'bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent-border)]'
                  : 'bg-[var(--badge-bg)] text-[var(--text-tertiary)] border border-[var(--border-subtle)]'
              }`}>
                {recordAudio ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </div>
              <div>
                <span className="text-sm font-semibold text-[var(--text-primary)] block">
                  {recordAudio ? 'Record Audio & Transcribe' : 'Timer-Only Mode (No Audio Recording)'}
                </span>
                <span className="text-xs text-[var(--text-secondary)] block">
                  {recordAudio ? 'Saves voice recording & speech-to-text' : 'Runs 60-second countdown without requesting mic permission'}
                </span>
              </div>
            </div>

            <input
              type="checkbox"
              checked={recordAudio}
              onChange={(e) => setRecordAudio(e.target.checked)}
              className="w-5 h-5 accent-[var(--accent)] cursor-pointer shrink-0"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <p className="text-xs text-[var(--text-secondary)]">
            Click start when ready. Speak clearly as if explaining your legal synthesis to a judge or colleague.
          </p>

          <button
            onClick={handleStart}
            className="btn-primary text-lg px-10 py-4 shadow-2xl flex items-center gap-3 w-full justify-center group"
          >
            {recordAudio ? <Mic className="w-6 h-6" /> : <Play className="w-6 h-6 fill-white" />}
            <span>START SPEAKING (1-MIN TIMER)</span>
          </button>
        </div>
      ) : (
        /* Active Speaking Phase */
        <div className="flex flex-col items-center w-full">
          {/* Prominent 60s Retracting Circular Timer */}
          <CircularTimer
            secondsLeft={secondsLeft}
            totalSeconds={60}
            formattedTime={formattedTime}
            isActive={true}
            isPaused={false}
            label="SPEAKING SYNTHESIS TIMER"
            size={250}
            strokeWidth={10}
            warningThreshold={15}
          />

          {/* Active Audio Waveform & Pulse Visualizer */}
          <div className="w-full max-w-md h-24 glass-panel p-4 mb-8 flex items-center justify-center gap-1.5 overflow-hidden relative">
            {isRecording ? (
              <div className="absolute top-3 right-4 flex items-center gap-1.5 text-xs text-rose-500 font-semibold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span>REC</span>
              </div>
            ) : (
              <div className="absolute top-3 right-4 text-xs text-[var(--text-tertiary)] font-medium uppercase tracking-wider">
                <span>TIMER ONLY</span>
              </div>
            )}

            {/* Dynamic Waveform Bars */}
            {isRecording ? (
              audioLevels.map((level, idx) => (
                <div
                  key={idx}
                  className="w-2 rounded-full bg-[var(--accent)] transition-all duration-75"
                  style={{
                    height: `${Math.max(12, level)}%`,
                    opacity: 0.4 + (level / 100) * 0.6
                  }}
                />
              ))
            ) : (
              <div className="flex items-center gap-2">
                {[40, 70, 50, 90, 60, 80, 45, 75, 65, 85, 55, 95, 40, 70, 50].map((val, idx) => (
                  <div
                    key={idx}
                    className="w-2 rounded-full bg-[var(--accent)] opacity-60 animate-pulse"
                    style={{
                      height: `${val}%`,
                      animationDelay: `${idx * 0.1}s`
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Manual Stop Button */}
          <button
            onClick={onStopSpeaking}
            className="btn-secondary text-sm px-6 py-3 border-rose-500/30 text-rose-500 hover:bg-rose-500/10 flex items-center gap-2"
          >
            <Square className="w-4 h-4 fill-current" />
            <span>Finish Early & Save</span>
          </button>
        </div>
      )}
    </div>
  );
};
