import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const stipendiData = [
  { mese: "Gen", importo: 5.2 },
  { mese: "Feb", importo: 5.1 },
  { mese: "Mar", importo: 5.3 },
  { mese: "Apr", importo: 5.2 },
  { mese: "Mag", importo: 5.4 },
  { mese: "Giu", importo: 5.5 },
  { mese: "Lug", importo: 5.6 },
  { mese: "Ago", importo: 5.3 },
  { mese: "Set", importo: 5.4 },
  { mese: "Ott", importo: 5.5 },
  { mese: "Nov", importo: 5.6 },
  { mese: "Dic", importo: 10.2 },
];

const settoriData = [
  { name: "Istruzione", value: 35, color: "hsl(var(--primary))" },
  { name: "Sanità", value: 25, color: "hsl(var(--gold))" },
  { name: "Enti Locali", value: 20, color: "hsl(var(--flashcard-cyan))" },
  { name: "Ministeri", value: 12, color: "hsl(var(--flashcard-green))" },
  { name: "Altri", value: 8, color: "hsl(var(--flashcard-purple))" },
];

const trendData = [
  { anno: "2020", dipendenti: 2.1, spesa: 58 },
  { anno: "2021", dipendenti: 2.2, spesa: 60 },
  { anno: "2022", dipendenti: 2.3, spesa: 62 },
  { anno: "2023", dipendenti: 2.35, spesa: 64 },
  { anno: "2024", dipendenti: 2.4, spesa: 65 },
];

const ChartsSection = () => {
  return (
    <section id="grafici" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-gold/20 text-gold-dark hover:bg-gold/30 mb-4">
            Visualizzazioni Interattive
          </Badge>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
            I Dati in Grafici
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Esplora i dati della Pubblica Amministrazione attraverso visualizzazioni interattive e intuitive.
          </p>
        </div>

        <Tabs defaultValue="stipendi" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="stipendi">Stipendi</TabsTrigger>
            <TabsTrigger value="settori">Settori</TabsTrigger>
            <TabsTrigger value="trend">Trend</TabsTrigger>
          </TabsList>

          <TabsContent value="stipendi">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Erogazioni Mensili 2024</CardTitle>
                <CardDescription>Importo totale erogato in miliardi di euro</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stipendiData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="mese" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number) => [`€${value} mld`, "Importo"]}
                      />
                      <Bar dataKey="importo" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settori">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Distribuzione per Settore</CardTitle>
                <CardDescription>Percentuale dipendenti pubblici per settore</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={settoriData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={140}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {settoriData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number) => [`${value}%`, "Percentuale"]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trend">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Trend Pluriennale</CardTitle>
                <CardDescription>Evoluzione dipendenti (milioni) e spesa (miliardi €)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="anno" stroke="hsl(var(--muted-foreground))" />
                      <YAxis yAxisId="left" stroke="hsl(var(--primary))" />
                      <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--gold))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="dipendenti"
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        dot={{ fill: "hsl(var(--primary))", r: 6 }}
                        name="Dipendenti (M)"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="spesa"
                        stroke="hsl(var(--gold))"
                        strokeWidth={3}
                        dot={{ fill: "hsl(var(--gold))", r: 6 }}
                        name="Spesa (€ mld)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ChartsSection;