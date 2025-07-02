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
  Shield,
  Globe,
} from "lucide-react"
import Link from "next/link"

function SystemAdminSidebar() {
  const menuItems = [
    { icon: Shield, label: "Dashboard", href: "/system-admin/dashboard", active: true },
    { icon: Hospital, label: "Hospital Approvals", href: "/system-admin/hospitals" },
    { icon: Building, label: "All Hospitals", href: "/system-admin/hospitals/manage" },
    { icon: Users, label: "System Users", href: "/system-admin/users" },
    { icon: TrendingUp, label: "Analytics", href: "/system-admin/analytics" },
    { icon: Globe, label: "Platform Settings", href: "/system-admin/settings" },
  ]

  return (
    <nav className="p-4">
      <div className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              item.active ? "bg-gray-100 text-gray-700" : "text-gray-600 hover:bg-gray-100"
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

export default function SystemAdminDashboard() {
  const stats = {
    totalHospitals: 12,
    pendingHospitals: 3,
    totalUsers: 2847,
    totalDoctors: 245,
    totalPatients: 1847,
    systemUptime: "99.9%",
  }

  const pendingHospitals = [
    {
      id: 1,
      name: "Sunrise Medical Center",
      location: "Westside District",
      submittedDate: "2024-01-12",
      adminName: "Dr. Michael Roberts",
      beds: 150,
      departments: 8,
    },
    {
      id: 2,
      name: "Valley Health Institute",
      location: "North Valley",
      submittedDate: "2024-01-10",
      adminName: "Dr. Sarah Williams",
      beds: 200,
      departments: 12,
    },
  ]

  const systemActivities = [
    {
      id: 1,
      action: "Hospital approved",
      details: "Metro Medical Center - Full approval granted",
      time: "2 hours ago",
      type: "approval",
    },
    {
      id: 2,
      action: "System maintenance",
      details: "Database optimization completed",
      time: "6 hours ago",
      type: "system",
    },
    {
      id: 3,
      action: "New hospital application",
      details: "Riverside General Hospital submitted application",
      time: "1 day ago",
      type: "application",
    },
  ]

  return (
    <DashboardLayout title="System Administration Dashboard" sidebar={<SystemAdminSidebar />}>
      <div className="space-y-6">
        {/* System Overview Card */}
        <Card className="bg-gradient-to-r from-gray-700 to-gray-800 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">HealthCare Hub System</h2>
                <p className="text-gray-200">Multi-Hospital Management Platform</p>
                <p className="text-gray-200">System Uptime: {stats.systemUptime}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">{stats.totalHospitals}</p>
                <p className="text-gray-200">Active Hospitals</p>
              </div>
            </div>
          </CardContent>
        </Card>

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
                <div className="bg-orange-100 p-3 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.pendingHospitals}</p>
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
                  <p className="text-2xl font-bold">{stats.totalUsers}</p>
                  <p className="text-sm text-gray-600">Total Users</p>
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
                  <p className="text-sm text-gray-600">Total Doctors</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-teal-100 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-teal-600" />
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
                <div className="bg-green-100 p-3 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.systemUptime}</p>
                  <p className="text-sm text-gray-600">System Uptime</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Hospital Approvals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-orange-500" />
                <span>Pending Hospital Approvals</span>
              </CardTitle>
              <CardDescription>Hospitals waiting for system approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingHospitals.map((hospital) => (
                  <div key={hospital.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{hospital.name}</h4>
                      <p className="text-sm text-gray-600">{hospital.location}</p>
                      <p className="text-sm text-gray-500">Admin: {hospital.adminName}</p>
                      <p className="text-xs text-gray-400">
                        {hospital.beds} beds • {hospital.departments} departments
                      </p>
                      <p className="text-xs text-gray-400">Submitted: {hospital.submittedDate}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" asChild>
                        <Link href={`/system-admin/hospitals/${hospital.id}/review`}>Review</Link>
                      </Button>
                    </div>
                  </div>
                ))}
                <Button asChild className="w-full bg-transparent" variant="outline">
                  <Link href="/system-admin/hospitals">View All Pending</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* System Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>System Activities</span>
              </CardTitle>
              <CardDescription>Recent system-wide activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-3 border rounded-lg">
                    <div
                      className={`p-2 rounded-full ${
                        activity.type === "approval"
                          ? "bg-green-100"
                          : activity.type === "system"
                            ? "bg-blue-100"
                            : "bg-orange-100"
                      }`}
                    >
                      {activity.type === "approval" && <CheckCircle className="h-4 w-4 text-green-600" />}
                      {activity.type === "system" && <Settings className="h-4 w-4 text-blue-600" />}
                      {activity.type === "application" && <AlertCircle className="h-4 w-4 text-orange-600" />}
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
            <CardTitle>System Administration</CardTitle>
            <CardDescription>Platform-wide management tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button asChild className="h-20 flex-col">
                <Link href="/system-admin/hospitals">
                  <Hospital className="h-6 w-6 mb-2" />
                  Review Hospitals
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col bg-transparent">
                <Link href="/system-admin/users">
                  <Users className="h-6 w-6 mb-2" />
                  Manage Users
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col bg-transparent">
                <Link href="/system-admin/analytics">
                  <TrendingUp className="h-6 w-6 mb-2" />
                  View Analytics
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col bg-transparent">
                <Link href="/system-admin/settings">
                  <Settings className="h-6 w-6 mb-2" />
                  Platform Settings
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
