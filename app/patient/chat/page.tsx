"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ChatInterface } from "@/components/ui/chat-interface"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Hospital, Calendar, MessageCircle, User, FileText, ShoppingCart, Pill, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

function PatientSidebar() {
  const menuItems = [
    { icon: Hospital, label: "Dashboard", href: "/patient/dashboard" },
    { icon: Calendar, label: "Appointments", href: "/patient/appointments" },
    { icon: MessageCircle, label: "Chat", href: "/patient/chat", active: true },
    { icon: FileText, label: "Prescriptions", href: "/patient/prescriptions" },
    { icon: ShoppingCart, label: "Lab Tests", href: "/patient/lab-tests" },
    { icon: Pill, label: "Pharmacy", href: "/patient/pharmacy" },
    { icon: User, label: "Find Doctors", href: "/patient/doctors" },
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

export default function PatientChatPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>("1")
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data for conversations
  const conversations = [
    {
      id: "1",
      doctorId: "doc1",
      doctorName: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      hospital: "City General Hospital",
      lastMessage: "Please take your medication as prescribed",
      lastMessageTime: new Date("2024-01-15T14:30:00"),
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: "2",
      doctorId: "doc2",
      doctorName: "Dr. Michael Chen",
      specialty: "Dermatology",
      hospital: "Metro Medical Center",
      lastMessage: "Your test results look good",
      lastMessageTime: new Date("2024-01-15T10:15:00"),
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: "3",
      doctorId: "doc3",
      doctorName: "Dr. Emily Davis",
      specialty: "Pediatrics",
      hospital: "Regional Health Institute",
      lastMessage: "How are you feeling today?",
      lastMessageTime: new Date("2024-01-14T16:45:00"),
      unreadCount: 1,
      isOnline: true,
    },
  ]

  // Mock messages for selected conversation
  const messages = [
    {
      id: "1",
      senderId: "doc1",
      senderName: "Dr. Sarah Johnson",
      content: "Hello! How are you feeling after starting the new medication?",
      timestamp: new Date("2024-01-15T14:00:00"),
      type: "text" as const,
    },
    {
      id: "2",
      senderId: "patient1",
      senderName: "John Doe",
      content: "Hi Doctor, I'm feeling much better. The chest pain has reduced significantly.",
      timestamp: new Date("2024-01-15T14:05:00"),
      type: "text" as const,
    },
    {
      id: "3",
      senderId: "doc1",
      senderName: "Dr. Sarah Johnson",
      content: "That's great to hear! Please continue taking the medication as prescribed. Any side effects?",
      timestamp: new Date("2024-01-15T14:10:00"),
      type: "text" as const,
    },
    {
      id: "4",
      senderId: "patient1",
      senderName: "John Doe",
      content: "No side effects so far. Should I continue with the same dosage?",
      timestamp: new Date("2024-01-15T14:25:00"),
      type: "text" as const,
    },
    {
      id: "5",
      senderId: "doc1",
      senderName: "Dr. Sarah Johnson",
      content: "Yes, please continue with the same dosage. Let's schedule a follow-up in 2 weeks.",
      timestamp: new Date("2024-01-15T14:30:00"),
      type: "text" as const,
    },
  ]

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.specialty.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const selectedConversation = conversations.find((conv) => conv.id === selectedChat)

  const handleSendMessage = (content: string, type: "text" | "image" | "file") => {
    // In a real app, this would send the message to the backend
    console.log("Sending message:", { content, type, to: selectedConversation?.doctorId })
  }

  return (
    <DashboardLayout title="Chat with Doctors" sidebar={<PatientSidebar />}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedChat(conversation.id)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 border-b ${
                    selectedChat === conversation.id ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                        <AvatarFallback>{conversation.doctorName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {conversation.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm truncate">{conversation.doctorName}</h4>
                        {conversation.unreadCount > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-600">{conversation.specialty}</p>
                      <p className="text-xs text-gray-500 truncate">{conversation.lastMessage}</p>
                      <p className="text-xs text-gray-400">
                        {conversation.lastMessageTime.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <div className="lg:col-span-2">
          {selectedConversation ? (
            <ChatInterface
              currentUserId="patient1"
              currentUserName="John Doe"
              recipientId={selectedConversation.doctorId}
              recipientName={selectedConversation.doctorName}
              recipientRole={`${selectedConversation.specialty} • ${selectedConversation.hospital}`}
              messages={messages}
              onSendMessage={handleSendMessage}
            />
          ) : (
            <Card className="h-[600px] flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-600">Choose a doctor to start chatting</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
