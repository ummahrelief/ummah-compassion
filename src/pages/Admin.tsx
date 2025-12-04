import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  LogOut, 
  Search, 
  Eye, 
  Clock, 
  CheckCircle2, 
  Banknote, 
  AlertCircle,
  RefreshCw
} from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Application = Database['public']['Tables']['applications']['Row'];
type ApplicationStatus = Database['public']['Enums']['application_status'];

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [newStatus, setNewStatus] = useState<ApplicationStatus>("pending");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchApplications();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/admin/auth');
      return;
    }

    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .eq('role', 'admin');

    if (!roles || roles.length === 0) {
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges.",
        variant: "destructive",
      });
      await supabase.auth.signOut();
      navigate('/admin/auth');
    }
  };

  const fetchApplications = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch applications.",
        variant: "destructive",
      });
    } else {
      setApplications(data || []);
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin/auth');
  };

  const openApplicationDetail = (app: Application) => {
    setSelectedApp(app);
    setAdminNotes(app.admin_notes || "");
    setNewStatus(app.status);
  };

  const handleUpdateApplication = async () => {
    if (!selectedApp) return;
    setSaving(true);

    const { error } = await supabase
      .from('applications')
      .update({
        status: newStatus,
        admin_notes: adminNotes,
      })
      .eq('id', selectedApp.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update application.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Application updated successfully.",
      });
      setSelectedApp(null);
      fetchApplications();
    }
    setSaving(false);
  };

  const getStatusIcon = (status: ApplicationStatus) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "allocated":
        return <CheckCircle2 className="w-4 h-4 text-blue-500" />;
      case "disbursed":
        return <Banknote className="w-4 h-4 text-green-500" />;
      case "issue":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusBadge = (status: ApplicationStatus) => {
    const colors = {
      pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
      allocated: "bg-blue-500/10 text-blue-600 border-blue-500/30",
      disbursed: "bg-green-500/10 text-green-600 border-green-500/30",
      issue: "bg-red-500/10 text-red-600 border-red-500/30",
    };
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${colors[status]}`}>
        {getStatusIcon(status)}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch = 
      app.reference_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.organization_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicant_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    allocated: applications.filter(a => a.status === 'allocated').length,
    disbursed: applications.filter(a => a.status === 'disbursed').length,
    issue: applications.filter(a => a.status === 'issue').length,
  };

  return (
    <Layout>
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-gold/20 text-gold text-sm font-medium mb-4">
                Admin Dashboard
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
                Application Management
              </h1>
            </div>
            <Button variant="outline" onClick={handleSignOut} className="gap-2">
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {Object.entries(statusCounts).map(([status, count]) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`p-4 rounded-xl text-center transition-all ${
                  statusFilter === status
                    ? 'bg-gold text-forest-dark'
                    : 'bg-card hover:bg-secondary'
                }`}
              >
                <p className="text-2xl font-bold">{count}</p>
                <p className="text-sm capitalize">{status === 'all' ? 'Total' : status}</p>
              </button>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by reference, organization, name, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={fetchApplications} className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
          </div>

          {/* Applications Table */}
          <div className="bg-card rounded-xl shadow-card overflow-hidden">
            {loading ? (
              <div className="p-12 text-center">
                <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading applications...</p>
              </div>
            ) : filteredApplications.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-muted-foreground">No applications found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Reference</TableHead>
                      <TableHead>Organization</TableHead>
                      <TableHead>Applicant</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplications.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-mono text-sm">{app.reference_number}</TableCell>
                        <TableCell>{app.organization_name}</TableCell>
                        <TableCell>{app.applicant_name}</TableCell>
                        <TableCell>${Number(app.requested_amount).toLocaleString()}</TableCell>
                        <TableCell>{getStatusBadge(app.status)}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(app.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openApplicationDetail(app)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Application Detail Dialog */}
      <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Application Details
              {selectedApp && getStatusBadge(selectedApp.status)}
            </DialogTitle>
          </DialogHeader>
          
          {selectedApp && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground text-xs">Reference Number</Label>
                  <p className="font-mono font-medium">{selectedApp.reference_number}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">Date Submitted</Label>
                  <p>{new Date(selectedApp.created_at).toLocaleString()}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Organization Info</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="text-muted-foreground text-xs">Organization</Label>
                    <p>{selectedApp.organization_name}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Applicant</Label>
                    <p>{selectedApp.applicant_name}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Email</Label>
                    <p>{selectedApp.email}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Phone</Label>
                    <p>{selectedApp.phone}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Country</Label>
                    <p>{selectedApp.country}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Location</Label>
                    <p>{selectedApp.location}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Project Description</h4>
                <p className="text-sm text-muted-foreground">{selectedApp.project_description}</p>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Financial Details</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <Label className="text-muted-foreground text-xs">Monthly Expenditure</Label>
                    <p className="font-medium">${Number(selectedApp.monthly_expenditure).toLocaleString()}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Requested Amount</Label>
                    <p className="font-medium text-gold">${Number(selectedApp.requested_amount).toLocaleString()}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Processing Fee</Label>
                    <p className="font-medium">${Number(selectedApp.processing_fee).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Payout Method</h4>
                <p className="text-sm capitalize mb-2">{selectedApp.payout_method}</p>
                {selectedApp.payout_details && (
                  <pre className="text-xs bg-secondary p-3 rounded-lg overflow-x-auto">
                    {JSON.stringify(selectedApp.payout_details, null, 2)}
                  </pre>
                )}
              </div>

              <div className="border-t pt-4 space-y-4">
                <h4 className="font-semibold">Admin Actions</h4>
                
                <div className="space-y-2">
                  <Label>Update Status</Label>
                  <Select value={newStatus} onValueChange={(v) => setNewStatus(v as ApplicationStatus)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="allocated">Allocated</SelectItem>
                      <SelectItem value="disbursed">Disbursed</SelectItem>
                      <SelectItem value="issue">Issue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Admin Notes / Reply to Client</Label>
                  <Textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add notes or a message for the client..."
                    rows={4}
                  />
                </div>

                <Button 
                  variant="gold" 
                  className="w-full" 
                  onClick={handleUpdateApplication}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Update Application"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Admin;
