import { useMemo } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  LineChart,
} from 'recharts';
import { TimePoint, amministrazioni, tipiSpesa, spesaColorMap } from '@/data/barChartData';

interface TimelineChartProps {
  data: TimePoint[];
  selectedAmministrazioni: string[];
  progress: number;
  onSeek?: (progress: number) => void;
}

// Phase constants
const INITIAL_PHASE_END = 0.02;

// Ultra-smooth cubic easing
const smoothEase = (t: number) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};


// Ultra-smooth interpolation
const smoothLerp = (a: number, b: number, t: number) => {
  const smoothT = smoothEase(t);
  return a + (b - a) * smoothT;
};

interface LineConfig {
  id: string;
  name: string;
  color: string;
  ammId: string;
  spesa: string;
}

export function TimelineChart({
  data,
  selectedAmministrazioni,
  progress,
  onSeek,
}: TimelineChartProps) {
  // Generate line configurations for ALL spese of selected amministrazioni
  const lineConfigs = useMemo(() => {
    const configs: LineConfig[] = [];
    selectedAmministrazioni.forEach((ammId) => {
      const amm = amministrazioni.find(a => a.id === ammId);
      if (!amm) return;
      
      // All expense types for each amministrazione
      tipiSpesa.forEach((spesa) => {
        configs.push({
          id: `${ammId}-${spesa}`,
          name: `${amm.label.split(' ').slice(-1)[0]} - ${spesa}`,
          color: spesaColorMap[spesa] || '#4A80D8',
          ammId,
          spesa,
        });
      });
    });
    return configs;
  }, [selectedAmministrazioni]);

  // Create smooth progressive data with interpolated points between months
  const chartData = useMemo(() => {
    const isInitialPhase = progress < INITIAL_PHASE_END;
    
    // Effective timeline progress (0 during initial phase, then 0..1)
    const effectiveProgress = isInitialPhase 
      ? 0 
      : (progress - INITIAL_PHASE_END) / (1 - INITIAL_PHASE_END);
    
    // Initial growth multiplier (0 to 1 during first 2%) - ultra-smooth quintic
    const initialGrowth = isInitialPhase
      ? smoothEase(smoothEase(progress / INITIAL_PHASE_END))
      : 1;
    
    // Calculate the exact position in the timeline (continuous float)
    const totalMonths = data.length - 1;
    const exactPosition = effectiveProgress * totalMonths;
    const currentMonthIndex = Math.floor(exactPosition);
    const monthFraction = exactPosition - currentMonthIndex;
    
    // Apply easing for smoother transitions
    const easedFraction = smoothEase(monthFraction);

    // Generate interpolated data points - add synthetic intermediate points
    const result: Record<string, string | number | null>[] = [];
    
    data.forEach((point, i) => {
      const entry: Record<string, string | number | null> = {
        name: `${point.month.substring(0, 3)} ${point.year.toString().slice(-2)}`,
        index: i,
      };

      lineConfigs.forEach((config) => {
        const { ammId, spesa } = config;
        const baseValue = point.values[ammId]?.[spesa] || 0;
        
        if (i === 0) {
          // First month: apply initial growth during ramp phase
          entry[config.id] = baseValue * initialGrowth;
        } else if (i < currentMonthIndex) {
          // Past months - fully revealed
          entry[config.id] = baseValue;
        } else if (i === currentMonthIndex) {
          // Current month - fully revealed
          entry[config.id] = baseValue;
        } else if (i === currentMonthIndex + 1) {
          // Next month - smoothly interpolate
          const prevPoint = data[i - 1];
          const prevValue = prevPoint.values[ammId]?.[spesa] || 0;
          entry[config.id] = smoothLerp(prevValue, baseValue, easedFraction);
        } else {
          // Future - null (not yet reached)
          entry[config.id] = null;
        }
      });

      result.push(entry);
    });

    return result;
  }, [data, lineConfigs, progress]);

  if (selectedAmministrazioni.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-4 mt-6 text-center text-muted-foreground">
        Seleziona almeno un'amministrazione per visualizzare il grafico
      </div>
    );
  }

  // Handle click on chart to seek
  const handleChartClick = (e: { activeLabel?: string; activeTooltipIndex?: number }) => {
    if (onSeek && e.activeTooltipIndex !== undefined && data.length > 1) {
      const monthIndex = e.activeTooltipIndex;
      // Convert month index to progress (after initial phase)
      const effectiveProgress = monthIndex / (data.length - 1);
      const newProgress = INITIAL_PHASE_END + effectiveProgress * (1 - INITIAL_PHASE_END);
      onSeek(Math.min(Math.max(newProgress, 0), 1));
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 mt-6">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">
        Andamento nel tempo - Tutte le voci ({lineConfigs.length} serie)
        {onSeek && <span className="ml-2 text-xs opacity-60">(clicca per navigare)</span>}
      </h3>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={chartData} onClick={handleChartClick} style={{ cursor: onSeek ? 'pointer' : 'default' }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis
            dataKey="name"
            stroke="hsl(var(--muted-foreground))"
            fontSize={10}
            interval={0}
            angle={-45}
            textAnchor="end"
            height={50}
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={11}
            tickFormatter={(value) => `€${(value / 1000000).toFixed(0)}M`}
            width={55}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              fontSize: '11px',
              maxHeight: '300px',
              overflow: 'auto',
            }}
            formatter={(value: number | null, name: string) => {
              if (value === null) return ['', ''];
              const config = lineConfigs.find(c => c.id === name);
              return [`€${(value / 1000000).toFixed(2)}M`, config?.name || name];
            }}
          />
          {lineConfigs.map((config) => (
            <Line
              key={config.id}
              type="monotone"
              dataKey={config.id}
              stroke={config.color}
              strokeWidth={1.5}
              dot={false}
              name={config.id}
              isAnimationActive={false}
              connectNulls={false}
              strokeOpacity={0.75}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      
      {/* Mini legend for spese colors */}
      <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-border">
        {tipiSpesa.map((spesa) => (
          <div key={spesa} className="flex items-center gap-1.5 text-xs">
            <span 
              className="w-3 h-2 rounded-sm" 
              style={{ backgroundColor: spesaColorMap[spesa] }}
            />
            <span className="text-muted-foreground">{spesa}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
