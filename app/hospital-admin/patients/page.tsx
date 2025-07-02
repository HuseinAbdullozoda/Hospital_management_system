"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Hospital,
  Building,
  Users,
  UserCheck,
  Settings,
  Search,
  Edit,
  Eye,
  FlaskConical,
  Pill,
  TrendingUp,
  Mail,
  Phone,
  Calendar,
  MapPin,
  FileText,
} from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

function HospitalAdminSidebar() {
  const menuItems = [
    { icon: Hospital, label: "Dashboard", href: "/hospital-admin/dashboard" },
    { icon: Building, label: "Departments", href: "/hospital-admin/departments" },
    { icon: UserCheck, label: "Doctors", href: "/hospital-admin/doctors" },
    { icon: FlaskConical, label: "Lab Workers", href: "/hospital-admin/lab-workers" },
    { icon: Pill, label: "Pharmacists", href: "/hospital-admin/pharmacists" },
    { icon: Users, label: "Patients", href: "/hospital-admin/patients", active: true },
    { icon: TrendingUp, label: "Reports", href: "/hospital-admin/reports" },
    { icon: Settings, label: "Hospital Profile", href: "/hospital-admin/profile" },
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

export default function HospitalPatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterDepartment, setFilterDepartment] = useState("all")

  const patients = [
    {
      id: "P001",
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 234-567-8900",
      age: 45,
      gender: "Male",
      address: "123 Main St, Downtown",
      status: "Active",
      admissionDate: "2024-01-15",
      department: "Cardiology",
      doctor: "Dr. Sarah Johnson",
      room: "A201",
      diagnosis: "Hypertension",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "P002",
      name: "Sarah Wilson",
      email: "sarah.wilson@email.com",
      phone: "+1 234-567-8901",
      age: 32,
      gender: "Female",
      address: "456 Oak Ave, Uptown",
      status: "Discharged",
      admissionDate: "2024-01-12",
      department: "Emergency Medicine",
      doctor: "Dr. Michael Roberts",
      room: "ER-3",
      diagnosis: "Bacterial Infection",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "P003",
      name: "Michael Brown",
      email: "michael.brown@email.com",
      phone: "+1 234-567-8902",
      age: 28,
      gender: "Male",
      address: "789 Pine St, Midtown",
      status: "In Treatment",
      admissionDate: "2024-01-10",
      department: "Neurology",
      doctor: "Dr. James Wilson",
      room: "B305",
      diagnosis: "Migraine",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "P004",
      name: "Emily Davis",
      email: "emily.davis@email.com",
      phone: "+1 234-567-8903",
      age: 8,
      gender: "Female",
      address: "321 Elm St, Suburb",
      status: "Active",
      admissionDate: "2024-01-08",
      department: "Pediatrics",
      doctor: "Dr. Emily Davis",
      room: "C102",
      diagnosis: "Asthma",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const departments = ["Emergency Medicine", "Cardiology", "Neurology", "Pediatrics", "Orthopedics"]

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.doctor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || patient.status === filterStatus
    const matchesDepartment = filterDepartment === "all" || patient.department === filterDepartment
    return matchesSearch && matchesStatus && matchesDepartment
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "default"
      case "In Treatment":
        return "secondary"
      case "Discharged":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <DashboardLayout title="Hospital Patients" sidebar={<HospitalAdminSidebar />}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search patients by name, ID, diagnosis, or doctor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="In Treatment">In Treatment</SelectItem>
              <SelectItem value="Discharged">Discharged</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterDepartment} onValueChange={setFilterDepartment}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Patients List */}
        <div className="space-y-4">
          {filteredPatients.map((patient) => (
            <Card key={patient.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={patient.avatar || "/placeholder.svg"} alt={patient.name} />
                    <AvatarFallback className="text-lg">
                      {patient.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">{patient.name}</h3>
                        <p className="text-gray-600">
                          {patient.age} years old • {patient.gender}
                        </p>
                        <p className="text-sm text-gray-500">Patient ID: {patient.id}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getStatusColor(patient.status)}>{patient.status}</Badge>
                        {patient.room && <Badge variant="outline">Room {patient.room}</Badge>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span>{patient.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span>{patient.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>{patient.address}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <Building className="h-4 w-4 text-gray-400" />
                          <span>{patient.department}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <UserCheck className="h-4 w-4 text-gray-400" />
                          <span>{patient.doctor}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>Admitted {patient.admissionDate}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm text-blue-600 font-medium">Primary Diagnosis</p>
                          <p className="text-lg font-semibold text-blue-900">{patient.diagnosis}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-1" />
                        Medical Records
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <Calendar className="h-4 w-4 mr-1" />
                        Appointments
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
