import { useState, useEffect, useCallback } from 'react';
import type { Session } from '../types';
import {
  getAllSessionsFromDB,
  saveSessionToDB,
  deleteSessionFromDB,
  clearAllSessionsFromDB
} from '../services/db';

export function useSessionHistory() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadSessions = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getAllSessionsFromDB();
      setSessions(data);
    } catch (e) {
      console.error('Failed to load session history from IndexedDB:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  const saveSession = useCallback(async (session: Session) => {
    try {
      await saveSessionToDB(session);
      setSessions((prev) => [session, ...prev.filter((s) => s.id !== session.id)]);
    } catch (e) {
      console.error('Failed to save session to IndexedDB:', e);
    }
  }, []);

  const deleteSession = useCallback(async (id: string) => {
    // Instantly remove from local React state for instantaneous UI responsiveness
    setSessions((prev) => prev.filter((s) => s.id !== id));
    try {
      await deleteSessionFromDB(id);
    } catch (e) {
      console.error('Failed to delete session from IndexedDB:', e);
    }
  }, []);

  const clearHistory = useCallback(async () => {
    try {
      await clearAllSessionsFromDB();
      setSessions([]);
    } catch (e) {
      console.error('Failed to clear history from IndexedDB:', e);
    }
  }, []);

  return {
    sessions,
    isLoading,
    loadSessions,
    saveSession,
    deleteSession,
    clearHistory
  };
}
