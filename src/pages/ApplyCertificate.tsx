import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, ChevronRight } from "lucide-react";

const steps = ["Certificate Type", "Personal Details", "Additional Info", "Preview", "Complete"];

const ApplyCertificate = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [certType, setCertType] = useState("");

  const next = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-2xl font-bold text-foreground mb-6">Apply for Certificate</h2>

        {/* Stepper */}
        <div className="flex items-center mb-8 overflow-x-auto">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${
                i <= currentStep ? "bg-primary/10 text-primary" : "text-muted-foreground"
              }`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  i < currentStep ? "bg-primary text-primary-foreground" : i === currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {i < currentStep ? <CheckCircle className="h-4 w-4" /> : i + 1}
                </span>
                <span className="hidden sm:inline">{step}</span>
              </div>
              {i < steps.length - 1 && <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />}
            </div>
          ))}
        </div>

        <div className="bg-card rounded-xl p-6 shadow-card border border-border">
          {currentStep === 0 && (
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-lg text-foreground">Select Certificate Type</h3>
              <Select value={certType} onValueChange={setCertType}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Choose certificate type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="birth">Birth Certificate</SelectItem>
                  <SelectItem value="death">Death Certificate</SelectItem>
                  <SelectItem value="marriage">Marriage Certificate</SelectItem>
                  <SelectItem value="origin">State of Origin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-lg text-foreground">Personal Details</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><Label>Full Name</Label><Input className="mt-1.5 h-11" placeholder="Enter full name" /></div>
                <div><Label>Date of Birth</Label><Input type="date" className="mt-1.5 h-11" /></div>
                <div><Label>Gender</Label>
                  <Select><SelectTrigger className="mt-1.5 h-11"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent>
                  </Select>
                </div>
                <div><Label>Phone Number</Label><Input className="mt-1.5 h-11" placeholder="+234..." /></div>
              </div>
              <div><Label>Address</Label><Textarea className="mt-1.5" placeholder="Enter your address" /></div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-lg text-foreground">Additional Information</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><Label>Father's Name</Label><Input className="mt-1.5 h-11" placeholder="Enter father's name" /></div>
                <div><Label>Mother's Name</Label><Input className="mt-1.5 h-11" placeholder="Enter mother's name" /></div>
                <div><Label>LGA of Origin</Label>
                  <Select><SelectTrigger className="mt-1.5 h-11"><SelectValue placeholder="Select LGA" /></SelectTrigger>
                    <SelectContent><SelectItem value="abeokuta-north">Abeokuta North</SelectItem><SelectItem value="abeokuta-south">Abeokuta South</SelectItem></SelectContent>
                  </Select>
                </div>
                <div><Label>Purpose</Label><Input className="mt-1.5 h-11" placeholder="Reason for application" /></div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-lg text-foreground">Preview Application</h3>
              <div className="bg-muted/50 rounded-lg p-5 space-y-3">
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Certificate Type</span><span className="font-medium text-foreground capitalize">{certType || "Birth"} Certificate</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Application Fee</span><span className="font-medium text-foreground">₦5,000</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Processing Time</span><span className="font-medium text-foreground">3-5 Business Days</span></div>
              </div>
              <p className="text-sm text-muted-foreground">By submitting, you confirm that all information provided is accurate.</p>
            </div>
          )}

          {currentStep === 4 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-success/15 text-success flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-2">Application Submitted!</h3>
              <p className="text-muted-foreground mb-1">Your application ID: <strong>APP-2026-0451</strong></p>
              <p className="text-sm text-muted-foreground">You will be notified once your application is reviewed.</p>
            </div>
          )}

          {/* Navigation */}
          {currentStep < 4 && (
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={prev} disabled={currentStep === 0}>Back</Button>
              <Button variant="hero" onClick={next}>{currentStep === 3 ? "Submit Application" : "Continue"}</Button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ApplyCertificate;
