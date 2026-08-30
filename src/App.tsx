import { useState, useEffect, useCallback } from 'react';
import { Header } from './components/layout/Header';
import { HomeView } from './components/home/HomeView';
import { ResearchView } from './components/research/ResearchView';
import { SpeakingView } from './components/speaking/SpeakingView';
import { CompletionView } from './components/completion/CompletionView';
import { HistoryView } from './components/history/HistoryView';
import { SettingsModal } from './components/settings/SettingsModal';
import { SlotMachineDrawer } from './components/common/SlotMachineDrawer';

import type { AppPhase, Topic, Session, UserPreferences, TopicCategory } from './types';
import { useTopicDraw } from './hooks/useTopicDraw';
import { useResearchTimer } from './hooks/useResearchTimer';
import { useSpeakingTimer } from './hooks/useSpeakingTimer';
import { useRecorder } from './hooks/useRecorder';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { useAudioSynth } from './hooks/useAudioSynth';
import { useSessionHistory } from './hooks/useSessionHistory';

const PREFS_STORAGE_KEY = 'ratio_user_preferences';
const ACTIVE_SESSION_STORAGE_KEY = 'ratio_active_session_state';

const DEFAULT_PREFERENCES: UserPreferences = {
  selectedCategories: [],
  difficulty: 'mixed',
  theme: 'dark',
  soundEnabled: true,
  notificationsEnabled: false,
  autoTranscription: true
};

