import { useState } from "react";
import { Map, BarChart3, Users, Building2, TrendingUp, HelpCircle } from "lucide-react";
import { TutorialCard } from "./TutorialCard";
import { RegionalChart } from "./RegionalChart";
import { CompartiChart } from "./CompartiChart";
import { TrendChart } from "./TrendChart";
import { MapLegend } from "./MapLegend";
import { InfoPopup } from "./InfoPopup";
import { Badge } from "@/components/ui/badge";

const tutorialSteps = [
  {
    id: 1,
    title: "Esplora la Mappa Interattiva",
    description:
      "Inizia cliccando sui capoluoghi regionali per visualizzare i dati aggregati. Ogni cerchio rappresenta un'area geografica con il numero di dipendenti pubblici.",
    icon: <Map className="h-6 w-6" />,
    content: "map",
  },
  {
    id: 2,
    title: "Distribuzione Territoriale",
    description:
      "Scopri come sono distribuiti i dipendenti pubblici nelle diverse regioni italiane. Le Top 15 regioni raccolgono oltre l'80% del personale.",
    icon: <BarChart3 className="h-6 w-6" />,
    content: "regional",
  },
  {
    id: 3,
    title: "Comparti della PA",
    description:
      "Analizza la suddivisione per comparto: Scuola, Sanità, Enti Locali e altri settori della Pubblica Amministrazione.",
    icon: <Building2 className="h-6 w-6" />,
    content: "comparti",
  },
  {
    id: 4,
    title: "Andamento nel Tempo",
    description:
      "Osserva l'evoluzione dell'occupazione pubblica negli ultimi anni e identifica i trend principali.",
    icon: <TrendingUp className="h-6 w-6" />,
    content: "trend",
  },
];

export const TutorialSection = () => {
  const [activeStep, setActiveStep] = useState(1);

  const renderContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="rounded-xl border-2 border-dashed border-primary/30 bg-muted/50 p-8 text-center">
              <Map className="mx-auto h-16 w-16 text-primary/50" />
              <h3 className="mt-4 text-lg font-semibold">Mappa Interattiva</h3>
              <p className="mt-2 text-muted-foreground">
                Qui verrà visualizzata la mappa dell'Italia con i marker dei dipendenti pubblici.
              </p>
              <div className="mt-4 flex justify-center gap-2">
                <Badge variant="secondary" className="bg-navy text-navy-foreground">
                  431k Lombardia
                </Badge>
                <Badge variant="secondary" className="bg-amber text-amber-foreground">
                  178k Province
                </Badge>
              </div>
            </div>
            <MapLegend />
          </div>
        );
      case 2:
        return <RegionalChart />;
      case 3:
        return <CompartiChart />;
      case 4:
        return <TrendChart />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
          <HelpCircle className="h-4 w-4" />
          Tutorial Guidato
        </div>
        <h2 className="text-3xl font-bold text-foreground">
          Scopri i Dati della PA
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Impara a interpretare i grafici e le visualizzazioni della mappa interattiva.
          Segui i passaggi per esplorare le caratteristiche dei dipendenti pubblici italiani.
        </p>
      </div>

      {/* Key Questions */}
      <div className="rounded-xl bg-card p-6 shadow-card">
        <h3 className="mb-4 flex items-center gap-2 font-semibold">
          <Users className="h-5 w-5 text-primary" />
          Domande Chiave
          <InfoPopup
            title="A cosa serve questa sezione?"
            content={
              <p>
                Queste sono le domande principali a cui potrai rispondere esplorando i dati della Pubblica Amministrazione.
              </p>
            }
          />
        </h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-muted/50 p-4 transition-colors hover:bg-muted">
            <p className="text-sm font-medium text-foreground">
              Come sono distribuiti i dipendenti pubblici sul territorio nazionale?
            </p>
          </div>
          <div className="rounded-lg bg-muted/50 p-4 transition-colors hover:bg-muted">
            <p className="text-sm font-medium text-foreground">
              Qual è la distribuzione nei diversi comparti della PA?
            </p>
          </div>
          <div className="rounded-lg bg-muted/50 p-4 transition-colors hover:bg-muted">
            <p className="text-sm font-medium text-foreground">
              Quali sono le Top 15 regioni per numero di dipendenti?
            </p>
          </div>
        </div>
      </div>

      {/* Tutorial Steps */}
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-4">
          {tutorialSteps.map((step) => (
            <TutorialCard
              key={step.id}
              step={step.id}
              title={step.title}
              description={step.description}
              icon={step.icon}
              isActive={activeStep === step.id}
              onClick={() => setActiveStep(step.id)}
            />
          ))}
        </div>
        <div className="lg:col-span-8">{renderContent()}</div>
      </div>
    </div>
  );
};
