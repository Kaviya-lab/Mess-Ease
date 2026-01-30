import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart3, CheckCircle2, XCircle, Clock, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Poll {
  id: number;
  meal: string;
  date: string;
  question: string;
  yesCount: number;
  noCount: number;
  status: "active" | "closed";
  userVote: "yes" | "no" | null;
  deadline: string;
}

const initialPolls: Poll[] = [
  {
    id: 1,
    meal: "Dinner",
    date: "Today",
    question: "Will you come for dinner today?",
    yesCount: 145,
    noCount: 23,
    status: "active",
    userVote: null,
    deadline: "6:00 PM",
  },
  {
    id: 2,
    meal: "Breakfast",
    date: "Tomorrow",
    question: "Will you come for breakfast tomorrow?",
    yesCount: 98,
    noCount: 45,
    status: "active",
    userVote: null,
    deadline: "10:00 PM Today",
  },
  {
    id: 3,
    meal: "Lunch",
    date: "Today",
    question: "Did you attend lunch today?",
    yesCount: 210,
    noCount: 38,
    status: "closed",
    userVote: "yes",
    deadline: "Closed",
  },
  {
    id: 4,
    meal: "Breakfast",
    date: "Today",
    question: "Did you attend breakfast today?",
    yesCount: 180,
    noCount: 68,
    status: "closed",
    userVote: "no",
    deadline: "Closed",
  },
];

const StudentPolls = () => {
  const { toast } = useToast();
  const [polls, setPolls] = useState<Poll[]>(initialPolls);

  const handleVote = (pollId: number, vote: "yes" | "no") => {
    setPolls(polls.map(poll => {
      if (poll.id === pollId) {
        return {
          ...poll,
          userVote: vote,
          yesCount: vote === "yes" ? poll.yesCount + 1 : poll.yesCount,
          noCount: vote === "no" ? poll.noCount + 1 : poll.noCount,
        };
      }
      return poll;
    }));

    toast({
      title: "Vote recorded!",
      description: `You voted "${vote}" for ${polls.find(p => p.id === pollId)?.meal.toLowerCase()}.`,
    });
  };

  const activePolls = polls.filter(p => p.status === "active");
  const closedPolls = polls.filter(p => p.status === "closed");

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-1">
            Meal Polls
          </h1>
          <p className="text-muted-foreground">Vote to help us prepare the right amount of food</p>
        </motion.div>

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
            {activePolls.map((poll) => {
              const total = poll.yesCount + poll.noCount;
              const yesPercentage = Math.round((poll.yesCount / total) * 100);
              
              return (
                <Card key={poll.id} className="border-border/50 shadow-card border-l-4 border-l-primary">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-primary/10 text-primary border-0">
                        {poll.meal}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        Ends at {poll.deadline}
                      </div>
                    </div>
                    <CardTitle className="text-lg mt-2">{poll.question}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {poll.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {poll.userVote ? (
                      <div className="text-center py-4">
                        <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-2" />
                        <p className="font-medium text-foreground">
                          You voted: <span className="capitalize text-primary">{poll.userVote}</span>
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {total} responses • {yesPercentage}% attending
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-green-600">Yes: {poll.yesCount}</span>
                            <span className="text-red-600">No: {poll.noCount}</span>
                          </div>
                          <div className="flex gap-1 h-2 rounded-full overflow-hidden bg-muted">
                            <div 
                              className="bg-green-500"
                              style={{ width: `${yesPercentage}%` }}
                            />
                            <div 
                              className="bg-red-400"
                              style={{ width: `${100 - yesPercentage}%` }}
                            />
                          </div>
                        </div>
                        
                        <div className="flex gap-3">
                          <Button 
                            className="flex-1 gap-2" 
                            variant="success"
                            onClick={() => handleVote(poll.id, "yes")}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            Yes, I'll attend
                          </Button>
                          <Button 
                            className="flex-1 gap-2" 
                            variant="destructive"
                            onClick={() => handleVote(poll.id, "no")}
                          >
                            <XCircle className="w-4 h-4" />
                            No
                          </Button>
                        </div>
                      </>
                    )}
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
            <BarChart3 className="w-5 h-5 text-muted-foreground" />
            Past Polls
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {closedPolls.map((poll) => {
              const total = poll.yesCount + poll.noCount;
              const yesPercentage = Math.round((poll.yesCount / total) * 100);
              
              return (
                <Card key={poll.id} className="border-border/50 shadow-card opacity-75">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{poll.meal}</Badge>
                      <Badge variant="outline" className="text-muted-foreground">
                        Closed
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mt-2">{poll.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm">
                        <span className="text-green-600">✓ {poll.yesCount}</span>
                        <span className="mx-2 text-muted-foreground">|</span>
                        <span className="text-red-600">✗ {poll.noCount}</span>
                      </div>
                      <span className="text-sm font-medium text-primary">{yesPercentage}% attended</span>
                    </div>
                    <Progress value={yesPercentage} className="h-2" />
                    {poll.userVote && (
                      <p className="text-sm text-muted-foreground mt-3">
                        Your vote: <span className="capitalize font-medium">{poll.userVote}</span>
                      </p>
                    )}
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

export default StudentPolls;
