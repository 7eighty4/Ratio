import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Check, MessageSquare, Volume2, FileText, ArrowRight, ArrowLeft, Save, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Topic, Session } from '../../types';
import { CATEGORIES } from '../../data/categories';

interface CompletionViewProps {
  topic: Topic;
  researchDuration: number;
  speakingDuration: number;
  audioBlob?: Blob | null;
  audioUrl: string | null;
  transcript?: string;
  onSaveSession: (sessionData: Partial<Session>) => void;
  onDiscardSession: () => void;
  onNextDraw: () => void;
  onViewHistory: () => void;
  onBackHome: () => void;
}

export const CompletionView: React.FC<CompletionViewProps> = ({
  topic,
  researchDuration,
  speakingDuration,
  audioUrl,
  transcript,
  onSaveSession,
  onDiscardSession,
  onNextDraw,
  onViewHistory,
  onBackHome
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [totalDuration, setTotalDuration] = useState<number>(speakingDuration);
  const [showSavePromptModal, setShowSavePromptModal] = useState<boolean>(false);

  // Reflection states
  const [confidence, setConfidence] = useState<number | undefined>(undefined);
  const [familiar, setFamiliar] = useState<boolean | undefined>(undefined);
  const [notes, setNotes] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'player' | 'transcript' | 'reflect'>('player');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const categoryInfo = CATEGORIES[topic.category] || CATEGORIES.mixed;
  const hasAudio = !!audioUrl;

  useEffect(() => {
    // Trigger soft celebratory confetti on complete
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#10B981', '#059669', '#34D399', '#6366F1']
      });
    } catch (e) {
      // Ignore if confetti fails
    }
  }, []);

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const changeSpeed = () => {
    const speeds = [1, 1.25, 1.5];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const newSpeed = speeds[nextIdx];
    setPlaybackSpeed(newSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }
  };

  const executeSaveSession = () => {
    onSaveSession({
      confidence,
      familiar,
      notes: notes.trim() ? notes : undefined
    });
  };

  const handleSaveAndGoHome = () => {
    executeSaveSession();
    onBackHome();
  };

  const handleSaveAndViewHistory = () => {
    executeSaveSession();
    onViewHistory();
  };

  const handleSaveAndNextDraw = () => {
    executeSaveSession();
    onNextDraw();
  };

  const handleConfirmDiscard = () => {
    if (window.confirm('Are you sure you want to discard this practice session without saving?')) {
      onDiscardSession();
      onBackHome();
    }
  };

  const formattedCurrentDateTime = new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 max-w-2xl mx-auto w-full animate-fade-in z-10 relative">
      {/* Hidden HTML Audio element for recording playback */}
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={() => {
            if (audioRef.current) {
              setCurrentTime(audioRef.current.currentTime);
            }
          }}
          onLoadedMetadata={() => {
            if (audioRef.current) {
              setTotalDuration(audioRef.current.duration || speakingDuration);
            }
          }}
          onEnded={() => setIsPlaying(false)}
        />
      )}

      {/* Top Header Bar with Back Button */}
      <div className="w-full flex items-center justify-between gap-4 mb-6">
        <button
          onClick={() => setShowSavePromptModal(true)}
          className="btn-secondary text-xs px-3.5 py-2 flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors group cursor-pointer"
          title="Back to Home Screen"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        <span className="text-xs font-mono font-medium text-[var(--accent)] bg-[var(--accent-subtle)] px-3 py-1 rounded-full border border-[var(--accent-border)]">
          {hasAudio ? '🎙️ Voice Recording Saved' : '⏱️ Timer & Topic Only'}
        </span>
      </div>

      {/* Header Banner */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold uppercase tracking-widest mb-2">
          <Check className="w-3.5 h-3.5" />
          <span>Session Complete</span>
        </div>

        <h2 className="heading-topic font-serif text-[var(--text-primary)]">
          {topic.title}
        </h2>
      </div>

      {/* Stats Summary Pill */}
      <div className="flex items-center justify-center gap-4 text-xs font-medium text-[var(--text-secondary)] mb-6 bg-[var(--glass-bg)] border border-[var(--glass-border)] px-6 py-3 rounded-full backdrop-blur-md shadow-sm">
        <span
          className="badge"
          style={{
            backgroundColor: `${categoryInfo.color}15`,
            color: categoryInfo.color,
            borderColor: `${categoryInfo.color}30`
          }}
        >
          {categoryInfo.shortLabel}
        </span>
        <span className="text-[var(--text-tertiary)]">•</span>
        <span>Research: {formatSeconds(researchDuration)}</span>
        <span className="text-[var(--text-tertiary)]">•</span>
        <span>Speaking: {formatSeconds(speakingDuration)}</span>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-center gap-2 mb-6 border-b border-[var(--border-subtle)] pb-2 w-full">
        <button
          onClick={() => setActiveTab('player')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 bg-transparent border-none cursor-pointer ${
            activeTab === 'player'
              ? 'bg-[var(--accent-subtle)] text-[var(--accent)]'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          <Volume2 className="w-4 h-4" />
          <span>Recording</span>
        </button>

        <button
          onClick={() => setActiveTab('transcript')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 bg-transparent border-none cursor-pointer ${
            activeTab === 'transcript'
              ? 'bg-[var(--accent-subtle)] text-[var(--accent)]'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Transcript</span>
        </button>

        <button
          onClick={() => setActiveTab('reflect')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 bg-transparent border-none cursor-pointer ${
            activeTab === 'reflect'
              ? 'bg-[var(--accent-subtle)] text-[var(--accent)]'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Reflect</span>
        </button>
      </div>

      {/* Main Tab Content Panel */}
      <div className="glass-panel p-6 w-full mb-8 min-h-[180px] flex flex-col justify-center">
        {/* PLAYER TAB */}
        {activeTab === 'player' && (
          <div>
            {audioUrl ? (
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center justify-center gap-4 w-full">
                  <button
                    onClick={togglePlay}
                    className="w-14 h-14 rounded-full bg-[var(--accent)] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer border-none"
                  >
                    {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-0.5" />}
                  </button>

                  <button
                    onClick={changeSpeed}
                    className="btn-secondary text-xs px-3 py-1.5 font-mono"
                    title="Playback speed"
                  >
                    {playbackSpeed}x
                  </button>
                </div>

                {/* Progress bar */}
                <div className="w-full flex items-center gap-3 text-xs font-mono text-[var(--text-tertiary)]">
                  <span>{formatSeconds(currentTime)}</span>
                  <input
                    type="range"
                    min={0}
                    max={totalDuration || 60}
                    step={0.1}
                    value={currentTime}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      setCurrentTime(val);
                      if (audioRef.current) {
                        audioRef.current.currentTime = val;
                      }
                    }}
                    className="flex-1 accent-[var(--accent)] cursor-pointer"
                  />
                  <span>{formatSeconds(totalDuration)}</span>
                </div>
              </div>
            ) : (
              <div className="text-center text-sm text-[var(--text-tertiary)] py-4">
                No audio recording available. Practice completed in timer-only mode.
              </div>
            )}
          </div>
        )}

        {/* TRANSCRIPT TAB */}
        {activeTab === 'transcript' && (
          <div className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {transcript ? (
              <p className="bg-[var(--bg-surface)] p-4 rounded-xl border border-[var(--border-subtle)] italic">
                "{transcript}"
              </p>
            ) : (
              <p className="text-center text-[var(--text-tertiary)] italic py-4">
                No transcript was captured during this session.
              </p>
            )}
          </div>
        )}

        {/* REFLECT TAB */}
        {activeTab === 'reflect' && (
          <div className="space-y-5 text-left">
            {/* Confidence Rating */}
            <div>
              <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider block mb-2">
                How confident did you feel explaining this topic?
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setConfidence(star)}
                    className={`w-9 h-9 rounded-lg flex items-center justify-center font-medium text-sm border transition-all cursor-pointer ${
                      confidence === star
                        ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-md'
                        : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--accent)]'
                    }`}
                  >
                    {star}
                  </button>
                ))}
              </div>
            </div>

            {/* Familiarity */}
            <div>
              <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider block mb-2">
                Was this legal topic familiar to you before?
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setFamiliar(true)}
                  className={`btn-secondary text-xs px-4 py-2 ${
                    familiar === true ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-subtle)]' : ''
                  }`}
                >
                  Yes, Familiar
                </button>
                <button
                  onClick={() => setFamiliar(false)}
                  className={`btn-secondary text-xs px-4 py-2 ${
                    familiar === false ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-subtle)]' : ''
                  }`}
                >
                  No, Completely New
                </button>
              </div>
            </div>

            {/* Free-text Notes */}
            <div>
              <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider block mb-2">
                Personal Notes & Key Points to Remember
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Record key precedents, statutory sections, or articulation improvements..."
                rows={3}
                className="w-full bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-medium)] rounded-xl p-3 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors resize-none font-sans"
              />
            </div>
          </div>
        )}
      </div>

      {/* Primary Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
        <button
          onClick={handleSaveAndViewHistory}
          className="btn-primary flex-1 w-full py-4 text-sm font-semibold flex items-center justify-center gap-2 rounded-full shadow-lg"
        >
          <Save className="w-4 h-4 text-white" />
          <span>Save Session to History</span>
        </button>

        <button
          onClick={handleSaveAndNextDraw}
          className="btn-secondary flex-1 w-full py-4 text-sm font-medium flex items-center justify-center gap-2 rounded-full"
        >
          <span>Save & Draw Next Topic</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={handleConfirmDiscard}
          className="btn-secondary py-4 px-4 text-xs font-medium text-rose-500 hover:bg-rose-500/10 border-rose-500/20 flex items-center justify-center gap-1.5 shrink-0 rounded-full"
          title="Discard this session without saving"
        >
          <Trash2 className="w-4 h-4 text-rose-500" />
          <span>Discard</span>
        </button>
      </div>

      {/* SAVE PROMPT MODAL */}
      {showSavePromptModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel p-6 sm:p-8 max-w-md w-full text-center relative animate-fade-in shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-[var(--accent-subtle)] border border-[var(--accent-border)] text-[var(--accent)] flex items-center justify-center mx-auto mb-4">
              <Save className="w-6 h-6" />
            </div>

            <h3 className="font-serif text-2xl font-semibold text-[var(--text-primary)] mb-2">
              Save Session to History?
            </h3>

            <p className="text-xs text-[var(--text-secondary)] mb-6 leading-relaxed">
              Would you like to save this practice session card to your history log before returning home?
            </p>

            {/* Session Card Preview inside Modal */}
            <div className="glass-card p-4 text-left mb-6 border border-[var(--glass-border)]">
              <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-tertiary)] mb-1">
                <span>{formattedCurrentDateTime}</span>
                <span className="text-[var(--accent)] font-semibold">
                  {hasAudio ? '🎙️ Audio Recording Included' : '⏱️ Timer Only'}
                </span>
              </div>
              <h4 className="font-serif text-lg font-semibold text-[var(--text-primary)]">
                {topic.title}
              </h4>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col gap-2.5">
              <button
                onClick={handleSaveAndGoHome}
                className="btn-primary py-3.5 text-sm font-semibold flex items-center justify-center gap-2 w-full rounded-full shadow-lg"
              >
                <Save className="w-4 h-4 text-white" />
                <span>Save to History & Return Home</span>
              </button>

              <button
                onClick={() => {
                  onDiscardSession();
                  onBackHome();
                }}
                className="btn-secondary py-3 text-xs text-rose-500 hover:bg-rose-500/10 border-rose-500/20 flex items-center justify-center gap-1.5 w-full rounded-full"
              >
                <Trash2 className="w-4 h-4 text-rose-500" />
                <span>Discard & Return Home</span>
              </button>

              <button
                onClick={() => setShowSavePromptModal(false)}
                className="text-xs text-[var(--text-tertiary)] hover:text-[var(--text-primary)] py-2 transition-colors cursor-pointer bg-transparent border-none"
              >
                Cancel & Resume Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
