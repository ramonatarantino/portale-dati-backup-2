import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface PlaybackControlsProps {
  isPlaying: boolean;
  progress: number;
  speed: number;
  onToggle: () => void;
  onReset: () => void;
  onSeek: (value: number) => void;
  onSpeedChange: (value: number) => void;
}

export function PlaybackControls({
  isPlaying,
  progress,
  speed,
  onToggle,
  onReset,
  onSeek,
  onSpeedChange,
}: PlaybackControlsProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-4 space-y-4">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={onToggle}
          className="h-12 w-12"
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onReset}
          className="h-10 w-10"
        >
          <RotateCcw className="h-5 w-5" />
        </Button>

        <div className="flex-1">
          <Slider
            value={[progress * 100]}
            onValueChange={(v) => onSeek(v[0] / 100)}
            max={100}
            step={0.1}
            className="cursor-pointer"
          />
        </div>

        <div className="flex items-center gap-2 min-w-32">
          <span className="text-sm text-muted-foreground">Velocità:</span>
          <select
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className="bg-background border border-input rounded-md px-2 py-1 text-sm"
          >
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
            <option value={3}>3x</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Gennaio 2024</span>
        <span>{Math.round(progress * 100)}%</span>
        <span>Dicembre 2024</span>
      </div>
    </div>
  );
}
