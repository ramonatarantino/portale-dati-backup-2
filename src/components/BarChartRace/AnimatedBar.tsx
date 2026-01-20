import { formatNumber } from '@/utils/barChartUtils';
import { useRef, useEffect, useState } from 'react';

interface AnimatedBarProps {
  label: string;
  value: number;
  color: string;
  rank: number;
  maxValue: number;
  barHeight?: number;
  gap?: number;
  sigla?: string;
  siglaColor?: string;
}

export function AnimatedBar({
  label,
  value,
  color,
  rank,
  maxValue,
  barHeight = 28,
  gap = 3,
  sigla,
  siglaColor,
}: AnimatedBarProps) {
  const widthPercentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
  const hasValue = value > 0;
  const translateY = rank * (barHeight + gap);
  const prevRankRef = useRef(rank);
  const [isOvertaking, setIsOvertaking] = useState(false);

  // Detect overtaking
  useEffect(() => {
    if (rank < prevRankRef.current) {
      setIsOvertaking(true);
      const timeout = setTimeout(() => setIsOvertaking(false), 600);
      prevRankRef.current = rank;
      return () => clearTimeout(timeout);
    }
    prevRankRef.current = rank;
  }, [rank]);

  return (
    <div
      className="absolute left-0 right-0 flex items-center gap-2"
      style={{
        transform: `translateY(${translateY}px)`,
        height: `${barHeight}px`,
        // No CSS transition - updates are already smooth at 60fps from requestAnimationFrame
      }}
    >
      {/* Label with sigla */}
      <div className="w-36 md:w-44 flex items-center justify-end gap-1 pr-1">
        {sigla && (
          <span 
            className="text-[10px] font-semibold px-1.5 py-0.5 rounded text-white"
            style={{ 
              backgroundColor: siglaColor || color,
            }}
          >
            {sigla}
          </span>
        )}
        <span className="text-xs font-medium text-foreground truncate">
          {label}
        </span>
      </div>
      
      <div className="flex-1 flex items-center gap-2 relative">
        {/* Main bar */}
        <div
          className="h-5 rounded-r-sm relative overflow-hidden flex items-center"
          style={{
            // Linear mapping (value -> % width) + tiny pixel minimum for visibility.
            // This keeps ordering coherent: if A > B then bar(A) is never shorter/invisible than bar(B).
            width: `${widthPercentage}%`,
            minWidth: hasValue ? 3 : 0,
            backgroundColor: color,
            transform: isOvertaking 
              ? 'scaleY(1.05)'
              : 'scaleY(1)',
            transition: 'transform 150ms ease-out',
            boxShadow: `0 1px 3px ${color}30`,
            zIndex: isOvertaking ? 2 : 1,
          }}
        >
        </div>
        
        {/* Value display */}
        <span
          className="text-xs font-bold min-w-20 tabular-nums whitespace-nowrap"
          style={{ 
            color,
            transition: 'color 200ms ease',
          }}
        >
          {formatNumber(Math.round(value))}
        </span>
      </div>
    </div>
  );
}
