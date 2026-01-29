import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Layers, Users } from "lucide-react";
import { AppleCard } from "./AppleCard";

const cardsData = [
  {
    icon: Layers,
    label: "Il portale",
    question: "Cos'è OpenDAG?",
    pattern: "dots" as const,
    content: (
      <div className="space-y-4">
        <p>
          OpenDAG è il nuovo portale del Dipartimento dell'Amministrazione Generale 
          che permette di approfondire le tematiche della Finanza Pubblica.
        </p>
        <ul className="space-y-2.5">
          {[
            "Consultare dati aperti sulla gestione del personale",
            "Analizzare trattamenti pensionistici della PA",
            "Elaborazioni personalizzate e certificate"
          ].map((item, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + idx * 0.1, duration: 0.4 }}
              className="flex items-start gap-3"
            >
              <span className="w-1 h-1 rounded-full bg-primary mt-2.5 flex-shrink-0" />
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    icon: Users,
    label: "Destinatari",
    question: "A chi si rivolge?",
    pattern: "lines" as const,
    content: (
      <div className="space-y-5">
        <div>
          <h4 className="font-medium text-foreground mb-2">Per i cittadini</h4>
          <p>
            Una fonte affidabile per conoscere e approfondire la finanza pubblica 
            con dati verificati e trasparenti.
          </p>
        </div>
        <div>
          <h4 className="font-medium text-foreground mb-2">Per gli specialisti</h4>
          <p>
            Accesso a dati analitici certificati per analisi ed elaborazioni 
            professionali dedicate.
          </p>
        </div>
      </div>
    ),
  },
];

export const AppleCardSection = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-50px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.5, 1, 1, 0.5]);

  return (
    <section
      ref={sectionRef}
      className="relative pt-8 md:pt-12 pb-8 md:pb-12 px-0 overflow-hidden"
    >
      {/* Subtle background gradient - removed for side-by-side layout */}

      <motion.div style={{ opacity }} className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-8 md:mb-10"
        >
          <motion.p
            className="text-sm font-medium text-primary mb-3 tracking-wide"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Scopri OpenDAG
          </motion.p>
          <h2 className="text-3xl md:text-[2.75rem] font-semibold text-foreground leading-tight tracking-tight">
            Trasparenza e dati aperti
            <br />
            <span className="text-muted-foreground font-normal">
              per la Pubblica Amministrazione
            </span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-5 items-stretch">
          {cardsData.map((card, index) => (
            <AppleCard
              key={index}
              index={index}
              icon={card.icon}
              label={card.label}
              question={card.question}
              content={card.content}
              pattern={card.pattern}
              isActive={activeCard === index}
              isOtherActive={activeCard !== null && activeCard !== index}
              onActivate={() => setActiveCard(index)}
              onDeactivate={() => setActiveCard(null)}
            />
          ))}
        </div>

        {/* Hint text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.5 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-sm text-muted-foreground mt-12"
        >
          Clicca su una card per esplorare
        </motion.p>
      </motion.div>
    </section>
  );
};