import Header from "@/components/layout/Header_homepage";
import HeroSection from "@/components/layout/HeroSection_homepage"
import NewsSection from "@/components/ui/NewsSection";
import UserTargetSection from "@/components/ui/UserTargetSection";
import DataTabs from "@/components/ui/DataTabs";
import ChartsSection from "@/components/ui/ChartsSection";
import DashboardTabs from "@/components/ui/DashboardTabs";
import Footer from "@/components/layout/Footer_homepage";
import { BarChartRace } from '@/components/BarChartRace';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <HeroSection />
        <DataTabs />
        <DashboardTabs />
        
        {/* BarChartRace Section */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Distribuzione della Spesa Temporale
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Esplora l'evoluzione temporale delle spese per le diverse amministrazioni pubbliche,
                con un'analisi dinamica che mostra i cambiamenti nel tempo e le tendenze di spesa.
              </p>
            </div>
          </div>
        </section>
        
        <BarChartRace />
        <NewsSection />


        
      </main>

      <Footer />
    </div>
  );
};

export default Home;
