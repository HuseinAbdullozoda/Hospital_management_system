"use client"

import type React from "react"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Users,
  FileText,
  MessageCircle,
  Settings,
  Stethoscope,
  Search,
  Send,
  Paperclip,
  Phone,
  Video,
  User,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

function DoctorSidebar() {
  const menuItems = [
    { icon: Stethoscope, label: "Dashboard", href: "/doctor/dashboard" },
    { icon: Calendar, label: "Appointments", href: "/doctor/appointments" },
    { icon: Users, label: "Patients", href: "/doctor/patients" },
    { icon: FileText, label: "Prescriptions", href: "/doctor/prescriptions" },
    { icon: MessageCircle, label: "Chat", href: "/doctor/chat", active: true },
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

export default function DoctorChat() {
  const [selectedChat, setSelectedChat] = useState<string | null>("P001")
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const conversations = [
    {
      id: "P001",
      patientName: "John Smith",
      patientId: "P001",
      lastMessage: "Thank you for the prescription, Doctor.",
      timestamp: "2 min ago",
      unread: 2,
      status: "online",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "P002",
      patientName: "Sarah Wilson",
      patientId: "P002",
      lastMessage: "When should I schedule my next appointment?",
      timestamp: "1 hour ago",
      unread: 0,
      status: "offline",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "P003",
      patientName: "Michael Brown",
      patientId: "P003",
      lastMessage: "The medication is working well, no side effects.",
      timestamp: "3 hours ago",
      unread: 1,
      status: "online",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "P004",
      patientName: "Emily Davis",
      patientId: "P004",
      lastMessage: "I have some questions about my test results.",
      timestamp: "1 day ago",
      unread: 0,
      status: "offline",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const messages = {
    P001: [
      {
        id: 1,
        senderId: "P001",
        senderName: "John Smith",
        content: "Hello Doctor, I wanted to ask about my blood pressure medication.",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        type: "text" as const,
      },
      {
        id: 2,
        senderId: "doctor",
        senderName: "Dr. Sarah Johnson",
        content: "Hello John! I'd be happy to help. What specific questions do you have about your medication?",
        timestamp: new Date(Date.now() - 25 * 60 * 1000),
        type: "text" as const,
      },
      {
        id: 3,
        senderId: "P001",
        senderName: "John Smith",
        content: "I've been taking it for a week now, and I'm wondering if the dizziness is normal?",
        timestamp: new Date(Date.now() - 20 * 60 * 1000),
        type: "text" as const,
      },
      {
        id: 4,
        senderId: "doctor",
        senderName: "Dr. Sarah Johnson",
        content:
          "Mild dizziness can be a common side effect when starting blood pressure medication. It usually improves as your body adjusts. However, if it's severe or persistent, we should discuss adjusting your dosage.",
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        type: "text" as const,
      },
      {
        id: 5,
        senderId: "P001",
        senderName: "John Smith",
        content: "Thank you for the prescription, Doctor.",
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        type: "text" as const,
      },
    ],
    P002: [
      {
        id: 1,
        senderId: "P002",
        senderName: "Sarah Wilson",
        content: "When should I schedule my next appointment?",
        timestamp: new Date(Date.now() - 60 * 60 * 1000),
        type: "text" as const,
      },
    ],
    P003: [
      {
        id: 1,
        senderId: "P003",
        senderName: "Michael Brown",
        content: "The medication is working well, no side effects.",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        type: "text" as const,
      },
    ],
    P004: [
      {
        id: 1,
        senderId: "P004",
        senderName: "Emily Davis",
        content: "I have some questions about my test results.",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        type: "text" as const,
      },
    ],
  }

  const filteredConversations = conversations.filter((conv) =>
    conv.patientName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const selectedConversation = conversations.find((conv) => conv.id === selectedChat)
  const currentMessages = selectedChat ? messages[selectedChat as keyof typeof messages] || [] : []

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      // In a real app, this would send the message to the backend
      console.log("Sending message:", newMessage, "to patient:", selectedChat)
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <DashboardLayout title="Patient Chat" sidebar={<DoctorSidebar />}>
      <div className="h-[calc(100vh-200px)] flex">
        {/* Chat List */}
        <div className="w-1/3 border-r bg-white">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="overflow-y-auto h-full">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                  selectedChat === conversation.id ? "bg-blue-50 border-blue-200" : ""
                }`}
                onClick={() => setSelectedChat(conversation.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {conversation.patientName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                        conversation.status === "online" ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm truncate">{conversation.patientName}</h3>
                      <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                    <p className="text-xs text-gray-500">ID: {conversation.patientId}</p>
                  </div>
                  {conversation.unread > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {conversation.unread}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={selectedConversation.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {selectedConversation.patientName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{selectedConversation.patientName}</h3>
                      <p className="text-sm text-gray-600">Patient ID: {selectedConversation.patientId}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Video className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {currentMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === "doctor" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.senderId === "doctor" ? "bg-blue-500 text-white" : "bg-white text-gray-900 border"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${message.senderId === "doctor" ? "text-blue-100" : "text-gray-500"}`}
                      >
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t bg-white">
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-600">Choose a patient from the list to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
