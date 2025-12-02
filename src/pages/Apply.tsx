import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, CreditCard, CheckCircle2 } from "lucide-react";

const Apply = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    organizationName: "",
    applicantName: "",
    email: "",
    phone: "",
    country: "",
    location: "",
    monthlyExpenditure: "",
    requestedAmount: "",
    projectDescription: "",
  });
  const [files, setFiles] = useState<{
    registration: File | null;
    idDocument: File | null;
    projectPhotos: File[];
  }>({
    registration: null,
    idDocument: null,
    projectPhotos: [],
  });
  const [showPayment, setShowPayment] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const processingFee = formData.requestedAmount 
    ? (parseFloat(formData.requestedAmount) * 0.04).toFixed(2) 
    : "0.00";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (e.target.files) {
      if (type === "projectPhotos") {
        setFiles({ ...files, projectPhotos: Array.from(e.target.files) });
      } else {
        setFiles({ ...files, [type]: e.target.files[0] });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.organizationName || !formData.email || !formData.requestedAmount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!files.registration || !files.idDocument) {
      toast({
        title: "Missing Documents",
        description: "Please upload all required documents.",
        variant: "destructive",
      });
      return;
    }

    setShowPayment(true);
  };

  const handlePayment = () => {
    setIsSubmitting(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Application Submitted!",
        description: "Your application has been received. We will review it and contact you within 5-7 business days.",
      });
      // Reset form
      setFormData({
        organizationName: "",
        applicantName: "",
        email: "",
        phone: "",
        country: "",
        location: "",
        monthlyExpenditure: "",
        requestedAmount: "",
        projectDescription: "",
      });
      setFiles({ registration: null, idDocument: null, projectPhotos: [] });
      setShowPayment(false);
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
            {!showPayment ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Organization Information */}
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

                {/* Financial Information */}
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

                {/* Document Upload */}
                <div className="bg-card rounded-2xl p-8 shadow-card">
                  <h2 className="font-display text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                    <Upload className="w-5 h-5 text-gold" />
                    Document Upload
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Registration Certificate *</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-gold/50 transition-colors">
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileChange(e, "registration")}
                          className="hidden"
                          id="registration"
                        />
                        <label htmlFor="registration" className="cursor-pointer">
                          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">
                            {files.registration ? files.registration.name : "Click to upload registration certificate"}
                          </p>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Applicant ID/Passport *</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-gold/50 transition-colors">
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileChange(e, "idDocument")}
                          className="hidden"
                          id="idDocument"
                        />
                        <label htmlFor="idDocument" className="cursor-pointer">
                          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">
                            {files.idDocument ? files.idDocument.name : "Click to upload ID or passport"}
                          </p>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Project Photos (Optional)</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-gold/50 transition-colors">
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          multiple
                          onChange={(e) => handleFileChange(e, "projectPhotos")}
                          className="hidden"
                          id="projectPhotos"
                        />
                        <label htmlFor="projectPhotos" className="cursor-pointer">
                          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">
                            {files.projectPhotos.length > 0 
                              ? `${files.projectPhotos.length} file(s) selected` 
                              : "Click to upload project photos"}
                          </p>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Description */}
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
                  Continue to Payment
                </Button>
              </form>
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
                    disabled={isSubmitting}
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
