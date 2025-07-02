"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MessageCircle, FileText, ShoppingCart, Hospital, Clock, User, Pill } from "lucide-react"
import Link from "next/link"

function PatientSidebar() {
  const menuItems = [
    { icon: Hospital, label: "Dashboard", href: "/patient/dashboard", active: true },
    { icon: Calendar, label: "Appointments", href: "/patient/appointments" },
    { icon: MessageCircle, label: "Chat", href: "/patient/chat" },
    { icon: FileText, label: "Prescriptions", href: "/patient/prescriptions" },
    { icon: ShoppingCart, label: "Lab Tests", href: "/patient/lab-tests" },
    { icon: Pill, label: "Pharmacy", href: "/patient/pharmacy" },
    { icon: User, label: "Find Doctors", href: "/patient/doctors" },
  ]

  return (
    <nav className="p-4">
      <div className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              item.active ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
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

export default function PatientDashboard() {
  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "2024-01-15",
      time: "10:00 AM",
      hospital: "City General Hospital",
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Dermatology",
      date: "2024-01-18",
      time: "2:30 PM",
      hospital: "Metro Medical Center",
    },
  ]

  const recentPrescriptions = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      date: "2024-01-10",
      medications: ["Lisinopril 10mg", "Metformin 500mg"],
    },
    {
      id: 2,
      doctor: "Dr. Emily Davis",
      date: "2024-01-08",
      medications: ["Amoxicillin 250mg"],
    },
  ]

  return (
    <DashboardLayout title="Patient Dashboard" sidebar={<PatientSidebar />}>
      <div className="space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Book Appointment</h3>
                  <p className="text-sm text-gray-600">Find & book doctors</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Chat with Doctor</h3>
                  <p className="text-sm text-gray-600">Instant messaging</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <ShoppingCart className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Lab Tests</h3>
                  <p className="text-sm text-gray-600">Book & pay online</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Pill className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Buy Medicines</h3>
                  <p className="text-sm text-gray-600">Online pharmacy</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Upcoming Appointments</span>
              </CardTitle>
              <CardDescription>Your scheduled appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{appointment.doctor}</h4>
                      <p className="text-sm text-gray-600">{appointment.specialty}</p>
                      <p className="text-sm text-gray-500">{appointment.hospital}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{appointment.date}</p>
                      <p className="text-sm text-gray-600">{appointment.time}</p>
                    </div>
                  </div>
                ))}
                <Button asChild className="w-full">
                  <Link href="/patient/appointments">View All Appointments</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Prescriptions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Recent Prescriptions</span>
              </CardTitle>
              <CardDescription>Your latest prescriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPrescriptions.map((prescription) => (
                  <div key={prescription.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{prescription.doctor}</h4>
                      <span className="text-sm text-gray-500">{prescription.date}</span>
                    </div>
                    <div className="space-y-1">
                      {prescription.medications.map((med, index) => (
                        <p key={index} className="text-sm text-gray-600">
                          • {med}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
                <Button asChild className="w-full bg-transparent" variant="outline">
                  <Link href="/patient/prescriptions">View All Prescriptions</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
