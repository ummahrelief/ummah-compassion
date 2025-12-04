import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Clock, CheckCircle2, AlertCircle, Banknote } from "lucide-react";

type ApplicationStatus = "pending" | "allocated" | "disbursed" | "issue" | null;

interface StatusInfo {
  status: ApplicationStatus;
  message: string;
  date?: string;
}

export const DisbursementSection = () => {
  const [referenceNumber, setReferenceNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [statusInfo, setStatusInfo] = useState<StatusInfo | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!referenceNumber.trim()) return;
    
    setIsSearching(true);
    setHasSearched(true);
    
    // Simulate API call - in production this would check a database
    setTimeout(() => {
      // For demo purposes, generate random status based on reference
      const statuses: ApplicationStatus[] = ["pending", "allocated", "disbursed", "issue"];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      setStatusInfo({
        status: randomStatus,
        message: getStatusMessage(randomStatus),
        date: new Date().toLocaleDateString(),
      });
      setIsSearching(false);
    }, 1500);
  };

  const getStatusMessage = (status: ApplicationStatus): string => {
    switch (status) {
      case "pending":
        return "Your application is under review. Our team is evaluating your submission and will update you soon.";
      case "allocated":
        return "Your application has been approved! Funds have been allocated and are being processed for disbursement.";
      case "disbursed":
        return "Funds have been successfully disbursed to your provided payout method. Please check your account.";
      case "issue":
        return "There is an issue with your application. Please contact us at urdf@proton.me for more information.";
      default:
        return "";
    }
  };

  const getStatusIcon = (status: ApplicationStatus) => {
    switch (status) {
      case "pending":
        return <Clock className="w-8 h-8 text-yellow-500" />;
      case "allocated":
        return <CheckCircle2 className="w-8 h-8 text-blue-500" />;
      case "disbursed":
        return <Banknote className="w-8 h-8 text-green-500" />;
      case "issue":
        return <AlertCircle className="w-8 h-8 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 border-yellow-500/30 text-yellow-600";
      case "allocated":
        return "bg-blue-500/10 border-blue-500/30 text-blue-600";
      case "disbursed":
        return "bg-green-500/10 border-green-500/30 text-green-600";
      case "issue":
        return "bg-red-500/10 border-red-500/30 text-red-600";
      default:
        return "";
    }
  };

  const getStatusLabel = (status: ApplicationStatus) => {
    switch (status) {
      case "pending":
        return "Pending Review";
      case "allocated":
        return "Funds Allocated";
      case "disbursed":
        return "Disbursed to Payout";
      case "issue":
        return "Issue - Action Required";
      default:
        return "";
    }
  };

  return (
    <section className="py-24 bg-secondary" id="disbursement">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/20 text-gold text-sm font-medium mb-6">
            Track Your Application
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Disbursement Status
          </h2>
          <p className="text-muted-foreground text-lg">
            Enter your application reference number to check the status of your request.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSearch} className="bg-card rounded-2xl p-8 shadow-card">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="referenceNumber">Reference Number</Label>
                <div className="flex gap-3">
                  <Input
                    id="referenceNumber"
                    value={referenceNumber}
                    onChange={(e) => setReferenceNumber(e.target.value.toUpperCase())}
                    placeholder="e.g., URDF-2024-XXXXXX"
                    className="flex-1"
                  />
                  <Button type="submit" variant="gold" disabled={isSearching || !referenceNumber.trim()}>
                    {isSearching ? (
                      <div className="w-5 h-5 border-2 border-forest-dark border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Search className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {hasSearched && statusInfo && (
              <div className={`mt-6 p-6 rounded-xl border ${getStatusColor(statusInfo.status)}`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {getStatusIcon(statusInfo.status)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">
                      {getStatusLabel(statusInfo.status)}
                    </h3>
                    <p className="text-sm opacity-80 mb-3">
                      {statusInfo.message}
                    </p>
                    <p className="text-xs opacity-60">
                      Last updated: {statusInfo.date}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {hasSearched && !statusInfo && !isSearching && (
              <div className="mt-6 p-6 rounded-xl bg-muted border border-border text-center">
                <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">
                  No application found with this reference number. Please check and try again.
                </p>
              </div>
            )}
          </form>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-card rounded-xl">
              <Clock className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
              <p className="text-xs font-medium text-foreground">Pending</p>
            </div>
            <div className="text-center p-4 bg-card rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <p className="text-xs font-medium text-foreground">Allocated</p>
            </div>
            <div className="text-center p-4 bg-card rounded-xl">
              <Banknote className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="text-xs font-medium text-foreground">Disbursed</p>
            </div>
            <div className="text-center p-4 bg-card rounded-xl">
              <AlertCircle className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <p className="text-xs font-medium text-foreground">Issue</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
