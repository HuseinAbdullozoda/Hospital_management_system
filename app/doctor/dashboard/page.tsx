"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, FileText, MessageCircle, Clock, CheckCircle, User, Stethoscope, Settings } from "lucide-react"
import Link from "next/link"

function DoctorSidebar() {
  const menuItems = [
    { icon: Stethoscope, label: "Dashboard", href: "/doctor/dashboard", active: true },
    { icon: Calendar, label: "Appointments", href: "/doctor/appointments" },
    { icon: Users, label: "Patients", href: "/doctor/patients" },
    { icon: FileText, label: "Prescriptions", href: "/doctor/prescriptions" },
    { icon: MessageCircle, label: "Chat", href: "/doctor/chat" },
    { icon: User, label: "Profile", href: "/doctor/profile" },
    { icon: Settings, label: "Settings", href: "/doctor/settings" },
  ]

  return (
    <nav className="p-4">
      <div className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              item.active ? "bg-green-100 text-green-700" : "text-gray-600 hover:bg-gray-100"
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

export default function DoctorDashboard() {
  const todayAppointments = [
    {
      id: 1,
      patient: "John Smith",
      time: "9:00 AM",
      type: "Consultation",
      status: "confirmed",
      duration: "30 min",
    },
    {
      id: 2,
      patient: "Sarah Wilson",
      time: "10:30 AM",
      type: "Follow-up",
      status: "pending",
      duration: "15 min",
    },
    {
      id: 3,
      patient: "Michael Brown",
      time: "2:00 PM",
      type: "Consultation",
      status: "confirmed",
      duration: "30 min",
    },
    {
      id: 4,
      patient: "Emily Davis",
      time: "3:30 PM",
      type: "Check-up",
      status: "pending",
      duration: "20 min",
    },
  ]

  const recentPatients = [
    {
      id: 1,
      name: "Alice Johnson",
      lastVisit: "2024-01-10",
      condition: "Hypertension",
      nextAppointment: "2024-01-25",
    },
    {
      id: 2,
      name: "Robert Chen",
      lastVisit: "2024-01-08",
      condition: "Diabetes Type 2",
      nextAppointment: "2024-01-22",
    },
    {
      id: 3,
      name: "Maria Garcia",
      lastVisit: "2024-01-05",
      condition: "Asthma",
      nextAppointment: "2024-01-20",
    },
  ]

  const stats = {
    todayAppointments: 4,
    totalPatients: 156,
    pendingApprovals: 2,
    messagesUnread: 8,
  }

  return (
    <DashboardLayout title="Doctor Dashboard" sidebar={<DoctorSidebar />}>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.todayAppointments}</p>
                  <p className="text-sm text-gray-600">Today's Appointments</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
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
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-orange-600" />
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
                  <MessageCircle className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.messagesUnread}</p>
                  <p className="text-sm text-gray-600">Unread Messages</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Today's Appointments</span>
              </CardTitle>
              <CardDescription>Your scheduled appointments for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{appointment.patient}</h4>
                        <p className="text-sm text-gray-600">{appointment.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{appointment.time}</p>
                      <p className="text-sm text-gray-500">{appointment.duration}</p>
                      <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"} className="mt-1">
                        {appointment.status === "confirmed" ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <Clock className="h-3 w-3 mr-1" />
                        )}
                        {appointment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Button asChild className="w-full">
                  <Link href="/doctor/appointments">View All Appointments</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Patients */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Recent Patients</span>
              </CardTitle>
              <CardDescription>Patients you've seen recently</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPatients.map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{patient.name}</h4>
                        <p className="text-sm text-gray-600">{patient.condition}</p>
                        <p className="text-xs text-gray-500">Last visit: {patient.lastVisit}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Next: {patient.nextAppointment}</p>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/doctor/patients/${patient.id}`}>View</Link>
                      </Button>
                    </div>
                  </div>
                ))}
                <Button asChild className="w-full bg-transparent" variant="outline">
                  <Link href="/doctor/patients">View All Patients</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button asChild className="h-20 flex-col">
                <Link href="/doctor/prescriptions/new">
                  <FileText className="h-6 w-6 mb-2" />
                  Create Prescription
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col bg-transparent">
                <Link href="/doctor/patients/search">
                  <Users className="h-6 w-6 mb-2" />
                  Search Patients
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col bg-transparent">
                <Link href="/doctor/chat">
                  <MessageCircle className="h-6 w-6 mb-2" />
                  Patient Messages
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
