"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FlaskConical, FileText, Users, Clock, CheckCircle, Settings, TestTube } from "lucide-react"
import Link from "next/link"

function LabSidebar() {
  const menuItems = [
    { icon: FlaskConical, label: "Dashboard", href: "/lab/dashboard", active: true },
    { icon: TestTube, label: "Assigned Tests", href: "/lab/tests" },
    { icon: FileText, label: "Reports", href: "/lab/reports" },
    { icon: Users, label: "Patients", href: "/lab/patients" },
    { icon: Settings, label: "Test Catalog", href: "/lab/catalog" },
  ]

  return (
    <nav className="p-4">
      <div className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              item.active ? "bg-orange-100 text-orange-700" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default function LabDashboard() {
  const stats = {
    assignedTests: 24,
    completedToday: 8,
    pendingReports: 6,
    totalPatients: 156,
  }

  const assignedTests = [
    {
      id: 1,
      patient: "John Smith",
      testType: "Blood Test - Complete Blood Count",
      priority: "High",
      assignedDate: "2024-01-15",
      dueDate: "2024-01-16",
      status: "pending",
    },
    {
      id: 2,
      patient: "Sarah Wilson",
      testType: "Urine Analysis",
      priority: "Normal",
      assignedDate: "2024-01-15",
      dueDate: "2024-01-17",
      status: "in-progress",
    },
    {
      id: 3,
      patient: "Michael Brown",
      testType: "X-Ray Chest",
      priority: "High",
      assignedDate: "2024-01-14",
      dueDate: "2024-01-15",
      status: "completed",
    },
  ]

  const recentReports = [
    {
      id: 1,
      patient: "Alice Johnson",
      testType: "Lipid Profile",
      completedDate: "2024-01-14",
      result: "Normal",
    },
    {
      id: 2,
      patient: "Robert Chen",
      testType: "Thyroid Function Test",
      completedDate: "2024-01-13",
      result: "Abnormal",
    },
  ]

  return (
    <DashboardLayout title="Lab Worker Dashboard" sidebar={<LabSidebar />}>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <TestTube className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.assignedTests}</p>
                  <p className="text-sm text-gray-600">Assigned Tests</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.completedToday}</p>
                  <p className="text-sm text-gray-600">Completed Today</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.pendingReports}</p>
                  <p className="text-sm text-gray-600">Pending Reports</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalPatients}</p>
                  <p className="text-sm text-gray-600">Total Patients</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Assigned Tests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TestTube className="h-5 w-5" />
                <span>Assigned Tests</span>
              </CardTitle>
              <CardDescription>Tests assigned to you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignedTests.map((test) => (
                  <div key={test.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{test.patient}</h4>
                      <p className="text-sm text-gray-600">{test.testType}</p>
                      <p className="text-xs text-gray-500">Due: {test.dueDate}</p>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge
                        variant={
                          test.priority === "High"
                            ? "destructive"
                            : test.priority === "Normal"
                              ? "secondary"
                              : "default"
                        }
                      >
                        {test.priority}
                      </Badge>
                      <div>
                        <Badge
                          variant={
                            test.status === "completed"
                              ? "default"
                              : test.status === "in-progress"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {test.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
                <Button asChild className="w-full">
                  <Link href="/lab/tests">View All Tests</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Reports */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Recent Reports</span>
              </CardTitle>
              <CardDescription>Recently completed reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{report.patient}</h4>
                      <p className="text-sm text-gray-600">{report.testType}</p>
                      <p className="text-xs text-gray-500">Completed: {report.completedDate}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={report.result === "Normal" ? "default" : "destructive"}>{report.result}</Badge>
                    </div>
                  </div>
                ))}
                <Button asChild className="w-full bg-transparent" variant="outline">
                  <Link href="/lab/reports">View All Reports</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common lab tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button asChild className="h-20 flex-col">
                <Link href="/lab/reports/new">
                  <FileText className="h-6 w-6 mb-2" />
                  Create Report
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col bg-transparent">
                <Link href="/lab/tests">
                  <TestTube className="h-6 w-6 mb-2" />
                  View Tests
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col bg-transparent">
                <Link href="/lab/catalog">
                  <Settings className="h-6 w-6 mb-2" />
                  Manage Catalog
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
