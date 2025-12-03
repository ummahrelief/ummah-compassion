import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { FileText, CreditCard, CheckCircle2, ArrowRight, ArrowLeft, Mail, Bitcoin, Users, Wallet, Building2, Smartphone, Download } from "lucide-react";
import jsPDF from "jspdf";

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
    payoutMethod: "",
    bankName: "",
    bankAccountName: "",
    bankAccountNumber: "",
    bankSwiftCode: "",
    cryptoWalletAddress: "",
    mobileMoneyProvider: "",
    mobileMoneyNumber: "",
    mobileMoneyName: "",
  });
  const [documentsConfirmed, setDocumentsConfirmed] = useState({
    registration: false,
    idDocument: false,
    projectPhotos: false,
  });
  const [showPayment, setShowPayment] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [showCryptoPayment, setShowCryptoPayment] = useState(false);
  const [cryptoConfirming, setCryptoConfirming] = useState(false);
  const [cryptoCountdown, setCryptoCountdown] = useState(120);
  const [otherPaymentMethod, setOtherPaymentMethod] = useState("");

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
        payoutMethod: "",
        bankName: "",
        bankAccountName: "",
        bankAccountNumber: "",
        bankSwiftCode: "",
        cryptoWalletAddress: "",
        mobileMoneyProvider: "",
        mobileMoneyNumber: "",
        mobileMoneyName: "",
      });
      setDocumentsConfirmed({ registration: false, idDocument: false, projectPhotos: false });
      setShowPayment(false);
      setCurrentStep(1);
    }, 2000);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Ummah Relief and Development Fund", pageWidth / 2, 20, { align: "center" });
    doc.setFontSize(14);
    doc.text("Application Summary", pageWidth / 2, 30, { align: "center" });
    
    // Line
    doc.setLineWidth(0.5);
    doc.line(20, 35, pageWidth - 20, 35);
    
    let yPos = 45;
    const lineHeight = 8;
    
    // Organization Info
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Organization Information", 20, yPos);
    yPos += lineHeight;
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Organization Name: ${formData.organizationName}`, 20, yPos);
    yPos += lineHeight;
    doc.text(`Applicant Name: ${formData.applicantName}`, 20, yPos);
    yPos += lineHeight;
    doc.text(`Email: ${formData.email}`, 20, yPos);
    yPos += lineHeight;
    doc.text(`Phone: ${formData.phone}`, 20, yPos);
    yPos += lineHeight;
    doc.text(`Country: ${formData.country}`, 20, yPos);
    yPos += lineHeight;
    doc.text(`Location: ${formData.location}`, 20, yPos);
    yPos += lineHeight * 2;
    
    // Project Description
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Project Description", 20, yPos);
    yPos += lineHeight;
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const splitDescription = doc.splitTextToSize(formData.projectDescription, pageWidth - 40);
    doc.text(splitDescription, 20, yPos);
    yPos += splitDescription.length * 5 + lineHeight;
    
    // Financial Info
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Financial Information", 20, yPos);
    yPos += lineHeight;
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Monthly Expenditure: $${formData.monthlyExpenditure} USD`, 20, yPos);
    yPos += lineHeight;
    doc.text(`Requested Amount: $${formData.requestedAmount} USD`, 20, yPos);
    yPos += lineHeight;
    doc.text(`Processing Fee (4%): $${processingFee} USD`, 20, yPos);
    yPos += lineHeight * 2;
    
    // Payout Method
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Receiving Payment Method", 20, yPos);
    yPos += lineHeight;
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    if (formData.payoutMethod === "bank") {
      doc.text(`Method: Bank Account`, 20, yPos);
      yPos += lineHeight;
      doc.text(`Bank Name: ${formData.bankName}`, 20, yPos);
      yPos += lineHeight;
      doc.text(`Account Holder: ${formData.bankAccountName}`, 20, yPos);
      yPos += lineHeight;
      doc.text(`Account Number: ${formData.bankAccountNumber}`, 20, yPos);
      yPos += lineHeight;
      doc.text(`SWIFT Code: ${formData.bankSwiftCode || "N/A"}`, 20, yPos);
    } else if (formData.payoutMethod === "crypto") {
      doc.text(`Method: Crypto (BTC)`, 20, yPos);
      yPos += lineHeight;
      doc.text(`Wallet Address: ${formData.cryptoWalletAddress}`, 20, yPos);
    } else if (formData.payoutMethod === "mobilemoney") {
      doc.text(`Method: Mobile Money`, 20, yPos);
      yPos += lineHeight;
      doc.text(`Provider: ${formData.mobileMoneyProvider}`, 20, yPos);
      yPos += lineHeight;
      doc.text(`Phone Number: ${formData.mobileMoneyNumber}`, 20, yPos);
      yPos += lineHeight;
      doc.text(`Registered Name: ${formData.mobileMoneyName}`, 20, yPos);
    }
    
    // Footer
    doc.setFontSize(8);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, 280, { align: "center" });
    
    doc.save(`URDF_Application_${formData.organizationName.replace(/\s+/g, '_')}.pdf`);
    
    toast({
      title: "PDF Downloaded",
      description: "Your application summary has been downloaded.",
    });
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

                    {/* Payout Method */}
                    <div className="bg-card rounded-2xl p-8 shadow-card">
                      <h2 className="font-display text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                        <Wallet className="w-5 h-5 text-gold" />
                        Receiving Payment Method
                      </h2>
                      <p className="text-sm text-muted-foreground mb-6">
                        How would you like to receive funds if your application is approved?
                      </p>
                      
                      <div className="space-y-4 mb-6">
                        <div 
                          className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.payoutMethod === 'bank' ? 'border-gold bg-gold/10' : 'border-border hover:border-gold/50'}`}
                          onClick={() => setFormData({ ...formData, payoutMethod: 'bank' })}
                        >
                          <Building2 className={`w-5 h-5 ${formData.payoutMethod === 'bank' ? 'text-gold' : 'text-muted-foreground'}`} />
                          <span className="font-medium">Bank Account</span>
                        </div>
                        
                        <div 
                          className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.payoutMethod === 'crypto' ? 'border-gold bg-gold/10' : 'border-border hover:border-gold/50'}`}
                          onClick={() => setFormData({ ...formData, payoutMethod: 'crypto' })}
                        >
                          <Bitcoin className={`w-5 h-5 ${formData.payoutMethod === 'crypto' ? 'text-gold' : 'text-muted-foreground'}`} />
                          <span className="font-medium">Crypto (BTC)</span>
                        </div>
                        
                        <div 
                          className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.payoutMethod === 'mobilemoney' ? 'border-gold bg-gold/10' : 'border-border hover:border-gold/50'}`}
                          onClick={() => setFormData({ ...formData, payoutMethod: 'mobilemoney' })}
                        >
                          <Smartphone className={`w-5 h-5 ${formData.payoutMethod === 'mobilemoney' ? 'text-gold' : 'text-muted-foreground'}`} />
                          <span className="font-medium">Mobile Money</span>
                        </div>
                      </div>

                      {/* Bank Account Details */}
                      {formData.payoutMethod === 'bank' && (
                        <div className="grid md:grid-cols-2 gap-4 p-4 rounded-lg bg-secondary">
                          <div className="space-y-2">
                            <Label htmlFor="bankName">Bank Name *</Label>
                            <Input
                              id="bankName"
                              name="bankName"
                              value={formData.bankName}
                              onChange={handleInputChange}
                              placeholder="e.g., Standard Bank"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="bankAccountName">Account Holder Name *</Label>
                            <Input
                              id="bankAccountName"
                              name="bankAccountName"
                              value={formData.bankAccountName}
                              onChange={handleInputChange}
                              placeholder="Name on account"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="bankAccountNumber">Account Number *</Label>
                            <Input
                              id="bankAccountNumber"
                              name="bankAccountNumber"
                              value={formData.bankAccountNumber}
                              onChange={handleInputChange}
                              placeholder="Account number"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="bankSwiftCode">SWIFT/BIC Code</Label>
                            <Input
                              id="bankSwiftCode"
                              name="bankSwiftCode"
                              value={formData.bankSwiftCode}
                              onChange={handleInputChange}
                              placeholder="e.g., SBZAZAJJ"
                            />
                          </div>
                        </div>
                      )}

                      {/* Crypto Details */}
                      {formData.payoutMethod === 'crypto' && (
                        <div className="p-4 rounded-lg bg-secondary">
                          <div className="space-y-2">
                            <Label htmlFor="cryptoWalletAddress">BTC Wallet Address *</Label>
                            <Input
                              id="cryptoWalletAddress"
                              name="cryptoWalletAddress"
                              value={formData.cryptoWalletAddress}
                              onChange={handleInputChange}
                              placeholder="e.g., bc1q..."
                            />
                          </div>
                        </div>
                      )}

                      {/* Mobile Money Details */}
                      {formData.payoutMethod === 'mobilemoney' && (
                        <div className="grid md:grid-cols-2 gap-4 p-4 rounded-lg bg-secondary">
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="mobileMoneyProvider">Provider *</Label>
                            <Input
                              id="mobileMoneyProvider"
                              name="mobileMoneyProvider"
                              value={formData.mobileMoneyProvider}
                              onChange={handleInputChange}
                              placeholder="e.g., M-Pesa, MTN Mobile Money"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="mobileMoneyNumber">Phone Number *</Label>
                            <Input
                              id="mobileMoneyNumber"
                              name="mobileMoneyNumber"
                              value={formData.mobileMoneyNumber}
                              onChange={handleInputChange}
                              placeholder="+254 xxx xxx xxx"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="mobileMoneyName">Registered Name *</Label>
                            <Input
                              id="mobileMoneyName"
                              name="mobileMoneyName"
                              value={formData.mobileMoneyName}
                              onChange={handleInputChange}
                              placeholder="Name on account"
                            />
                          </div>
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { id: "online", label: "Bank / Card / Mobile Money", icon: CreditCard },
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

                  {/* Online Payment Info */}
                  {selectedPaymentMethod === "online" && (
                    <div className="mt-4 p-4 bg-secondary rounded-xl border border-border">
                      <p className="text-sm text-muted-foreground">
                        Click the Pay button below to complete your payment via bank transfer, card, or mobile money.
                      </p>
                    </div>
                  )}

                  {/* Other Payment Method Input */}
                  {selectedPaymentMethod === "other" && (
                    <div className="mt-4 p-4 bg-secondary rounded-xl border border-border">
                      <Label htmlFor="otherMethod" className="text-sm text-foreground mb-2 block">
                        Please specify your preferred payment method:
                      </Label>
                      <Input
                        id="otherMethod"
                        value={otherPaymentMethod}
                        onChange={(e) => setOtherPaymentMethod(e.target.value)}
                        placeholder="e.g., Agent payment, Western Union, etc."
                        className="mb-2"
                      />
                      <p className="text-xs text-muted-foreground">
                        We will contact you at your provided email to arrange payment.
                      </p>
                    </div>
                  )}
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
                  {selectedPaymentMethod === "crypto" ? (
                    <Button
                      variant="gold"
                      className="flex-1"
                      onClick={() => setShowCryptoPayment(true)}
                    >
                      Pay with Bitcoin
                    </Button>
                  ) : selectedPaymentMethod === "online" ? (
                    <Button
                      variant="gold"
                      className="flex-1"
                      onClick={() => {
                        window.open("https://paywith.nobuk.africa/ghejkngtla", "_blank");
                        handlePayment();
                      }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Processing..." : `Pay $${processingFee} USD`}
                    </Button>
                  ) : (
                    <Button
                      variant="gold"
                      className="flex-1"
                      onClick={handlePayment}
                      disabled={isSubmitting || !selectedPaymentMethod || (selectedPaymentMethod === "other" && !otherPaymentMethod)}
                    >
                      {isSubmitting ? "Processing..." : "Submit Request"}
                    </Button>
                  )}
                </div>

                {/* Download PDF Button */}
                <div className="mt-6 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={generatePDF}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Application as PDF
                  </Button>
                </div>
              </div>
            )}

            {/* Crypto Payment Modal */}
            {showCryptoPayment && (
              <div className="bg-card rounded-2xl shadow-elegant p-8 border border-border">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bitcoin className="w-8 h-8 text-gold" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                    Bitcoin Payment
                  </h2>
                  <p className="text-muted-foreground">
                    Send exactly <span className="font-bold text-gold">${processingFee} USD</span> worth of BTC
                  </p>
                </div>

                <div className="bg-secondary rounded-xl p-4 mb-6">
                  <Label className="text-sm text-muted-foreground mb-2 block">BTC Address:</Label>
                  <div className="bg-background p-3 rounded-lg border border-border">
                    <code className="text-xs md:text-sm text-foreground break-all select-all">
                      bc1qhv7lva29euqnfapjq2t3lccm392aknew9mtud6
                    </code>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText("bc1qhv7lva29euqnfapjq2t3lccm392aknew9mtud6");
                      toast({ title: "Copied!", description: "BTC address copied to clipboard" });
                    }}
                    className="mt-2 text-sm text-gold hover:text-gold/80"
                  >
                    Copy Address
                  </button>
                </div>

                {!cryptoConfirming ? (
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowCryptoPayment(false)}
                    >
                      Back
                    </Button>
                    <Button
                      variant="gold"
                      className="flex-1"
                      onClick={() => {
                        setCryptoConfirming(true);
                        setCryptoCountdown(120);
                        const interval = setInterval(() => {
                          setCryptoCountdown((prev) => {
                            if (prev <= 1) {
                              clearInterval(interval);
                              toast({
                                title: "Payment Confirmed!",
                                description: "Your application has been submitted successfully.",
                              });
                              setCryptoConfirming(false);
                              setShowCryptoPayment(false);
                              setShowPayment(false);
                              return 0;
                            }
                            return prev - 1;
                          });
                        }, 1000);
                      }}
                    >
                      I've Made the Payment
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="mb-4">
                      <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-foreground font-medium">Confirming Payment...</p>
                      <p className="text-muted-foreground text-sm">
                        Please wait while we verify your transaction
                      </p>
                    </div>
                    <div className="bg-secondary rounded-lg p-3">
                      <p className="text-2xl font-bold text-gold">
                        {Math.floor(cryptoCountdown / 60)}:{(cryptoCountdown % 60).toString().padStart(2, '0')}
                      </p>
                      <p className="text-xs text-muted-foreground">Estimated confirmation time</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Apply;
