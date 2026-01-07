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
  Cell,
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import { getComuniByProvince } from '@/data/comuniCoordinates';
import { AggregatedByProvince } from '@/types/data';

interface ProvinceBarChartProps {
  data: AggregatedByProvince[];
  maxItems?: number;
  onProvinceClick?: (provincia: string) => void;
  onRegionSelect?: (regione: string) => void;
  onCitySelect?: (comune: string) => void;
  selectedProvince?: string | null;
  selectedRegion?: string | null;
  selectedCity?: string | null;
}


// Blue palette for bars using the same blue as GenderPieChart (HSL: 212 70% 18%)
// Decreasing intensity from darkest to lightest
const CHART_COLORS = [
  'hsl(212, 70%, 18%)',  // #082B6F - Same as GenderPieChart
  'hsl(212, 70%, 28%)',
  'hsl(212, 70%, 38%)',
  'hsl(212, 70%, 48%)',
  'hsl(212, 70%, 58%)',
  'hsl(212, 70%, 68%)',
];

export function ProvinceBarChart({ data, maxItems = 15, onProvinceClick, onRegionSelect, onCitySelect, selectedProvince, selectedRegion, selectedCity }: ProvinceBarChartProps) {
  // Build chart data: regions when none selected, provinces of selected region otherwise
  const chartData = useMemo(() => {
    if (!selectedRegion) {
      const regionMap = new Map<string, { totale: number; maschi: number; femmine: number }>();
      data.forEach((item) => {
        const regione = (item.regione || 'N/D').toUpperCase();
        const current = regionMap.get(regione) || { totale: 0, maschi: 0, femmine: 0 };
        current.totale += item.totale;
        current.maschi += item.maschi;
        current.femmine += item.femmine;
        regionMap.set(regione, current);
      });
      return Array.from(regionMap.entries())
        .map(([regione, stats]) => ({
          regione,
          ...stats,
          name: regione.length > 12 ? regione.substring(0, 12) + '...' : regione,
          fullName: regione,
        }))
        .sort((a, b) => b.totale - a.totale)
        .slice(0, maxItems);
    }
    if (!selectedProvince) {
      // Provinces within selected region
      const provinces = data
        .filter(p => (p.regione || '').toUpperCase() === selectedRegion.toUpperCase())
        .map(p => ({
          ...p,
          name: p.provincia.length > 12 ? p.provincia.substring(0, 12) + '...' : p.provincia,
          fullName: p.provincia,
        }))
        .sort((a, b) => b.totale - a.totale)
        .slice(0, maxItems);
      return provinces;
    }
    // Comuni within selected province (synthetic split based on ratios)
    const provinceStats = data.find(p => p.provincia.toUpperCase() === selectedProvince.toUpperCase());
    const comuni = getComuniByProvince(selectedProvince) || [];
    const totale = provinceStats?.totale || 0;
    const maschi = provinceStats?.maschi || 0;
    const femmine = provinceStats?.femmine || 0;
    return comuni.map(c => ({
      name: c.name.length > 14 ? c.name.substring(0, 14) + '...' : c.name,
      fullName: c.name,
      totale: Math.round(totale * (c.ratio ?? 0.5)),
      maschi: Math.round(maschi * (c.ratio ?? 0.5)),
      femmine: Math.round(femmine * (c.ratio ?? 0.5)),
    })).sort((a, b) => b.totale - a.totale);
  }, [data, maxItems, selectedRegion, selectedProvince]);

  const handleBarClick = (payload: any) => {
    if (!payload || !payload.fullName) return;
    if (!selectedRegion) {
      onRegionSelect?.(payload.fullName);
      return;
    }
    if (!selectedProvince) {
      onProvinceClick?.(payload.fullName);
      return;
    }
    onCitySelect?.(payload.fullName);
  };

  const formatNumber = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toString();
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <motion.div 
          className="bg-card rounded-xl p-4 shadow-lg border border-border"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="font-semibold text-sm mb-3 text-foreground">{data.fullName}</p>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Totale</span>
              <span className="font-bold text-foreground">{new Intl.NumberFormat('it-IT').format(data.totale)}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Uomini</span>
              <span className="font-medium" style={{ color: 'hsl(210, 100%, 35%)' }}>
                {new Intl.NumberFormat('it-IT').format(data.maschi)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Donne</span>
              <span className="font-medium" style={{ color: 'hsl(339, 90%, 51%)' }}>
                {new Intl.NumberFormat('it-IT').format(data.femmine)}
              </span>
            </div>
            <div className="pt-2 border-t border-border mt-2">
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all" 
                  style={{ width: `${(data.maschi / data.totale) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] mt-1 text-muted-foreground">
                <span>U: {((data.maschi / data.totale) * 100).toFixed(1)}%</span>
                <span>D: {((data.femmine / data.totale) * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card rounded-xl p-6 animate-fade-up" style={{ animationDelay: '0.15s' }}>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">
              {!selectedRegion && 'Distribuzione per regione'}
              {selectedRegion && !selectedProvince && `Province di ${selectedRegion}`}
              {selectedRegion && selectedProvince && `Comuni di ${selectedProvince}`}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">
            {!selectedRegion && `Top ${maxItems} regioni per numero di amministrati`}
            {selectedRegion && !selectedProvince && `Province della regione ${selectedRegion}`}
            {selectedRegion && selectedProvince && `Comuni della provincia di ${selectedProvince}`}
          </p>
        </div>
        {selectedProvince && (
          <motion.span 
            className="stat-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {selectedProvince}
          </motion.span>
        )}
      </div>
      <div className="h-[390px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} opacity={0.5} />
            <XAxis 
              type="number" 
              tickFormatter={formatNumber}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tickLine={false}
            />
            <YAxis 
              dataKey="name" 
              type="category" 
              width={100}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted) / 0.5)' }} />
            <Bar 
              dataKey="totale" 
              radius={[0, 6, 6, 0]}
              animationDuration={1200}
              animationBegin={200}
              onClick={handleBarClick}
              cursor="pointer"
            >
              {chartData.map((item, index) => {
                const isSelected = selectedProvince
                  ? (!selectedCity && selectedProvince.toUpperCase() === item.fullName.toUpperCase()) ||
                    (selectedCity && selectedCity.toUpperCase() === item.fullName.toUpperCase())
                  : false;
                return (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={isSelected ? 'hsl(43, 96%, 56%)' : CHART_COLORS[index % CHART_COLORS.length]}
                    style={{ 
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      filter: isSelected ? 'drop-shadow(0 0 12px hsla(43, 96%, 56%, 0.5))' : 'none'
                    }}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}