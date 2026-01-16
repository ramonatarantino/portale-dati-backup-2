import { TimePoint, amministrazioni, tipiSpesa, spesaColorMap } from '@/data/barChartData';

export interface InterpolatedBar {
  id: string;
  label: string;
  value: number;
  color: string;
  rank: number;
  amministrazioneId: string;
  sigla: string;
  siglaColor: string;
}

// Ultra-smooth cubic easing
const smoothEase = (t: number) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

// Quintic easing for bar growth - slower initial growth
const quinticEase = (t: number) => {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
};

// Smooth cubic easing for initial ramp-up (gradual, no jumps)
const initialRampEase = (t: number) => {
  // Cubic ease-in-out for smooth gradual growth
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export function interpolateValues(
  data: TimePoint[],
  progress: number,
  selectedAmministrazioni: string[],
  selectedTipiSpesa: string[] = [...tipiSpesa]
): InterpolatedBar[] {
  if (data.length === 0 || selectedAmministrazioni.length === 0 || selectedTipiSpesa.length === 0) return [];
  
  // Phase 1: 0-0% = initial ramp (bars grow from 0 to first month value, time stays at month 0)
  // Phase 2: 0%-100% = normal timeline progression
  const INITIAL_PHASE_END = 0;
  
  const isInitialPhase = progress < INITIAL_PHASE_END;
  
  // During initial phase, time stays at 0; after, time progresses normally
  const effectiveProgress = isInitialPhase 
    ? 0 
    : (progress - INITIAL_PHASE_END) / (1 - INITIAL_PHASE_END);
  
  // Micro-steps for smooth interpolation (300 steps per month)
  const microStepsPerMonth = 300;
  const totalMicroSteps = (data.length - 1) * microStepsPerMonth;
  const currentMicroStep = effectiveProgress * totalMicroSteps;
  
  const monthIndex = Math.floor(currentMicroStep / microStepsPerMonth);
  const microFraction = (currentMicroStep % microStepsPerMonth) / microStepsPerMonth;
  
  const frameIndex = Math.min(monthIndex, data.length - 1);
  const nextFrameIndex = Math.min(frameIndex + 1, data.length - 1);
  
  const currentData = data[frameIndex];
  const nextData = data[nextFrameIndex];
  
  const easedFraction = smoothEase(microFraction);
  
  // Initial ramp: during first 8%, bars grow from 0 to first month value
  // Uses exponential easing for dramatic ramp-up effect
  const initialGrowth = isInitialPhase 
    ? initialRampEase(progress / INITIAL_PHASE_END)
    : 1;

  const interpolatedValues: InterpolatedBar[] = [];

  selectedAmministrazioni.forEach((ammId) => {
    const amm = amministrazioni.find(a => a.id === ammId);
    if (!amm) return;

    // Filter by selected expense types
    const filteredTipiSpesa = tipiSpesa.filter(spesa => selectedTipiSpesa.includes(spesa));

    filteredTipiSpesa.forEach((spesa) => {
      const currentValue = currentData.values[ammId]?.[spesa] || 0;
      const nextValue = nextData.values[ammId]?.[spesa] || 0;
      const rawValue = currentValue + (nextValue - currentValue) * easedFraction;
      const value = rawValue * initialGrowth;

      interpolatedValues.push({
        id: `${ammId}-${spesa}`,
        label: spesa,
        value,
        color: spesaColorMap[spesa] || '#4A80D8',
        rank: 0,
        amministrazioneId: ammId,
        sigla: amm.sigla,
        siglaColor: amm.color,
      });
    });
  });

  // Always sort by value (descending) - this allows overtakes during initial growth
  // Use id as tiebreaker for stable sorting when values are equal
  interpolatedValues.sort((a, b) => {
    const diff = b.value - a.value;
    if (Math.abs(diff) < 0.01) {
      return a.id.localeCompare(b.id);
    }
    return diff;
  });
  
  interpolatedValues.forEach((item, index) => {
    item.rank = index;
  });

  return interpolatedValues;
}

export function getCurrentTimePoint(
  data: TimePoint[],
  progress: number
): { month: string; year: number } {
  if (data.length === 0) return { month: '', year: 0 };
  
  // During initial phase (0-0%), stay at first month
  const INITIAL_PHASE_END = 0;
  const effectiveProgress = progress < INITIAL_PHASE_END
    ? 0 
    : (progress - INITIAL_PHASE_END) / (1 - INITIAL_PHASE_END);
  
  const index = Math.floor(effectiveProgress * (data.length - 1));
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
