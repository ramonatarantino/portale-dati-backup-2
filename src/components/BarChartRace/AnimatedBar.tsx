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
}

export function AnimatedBar({
  label,
  value,
  color,
  rank,
  maxValue,
  barHeight = 36,
  gap = 6,
}: AnimatedBarProps) {
  const widthPercentage = (value / maxValue) * 100;
  const translateY = rank * (barHeight + gap);
  const prevRankRef = useRef(rank);
  const prevValueRef = useRef(value);
  const [isOvertaking, setIsOvertaking] = useState(false);
  const [isGrowing, setIsGrowing] = useState(false);

  useEffect(() => {
    if (rank < prevRankRef.current) {
      setIsOvertaking(true);
      const timeout = setTimeout(() => setIsOvertaking(false), 800);
      prevRankRef.current = rank;
      return () => clearTimeout(timeout);
    }
    prevRankRef.current = rank;
  }, [rank]);

  useEffect(() => {
    if (value > prevValueRef.current * 1.005) {
      setIsGrowing(true);
      const timeout = setTimeout(() => setIsGrowing(false), 150);
      return () => clearTimeout(timeout);
    }
    prevValueRef.current = value;
  }, [value]);

  // Determine if this is a dark or light color for text contrast
  const isLightColor = color.startsWith('#D') || color.startsWith('#E') || color.startsWith('#F');
  const textColor = isLightColor ? '#333333' : '#ffffff';

  return (
    <div
      className="absolute left-0 right-0 flex items-center gap-3"
      style={{
        transform: `translateY(${translateY}px)`,
        height: `${barHeight}px`,
        transition: 'transform 300ms cubic-bezier(0.25, 0.1, 0.25, 1)',
      }}
    >
      <div 
        className="w-36 md:w-44 text-sm font-medium text-foreground truncate text-right"
      >
        {label}
      </div>
      <div className="flex-1 flex items-center gap-3 relative">
        {/* Overtaking highlight glow */}
        {isOvertaking && (
          <div
            className="absolute h-10 rounded-r-sm blur-lg"
            style={{
              width: `${Math.max(widthPercentage + 5, 5)}%`,
              backgroundColor: '#FFD700',
              opacity: 0.7,
              animation: 'pulse-glow 0.8s ease-out',
              zIndex: 10,
            }}
          />
        )}
        {/* Main bar */}
        <div
          className="h-7 rounded-r-sm relative overflow-hidden flex items-center justify-end pr-3"
          style={{
            width: `${Math.max(widthPercentage, 3)}%`,
            backgroundColor: color,
            transition: 'width 50ms linear, transform 150ms ease-out',
            transform: isOvertaking ? 'scaleY(1.15) scaleX(1.02)' : isGrowing ? 'scaleY(1.05)' : 'scaleY(1)',
            boxShadow: isOvertaking 
              ? `0 0 25px ${color}, 0 0 50px #FFD70080` 
              : `0 1px 4px ${color}30`,
            zIndex: isOvertaking ? 20 : 1,
          }}
        >
          {/* Shimmer effect */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{
              animation: 'shimmer 2s infinite',
              transform: 'skewX(-20deg)',
            }}
          />
          {/* Overtaking flash effect */}
          {isOvertaking && (
            <div 
              className="absolute inset-0 bg-gradient-to-r from-white/50 via-yellow-300/40 to-transparent"
              style={{
                animation: 'fade-out 0.8s ease-out forwards',
              }}
            />
          )}
        </div>
        <span
          className="text-sm font-bold min-w-24 tabular-nums"
          style={{ 
            color,
            transition: 'color 300ms ease',
          }}
        >
          {formatNumber(Math.round(value))}
        </span>
      </div>
    </div>
  );
}
