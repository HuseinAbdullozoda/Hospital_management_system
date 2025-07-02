"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Hospital,  
  Users,
  Stethoscope,
  FlaskConical, 
  Pill,
  FileText,
  Settings,
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  MessageCircle,
  Calendar,
  CreditCard,
  Zap,
  Globe,
  Award,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [animatedStats, setAnimatedStats] = useState({
    hospitals: 0,
    doctors: 0,
    patients: 0,
    appointments: 0,
  })

  const userTypes = [
    {
      title: "Patient Portal",
      description: "Book appointments, chat with doctors, buy medicines, and manage your health records",
      icon: Users,
      href: "/auth/login?role=patient",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      features: ["Online Appointments", "Doctor Chat", "Medicine Orders", "Lab Tests"],
    },
    {
      title: "Doctor Portal",
      description: "Manage appointments, create prescriptions, chat with patients, and access medical records",
      icon: Stethoscope,
      href: "/auth/login?role=doctor",
      color: "bg-gradient-to-br from-green-500 to-green-600",
      features: ["Patient Management", "Digital Prescriptions", "Appointment Scheduling", "Medical Records"],
    },
    {
      title: "Hospital Admin",
      description: "Manage your hospital operations, staff, departments, and patient flow efficiently",
      icon: Hospital,
      href: "/auth/login?role=hospitalAdmin",
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      features: ["Staff Management", "Department Control", "Analytics Dashboard", "Resource Planning"],
    },
    {
      title: "System Admin",
      description: "Oversee platform operations, approve hospitals, and manage system-wide settings",
      icon: Settings,
      href: "/auth/login?role=systemAdmin",
      color: "bg-gradient-to-br from-gray-600 to-gray-700",
      features: ["Hospital Approval", "System Monitoring", "User Management", "Platform Analytics"],
    },
    {
      title: "Lab Worker",
      description: "Process lab tests, generate reports, manage samples, and handle test results",
      icon: FlaskConical,
      href: "/auth/login?role=lab",
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
      features: ["Test Processing", "Report Generation", "Sample Management", "Quality Control"],
    },
    {
      title: "Pharmacist",
      description: "Manage medicine inventory, process prescriptions, and handle online orders",
      icon: Pill,
      href: "/auth/login?role=pharmacist",
      color: "bg-gradient-to-br from-red-500 to-red-600",
      features: ["Inventory Management", "Prescription Processing", "Order Fulfillment", "Drug Information"],
    },
  ]

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Cardiologist",
      content:
        "This platform has revolutionized how I manage my patients. The integrated chat and appointment system saves me hours every day.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "John Smith",
      role: "Patient",
      content:
        "Booking appointments and getting prescriptions has never been easier. The online pharmacy feature is a game-changer!",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Maria Rodriguez",
      role: "Hospital Administrator",
      content: "The analytics and management tools have improved our hospital efficiency by 40%. Highly recommended!",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  const stats = [
    { label: "Hospitals", value: 150, icon: Hospital },
    { label: "Doctors", value: 2500, icon: Stethoscope },
    { label: "Patients", value: 50000, icon: Users },
    { label: "Appointments", value: 100000, icon: Calendar },
  ]

  const features = [
    {
      icon: MessageCircle,
      title: "Real-time Communication",
      description: "Instant messaging between patients and healthcare providers with file sharing capabilities.",
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "AI-powered appointment scheduling that optimizes doctor availability and patient preferences.",
    },
    {
      icon: CreditCard,
      title: "Integrated Payments",
      description: "Secure payment processing for consultations, medicines, and lab tests all in one place.",
    },
    {
      icon: FileText,
      title: "Digital Records",
      description: "Complete electronic health records with PDF generation and secure cloud storage.",
    },
    {
      icon: Zap,
      title: "AI-Powered Insights",
      description: "Machine learning algorithms provide health insights and predictive analytics.",
    },
    {
      icon: Globe,
      title: "Multi-Hospital Network",
      description: "Connect with healthcare providers across multiple hospitals and medical centers.",
    },
  ]

  // Animate stats on component mount
  useEffect(() => {
    const animateStats = () => {
      stats.forEach((stat, index) => {
        let current = 0
        const increment = stat.value / 100
        const timer = setInterval(() => {
          current += increment
          if (current >= stat.value) {
            current = stat.value
            clearInterval(timer)
          }
          setAnimatedStats((prev) => ({
            ...prev,
            [stat.label.toLowerCase()]: Math.floor(current),
          }))
        }, 20)
      })
    }

    const timer = setTimeout(animateStats, 500)
    return () => clearTimeout(timer)
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="relative mr-4">
                <Image
                  src="/images/hms-logo.png"
                  alt="HMS Tajikistan Logo"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  HMS Tajikistan
                </h1>
                <p className="text-sm text-gray-600">Hospital Management System</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" asChild className="hover:scale-105 transition-transform bg-transparent">
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button
                asChild
                className="hover:scale-105 transition-transform bg-gradient-to-r from-green-600 to-blue-600"
              >
                <Link href="/auth/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10 animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="animate-fade-in-up">
            <Badge className="mb-6 bg-green-100 text-green-800 hover:bg-green-200 transition-colors">
              🚀 Now with Smart Healthcare Management System 
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              The Future of
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent block">
                Healthcare Management
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect patients, doctors, hospitals, labs, and pharmacies in one comprehensive AI-powered platform.
              Experience seamless healthcare with real-time communication, smart scheduling, and integrated e-commerce.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all"
              >
                <Play className="h-5 w-5 mr-2" />
                Watch Demo
              </Button>
              <Button size="lg" variant="outline" className="hover:scale-105 transition-transform bg-transparent">
                Learn More
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform">
                <div className="bg-gradient-to-br from-green-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {animatedStats[stat.label.toLowerCase() as keyof typeof animatedStats].toLocaleString()}+
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Type Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Portal</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Access specialized dashboards designed for your role in the healthcare ecosystem
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userTypes.map((type, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm"
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-16 h-16 rounded-2xl ${type.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    <type.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-2">{type.title}</CardTitle>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {type.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {type.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    asChild
                    className="w-full group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-blue-600 transition-all"
                  >
                    <Link href={type.href}>
                      Access Portal
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage healthcare operations efficiently and effectively
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group text-center hover:scale-105 transition-transform">
                <div className="bg-gradient-to-br from-green-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-shadow">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h3>
          <p className="text-xl text-gray-600 mb-12">Trusted by healthcare professionals and patients worldwide</p>

          <div className="relative">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-green-50 to-blue-50">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {testimonials[currentTestimonial].name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</div>
                    <div className="text-gray-600">{testimonials[currentTestimonial].role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center mt-6 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? "bg-green-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-bold mb-4">Ready to Transform Healthcare?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of healthcare professionals using our free, comprehensive platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="hover:scale-105 transition-transform">
              <Award className="h-5 w-5 mr-2" />
              Get Started Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-green-600 hover:scale-105 transition-all bg-transparent"
            >
              <TrendingUp className="h-5 w-5 mr-2" />
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <Image
                  src="/images/hms-logo.png"
                  alt="HMS Tajikistan Logo"
                  width={40}
                  height={40}
                  className="object-contain mr-3"
                />
                <div>
                  <h3 className="text-xl font-bold">HMS Tajikistan</h3>
                  <p className="text-sm text-gray-400">Hospital Management System</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Empowering healthcare through innovative technology and seamless connectivity.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Training
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Status
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Partners
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 HMS Tajikistan. All rights reserved. Transforming healthcare through technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
