"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  MapPin,
  Star,
  Calendar,
  Hospital,
  MessageCircle,
  User,
  FileText,
  ShoppingCart,
  Pill,
} from "lucide-react"
import Link from "next/link"

function PatientSidebar() {
  const menuItems = [
    { icon: Hospital, label: "Dashboard", href: "/patient/dashboard" },
    { icon: Calendar, label: "Appointments", href: "/patient/appointments" },
    { icon: MessageCircle, label: "Chat", href: "/patient/chat" },
    { icon: FileText, label: "Prescriptions", href: "/patient/prescriptions" },
    { icon: ShoppingCart, label: "Lab Tests", href: "/patient/lab-tests" },
    { icon: Pill, label: "Pharmacy", href: "/patient/pharmacy" },
    { icon: User, label: "Find Doctors", href: "/patient/doctors", active: true },
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

export default function FindDoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedHospital, setSelectedHospital] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("")

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      hospital: "City General Hospital",
      rating: 4.8,
      reviews: 124,
      experience: "15 years",
      image: "/placeholder.svg?height=100&width=100",
      availableSlots: ["10:00 AM", "2:00 PM", "4:30 PM"],
      consultationFee: 150,
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Dermatology",
      hospital: "Metro Medical Center",
      rating: 4.9,
      reviews: 89,
      experience: "12 years",
      image: "/placeholder.svg?height=100&width=100",
      availableSlots: ["9:00 AM", "11:30 AM", "3:00 PM"],
      consultationFee: 120,
    },
    {
      id: 3,
      name: "Dr. Emily Davis",
      specialty: "Pediatrics",
      hospital: "Regional Health Institute",
      rating: 4.7,
      reviews: 156,
      experience: "10 years",
      image: "/placeholder.svg?height=100&width=100",
      availableSlots: ["8:30 AM", "1:00 PM", "5:00 PM"],
      consultationFee: 100,
    },
    {
      id: 4,
      name: "Dr. Robert Wilson",
      specialty: "Orthopedics",
      hospital: "City General Hospital",
      rating: 4.6,
      reviews: 98,
      experience: "18 years",
      image: "/placeholder.svg?height=100&width=100",
      availableSlots: ["10:30 AM", "2:30 PM"],
      consultationFee: 180,
    },
  ]

  const hospitals = ["City General Hospital", "Metro Medical Center", "Regional Health Institute"]

  const specialties = ["Cardiology", "Dermatology", "Pediatrics", "Orthopedics", "Neurology", "Oncology"]

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesHospital = !selectedHospital || doctor.hospital === selectedHospital
    const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty

    return matchesSearch && matchesHospital && matchesSpecialty
  })

  return (
    <DashboardLayout title="Find Doctors" sidebar={<PatientSidebar />}>
      <div className="space-y-6">
        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Search Doctors</CardTitle>
            <CardDescription>Find the right doctor for your needs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedHospital} onValueChange={setSelectedHospital}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Hospital" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Hospitals</SelectItem>
                  {hospitals.map((hospital) => (
                    <SelectItem key={hospital} value={hospital}>
                      {hospital}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Doctors List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={doctor.image || "/placeholder.svg"} alt={doctor.name} />
                    <AvatarFallback>
                      {doctor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{doctor.name}</h3>
                        <Badge variant="secondary" className="mb-2">
                          {doctor.specialty}
                        </Badge>
                        <div className="flex items-center space-x-1 text-sm text-gray-600 mb-1">
                          <MapPin className="h-4 w-4" />
                          <span>{doctor.hospital}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>
                            {doctor.rating} ({doctor.reviews} reviews)
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">Experience: {doctor.experience}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-green-600">${doctor.consultationFee}</p>
                        <p className="text-sm text-gray-500">Consultation Fee</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Available Today:</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {doctor.availableSlots.map((slot, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {slot}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex space-x-2">
                        <Button asChild className="flex-1">
                          <Link href={`/patient/doctors/${doctor.id}/book`}>
                            <Calendar className="h-4 w-4 mr-2" />
                            Book Appointment
                          </Link>
                        </Button>
                        <Button variant="outline" asChild>
                          <Link href={`/patient/doctors/${doctor.id}`}>View Profile</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No doctors found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
