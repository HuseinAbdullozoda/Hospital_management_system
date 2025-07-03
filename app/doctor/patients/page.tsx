"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Search,
  Users,
  FileText,
  MessageCircle,
  Settings,
  Stethoscope,
  Eye,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

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

export default function DoctorPatients() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCondition, setFilterCondition] = useState("all")
  const [sortBy, setSortBy] = useState("name")

  const patients = [
    {
      id: "P001",
      name: "John Smith",
      age: 45,
      gender: "Male",
      phone: "+1 (555) 123-4567",
      email: "john.smith@email.com",
      lastVisit: "2024-01-15",
      nextAppointment: "2024-01-25",
      condition: "Hypertension",
      status: "Active",
      bloodType: "O+",
      allergies: ["Penicillin"],
      emergencyContact: "Jane Smith - +1 (555) 123-4568",
    },
    {
      id: "P002",
      name: "Sarah Wilson",
      age: 32,
      gender: "Female",
      phone: "+1 (555) 987-6543",
      email: "sarah.wilson@email.com",
      lastVisit: "2024-01-12",
      nextAppointment: "2024-01-22",
      condition: "Diabetes Type 2",
      status: "Active",
      bloodType: "A+",
      allergies: ["Shellfish"],
      emergencyContact: "Mike Wilson - +1 (555) 987-6544",
    },
    {
      id: "P003",
      name: "Michael Brown",
      age: 58,
      gender: "Male",
      phone: "+1 (555) 456-7890",
      email: "michael.brown@email.com",
      lastVisit: "2024-01-10",
      nextAppointment: "2024-01-28",
      condition: "Asthma",
      status: "Active",
      bloodType: "B+",
      allergies: ["Dust", "Pollen"],
      emergencyContact: "Lisa Brown - +1 (555) 456-7891",
    },
    {
      id: "P004",
      name: "Emily Davis",
      age: 28,
      gender: "Female",
      phone: "+1 (555) 321-0987",
      email: "emily.davis@email.com",
      lastVisit: "2024-01-08",
      nextAppointment: null,
      condition: "Migraine",
      status: "Inactive",
      bloodType: "AB+",
      allergies: ["None"],
      emergencyContact: "Robert Davis - +1 (555) 321-0988",
    },
    {
      id: "P005",
      name: "Robert Chen",
      age: 41,
      gender: "Male",
      phone: "+1 (555) 654-3210",
      email: "robert.chen@email.com",
      lastVisit: "2024-01-14",
      nextAppointment: "2024-01-24",
      condition: "High Cholesterol",
      status: "Active",
      bloodType: "O-",
      allergies: ["Latex"],
      emergencyContact: "Anna Chen - +1 (555) 654-3211",
    },
  ]

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter =
      filterCondition === "all" || patient.condition.toLowerCase().includes(filterCondition.toLowerCase())
    return matchesSearch && matchesFilter
  })

  const sortedPatients = [...filteredPatients].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "age":
        return a.age - b.age
      case "lastVisit":
        return new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime()
      default:
        return 0
    }
  })

  const getStatusColor = (status: string) => {
    return status === "Active" ? "default" : "secondary"
  }

  return (
    <DashboardLayout title="My Patients" sidebar={<DoctorSidebar />}>
      <div className="space-y-6">
        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search patients by name, condition, or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={filterCondition}
                  onChange={(e) => setFilterCondition(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Conditions</option>
                  <option value="hypertension">Hypertension</option>
                  <option value="diabetes">Diabetes</option>
                  <option value="asthma">Asthma</option>
                  <option value="migraine">Migraine</option>
                  <option value="cholesterol">High Cholesterol</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="name">Sort by Name</option>
                  <option value="age">Sort by Age</option>
                  <option value="lastVisit">Sort by Last Visit</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Patients List */}
        <Card>
          <CardHeader>
            <CardTitle>Patient List</CardTitle>
            <CardDescription>{sortedPatients.length} patients found</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sortedPatients.map((patient) => (
                <div key={patient.id} className="border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src="/placeholder.svg?height=48&width=48" />
                        <AvatarFallback>
                          {patient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold">{patient.name}</h3>
                        <p className="text-gray-600">Patient ID: {patient.id}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant={getStatusColor(patient.status)}>{patient.status}</Badge>
                          <span className="text-sm text-gray-500">
                            {patient.age} years old, {patient.gender}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" asChild>
                        <Link href={`/doctor/patients/${patient.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          View Profile
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Message
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{patient.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>{patient.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>Last visit: {patient.lastVisit}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>Next: {patient.nextAppointment || "Not scheduled"}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Primary Condition:</span>
                      <p className="text-gray-700">{patient.condition}</p>
                    </div>
                    <div>
                      <span className="font-medium">Blood Type:</span>
                      <p className="text-gray-700">{patient.bloodType}</p>
                    </div>
                    <div>
                      <span className="font-medium">Allergies:</span>
                      <p className="text-gray-700">{patient.allergies.join(", ")}</p>
                    </div>
                    <div>
                      <span className="font-medium">Emergency Contact:</span>
                      <p className="text-gray-700">{patient.emergencyContact}</p>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="outline" size="sm" onClick={() => {
                      // TODO: Implement schedule appointment functionality
                      toast({
                        title: "Feature Coming Soon",
                        description: "Schedule appointment functionality will be available soon.",
                      })
                    }}>
                      Schedule Appointment
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => {
                      // TODO: Implement view history functionality
                      toast({
                        title: "Feature Coming Soon",
                        description: "View history functionality will be available soon.",
                      })
                    }}>
                      View History
                    </Button>
                    <Button size="sm" asChild>
                      <Link href={`/doctor/prescriptions/new?patient=${patient.id}`}>Create Prescription</Link>
                    </Button>
                  </div>
                </div>
              ))}

              {sortedPatients.length === 0 && (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No patients found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
