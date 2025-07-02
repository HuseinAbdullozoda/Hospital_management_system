"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/components/providers/auth-provider"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import Image from "next/image"
import { Stethoscope, Heart, Activity, Users, ShieldCheck, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const { login, isLoading } = useAuth()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const defaultRole = searchParams.get("role") || ""

  useEffect(() => {
    setIsLoaded(true)
    if (defaultRole) {
      setRole(defaultRole)
    }
  }, [defaultRole])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password, role)
      toast({
        title: "Login successful",
        description: "Welcome back!",
      })
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      })
    }
  }

  const getRoleIcon = (roleValue: string) => {
    switch (roleValue) {
      case "patient":
        return <Users className="h-5 w-5" />
      case "doctor":
        return <Stethoscope className="h-5 w-5" />
      case "hospitalAdmin":
        return <ShieldCheck className="h-5 w-5" />
      case "systemAdmin":
        return <Activity className="h-5 w-5" />
      case "lab":
        return <Activity className="h-5 w-5" />
      case "pharmacist":
        return <Heart className="h-5 w-5" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Medical Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Stethoscope className="absolute top-20 left-20 h-8 w-8 text-blue-300 opacity-30 animate-float" />
        <Heart className="absolute top-32 right-32 h-6 w-6 text-red-300 opacity-30 animate-float animation-delay-1000" />
        <Activity className="absolute bottom-32 left-32 h-7 w-7 text-green-300 opacity-30 animate-float animation-delay-2000" />
        <Users className="absolute bottom-20 right-20 h-8 w-8 text-teal-300 opacity-30 animate-float animation-delay-3000" />
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
                Welcome Back
              </CardTitle>
              <CardDescription className="text-gray-600">Sign in to HMS Tajikistan</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <div className="relative group">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 pl-4 pr-4 transition-all duration-300 border-gray-200 focus:border-green-500 focus:ring-green-500 group-hover:border-gray-300"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative group">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 pl-4 pr-12 transition-all duration-300 border-gray-200 focus:border-green-500 focus:ring-green-500 group-hover:border-gray-300"
                  placeholder="Enter your password"
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
              <Label htmlFor="role" className="text-sm font-medium text-gray-700">
                Role
              </Label>
              <Select value={role} onValueChange={setRole} required>
                <SelectTrigger className="h-12 transition-all duration-300 border-gray-200 focus:border-green-500 focus:ring-green-500 hover:border-gray-300">
                  <div className="flex items-center space-x-2">
                    {role && getRoleIcon(role)}
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
                  <SelectItem value="hospitalAdmin">
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="h-4 w-4" />
                      <span>Hospital Admin</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="systemAdmin">
                    <div className="flex items-center space-x-2">
                      <Activity className="h-4 w-4" />
                      <span>System Admin</span>
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

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">New to HMS Tajikistan?</span>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center w-full h-12 px-4 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 transform hover:scale-[1.02]"
            >
              Create Account
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
