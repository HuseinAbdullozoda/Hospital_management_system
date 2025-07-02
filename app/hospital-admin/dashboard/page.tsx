"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Hospital,
  Users,
  UserCheck,
  Building,
  TrendingUp,
  AlertCircle,
  Clock,
  Settings,
  FlaskConical,
  Pill,
  Stethoscope,
} from "lucide-react"
import Link from "next/link"

function HospitalAdminSidebar() {
  const menuItems = [
    { icon: Hospital, label: "Dashboard", href: "/hospital-admin/dashboard", active: true },
    { icon: Building, label: "Departments", href: "/hospital-admin/departments" },
    { icon: UserCheck, label: "Doctors", href: "/hospital-admin/doctors" },
    { icon: FlaskConical, label: "Lab Workers", href: "/hospital-admin/lab-workers" },
    { icon: Pill, label: "Pharmacists", href: "/hospital-admin/pharmacists" },
    { icon: Users, label: "Patients", href: "/hospital-admin/patients" },
    { icon: TrendingUp, label: "Reports", href: "/hospital-admin/reports" },
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

export default function HospitalAdminDashboard() {
  const stats = {
    totalDoctors: 45,
    totalPatients: 1247,
    departments: 12,
    labWorkers: 8,
    pharmacists: 6,
    todayAppointments: 156,
  }

  const recentActivities = [
    {
      id: 1,
      action: "New doctor registered",
      details: "Dr. James Wilson - Cardiology",
      time: "2 hours ago",
      type: "doctor",
    },
    {
      id: 2,
      action: "Department updated",
      details: "Emergency Department - New equipment added",
      time: "4 hours ago",
      type: "department",
    },
    {
      id: 3,
      action: "New patient registered",
      details: "Sarah Johnson - Outpatient",
      time: "6 hours ago",
      type: "patient",
    },
  ]

  const pendingApprovals = [
    {
      id: 1,
      type: "Doctor Application",
      name: "Dr. Lisa Chen",
      department: "Pediatrics",
      submittedDate: "2024-01-15",
    },
    {
      id: 2,
      type: "Lab Worker Application",
      name: "John Smith",
      department: "Pathology",
      submittedDate: "2024-01-14",
    },
  ]

  return (
    <DashboardLayout title="City General Hospital - Admin Dashboard" sidebar={<HospitalAdminSidebar />}>
      <div className="space-y-6">
        {/* Hospital Info Card */}
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">City General Hospital</h2>
                <p className="text-purple-100">123 Main Street, Downtown</p>
                <p className="text-purple-100">Established 1985 • 250 Beds</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">4.8★</p>
                <p className="text-purple-100">Patient Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Stethoscope className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalDoctors}</p>
                  <p className="text-sm text-gray-600">Total Doctors</p>
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

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Building className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.departments}</p>
                  <p className="text-sm text-gray-600">Departments</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <FlaskConical className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.labWorkers}</p>
                  <p className="text-sm text-gray-600">Lab Workers</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-red-100 p-3 rounded-lg">
                  <Pill className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.pharmacists}</p>
                  <p className="text-sm text-gray-600">Pharmacists</p>
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
                  <p className="text-2xl font-bold">{stats.todayAppointments}</p>
                  <p className="text-sm text-gray-600">Today's Appointments</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Approvals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                <span>Pending Approvals</span>
              </CardTitle>
              <CardDescription>Staff applications waiting for approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingApprovals.map((approval) => (
                  <div key={approval.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{approval.name}</h4>
                      <p className="text-sm text-gray-600">{approval.type}</p>
                      <p className="text-sm text-gray-500">{approval.department}</p>
                      <p className="text-xs text-gray-400">Submitted: {approval.submittedDate}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm">Review</Button>
                    </div>
                  </div>
                ))}
                <Button asChild className="w-full bg-transparent" variant="outline">
                  <Link href="/hospital-admin/approvals">View All Pending</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Recent Activities</span>
              </CardTitle>
              <CardDescription>Latest hospital activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-3 border rounded-lg">
                    <div
                      className={`p-2 rounded-full ${
                        activity.type === "doctor"
                          ? "bg-green-100"
                          : activity.type === "department"
                            ? "bg-purple-100"
                            : "bg-blue-100"
                      }`}
                    >
                      {activity.type === "doctor" && <Stethoscope className="h-4 w-4 text-green-600" />}
                      {activity.type === "department" && <Building className="h-4 w-4 text-purple-600" />}
                      {activity.type === "patient" && <Users className="h-4 w-4 text-blue-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.details}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common hospital management tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button asChild className="h-20 flex-col">
                <Link href="/hospital-admin/doctors/new">
                  <UserCheck className="h-6 w-6 mb-2" />
                  Add Doctor
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col bg-transparent">
                <Link href="/hospital-admin/departments/new">
                  <Building className="h-6 w-6 mb-2" />
                  Add Department
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col bg-transparent">
                <Link href="/hospital-admin/reports">
                  <TrendingUp className="h-6 w-6 mb-2" />
                  View Reports
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col bg-transparent">
                <Link href="/hospital-admin/profile">
                  <Settings className="h-6 w-6 mb-2" />
                  Hospital Profile
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
