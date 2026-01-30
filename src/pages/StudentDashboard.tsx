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
  Clock, 
  UtensilsCrossed,
  CheckCircle2,
  XCircle,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";

// Sample data
const todayMenu = {
  breakfast: { time: "7:00 AM - 9:00 AM", items: ["Poha", "Bread & Butter", "Milk", "Tea/Coffee"] },
  lunch: { time: "12:30 PM - 2:00 PM", items: ["Rice", "Dal", "Paneer Curry", "Roti", "Salad"] },
  dinner: { time: "7:30 PM - 9:00 PM", items: ["Rice", "Mixed Veg", "Chapati", "Curd", "Sweet"] },
};

const announcements = [
  { id: 1, title: "Holiday Notice", message: "Mess will be closed on 26th January", time: "2h ago", type: "info" },
  { id: 2, title: "Menu Change", message: "Special South Indian breakfast on Sunday", time: "5h ago", type: "update" },
];

const activePoll = {
  meal: "Dinner",
  question: "Will you come for dinner today?",
  yesCount: 145,
  noCount: 23,
  totalResponses: 168,
  hasVoted: false,
};

const StudentDashboard = () => {
  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-1">
            Good afternoon, Student! 👋
          </h1>
          <p className="text-muted-foreground">Here's what's happening at your mess today.</p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { label: "Active Polls", value: "1", icon: BarChart3, color: "bg-primary" },
            { label: "New Announcements", value: "2", icon: Bell, color: "bg-blue-500" },
            { label: "Payment Due", value: "₹2,500", icon: CreditCard, color: "bg-secondary" },
            { label: "Open Tickets", value: "0", icon: MessageSquare, color: "bg-green-500" },
          ].map((stat, index) => (
            <Card key={index} className="border-border/50 shadow-card">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center flex-shrink-0`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Today's Menu */}
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
                    <UtensilsCrossed className="w-5 h-5 text-primary" />
                    <CardTitle>Today's Menu</CardTitle>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    Updated today
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(todayMenu).map(([meal, details]) => (
                  <div key={meal} className="p-4 rounded-xl bg-muted/50 border border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground capitalize">{meal}</h4>
                      <span className="text-sm text-muted-foreground">{details.time}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {details.items.map((item, i) => (
                        <Badge key={i} variant="secondary" className="font-normal">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Active Poll */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="border-border/50 shadow-card border-l-4 border-l-primary">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg">Active Poll</CardTitle>
                </div>
                <CardDescription>Vote for {activePoll.meal.toLowerCase()}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-medium text-foreground">{activePoll.question}</p>
                
                {/* Poll Stats */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-600 font-medium">Yes: {activePoll.yesCount}</span>
                    <span className="text-muted-foreground">{Math.round((activePoll.yesCount / activePoll.totalResponses) * 100)}%</span>
                  </div>
                  <Progress value={(activePoll.yesCount / activePoll.totalResponses) * 100} className="h-2 bg-muted" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-red-600 font-medium">No: {activePoll.noCount}</span>
                    <span className="text-muted-foreground">{Math.round((activePoll.noCount / activePoll.totalResponses) * 100)}%</span>
                  </div>
                  <Progress value={(activePoll.noCount / activePoll.totalResponses) * 100} className="h-2 bg-muted" />
                </div>

                {/* Vote Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button className="flex-1 gap-2" variant="success">
                    <CheckCircle2 className="w-4 h-4" />
                    Yes
                  </Button>
                  <Button className="flex-1 gap-2" variant="destructive">
                    <XCircle className="w-4 h-4" />
                    No
                  </Button>
                </div>

                <p className="text-xs text-center text-muted-foreground">
                  {activePoll.totalResponses} responses so far
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Announcements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="border-border/50 shadow-card">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-blue-500" />
                  <CardTitle>Recent Announcements</CardTitle>
                </div>
                <Link to="/student/announcements">
                  <Button variant="ghost" size="sm" className="text-primary">
                    View all
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {announcements.map((announcement) => (
                  <div 
                    key={announcement.id} 
                    className="p-4 rounded-xl bg-muted/50 border border-border/50 hover:border-primary/30 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{announcement.title}</h4>
                        <p className="text-sm text-muted-foreground">{announcement.message}</p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{announcement.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
