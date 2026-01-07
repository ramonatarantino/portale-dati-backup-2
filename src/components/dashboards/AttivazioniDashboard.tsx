import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Briefcase, MapPin } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { AttivazioniMockData } from '@/data/mockData2025';
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
  Legend
} from 'recharts';

import { CalendarPicker } from '@/components/dashboard/CalendarPicker';

interface AttivazioniDashboardProps {
  selectedYear: number | null;
  selectedMonth: number | null;
  data: AttivazioniMockData;
  availableYears?: number[];
  availableMonths?: number[];
  onCalendarSelect?: (year: number, month: number) => void;
  dataByMonthYear?: Record<string, unknown>;
}

export function AttivazioniDashboard({ 
  selectedYear, 
  selectedMonth, 
  data, 
  availableYears = [2024, 2025], 
  availableMonths = [1,2,3,4,5,6,7,8,9,10,11,12], 
  onCalendarSelect, 
  dataByMonthYear = {} 
}: AttivazioniDashboardProps) {
  // Use real data from props
  const trendData = data.trendMensile;
  const regionData = data.perRegione;

  const totalAttivazioni = data.totaleAttivazioni;
  const totalCessazioni = data.totaleCessazioni;
  const saldo = data.saldo;

  return (
    <div className="space-y-8">
      {onCalendarSelect ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col xl:flex-row gap-6"
        >
          {/* Calendario sticky */}
          <div className="xl:sticky xl:top-6 xl:h-fit xl:w-64 xl:flex-shrink-0">
            <CalendarPicker
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
              availableYears={availableYears}
              availableMonths={availableMonths}
              onSelect={onCalendarSelect}
              dataByMonthYear={dataByMonthYear}
            />
          </div>

          {/* Contenuto principale */}
          <div className="flex-1 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
        <StatCard
          title="Attivazioni"
          value={totalAttivazioni}
          icon={TrendingUp}
          description="Rapporti attivati"
          delay={0}
        />
        <StatCard
          title="Cessazioni"
          value={totalCessazioni}
          icon={TrendingDown}
          description="Rapporti cessati"
          delay={100}
        />
        <StatCard
          title="Saldo"
          value={saldo}
          icon={Briefcase}
          description={saldo > 0 ? 'Saldo positivo' : 'Saldo negativo'}
          delay={200}
        />
        <StatCard
          title="Regioni"
          value={regionData.length}
          icon={MapPin}
          description="Regioni monitorate"
          delay={300}
        />
      </motion.div>

      {/* Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="apple-card p-8"
      >
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Trend Mensile</h3>
          <p className="text-sm text-muted-foreground">Andamento attivazioni e cessazioni</p>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={trendData}>
            <defs>
              <linearGradient id="attivGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="cessGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
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
              formatter={(value: number) => new Intl.NumberFormat('it-IT').format(value)}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="attivazioni" 
              stroke="hsl(var(--primary))" 
              fillOpacity={1} 
              fill="url(#attivGradient)"
              strokeWidth={2}
              name="Attivazioni"
            />
            <Area 
              type="monotone" 
              dataKey="cessazioni" 
              stroke="hsl(var(--accent))" 
              fillOpacity={1} 
              fill="url(#cessGradient)"
              strokeWidth={2}
              name="Cessazioni"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Regional Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="apple-card p-8"
      >
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Distribuzione Regionale</h3>
          <p className="text-sm text-muted-foreground">Attivazioni e cessazioni per regione</p>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={regionData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis dataKey="regione" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={80} />
            <Tooltip 
              contentStyle={{ 
                background: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '12px'
              }}
              formatter={(value: number) => new Intl.NumberFormat('it-IT').format(value)}
            />
            <Legend />
            <Bar dataKey="attivazioni" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} name="Attivazioni" />
            <Bar dataKey="cessazioni" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} name="Cessazioni" />
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
      </motion.div>
      ) : (
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
        <StatCard
          title="Attivazioni"
          value={totalAttivazioni}
          icon={TrendingUp}
          description="Rapporti attivati"
          delay={0}
        />
        <StatCard
          title="Cessazioni"
          value={totalCessazioni}
          icon={TrendingDown}
          description="Rapporti cessati"
          delay={100}
        />
        <StatCard
          title="Saldo"
          value={saldo}
          icon={Briefcase}
          description={saldo > 0 ? 'Saldo positivo' : 'Saldo negativo'}
          delay={200}
        />
        <StatCard
          title="Regioni"
          value={regionData.length}
          icon={MapPin}
          description="Regioni monitorate"
          delay={300}
        />
      </motion.div>

      {/* Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="apple-card p-8"
      >
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Trend Mensile</h3>
          <p className="text-sm text-muted-foreground">Andamento attivazioni e cessazioni</p>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={trendData}>
            <defs>
              <linearGradient id="attivGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="cessGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
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
              formatter={(value: number) => new Intl.NumberFormat('it-IT').format(value)}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="attivazioni" 
              stroke="hsl(var(--primary))" 
              fillOpacity={1} 
              fill="url(#attivGradient)"
              strokeWidth={2}
              name="Attivazioni"
            />
            <Area 
              type="monotone" 
              dataKey="cessazioni" 
              stroke="hsl(var(--accent))" 
              fillOpacity={1} 
              fill="url(#cessGradient)"
              strokeWidth={2}
              name="Cessazioni"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Regional Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="apple-card p-8"
      >
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Distribuzione Regionale</h3>
          <p className="text-sm text-muted-foreground">Attivazioni e cessazioni per regione</p>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={regionData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis dataKey="regione" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={80} />
            <Tooltip 
              contentStyle={{ 
                background: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '12px'
              }}
              formatter={(value: number) => new Intl.NumberFormat('it-IT').format(value)}
            />
            <Legend />
            <Bar dataKey="attivazioni" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} name="Attivazioni" />
            <Bar dataKey="cessazioni" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} name="Cessazioni" />
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
      )}    </div>
  );
}