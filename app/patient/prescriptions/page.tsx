"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Eye, Calendar, User, Hospital, MessageCircle, ShoppingCart, Pill } from "lucide-react"
import Link from "next/link"

function PatientSidebar() {
  const menuItems = [
    { icon: Hospital, label: "Dashboard", href: "/patient/dashboard" },
    { icon: Calendar, label: "Appointments", href: "/patient/appointments" },
    { icon: MessageCircle, label: "Chat", href: "/patient/chat" },
    { icon: FileText, label: "Prescriptions", href: "/patient/prescriptions", active: true },
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

export default function PrescriptionsPage() {
  const prescriptions = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      hospital: "City General Hospital",
      date: "2024-01-15",
      medications: [
        { name: "Lisinopril 10mg", dosage: "Once daily", duration: "30 days" },
        { name: "Metformin 500mg", dosage: "Twice daily with meals", duration: "30 days" },
      ],
      diagnosis: "Hypertension, Type 2 Diabetes",
      instructions: "Take medications as prescribed. Follow up in 4 weeks.",
      status: "active",
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Dermatology",
      hospital: "Metro Medical Center",
      date: "2024-01-10",
      medications: [{ name: "Hydrocortisone Cream 1%", dosage: "Apply twice daily", duration: "14 days" }],
      diagnosis: "Eczema",
      instructions: "Apply cream to affected areas. Avoid harsh soaps.",
      status: "completed",
    },
    {
      id: 3,
      doctor: "Dr. Emily Davis",
      specialty: "General Medicine",
      hospital: "Regional Health Institute",
      date: "2024-01-05",
      medications: [
        { name: "Amoxicillin 500mg", dosage: "Three times daily", duration: "7 days" },
        { name: "Paracetamol 500mg", dosage: "As needed for fever", duration: "7 days" },
      ],
      diagnosis: "Upper Respiratory Infection",
      instructions: "Complete the full course of antibiotics. Rest and stay hydrated.",
      status: "completed",
    },
  ]

  return (
    <DashboardLayout title="My Prescriptions" sidebar={<PatientSidebar />}>
      <div className="space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-6 w-6" />
              <span>Prescription History</span>
            </CardTitle>
            <CardDescription>View and download your prescriptions from doctors</CardDescription>
          </CardHeader>
        </Card>

        {/* Prescriptions List */}
        <div className="space-y-4">
          {prescriptions.map((prescription) => (
            <Card key={prescription.id}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{prescription.doctor}</h3>
                        <p className="text-gray-600">{prescription.specialty}</p>
                        <p className="text-sm text-gray-500">{prescription.hospital}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{prescription.date}</p>
                        <Badge variant={prescription.status === "active" ? "default" : "secondary"}>
                          {prescription.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Diagnosis */}
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-1">Diagnosis</h4>
                      <p className="text-gray-700">{prescription.diagnosis}</p>
                    </div>

                    {/* Medications */}
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Medications</h4>
                      <div className="space-y-2">
                        {prescription.medications.map((med, index) => (
                          <div key={index} className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="font-medium">{med.name}</p>
                                <p className="text-sm text-gray-600">Dosage: {med.dosage}</p>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {med.duration}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Instructions */}
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-1">Instructions</h4>
                      <p className="text-gray-700 text-sm">{prescription.instructions}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2 lg:ml-6">
                    <Button size="sm" asChild>
                      <Link href={`/patient/prescriptions/${prescription.id}/view`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Full
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/patient/pharmacy?prescription=${prescription.id}`}>
                        <Pill className="h-4 w-4 mr-2" />
                        Buy Medicines
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/patient/chat?doctor=${prescription.doctor}`}>
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Ask Doctor
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {prescriptions.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No prescriptions yet</h3>
              <p className="text-gray-600 mb-4">Your prescriptions from doctors will appear here</p>
              <Button asChild>
                <Link href="/patient/doctors">Find a Doctor</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
