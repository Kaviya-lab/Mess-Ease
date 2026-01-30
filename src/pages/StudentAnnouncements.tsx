import { motion } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, Clock } from "lucide-react";

const announcements = [
  {
    id: 1,
    title: "Republic Day Holiday Notice",
    message: "The mess will remain closed on 26th January 2024. Please make alternative arrangements for your meals. We apologize for any inconvenience caused.",
    date: "Jan 24, 2024",
    time: "10:30 AM",
    type: "holiday",
  },
  {
    id: 2,
    title: "Special Sunday Breakfast Menu",
    message: "This Sunday we're serving a special South Indian breakfast! Items include Masala Dosa, Idli Sambar, Vada, and filter coffee.",
    date: "Jan 23, 2024",
    time: "4:00 PM",
    type: "menu",
  },
  {
    id: 3,
    title: "Timing Change for Dinner",
    message: "Due to a cultural event in the hostel, dinner timings have been changed to 8:00 PM - 10:00 PM for today only.",
    date: "Jan 22, 2024",
    time: "2:15 PM",
    type: "timing",
  },
  {
    id: 4,
    title: "Maintenance Notice",
    message: "The water purifier in the dining hall will be under maintenance from 10 AM to 12 PM tomorrow. Bottled water will be provided.",
    date: "Jan 21, 2024",
    time: "6:00 PM",
    type: "maintenance",
  },
  {
    id: 5,
    title: "New Menu Items Added",
    message: "Based on popular demand, we've added Chole Bhature and Rajma Chawal to our weekly menu. Check the updated menu for details.",
    date: "Jan 20, 2024",
    time: "11:00 AM",
    type: "menu",
  },
];

const typeColors: Record<string, string> = {
  holiday: "bg-red-100 text-red-700 border-red-200",
  menu: "bg-green-100 text-green-700 border-green-200",
  timing: "bg-blue-100 text-blue-700 border-blue-200",
  maintenance: "bg-yellow-100 text-yellow-700 border-yellow-200",
};

const StudentAnnouncements = () => {
  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-1">
            Announcements
          </h1>
          <p className="text-muted-foreground">Stay updated with the latest mess news and notices</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          {announcements.map((announcement, index) => (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="border-border/50 shadow-card hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Bell className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg mb-1">{announcement.title}</CardTitle>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {announcement.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {announcement.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className={`capitalize ${typeColors[announcement.type]}`}>
                      {announcement.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{announcement.message}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default StudentAnnouncements;
