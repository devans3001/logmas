import PublicNavbar from "@/components/PublicNavbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PublicFooter from "@/components/PublicFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <PublicFooter />
    </div>
  );
};

export default Index;
