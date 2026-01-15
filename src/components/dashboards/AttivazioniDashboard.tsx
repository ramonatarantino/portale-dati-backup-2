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
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

import { CalendarPicker } from '@/components/dashboard/CalendarPicker';

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--accent))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
  'hsl(var(--chart-6))',
  'hsl(var(--chart-7))',
  'hsl(var(--chart-8))',
];

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
  const categoryData = data.perCategoria;
  const ageGenderData = data.perEtaSesso;
  const hiringReasonData = data.perMotivoAssunzione;
  const terminationReasonData = data.perMotivoCessazione;

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

      {/* Category Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="apple-card p-8"
      >
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Distribuzione per Categoria</h3>
          <p className="text-sm text-muted-foreground">Attivazioni per qualifica/inquadramento</p>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              dataKey="numero"
              label={({ categoria, percent }) => `${categoria.split(':')[1]?.trim() || categoria} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {categoryData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '12px'
              }}
              formatter={(value: number) => [new Intl.NumberFormat('it-IT').format(value), 'Attivazioni']}
            />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Age and Gender Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="apple-card p-8"
      >
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Distribuzione per Età e Sesso</h3>
          <p className="text-sm text-muted-foreground">Attivazioni per fascia d'età</p>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={ageGenderData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="fascia_eta" stroke="hsl(var(--muted-foreground))" fontSize={12} />
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
            <Bar dataKey="maschi" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Uomini" />
            <Bar dataKey="femmine" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} name="Donne" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hiring Reasons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="apple-card p-8"
        >
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Motivi Assunzione</h3>
            <p className="text-sm text-muted-foreground">Distribuzione per tipo di assunzione</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={hiringReasonData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={100}
                paddingAngle={2}
                dataKey="numero"
                label={({ motivo, percent }) => `${motivo} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {hiringReasonData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px'
                }}
                formatter={(value: number) => [new Intl.NumberFormat('it-IT').format(value), 'Assunzioni']}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Termination Reasons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="apple-card p-8"
        >
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Motivi Cessazione</h3>
            <p className="text-sm text-muted-foreground">Distribuzione per tipo di cessazione</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={terminationReasonData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={100}
                paddingAngle={2}
                dataKey="numero"
                label={({ motivo, percent }) => `${motivo} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {terminationReasonData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px'
                }}
                formatter={(value: number) => [new Intl.NumberFormat('it-IT').format(value), 'Cessazioni']}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

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