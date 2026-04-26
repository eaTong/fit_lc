import { useState, useRef, useCallback, useEffect } from 'react';
import { voiceApi } from '../api/voice';
import { chatApi } from '../api/chat';

export type VoiceRecordStatus = 'idle' | 'recording' | 'processing' | 'success' | 'partial' | 'failed';

interface UseVoiceRecordReturn {
  status: VoiceRecordStatus;
  transcribedText: string;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<void>;
  reset: () => void;
}

export function useVoiceRecord(): UseVoiceRecordReturn {
  const [status, setStatus] = useState<VoiceRecordStatus>('idle');
  const [transcribedText, setTranscribedText] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  // Cleanup function to stop recording and release resources
  const cleanup = useCallback(() => {
    const mediaRecorder = mediaRecorderRef.current;
    if (mediaRecorder) {
      // Clear event handlers
      mediaRecorder.ondataavailable = null;
      mediaRecorder.onstop = null;
      // Stop if recording
      if (mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
      }
    }
    // Stop all tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    mediaRecorderRef.current = null;
    audioChunksRef.current = [];
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  const startRecording = useCallback(async () => {
    try {
      // Clean up any existing recording
      cleanup();

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start();
      setStatus('recording');
    } catch (err) {
      console.error('Failed to start recording:', err);
      setStatus('failed');
    }
  }, [cleanup]);

  const stopRecording = useCallback(async () => {
    const mediaRecorder = mediaRecorderRef.current;
    if (!mediaRecorder || mediaRecorder.state === 'inactive') {
      return;
    }

    // Attach onstop handler BEFORE calling stop() to avoid race condition
    await new Promise<void>((resolve) => {
      mediaRecorder.onstop = () => resolve();
      if (mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
      }
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    });

    setStatus('processing');

    // Convert chunks to blob
    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });

    try {
      // Step 1: Transcribe
      const transcribeResult = await voiceApi.transcribe(audioBlob);

      if (!transcribeResult.success || !transcribeResult.text) {
        setStatus('failed');
        return;
      }

      const text = transcribeResult.text.trim();
      setTranscribedText(text);

      if (!text) {
        setStatus('failed');
        return;
      }

      // Step 2: Send to chat API
      const { savedData } = await chatApi.sendMessage(text, []);

      // Step 3: Determine status based on savedData
      if (savedData) {
        setStatus('success');
      } else {
        setStatus('partial');
      }
    } catch (err) {
      console.error('Voice record error:', err);
      setStatus('failed');
    }
  }, []);

  const reset = useCallback(() => {
    cleanup();
    setStatus('idle');
    setTranscribedText('');
  }, [cleanup]);

  return {
    status,
    transcribedText,
    startRecording,
    stopRecording,
    reset,
  };
}
