import Header from "@/components/layout/Header_homepage";
import HeroSection from "@/components/layout/HeroSection_homepage"
import NewsSection from "@/components/ui/NewsSection";
import UserTargetSection from "@/components/ui/UserTargetSection";
import DataTabs from "@/components/ui/DataTabs";
import ChartsSection from "@/components/ui/ChartsSection";
import DashboardTabs from "@/components/ui/DashboardTabs";
import Footer from "@/components/layout/Footer_homepage";
import { BarChartRace } from '@/components/BarChartRace';
import { Database, Eye, Share2, Zap } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <HeroSection />
        <DataTabs />
        <DashboardTabs />
        
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <TooltipProvider>
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 animate-fade-in">
                  Cosa sono gli Open Data?
                </h2>
                <div className="flex justify-center items-center gap-6 mb-8">
                  <div className="group relative">
                    <Database className="h-12 w-12 text-primary animate-bounce" />
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full animate-ping opacity-75"></div>
                  </div>
                  <div className="group relative">
                    <Eye className="h-12 w-12 text-primary animate-pulse" />
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full animate-ping opacity-75"></div>
                  </div>
                  <div className="group relative">
                    <Share2 className="h-12 w-12 text-primary animate-bounce" style={{ animationDelay: '0.5s' }} />
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full animate-ping opacity-75"></div>
                  </div>
                  <div className="group relative">
                    <Zap className="h-12 w-12 text-primary animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full animate-ping opacity-75"></div>
                  </div>
                </div>
                <div className="animate-fade-in">
                  <p className="text-muted-foreground text-lg max-w-4xl mx-auto leading-relaxed">
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
                </div>
              </div>
            </TooltipProvider>
          </div>
        </section>
        
        <NewsSection />


        
      </main>

      <Footer />
    </div>
  );
};

export default Home;
