"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  Users,
  FileText,
  MessageCircle,
  Settings,
  Stethoscope,
  Search,
  Plus,
  Eye,
  Edit,
  Printer,
  User,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

function DoctorSidebar() {
  const menuItems = [
    { icon: Stethoscope, label: "Dashboard", href: "/doctor/dashboard" },
    { icon: Calendar, label: "Appointments", href: "/doctor/appointments" },
    { icon: Users, label: "Patients", href: "/doctor/patients" },
    { icon: FileText, label: "Prescriptions", href: "/doctor/prescriptions", active: true },
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

export default function DoctorPrescriptions() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [isNewPrescriptionOpen, setIsNewPrescriptionOpen] = useState(false)
  const [prescriptions, setPrescriptions] = useState([
    {
      id: "RX001",
      patientName: "John Smith",
      patientId: "P001",
      date: "2024-01-15",
      status: "Active",
      medications: [
        { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", duration: "30 days" },
        { name: "Metformin", dosage: "500mg", frequency: "Twice daily", duration: "30 days" },
      ],
      diagnosis: "Hypertension, Type 2 Diabetes",
      notes: "Monitor blood pressure and glucose levels",
    },
    {
      id: "RX002",
      patientName: "Sarah Wilson",
      patientId: "P002",
      date: "2024-01-12",
      status: "Completed",
      medications: [{ name: "Amoxicillin", dosage: "500mg", frequency: "Three times daily", duration: "7 days" }],
      diagnosis: "Bacterial Infection",
      notes: "Complete full course even if symptoms improve",
    },
    {
      id: "RX003",
      patientName: "Michael Brown",
      patientId: "P003",
      date: "2024-01-10",
      status: "Active",
      medications: [
        { name: "Albuterol Inhaler", dosage: "90mcg", frequency: "As needed", duration: "30 days" },
        { name: "Fluticasone", dosage: "50mcg", frequency: "Twice daily", duration: "30 days" },
      ],
      diagnosis: "Asthma",
      notes: "Use rescue inhaler as needed for symptoms",
    },
  ])

  const [newPrescription, setNewPrescription] = useState({
    patientId: "",
    patientName: "",
    diagnosis: "",
    medications: [{ name: "", dosage: "", frequency: "", duration: "" }],
    notes: "",
  })

  const filteredPrescriptions = prescriptions.filter(
    (prescription) =>
      prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCreatePrescription = () => {
    const newRx = {
      id: `RX${String(prescriptions.length + 1).padStart(3, "0")}`,
      patientName: newPrescription.patientName,
      patientId: newPrescription.patientId,
      date: new Date().toISOString().split("T")[0],
      status: "Active",
      medications: newPrescription.medications.filter((med) => med.name),
      diagnosis: newPrescription.diagnosis,
      notes: newPrescription.notes,
    }

    setPrescriptions((prev) => [newRx, ...prev])
    setIsNewPrescriptionOpen(false)
    setNewPrescription({
      patientId: "",
      patientName: "",
      diagnosis: "",
      medications: [{ name: "", dosage: "", frequency: "", duration: "" }],
      notes: "",
    })

    toast({
      title: "Prescription Created",
      description: `Prescription ${newRx.id} has been created successfully.`,
    })
  }

  const addMedication = () => {
    setNewPrescription((prev) => ({
      ...prev,
      medications: [...prev.medications, { name: "", dosage: "", frequency: "", duration: "" }],
    }))
  }

  const updateMedication = (index: number, field: string, value: string) => {
    setNewPrescription((prev) => ({
      ...prev,
      medications: prev.medications.map((med, i) => (i === index ? { ...med, [field]: value } : med)),
    }))
  }

  const removeMedication = (index: number) => {
    setNewPrescription((prev) => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index),
    }))
  }

  const getStatusColor = (status: string) => {
    return status === "Active" ? "default" : "secondary"
  }

  return (
    <DashboardLayout title="Prescriptions" sidebar={<DoctorSidebar />}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search prescriptions by patient name, ID, or diagnosis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Dialog open={isNewPrescriptionOpen} onOpenChange={setIsNewPrescriptionOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Prescription
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Prescription</DialogTitle>
                <DialogDescription>Fill in the prescription details for your patient</DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                {/* Patient Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="patientId">Patient ID</Label>
                    <Input
                      id="patientId"
                      value={newPrescription.patientId}
                      onChange={(e) => setNewPrescription((prev) => ({ ...prev, patientId: e.target.value }))}
                      placeholder="P001"
                    />
                  </div>
                  <div>
                    <Label htmlFor="patientName">Patient Name</Label>
                    <Input
                      id="patientName"
                      value={newPrescription.patientName}
                      onChange={(e) => setNewPrescription((prev) => ({ ...prev, patientName: e.target.value }))}
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="diagnosis">Diagnosis</Label>
                  <Input
                    id="diagnosis"
                    value={newPrescription.diagnosis}
                    onChange={(e) => setNewPrescription((prev) => ({ ...prev, diagnosis: e.target.value }))}
                    placeholder="Primary diagnosis"
                  />
                </div>

                {/* Medications */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Label>Medications</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addMedication}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Medication
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {newPrescription.medications.map((medication, index) => (
                      <div key={index} className="grid grid-cols-4 gap-4 p-4 border rounded-lg">
                        <div>
                          <Label>Medication Name</Label>
                          <Input
                            value={medication.name}
                            onChange={(e) => updateMedication(index, "name", e.target.value)}
                            placeholder="Medicine name"
                          />
                        </div>
                        <div>
                          <Label>Dosage</Label>
                          <Input
                            value={medication.dosage}
                            onChange={(e) => updateMedication(index, "dosage", e.target.value)}
                            placeholder="10mg"
                          />
                        </div>
                        <div>
                          <Label>Frequency</Label>
                          <Input
                            value={medication.frequency}
                            onChange={(e) => updateMedication(index, "frequency", e.target.value)}
                            placeholder="Once daily"
                          />
                        </div>
                        <div>
                          <Label>Duration</Label>
                          <div className="flex gap-2">
                            <Input
                              value={medication.duration}
                              onChange={(e) => updateMedication(index, "duration", e.target.value)}
                              placeholder="30 days"
                            />
                            {newPrescription.medications.length > 1 && (
                              <Button type="button" variant="outline" size="sm" onClick={() => removeMedication(index)}>
                                Remove
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={newPrescription.notes}
                    onChange={(e) => setNewPrescription((prev) => ({ ...prev, notes: e.target.value }))}
                    placeholder="Special instructions, warnings, or notes..."
                    className="h-20"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsNewPrescriptionOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreatePrescription}>Create Prescription</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Prescriptions List */}
        <div className="space-y-4">
          {filteredPrescriptions.map((prescription) => (
            <Card key={prescription.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src="/placeholder.svg?height=48&width=48" />
                      <AvatarFallback>
                        {prescription.patientName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{prescription.patientName}</CardTitle>
                      <CardDescription>
                        Prescription ID: {prescription.id} • Patient ID: {prescription.patientId}
                      </CardDescription>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant={getStatusColor(prescription.status)}>{prescription.status}</Badge>
                        <span className="text-sm text-gray-500">Date: {prescription.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Printer className="h-4 w-4 mr-1" />
                      Print
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">Diagnosis</h4>
                    <p className="text-gray-900">{prescription.diagnosis}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">Medications</h4>
                    <div className="space-y-2">
                      {prescription.medications.map((medication, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm">
                            <div>
                              <span className="font-medium">{medication.name}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Dosage: {medication.dosage}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Frequency: {medication.frequency}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Duration: {medication.duration}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {prescription.notes && (
                    <div>
                      <h4 className="font-semibold text-sm text-gray-700 mb-2">Notes</h4>
                      <p className="text-gray-900 text-sm">{prescription.notes}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredPrescriptions.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No prescriptions found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search criteria</p>
                <Button onClick={() => setIsNewPrescriptionOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Prescription
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
