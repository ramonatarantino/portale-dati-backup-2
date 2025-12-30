import { useBarChartRace } from '@/hooks/useBarChartRace';
import { useTimelineData } from '@/hooks/useTimelineData';
import { TimeDisplay } from './TimeDisplay';
import { AnimatedBar } from './AnimatedBar';
import { TimelineChart } from './TimelineChart';
import { useEffect } from 'react';
import { Badge } from '@/components/ui/badge';

const BAR_HEIGHT = 32;
const BAR_GAP = 4;

export function BarChartRace() {
  const {
    progress,
    play,
    seekTo,
  } = useBarChartRace({ duration: 15000, initialSpeed: 1 });

  const { bars, currentTime, maxValue, data, categories } =
    useTimelineData(progress);

  // Auto-play on mount and loop
  useEffect(() => {
    play();
  }, [play]);

  // Loop when finished
  useEffect(() => {
    if (progress >= 1) {
      const timeout = setTimeout(() => {
        seekTo(0);
        play();
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [progress, seekTo, play]);

  const chartHeight = bars.length * (BAR_HEIGHT + BAR_GAP);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6">
      <div className="text-center mb-12">
        <Badge className="bg-primary/20 text-primary hover:bg-primary/30 mb-4">
          Grafici Interattivi
        </Badge>
        <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
          I dati prendono forma 
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Interagisci con i grafici e approfondisci i dati passo dopo passo, per una lettura chiara e immediata.
        </p>
      </div>
      <div
        className="relative bg-card rounded-lg border border-border p-4 md:p-6 mb-6 overflow-hidden"
        style={{ height: `${chartHeight + 120}px` }}
      >
        {bars.map((bar) => (
          <AnimatedBar
            key={bar.id}
            label={bar.label}
            value={bar.value}
            color={bar.color}
            rank={bar.rank}
            maxValue={maxValue}
            barHeight={BAR_HEIGHT}
            gap={BAR_GAP}
          />
        ))}
        
        <TimeDisplay
          month={currentTime.month}
          year={currentTime.year}
        />
      </div>

      <TimelineChart
        data={data}
        categories={categories}
        progress={progress}
        onSeek={seekTo}
      />
    </div>
  );
}
