import { useState, useEffect, useCallback, useRef } from 'react';

interface UseResearchTimerProps {
  initialSeconds?: number; // default 600
  onComplete?: () => void;
}

export function useResearchTimer({
  initialSeconds = 600,
  onComplete
}: UseResearchTimerProps = {}) {
  const [secondsLeft, setSecondsLeft] = useState<number>(initialSeconds);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const targetTimeRef = useRef<number | null>(null);
  const pausedTimeLeftRef = useRef<number>(initialSeconds);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Start or resume timer
  const startTimer = useCallback((duration: number = initialSeconds) => {
    const now = Date.now();
    targetTimeRef.current = now + duration * 1000;
    setSecondsLeft(duration);
    setIsActive(true);
    setIsPaused(false);
  }, [initialSeconds]);

  // Pause timer
  const pauseTimer = useCallback(() => {
    if (!isActive || isPaused) return;
    if (targetTimeRef.current) {
      const remaining = Math.max(0, Math.ceil((targetTimeRef.current - Date.now()) / 1000));
      pausedTimeLeftRef.current = remaining;
      setSecondsLeft(remaining);
    }
    setIsPaused(true);
  }, [isActive, isPaused]);

  // Resume timer from pause
  const resumeTimer = useCallback(() => {
    if (!isActive || !isPaused) return;
    const now = Date.now();
    targetTimeRef.current = now + pausedTimeLeftRef.current * 1000;
    setIsPaused(false);
  }, [isActive, isPaused]);

  // Reset timer
  const resetTimer = useCallback(() => {
    targetTimeRef.current = null;
    setSecondsLeft(initialSeconds);
    setIsActive(false);
    setIsPaused(false);
  }, [initialSeconds]);

  // Tick loop based on timestamp diff
  useEffect(() => {
    if (!isActive || isPaused || !targetTimeRef.current) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(0, Math.ceil((targetTimeRef.current! - now) / 1000));

      setSecondsLeft(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        setIsActive(false);
        setIsPaused(false);
        if (onCompleteRef.current) {
          onCompleteRef.current();
        }
      }
    }, 250); // Frequent tick for high accuracy

    return () => clearInterval(interval);
  }, [isActive, isPaused]);

  // Format mm:ss
  const formattedTime = `${Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, '0')}:${(secondsLeft % 60).toString().padStart(2, '0')}`;

  return {
    secondsLeft,
    formattedTime,
    isActive,
    isPaused,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer
  };
}
