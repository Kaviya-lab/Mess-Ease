import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, Plus, Clock, Users, TrendingUp, CheckCircle2, XCircle, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Poll {
  id: number;
  meal: string;
  date: string;
  yesCount: number;
  noCount: number;
  totalStudents: number;
  status: "active" | "closed";
  deadline: string;
}

const initialPolls: Poll[] = [
  {
    id: 1,
    meal: "Dinner",
    date: "Today",
    yesCount: 145,
    noCount: 23,
    totalStudents: 248,
    status: "active",
    deadline: "6:00 PM",
  },
  {
    id: 2,
    meal: "Breakfast",
    date: "Tomorrow",
    yesCount: 98,
    noCount: 45,
    totalStudents: 248,
    status: "active",
    deadline: "10:00 PM Today",
  },
  {
    id: 3,
    meal: "Lunch",
    date: "Today",
    yesCount: 210,
    noCount: 38,
    totalStudents: 248,
    status: "closed",
    deadline: "Closed",
  },
];

const ManagerPolls = () => {
  const { toast } = useToast();
  const [polls, setPolls] = useState<Poll[]>(initialPolls);
  const [showForm, setShowForm] = useState(false);
  const [newPoll, setNewPoll] = useState({
    meal: "breakfast",
    date: "today",
  });

  const handleCreatePoll = () => {
    const poll: Poll = {
      id: polls.length + 1,
      meal: newPoll.meal.charAt(0).toUpperCase() + newPoll.meal.slice(1),
      date: newPoll.date === "today" ? "Today" : "Tomorrow",
      yesCount: 0,
      noCount: 0,
      totalStudents: 248,
      status: "active",
      deadline: newPoll.meal === "breakfast" ? "10:00 PM Previous Day" : 
                newPoll.meal === "lunch" ? "10:00 AM" : "6:00 PM",
    };

    setPolls([poll, ...polls]);
    setShowForm(false);
    toast({
      title: "Poll created!",
      description: `${poll.meal} poll for ${poll.date.toLowerCase()} is now active.`,
    });
  };

  const handleClosePoll = (id: number) => {
    setPolls(polls.map(p => p.id === id ? { ...p, status: "closed" as const } : p));
    toast({
      title: "Poll closed",
      description: "The poll has been closed. Final results are locked.",
    });
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
              Meal Polls
            </h1>
            <p className="text-muted-foreground">Create and manage attendance polls</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="gap-2">
            <Plus className="w-4 h-4" />
            Create Poll
          </Button>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="grid sm:grid-cols-4 gap-4"
        >
          <Card className="border-border/50 shadow-card">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-primary">2</p>
              <p className="text-sm text-muted-foreground">Active Polls</p>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-card">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-green-600">311</p>
              <p className="text-sm text-muted-foreground">Total Yes Today</p>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-card">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-foreground">83%</p>
              <p className="text-sm text-muted-foreground">Response Rate</p>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-card">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-secondary">68</p>
              <p className="text-sm text-muted-foreground">Pending Votes</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Create Poll Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-border/50 shadow-card border-t-4 border-t-primary">
              <CardHeader>
                <CardTitle>Create New Poll</CardTitle>
                <CardDescription>Students will be notified immediately</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Select 
                      value={newPoll.meal} 
                      onValueChange={(value) => setNewPoll({ ...newPoll, meal: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select meal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="breakfast">Breakfast</SelectItem>
                        <SelectItem value="lunch">Lunch</SelectItem>
                        <SelectItem value="dinner">Dinner</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <Select 
                      value={newPoll.date} 
                      onValueChange={(value) => setNewPoll({ ...newPoll, date: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="tomorrow">Tomorrow</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setShowForm(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreatePoll}>
                      Create Poll
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Active Polls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Active Polls
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {polls.filter(p => p.status === "active").map((poll) => {
              const responded = poll.yesCount + poll.noCount;
              const responseRate = Math.round((responded / poll.totalStudents) * 100);
              const attendanceRate = responded > 0 ? Math.round((poll.yesCount / responded) * 100) : 0;
              
              return (
                <Card key={poll.id} className="border-border/50 shadow-card border-l-4 border-l-green-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-green-500">Active</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        Ends at {poll.deadline}
                      </div>
                    </div>
                    <CardTitle className="flex items-center gap-2 mt-2">
                      <BarChart3 className="w-5 h-5 text-primary" />
                      {poll.meal} - {poll.date}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Response Stats */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 rounded-lg bg-green-50 border border-green-100">
                        <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="text-xl font-bold">{poll.yesCount}</span>
                        </div>
                        <p className="text-xs text-green-700">Will Attend</p>
                      </div>
                      <div className="p-3 rounded-lg bg-red-50 border border-red-100">
                        <div className="flex items-center justify-center gap-1 text-red-600 mb-1">
                          <XCircle className="w-4 h-4" />
                          <span className="text-xl font-bold">{poll.noCount}</span>
                        </div>
                        <p className="text-xs text-red-700">Won't Attend</p>
                      </div>
                      <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                        <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                          <Users className="w-4 h-4" />
                          <span className="text-xl font-bold">{poll.totalStudents - responded}</span>
                        </div>
                        <p className="text-xs text-gray-700">Pending</p>
                      </div>
                    </div>

                    {/* Progress Bars */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Response Rate</span>
                        <span className="font-medium">{responseRate}%</span>
                      </div>
                      <Progress value={responseRate} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 text-sm">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">
                          {attendanceRate}% expected attendance
                        </span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleClosePoll(poll.id)}
                      >
                        Close Poll
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </motion.div>

        {/* Closed Polls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            Closed Polls
          </h2>
          <div className="space-y-3">
            {polls.filter(p => p.status === "closed").map((poll) => {
              const responded = poll.yesCount + poll.noCount;
              const attendanceRate = Math.round((poll.yesCount / responded) * 100);
              
              return (
                <Card key={poll.id} className="border-border/50 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Badge variant="secondary">{poll.meal}</Badge>
                        <span className="text-foreground font-medium">{poll.date}</span>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <span className="text-green-600">✓ {poll.yesCount}</span>
                        <span className="text-red-600">✗ {poll.noCount}</span>
                        <Badge className="bg-primary/10 text-primary border-0">
                          {attendanceRate}% attended
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default ManagerPolls;
