import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Search, CheckCircle2, Clock, AlertCircle, Send, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Complaint {
  id: number;
  user: string;
  email: string;
  type: "complaint" | "suggestion";
  category: string;
  message: string;
  status: "open" | "review" | "resolved";
  response?: string;
  createdAt: string;
  anonymous: boolean;
}

const initialComplaints: Complaint[] = [
  {
    id: 1,
    user: "Rahul S.",
    email: "rahul@college.edu",
    type: "complaint",
    category: "Food Quality",
    message: "The dal served during lunch was too salty and almost inedible. This has happened multiple times this week.",
    status: "open",
    createdAt: "Jan 24, 2024 at 2:30 PM",
    anonymous: false,
  },
  {
    id: 2,
    user: "Anonymous",
    email: "",
    type: "complaint",
    category: "Hygiene",
    message: "The dining tables are not being cleaned properly after each meal. Found leftover food on tables during dinner.",
    status: "open",
    createdAt: "Jan 24, 2024 at 1:15 PM",
    anonymous: true,
  },
  {
    id: 3,
    user: "Priya M.",
    email: "priya@college.edu",
    type: "suggestion",
    category: "Menu",
    message: "It would be great if you could add more variety in breakfast options, especially South Indian dishes like Dosa and Idli.",
    status: "review",
    response: "Thank you for the suggestion! We are looking into adding more options.",
    createdAt: "Jan 22, 2024 at 4:00 PM",
    anonymous: false,
  },
  {
    id: 4,
    user: "Amit K.",
    email: "amit@college.edu",
    type: "complaint",
    category: "Service",
    message: "The serving staff was rude during lunch today. This is unacceptable behavior.",
    status: "resolved",
    response: "We have spoken with the staff member. Thank you for bringing this to our attention.",
    createdAt: "Jan 20, 2024 at 1:00 PM",
    anonymous: false,
  },
  {
    id: 5,
    user: "Sneha G.",
    email: "sneha@college.edu",
    type: "suggestion",
    category: "Timing",
    message: "Could the dinner timing be extended by 30 minutes on weekends? Many students have activities that run late.",
    status: "resolved",
    response: "Starting this weekend, dinner will be served until 9:30 PM on Saturdays and Sundays.",
    createdAt: "Jan 18, 2024 at 6:45 PM",
    anonymous: false,
  },
];

const ManagerComplaints = () => {
  const { toast } = useToast();
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "open" | "review" | "resolved">("all");
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [responseText, setResponseText] = useState("");

  const filteredComplaints = complaints.filter(c => {
    const matchesSearch = c.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.user.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || c.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleRespond = () => {
    if (!selectedComplaint || !responseText.trim()) return;

    setComplaints(complaints.map(c => 
      c.id === selectedComplaint.id 
        ? { ...c, status: "review" as const, response: responseText }
        : c
    ));

    toast({
      title: "Response sent!",
      description: "The user has been notified of your response.",
    });

    setSelectedComplaint(null);
    setResponseText("");
  };

  const handleResolve = (id: number) => {
    setComplaints(complaints.map(c => 
      c.id === id ? { ...c, status: "resolved" as const } : c
    ));

    toast({
      title: "Marked as resolved",
      description: "The complaint has been closed.",
    });
  };

  const statusConfig = {
    open: { icon: AlertCircle, class: "status-open", label: "Open" },
    review: { icon: Clock, class: "status-review", label: "In Review" },
    resolved: { icon: CheckCircle2, class: "status-resolved", label: "Resolved" },
  };

  const openCount = complaints.filter(c => c.status === "open").length;
  const reviewCount = complaints.filter(c => c.status === "review").length;
  const resolvedCount = complaints.filter(c => c.status === "resolved").length;

  return (
    <DashboardLayout role="manager">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-1">
            Complaints & Suggestions
          </h1>
          <p className="text-muted-foreground">Manage student feedback and respond to concerns</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-3 gap-4"
        >
          <Card className="border-border/50 shadow-card border-l-4 border-l-yellow-500">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-yellow-600">{openCount}</p>
              <p className="text-sm text-muted-foreground">Open</p>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-card border-l-4 border-l-blue-500">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">{reviewCount}</p>
              <p className="text-sm text-muted-foreground">In Review</p>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-card border-l-4 border-l-green-500">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-green-600">{resolvedCount}</p>
              <p className="text-sm text-muted-foreground">Resolved</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search complaints..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {(["all", "open", "review", "resolved"] as const).map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus(status)}
                className="capitalize"
              >
                {status === "review" ? "In Review" : status}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Complaints List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          {filteredComplaints.map((complaint) => {
            const StatusIcon = statusConfig[complaint.status].icon;
            
            return (
              <Card key={complaint.id} className="border-border/50 shadow-card">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        {complaint.anonymous ? (
                          <User className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <span className="text-primary font-semibold">
                            {complaint.user.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-foreground">
                            {complaint.anonymous ? "Anonymous" : complaint.user}
                          </span>
                          <Badge variant="secondary" className="capitalize text-xs">
                            {complaint.type}
                          </Badge>
                          <Badge variant="outline" className="text-xs">{complaint.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{complaint.createdAt}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={statusConfig[complaint.status].class}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {statusConfig[complaint.status].label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground">{complaint.message}</p>
                  
                  {complaint.response && (
                    <div className="p-4 rounded-lg bg-accent border border-accent-foreground/10">
                      <p className="text-sm font-medium text-accent-foreground mb-1">Your Response:</p>
                      <p className="text-sm text-muted-foreground">{complaint.response}</p>
                    </div>
                  )}

                  {complaint.status !== "resolved" && (
                    <div className="flex gap-3 pt-2">
                      {complaint.status === "open" && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedComplaint(complaint)}
                          className="gap-2"
                        >
                          <Send className="w-4 h-4" />
                          Respond
                        </Button>
                      )}
                      <Button 
                        variant="success" 
                        size="sm"
                        onClick={() => handleResolve(complaint.id)}
                        className="gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Mark Resolved
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </motion.div>

        {/* Response Modal */}
        {selectedComplaint && (
          <div className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card rounded-xl shadow-xl max-w-lg w-full p-6"
            >
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                Respond to {selectedComplaint.user}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Your response will be visible to the user.
              </p>
              
              <div className="p-3 rounded-lg bg-muted mb-4">
                <p className="text-sm text-foreground">{selectedComplaint.message}</p>
              </div>

              <Textarea
                placeholder="Write your response..."
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                rows={4}
                className="mb-4"
              />

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setSelectedComplaint(null)}>
                  Cancel
                </Button>
                <Button onClick={handleRespond} className="gap-2">
                  <Send className="w-4 h-4" />
                  Send Response
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ManagerComplaints;
