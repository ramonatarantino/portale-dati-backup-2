import Header from "@/components/layout/Header_homepage";
import HeroSection from "@/components/layout/HeroSection_homepage"
import NewsSection from "@/components/ui/NewsSection";
import UserTargetSection from "@/components/ui/UserTargetSection";
import DataTabs from "@/components/ui/DataTabs";
import ChartsSection from "@/components/ui/ChartsSection";
import DashboardTabs from "@/components/ui/DashboardTabs";
import Footer from "@/components/layout/Footer_homepage";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <HeroSection />
        <NewsSection />
        <UserTargetSection />
        <DataTabs />
        <ChartsSection />

        {/* ENTRY POINT ALLA DASHBOARD */}
        <DashboardTabs />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
