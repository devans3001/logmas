import { Link } from "react-router-dom";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";
import emblem from "@/assets/logmas-emblem.png";

const PublicNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={emblem} alt="LOGMAS" className="h-10 w-10 object-contain" />
          <div>
            <span className="font-display font-bold text-lg text-foreground">LOGMAS</span>
            <span className="hidden sm:block text-xs text-muted-foreground leading-none">Ifo Local Government Digital Platform</span>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#services" className="hover:text-primary transition-colors">Services</a>
          <a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a>
          <Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link>
          <Link to="/verify" className="hover:text-primary transition-colors">Verify Certificate</Link>
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
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-foreground">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-border px-4 py-4 space-y-3">
          <a href="#services" onClick={() => setMobileOpen(false)} className="block text-sm text-muted-foreground hover:text-primary">Services</a>
          <a href="#how-it-works" onClick={() => setMobileOpen(false)} className="block text-sm text-muted-foreground hover:text-primary">How It Works</a>
          <Link to="/faq" onClick={() => setMobileOpen(false)} className="block text-sm text-muted-foreground hover:text-primary">FAQ</Link>
          <Link to="/verify" onClick={() => setMobileOpen(false)} className="block text-sm text-muted-foreground hover:text-primary">Verify Certificate</Link>
          <Link to="/login" onClick={() => setMobileOpen(false)} className="block text-sm text-muted-foreground hover:text-primary">Sign In</Link>
        </div>
      )}
    </nav>
  );
};

export default PublicNavbar;
