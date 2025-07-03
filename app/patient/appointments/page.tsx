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
  Mail,
  AlertCircle,
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
import { apiClient } from "@/lib/api"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

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
  const [isRescheduling, setIsRescheduling] = useState(false)
  const [rescheduleData, setRescheduleData] = useState({
    appointment_date: "",
    appointment_time: "",
    reason: ""
  })
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)
  const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false)

  const handleReschedule = async () => {
    if (!selectedAppointment) return

    if (!rescheduleData.appointment_date || !rescheduleData.appointment_time) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsRescheduling(true)
    try {
      const result = await apiClient.rescheduleAppointment(selectedAppointment.id, rescheduleData)
      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Appointment rescheduled successfully",
        })
        setIsRescheduleDialogOpen(false)
        setRescheduleData({ appointment_date: "", appointment_time: "", reason: "" })
        setSelectedAppointment(null)
        // Refresh appointments list here
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reschedule appointment",
        variant: "destructive",
      })
    } finally {
      setIsRescheduling(false)
    }
  }

  const handleCancelAppointment = async (appointmentId: number) => {
    try {
      const result = await apiClient.request(`/appointments/${appointmentId}`, {
        method: 'DELETE'
      })
      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Appointment cancelled successfully",
        })
        // Refresh appointments list here
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel appointment",
        variant: "destructive",
      })
    }
  }

  const openRescheduleDialog = (appointment: any) => {
    setSelectedAppointment(appointment)
    setIsRescheduleDialogOpen(true)
  }

  // Mock data - replace with actual API call
  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "2024-01-15",
      time: "10:00 AM",
      status: "confirmed",
      location: "Main Hospital, Room 205",
      phone: "+1 (555) 123-4567",
      email: "dr.johnson@hospital.com",
      reason: "Follow-up consultation"
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Dermatology",
      date: "2024-01-18",
      time: "2:30 PM",
      status: "pending",
      location: "Medical Center, Room 103",
      phone: "+1 (555) 987-6543",
      email: "dr.chen@hospital.com",
      reason: "Skin condition evaluation"
    }
  ]

  const pastAppointments = [
    {
      id: 3,
      doctor: "Dr. Emily Rodriguez",
      specialty: "General Medicine",
      date: "2024-01-10",
      time: "9:00 AM",
      status: "completed",
      location: "Main Hospital, Room 101",
      phone: "+1 (555) 456-7890",
      email: "dr.rodriguez@hospital.com",
      reason: "Annual checkup"
    }
  ]

  const getStatusBadge = (status: string) => {
    const variants: any = {
      confirmed: "default",
      pending: "secondary",
      cancelled: "destructive",
      completed: "outline"
    }
    return <Badge variant={variants[status]}>{status}</Badge>
  }

  return (
    <DashboardLayout title="Appointments" sidebar={<PatientSidebar />}>
      <div className="max-w-6xl mx-auto space-y-6">
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
            {upcomingAppointments.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming appointments</h3>
                <p className="text-gray-600 mb-4">You don't have any scheduled appointments.</p>
                <Button asChild>
                  <Link href="/patient/doctors">Book an Appointment</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold">{appointment.doctor}</h3>
                          {getStatusBadge(appointment.status)}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{appointment.specialty}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{appointment.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{appointment.location}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          <strong>Reason:</strong> {appointment.reason}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => openRescheduleDialog(appointment)}
                        >
                          Reschedule
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              Cancel
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Cancel Appointment</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to cancel your appointment with {appointment.doctor}? This action cannot be undone.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => {
                                // Close the dialog by clicking outside or pressing escape
                                const dialog = document.querySelector('[role="dialog"]')
                                if (dialog) {
                                  dialog.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
                                }
                              }}>
                                Keep Appointment
                              </Button>
                              <Button variant="destructive" onClick={() => handleCancelAppointment(appointment.id)}>
                                Cancel Appointment
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Phone className="h-4 w-4" />
                          <span>{appointment.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Mail className="h-4 w-4" />
                          <span>{appointment.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Past Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>Past Appointments</CardTitle>
            <CardDescription>Your completed appointments</CardDescription>
          </CardHeader>
          <CardContent>
            {pastAppointments.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No past appointments</h3>
                <p className="text-gray-600">You don't have any completed appointments yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pastAppointments.map((appointment) => (
                  <div key={appointment.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold">{appointment.doctor}</h3>
                          {getStatusBadge(appointment.status)}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{appointment.specialty}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{appointment.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{appointment.location}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          <strong>Reason:</strong> {appointment.reason}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => {
                          // TODO: Implement view details functionality
                          toast({
                            title: "Feature Coming Soon",
                            description: "View details functionality will be available soon.",
                          })
                        }}>
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Reschedule Dialog */}
        <Dialog open={isRescheduleDialogOpen} onOpenChange={setIsRescheduleDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reschedule Appointment</DialogTitle>
              <DialogDescription>
                Choose a new date and time for your appointment with {selectedAppointment?.doctor}.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="appointment_date">New Date</Label>
                <Input
                  id="appointment_date"
                  type="date"
                  value={rescheduleData.appointment_date}
                  onChange={(e) => setRescheduleData(prev => ({ ...prev, appointment_date: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="appointment_time">New Time</Label>
                <Input
                  id="appointment_time"
                  type="time"
                  value={rescheduleData.appointment_time}
                  onChange={(e) => setRescheduleData(prev => ({ ...prev, appointment_time: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="reason">Reason for Rescheduling (Optional)</Label>
                <Textarea
                  id="reason"
                  value={rescheduleData.reason}
                  onChange={(e) => setRescheduleData(prev => ({ ...prev, reason: e.target.value }))}
                  placeholder="Please provide a reason for rescheduling..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRescheduleDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleReschedule} disabled={isRescheduling}>
                {isRescheduling ? "Rescheduling..." : "Reschedule Appointment"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
