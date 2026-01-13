import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TrendData } from '@/data/demographicData';

interface TrendChartProps {
  data: TrendData[];
  currentPeriod: string;
}

export function TrendChart({ data, currentPeriod }: TrendChartProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const [anno, mese] = label.split('-');
      const monthNames = ['', 'Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];
      
      return (
        <div className="bg-card border border-border rounded-lg shadow-lg p-3 animate-fade-in">
          <p className="font-semibold text-foreground mb-2">{monthNames[parseInt(mese)]} {anno}</p>
          <div className="space-y-1 text-sm">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.stroke }} />
                <span className="text-muted-foreground">{entry.name}:</span>
                <span className="font-mono font-medium">
                  {entry.dataKey.includes('percent') 
                    ? `${entry.value.toFixed(1)}%`
                    : entry.value.toLocaleString('it-IT')
                  }
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const formatXAxis = (value: string) => {
    const [anno, mese] = value.split('-');
    const monthNames = ['', 'G', 'F', 'M', 'A', 'M', 'G', 'L', 'A', 'S', 'O', 'N', 'D'];
    return `${monthNames[parseInt(mese)]}'${anno.slice(2)}`;
  };

  return (
    <div className="dashboard-card p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Trend Temporale</h3>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Total trend */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">Rapporti di lavoro totali</p>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <XAxis 
                dataKey="period" 
                tickFormatter={formatXAxis}
                tick={{ fill: 'hsl(215, 15%, 50%)', fontSize: 10 }}
                axisLine={{ stroke: 'hsl(214, 25%, 88%)' }}
                interval="preserveStartEnd"
              />
              <YAxis 
                tick={{ fill: 'hsl(215, 15%, 50%)', fontSize: 10 }}
                axisLine={{ stroke: 'hsl(214, 25%, 88%)' }}
                tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(0)}k` : v}
                width={40}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine x={currentPeriod} stroke="hsl(215, 70%, 35%)" strokeDasharray="3 3" strokeWidth={2} />
              <Line
                type="monotone"
                dataKey="total"
                stroke="hsl(215, 70%, 45%)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: 'hsl(215, 70%, 45%)' }}
                name="Totale"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Age distribution trends */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">Distribuzione per età (%)</p>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <XAxis 
                dataKey="period" 
                tickFormatter={formatXAxis}
                tick={{ fill: 'hsl(215, 15%, 50%)', fontSize: 10 }}
                axisLine={{ stroke: 'hsl(214, 25%, 88%)' }}
                interval="preserveStartEnd"
              />
              <YAxis 
                tick={{ fill: 'hsl(215, 15%, 50%)', fontSize: 10 }}
                axisLine={{ stroke: 'hsl(214, 25%, 88%)' }}
                domain={[0, 100]}
                tickFormatter={(v) => `${v}%`}
                width={40}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine x={currentPeriod} stroke="hsl(215, 70%, 35%)" strokeDasharray="3 3" strokeWidth={2} />
              <Line
                type="monotone"
                dataKey="percentUnder35"
                stroke="hsl(45, 85%, 55%)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: 'hsl(45, 85%, 55%)' }}
                name="Under 35"
              />
              <Line
                type="monotone"
                dataKey="percentOver55"
                stroke="hsl(215, 80%, 35%)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: 'hsl(215, 80%, 35%)' }}
                name="Over 55"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Current period stats */}
      <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(45, 85%, 55%)' }} />
          <span className="text-sm text-muted-foreground">Under 35</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(215, 80%, 35%)' }} />
          <span className="text-sm text-muted-foreground">Over 55</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-1 rounded-full" style={{ backgroundColor: 'hsl(215, 70%, 35%)' }} />
          <span className="text-sm text-muted-foreground">Periodo selezionato</span>
        </div>
      </div>
    </div>
  );
}