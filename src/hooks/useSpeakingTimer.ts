import { useState, useEffect, useCallback, useRef } from 'react';

interface UseSpeakingTimerProps {
  maxSeconds?: number; // default 60
  onComplete?: (actualDurationSeconds: number) => void;
}

export function useSpeakingTimer({
  maxSeconds = 60,
  onComplete
}: UseSpeakingTimerProps = {}) {
  const [secondsLeft, setSecondsLeft] = useState<number>(maxSeconds);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  const startTimeRef = useRef<number | null>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const startSpeakingTimer = useCallback(() => {
    startTimeRef.current = Date.now();
    setSecondsLeft(maxSeconds);
    setElapsedSeconds(0);
    setIsActive(true);
  }, [maxSeconds]);

  const stopSpeakingTimer = useCallback(() => {
    if (!isActive) return elapsedSeconds;

    const now = Date.now();
    const actualElapsed = startTimeRef.current
      ? Math.min(maxSeconds, Math.round((now - startTimeRef.current) / 1000))
      : elapsedSeconds;

    setIsActive(false);
    setElapsedSeconds(actualElapsed);
    return actualElapsed;
  }, [isActive, elapsedSeconds, maxSeconds]);

  useEffect(() => {
    if (!isActive || !startTimeRef.current) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.min(maxSeconds, Math.floor((now - startTimeRef.current!) / 1000));
      const remaining = Math.max(0, maxSeconds - elapsed);

      setElapsedSeconds(elapsed);
      setSecondsLeft(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        setIsActive(false);
        if (onCompleteRef.current) {
          onCompleteRef.current(maxSeconds);
        }
      }
    }, 200);

    return () => clearInterval(interval);
  }, [isActive, maxSeconds]);

  const formattedTime = `00:${secondsLeft.toString().padStart(2, '0')}`;

  return {
    secondsLeft,
    elapsedSeconds,
    formattedTime,
    isActive,
    startSpeakingTimer,
    stopSpeakingTimer
  };
}
