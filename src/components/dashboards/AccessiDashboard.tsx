import { motion } from 'framer-motion';
import { Key, Users, Building, Globe } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { AccessChart } from '@/components/charts/AccessChart';
import { CredentialChart } from '@/components/charts/CredentialChart';
import { EnteChart } from '@/components/charts/EnteChart';
import { AccessiMockData } from '@/data/mockData2025';

interface AccessiDashboardProps {
  selectedYear: number | null;
  selectedMonth: number | null;
  data: AccessiMockData;
}

export function AccessiDashboard({ selectedYear, selectedMonth, data }: AccessiDashboardProps) {
  // Transform data for charts
  const mockAccessData = data.trendMensile.map(item => ({
    month: item.mese,
    accessi: item.accessi
  }));

  const mockCredentialData = data.perCredenziale.map(item => ({
    name: item.credenziale,
    value: Math.round((item.numero / data.totaleAccessi) * 100)
  }));

  const mockEnteData = data.topEnti.map(item => ({
    name: item.ente,
    value: item.accessi
  }));

  const totalAccessi = data.totaleAccessi;
  const avgAccessi = data.mediaGiornaliera;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCard
          title="Accessi Totali"
          value={totalAccessi}
          icon={Key}
          description="Nel periodo selezionato"
          delay={0}
        />
        <StatCard
          title="Media Mensile"
          value={avgAccessi}
          icon={Users}
          description="Accessi medi/mese"
          delay={100}
        />
        <StatCard
          title="Enti Attivi"
          value={data.entiAttivi}
          icon={Building}
          description="Enti monitorati"
          delay={200}
        />
        <StatCard
          title="Credenziali"
          value={data.credenzialiUsate}
          icon={Globe}
          description="Tipologie attive"
          delay={300}
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AccessChart data={mockAccessData} />
        <CredentialChart data={mockCredentialData} />
      </div>

      <EnteChart data={mockEnteData} />

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