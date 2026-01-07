import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Users } from 'lucide-react';
import { DataRecord } from '@/types/data';

interface GenderPieChartProps {
  data: DataRecord[];
}

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))'];

export function GenderPieChart({ data }: GenderPieChartProps) {
  const chartData = useMemo(() => {
    const totals = data.reduce(
      (acc, record) => {
        if (record.sesso === 'M') acc.maschi += record.numero;
        else if (record.sesso === 'F') acc.femmine += record.numero;
        return acc;
      },
      { maschi: 0, femmine: 0 }
    );

    const total = totals.maschi + totals.femmine;
    return [
      { name: 'Uomini', value: totals.maschi, percentage: ((totals.maschi / total) * 100).toFixed(1) },
      { name: 'Donne', value: totals.femmine, percentage: ((totals.femmine / total) * 100).toFixed(1) },
    ];
  }, [data]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <motion.div 
          className="bg-card rounded-xl p-4 shadow-lg border border-border"
          style={{ zIndex: 9999 }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="font-semibold text-sm mb-2">{data.name}</p>
          <p className="text-2xl font-bold">{data.percentage}%</p>
          <p className="text-xs text-muted-foreground">
            {new Intl.NumberFormat('it-IT').format(data.value)} amministrati
          </p>
        </motion.div>
      );
    }
    return null;
  };

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-sm font-bold"
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
      >
        {percentage}%
      </text>
    );
  };

  return (
    <div className="glass-card rounded-xl p-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Users className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Distribuzione per Genere</h3>
        </div>
        <p className="text-sm text-muted-foreground">Ripartizione uomini/donne</p>
      </div>

      <div className="h-[280px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
              labelLine={false}
              label={renderCustomLabel}
              animationDuration={1200}
              animationBegin={300}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                  stroke="none"
                />
              ))}
            </Pie>
            <Tooltip 
              content={<CustomTooltip />} 
              wrapperStyle={{ zIndex: 10000 }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 1 }}>
          <div className="text-center">
            <p className="text-2xl font-bold">
              {new Intl.NumberFormat('it-IT').format(chartData.reduce((acc, d) => acc + d.value, 0))}
            </p>
            <p className="text-xs text-muted-foreground">Totale</p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-8 mt-4">
        {chartData.map((entry, index) => (
          <motion.div 
            key={entry.name}
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: COLORS[index] }}
            />
            <div>
              <span className="text-sm font-medium">{entry.name}</span>
              <span className="text-xs text-muted-foreground ml-2">
                {new Intl.NumberFormat('it-IT').format(entry.value)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}