"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/components/providers/auth-provider"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import Image from "next/image"
import { Stethoscope, Heart, Activity, Users, ShieldCheck, Eye, EyeOff, Sparkles, Plus } from "lucide-react"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    phone: "",
    specialization: "",
    hospitalId: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const { register, isLoading } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      })
      return
    }

    try {
      await register(formData)
      toast({
        title: "Registration successful",
        description: "Welcome to HMS Tajikistan!",
      })
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const getRoleIcon = (roleValue: string) => {
    switch (roleValue) {
      case "patient":
        return <Users className="h-5 w-5" />
      case "doctor":
        return <Stethoscope className="h-5 w-5" />
      case "admin":
        return <ShieldCheck className="h-5 w-5" />
      case "lab":
        return <Activity className="h-5 w-5" />
      case "pharmacist":
        return <Heart className="h-5 w-5" />
      default:
        return null
    }
  }

  const nextStep = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const canProceed = () => {
    if (currentStep === 1) {
      return formData.name && formData.email && formData.phone && formData.role
    }
    return formData.password && formData.confirmPassword
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Medical Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Plus className="absolute top-20 left-20 h-8 w-8 text-green-300 opacity-30 animate-float" />
        <Sparkles className="absolute top-32 right-32 h-6 w-6 text-blue-300 opacity-30 animate-float animation-delay-1000" />
        <Heart className="absolute bottom-32 left-32 h-7 w-7 text-red-300 opacity-30 animate-float animation-delay-2000" />
        <Activity className="absolute bottom-20 right-20 h-8 w-8 text-teal-300 opacity-30 animate-float animation-delay-3000" />
      </div>

      <Card
        className={`w-full max-w-md relative z-10 shadow-2xl border-0 bg-white/80 backdrop-blur-sm transition-all duration-1000 ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <CardHeader className="space-y-4 pb-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg">
              <Image
                src="/images/hms-logo.png"
                alt="HMS Tajikistan Logo"
                width={60}
                height={60}
                className="object-contain"
              />
            </div>
            <div className="text-center space-y-2">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Join HMS Tajikistan
              </CardTitle>
              <CardDescription className="text-gray-600">Create your account to get started</CardDescription>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center justify-center space-x-2">
            <div
              className={`w-8 h-2 rounded-full transition-all duration-300 ${
                currentStep >= 1 ? "bg-gradient-to-r from-green-500 to-blue-500" : "bg-gray-200"
              }`}
            />
            <div
              className={`w-8 h-2 rounded-full transition-all duration-300 ${
                currentStep >= 2 ? "bg-gradient-to-r from-green-500 to-blue-500" : "bg-gray-200"
              }`}
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    className="h-12 transition-all duration-300 border-gray-200 focus:border-green-500 focus:ring-green-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="h-12 transition-all duration-300 border-gray-200 focus:border-green-500 focus:ring-green-500"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                    className="h-12 transition-all duration-300 border-gray-200 focus:border-green-500 focus:ring-green-500"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm font-medium text-gray-700">
                    Role
                  </Label>
                  <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)} required>
                    <SelectTrigger className="h-12 transition-all duration-300 border-gray-200 focus:border-green-500 focus:ring-green-500">
                      <div className="flex items-center space-x-2">
                        {formData.role && getRoleIcon(formData.role)}
                        <SelectValue placeholder="Select your role" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="patient">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span>Patient</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="doctor">
                        <div className="flex items-center space-x-2">
                          <Stethoscope className="h-4 w-4" />
                          <span>Doctor</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="admin">
                        <div className="flex items-center space-x-2">
                          <ShieldCheck className="h-4 w-4" />
                          <span>Hospital Admin</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="lab">
                        <div className="flex items-center space-x-2">
                          <Activity className="h-4 w-4" />
                          <span>Lab Worker</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="pharmacist">
                        <div className="flex items-center space-x-2">
                          <Heart className="h-4 w-4" />
                          <span>Pharmacist</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.role === "doctor" && (
                  <div className="space-y-2 animate-in slide-in-from-bottom-3 duration-300">
                    <Label htmlFor="specialization" className="text-sm font-medium text-gray-700">
                      Specialization
                    </Label>
                    <Input
                      id="specialization"
                      value={formData.specialization}
                      onChange={(e) => handleInputChange("specialization", e.target.value)}
                      placeholder="e.g., Cardiology, Neurology"
                      className="h-12 transition-all duration-300 border-gray-200 focus:border-green-500 focus:ring-green-500"
                      required
                    />
                  </div>
                )}

                {(formData.role === "doctor" || formData.role === "lab" || formData.role === "pharmacist") && (
                  <div className="space-y-2 animate-in slide-in-from-bottom-3 duration-300">
                    <Label htmlFor="hospitalId" className="text-sm font-medium text-gray-700">
                      Hospital
                    </Label>
                    <Select
                      value={formData.hospitalId}
                      onValueChange={(value) => handleInputChange("hospitalId", value)}
                      required
                    >
                      <SelectTrigger className="h-12 transition-all duration-300 border-gray-200 focus:border-green-500 focus:ring-green-500">
                        <SelectValue placeholder="Select hospital" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">City General Hospital</SelectItem>
                        <SelectItem value="2">Metro Medical Center</SelectItem>
                        <SelectItem value="3">Regional Health Institute</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                      className="h-12 pr-12 transition-all duration-300 border-gray-200 focus:border-green-500 focus:ring-green-500"
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      required
                      className="h-12 pr-12 transition-all duration-300 border-gray-200 focus:border-green-500 focus:ring-green-500"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-900 mb-2">Password Requirements:</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• At least 8 characters long</li>
                    <li>• Include uppercase and lowercase letters</li>
                    <li>• Include at least one number</li>
                  </ul>
                </div>
              </div>
            )}

            <div className="flex space-x-3">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="flex-1 h-12 transition-all duration-300 hover:bg-gray-50 bg-transparent"
                >
                  Previous
                </Button>
              )}

              {currentStep < 2 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="flex-1 h-12 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isLoading || !canProceed()}
                  className="flex-1 h-12 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              )}
            </div>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Already have an account?</span>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center w-full h-12 px-4 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 transform hover:scale-[1.02]"
            >
              Sign In Instead
            </Link>
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
