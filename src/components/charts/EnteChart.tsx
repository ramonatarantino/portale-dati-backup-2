import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

interface EnteData {
  name: string;
  value: number;
}

interface EnteChartProps {
  data: EnteData[];
}

export function EnteChart({ data }: EnteChartProps) {
  const topEnti = data.slice(0, 10);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="apple-card p-8"
    >
      <h3 className="text-2xl font-semibold mb-6">Top 10 Enti per Numero Amministrati</h3>
      <ChartContainer config={{}} className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={topEnti} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} />
            <XAxis 
              type="number"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              type="category"
              dataKey="name"
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              width={150}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            />
            <Bar 
              dataKey="value" 
              fill="hsl(var(--chart-2))"
              radius={[0, 8, 8, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </motion.div>
  );
}
