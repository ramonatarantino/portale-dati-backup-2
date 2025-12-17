import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { CalendarDays } from 'lucide-react';
import { AggregatedByAge } from '@/types/data';

interface AgeStackedChartProps {
  data: AggregatedByAge[];
}

export function AgeStackedChart({ data }: AgeStackedChartProps) {
  const chartData = useMemo(() => {
    return data.map((item) => ({
      ...item,
      fascia: item.fascia.replace('-', ' - '),
    }));
  }, [data]);

  const formatNumber = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value.toString();
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const maschi = payload.find((p: any) => p.dataKey === 'maschi')?.value || 0;
      const femmine = payload.find((p: any) => p.dataKey === 'femmine')?.value || 0;
      const totale = maschi + femmine;

      return (
        <motion.div 
          className="bg-card rounded-xl p-4 shadow-lg border border-border"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="font-semibold text-sm mb-3">{label} anni</p>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: 'hsl(var(--chart-1))' }} />
                <span className="text-muted-foreground">Uomini</span>
              </div>
              <span className="font-medium">{new Intl.NumberFormat('it-IT').format(maschi)}</span>
            </div>
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: 'hsl(var(--chart-2))' }} />
                <span className="text-muted-foreground">Donne</span>
              </div>
              <span className="font-medium">{new Intl.NumberFormat('it-IT').format(femmine)}</span>
            </div>
            <div className="pt-2 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Totale</span>
                <span className="font-bold">{new Intl.NumberFormat('it-IT').format(totale)}</span>
              </div>
            </div>
          </div>
        </motion.div>
      );
    }
    return null;
  };

  const CustomLegend = () => (
    <div className="flex justify-center gap-6 mt-2">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded" style={{ backgroundColor: 'hsl(var(--chart-1))' }} />
        <span className="text-sm text-muted-foreground">Uomini</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded" style={{ backgroundColor: 'hsl(var(--chart-2))' }} />
        <span className="text-sm text-muted-foreground">Donne</span>
      </div>
    </div>
  );

  return (
    <div className="glass-card rounded-xl p-6 animate-fade-up" style={{ animationDelay: '0.25s' }}>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <CalendarDays className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Distribuzione per Fascia d'Età</h3>
        </div>
        <p className="text-sm text-muted-foreground">Composizione demografica per genere</p>
      </div>

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} opacity={0.5} />
            <XAxis 
              dataKey="fascia" 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tickLine={false}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              tickFormatter={formatNumber}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted) / 0.3)' }} />
            <Legend content={<CustomLegend />} />
            <Bar 
              dataKey="maschi" 
              stackId="a" 
              fill="hsl(var(--chart-1))"
              radius={[0, 0, 0, 0]}
              animationDuration={1200}
              animationBegin={400}
            />
            <Bar 
              dataKey="femmine" 
              stackId="a" 
              fill="hsl(var(--chart-2))"
              radius={[4, 4, 0, 0]}
              animationDuration={1200}
              animationBegin={600}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}