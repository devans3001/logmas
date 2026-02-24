import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import emblem from "@/assets/logmas-emblem.png";

const PublicNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={emblem} alt="LOGMAS" className="h-10 w-10 object-contain" />
          <div>
            <span className="font-display font-bold text-lg text-foreground">LOGMAS</span>
            <span className="hidden sm:block text-xs text-muted-foreground leading-none">Ogun State LG Management</span>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#services" className="hover:text-primary transition-colors">Services</a>
          <a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a>
          <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:inline">
            Sign In
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 h-10 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all active:scale-[0.98]"
          >
            <Shield className="h-4 w-4" />
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;
