import { motion } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Bell, 
  BarChart3, 
  CreditCard, 
  MessageSquare, 
  Users,
  TrendingUp,
  TrendingDown,
  Plus,
  ChevronRight,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";
import { Link } from "react-router-dom";

// Sample data
const stats = [
  { 
    label: "Total Students", 
    value: "248", 
    change: "+12", 
    trend: "up", 
    icon: Users, 
    color: "bg-primary" 
  },
  { 
    label: "Today's Attendance", 
    value: "86%", 
    change: "+5%", 
    trend: "up", 
    icon: BarChart3, 
    color: "bg-blue-500" 
  },
  { 
    label: "Pending Payments", 
    value: "₹62,500", 
    change: "23 students", 
    trend: "neutral", 
    icon: CreditCard, 
    color: "bg-secondary" 
  },
  { 
    label: "Open Complaints", 
    value: "5", 
    change: "-2", 
    trend: "down", 
    icon: MessageSquare, 
    color: "bg-purple-500" 
  },
];

const pollData = {
  breakfast: { yes: 180, no: 68, total: 248 },
  lunch: { yes: 210, no: 38, total: 248 },
  dinner: { yes: 145, no: 23, total: 168, pending: 80 },
};

const recentComplaints = [
  { id: 1, user: "Rahul S.", type: "complaint", message: "Food quality issue in lunch", status: "open", time: "1h ago" },
  { id: 2, user: "Priya M.", type: "suggestion", message: "Add more South Indian options", status: "review", time: "3h ago" },
  { id: 3, user: "Amit K.", type: "complaint", message: "Cleanliness concern in dining area", status: "resolved", time: "5h ago" },
];

const ManagerDashboard = () => {
  return (
    <DashboardLayout role="manager">
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-1">
              Manager Dashboard
            </h1>
            <p className="text-muted-foreground">Overview of today's mess operations</p>
          </div>
          <div className="flex gap-3">
            <Link to="/manager/announcements">
              <Button variant="outline" className="gap-2">
                <Bell className="w-4 h-4" />
                Post Update
              </Button>
            </Link>
            <Link to="/manager/polls">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Create Poll
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="border-border/50 shadow-card">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-11 h-11 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  {stat.trend !== "neutral" && (
                    <div className={`flex items-center gap-1 text-sm ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}>
                      {stat.trend === "up" ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {stat.change}
                    </div>
                  )}
                </div>
                <p className="text-2xl font-bold text-foreground mb-0.5">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Today's Poll Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="border-border/50 shadow-card h-full">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <CardTitle>Today's Meal Attendance</CardTitle>
                  </div>
                  <Link to="/manager/polls">
                    <Button variant="ghost" size="sm" className="text-primary">
                      View details
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
                <CardDescription>Poll responses for meal planning</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(pollData).map(([meal, data]) => {
                  const percentage = Math.round((data.yes / data.total) * 100);
                  const isPending = 'pending' in data;
                  return (
                    <div key={meal} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold text-foreground capitalize">{meal}</h4>
                          {isPending && (
                            <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200">
                              <Clock className="w-3 h-3 mr-1" />
                              {data.pending} pending
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-green-600 font-medium">✓ {data.yes}</span>
                          <span className="text-red-600 font-medium">✗ {data.no}</span>
                          <Badge className="bg-primary/10 text-primary border-0">
                            {percentage}% attending
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-1 h-3 rounded-full overflow-hidden bg-muted">
                        <div 
                          className="bg-green-500 transition-all duration-500"
                          style={{ width: `${(data.yes / data.total) * 100}%` }}
                        />
                        <div 
                          className="bg-red-400 transition-all duration-500"
                          style={{ width: `${(data.no / data.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}

                {/* Quick Stats */}
                <div className="pt-4 border-t border-border grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-foreground">535</p>
                    <p className="text-sm text-muted-foreground">Total Yes</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">129</p>
                    <p className="text-sm text-muted-foreground">Total No</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">81%</p>
                    <p className="text-sm text-muted-foreground">Avg Attendance</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Complaints */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="border-border/50 shadow-card h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-purple-500" />
                    <CardTitle className="text-lg">Recent Feedback</CardTitle>
                  </div>
                  <Link to="/manager/complaints">
                    <Button variant="ghost" size="sm" className="text-primary p-0 h-auto">
                      View all
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentComplaints.map((item) => (
                  <div 
                    key={item.id}
                    className="p-3 rounded-lg bg-muted/50 border border-border/50"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="font-medium text-sm text-foreground">{item.user}</span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs capitalize ${
                          item.status === 'open' ? 'status-open' :
                          item.status === 'review' ? 'status-review' : 'status-resolved'
                        }`}
                      >
                        {item.status === 'open' && <AlertCircle className="w-3 h-3 mr-1" />}
                        {item.status === 'review' && <Clock className="w-3 h-3 mr-1" />}
                        {item.status === 'resolved' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {item.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{item.message}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs capitalize">
                        {item.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{item.time}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Payment Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="border-border/50 shadow-card">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-secondary" />
                  <CardTitle>Payment Overview</CardTitle>
                </div>
                <Link to="/manager/payments">
                  <Button variant="ghost" size="sm" className="text-primary">
                    Manage payments
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <CardDescription>Monthly payment collection status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-xl bg-green-50 border border-green-100">
                  <p className="text-3xl font-bold text-green-600 mb-1">225</p>
                  <p className="text-sm text-green-700">Paid Students</p>
                  <Progress value={91} className="mt-3 h-2 bg-green-200" />
                </div>
                <div className="text-center p-4 rounded-xl bg-orange-50 border border-orange-100">
                  <p className="text-3xl font-bold text-orange-600 mb-1">23</p>
                  <p className="text-sm text-orange-700">Pending Payments</p>
                  <Progress value={9} className="mt-3 h-2 bg-orange-200" />
                </div>
                <div className="text-center p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <p className="text-3xl font-bold text-primary mb-1">₹5,62,500</p>
                  <p className="text-sm text-muted-foreground">Collected This Month</p>
                  <Button variant="outline" size="sm" className="mt-3 w-full">
                    Send Reminders
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default ManagerDashboard;
