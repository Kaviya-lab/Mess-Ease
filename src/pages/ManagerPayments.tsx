import { motion } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { CreditCard, Search, Download, Send, CheckCircle2, Clock, AlertCircle, Users } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Student {
  id: number;
  name: string;
  email: string;
  room: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  paidOn?: string;
  dueDate?: string;
}

const students: Student[] = [
  { id: 1, name: "Rahul Sharma", email: "rahul@college.edu", room: "A-204", amount: 2500, status: "paid", paidOn: "Jan 5, 2024" },
  { id: 2, name: "Priya Patel", email: "priya@college.edu", room: "B-112", amount: 2500, status: "paid", paidOn: "Jan 3, 2024" },
  { id: 3, name: "Amit Kumar", email: "amit@college.edu", room: "A-108", amount: 2500, status: "pending", dueDate: "Feb 5, 2024" },
  { id: 4, name: "Sneha Gupta", email: "sneha@college.edu", room: "B-205", amount: 2500, status: "pending", dueDate: "Feb 5, 2024" },
  { id: 5, name: "Vikram Singh", email: "vikram@college.edu", room: "A-301", amount: 2500, status: "overdue", dueDate: "Jan 5, 2024" },
  { id: 6, name: "Neha Reddy", email: "neha@college.edu", room: "B-118", amount: 2500, status: "paid", paidOn: "Jan 4, 2024" },
  { id: 7, name: "Arjun Mehta", email: "arjun@college.edu", room: "A-215", amount: 2500, status: "pending", dueDate: "Feb 5, 2024" },
  { id: 8, name: "Kavya Joshi", email: "kavya@college.edu", room: "B-302", amount: 2500, status: "overdue", dueDate: "Jan 5, 2024" },
];

const ManagerPayments = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "paid" | "pending" | "overdue">("all");

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || s.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const paidCount = students.filter(s => s.status === "paid").length;
  const pendingCount = students.filter(s => s.status === "pending").length;
  const overdueCount = students.filter(s => s.status === "overdue").length;
  const totalCollected = paidCount * 2500;

  const handleSendReminder = (student: Student) => {
    toast({
      title: "Reminder sent!",
      description: `Payment reminder sent to ${student.name}.`,
    });
  };

  const handleSendAllReminders = () => {
    toast({
      title: "Reminders sent!",
      description: `Payment reminders sent to ${pendingCount + overdueCount} students.`,
    });
  };

  const statusConfig = {
    paid: { icon: CheckCircle2, class: "status-paid", label: "Paid" },
    pending: { icon: Clock, class: "status-pending", label: "Pending" },
    overdue: { icon: AlertCircle, class: "bg-red-100 text-red-700 border-red-200", label: "Overdue" },
  };

  return (
    <DashboardLayout role="manager">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-1">
              Payments
            </h1>
            <p className="text-muted-foreground">Track and manage student payments</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
            <Button onClick={handleSendAllReminders} className="gap-2">
              <Send className="w-4 h-4" />
              Send All Reminders
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <Card className="border-border/50 shadow-card">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-sm text-muted-foreground">Paid</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{paidCount}</p>
              <Progress value={(paidCount / students.length) * 100} className="h-1.5 mt-2 bg-green-100" />
            </CardContent>
          </Card>
          
          <Card className="border-border/50 shadow-card">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-sm text-muted-foreground">Pending</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
              <Progress value={(pendingCount / students.length) * 100} className="h-1.5 mt-2 bg-orange-100" />
            </CardContent>
          </Card>
          
          <Card className="border-border/50 shadow-card">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <span className="text-sm text-muted-foreground">Overdue</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{overdueCount}</p>
              <Progress value={(overdueCount / students.length) * 100} className="h-1.5 mt-2 bg-red-100" />
            </CardContent>
          </Card>
          
          <Card className="border-border/50 shadow-card">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">Collected</span>
              </div>
              <p className="text-2xl font-bold text-foreground">₹{totalCollected.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">This month</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters & Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {(["all", "paid", "pending", "overdue"] as const).map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus(status)}
                className="capitalize"
              >
                {status}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Students List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-border/50 shadow-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <CardTitle>Students</CardTitle>
              </div>
              <CardDescription>
                Showing {filteredStudents.length} of {students.length} students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredStudents.map((student) => {
                  const StatusIcon = statusConfig[student.status].icon;
                  
                  return (
                    <div 
                      key={student.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.email} • Room {student.room}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold text-foreground">₹{student.amount.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">
                            {student.status === "paid" ? `Paid on ${student.paidOn}` : `Due: ${student.dueDate}`}
                          </p>
                        </div>
                        <Badge variant="outline" className={statusConfig[student.status].class}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusConfig[student.status].label}
                        </Badge>
                        {student.status !== "paid" && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleSendReminder(student)}
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default ManagerPayments;
