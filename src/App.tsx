import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import StudentDashboard from "./pages/StudentDashboard";
import StudentAnnouncements from "./pages/StudentAnnouncements";
import StudentPolls from "./pages/StudentPolls";
import StudentPayments from "./pages/StudentPayments";
import StudentFeedback from "./pages/StudentFeedback";
import StudentProfile from "./pages/StudentProfile";
import ManagerDashboard from "./pages/ManagerDashboard";
import ManagerAnnouncements from "./pages/ManagerAnnouncements";
import ManagerPolls from "./pages/ManagerPolls";
import ManagerMenu from "./pages/ManagerMenu";
import ManagerPayments from "./pages/ManagerPayments";
import ManagerComplaints from "./pages/ManagerComplaints";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Student Routes */}
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/announcements" element={<StudentAnnouncements />} />
          <Route path="/student/polls" element={<StudentPolls />} />
          <Route path="/student/payments" element={<StudentPayments />} />
          <Route path="/student/feedback" element={<StudentFeedback />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          
          {/* Manager Routes */}
          <Route path="/manager" element={<ManagerDashboard />} />
          <Route path="/manager/announcements" element={<ManagerAnnouncements />} />
          <Route path="/manager/polls" element={<ManagerPolls />} />
          <Route path="/manager/menu" element={<ManagerMenu />} />
          <Route path="/manager/payments" element={<ManagerPayments />} />
          <Route path="/manager/complaints" element={<ManagerComplaints />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
