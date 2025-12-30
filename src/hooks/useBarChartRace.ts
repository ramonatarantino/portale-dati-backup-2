import { useState, useCallback, useRef, useEffect } from 'react';

interface UseBarChartRaceOptions {
  duration?: number; // Total animation duration in ms
  initialSpeed?: number;
}

interface UseBarChartRaceReturn {
  isPlaying: boolean;
  progress: number;
  speed: number;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  setSpeed: (speed: number) => void;
  seekTo: (progress: number) => void;
  reset: () => void;
}

export function useBarChartRace(
  options: UseBarChartRaceOptions = {}
): UseBarChartRaceReturn {
  const { duration = 10000, initialSpeed = 1 } = options;

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(initialSpeed);

  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const animate = useCallback(
    (timestamp: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }

      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      setProgress((prev) => {
        const increment = (deltaTime / duration) * speed;
        const newProgress = prev + increment;

        if (newProgress >= 1) {
          setIsPlaying(false);
          return 1;
        }

        return newProgress;
      });

      animationRef.current = requestAnimationFrame(animate);
    },
    [duration, speed]
  );

  useEffect(() => {
    if (isPlaying) {
      lastTimeRef.current = 0;
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, animate]);

  const play = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const seekTo = useCallback((newProgress: number) => {
    setProgress(Math.max(0, Math.min(1, newProgress)));
  }, []);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setProgress(0);
  }, []);

  return {
    isPlaying,
    progress,
    speed,
    play,
    pause,
    toggle,
    setSpeed,
    seekTo,
    reset,
  };
}
