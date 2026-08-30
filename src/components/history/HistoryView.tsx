import { useState, useMemo, useRef } from 'react';
import { Search, Play, Pause, RotateCcw, Calendar, Trash2, X, Star } from 'lucide-react';
import type { Session, Topic } from '../../types';
import { CATEGORIES } from '../../data/categories';
import { TOPICS } from '../../data/topics';

interface HistoryViewProps {
  sessions: Session[];
  onDeleteSession: (id: string) => void;
  onClearHistory?: () => void;
  onRevisitTopic: (topic: Topic) => void;
  onBackHome: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  sessions,
  onDeleteSession,
  onRevisitTopic,
  onBackHome
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [sessionToDelete, setSessionToDelete] = useState<{ id: string; title: string } | null>(null);

  // Audio player state inside modal
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const filteredSessions = useMemo(() => {
    return sessions.filter((s) => {
      // Category filter
      if (categoryFilter !== 'all' && s.category !== categoryFilter) {
        return false;
      }
      // Search term
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchTitle = s.topicTitle.toLowerCase().includes(query);
        const matchNotes = s.notes?.toLowerCase().includes(query) || false;
        const matchCategory = s.category.toLowerCase().includes(query);
        if (!matchTitle && !matchNotes && !matchCategory) {
          return false;
        }
      }
      return true;
    });
  }, [sessions, categoryFilter, searchTerm]);

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      const dateStr = d.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }).toUpperCase();
      const timeStr = d.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });
      return `${dateStr} • ${timeStr}`;
    } catch (e) {
      return isoString;
    }
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOpenDetail = (session: Session) => {
    setSelectedSession(session);
    if (session.audioBlob) {
      const url = URL.createObjectURL(session.audioBlob);
      setAudioUrl(url);
    } else {
      setAudioUrl(null);
    }
    setIsPlaying(false);
  };

  const handleCloseDetail = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setSelectedSession(null);
    setIsPlaying(false);
  };

  const handleRevisit = (session: Session) => {
    const foundTopic = TOPICS.find((t) => t.id === session.topicId) || {
      id: session.topicId,
      title: session.topicTitle,
      description: 'Revisited practice topic.',
      category: session.category,
      difficulty: session.difficulty,
      tags: []
    };

    handleCloseDetail();
    onRevisitTopic(foundTopic);
  };

  const promptDeleteSession = (e: React.MouseEvent, id: string, title: string) => {
    e.stopPropagation();
    e.preventDefault();
    setSessionToDelete({ id, title });
  };

  const confirmDeleteSession = () => {
    if (sessionToDelete) {
      onDeleteSession(sessionToDelete.id);
      if (selectedSession && selectedSession.id === sessionToDelete.id) {
        handleCloseDetail();
      }
      setSessionToDelete(null);
    }
  };

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-8 animate-fade-in z-10 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-1 block font-mono">
            Archive & Practice Log
          </span>
          <h2 className="heading-hero font-serif text-[var(--text-primary)]">
            Your Session History
          </h2>
        </div>

        <button onClick={onBackHome} className="btn-secondary text-xs px-4 py-2 font-medium">
          ← Back to Practice
        </button>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-8">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
          <input
            type="text"
            placeholder="Search topics, categories, notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-full pl-10 pr-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors backdrop-blur-md font-sans"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-full px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] cursor-pointer font-sans w-full sm:w-auto"
        >
          <option value="all">All Categories</option>
          {Object.values(CATEGORIES).map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.title}
            </option>
          ))}
        </select>
      </div>

      {/* Chronological List of Session Cards */}
      {filteredSessions.length === 0 ? (
        <div className="glass-panel p-12 text-center my-8">
          <Calendar className="w-10 h-10 text-[var(--text-tertiary)] mx-auto mb-3 opacity-50" />
          <h3 className="font-serif text-xl text-[var(--text-primary)] mb-2 font-semibold">
            No practice sessions recorded yet.
          </h3>
          <p className="text-sm text-[var(--text-secondary)] max-w-sm mx-auto mb-6">
            Draw a legal topic to begin building your research and speaking history.
          </p>
          <button onClick={onBackHome} className="btn-primary text-sm px-6 py-2.5">
            Draw Topic Now
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSessions.map((session) => {
            const categoryInfo = CATEGORIES[session.category] || CATEGORIES.mixed;
            const hasAudio = !!session.audioBlob;

            return (
              <div
                key={session.id}
                onClick={() => handleOpenDetail(session)}
                className="glass-card p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:border-[var(--accent-border)] transition-all group relative"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)] font-mono">
                      {formatDate(session.createdAt)}
                    </span>
                    <span className="text-[var(--text-tertiary)]">•</span>
                    <span
                      className="badge text-[10px] py-0.5 px-2"
                      style={{
                        backgroundColor: `${categoryInfo.color}15`,
                        color: categoryInfo.color,
                        borderColor: `${categoryInfo.color}30`
                      }}
                    >
                      {categoryInfo.shortLabel}
                    </span>
                    <span className="text-[var(--text-tertiary)]">•</span>
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-[var(--badge-bg)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                      {hasAudio ? '🎙️ Audio Recorded' : '⏱️ Timer & Topic Only'}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-1">
                    {session.topicTitle}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
                    <span>Research {formatSeconds(session.researchDuration)}</span>
                    <span className="text-[var(--text-tertiary)]">•</span>
                    <span>Speaking {formatSeconds(session.speakingDuration)}</span>
                    {session.confidence && (
                      <>
                        <span className="text-[var(--text-tertiary)]">•</span>
                        <span className="flex items-center gap-1 text-amber-500 font-semibold">
                          <Star className="w-3 h-3 fill-amber-500" />
                          {session.confidence}/5
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDetail(session);
                    }}
                    className="btn-secondary text-xs px-4 py-2 flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>View Detail</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => promptDeleteSession(e, session.id, session.topicTitle)}
                    className="btn-icon text-rose-500 hover:bg-rose-500/10 border-rose-500/20 cursor-pointer p-2 shrink-0"
                    title="Delete session from history"
                    aria-label="Delete session"
                  >
                    <Trash2 className="w-4 h-4 text-rose-500" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SESSION DETAIL MODAL */}
      {selectedSession && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto relative animate-fade-in">
            <button
              onClick={handleCloseDetail}
              className="absolute top-4 right-4 btn-icon"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-1 block font-mono">
              {formatDate(selectedSession.createdAt)}
            </span>

            <h2 className="heading-topic font-serif text-[var(--text-primary)] mb-3 pr-8">
              {selectedSession.topicTitle}
            </h2>

            {/* Audio Player in Modal */}
            {audioUrl ? (
              <div className="bg-[var(--bg-surface)] p-4 rounded-xl border border-[var(--border-subtle)] mb-6 flex flex-col items-center gap-3">
                <audio
                  ref={audioRef}
                  src={audioUrl}
                  onEnded={() => setIsPlaying(false)}
                />
                <button
                  onClick={() => {
                    if (audioRef.current) {
                      if (isPlaying) {
                        audioRef.current.pause();
                        setIsPlaying(false);
                      } else {
                        audioRef.current.play();
                        setIsPlaying(true);
                      }
                    }
                  }}
                  className="btn-primary text-xs px-6 py-2.5 flex items-center gap-2"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                  <span>{isPlaying ? 'Pause Recording' : 'Play Recording'}</span>
                </button>
              </div>
            ) : (
              <p className="text-xs text-[var(--text-tertiary)] italic mb-6">
                No audio recording stored for this session.
              </p>
            )}

            {/* Notes if present */}
            {selectedSession.notes && (
              <div className="mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] block mb-1">
                  Reflection Notes
                </span>
                <p className="text-sm text-[var(--text-secondary)] bg-[var(--bg-surface)] p-3 rounded-lg border border-[var(--border-subtle)]">
                  {selectedSession.notes}
                </p>
              </div>
            )}

            {/* REVISIT TOPIC & DELETE BUTTONS */}
            <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-3">
              <button
                onClick={() => handleRevisit(selectedSession)}
                className="btn-primary flex-1 py-3 text-sm flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>REVISIT TOPIC</span>
              </button>

              <button
                onClick={(e) => promptDeleteSession(e, selectedSession.id, selectedSession.topicTitle)}
                className="btn-secondary text-xs py-3 px-3.5 text-rose-500 hover:bg-rose-500/10 border-rose-500/20 flex items-center gap-1.5 cursor-pointer"
                title="Delete this session from history"
              >
                <Trash2 className="w-4 h-4 text-rose-500" />
                <span>Delete</span>
              </button>

              <button
                onClick={handleCloseDetail}
                className="btn-secondary py-3 px-4 text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOM GLASSMORPHIC DELETE CONFIRMATION MODAL */}
      {sessionToDelete && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="glass-panel p-6 sm:p-8 max-w-sm w-full text-center relative animate-fade-in shadow-2xl border border-rose-500/30">
            <div className="w-12 h-12 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-500 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>

            <h3 className="font-serif text-2xl font-semibold text-[var(--text-primary)] mb-2">
              Delete Session?
            </h3>

            <p className="text-xs text-[var(--text-secondary)] mb-6 leading-relaxed">
              Are you sure you want to delete <strong className="text-[var(--text-primary)] font-semibold">"{sessionToDelete.title}"</strong> from your history? This action cannot be undone.
            </p>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={confirmDeleteSession}
                className="btn-primary py-3.5 text-xs font-semibold bg-rose-600 hover:bg-rose-500 border-rose-600 text-white flex items-center justify-center gap-2 w-full rounded-full shadow-lg cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Yes, Delete Session</span>
              </button>

              <button
                onClick={() => setSessionToDelete(null)}
                className="btn-secondary py-3 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] w-full rounded-full cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
