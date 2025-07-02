"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  email: string
  name: string
  role: "patient" | "doctor" | "hospitalAdmin" | "systemAdmin" | "lab" | "pharmacist"
  hospitalId?: string
  profile?: any
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: string) => Promise<void>
  logout: () => void
  register: (userData: any) => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      const mockUser: User = {
        id: "1",
        email,
        name: "John Doe",
        role: role as User["role"],
        hospitalId:
          role === "hospitalAdmin" || role === "doctor" || role === "lab" || role === "pharmacist" ? "1" : undefined,
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))

      // Redirect based on role
      const redirectPaths = {
        patient: "/patient/dashboard",
        doctor: "/doctor/dashboard",
        hospitalAdmin: "/hospital-admin/dashboard",
        systemAdmin: "/system-admin/dashboard",
        lab: "/lab/dashboard",
        pharmacist: "/pharmacist/dashboard",
      }

      router.push(redirectPaths[role as keyof typeof redirectPaths])
    } catch (error) {
      throw new Error("Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: any) => {
    setIsLoading(true)
    try {
      // Simulate API call
      const mockUser: User = {
        id: "1",
        email: userData.email,
        name: userData.name,
        role: userData.role,
        hospitalId: userData.role === "admin" ? "1" : undefined,
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))

      // Redirect based on role
      const redirectPaths = {
        patient: "/patient/dashboard",
        doctor: "/doctor/dashboard",
        admin: "/admin/dashboard",
        lab: "/lab/dashboard",
        pharmacist: "/pharmacist/dashboard",
      }

      router.push(redirectPaths[userData.role as keyof typeof redirectPaths])
    } catch (error) {
      throw new Error("Registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
