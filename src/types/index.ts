export type TopicCategory =
  | 'constitutional_law'
  | 'jurisprudence'
  | 'cases'
  | 'history'
  | 'statutes'
  | 'maxims'
  | 'logical_fallacies'
  | 'legal_reasoning'
  | 'contracts'
  | 'crimes'
  | 'torts'
  | 'property'
  | 'admin_law'
  | 'international_law'
  | 'human_rights'
  | 'institutions'
  | 'ethics'
  | 'mixed';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'mixed';

export interface Topic {
  id: string;
  title: string;
  description?: string;
  category: TopicCategory;
  difficulty: Difficulty;
  tags: string[];
  suggestedAngles?: string[];
}

export type AppPhase = 'home' | 'research' | 'speaking' | 'complete' | 'history';

export interface Reflection {
  confidence?: number; // 1 to 5
  familiar?: boolean;
  notes?: string;
}

export interface Session {
  id: string;
  topicId: string;
  topicTitle: string;
  category: TopicCategory;
  difficulty: Difficulty;
  createdAt: string; // ISO String
  researchDuration: number; // in seconds
  speakingDuration: number; // in seconds
  audioBlob?: Blob;
  audioUrl?: string; // transient Object URL
  transcript?: string;
  confidence?: number;
  familiar?: boolean;
  notes?: string;
  revisitCount?: number;
}

export interface UserPreferences {
  selectedCategories: TopicCategory[]; // empty array means ALL
  difficulty: Difficulty;
  theme: 'light' | 'dark' | 'system';
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  autoTranscription: boolean;
  enableAudioRecording?: boolean;
}

export interface ActiveSessionState {
  sessionId: string;
  topic: Topic;
  phase: 'research' | 'speaking' | 'complete';
  researchStartTime?: number;
  researchDurationSeconds: number; // default 600
  speakingStartTime?: number;
  speakingDurationSeconds: number; // actual elapsed or 60 max
  isPaused?: boolean;
  pauseTimestamp?: number;
  accumulatedPauseTime?: number;
}
