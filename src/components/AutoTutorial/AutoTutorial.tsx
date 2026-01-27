import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Map,
  BarChart3,
  Building2,
  TrendingUp,
  ChevronRight,
  Info,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RegionalChart } from "./RegionalChart";
import { CompartiChart } from "./CompartiChart";
import { TrendChart } from "./TrendChart";
import { MapLegend } from "./MapLegend";
import { cn } from "@/lib/utils";

interface TutorialStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  duration: number;
  highlights: string[];
  component: "intro" | "map" | "regional" | "comparti" | "trend" | "conclusion";
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 0,
    title: "Benvenuto nella Dashboard",
    subtitle: "Open Data Pubblica Amministrazione",
    description:
      "Questa guida interattiva ti accompagnerà nella scoperta dei dati sui dipendenti della Pubblica Amministrazione italiana. Siediti comodo, il tutorial partirà automaticamente.",
    icon: <Info className="h-8 w-8" />,
    duration: 6000,
    highlights: [],
    component: "intro",
  },
  {
    id: 1,
    title: "La Mappa Interattiva",
    subtitle: "Distribuzione Territoriale",
    description:
      "La mappa mostra la distribuzione geografica dei dipendenti pubblici. I cerchi blu rappresentano i capoluoghi regionali, quelli arancioni le province. La dimensione indica il volume di personale.",
    icon: <Map className="h-8 w-8" />,
    duration: 8000,
    highlights: ["Lombardia: 431k dipendenti", "Lazio: 336k dipendenti", "Campania: 230k dipendenti"],
    component: "map",
  },
  {
    id: 2,
    title: "Top 15 Regioni",
    subtitle: "Classifica per Numero di Dipendenti",
    description:
      "Questo grafico a barre mostra le 15 regioni con più dipendenti pubblici. La Lombardia guida la classifica, seguita da Lazio e Campania. Le barre blu evidenziano le prime 3 posizioni.",
    icon: <BarChart3 className="h-8 w-8" />,
    duration: 8000,
    highlights: ["Le Top 3 coprono il 30% del totale", "Nord Italia più rappresentato", "Sud con forte presenza nel settore pubblico"],
    component: "regional",
  },
  {
    id: 3,
    title: "I Comparti della PA",
    subtitle: "Distribuzione per Settore",
    description:
      "Il grafico a torta illustra come si distribuiscono i dipendenti nei vari comparti. La Scuola è il settore più numeroso, seguito dalla Sanità e dagli Enti Locali.",
    icon: <Building2 className="h-8 w-8" />,
    duration: 8000,
    highlights: ["Scuola: 1.2 milioni", "Sanità: 680.000", "Enti Locali: 450.000"],
    component: "comparti",
  },
  {
    id: 4,
    title: "Trend Occupazionale",
    subtitle: "Evoluzione dal 2018 al 2025",
    description:
      "L'area chart mostra l'andamento del numero totale di dipendenti pubblici negli anni. Si nota una crescita costante fino al 2024, con una leggera flessione nel 2025.",
    icon: <TrendingUp className="h-8 w-8" />,
    duration: 8000,
    highlights: ["Crescita +6% dal 2018", "Picco nel 2024: 3.35M", "Stabilizzazione in corso"],
    component: "trend",
  },
  {
    id: 5,
    title: "Tutorial Completato!",
    subtitle: "Sei pronto per esplorare",
    description:
      "Ora conosci gli strumenti per analizzare i dati del Pubblico Impiego. Esplora liberamente la dashboard, clicca sui grafici per i dettagli e usa i filtri per approfondire.",
    icon: <ChevronRight className="h-8 w-8" />,
    duration: 5000,
    highlights: ["Clicca sui grafici per dettagli", "Passa il mouse per i tooltip", "Esplora le diverse sezioni"],
    component: "conclusion",
  },
];

