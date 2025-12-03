import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { FileText, CreditCard, CheckCircle2, ArrowRight, ArrowLeft, Mail, Building2, Smartphone, Bitcoin, Users } from "lucide-react";

const Apply = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    organizationName: "",
    applicantName: "",
    email: "",
    phone: "",
    country: "",
    location: "",
    projectDescription: "",
    monthlyExpenditure: "",
    requestedAmount: "",
  });
  const [documentsConfirmed, setDocumentsConfirmed] = useState({
    registration: false,
    idDocument: false,
    projectPhotos: false,
  });
  const [showPayment, setShowPayment] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);

  const processingFee = formData.requestedAmount 
    ? (parseFloat(formData.requestedAmount) * 0.04).toFixed(2) 
    : "0.00";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.organizationName || !formData.applicantName || !formData.email || !formData.phone || !formData.country || !formData.location || !formData.projectDescription) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setCurrentStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.monthlyExpenditure || !formData.requestedAmount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all financial information.",
        variant: "destructive",
      });
      return;
    }

    if (!documentsConfirmed.registration || !documentsConfirmed.idDocument) {
      toast({
        title: "Documents Required",
        description: "Please confirm you have sent the required documents to our email.",
        variant: "destructive",
      });
      return;
    }

    setShowPayment(true);
  };

  const handlePayment = () => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Application Submitted!",
        description: "Your application has been received. We will review it and contact you within 5-7 business days.",
      });
      setFormData({
        organizationName: "",
        applicantName: "",
        email: "",
        phone: "",
        country: "",
        location: "",
        projectDescription: "",
        monthlyExpenditure: "",
        requestedAmount: "",
      });
      setDocumentsConfirmed({ registration: false, idDocument: false, projectPhotos: false });
      setShowPayment(false);
      setCurrentStep(1);
    }, 2000);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-gold/20 text-gold text-sm font-medium mb-6">
              Apply for Support
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Request Assistance
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              We welcome registered community institutions, schools, orphan programs, and humanitarian projects to submit verified requests for support.
            </p>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Step Indicator */}
            {!showPayment && (
              <div className="flex items-center justify-center mb-12">
                <div className="flex items-center gap-4">
                  <div className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-gold' : 'text-muted-foreground'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${currentStep >= 1 ? 'bg-gold text-forest-dark' : 'bg-muted text-muted-foreground'}`}>
                      1
                    </div>
                    <span className="hidden sm:inline font-medium">Basic Info</span>
                  </div>
                  <div className={`w-12 h-0.5 ${currentStep >= 2 ? 'bg-gold' : 'bg-muted'}`} />
                  <div className={`flex items-center gap-2 ${currentStep >= 2 ? 'text-gold' : 'text-muted-foreground'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${currentStep >= 2 ? 'bg-gold text-forest-dark' : 'bg-muted text-muted-foreground'}`}>
                      2
                    </div>
                    <span className="hidden sm:inline font-medium">Financial & Documents</span>
                  </div>
                </div>
              </div>
            )}

            {!showPayment ? (
              <>
                {/* Step 1: Basic Information & Project Description */}
                {currentStep === 1 && (
                  <form onSubmit={handleStep1Submit} className="space-y-8">
                    <div className="bg-card rounded-2xl p-8 shadow-card">
                      <h2 className="font-display text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-gold" />
                        Organization Information
                      </h2>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="organizationName">Organization Name *</Label>
                          <Input
                            id="organizationName"
                            name="organizationName"
                            value={formData.organizationName}
                            onChange={handleInputChange}
                            placeholder="Enter organization name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="applicantName">Applicant Name *</Label>
                          <Input
                            id="applicantName"
                            name="applicantName"
                            value={formData.applicantName}
                            onChange={handleInputChange}
                            placeholder="Your full name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your@email.com"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+1 234 567 8900"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Country *</Label>
                          <Input
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            placeholder="Country"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">City/Location *</Label>
                          <Input
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="City or region"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-card rounded-2xl p-8 shadow-card">
                      <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                        Project Description
                      </h2>
                      
                      <div className="space-y-2">
                        <Label htmlFor="projectDescription">Detailed Project Description *</Label>
                        <Textarea
                          id="projectDescription"
                          name="projectDescription"
                          value={formData.projectDescription}
                          onChange={handleInputChange}
                          placeholder="Please describe your project, its goals, current challenges, and how the requested funds will be used..."
                          rows={6}
                          required
                        />
                      </div>
                    </div>

                    <Button type="submit" variant="gold" size="lg" className="w-full">
                      Continue to Step 2
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                )}

                {/* Step 2: Financial Information & Document Confirmation */}
                {currentStep === 2 && (
                  <form onSubmit={handleStep2Submit} className="space-y-8">
                    <div className="bg-card rounded-2xl p-8 shadow-card">
                      <h2 className="font-display text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-gold" />
                        Financial Information
                      </h2>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="monthlyExpenditure">Current Monthly Expenditure (USD) *</Label>
                          <Input
                            id="monthlyExpenditure"
                            name="monthlyExpenditure"
                            type="number"
                            value={formData.monthlyExpenditure}
                            onChange={handleInputChange}
                            placeholder="e.g., 5000"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="requestedAmount">Requested Amount (USD) *</Label>
                          <Input
                            id="requestedAmount"
                            name="requestedAmount"
                            type="number"
                            value={formData.requestedAmount}
                            onChange={handleInputChange}
                            placeholder="e.g., 10000"
                            required
                          />
                        </div>
                      </div>

                      {formData.requestedAmount && (
                        <div className="mt-4 p-4 rounded-lg bg-gold/10 border border-gold/20">
                          <p className="text-sm text-foreground">
                            <span className="font-medium">Processing Fee (4%):</span>{" "}
                            <span className="text-gold font-semibold">${processingFee} USD</span>
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            This fee helps us process applications efficiently and verify project authenticity.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Document Confirmation */}
                    <div className="bg-card rounded-2xl p-8 shadow-card">
                      <h2 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Mail className="w-5 h-5 text-gold" />
                        Document Submission
                      </h2>
                      
                      <div className="bg-gold/10 border border-gold/20 rounded-lg p-4 mb-6">
                        <p className="text-sm text-foreground mb-2">
                          <span className="font-semibold">Please email the following documents to:</span>
                        </p>
                        <a 
                          href="mailto:urdf@proton.me" 
                          className="text-gold font-semibold hover:underline"
                        >
                          urdf@proton.me
                        </a>
                        <p className="text-xs text-muted-foreground mt-2">
                          Include your organization name in the email subject line.
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary">
                          <Checkbox
                            id="registration"
                            checked={documentsConfirmed.registration}
                            onCheckedChange={(checked) => 
                              setDocumentsConfirmed({ ...documentsConfirmed, registration: checked as boolean })
                            }
                          />
                          <div className="flex-1">
                            <label htmlFor="registration" className="text-sm font-medium text-foreground cursor-pointer">
                              Registration Certificate *
                            </label>
                            <p className="text-xs text-muted-foreground mt-1">
                              I have sent the organization's registration certificate
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary">
                          <Checkbox
                            id="idDocument"
                            checked={documentsConfirmed.idDocument}
                            onCheckedChange={(checked) => 
                              setDocumentsConfirmed({ ...documentsConfirmed, idDocument: checked as boolean })
                            }
                          />
                          <div className="flex-1">
                            <label htmlFor="idDocument" className="text-sm font-medium text-foreground cursor-pointer">
                              Applicant ID/Passport *
                            </label>
                            <p className="text-xs text-muted-foreground mt-1">
                              I have sent a copy of my ID or passport
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary">
                          <Checkbox
                            id="projectPhotos"
                            checked={documentsConfirmed.projectPhotos}
                            onCheckedChange={(checked) => 
                              setDocumentsConfirmed({ ...documentsConfirmed, projectPhotos: checked as boolean })
                            }
                          />
                          <div className="flex-1">
                            <label htmlFor="projectPhotos" className="text-sm font-medium text-foreground cursor-pointer">
                              Project Photos (Optional)
                            </label>
                            <p className="text-xs text-muted-foreground mt-1">
                              I have sent photos of the project/facility
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        className="flex-1"
                        onClick={() => setCurrentStep(1)}
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </Button>
                      <Button type="submit" variant="gold" size="lg" className="flex-1">
                        Confirm Application
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </form>
                )}
              </>
            ) : (
              /* Payment Section */
              <div className="bg-card rounded-2xl p-8 shadow-card">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-8 h-8 text-gold" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                    Application Processing Fee
                  </h2>
                  <p className="text-muted-foreground">
                    Complete your application by paying the processing fee
                  </p>
                </div>

                <div className="bg-secondary rounded-xl p-6 mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-foreground">Requested Amount</span>
                    <span className="font-semibold">${formData.requestedAmount} USD</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-foreground">Processing Fee (4%)</span>
                    <span className="font-semibold text-gold">${processingFee} USD</span>
                  </div>
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-foreground">Amount Due Now</span>
                      <span className="text-xl font-bold text-gold">${processingFee} USD</span>
                    </div>
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div className="mb-8">
                  <h3 className="font-medium text-foreground mb-4">Select Payment Method</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { id: "bank", label: "Bank Transfer", icon: Building2 },
                      { id: "card", label: "Card", icon: CreditCard },
                      { id: "mobile", label: "Mobile Money", icon: Smartphone },
                      { id: "crypto", label: "Crypto (BTC)", icon: Bitcoin },
                      { id: "other", label: "Other / Agent", icon: Users },
                    ].map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setSelectedPaymentMethod(method.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
                          selectedPaymentMethod === method.id
                            ? "border-gold bg-gold/10 text-gold"
                            : "border-border bg-secondary hover:border-gold/50 text-foreground"
                        }`}
                      >
                        <method.icon className="w-6 h-6" />
                        <span className="text-sm font-medium">{method.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      This fee helps us verify project authenticity and process applications efficiently
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      Your application will be reviewed within 5-7 business days
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      Secure payment processing with full transparency
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowPayment(false)}
                  >
                    Back
                  </Button>
                  <Button
                    variant="gold"
                    className="flex-1"
                    onClick={handlePayment}
                    disabled={isSubmitting || !selectedPaymentMethod}
                  >
                    {isSubmitting ? "Processing..." : `Pay $${processingFee} USD`}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Apply;
