import { useMemo } from 'react';
import { timelineData, TimePoint, amministrazioni, tipiSpesa } from '@/data/barChartData';
import {
  interpolateValues,
  getCurrentTimePoint,
  InterpolatedBar,
} from '@/utils/barChartUtils';

interface UseTimelineDataOptions {
  selectedAnni: number[];
  selectedAmministrazioni: string[];
  selectedTipiSpesa: string[];
}

interface UseTimelineDataReturn {
  bars: InterpolatedBar[];
  currentTime: { month: string; year: number };
  totalValue: number;
  maxValue: number;
  data: TimePoint[];
}

// Smoothstep easing (0..1 -> 0..1) - smooth blend with zero slope at ends
const smoothStep = (t: number): number => t * t * (3 - 2 * t);

export function useTimelineData(
  progress: number,
  options: UseTimelineDataOptions = {
    selectedAnni: [],
    selectedAmministrazioni: amministrazioni.map(a => a.id),
    selectedTipiSpesa: [...tipiSpesa],
  }
): UseTimelineDataReturn {
  const { selectedAnni, selectedAmministrazioni, selectedTipiSpesa } = options;

  // Filter data by years (empty array = all years)
  const filteredData = useMemo(() => {
    if (selectedAnni.length === 0) return timelineData;
    return timelineData.filter((point) => selectedAnni.includes(point.year));
  }, [selectedAnni]);

  const bars = useMemo(
    () => interpolateValues(filteredData, progress, selectedAmministrazioni, selectedTipiSpesa),
    [progress, filteredData, selectedAmministrazioni, selectedTipiSpesa]
  );

  const currentTime = useMemo(
    () => getCurrentTimePoint(filteredData, progress),
    [filteredData, progress]
  );

  const totalValue = useMemo(
    () => bars.reduce((acc, b) => acc + b.value, 0),
    [bars]
  );

  // Dynamic max (current frame): makes bars readable (not too tiny)
  const dynamicMaxValue = useMemo(() => {
    if (bars.length === 0) return 1;
    const m = Math.max(...bars.map((b) => b.value));
    return m > 0 ? m : 1;
  }, [bars]);

  // Global max (whole selected range): allows bars to visibly grow from 0 in the intro phase
  const globalMaxValue = useMemo(() => {
    if (filteredData.length === 0 || selectedAmministrazioni.length === 0) return 1;

    let globalMax = 0;
    filteredData.forEach((point) => {
      selectedAmministrazioni.forEach((ammId) => {
        const ammValues = point.values[ammId];
        if (!ammValues) return;
        Object.values(ammValues).forEach((val) => {
          if (val > globalMax) globalMax = val;
        });
      });
    });

    return globalMax > 0 ? globalMax : 1;
  }, [filteredData, selectedAmministrazioni]);

  // Blend scale from global -> dynamic after the initial ramp, avoiding a “jump” at the first month.
  const maxValue = useMemo(() => {
    const INITIAL_PHASE_END = 0;
    const BLEND_DURATION = 0.10; // 10% of the animation to smoothly switch scaling

    if (progress <= INITIAL_PHASE_END) return globalMaxValue;

    const tRaw = (progress - INITIAL_PHASE_END) / BLEND_DURATION;
    const t = Math.max(0, Math.min(1, tRaw));
    const blend = smoothStep(t);

    const blendedMax = globalMaxValue * (1 - blend) + dynamicMaxValue * blend;
    return blendedMax > 0 ? blendedMax : 1;
  }, [progress, globalMaxValue, dynamicMaxValue]);

  return {
    bars,
    currentTime,
    totalValue,
    maxValue,
    data: filteredData,
  };
}
