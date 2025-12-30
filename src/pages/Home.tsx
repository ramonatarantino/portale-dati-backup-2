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
      
        
        {/*<UserTargetSection />*/}
        
        {/* <ChartsSection /> */}
        
        <BarChartRace />
        <NewsSection />


        
      </main>

      <Footer />
    </div>
  );
};

export default Home;
