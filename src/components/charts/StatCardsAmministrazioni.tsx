import { TrendingUp, TrendingDown, Users, UserCheck, UserX } from 'lucide-react';
import { PyramidData, TrendData } from '@/data/demographicData';

interface StatCardsProps {
  pyramidData: PyramidData[];
  currentTrend: TrendData | null;
  previousTrend: TrendData | null;
}

export function StatCards({ pyramidData, currentTrend, previousTrend }: StatCardsProps) {
  const totalMale = pyramidData.reduce((sum, d) => sum + d.male, 0);
  const totalFemale = pyramidData.reduce((sum, d) => sum + d.female, 0);
  const total = totalMale + totalFemale;

  // Calculate trend changes
  const totalChange = previousTrend && currentTrend 
    ? ((currentTrend.total - previousTrend.total) / previousTrend.total) * 100 
    : 0;

  const under35Change = previousTrend && currentTrend
    ? currentTrend.percentUnder35 - previousTrend.percentUnder35
    : 0;

  const over55Change = previousTrend && currentTrend
    ? currentTrend.percentOver55 - previousTrend.percentOver55
    : 0;

  const stats = [
    {
      label: 'Totale Rapporti',
      value: total.toLocaleString('it-IT'),
      change: totalChange,
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Under 35',
      value: `${currentTrend?.percentUnder35.toFixed(1) || '0'}%`,
      change: under35Change,
      icon: UserCheck,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-500/10',
    },
    {
      label: 'Over 55',
      value: `${currentTrend?.percentOver55.toFixed(1) || '0'}%`,
      change: over55Change,
      icon: UserX,
      color: 'text-amber-600',
      bgColor: 'bg-amber-500/10',
    },
    {
      label: 'Rapporto F/M',
      value: totalMale > 0 ? (totalFemale / totalMale).toFixed(2) : '0',
      change: null,
      icon: Users,
      color: 'text-rose-600',
      bgColor: 'bg-rose-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold font-mono mt-1 text-foreground">{stat.value}</p>
            </div>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
          </div>
          
          {stat.change !== null && (
            <div className="flex items-center gap-1 mt-2">
              {stat.change > 0 ? (
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              ) : stat.change < 0 ? (
                <TrendingDown className="h-4 w-4 text-rose-500" />
              ) : null}
              <span className={`text-sm font-medium ${
                stat.change > 0 ? 'text-emerald-500' : stat.change < 0 ? 'text-rose-500' : 'text-muted-foreground'
              }`}>
                {stat.change > 0 ? '+' : ''}{stat.change.toFixed(2)}%
              </span>
              <span className="text-xs text-muted-foreground">vs mese prec.</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}