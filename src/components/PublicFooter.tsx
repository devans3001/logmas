import { Link } from "react-router-dom";
import emblem from "@/assets/logmas-emblem.png";

const PublicFooter = () => {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={emblem} alt="LOGMAS" className="h-10 w-10 object-contain brightness-200" />
              <span className="font-display font-bold text-xl">LOGMAS</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Ogun State Local Government Management System. Bringing government services closer to the people.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/register" className="hover:text-primary-foreground transition-colors">Birth Certificate</Link></li>
              <li><Link to="/register" className="hover:text-primary-foreground transition-colors">Marriage Certificate</Link></li>
              <li><Link to="/register" className="hover:text-primary-foreground transition-colors">Death Certificate</Link></li>
              <li><Link to="/register" className="hover:text-primary-foreground transition-colors">State of Origin</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/login" className="hover:text-primary-foreground transition-colors">Sign In</Link></li>
              <li><Link to="/register" className="hover:text-primary-foreground transition-colors">Register</Link></li>
              <li><Link to="/shop-portal" className="hover:text-primary-foreground transition-colors">Shop Owner Portal</Link></li>
              <li><Link to="/business-portal" className="hover:text-primary-foreground transition-colors">Business Portal</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>Ogun State Government Secretariat</li>
              <li>Oke-Mosan, Abeokuta</li>
              <li>info@logmas.ogunstate.gov.ng</li>
              <li>+234 (0) 800 LOGMAS</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/60">
            © 2026 LOGMAS — Ogun State Government. All rights reserved.
          </p>
          <p className="text-sm text-primary-foreground/60">
            Powered by Ogun State ICT Agency
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
