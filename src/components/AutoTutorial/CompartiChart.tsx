import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoPopup } from "./InfoPopup";

const data = [
  { name: "Scuola", value: 1200000, color: "hsl(220, 60%, 25%)" },
  { name: "Sanità", value: 680000, color: "hsl(220, 50%, 35%)" },
  { name: "Enti Locali", value: 450000, color: "hsl(35, 90%, 55%)" },
  { name: "Ministeri", value: 280000, color: "hsl(35, 85%, 65%)" },
  { name: "Università", value: 120000, color: "hsl(220, 40%, 50%)" },
  { name: "Forze Armate", value: 180000, color: "hsl(30, 85%, 45%)" },
  { name: "Altri", value: 350000, color: "hsl(210, 20%, 70%)" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0];
    const total = data.reduce((sum, d) => sum + d.value, 0);
    const percentage = ((item.value / total) * 100).toFixed(1);
    
    return (
      <div className="rounded-lg border border-border bg-card p-3 shadow-popup">
        <p className="font-semibold" style={{ color: item.payload.color }}>
          {item.name}
        </p>
        <p className="text-sm text-muted-foreground">
          Dipendenti: <span className="font-medium text-foreground">{item.value.toLocaleString('it-IT')}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Percentuale: <span className="font-medium text-foreground">{percentage}%</span>
        </p>
      </div>
    );
  }
  return null;
};

const renderLegend = (props: any) => {
  const { payload } = props;
  return (
    <div className="flex flex-wrap justify-center gap-3 pt-4">
      {payload.map((entry: any, index: number) => (
        <div key={`legend-${index}`} className="flex items-center gap-1.5">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs text-muted-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export const CompartiChart = () => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              Distribuzione per Comparto
              <InfoPopup
                title="I Comparti della PA"
                content={
                  <div className="space-y-2">
                    <p>
                      I <strong>comparti</strong> sono le macro-aree in cui è organizzata la Pubblica Amministrazione italiana.
                    </p>
                    <ul className="list-disc pl-4 space-y-1 text-xs">
                      <li><strong>Scuola:</strong> Docenti e personale ATA</li>
                      <li><strong>Sanità:</strong> Medici, infermieri, operatori</li>
                      <li><strong>Enti Locali:</strong> Comuni, Province, Regioni</li>
                      <li><strong>Ministeri:</strong> Amministrazioni centrali</li>
                    </ul>
                    <p className="text-muted-foreground text-xs">
                      Passa il mouse sui settori per i dettagli.
                    </p>
                  </div>
                }
              />
            </CardTitle>
            <CardDescription>
              Suddivisione dei dipendenti pubblici nei diversi comparti
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              innerRadius={70}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={renderLegend} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
