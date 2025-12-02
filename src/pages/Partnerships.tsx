import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Handshake, Shield, FileText, Users, Globe, TrendingUp, CheckCircle2 } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "100% Transparency",
    description: "Full visibility into how funds are used and project progress.",
  },
  {
    icon: FileText,
    title: "Detailed Reporting",
    description: "Regular updates and comprehensive impact reports.",
  },
  {
    icon: Users,
    title: "Direct Engagement",
    description: "Connect directly with the communities you support.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Support projects across 12+ countries worldwide.",
  },
  {
    icon: TrendingUp,
    title: "Measurable Impact",
    description: "Track and measure the difference your support makes.",
  },
  {
    icon: Handshake,
    title: "Long-term Partnership",
    description: "Build lasting relationships for sustainable change.",
  },
];

const Partnerships = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    organizationName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    partnershipType: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Partnership Request Submitted!",
      description: "Thank you for your interest. Our team will contact you within 2-3 business days.",
    });
    
    setFormData({
      organizationName: "",
      contactName: "",
      email: "",
      phone: "",
      website: "",
      partnershipType: "",
      message: "",
    });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-gold/20 text-gold text-sm font-medium mb-6">
              Partner With Us
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Global Partnerships for Real Impact
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Join forces with us to create meaningful, lasting change in communities worldwide. Together, we can achieve more.
            </p>
          </div>
        </div>
      </section>

      {/* Why Partner */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Partner With Us
            </h2>
            <p className="text-muted-foreground text-lg">
              We offer a unique partnership experience built on trust, transparency, and measurable impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-card transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6">
                  <benefit.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 bg-secondary geometric-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Partnership Success Stories
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card rounded-2xl p-8 shadow-card">
                <div className="flex items-start gap-3 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-gold flex-shrink-0" />
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      Clean Water Initiative
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Partnership with Global Water Foundation
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Together, we constructed 15 boreholes providing clean water access to over 5,000 community members across 3 countries.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 shadow-card">
                <div className="flex items-start gap-3 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-gold flex-shrink-0" />
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      Education Program
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Partnership with EduCare International
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Supported 200+ orphan students with full scholarships, supplies, and mentorship programs over 3 years.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Form */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Become a Partner
              </h2>
              <p className="text-muted-foreground">
                Fill out the form below and our partnership team will be in touch.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-card space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="organizationName">Organization Name *</Label>
                  <Input
                    id="organizationName"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleInputChange}
                    placeholder="Your organization"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactName">Contact Name *</Label>
                  <Input
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    placeholder="Your name"
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
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 234 567 8900"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://yourwebsite.com"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="partnershipType">Partnership Type *</Label>
                  <select
                    id="partnershipType"
                    name="partnershipType"
                    value={formData.partnershipType}
                    onChange={handleInputChange}
                    className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground"
                    required
                  >
                    <option value="">Select partnership type</option>
                    <option value="donor">Donor/Foundation</option>
                    <option value="ngo">NGO/Non-Profit</option>
                    <option value="corporate">Corporate Partner</option>
                    <option value="government">Government/Institution</option>
                    <option value="individual">Individual Supporter</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your organization and how you'd like to partner with us..."
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" variant="gold" size="lg" className="w-full">
                Submit Partnership Request
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Partnerships;
