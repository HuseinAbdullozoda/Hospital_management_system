"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Users,
  FileText,
  MessageCircle,
  Settings,
  Stethoscope,
  User,
  Phone,
  Mail,
  Heart,
  Activity,
  Pill,
  TestTube,
  AlertTriangle,
  Edit,
  Plus,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

function DoctorSidebar() {
  const menuItems = [
    { icon: Stethoscope, label: "Dashboard", href: "/doctor/dashboard" },
    { icon: Calendar, label: "Appointments", href: "/doctor/appointments" },
    { icon: Users, label: "Patients", href: "/doctor/patients", active: true },
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

export default function PatientProfile() {
  const params = useParams()
  const patientId = params.id as string

  // Mock patient data - in real app, this would be fetched based on ID
  const patient = {
    id: patientId,
    name: "John Smith",
    age: 45,
    gender: "Male",
    phone: "+1 (555) 123-4567",
    email: "john.smith@email.com",
    address: "123 Main Street, New York, NY 10001",
    dateOfBirth: "1979-03-15",
    bloodType: "O+",
    allergies: ["Penicillin", "Shellfish"],
    emergencyContact: "Jane Smith - +1 (555) 123-4568",
    insuranceProvider: "Blue Cross Blue Shield",
    insuranceNumber: "BC123456789",
    primaryCondition: "Hypertension",
    status: "Active",
    lastVisit: "2024-01-15",
    nextAppointment: "2024-01-25",
  }

  const vitalSigns = [
    { date: "2024-01-15", bloodPressure: "140/90", heartRate: "72", temperature: "98.6°F", weight: "180 lbs" },
    { date: "2024-01-08", bloodPressure: "145/95", heartRate: "75", temperature: "98.4°F", weight: "182 lbs" },
    { date: "2024-01-01", bloodPressure: "150/100", heartRate: "78", temperature: "98.7°F", weight: "183 lbs" },
  ]

  const medications = [
    {
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      startDate: "2024-01-01",
      prescribedBy: "Dr. Sarah Johnson",
      status: "Active",
    },
    {
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      startDate: "2024-01-01",
      prescribedBy: "Dr. Sarah Johnson",
      status: "Active",
    },
  ]

  const labResults = [
    {
      date: "2024-01-10",
      test: "Complete Blood Count",
      results: "Normal",
      orderedBy: "Dr. Sarah Johnson",
      status: "Completed",
    },
    {
      date: "2024-01-10",
      test: "Lipid Panel",
      results: "Cholesterol: 220 mg/dL (High)",
      orderedBy: "Dr. Sarah Johnson",
      status: "Completed",
    },
    {
      date: "2024-01-05",
      test: "HbA1c",
      results: "6.8% (Elevated)",
      orderedBy: "Dr. Sarah Johnson",
      status: "Completed",
    },
  ]

  const appointmentHistory = [
    {
      date: "2024-01-15",
      type: "Follow-up",
      diagnosis: "Hypertension - Stable",
      notes: "Blood pressure improving with medication",
      status: "Completed",
    },
    {
      date: "2024-01-08",
      type: "Consultation",
      diagnosis: "Hypertension, Type 2 Diabetes",
      notes: "Started on Lisinopril and Metformin",
      status: "Completed",
    },
    {
      date: "2024-01-01",
      type: "Initial Consultation",
      diagnosis: "Hypertension",
      notes: "New patient evaluation",
      status: "Completed",
    },
  ]

  return (
    <DashboardLayout title={`Patient Profile - ${patient.name}`} sidebar={<DoctorSidebar />}>
      <div className="space-y-6">
        {/* Patient Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback className="text-xl">
                    {patient.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">{patient.name}</h1>
                  <p className="text-gray-600">Patient ID: {patient.id}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge variant={patient.status === "Active" ? "default" : "secondary"}>{patient.status}</Badge>
                    <span className="text-sm text-gray-500">
                      {patient.age} years old • {patient.gender}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Phone className="h-4 w-4" />
                      <span>{patient.phone}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Mail className="h-4 w-4" />
                      <span>{patient.email}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button size="sm" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="labs">Lab Results</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Patient Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Patient Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                    <p>{patient.dateOfBirth}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Blood Type</label>
                    <p>{patient.bloodType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Address</label>
                    <p className="text-sm">{patient.address}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Emergency Contact</label>
                    <p className="text-sm">{patient.emergencyContact}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Insurance</label>
                    <p className="text-sm">{patient.insuranceProvider}</p>
                    <p className="text-xs text-gray-500">{patient.insuranceNumber}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Medical Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-5 w-5" />
                    <span>Medical Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Primary Condition</label>
                    <p>{patient.primaryCondition}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Allergies</label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {patient.allergies.map((allergy, index) => (
                        <Badge key={index} variant="destructive" className="text-xs">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Last Visit</label>
                    <p>{patient.lastVisit}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Next Appointment</label>
                    <p>{patient.nextAppointment}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-2" />
                    New Prescription
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <TestTube className="h-4 w-4 mr-2" />
                    Order Lab Test
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <FileText className="h-4 w-4 mr-2" />
                    Add Note
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Follow-up
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointmentHistory.slice(0, 3).map((appointment, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Calendar className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{appointment.type}</h4>
                          <span className="text-sm text-gray-500">{appointment.date}</span>
                        </div>
                        <p className="text-sm text-gray-600">{appointment.diagnosis}</p>
                        <p className="text-sm text-gray-500 mt-1">{appointment.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vitals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Vital Signs History</CardTitle>
                <CardDescription>Recent vital sign measurements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vitalSigns.map((vital, index) => (
                    <div key={index} className="grid grid-cols-5 gap-4 p-4 border rounded-lg">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Date</label>
                        <p className="font-semibold">{vital.date}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Blood Pressure</label>
                        <p>{vital.bloodPressure}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Heart Rate</label>
                        <p>{vital.heartRate} bpm</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Temperature</label>
                        <p>{vital.temperature}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Weight</label>
                        <p>{vital.weight}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="medications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Current Medications</span>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Medication
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {medications.map((medication, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-green-100 p-2 rounded-full">
                          <Pill className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{medication.name}</h4>
                          <p className="text-sm text-gray-600">
                            {medication.dosage} • {medication.frequency}
                          </p>
                          <p className="text-xs text-gray-500">
                            Started: {medication.startDate} • Prescribed by: {medication.prescribedBy}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={medication.status === "Active" ? "default" : "secondary"}>
                          {medication.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="labs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Laboratory Results</span>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Order Test
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {labResults.map((result, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-purple-100 p-2 rounded-full">
                          <TestTube className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{result.test}</h4>
                          <p className="text-sm text-gray-600">{result.results}</p>
                          <p className="text-xs text-gray-500">
                            {result.date} • Ordered by: {result.orderedBy}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{result.status}</Badge>
                        <Button size="sm" variant="outline">
                          View Report
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appointment History</CardTitle>
                <CardDescription>Complete history of patient visits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointmentHistory.map((appointment, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{appointment.type}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{appointment.status}</Badge>
                          <span className="text-sm text-gray-500">{appointment.date}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Diagnosis:</span> {appointment.diagnosis}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Notes:</span> {appointment.notes}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
