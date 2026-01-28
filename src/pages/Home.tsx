import { useCallback, useEffect, useRef } from "react";
import Header from "@/components/layout/Header_homepage";
import HeroSection from "@/components/layout/HeroSection_homepage";
import NewsSection from "@/components/ui/NewsSection";
import DataTabs from "@/components/ui/DataTabs";
import DashboardTabs from "@/components/ui/DashboardTabs";
import Footer from "@/components/layout/Footer_homepage";
import { Database, Eye, Share2, Zap } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AutoTutorial } from "@/components/AutoTutorial/AutoTutorial";
import { AppleCardSection } from "@/components/AppleCard/AppleCardSection";
import { DataSection } from "@/components/DataSection/DataSection";



const Home = () => {
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

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
        <HeroSection />

        <div className="min-h-screen bg-background">
          <AppleCardSection />
        </div>

        <main className="min-h-screen bg-background">
          <DataSection />
        </main>

        {/* 2. Sezione educativa sugli Open Data + tutorial */}
        <section
          ref={registerRevealRef(0)}
          className="reveal-section py-16 md:py-24 bg-secondary/30"
        >
          <div className="container mx-auto px-4">
            <TooltipProvider>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                {/* Colonna sinistra: spiegazione Open Data */}
                <div className="text-left">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 animate-fade-in">
                    Cosa sono gli Open Data?
                  </h2>
                  <div className="flex flex-wrap md:flex-nowrap justify-start items-center gap-4 mb-6">
                    <div className="group relative">
                      <Database className="h-10 w-10 md:h-12 md:w-12 text-primary animate-bounce" />
                      <div className="absolute -top-2 -right-2 w-3 h-3 md:w-4 md:h-4 bg-primary rounded-full animate-ping opacity-75"></div>
                    </div>
                    <div className="group relative">
                      <Eye className="h-10 w-10 md:h-12 md:w-12 text-primary animate-pulse" />
                      <div className="absolute -top-2 -right-2 w-3 h-3 md:w-4 md:h-4 bg-primary rounded-full animate-ping opacity-75"></div>
                    </div>
                    <div className="group relative">
                      <Share2 className="h-10 w-10 md:h-12 md:w-12 text-primary animate-bounce" style={{ animationDelay: '0.5s' }} />
                      <div className="absolute -top-2 -right-2 w-3 h-3 md:w-4 md:h-4 bg-primary rounded-full animate-ping opacity-75"></div>
                    </div>
                    <div className="group relative">
                      <Zap className="h-10 w-10 md:h-12 md:w-12 text-primary animate-pulse" style={{ animationDelay: '1s' }} />
                      <div className="absolute -top-2 -right-2 w-3 h-3 md:w-4 md:h-4 bg-primary rounded-full animate-ping opacity-75"></div>
                    </div>
                  </div>
                  <div className="animate-fade-in">
                    <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
                      Il Ministero dell'Economia e delle Finanze è impegnato a realizzare obiettivi di{' '}
                      <Tooltip>
                        <TooltipTrigger>
                          <span className="text-primary font-semibold animate-pulse cursor-help">trasparenza</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>La trasparenza amministrativa garantisce l'accesso pubblico alle informazioni e ai processi decisionali.</p>
                        </TooltipContent>
                      </Tooltip>{' '}
                      e condivisione del suo patrimonio informativo attraverso la pubblicazione di{' '}
                      <Tooltip>
                        <TooltipTrigger>
                          <span className="text-primary font-semibold animate-pulse cursor-help">Open Data</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Dati pubblici liberamente accessibili, utilizzabili e ridistribuibili da chiunque.</p>
                        </TooltipContent>
                      </Tooltip>
                      . Gli Open Data sono informazioni e dati pubblici resi disponibili in formato digitale non proprietario, senza{' '}
                      <Tooltip>
                        <TooltipTrigger>
                          <span className="text-primary font-semibold animate-pulse cursor-help">copyright</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Diritti esclusivi di sfruttamento di un'opera intellettuale.</p>
                        </TooltipContent>
                      </Tooltip>
                      ,{' '}
                      <Tooltip>
                        <TooltipTrigger>
                          <span className="text-primary font-semibold animate-pulse cursor-help">brevetti</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Diritti esclusivi di sfruttamento di un'invenzione tecnica.</p>
                        </TooltipContent>
                      </Tooltip>{' '}
                      o altri limiti all'
                      <Tooltip>
                        <TooltipTrigger>
                          <span className="text-primary font-semibold animate-pulse cursor-help">utilizzo</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Possibilità di usare, modificare e distribuire i dati liberamente.</p>
                        </TooltipContent>
                      </Tooltip>{' '}
                      ed alla riproduzione.
                    </p>
                    <div className="mt-8 space-y-8">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          <a
                            href="/dashboard"
                            className="text-primary hover:underline"
                          >
                            Dati stipendiali NoiPa
                          </a>
                        </h3>
                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                          Con gli open data NoiPA ogni cittadino ha accesso a strumenti che consentono la navigazione ed elaborazione dei Dataset in formato Linked Open Data (LOD), ad oggi lo standard tecnologico più avanzato per il trattamento delle banche dati online. I dati aperti riguardano le informazioni del personale delle Pubbliche Amministrazioni gestite nel sistema NoiPA, quali il numero di amministrati suddivisi per comune di residenza e unità organizzativa, le modalità di accredito degli stipendi, l'andamento delle tipologie contrattuali.
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          <a
                            href="/numeridag"
                            className="text-primary hover:underline"
                          >
                            Spesa Pensioni MEF
                          </a>
                        </h3>
                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                          Per dati statistici sulla spesa pensionistica possono essere scaricati, ricercati e visualizzati i dati relativi ai trattamenti pensionistici (diretti, indiretti e una tantum) sostenuti dalla Pubblica Amministrazione per: pensioni di guerra, pensioni tabellari militari, assegni (perseguitati politici, campi di sterminio, valore militare, medaglie), indennizzi (vittime del terrorismo, danni da vaccinazioni, trasfusioni).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Colonna destra: tab/tutorial sul funzionamento del portale */}
                <div className="bg-card border border-border rounded-xl shadow-sm p-4 md:p-6 animate-fade-in">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">
                    Come usare questo portale
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Segui il tutorial interattivo per capire rapidamente dove trovare i dati e come navigare tra le sezioni.
                  </p>
                  <AutoTutorial />
                </div>
              </div>
            </TooltipProvider>
          </div>
        </section>

        {/* 3. Cosa puoi fare nel portale (riuso DataTabs come sezione funzionale) */}
        <section ref={registerRevealRef(1)} className="reveal-section py-12">
          <DataTabs />
        </section>

        {/* 4. Accesso rapido alle due aree principali di Open Data */}
        <section ref={registerRevealRef(2)} className="reveal-section py-12">
          <DashboardTabs />
        </section>

        {/* 5. News e aggiornamenti */}
        <section ref={registerRevealRef(3)} className="reveal-section py-12">
          <NewsSection />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
