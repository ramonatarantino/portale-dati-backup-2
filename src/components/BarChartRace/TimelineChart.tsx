import { useMemo } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { TimePoint, CategoryData } from '@/data/barChartData';

interface TimelineChartProps {
  data: TimePoint[];
  categories: CategoryData[];
  progress: number;
  onSeek: (progress: number) => void;
}

// Interpolate between two values
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function TimelineChart({
  data,
  categories,
  progress,
}: TimelineChartProps) {
  const chartCategories = categories.slice(0, 3);

  // Create data with all months visible, but values only up to current progress
  const chartData = useMemo(() => {
    const totalPoints = data.length;
    const currentPosition = progress * (totalPoints - 1);
    const currentIndex = Math.floor(currentPosition);
    const fraction = currentPosition - currentIndex;

    return data.map((point, i) => {
      const entry: Record<string, string | number | null> = {
        name: point.month.substring(0, 3),
        index: i,
      };

      if (i < currentIndex) {
        // Full data for past months
        chartCategories.forEach((cat) => {
          entry[cat.id] = point.values[cat.id] || 0;
        });
      } else if (i === currentIndex) {
        // Current month - full values
        chartCategories.forEach((cat) => {
          entry[cat.id] = point.values[cat.id] || 0;
        });
      } else if (i === currentIndex + 1 && fraction > 0) {
        // Next month - interpolated values
        const prevPoint = data[currentIndex];
        chartCategories.forEach((cat) => {
          const prevValue = prevPoint.values[cat.id] || 0;
          const currValue = point.values[cat.id] || 0;
          entry[cat.id] = lerp(prevValue, currValue, fraction);
        });
      } else {
        // Future months - null (no line drawn)
        chartCategories.forEach((cat) => {
          entry[cat.id] = null;
        });
      }

      return entry;
    });
  }, [data, chartCategories, progress]);

  return (
    <div className="bg-card rounded-lg border border-border p-4 mt-6">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">
        Andamento nel tempo
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={chartData}>
          <defs>
            {chartCategories.map((cat) => (
              <linearGradient key={`gradient-${cat.id}`} id={`gradient-${cat.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={cat.color} stopOpacity={0.6}/>
                <stop offset="95%" stopColor={cat.color} stopOpacity={0.1}/>
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
          <XAxis
            dataKey="name"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            interval={0}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickFormatter={(value) => `€${(value / 1000000).toFixed(0)}M`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
            formatter={(value: number | null) => value !== null ? [`€${(value / 1000000).toFixed(1)}M`, ''] : ['', '']}
          />
          {chartCategories.map((cat) => (
            <Area
              key={cat.id}
              type="monotone"
              dataKey={cat.id}
              stroke={cat.color}
              strokeWidth={3}
              fill={`url(#gradient-${cat.id})`}
              dot={false}
              name={cat.label}
              isAnimationActive={false}
              connectNulls={false}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
