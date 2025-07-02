"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  Clock,
  User,
  MapPin,
  Phone,
  Mail,
  Star,
  Award,
  GraduationCap,
  TestTube,
  FileText,
  Pill,
  MessageCircle,
  Settings,
  Stethoscope,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

function PatientSidebar() {
  const menuItems = [
    { icon: Stethoscope, label: "Dashboard", href: "/patient/dashboard" },
    { icon: Calendar, label: "Appointments", href: "/patient/appointments" },
    { icon: User, label: "Find Doctors", href: "/patient/doctors", active: true },
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

export default function DoctorProfile() {
  const params = useParams()
  const doctorId = params.id

  // Mock doctor data - in real app, fetch based on doctorId
  const doctor = {
    id: doctorId,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    hospital: "City General Hospital",
    experience: "15 years",
    rating: 4.8,
    reviewCount: 127,
    consultationFee: 150,
    education: [
      "MD - Harvard Medical School (2008)",
      "Residency - Johns Hopkins Hospital (2012)",
      "Fellowship - Mayo Clinic Cardiology (2014)",
    ],
    certifications: [
      "Board Certified Cardiologist",
      "Advanced Cardiac Life Support (ACLS)",
      "Interventional Cardiology Certification",
    ],
    languages: ["English", "Spanish", "French"],
    about:
      "Dr. Sarah Johnson is a highly experienced cardiologist with over 15 years of practice. She specializes in interventional cardiology and has performed over 2,000 cardiac procedures. Dr. Johnson is committed to providing personalized care and staying current with the latest advances in cardiovascular medicine.",
    services: [
      "Cardiac Consultation",
      "Echocardiography",
      "Stress Testing",
      "Cardiac Catheterization",
      "Preventive Cardiology",
    ],
    availability: [
      { day: "Monday", hours: "9:00 AM - 5:00 PM" },
      { day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
      { day: "Wednesday", hours: "9:00 AM - 3:00 PM" },
      { day: "Thursday", hours: "9:00 AM - 5:00 PM" },
      { day: "Friday", hours: "9:00 AM - 3:00 PM" },
    ],
    reviews: [
      {
        id: 1,
        patient: "John D.",
        rating: 5,
        comment: "Excellent doctor! Very thorough and caring. Explained everything clearly.",
        date: "2024-01-10",
      },
      {
        id: 2,
        patient: "Maria S.",
        rating: 5,
        comment: "Dr. Johnson saved my life. Her expertise in cardiology is outstanding.",
        date: "2024-01-08",
      },
      {
        id: 3,
        patient: "Robert K.",
        rating: 4,
        comment: "Professional and knowledgeable. Wait time was reasonable.",
        date: "2024-01-05",
      },
    ],
  }

  return (
    <DashboardLayout title="Doctor Profile" sidebar={<PatientSidebar />}>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Doctor Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" />
                <AvatarFallback className="text-2xl">
                  {doctor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h1 className="text-3xl font-bold">{doctor.name}</h1>
                <p className="text-xl text-gray-600 mb-2">{doctor.specialty}</p>
                <p className="text-gray-600 mb-3">{doctor.hospital}</p>

                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-semibold">{doctor.rating}</span>
                    <span className="text-gray-600">({doctor.reviewCount} reviews)</span>
                  </div>
                  <Badge variant="secondary">{doctor.experience} experience</Badge>
                  <div className="flex items-center space-x-1 text-green-600">
                    <span className="font-semibold">${doctor.consultationFee}</span>
                    <span className="text-sm">consultation fee</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {doctor.languages.map((language) => (
                    <Badge key={language} variant="outline">
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <Button size="lg" asChild>
                  <Link href={`/patient/doctors/${doctor.id}/book`}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About Dr. {doctor.name.split(" ")[1]}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{doctor.about}</p>
              </CardContent>
            </Card>

            {/* Education & Certifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="h-5 w-5" />
                  <span>Education & Certifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Education</h4>
                  <ul className="space-y-1">
                    {doctor.education.map((edu, index) => (
                      <li key={index} className="text-gray-700">
                        • {edu}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Certifications</h4>
                  <ul className="space-y-1">
                    {doctor.certifications.map((cert, index) => (
                      <li key={index} className="text-gray-700">
                        • {cert}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardHeader>
                <CardTitle>Services Offered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {doctor.services.map((service, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-green-600" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Patient Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Patient Reviews</CardTitle>
                <CardDescription>{doctor.reviewCount} reviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {doctor.reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">{review.patient}</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{doctor.hospital}</p>
                    <p className="text-sm text-gray-600">123 Medical Center Dr</p>
                    <p className="text-sm text-gray-600">Downtown, City 12345</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <span>appointments@cityhospital.com</span>
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Availability</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {doctor.availability.map((slot, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="font-medium">{slot.day}</span>
                      <span className="text-gray-600">{slot.hours}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" asChild>
                  <Link href={`/patient/doctors/${doctor.id}/book`}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Link>
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Office
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
