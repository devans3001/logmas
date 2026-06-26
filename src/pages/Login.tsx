// src/pages/Login.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Shield, User, Building2, Users } from "lucide-react";
import emblem from "@/assets/logmas-emblem.png";
import { login } from "@/lib/auth";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const user = login(email, password);
    if (!user) { setError("Invalid email or password."); return; }
    if (user.role === "admin") navigate("/admin");
    else if (user.role === "ward") navigate("/ward");
    else navigate("/dashboard");
  };

  const fillCredentials = (roleEmail: string, rolePassword: string) => {
    setEmail(roleEmail);
    setPassword(rolePassword);
    setError("");
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-3 mb-10">
            <img src={emblem} alt="LOGMAS" className="h-10 w-10" />
            <span className="font-display font-bold text-xl text-foreground">LOGMAS</span>
          </Link>

          <h1 className="font-display text-2xl font-bold text-foreground mb-2">Welcome back</h1>
          <p className="text-muted-foreground mb-8">Sign in to access your government services.</p>

          {/* Quick login buttons */}
          <div className="mb-6 space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Quick Login
            </p>
            <div className="grid grid-cols-3 gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fillCredentials("citizen@logmas.ng", "citizen123")}
                className="flex flex-col items-center gap-1 h-auto py-2"
              >
                <User className="h-4 w-4" />
                <span className="text-xs">Citizen</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fillCredentials("admin@logmas.ng", "admin123")}
                className="flex flex-col items-center gap-1 h-auto py-2"
              >
                <Building2 className="h-4 w-4" />
                <span className="text-xs">Admin</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fillCredentials("ward@logmas.ng", "ward123")}
                className="flex flex-col items-center gap-1 h-auto py-2"
              >
                <Users className="h-4 w-4" />
                <span className="text-xs">Ward</span>
              </Button>
            </div>
          </div>

          {/* Demo hint - optional, can be removed or kept */}
          <div className="mb-6 p-3 rounded-lg bg-muted text-xs text-muted-foreground space-y-1">
            <p className="font-semibold text-foreground">Demo Credentials</p>
            <p>🏠 Citizen: citizen@logmas.ng / citizen123</p>
            <p>🛡️ LGA Admin: admin@logmas.ng / admin123</p>
            <p>🏛️ Ward Officer: ward@logmas.ng / ward123</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="you@example.com"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="mt-1.5 h-11" 
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
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
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" variant="hero" size="lg" className="w-full">Sign In</Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-medium hover:underline">Register here</Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-gradient-primary items-center justify-center p-12">
        <div className="text-center text-primary-foreground max-w-md">
          <Shield className="h-16 w-16 mx-auto mb-6 opacity-80" />
          <h2 className="font-display text-3xl font-bold mb-4">Secure Government Portal</h2>
          <p className="text-primary-foreground/70 leading-relaxed">
            Access all your local government services from one secure platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;