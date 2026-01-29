import { useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header_homepage";
import HeroSection from "@/components/layout/HeroSection_homepage";
import NewsSection from "@/components/ui/NewsSection";
import DataTabs from "@/components/ui/DataTabs";
import Footer from "@/components/layout/Footer_homepage";
import { AppleCardSection } from "@/components/AppleCard/AppleCardSection";
import { DataSection } from "@/components/DataSection/DataSection";
import ScrollStackMotion from '@/components/charts/ScrollStackMotion';
import { ScrollSection } from "@/components/ui/ScrollSection";
import { ServiziSection } from "@/components/ui/ServiziSection"


const Home = () => {
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  const scrollStackCards = [
    {
      title: "Analisi Avanzate",
      description: "Esplora dati dettagliati e approfondimenti avanzati sui temi OpenDAG"
    },
    {
      title: "Dashboard Interattive",
      description: "Visualizza i dati attraverso grafici dinamici e dashboard personalizzabili"
    },
    {
      title: "Rapporti Tematici",
      description: "Accedi a rapporti dettagliati organizzati per area tematica"
    },
    {
      title: "Dati in Tempo Reale",
      description: "Monitora gli aggiornamenti e le novità in tempo reale"
    }
  ];

  const registerRevealRef = useCallback((index: number) => (node: HTMLElement | null) => {
    revealRefs.current[index] = node;
  }, []);

  useEffect(() => {
    const sections = revealRefs.current;
    if (!sections.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      sections.forEach((section) => section?.classList.add('reveal-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* 1. Hero: cosa è il portale e CTA principali */}
        <ScrollSection id="hero-section" sticky={false}>
          <HeroSection />
        </ScrollSection>

        <ScrollSection id="apple-cards-section" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Colonna sinistra: Apple Cards */}
              <div className="space-y-8">
                <AppleCardSection />
              </div>
              
              {/* Colonna destra: Servizi al Cittadino */}
              <div>
                <ServiziSection />
              </div>
            </div>
          </div>
        </ScrollSection>
        

        {/* Titolo sezione tematiche */}
        <ScrollSection id="tematiche-section" className="pt-16 md:pt-20 pb-8 md:pb-12 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 animate-fade-in">
                Le <span className="text-yellow-400 animate-pulse">Tematiche</span> di{" "}
                <span className="text-white font-extrabold">OpenDAG</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto animate-slide-up">
                <span className="font-semibold text-yellow-400">Approfondisci</span> i contenuti presenti nel portale{" "}
                <span className="text-white font-semibold animate-pulse">OpenDAG</span> organizzati per{" "}
                <span className="font-semibold text-yellow-400">area tematica</span>; ognuna di queste può essere{" "}
                <span className="font-semibold text-white">esplorata</span> in funzione delle esigenze{" "}
                <span className="font-semibold text-yellow-400">informative</span>, sia{" "}
                <span className="font-semibold text-white">generali</span> che di{" "}
                <span className="font-semibold text-yellow-400">dettaglio</span>, per garantirti un'esperienza di navigazione{" "}
                <span className="font-semibold text-white animate-pulse">adeguata</span> ai tuoi{" "}
                <span className="font-semibold text-yellow-400">interessi</span>.
              </p>
            </motion.div>
          </div>
        </ScrollSection>
        
        <ScrollSection id="data-section" disableEffects={true}>
          <DataSection />
        </ScrollSection>

        {/* 2. Cosa puoi fare nel portale (riuso DataTabs come sezione funzionale) */}
        <ScrollSection id="data-tabs-section" sticky={false}>
          <DataTabs />
        </ScrollSection>
        

        {/* 3. News e aggiornamenti
        <ScrollSection id="news-section" className="reveal-section py-12 " sticky={false}>
          <NewsSection />
        </ScrollSection> */}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
