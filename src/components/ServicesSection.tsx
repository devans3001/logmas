import { Link } from "react-router-dom";
import { FileText, Heart, Users, MapPin, ArrowRight, Home, Building2, Store, Map } from "lucide-react";

const services = [
  { icon: FileText, title: "Birth Certificate", description: "Register births and obtain official birth certificates.", color: "text-primary", bg: "bg-primary/10", link: "/dashboard/apply" },
  { icon: Heart, title: "Marriage Certificate", description: "Apply for officially recognized marriage certificates.", color: "text-accent", bg: "bg-accent/10", link: "/dashboard/apply" },
  { icon: Users, title: "Death Certificate", description: "Process death registrations and obtain certificates.", color: "text-info", bg: "bg-info/10", link: "/dashboard/apply" },
  { icon: MapPin, title: "State of Origin", description: "Obtain your State of Origin certificate.", color: "text-success", bg: "bg-success/10", link: "/dashboard/apply" },
  { icon: Map, title: "Street Registration", description: "Register or renew street names in Logmas.", color: "text-primary", bg: "bg-primary/10", link: "/dashboard/street-registration" },
  { icon: Home, title: "Tenement Rate", description: "Pay property tenement rates online.", color: "text-accent", bg: "bg-accent/10", link: "/dashboard/tenement-rate" },
  { icon: Building2, title: "Company Demand Notice", description: "Pay business demand notice fees.", color: "text-info", bg: "bg-info/10", link: "/dashboard/demand-notice" },
  { icon: Store, title: "Shop Levy", description: "Pay shop levy and manage shop registration.", color: "text-success", bg: "bg-success/10", link: "/shop-portal" },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">Our Services</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Logmas Government Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Access all essential government services online. No more long queues or complicated paperwork.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={service.title} className="group bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border border-border" style={{ animationDelay: `${index * 50}ms` }}>
              <div className={`${service.bg} ${service.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{service.description}</p>
              <Link to={service.link} className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all">
                Apply Now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
