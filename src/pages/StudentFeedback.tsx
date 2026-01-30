import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { MessageSquare, Plus, Clock, CheckCircle2, AlertCircle, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Feedback {
  id: number;
  type: "complaint" | "suggestion";
  category: string;
  message: string;
  status: "open" | "review" | "resolved";
  response?: string;
  createdAt: string;
  anonymous: boolean;
}

const initialFeedbacks: Feedback[] = [
  {
    id: 1,
    type: "complaint",
    category: "Food Quality",
    message: "The dal served during lunch was too salty and almost inedible.",
    status: "review",
    response: "Thank you for your feedback. We have noted this and will speak to our kitchen staff.",
    createdAt: "Jan 22, 2024",
    anonymous: false,
  },
  {
    id: 2,
    type: "suggestion",
    category: "Menu",
    message: "It would be great if you could add more variety in breakfast options, especially South Indian dishes.",
    status: "resolved",
    response: "Great suggestion! We have added Idli-Sambar and Dosa to our Sunday breakfast menu.",
    createdAt: "Jan 18, 2024",
    anonymous: false,
  },
  {
    id: 3,
    type: "complaint",
    category: "Hygiene",
    message: "The dining tables are not being cleaned properly after each meal.",
    status: "open",
    createdAt: "Jan 24, 2024",
    anonymous: true,
  },
];

const categories = ["Food Quality", "Hygiene", "Service", "Menu", "Timing", "Staff Behavior", "Other"];

const StudentFeedback = () => {
  const { toast } = useToast();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(initialFeedbacks);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: "complaint",
    category: "",
    message: "",
    anonymous: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newFeedback: Feedback = {
      id: feedbacks.length + 1,
      type: formData.type as "complaint" | "suggestion",
      category: formData.category,
      message: formData.message,
      status: "open",
      createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      anonymous: formData.anonymous,
    };

    setFeedbacks([newFeedback, ...feedbacks]);
    setFormData({ type: "complaint", category: "", message: "", anonymous: false });
    setShowForm(false);
    
    toast({
      title: "Feedback submitted!",
      description: "Your feedback has been sent to the mess management.",
    });
  };

  const statusConfig = {
    open: { icon: AlertCircle, class: "status-open" },
    review: { icon: Clock, class: "status-review" },
    resolved: { icon: CheckCircle2, class: "status-resolved" },
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-1">
              Feedback
            </h1>
            <p className="text-muted-foreground">Submit complaints or suggestions</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="gap-2">
            <Plus className="w-4 h-4" />
            New Feedback
          </Button>
        </motion.div>

        {/* New Feedback Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-border/50 shadow-card border-t-4 border-t-primary">
              <CardHeader>
                <CardTitle>Submit New Feedback</CardTitle>
                <CardDescription>Your feedback helps us improve</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Select 
                        value={formData.type} 
                        onValueChange={(value) => setFormData({ ...formData, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="complaint">Complaint</SelectItem>
                          <SelectItem value="suggestion">Suggestion</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select 
                        value={formData.category} 
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Message</Label>
                    <Textarea
                      placeholder="Describe your feedback in detail..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      required
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="anonymous"
                        checked={formData.anonymous}
                        onCheckedChange={(checked) => setFormData({ ...formData, anonymous: checked })}
                      />
                      <Label htmlFor="anonymous" className="text-sm text-muted-foreground">
                        Submit anonymously
                      </Label>
                    </div>
                    <div className="flex gap-3">
                      <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="gap-2">
                        <Send className="w-4 h-4" />
                        Submit
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Feedback List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          {feedbacks.map((feedback, index) => {
            const StatusIcon = statusConfig[feedback.status].icon;
            
            return (
              <motion.div
                key={feedback.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="border-border/50 shadow-card">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="secondary" className="capitalize">
                              {feedback.type}
                            </Badge>
                            <Badge variant="outline">{feedback.category}</Badge>
                            {feedback.anonymous && (
                              <Badge variant="outline" className="text-muted-foreground">Anonymous</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{feedback.createdAt}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className={statusConfig[feedback.status].class}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {feedback.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-foreground">{feedback.message}</p>
                    
                    {feedback.response && (
                      <div className="p-4 rounded-lg bg-accent border border-accent-foreground/10">
                        <p className="text-sm font-medium text-accent-foreground mb-1">Response from Mess Manager:</p>
                        <p className="text-sm text-muted-foreground">{feedback.response}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default StudentFeedback;
