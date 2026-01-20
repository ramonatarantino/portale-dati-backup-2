import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { PyramidData } from '@/data/demographicData';

interface PopulationPyramidProps {
  data: PyramidData[];
  isAnimating?: boolean;
}

export function PopulationPyramid({ data, isAnimating }: PopulationPyramidProps) {
  const chartData = useMemo(() => {
    return [...data].reverse().map(d => ({
      ...d,
      maleNegative: -d.male,
    }));
  }, [data]);

  const maxValue = useMemo(() => {
    return Math.max(
      ...data.map(d => Math.max(d.male, d.female))
    );
  }, [data]);

  const totalMale = data.reduce((sum, d) => sum + d.male, 0);
  const totalFemale = data.reduce((sum, d) => sum + d.female, 0);
  const total = totalMale + totalFemale;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const maleValue = Math.abs(payload.find((p: any) => p.dataKey === 'maleNegative')?.value || 0);
      const femaleValue = payload.find((p: any) => p.dataKey === 'female')?.value || 0;
      
      return (
        <div className="bg-card border border-border rounded-lg shadow-lg p-3 animate-fade-in">
          <p className="font-semibold text-foreground mb-2">Fascia {label}</p>
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'hsl(215, 75%, 50%)' }} />
              <span className="text-muted-foreground">Uomini:</span>
              <span className="font-mono font-medium">{maleValue.toLocaleString('it-IT')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'hsl(45, 100%, 50%)' }} />
              <span className="text-muted-foreground">Donne:</span>
              <span className="font-mono font-medium">{femaleValue.toLocaleString('it-IT')}</span>
            </div>
            <div className="border-t border-border pt-1 mt-1">
              <span className="text-muted-foreground">Totale:</span>
              <span className="font-mono font-medium ml-2">{(maleValue + femaleValue).toLocaleString('it-IT')}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`dashboard-card p-6 transition-all duration-300 ${isAnimating ? 'ring-2 ring-primary/30' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Piramide Demografica</h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'hsl(215, 75%, 50%)' }} />
            <span className="text-muted-foreground">Uomini ({((totalMale / total) * 100).toFixed(1)}%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'hsl(45, 100%, 50%)' }} />
            <span className="text-muted-foreground">Donne ({((totalFemale / total) * 100).toFixed(1)}%)</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 60, bottom: 20 }}
          barGap={0}
        >
          <XAxis
            type="number"
            domain={[-maxValue * 1.1, maxValue * 1.1]}
            tickFormatter={(value) => Math.abs(value).toLocaleString('it-IT')}
            tick={{ fill: 'hsl(215, 15%, 50%)', fontSize: 12 }}
            axisLine={{ stroke: 'hsl(214, 25%, 88%)' }}
          />
          <YAxis
            dataKey="ageGroup"
            type="category"
            tick={{ fill: 'hsl(220, 25%, 15%)', fontSize: 13, fontWeight: 500 }}
            axisLine={{ stroke: 'hsl(214, 25%, 88%)' }}
            width={55}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine x={0} stroke="hsl(214, 25%, 88%)" strokeWidth={2} />
          <Bar
            dataKey="maleNegative"
            fill="hsl(215, 75%, 50%)"
            radius={[4, 0, 0, 4]}
            animationDuration={500}
          >
            {chartData.map((entry, index) => (
              <Cell key={`male-${index}`} className="pyramid-bar-male" />
            ))}
          </Bar>
          <Bar
            dataKey="female"
            fill="hsl(45, 100%, 50%)"
            radius={[0, 4, 4, 0]}
            animationDuration={500}
          >
            {chartData.map((entry, index) => (
              <Cell key={`female-${index}`} className="pyramid-bar-female" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="flex justify-center gap-8 mt-4 pt-4 border-t border-border">
        <div className="text-center">
          <p className="text-2xl font-bold font-mono text-foreground">{total.toLocaleString('it-IT')}</p>
          <p className="text-sm text-muted-foreground">Rapporti totali</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold font-mono" style={{ color: 'hsl(215, 75%, 50%)' }}>
            {totalMale.toLocaleString('it-IT')}
          </p>
          <p className="text-sm text-muted-foreground">Uomini</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold font-mono" style={{ color: 'hsl(45, 100%, 50%)' }}>
            {totalFemale.toLocaleString('it-IT')}
          </p>
          <p className="text-sm text-muted-foreground">Donne</p>
        </div>
      </div>
    </div>
  );
}