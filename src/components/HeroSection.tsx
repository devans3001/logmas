import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Store } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Abeokuta, Ogun State" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-20">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground text-sm font-medium mb-8 animate-fade-in">
            <Shield className="h-4 w-4" />
            Ogun State Government Digital Platform
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
            Welcome to{" "}
            <span className="relative">
              LOGMAS
              <span className="absolute bottom-1 left-0 right-0 h-3 bg-accent/30 -z-10 rounded" />
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: "200ms" }}>
            Apply for certificates, pay levies, and manage your government services online — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <Button variant="gold" size="xl" asChild>
              <Link to="/register">
                Apply for Certificate <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline-hero" size="xl" asChild>
              <Link to="/shop-portal">
                <Store className="h-5 w-5" /> Pay Shop Levy
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 max-w-lg mx-auto animate-fade-in" style={{ animationDelay: "400ms" }}>
            {[
              { value: "20+", label: "Local Govts" },
              { value: "50K+", label: "Citizens Served" },
              { value: "99%", label: "Uptime" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-2xl sm:text-3xl font-bold text-accent">{stat.value}</div>
                <div className="text-primary-foreground/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
