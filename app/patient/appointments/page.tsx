"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  User,
  MapPin,
  Phone,
  MessageCircle,
  Settings,
  FileText,
  TestTube,
  Pill,
  Stethoscope,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

function PatientSidebar() {
  const menuItems = [
    { icon: Stethoscope, label: "Dashboard", href: "/patient/dashboard" },
    { icon: Calendar, label: "Appointments", href: "/patient/appointments", active: true },
    { icon: User, label: "Find Doctors", href: "/patient/doctors" },
    { icon: FileText, label: "Prescriptions", href: "/patient/prescriptions" },
    { icon: TestTube, label: "Lab Tests", href: "/patient/lab-tests" },
    { icon: Pill, label: "Pharmacy", href: "/patient/pharmacy" },
    { icon: MessageCircle, label: "Chat", href: "/patient/chat" },
    { icon: User, label: "Profile", href: "/patient/profile" },
    { icon: Settings, label: "Settings", href: "/patient/settings" },
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

export default function PatientAppointments() {
  const { toast } = useToast()
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "2024-01-20",
      time: "10:00 AM",
      status: "confirmed",
      hospital: "City General Hospital",
      address: "123 Main St, Downtown",
      phone: "+1 (555) 123-4567",
      type: "Consultation",
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Dermatologist",
      date: "2024-01-22",
      time: "2:30 PM",
      status: "pending",
      hospital: "Metro Medical Center",
      address: "456 Oak Ave, Midtown",
      phone: "+1 (555) 987-6543",
      type: "Follow-up",
    },
    {
      id: 3,
      doctor: "Dr. Emily Davis",
      specialty: "Pediatrician",
      date: "2024-01-25",
      time: "11:15 AM",
      status: "confirmed",
      hospital: "Children's Hospital",
      address: "789 Pine St, Uptown",
      phone: "+1 (555) 456-7890",
      type: "Check-up",
    },
  ])

  const handleCancelAppointment = (appointmentId: number) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== appointmentId))
    toast({
      title: "Appointment Cancelled",
      description: "Your appointment has been successfully cancelled.",
    })
  }

  const upcomingAppointments = appointments.filter((apt) => apt.status !== "cancelled")
  const pastAppointments = [
    {
      id: 4,
      doctor: "Dr. Robert Wilson",
      specialty: "General Practitioner",
      date: "2024-01-10",
      time: "9:00 AM",
      status: "completed",
      hospital: "City General Hospital",
      type: "Consultation",
    },
  ]

  return (
    <DashboardLayout title="My Appointments" sidebar={<PatientSidebar />}>
      <div className="space-y-6">
        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Upcoming Appointments</span>
            </CardTitle>
            <CardDescription>Your scheduled appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="border rounded-lg p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <User className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{appointment.doctor}</h3>
                          <p className="text-gray-600">{appointment.specialty}</p>
                          <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                            {appointment.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>{appointment.hospital}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span>{appointment.phone}</span>
                        </div>
                      </div>

                      {appointment.address && <p className="text-sm text-gray-500 mt-2">{appointment.address}</p>}
                    </div>

                    <div className="flex flex-col space-y-2 ml-4">
                      <Button size="sm" variant="outline">
                        Reschedule
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="destructive">
                            Cancel
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Cancel Appointment</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to cancel your appointment with {appointment.doctor} on{" "}
                              {appointment.date} at {appointment.time}?
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline">Keep Appointment</Button>
                            <Button variant="destructive" onClick={() => handleCancelAppointment(appointment.id)}>
                              Cancel Appointment
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              ))}

              {upcomingAppointments.length === 0 && (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No upcoming appointments</p>
                  <Button asChild className="mt-4">
                    <Link href="/patient/doctors">Book an Appointment</Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Past Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>Past Appointments</CardTitle>
            <CardDescription>Your appointment history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pastAppointments.map((appointment) => (
                <div key={appointment.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gray-200 p-2 rounded-full">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{appointment.doctor}</h4>
                        <p className="text-sm text-gray-600">{appointment.specialty}</p>
                        <p className="text-sm text-gray-500">
                          {appointment.date} at {appointment.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">Completed</Badge>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
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
