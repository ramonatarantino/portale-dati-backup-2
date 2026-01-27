import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoPopup } from "./InfoPopup";

const data = [
  { anno: "2018", dipendenti: 3150000 },
  { anno: "2019", dipendenti: 3180000 },
  { anno: "2020", dipendenti: 3220000 },
  { anno: "2021", dipendenti: 3250000 },
  { anno: "2022", dipendenti: 3280000 },
  { anno: "2023", dipendenti: 3320000 },
  { anno: "2024", dipendenti: 3350000 },
  { anno: "2025", dipendenti: 3260000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card p-3 shadow-popup">
        <p className="font-semibold text-primary">Anno {label}</p>
        <p className="text-sm text-muted-foreground">
          Dipendenti: <span className="font-medium text-foreground">{payload[0].value.toLocaleString('it-IT')}</span>
        </p>
      </div>
    );
  }
  return null;
};

export const TrendChart = () => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              Andamento Occupazione nel Tempo
              <InfoPopup
                title="Trend Occupazionale"
                content={
                  <div className="space-y-2">
                    <p>
                      Questo grafico mostra l'<strong>evoluzione del numero totale di dipendenti pubblici</strong> negli ultimi anni.
                    </p>
                    <p>
                      L'area colorata evidenzia il trend generale, mentre i punti rappresentano i valori esatti per ogni anno.
                    </p>
                    <p className="text-muted-foreground text-xs">
                      I dati includono tutti i comparti della PA.
                    </p>
                  </div>
                }
              />
            </CardTitle>
            <CardDescription>
              Evoluzione del numero di dipendenti pubblici dal 2018 al 2025
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorDipendenti" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--navy))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--navy))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="anno" stroke="hsl(var(--muted-foreground))" />
            <YAxis
              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
              stroke="hsl(var(--muted-foreground))"
              domain={[3000000, 3500000]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="dipendenti"
              stroke="hsl(var(--navy))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorDipendenti)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
