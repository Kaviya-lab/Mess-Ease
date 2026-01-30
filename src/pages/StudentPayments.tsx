import { motion } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Download, Calendar, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const paymentHistory = [
  {
    id: 1,
    month: "January 2024",
    amount: 2500,
    status: "paid",
    paidOn: "Jan 5, 2024",
    transactionId: "TXN20240105001",
  },
  {
    id: 2,
    month: "December 2023",
    amount: 2500,
    status: "paid",
    paidOn: "Dec 3, 2023",
    transactionId: "TXN20231203001",
  },
  {
    id: 3,
    month: "November 2023",
    amount: 2500,
    status: "paid",
    paidOn: "Nov 2, 2023",
    transactionId: "TXN20231102001",
  },
];

const pendingPayment = {
  month: "February 2024",
  amount: 2500,
  dueDate: "Feb 5, 2024",
  lateFee: 0,
};

const StudentPayments = () => {
  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-1">
            Payments
          </h1>
          <p className="text-muted-foreground">Manage your mess fee payments</p>
        </motion.div>

        {/* Pending Payment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-border/50 shadow-card border-l-4 border-l-secondary overflow-hidden">
            <div className="bg-gradient-to-r from-secondary/10 to-transparent">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-secondary-foreground" />
                    </div>
                    <div>
                      <CardTitle>Pending Payment</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <Calendar className="w-4 h-4" />
                        Due by {pendingPayment.dueDate}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="status-pending text-sm px-3 py-1">
                    <Clock className="w-3 h-3 mr-1" />
                    Pending
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-3xl font-bold text-foreground">₹{pendingPayment.amount.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Mess fees for {pendingPayment.month}</p>
                  </div>
                  <Button size="lg" className="gap-2">
                    <CreditCard className="w-5 h-5" />
                    Pay Now
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid sm:grid-cols-3 gap-4"
        >
          <Card className="border-border/50 shadow-card">
            <CardContent className="p-5 text-center">
              <p className="text-3xl font-bold text-green-600">₹7,500</p>
              <p className="text-sm text-muted-foreground mt-1">Paid This Quarter</p>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-card">
            <CardContent className="p-5 text-center">
              <p className="text-3xl font-bold text-primary">3</p>
              <p className="text-sm text-muted-foreground mt-1">Payments Made</p>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-card">
            <CardContent className="p-5 text-center">
              <p className="text-3xl font-bold text-foreground">₹0</p>
              <p className="text-sm text-muted-foreground mt-1">Late Fees</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Payment History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                Payment History
              </CardTitle>
              <CardDescription>Your previous mess fee payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentHistory.map((payment) => (
                  <div 
                    key={payment.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{payment.month}</p>
                        <p className="text-sm text-muted-foreground">
                          Paid on {payment.paidOn} • {payment.transactionId}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold text-foreground">₹{payment.amount.toLocaleString()}</p>
                        <Badge variant="outline" className="status-paid text-xs">Paid</Badge>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="w-4 h-4" />
                      </Button>
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

export default StudentPayments;
