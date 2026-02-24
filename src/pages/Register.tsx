import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";
import emblem from "@/assets/logmas-emblem.png";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-lg bg-card rounded-2xl shadow-elevated p-8 border border-border">
        <Link to="/" className="flex items-center gap-3 mb-8 justify-center">
          <img src={emblem} alt="LOGMAS" className="h-10 w-10" />
          <span className="font-display font-bold text-xl text-foreground">LOGMAS</span>
        </Link>

        <h1 className="font-display text-2xl font-bold text-foreground text-center mb-1">Create Account</h1>
        <p className="text-muted-foreground text-center mb-8">Register to access government services.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="John" className="mt-1.5 h-11" />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Doe" className="mt-1.5 h-11" />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="you@example.com" className="mt-1.5 h-11" />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" placeholder="+234 800 000 0000" className="mt-1.5 h-11" />
          </div>
          <div>
            <Label htmlFor="lga">Local Government Area</Label>
            <Select>
              <SelectTrigger className="mt-1.5 h-11">
                <SelectValue placeholder="Select your LGA" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="abeokuta-north">Abeokuta North</SelectItem>
                <SelectItem value="abeokuta-south">Abeokuta South</SelectItem>
                <SelectItem value="ado-odo">Ado-Odo/Ota</SelectItem>
                <SelectItem value="ijebu-ode">Ijebu Ode</SelectItem>
                <SelectItem value="sagamu">Sagamu</SelectItem>
                <SelectItem value="ikenne">Ikenne</SelectItem>
                <SelectItem value="obafemi-owode">Obafemi Owode</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="regPassword">Password</Label>
            <div className="relative mt-1.5">
              <Input
                id="regPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                className="h-11 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <Button type="submit" variant="hero" size="lg" className="w-full mt-2">
            Create Account
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
