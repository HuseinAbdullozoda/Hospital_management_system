"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Calendar,
  Clock,
  User,
  Phone,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Users,
  FileText,
  MessageCircle,
  Settings,
  Stethoscope,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

function DoctorSidebar() {
  const menuItems = [
    { icon: Stethoscope, label: "Dashboard", href: "/doctor/dashboard" },
    { icon: Calendar, label: "Appointments", href: "/doctor/appointments", active: true },
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

export default function DoctorAppointments() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: "John Smith",
      patientId: "P001",
      date: "2024-01-20",
      time: "10:00 AM",
      type: "Consultation",
      status: "pending",
      phone: "+1 (555) 123-4567",
      reason: "Chest pain and shortness of breath",
      duration: "30 min",
      notes: "First-time patient, referred by Dr. Wilson",
    },
    {
      id: 2,
      patient: "Sarah Wilson",
      patientId: "P002",
      date: "2024-01-20",
      time: "11:00 AM",
      type: "Follow-up",
      status: "confirmed",
      phone: "+1 (555) 987-6543",
      reason: "Hypertension follow-up",
      duration: "15 min",
      notes: "Regular check-up, medication review needed",
    },
    {
      id: 3,
      patient: "Michael Brown",
      patientId: "P003",
      date: "2024-01-20",
      time: "2:00 PM",
      type: "Consultation",
      status: "pending",
      phone: "+1 (555) 456-7890",
      reason: "Annual physical examination",
      duration: "45 min",
      notes: "Comprehensive health check-up",
    },
    {
      id: 4,
      patient: "Emily Davis",
      patientId: "P004",
      date: "2024-01-21",
      time: "9:30 AM",
      type: "Emergency",
      status: "pending",
      phone: "+1 (555) 321-0987",
      reason: "Severe headache and dizziness",
      duration: "30 min",
      notes: "Urgent consultation needed",
    },
  ])

  const handleApproveAppointment = (appointmentId: number) => {
    setAppointments((prev) => prev.map((apt) => (apt.id === appointmentId ? { ...apt, status: "confirmed" } : apt)))

    const appointment = appointments.find((apt) => apt.id === appointmentId)
    toast({
      title: "Appointment Approved",
      description: `Appointment with ${appointment?.patient} has been confirmed.`,
    })
  }

  const handleRejectAppointment = (appointmentId: number) => {
    setAppointments((prev) => prev.map((apt) => (apt.id === appointmentId ? { ...apt, status: "rejected" } : apt)))

    const appointment = appointments.find((apt) => apt.id === appointmentId)
    toast({
      title: "Appointment Rejected",
      description: `Appointment with ${appointment?.patient} has been rejected.`,
      variant: "destructive",
    })
  }

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.reason.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || appointment.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "default"
      case "pending":
        return "secondary"
      case "rejected":
        return "destructive"
      case "completed":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Emergency":
        return "destructive"
      case "Consultation":
        return "default"
      case "Follow-up":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <DashboardLayout title="Appointments" sidebar={<DoctorSidebar />}>
      <div className="space-y-6">
        {/* Filters and Search */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search patients or reasons..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="rejected">Rejected</option>
                  <option value="completed">Completed</option>
                </select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appointments List */}
        <Card>
          <CardHeader>
            <CardTitle>Appointment Requests</CardTitle>
            <CardDescription>{filteredAppointments.length} appointments found</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredAppointments.map((appointment) => (
                <div key={appointment.id} className="border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{appointment.patient}</h3>
                        <p className="text-gray-600">Patient ID: {appointment.patientId}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                          <Badge variant={getTypeColor(appointment.type)}>{appointment.type}</Badge>
                        </div>
                      </div>
                    </div>

                    {appointment.status === "pending" && (
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleApproveAppointment(appointment.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleRejectAppointment(appointment.id)}>
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>
                        {appointment.time} ({appointment.duration})
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{appointment.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span>{appointment.type}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Reason for visit:</span>
                      <p className="text-gray-700">{appointment.reason}</p>
                    </div>
                    {appointment.notes && (
                      <div>
                        <span className="font-medium">Notes:</span>
                        <p className="text-gray-700">{appointment.notes}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/doctor/patients/${appointment.patientId}`}>View Patient</Link>
                    </Button>
                    {appointment.status === "confirmed" && (
                      <Button size="sm" onClick={() => {
                        // TODO: Implement start consultation functionality
                        toast({
                          title: "Feature Coming Soon",
                          description: "Start consultation functionality will be available soon.",
                        })
                      }}>
                        Start Consultation
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              {filteredAppointments.length === 0 && (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No appointments found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
