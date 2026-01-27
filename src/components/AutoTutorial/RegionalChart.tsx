import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoPopup } from "./InfoPopup";

const data = [
  { regione: "Lombardia", dipendenti: 431000 },
  { regione: "Lazio", dipendenti: 336000 },
  { regione: "Campania", dipendenti: 230000 },
  { regione: "Piemonte", dipendenti: 214000 },
  { regione: "Sicilia", dipendenti: 207000 },
  { regione: "Veneto", dipendenti: 186000 },
  { regione: "Emilia-R.", dipendenti: 178000 },
  { regione: "Puglia", dipendenti: 160000 },
  { regione: "Toscana", dipendenti: 161000 },
  { regione: "Calabria", dipendenti: 79000 },
  { regione: "Sardegna", dipendenti: 74000 },
  { regione: "Liguria", dipendenti: 74000 },
  { regione: "Marche", dipendenti: 61000 },
  { regione: "Abruzzo", dipendenti: 53000 },
  { regione: "F.V.G.", dipendenti: 51000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card p-3 shadow-popup">
        <p className="font-semibold text-primary">{label}</p>
        <p className="text-sm text-muted-foreground">
          Dipendenti: <span className="font-medium text-foreground">{payload[0].value.toLocaleString('it-IT')}</span>
        </p>
      </div>
    );
  }
  return null;
};

export const RegionalChart = () => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              Top 15 Regioni per Dipendenti Pubblici
              <InfoPopup
                title="Come leggere il grafico"
                content={
                  <div className="space-y-2">
                    <p>
                      Questo grafico a barre orizzontali mostra le <strong>15 regioni italiane</strong> con il maggior numero di dipendenti pubblici.
                    </p>
                    <p>
                      La lunghezza di ogni barra è proporzionale al numero di dipendenti. Passa il mouse sopra una barra per vedere il dato esatto.
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Fonte: Dati Pubblica Amministrazione 2025
                    </p>
                  </div>
                }
              />
            </CardTitle>
            <CardDescription>
              Distribuzione dei dipendenti pubblici nelle principali regioni italiane
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={450}>
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              type="number"
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis
              dataKey="regione"
              type="category"
              width={80}
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="dipendenti" radius={[0, 4, 4, 0]}>
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index < 3 ? "hsl(var(--navy))" : "hsl(var(--amber))"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
