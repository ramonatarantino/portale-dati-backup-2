import { useState } from "react";
import { Database, BarChart3, ExternalLink } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import FlashCard from "@/components/ui/FlashCard";

const openDataCards = [
  {
    number: "28",
    question: "Sai quanti stadi San Siro potresti riempire con tutti gli amministrati pubblici italiani?",
    answer: "Gli amministrati pubblici sono 2.403.000",
    color: "blue" as const,
  },
  {
    number: "60%",
    question: "Sai di quanto è aumentato il tasso femminile nella PA negli ultimi 10 anni?",
    answer: "Circa il 60% rispetto al 2015.",
    color: "gold" as const,
  },
  {
    number: "1.203",
    question: "Quante tipologie contrattuali esistono nella PA?",
    answer: "Tante più di quante immagini.",
    color: "blue-dark" as const,
  },
  {
    number: "4 milioni di km",
    question: "Sai quanta strada fanno ogni anno i pendolari della Pubblica Amministrazione?",
    answer: "Più di 100 giri attorno alla Terra.",
    color: "gold-dark" as const,
  },
  {
    number: "0.5 secondi",
    question: "Quanto tempo serve per trovare un dato con NoiPA?",
    answer: "Letteralmente un clic.",
    color: "blue-light" as const,
  },
  {
    number: "45-54 anni",
    question: "Sai qual è la fascia di età più rappresentata nella PA italiana?",
    answer: "La immaginavi più bassa?",
    color: "gold-light" as const,
  },
];

const numeriNoipaCards = [
  {
    number: "€ 65 miliardi",
    question: "Quanto eroga NoiPA ogni anno in stipendi?",
    answer: "Circa il 4% del PIL italiano.",
    color: "gold" as const,
  },
  {
    number: "9.500+",
    question: "Quante amministrazioni gestisce NoiPA?",
    answer: "Da piccoli comuni a grandi ministeri.",
    color: "blue" as const,
  },
  {
    number: "150+",
    question: "Quanti dataset aperti sono disponibili?",
    answer: "Aggiornati mensilmente.",
    color: "gold" as const,
  },
  {
    number: "99.8%",
    question: "Qual è il tasso di puntualità nei pagamenti?",
    answer: "Affidabilità certificata.",
    color: "blue" as const,
  },
  {
    number: "24/7",
    question: "Quando puoi accedere ai tuoi dati?",
    answer: "Sempre, ovunque.",
    color: "gold" as const,
  },
  {
    number: "40+ anni",
    question: "Da quanto tempo NoiPA gestisce gli stipendi pubblici?",
    answer: "Una storia di innovazione continua.",
    color: "blue" as const,
  },
];

const DataTabs = () => {
  const [activeTab, setActiveTab] = useState("opendata");

  return (
    <section id="opendata" className="pt-12 md:pt-16 pb-8 md:pb-12 bg-background backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col items-center mb-6">
            <TabsList className="bg-secondary/50 p-1.5 rounded-xl h-auto">
              <TabsTrigger
                value="opendata"
                className="flex items-center gap-2 px-3 py-1.5 text-sm md:text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-primary rounded-lg transition-all"
              >
                <Database className="h-4 w-4" />
                Dati stipendiali NoiPa
              </TabsTrigger>
              <TabsTrigger
                value="numeri"
                id="numeri"
                className="flex items-center gap-2 px-3 py-1.5 text-sm md:text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-primary rounded-lg transition-all"
              >
                <BarChart3 className="h-4 w-4" />
                Spesa Pensioni MEF
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="opendata" className="mt-0 focus-visible:outline-none">
            <div className="max-w-2xl mx-auto text-center mb-8">
              <h2 className="text-lg md:text-2xl font-bold text-foreground mb-4">
                Dati stipendiali NoiPa
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Per garantire l'attuazione dei principi basilari dell'open government, 
                puntando su dati aperti, sempre aggiornati e consultabili in totale trasparenza.
              </p>
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => window.location.href = '/dashboard'}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Vai al Portale Open Data
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 max-w-4xl mx-auto px-8">
              {openDataCards.map((card, index) => (
                <FlashCard
                  key={index}
                  {...card}
                  className={`opacity-0 animate-slide-up stagger-${(index % 6) + 1}`}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="numeri" className="mt-0 focus-visible:outline-none">
            <div className="max-w-3xl mx-auto text-center mb-6">
              <h2 className="text-lg md:text-2xl font-bold text-foreground mb-4">
                Spesa Pensioni MEF
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Per offrire a tutti i cittadini, al di là delle competenze specifiche, 
                dati comprensibili facendo così della trasparenza una pratica costante della piattaforma.
              </p>
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => window.location.href = '/numeridag'}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Vai al Portale Numeri DAG
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 max-w-4xl mx-auto px-8">
              {numeriNoipaCards.map((card, index) => (
                <FlashCard
                  key={index}
                  {...card}
                  className={`opacity-0 animate-slide-up stagger-${(index % 6) + 1}`}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default DataTabs;