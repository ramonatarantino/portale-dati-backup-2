import { useCountUp } from "@/hooks/useCountUp";
import { useInView } from "@/hooks/useInView";
import { useEffect, useState } from "react";

interface CountUpNumberProps {
  value: number;
  unit: string;
  description: string;
  subtitle?: string;
}

export function CountUpNumber({ value, unit, description, subtitle }: CountUpNumberProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isInView && !shouldAnimate) {
      setShouldAnimate(true);
    }
  }, [isInView, shouldAnimate]);

  const { formattedCount } = useCountUp({
    end: value,
    duration: 2500,
    startOnMount: shouldAnimate,
    decimals: value < 100 ? 1 : 0,
  });

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center justify-center text-center transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="flex items-baseline gap-2">
        <span className="text-7xl font-light tracking-tight text-white tabular-nums">
          {shouldAnimate ? formattedCount : "0"}
        </span>
        {unit && (
          <span className="text-2xl font-light text-gray-200">
            {unit}
          </span>
        )}
      </div>
      <p className="mt-4 text-lg text-gray-200 max-w-xs leading-relaxed">
        {description}
      </p>
      {subtitle && (
        <p className="mt-2 text-sm font-medium text-yellow-400 uppercase tracking-wider">
          {subtitle}
        </p>
      )}
    </div>
  );
}
