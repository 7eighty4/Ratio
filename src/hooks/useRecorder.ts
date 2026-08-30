import { useState, useCallback, useRef } from 'react';

export interface UseRecorderResult {
  isRecording: boolean;
  audioBlob: Blob | null;
  audioUrl: string | null;
  audioLevels: number[];
  permissionError: string | null;
  isMicAvailable: boolean;
  startRecording: () => Promise<boolean>;
  stopRecording: () => Promise<Blob | null>;
  clearRecording: () => void;
}

export function useRecorder(): UseRecorderResult {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioLevels, setAudioLevels] = useState<number[]>(new Array(30).fill(5));
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [isMicAvailable, setIsMicAvailable] = useState<boolean>(true);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const cleanupAudioNodes = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
  };

  const startRecording = useCallback(async (): Promise<boolean> => {
    setPermissionError(null);
    audioChunksRef.current = [];
    setAudioBlob(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setPermissionError('Microphone recording is not supported in this browser.');
      setIsMicAvailable(false);
      return false;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      setIsMicAvailable(true);

      // Web Audio API setup for live visualizer
      const AudioContextClass =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      audioContextRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      analyserRef.current = analyser;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateLevels = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        
        // Pick 30 sample bars from frequency data
        const samples: number[] = [];
        const step = Math.floor(dataArray.length / 30) || 1;
        for (let i = 0; i < 30; i++) {
          const val = dataArray[i * step] || 0;
          // Scale 0-255 to percentage 5-100%
          const pct = Math.max(8, Math.min(100, (val / 255) * 100));
          samples.push(pct);
        }
        setAudioLevels(samples);
        animationFrameRef.current = requestAnimationFrame(updateLevels);
      };
      updateLevels();

      // MediaRecorder setup
      const options = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? { mimeType: 'audio/webm;codecs=opus' }
        : MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')
        ? { mimeType: 'audio/ogg;codecs=opus' }
        : undefined;

      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start(100);
      setIsRecording(true);
      return true;
    } catch (err: unknown) {
      console.warn('Microphone access denied or error:', err);
      const errorMsg =
        err instanceof Error && err.name === 'NotAllowedError'
          ? 'Microphone permission denied. You can still practice speaking without recording.'
          : 'Could not access microphone. Speaker practice will proceed without recording.';
      setPermissionError(errorMsg);
      setIsMicAvailable(false);
      setIsRecording(false);
      return false;
    }
  }, [audioUrl]);

  const stopRecording = useCallback((): Promise<Blob | null> => {
    return new Promise((resolve) => {
      if (!mediaRecorderRef.current || mediaRecorderRef.current.state === 'inactive') {
        cleanupAudioNodes();
        setIsRecording(false);
        resolve(null);
        return;
      }

      mediaRecorderRef.current.onstop = () => {
        const mimeType = mediaRecorderRef.current?.mimeType || 'audio/webm';
        const blob = new Blob(audioChunksRef.current, { type: mimeType });
        const url = URL.createObjectURL(blob);

        setAudioBlob(blob);
        setAudioUrl(url);
        setIsRecording(false);
        cleanupAudioNodes();
        resolve(blob);
      };

      mediaRecorderRef.current.stop();
    });
  }, []);

  const clearRecording = useCallback(() => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioBlob(null);
    setAudioUrl(null);
    cleanupAudioNodes();
  }, [audioUrl]);

  return {
    isRecording,
    audioBlob,
    audioUrl,
    audioLevels,
    permissionError,
    isMicAvailable,
    startRecording,
    stopRecording,
    clearRecording
  };
}