export const AutoTutorial = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);

  const step = tutorialSteps[currentStep];
  const totalSteps = tutorialSteps.length;

  const goToNextStep = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
      setProgress(0);
      setHighlightIndex(0);
      setShowPopup(false);
    } else {
      setIsPlaying(false);
    }
  }, [currentStep, totalSteps]);

  const goToPrevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setProgress(0);
      setHighlightIndex(0);
      setShowPopup(false);
    }
  }, [currentStep]);

  const restart = useCallback(() => {
    setCurrentStep(0);
    setProgress(0);
    setHighlightIndex(0);
    setShowPopup(false);
    setIsPlaying(true);
  }, []);

  // Auto-advance timer
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = 100 / (step.duration / 100);
        if (prev >= 100) {
          goToNextStep();
          return 0;
        }
        return prev + increment;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, step.duration, goToNextStep]);

  // Show popup with delay
  useEffect(() => {
    if (!isPlaying) return;
    
    const popupTimer = setTimeout(() => {
      setShowPopup(true);
    }, 1000);

    return () => clearTimeout(popupTimer);
  }, [currentStep, isPlaying]);

  // Cycle through highlights
  useEffect(() => {
    if (!isPlaying || !showPopup || step.highlights.length === 0) return;

    const highlightTimer = setInterval(() => {
      setHighlightIndex((prev) => (prev + 1) % step.highlights.length);
    }, 2000);

    return () => clearInterval(highlightTimer);
  }, [isPlaying, showPopup, step.highlights.length]);

  const renderStepContent = () => {
    switch (step.component) {
      case "intro":
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-foreground"
            >
              <Map className="h-12 w-12" />
            </motion.div>
            <h2 className="text-3xl font-bold text-foreground">{step.title}</h2>
            <p className="mt-2 text-xl text-muted-foreground">{step.subtitle}</p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 flex items-center gap-2 text-sm text-muted-foreground"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="h-3 w-3 rounded-full bg-secondary"
              />
              Il tutorial partirà automaticamente...
            </motion.div>
          </motion.div>
        );

      case "map":
        return (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative rounded-xl border-2 border-primary/20 bg-gradient-to-br from-muted/50 to-muted p-6"
              >
                {/* Simulated Map */}
                <div className="relative h-80 overflow-hidden rounded-lg bg-muted">
                  <svg viewBox="0 0 400 350" className="h-full w-full">
                    {/* Italy silhouette simplified */}
                    <path
                      d="M200,20 Q280,40 300,80 L320,120 Q340,160 330,200 L300,250 Q280,300 250,320 L200,340 Q150,330 120,300 L100,250 Q80,200 90,150 L110,100 Q130,50 200,20"
                      fill="hsl(var(--muted))"
                      stroke="hsl(var(--border))"
                      strokeWidth="2"
                    />
                    {/* Animated markers */}
                    <motion.g>
                      <motion.circle
                        cx="180"
                        cy="80"
                        r="20"
                        fill="hsl(var(--navy))"
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2, delay: 0 }}
                      />
                      <text x="180" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">431k</text>
                      
                      <motion.circle
                        cx="220"
                        cy="160"
                        r="18"
                        fill="hsl(var(--navy))"
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
                      />
                      <text x="220" y="165" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">336k</text>
                      
                      <motion.circle
                        cx="230"
                        cy="240"
                        r="15"
                        fill="hsl(var(--navy))"
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}
                      />
                      <text x="230" y="245" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">230k</text>

                      {/* Province markers */}
                      <motion.circle
                        cx="150"
                        cy="100"
                        r="10"
                        fill="hsl(var(--amber))"
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2, delay: 0.9 }}
                      />
                      <motion.circle
                        cx="260"
                        cy="120"
                        r="8"
                        fill="hsl(var(--amber))"
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2, delay: 1.2 }}
                      />
                    </motion.g>
                  </svg>
                </div>
              </motion.div>
            </div>
            <MapLegend />
          </div>
        );

      case "regional":
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <RegionalChart />
          </motion.div>
        );

      case "comparti":
        return (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CompartiChart />
          </motion.div>
        );

      case "trend":
        return (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TrendChart />
          </motion.div>
        );

      case "conclusion":
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-success text-primary-foreground"
            >
              <ChevronRight className="h-12 w-12" />
            </motion.div>
            <h2 className="text-3xl font-bold text-foreground">{step.title}</h2>
            <p className="mt-2 text-xl text-muted-foreground">{step.subtitle}</p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <Button onClick={restart} variant="outline" className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Rivedi il Tutorial
              </Button>
            </motion.div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="rounded-xl bg-card p-4 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
              transition={{ repeat: Infinity, duration: 1 }}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full",
                isPlaying ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"
              )}
            >
              {step.icon}
            </motion.div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Passo {currentStep + 1} di {totalSteps}
              </p>
              <h3 className="font-semibold text-foreground">{step.title}</h3>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevStep}
              disabled={currentStep === 0}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button
              variant="default"
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
              className="h-10 w-10"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNextStep}
              disabled={currentStep === totalSteps - 1}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={restart}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between">
            {tutorialSteps.map((s, i) => (
              <button
                key={s.id}
                onClick={() => {
                  setCurrentStep(i);
                  setProgress(0);
                  setHighlightIndex(0);
                }}
                className={cn(
                  "flex h-3 w-3 items-center justify-center rounded-full transition-all",
                  i === currentStep
                    ? "scale-125 bg-primary"
                    : i < currentStep
                    ? "bg-primary/50"
                    : "bg-muted"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative min-h-[500px]">
        {/* Left Navigation Arrow */}
        <AnimatePresence>
          {currentStep > 0 && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={goToPrevStep}
              className="absolute left-0 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-card shadow-lg border border-border hover:bg-muted transition-colors"
              aria-label="Passo precedente"
            >
              <SkipBack className="h-5 w-5 text-foreground" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Right Navigation Arrow */}
        <AnimatePresence>
          {currentStep < totalSteps - 1 && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={goToNextStep}
              className="absolute right-0 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-card shadow-lg border border-border hover:bg-muted transition-colors"
              aria-label="Passo successivo"
            >
              <SkipForward className="h-5 w-5 text-foreground" />
            </motion.button>
          )}
        </AnimatePresence>

        <div className="px-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Explanation Popup spostato sotto all'area grafici per non coprirli */}
      <AnimatePresence>
        {showPopup && step.component !== "intro" && step.component !== "conclusion" && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className="mt-4 rounded-xl border border-primary/20 bg-card/95 p-5 shadow-popup backdrop-blur-sm"
          >
            <button
              onClick={() => setShowPopup(false)}
              className="absolute right-3 top-3 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {step.icon}
              </div>
              <h4 className="font-semibold text-foreground">{step.subtitle}</h4>
            </div>

            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              {step.description}
            </p>

            {step.highlights.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Punti Chiave
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {highlightIndex + 1} / {step.highlights.length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setHighlightIndex((prev) => (prev - 1 + step.highlights.length) % step.highlights.length)}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-colors"
                    aria-label="Punto precedente"
                  >
                    <SkipBack className="h-3 w-3 text-foreground" />
                  </button>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={highlightIndex}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex flex-1 items-center gap-2 rounded-lg bg-secondary/20 px-3 py-2"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="h-2 w-2 shrink-0 rounded-full bg-secondary"
                      />
                      <span className="text-sm font-medium text-foreground">
                        {step.highlights[highlightIndex]}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                  <button
                    onClick={() => setHighlightIndex((prev) => (prev + 1) % step.highlights.length)}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-colors"
                    aria-label="Punto successivo"
                  >
                    <SkipForward className="h-3 w-3 text-foreground" />
                  </button>
                </div>
                <div className="flex gap-1">
                  {step.highlights.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setHighlightIndex(i)}
                      className={cn(
                        "h-1 flex-1 rounded-full transition-colors cursor-pointer hover:opacity-80",
                        i === highlightIndex ? "bg-secondary" : "bg-muted"
                      )}
                      aria-label={`Vai al punto ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
