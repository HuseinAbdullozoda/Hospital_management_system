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
  CheckCircle,
  Clock,
  Settings,
  FlaskConical,
  Pill,
} from "lucide-react"
import Link from "next/link"

function AdminSidebar() {
  const menuItems = [
    { icon: Hospital, label: "Dashboard", href: "/admin/dashboard", active: true },
    { icon: Building, label: "Hospitals", href: "/admin/hospitals" },
    { icon: UserCheck, label: "Doctor Approvals", href: "/admin/doctors" },
    { icon: Users, label: "Departments", href: "/admin/departments" },
    { icon: FlaskConical, label: "Lab Workers", href: "/admin/lab-workers" },
    { icon: Pill, label: "Pharmacists", href: "/admin/pharmacists" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
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

export default function AdminDashboard() {
  const stats = {
    totalHospitals: 12,
    totalDoctors: 245,
    pendingApprovals: 8,
    totalPatients: 1847,
    labWorkers: 45,
    pharmacists: 32,
  }

  const pendingDoctors = [
    {
      id: 1,
      name: "Dr. James Wilson",
      specialty: "Cardiology",
      hospital: "City General Hospital",
      submittedDate: "2024-01-12",
      experience: "8 years",
    },
    {
      id: 2,
      name: "Dr. Lisa Chen",
      specialty: "Pediatrics",
      hospital: "Metro Medical Center",
      submittedDate: "2024-01-11",
      experience: "6 years",
    },
    {
      id: 3,
      name: "Dr. Ahmed Hassan",
      specialty: "Orthopedics",
      hospital: "Regional Health Institute",
      submittedDate: "2024-01-10",
      experience: "12 years",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      action: "New hospital registered",
      details: "Sunrise Medical Center",
      time: "2 hours ago",
      type: "hospital",
    },
    {
      id: 2,
      action: "Doctor approved",
      details: "Dr. Sarah Johnson - Cardiology",
      time: "4 hours ago",
      type: "approval",
    },
    {
      id: 3,
      action: "New department added",
      details: "Neurology at City General",
      time: "1 day ago",
      type: "department",
    },
    {
      id: 4,
      action: "Lab worker registered",
      details: "John Smith at Metro Medical",
      time: "2 days ago",
      type: "staff",
    },
  ]

  return (
    <DashboardLayout title="Hospital Admin Dashboard" sidebar={<AdminSidebar />}>
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Hospital className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalHospitals}</p>
                  <p className="text-sm text-gray-600">Total Hospitals</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <UserCheck className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalDoctors}</p>
                  <p className="text-sm text-gray-600">Approved Doctors</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.pendingApprovals}</p>
                  <p className="text-sm text-gray-600">Pending Approvals</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
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
                <div className="bg-teal-100 p-3 rounded-lg">
                  <FlaskConical className="h-6 w-6 text-teal-600" />
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Doctor Approvals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Pending Doctor Approvals</span>
              </CardTitle>
              <CardDescription>Doctors waiting for approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingDoctors.map((doctor) => (
                  <div key={doctor.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{doctor.name}</h4>
                      <p className="text-sm text-gray-600">{doctor.specialty}</p>
                      <p className="text-sm text-gray-500">{doctor.hospital}</p>
                      <p className="text-xs text-gray-400">
                        Submitted: {doctor.submittedDate} • {doctor.experience} experience
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" asChild>
                        <Link href={`/admin/doctors/${doctor.id}`}>Review</Link>
                      </Button>
                    </div>
                  </div>
                ))}
                <Button asChild className="w-full bg-transparent" variant="outline">
                  <Link href="/admin/doctors">View All Pending</Link>
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
              <CardDescription>Latest system activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-3 border rounded-lg">
                    <div
                      className={`p-2 rounded-full ${
                        activity.type === "hospital"
                          ? "bg-blue-100"
                          : activity.type === "approval"
                            ? "bg-green-100"
                            : activity.type === "department"
                              ? "bg-purple-100"
                              : "bg-gray-100"
                      }`}
                    >
                      {activity.type === "hospital" && <Hospital className="h-4 w-4 text-blue-600" />}
                      {activity.type === "approval" && <CheckCircle className="h-4 w-4 text-green-600" />}
                      {activity.type === "department" && <Building className="h-4 w-4 text-purple-600" />}
                      {activity.type === "staff" && <Users className="h-4 w-4 text-gray-600" />}
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
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button asChild className="h-20 flex-col">
                <Link href="/admin/hospitals/new">
                  <Hospital className="h-6 w-6 mb-2" />
                  Add Hospital
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col bg-transparent">
                <Link href="/admin/doctors">
                  <UserCheck className="h-6 w-6 mb-2" />
                  Review Doctors
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col bg-transparent">
                <Link href="/admin/departments/new">
                  <Building className="h-6 w-6 mb-2" />
                  Add Department
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col bg-transparent">
                <Link href="/admin/reports">
                  <TrendingUp className="h-6 w-6 mb-2" />
                  View Reports
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
