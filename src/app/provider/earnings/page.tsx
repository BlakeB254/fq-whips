"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { providerBookings } from "@/lib/mock-data";
import {
  DollarSign,
  TrendingUp,
  Calendar,
  Download,
  CreditCard,
  ArrowUpRight,
} from "lucide-react";

export default function ProviderEarningsPage() {
  const completedBookings = providerBookings.filter(
    (b) => b.status === "completed"
  );
  const confirmedBookings = providerBookings.filter(
    (b) => b.status === "confirmed"
  );

  // Calculate earnings (80% to host, 20% platform fee)
  const totalEarnings = completedBookings.reduce(
    (sum, b) => sum + b.totalPrice * 0.8,
    0
  );
  const pendingEarnings = confirmedBookings.reduce(
    (sum, b) => sum + b.totalPrice * 0.8,
    0
  );

  // Mock monthly data
  const monthlyData = [
    { month: "Nov 2024", earnings: totalEarnings * 0.4, trips: 3 },
    { month: "Oct 2024", earnings: totalEarnings * 0.35, trips: 2 },
    { month: "Sep 2024", earnings: totalEarnings * 0.25, trips: 2 },
  ];

  // Mock transactions
  const transactions = completedBookings.map((booking, index) => ({
    id: booking.id,
    date: new Date(booking.endDate),
    description: `${booking.vehicle.make} ${booking.vehicle.model} rental`,
    renter: booking.renter,
    grossAmount: booking.totalPrice,
    fee: booking.totalPrice * 0.2,
    netAmount: booking.totalPrice * 0.8,
    status: index === 0 ? "pending" : "paid",
  }));

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Earnings</h1>
          <p className="text-muted-foreground mt-1">
            Track your income and payouts
          </p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <p className="text-3xl font-bold mt-1">
                  ${totalEarnings.toFixed(0)}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4 text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4" />
              <span>+12% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Payouts</p>
                <p className="text-3xl font-bold mt-1">
                  ${pendingEarnings.toFixed(0)}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Next payout: Dec 15
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-3xl font-bold mt-1">
                  ${monthlyData[0].earnings.toFixed(0)}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              {monthlyData[0].trips} completed trips
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg per Trip</p>
                <p className="text-3xl font-bold mt-1">
                  $
                  {completedBookings.length > 0
                    ? (totalEarnings / completedBookings.length).toFixed(0)
                    : 0}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4 text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4" />
              <span>+5% from average</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Monthly Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Monthly Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((month, index) => (
                <div
                  key={month.month}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                >
                  <div>
                    <p className="font-medium">{month.month}</p>
                    <p className="text-sm text-muted-foreground">
                      {month.trips} trips completed
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">
                      ${month.earnings.toFixed(0)}
                    </p>
                    {index === 0 && (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700"
                      >
                        Current
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border gap-4"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{tx.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {tx.date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      • {tx.renter}
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Gross</p>
                      <p className="font-medium">${tx.grossAmount}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Fee (20%)</p>
                      <p className="font-medium text-red-600">
                        -${tx.fee.toFixed(0)}
                      </p>
                    </div>
                    <div className="text-right min-w-[80px]">
                      <p className="text-sm text-muted-foreground">Net</p>
                      <p className="font-bold text-green-600">
                        ${tx.netAmount.toFixed(0)}
                      </p>
                    </div>
                    <Badge
                      variant={tx.status === "paid" ? "outline" : "secondary"}
                    >
                      {tx.status === "paid" ? "Paid" : "Pending"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Payout Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Payout Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-white flex items-center justify-center border">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium">Bank Account •••• 4242</p>
                  <p className="text-sm text-muted-foreground">
                    Payouts every 2 weeks
                  </p>
                </div>
              </div>
              <Button variant="outline">Update</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
