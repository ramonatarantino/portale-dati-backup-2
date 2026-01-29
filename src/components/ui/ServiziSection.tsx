import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, Users, Shield, Building2, CreditCard, MapPin } from "lucide-react";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";

const services = [
  {
    icon: FileText,
    title: "Amministrati",
    description: "I dataset permettono di analizzare la distribuzione del personale attivo per territorio, età e sesso, includendo le retribuzioni per fascia di reddito. Consentono inoltre di studiare il pendolarismo casa-lavoro in base a distanza, sede e amministrazione.",
  },
  {
    icon: Users,
    title: "Amministrazioni ",
    description: "Il dataset mostra, nel mese di riferimento, la distribuzione dei rapporti di lavoro del personale attivo per comune della sede di servizio, fascia di età e sesso, con dati aggregati a livello comunale per le Amministrazioni in convenzione.",
  },
  {
    icon: Shield,
    title: "Statistiche Accesso",
    description: "Il dataset analizza il numero di pagamenti per Amministrazione, fascia di età, sesso e modalità di accredito nel mese di riferimento. Include inoltre le modalità di accesso al portale NoiPA, con dati aggregati per area geografica e caratteristiche anagrafiche.",
  },
  {
    icon: Building2,
    title: "Rapporti di lavoro",
    description: "I dataset analizzano la distribuzione territoriale del personale per comparto, qualifica, età e sesso e monitorano, nel mese di riferimento, le attivazioni e le cessazioni dei rapporti di lavoro per Amministrazione e territorio.",
  },
  {
    icon: CreditCard,
    title: "Trattamento Economico",
    description: "I dataset forniscono informazioni su detrazioni fiscali e assegni al nucleo familiare, sui redditi da lavoro risultanti dalle Certificazioni Uniche e sull’andamento delle assenze del personale. I dati sono aggregati per Amministrazione, territorio e caratteristiche anagrafiche degli amministrati.",
  },
  {
    icon: MapPin,
    title: "Ritenute",
    description: "I dataset analizzano l’andamento delle ritenute fiscali, previdenziali, sindacali e per prestiti applicate agli emolumenti del personale, con dettaglio territoriale e anagrafico. I dati includono importi complessivi, numero di cedolini e amministrati interessati, aggregati per Amministrazione e area di contrattazione.",
  },
{
    icon: Building2,
    title: "Amministrazione",
    description: "Il dataset contiene il dato integrale di spesa pensionistica sostenuta suddiviso per Ministeri e per capitoli.",
  },
  {
    icon: Shield,
    title: "Tipo Pensione",
    description: "Il dataset contiene il dato integrale di spesa pensionistica per ambito territoriale, tipo pensione, trattamento pensionistico.",
  },
];

export const ServiziSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="bg-card pt-8 md:pt-12 pb-8 md:pb-12" ref={ref}>
      <div className="px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-6"
        >
          <div className="gold-bar mb-3" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            OpenData
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Scopri i dati che offriamo e come sono organizzati: troverai grafici, tabelle e analisi dettagliate per territorio, età, sesso, amministrazione e altre caratteristiche chiave del personale.
          </p>
        </motion.div>

        {/* ScrollStack Cards */}
        <ScrollStack
          itemDistance={50}
          itemScale={0.01}
          itemStackDistance={12}
          stackPosition="25%"
          scaleEndPosition="15%"
          baseScale={0.9}
          blurAmount={1}
          hideScrollbar={true}
        >
          {services.map((service) => (
            <ScrollStackItem key={service.title}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-black leading-relaxed mb-3 text-lg">
                    {service.description}
                  </p>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary hover:text-primary-light transition-colors inline-flex items-center gap-2"
                  >
                    Esplora i dati
                    <span className="text-accent">→</span>
                  </a>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </div>
  );
};

export default ServiziSection;
