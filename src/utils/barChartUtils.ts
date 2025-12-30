import { TimePoint, CategoryData } from '@/data/barChartData';

export interface InterpolatedBar {
  id: string;
  label: string;
  value: number;
  color: string;
  rank: number;
}

export function interpolateValues(
  data: TimePoint[],
  progress: number,
  categories: CategoryData[]
): InterpolatedBar[] {
  const totalFrames = data.length - 1;
  const currentFrame = progress * totalFrames;
  const frameIndex = Math.floor(currentFrame);
  const frameFraction = currentFrame - frameIndex;

  const currentData = data[Math.min(frameIndex, data.length - 1)];
  const nextData = data[Math.min(frameIndex + 1, data.length - 1)];

  const interpolatedValues = categories.map((cat) => {
    const currentValue = currentData.values[cat.id] || 0;
    const nextValue = nextData.values[cat.id] || 0;
    const value = currentValue + (nextValue - currentValue) * frameFraction;

    return {
      id: cat.id,
      label: cat.label,
      value,
      color: cat.color,
      rank: 0,
    };
  });

  // Sort by value descending and assign ranks
  interpolatedValues.sort((a, b) => b.value - a.value);
  interpolatedValues.forEach((item, index) => {
    item.rank = index;
  });

  return interpolatedValues;
}

export function getCurrentTimePoint(
  data: TimePoint[],
  progress: number
): { month: string; year: number } {
  const index = Math.floor(progress * (data.length - 1));
  const safeIndex = Math.min(index, data.length - 1);
  return {
    month: data[safeIndex].month,
    year: data[safeIndex].year,
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('it-IT', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
