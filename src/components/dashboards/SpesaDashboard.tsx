import { motion } from 'framer-motion';
import { Euro, Users, Building2, TrendingUp } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { SpesaMockData } from '@/data/mockData2025';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

interface SpesaDashboardProps {
  selectedYear: number | null;
  selectedMonth: number | null;
  data: SpesaMockData;
}

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--accent))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

export function SpesaDashboard({ selectedYear, selectedMonth, data }: SpesaDashboardProps) {
  // Transform data for charts
  const spesaMensile = data.trendMensile.map(item => ({
    mese: item.mese,
    spesa: item.spesa / 1000000000, // Convert to billions
    dipendenti: data.dipendenti
  }));

  const spesaPerCategoria = data.perCategoria.map(item => ({
    name: item.categoria,
    value: Math.round((item.spesa / data.spesaTotale) * 100)
  }));

  const topAmministrazioni = data.topAmministrazioni.map(item => ({
    name: item.amministrazione,
    spesa: item.spesa / 1000000000 // Convert to billions
  }));

  const totaleSpesa = data.spesaTotale / 1000000000; // Convert to billions
  const mediaDipendenti = data.dipendenti;
  const spesaMedia = (data.mediaMensile / 1000000000).toFixed(2);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCard
          title="Spesa Totale"
          value={`€${totaleSpesa.toFixed(1)}Mld`}
          icon={Euro}
          description="Anno corrente"
          delay={0}
        />
        <StatCard
          title="Media Mensile"
          value={`€${spesaMedia}Mld`}
          icon={TrendingUp}
          description="Spesa media/mese"
          delay={100}
        />
        <StatCard
          title="Dipendenti"
          value={mediaDipendenti}
          icon={Users}
          description="Media annuale"
          delay={200}
        />
        <StatCard
          title="Amministrazioni"
          value={topAmministrazioni.length}
          icon={Building2}
          description="Top amministrazioni"
          delay={300}
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Spesa */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="apple-card p-8"
        >
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Andamento Spesa</h3>
            <p className="text-sm text-muted-foreground">Spesa mensile in miliardi di euro</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={spesaMensile}>
              <defs>
                <linearGradient id="spesaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="mese" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  background: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px'
                }}
                formatter={(value: number) => [`€${value}Mld`, 'Spesa']}
              />
              <Area 
                type="monotone" 
                dataKey="spesa" 
                stroke="hsl(var(--primary))" 
                fillOpacity={1} 
                fill="url(#spesaGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Distribuzione per Categoria */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="apple-card p-8"
        >
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Composizione Spesa</h3>
            <p className="text-sm text-muted-foreground">Distribuzione per categoria</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={spesaPerCategoria}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {spesaPerCategoria.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  background: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px'
                }}
                formatter={(value: number) => [`${value}%`, 'Quota']}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Top Amministrazioni */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="apple-card p-8"
      >
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Top Amministrazioni per Spesa</h3>
          <p className="text-sm text-muted-foreground">Spesa in miliardi di euro</p>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={topAmministrazioni} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={140} />
            <Tooltip 
              contentStyle={{ 
                background: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '12px'
              }}
              formatter={(value: number) => [`€${value}Mld`, 'Spesa']}
            />
            <Bar dataKey="spesa" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {selectedYear && selectedMonth && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-muted-foreground"
        >
          Dati relativi a {selectedMonth}/{selectedYear}
        </motion.div>
      )}
    </div>
  );
}
