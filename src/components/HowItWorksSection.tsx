import { UserPlus, FileCheck, CreditCard, Download } from "lucide-react";

const steps = [
  { icon: UserPlus, title: "Register", description: "Create your account in minutes with basic information." },
  { icon: FileCheck, title: "Apply", description: "Fill out the application form for your desired certificate." },
  { icon: CreditCard, title: "Pay", description: "Make secure online payments for processing fees." },
  { icon: Download, title: "Download", description: "Receive and download your official certificate." },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/15 text-accent text-sm font-semibold mb-4">
            Simple Process
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Get your government services in four easy steps.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.title} className="text-center relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-border" />
              )}
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-primary text-primary-foreground mb-5 shadow-lg">
                <step.icon className="h-8 w-8" />
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center shadow-gold">
                  {index + 1}
                </span>
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