export function App() {
  // Navigation & View Phase
  const [phase, setPhase] = useState<AppPhase>('home');

  // Preferences State
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    try {
      const saved = localStorage.getItem(PREFS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_PREFERENCES;
    } catch (e) {
      return DEFAULT_PREFERENCES;
    }
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Sync Theme attribute on DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', preferences.theme);
    localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(preferences));
  }, [preferences]);

  // Topic Draw Hook
  const { drawTopic, setSpecificTopic, totalAvailable } = useTopicDraw({
    selectedCategories: preferences.selectedCategories,
    selectedDifficulty: preferences.difficulty
  });

  // Session History Hook
  const { sessions, saveSession, deleteSession, clearHistory } = useSessionHistory();

  // Audio Synth Hook
  const { playResearchCompleteSound, playSpeakingCompleteSound, playDrawSound } = useAudioSynth(
    preferences.soundEnabled
  );

  // Recorder Hook
  const {
    isRecording,
    audioBlob,
    audioUrl,
    audioLevels,
    permissionError,
    isMicAvailable,
    startRecording,
    stopRecording,
    clearRecording
  } = useRecorder();

  // Speech Recognition Hook
  const { transcript, startListening, stopListening } = useSpeechRecognition();

  // Active Session Timings
  const [actualSpeakingDuration, setActualSpeakingDuration] = useState<number>(60);
  const [currentSessionTopic, setCurrentSessionTopic] = useState<Topic | null>(null);
  const [isSpinningSlotMachine, setIsSpinningSlotMachine] = useState<boolean>(false);
  const [targetDrawnTopic, setTargetDrawnTopic] = useState<Topic | null>(null);

  // Completion Callbacks for Timers
  const handleResearchTimerComplete = useCallback(() => {
    playResearchCompleteSound();

    // Trigger Browser Notification if granted
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Research Time Complete!', {
        body: '10 minutes of research finished. Time to articulate your explanation!',
        icon: '/vite.svg'
      });
    }

    setPhase('speaking');
  }, [playResearchCompleteSound]);

  const handleSpeakingTimerComplete = useCallback(
    async (finalDuration: number) => {
      playSpeakingCompleteSound();
      stopListening();
      await stopRecording();
      setActualSpeakingDuration(finalDuration);
      setPhase('complete');
    },
    [playSpeakingCompleteSound, stopListening, stopRecording]
  );

  // Timer Hooks
  const researchTimer = useResearchTimer({
    initialSeconds: 600,
    onComplete: handleResearchTimerComplete
  });

  const speakingTimer = useSpeakingTimer({
    maxSeconds: 60,
    onComplete: handleSpeakingTimerComplete
  });

  // --- Core Flow Actions ---

  // 1. Draw Topic Action (Triggers 3-Second Slot Machine Reel Animation)
  const handleDrawTopic = useCallback(() => {
    playDrawSound();
    clearRecording();
    const topic = drawTopic();
    setTargetDrawnTopic(topic);
    setIsSpinningSlotMachine(true);
  }, [clearRecording, drawTopic, playDrawSound]);

  // 1b. Slot Machine Animation Finish
  const handleSlotMachineComplete = useCallback(() => {
    if (targetDrawnTopic) {
      setCurrentSessionTopic(targetDrawnTopic);
      setPhase('research');
      researchTimer.resetTimer();

      localStorage.setItem(
        ACTIVE_SESSION_STORAGE_KEY,
        JSON.stringify({
          phase: 'research',
          topic: targetDrawnTopic
        })
      );
    }
    setIsSpinningSlotMachine(false);
  }, [targetDrawnTopic, researchTimer]);

  // 1b. Start Research Timer explicitly with custom duration (default 600s / 10m)
  const handleStartResearchTimer = useCallback((durationSeconds: number = 600) => {
    researchTimer.startTimer(durationSeconds);
    if (currentSessionTopic) {
      localStorage.setItem(
        ACTIVE_SESSION_STORAGE_KEY,
        JSON.stringify({
          phase: 'research',
          topic: currentSessionTopic,
          targetTime: Date.now() + durationSeconds * 1000
        })
      );
    }
  }, [currentSessionTopic, researchTimer]);

  // 2. Ready to Speak (Skip Research)
  const handleReadyToSpeak = useCallback(() => {
    researchTimer.pauseTimer();
    setPhase('speaking');

    // Save recovery state
    if (currentSessionTopic) {
      localStorage.setItem(
        ACTIVE_SESSION_STORAGE_KEY,
        JSON.stringify({
          phase: 'speaking',
          topic: currentSessionTopic
        })
      );
    }
  }, [currentSessionTopic, researchTimer]);

  // 3. Start Speaking Action
  const handleStartSpeaking = useCallback(async (recordAudio: boolean = true) => {
    speakingTimer.startSpeakingTimer();
    if (recordAudio) {
      if (preferences.autoTranscription) {
        startListening();
      }
      await startRecording();
    }
  }, [speakingTimer, preferences.autoTranscription, startListening, startRecording]);

  // 4. Stop Speaking Early Action
  const handleStopSpeaking = useCallback(async () => {
    const elapsed = speakingTimer.stopSpeakingTimer();
    stopListening();
    await stopRecording();
    setActualSpeakingDuration(elapsed);
    playSpeakingCompleteSound();
    setPhase('complete');
    localStorage.removeItem(ACTIVE_SESSION_STORAGE_KEY);
  }, [speakingTimer, stopListening, stopRecording, playSpeakingCompleteSound]);

  // 5. Save Completed Session
  const handleSaveCompletedSession = useCallback(
    async (reflections: { confidence?: number; familiar?: boolean; notes?: string }) => {
      if (!currentSessionTopic) return;

      const newSession: Session = {
        id: `session_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        topicId: currentSessionTopic.id,
        topicTitle: currentSessionTopic.title,
        category: currentSessionTopic.category,
        difficulty: currentSessionTopic.difficulty,
        createdAt: new Date().toISOString(),
        researchDuration: Math.max(0, 600 - researchTimer.secondsLeft),
        speakingDuration: actualSpeakingDuration || 60,
        audioBlob: audioBlob || undefined,
        transcript: transcript || undefined,
        confidence: reflections.confidence,
        familiar: reflections.familiar,
        notes: reflections.notes
      };

      await saveSession(newSession);
      localStorage.removeItem(ACTIVE_SESSION_STORAGE_KEY);
    },
    [currentSessionTopic, researchTimer.secondsLeft, actualSpeakingDuration, audioBlob, transcript, saveSession]
  );

  // 5b. Discard Session Action
  const handleDiscardSession = useCallback(() => {
    clearRecording();
    localStorage.removeItem(ACTIVE_SESSION_STORAGE_KEY);
  }, [clearRecording]);

  // 6. Revisit Topic Action
  const handleRevisitTopic = useCallback(
    (topic: Topic) => {
      setSpecificTopic(topic);
      setCurrentSessionTopic(topic);
      clearRecording();
      setPhase('research');
      researchTimer.resetTimer();
    },
    [clearRecording, researchTimer, setSpecificTopic]
  );

  // Session Recovery Effect on Mount
  useEffect(() => {
    try {
      const savedStateStr = localStorage.getItem(ACTIVE_SESSION_STORAGE_KEY);
      if (savedStateStr) {
        const savedState = JSON.parse(savedStateStr);
        if (savedState.topic) {
          setCurrentSessionTopic(savedState.topic);
          setSpecificTopic(savedState.topic);

          if (savedState.phase === 'research' && savedState.targetTime) {
            const remainingSecs = Math.ceil((savedState.targetTime - Date.now()) / 1000);
            if (remainingSecs > 0) {
              setPhase('research');
              researchTimer.startTimer(remainingSecs);
            } else {
              setPhase('speaking');
            }
          } else if (savedState.phase === 'speaking') {
            setPhase('speaking');
          }
        }
      }
    } catch (e) {
      // Ignore recovery errors
    }
  }, []);

  // Handle Category Selection from Home Menu
  const handleSelectCategory = useCallback((category: TopicCategory | 'all') => {
    if (category === 'all') {
      setPreferences((prev) => ({ ...prev, selectedCategories: [] }));
    } else {
      setPreferences((prev) => ({ ...prev, selectedCategories: [category] }));
    }
  }, []);

  // Export Data JSON
  const handleExportData = () => {
    const exportMetadata = sessions.map(({ audioBlob, ...rest }) => rest);
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportMetadata, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `ratio_sessions_export_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden font-sans">
      {/* Background Atmosphere Glows */}
      <div className="bg-glow-container">
        <div className="bg-glow-1" />
        <div className="bg-glow-2" />
        <div className="bg-glow-3" />
      </div>

      {/* Persistent Navigation Header */}
      <Header
        currentPhase={phase}
        onNavigate={(p) => setPhase(p)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        preferences={preferences}
        onUpdatePreferences={(p) => setPreferences((prev) => ({ ...prev, ...p }))}
      />

      {/* Main View Container */}
      <main className="flex-1 flex flex-col justify-center relative z-10 py-4">
        {phase === 'home' && (
          <HomeView
            onDraw={handleDrawTopic}
            onSelectCategory={handleSelectCategory}
            totalAvailable={totalAvailable}
            selectedCategories={preferences.selectedCategories}
          />
        )}

        {phase === 'research' && currentSessionTopic && (
          <ResearchView
            topic={currentSessionTopic}
            secondsLeft={researchTimer.secondsLeft}
            formattedTime={researchTimer.formattedTime}
            isActive={researchTimer.isActive}
            isPaused={researchTimer.isPaused}
            onStartTimer={handleStartResearchTimer}
            onPause={researchTimer.pauseTimer}
            onResume={researchTimer.resumeTimer}
            onReset={() => researchTimer.resetTimer()}
            onReadyToSpeak={handleReadyToSpeak}
            onBackHome={() => setPhase('home')}
          />
        )}

        {phase === 'speaking' && currentSessionTopic && (
          <SpeakingView
            topic={currentSessionTopic}
            secondsLeft={speakingTimer.secondsLeft}
            formattedTime={speakingTimer.formattedTime}
            isRecording={isRecording}
            audioLevels={audioLevels}
            permissionError={permissionError}
            isMicAvailable={isMicAvailable}
            defaultRecordAudio={preferences.enableAudioRecording ?? true}
            onStartSpeaking={handleStartSpeaking}
            onStopSpeaking={handleStopSpeaking}
            onBackHome={() => setPhase('home')}
          />
        )}

        {phase === 'complete' && currentSessionTopic && (
          <CompletionView
            topic={currentSessionTopic}
            researchDuration={Math.max(0, 600 - researchTimer.secondsLeft)}
            speakingDuration={actualSpeakingDuration || 60}
            audioBlob={audioBlob}
            audioUrl={audioUrl}
            transcript={transcript}
            onSaveSession={handleSaveCompletedSession}
            onDiscardSession={handleDiscardSession}
            onNextDraw={handleDrawTopic}
            onViewHistory={() => setPhase('history')}
            onBackHome={() => setPhase('home')}
          />
        )}

        {phase === 'history' && (
          <HistoryView
            sessions={sessions}
            onDeleteSession={deleteSession}
            onClearHistory={clearHistory}
            onRevisitTopic={handleRevisitTopic}
            onBackHome={() => setPhase('home')}
          />
        )}
      </main>

      {/* Preferences & Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        preferences={preferences}
        onUpdatePreferences={(p) => setPreferences((prev) => ({ ...prev, ...p }))}
        onExportData={handleExportData}
        onClearData={clearHistory}
      />

      {/* 3-Second Slot Machine Topic Draw Reel Animation */}
      {isSpinningSlotMachine && targetDrawnTopic && (
        <SlotMachineDrawer
          targetTopic={targetDrawnTopic}
          onComplete={handleSlotMachineComplete}
          enableSound={preferences.soundEnabled ?? true}
        />
      )}
    </div>
  );
}

export default App;
