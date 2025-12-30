import { useMemo } from 'react';
import { timelineData, categories, TimePoint, CategoryData } from '@/data/barChartData';
import {
  interpolateValues,
  getCurrentTimePoint,
  InterpolatedBar,
} from '@/utils/barChartUtils';

interface UseTimelineDataReturn {
  bars: InterpolatedBar[];
  currentTime: { month: string; year: number };
  totalValue: number;
  maxValue: number;
  data: TimePoint[];
  categories: CategoryData[];
}

export function useTimelineData(progress: number): UseTimelineDataReturn {
  const bars = useMemo(
    () => interpolateValues(timelineData, progress, categories),
    [progress]
  );

  const currentTime = useMemo(
    () => getCurrentTimePoint(timelineData, progress),
    [progress]
  );

  const totalValue = useMemo(
    () => bars.find((b) => b.id === 'stipendio_netto')?.value || 0,
    [bars]
  );

  const maxValue = useMemo(() => Math.max(...bars.map((b) => b.value)), [bars]);

  return {
    bars,
    currentTime,
    totalValue,
    maxValue,
    data: timelineData,
    categories,
  };
}
