"use client"

import { Badge } from "@/components/ui/badge"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Hospital,
  Building,
  Users,
  UserCheck,
  Settings,
  FlaskConical,
  Pill,
  TrendingUp,
  Download,
  FileText,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react"
import Link from "next/link"

function HospitalAdminSidebar() {
  const menuItems = [
    { icon: Hospital, label: "Dashboard", href: "/hospital-admin/dashboard" },
    { icon: Building, label: "Departments", href: "/hospital-admin/departments" },
    { icon: UserCheck, label: "Doctors", href: "/hospital-admin/doctors" },
    { icon: FlaskConical, label: "Lab Workers", href: "/hospital-admin/lab-workers" },
    { icon: Pill, label: "Pharmacists", href: "/hospital-admin/pharmacists" },
    { icon: Users, label: "Patients", href: "/hospital-admin/patients" },
    { icon: TrendingUp, label: "Reports", href: "/hospital-admin/reports", active: true },
    { icon: Settings, label: "Hospital Profile", href: "/hospital-admin/profile" },
  ]

  return (
    <nav className="p-4">
      <div className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              item.active ? "bg-purple-100 text-purple-700" : "text-gray-600 hover:bg-gray-100"
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

export default function HospitalReportsPage() {
  const reportCategories = [
    {
      title: "Patient Reports",
      description: "Patient admission, discharge, and demographic reports",
      icon: Users,
      color: "blue",
      reports: [
        { name: "Daily Patient Census", description: "Current patient count by department" },
        { name: "Admission Report", description: "New patient admissions this month" },
        { name: "Discharge Summary", description: "Patient discharge statistics" },
        { name: "Demographics Report", description: "Patient age, gender, and location data" },
      ],
    },
    {
      title: "Financial Reports",
      description: "Revenue, billing, and financial performance reports",
      icon: TrendingUp,
      color: "green",
      reports: [
        { name: "Revenue Report", description: "Monthly and quarterly revenue analysis" },
        { name: "Department Billing", description: "Billing breakdown by department" },
        { name: "Insurance Claims", description: "Insurance claim status and amounts" },
        { name: "Outstanding Bills", description: "Unpaid patient bills and collections" },
      ],
    },
    {
      title: "Staff Reports",
      description: "Doctor, nurse, and staff performance reports",
      icon: UserCheck,
      color: "purple",
      reports: [
        { name: "Doctor Performance", description: "Patient count and satisfaction by doctor" },
        { name: "Staff Utilization", description: "Working hours and shift coverage" },
        { name: "Department Staffing", description: "Staff allocation by department" },
        { name: "Training Records", description: "Staff certification and training status" },
      ],
    },
    {
      title: "Operational Reports",
      description: "Hospital operations and efficiency reports",
      icon: Activity,
      color: "orange",
      reports: [
        { name: "Bed Occupancy", description: "Room and bed utilization rates" },
        { name: "Equipment Usage", description: "Medical equipment utilization" },
        { name: "Wait Times", description: "Average patient wait times by department" },
        { name: "Emergency Response", description: "Emergency case response metrics" },
      ],
    },
  ]

  const quickStats = [
    { label: "Total Reports Generated", value: "1,247", change: "+12%" },
    { label: "Reports This Month", value: "89", change: "+8%" },
    { label: "Automated Reports", value: "45", change: "0%" },
    { label: "Custom Reports", value: "23", change: "+15%" },
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-100 text-blue-600"
      case "green":
        return "bg-green-100 text-green-600"
      case "purple":
        return "bg-purple-100 text-purple-600"
      case "orange":
        return "bg-orange-100 text-orange-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <DashboardLayout title="Hospital Reports" sidebar={<HospitalAdminSidebar />}>
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-medium ${
                        stat.change.startsWith("+")
                          ? "text-green-600"
                          : stat.change.startsWith("-")
                            ? "text-red-600"
                            : "text-gray-600"
                      }`}
                    >
                      {stat.change}
                    </p>
                    <p className="text-xs text-gray-500">vs last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Generate commonly used reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button className="h-20 flex-col">
                <BarChart3 className="h-6 w-6 mb-2" />
                Daily Census
              </Button>
              <Button variant="outline" className="h-20 flex-col bg-transparent">
                <PieChart className="h-6 w-6 mb-2" />
                Revenue Report
              </Button>
              <Button variant="outline" className="h-20 flex-col bg-transparent">
                <Users className="h-6 w-6 mb-2" />
                Staff Report
              </Button>
              <Button variant="outline" className="h-20 flex-col bg-transparent">
                <Activity className="h-6 w-6 mb-2" />
                Bed Occupancy
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Report Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reportCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getColorClasses(category.color)}`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.reports.map((report, reportIndex) => (
                    <div
                      key={reportIndex}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <div>
                        <h4 className="font-medium text-sm">{report.name}</h4>
                        <p className="text-xs text-gray-600">{report.description}</p>
                      </div>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Recently generated reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  name: "Monthly Patient Census",
                  type: "Patient Report",
                  generated: "2024-01-15 09:30 AM",
                  size: "2.3 MB",
                  status: "Ready",
                },
                {
                  name: "Q4 Revenue Analysis",
                  type: "Financial Report",
                  generated: "2024-01-14 02:15 PM",
                  size: "5.7 MB",
                  status: "Ready",
                },
                {
                  name: "Staff Performance Review",
                  type: "Staff Report",
                  generated: "2024-01-13 11:45 AM",
                  size: "1.8 MB",
                  status: "Ready",
                },
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{report.name}</h4>
                      <p className="text-sm text-gray-600">
                        {report.type} • {report.size}
                      </p>
                      <p className="text-xs text-gray-500">Generated {report.generated}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">Ready</Badge>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
