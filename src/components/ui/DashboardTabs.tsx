
import { Database, BarChart3, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const dashboards = [
  {
    id: "opendata",
    title: "Open Data",
    description: "Accedi alla dashboard completa dei dati aperti della Pubblica Amministrazione",
    icon: Database,
    color: "from-blue-900 to-blue-300",
    features: ["150+ Dataset", "Aggiornamenti mensili", "Export CSV/JSON", "API pubbliche"],
    link: "/dashboard",
  },
  {
    id: "numeri",
    title: "Numeri NoiPA",
    description: "Esplora le statistiche e i numeri del sistema NoiPA in tempo reale",
    icon: BarChart3,
    color: "from-gold-dark to-gold-light",
    features: ["Statistiche real-time", "Report personalizzati", "Confronti storici", "Indicatori KPI"],
    link: "/dashboard",
  },
];

const DashboardTabs = () => {
  return (
    <section id="dashboard" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-primary/20 text-primary hover:bg-primary/30 mb-4">
            Dashboard Interattive
          </Badge>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
            Accedi alle Dashboard
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Collega le tue dashboard personalizzate per analisi approfondite dei dati NoiPA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {dashboards.map((dashboard) => (
            <Card
              key={dashboard.id}
              className="group relative overflow-hidden border-border hover:border-primary/50 transition-all hover:shadow-xl cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${dashboard.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
              
              <CardHeader className="relative">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${dashboard.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <dashboard.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                  {dashboard.title}
                </CardTitle>
                <CardDescription className="text-base">
                  {dashboard.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="relative">
                <div className="flex flex-wrap gap-2 mb-6">
                  {dashboard.features.map((feature) => (
                    <Badge key={feature} variant="secondary" className="bg-secondary/50">
                      {feature}
                    </Badge>
                  ))}
                </div>
                
                <Button 
                  className="w-full group/btn bg-primary hover:bg-primary-dark"
                  onClick={() => window.location.href = dashboard.link}
                >
                  Apri Dashboard
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};

export default DashboardTabs;
