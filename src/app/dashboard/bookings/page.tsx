"use client"

import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Calendar, Search, MessageSquare, Clock, User } from "lucide-react"

export default function BookingsPage() {
  const searchParams = useSearchParams()
  const role = searchParams.get('role') || 'researcher'
  const id = searchParams.get('id')
  const action = searchParams.get('action')

  // If viewing chat for a booking
  if (id && action === 'chat') {
    return <BookingChatView role={role} bookingId={id} />
  }

  // If viewing a single booking
  if (id) {
    return <SingleBookingView role={role} bookingId={id} />
  }

  const getPageTitle = () => {
    switch (role) {
      case 'provider':
        return 'My Bookings'
      case 'admin':
        return 'All Bookings'
      default:
        return 'My Bookings'
    }
  }

  const getPageDescription = () => {
    switch (role) {
      case 'provider':
        return 'Manage booking requests for your equipment'
      case 'admin':
        return 'Monitor all bookings across the platform'
      default:
        return 'Track and manage your equipment bookings'
    }
  }

  // Mock bookings data
  const bookings = [
    {
      id: 'bk1',
      equipment: 'High-Resolution Microscope',
      requester: 'Dr. Sarah Johnson',
      provider: 'TechLab University',
      date: '2024-01-15',
      time: '09:00 - 12:00',
      status: 'Confirmed',
      price: '$450',
      duration: '3 hours'
    },
    {
      id: 'bk2',
      equipment: 'Centrifuge X200',
      requester: 'Prof. Mike Chen',
      provider: 'Research Institute',
      date: '2024-01-18',
      time: '14:00 - 16:00',
      status: 'Pending',
      price: '$150',
      duration: '2 hours'
    },
    {
      id: 'bk3',
      equipment: 'Spectrophotometer',
      requester: 'Dr. Lisa Wang',
      provider: 'Science Center',
      date: '2024-01-20',
      time: '10:00 - 11:00',
      status: 'Completed',
      price: '$100',
      duration: '1 hour'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{getPageTitle()}</h1>
          <p className="text-muted-foreground">{getPageDescription()}</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bookings..."
            className="pl-9"
          />
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {bookings.map((booking) => (
          <Card key={booking.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <CardTitle className="text-lg">{booking.equipment}</CardTitle>
                    <CardDescription>
                      {role === 'provider' ? `Requested by ${booking.requester}` : 
                       role === 'admin' ? `${booking.requester} → ${booking.provider}` :
                       `Provider: ${booking.provider}`}
                    </CardDescription>
                  </div>
                </div>
                <Badge 
                  variant={
                    booking.status === 'Confirmed' ? 'default' :
                    booking.status === 'Pending' ? 'secondary' :
                    booking.status === 'Completed' ? 'outline' : 'destructive'
                  }
                >
                  {booking.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Date:</span>
                  <div className="font-medium">{booking.date}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Time:</span>
                  <div className="font-medium">{booking.time}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Duration:</span>
                  <div className="font-medium">{booking.duration}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Price:</span>
                  <div className="font-medium">{booking.price}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/manage?role=${role}&path=bookings&id=${booking.id}`}>
                    View Details
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/manage?role=${role}&path=bookings&id=${booking.id}&action=chat`}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Chat
                  </Link>
                </Button>
                {role === 'provider' && booking.status === 'Pending' && (
                  <>
                    <Button size="sm">Accept</Button>
                    <Button variant="destructive" size="sm">Decline</Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function SingleBookingView({ role, bookingId }: { role: string, bookingId: string }) {
  // Mock booking details
  const booking = {
    id: bookingId,
    equipment: 'High-Resolution Microscope',
    requester: 'Dr. Sarah Johnson',
    requesterEmail: 'sarah.johnson@university.edu',
    provider: 'TechLab University',
    providerEmail: 'equipment@techlab.edu',
    date: '2024-01-15',
    time: '09:00 - 12:00',
    status: 'Confirmed',
    price: '$450',
    duration: '3 hours',
    location: 'Building A, Room 205',
    purpose: 'Analyzing cellular structures for cancer research project',
    specialRequirements: 'Need high magnification for detailed analysis',
    createdAt: '2024-01-10',
    notes: 'Please prepare the sample preparation area as well.'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Booking #{booking.id}</h1>
          <p className="text-muted-foreground">{booking.equipment}</p>
        </div>
        <Badge 
          variant={booking.status === 'Confirmed' ? 'default' : 'secondary'}
          className="text-sm"
        >
          {booking.status}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Booking Details */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold">Date</h4>
                <p className="text-muted-foreground">{booking.date}</p>
              </div>
              <div>
                <h4 className="font-semibold">Time</h4>
                <p className="text-muted-foreground">{booking.time}</p>
              </div>
              <div>
                <h4 className="font-semibold">Duration</h4>
                <p className="text-muted-foreground">{booking.duration}</p>
              </div>
              <div>
                <h4 className="font-semibold">Price</h4>
                <p className="text-muted-foreground">{booking.price}</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold">Location</h4>
              <p className="text-muted-foreground">{booking.location}</p>
            </div>
            <div>
              <h4 className="font-semibold">Created</h4>
              <p className="text-muted-foreground">{booking.createdAt}</p>
            </div>
          </CardContent>
        </Card>

        {/* People Involved */}
        <Card>
          <CardHeader>
            <CardTitle>People Involved</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold">Requester</h4>
              <p className="text-muted-foreground">{booking.requester}</p>
              <p className="text-sm text-muted-foreground">{booking.requesterEmail}</p>
            </div>
            <div>
              <h4 className="font-semibold">Provider</h4>
              <p className="text-muted-foreground">{booking.provider}</p>
              <p className="text-sm text-muted-foreground">{booking.providerEmail}</p>
            </div>
          </CardContent>
        </Card>

        {/* Purpose & Requirements */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Purpose & Requirements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold">Research Purpose</h4>
              <p className="text-muted-foreground">{booking.purpose}</p>
            </div>
            <div>
              <h4 className="font-semibold">Special Requirements</h4>
              <p className="text-muted-foreground">{booking.specialRequirements}</p>
            </div>
            <div>
              <h4 className="font-semibold">Additional Notes</h4>
              <p className="text-muted-foreground">{booking.notes}</p>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <Button asChild variant="outline">
                <Link href={`/manage?role=${role}&path=bookings&id=${booking.id}&action=chat`}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Open Chat
                </Link>
              </Button>
              {role === 'provider' && booking.status === 'Pending' && (
                <>
                  <Button>Accept Booking</Button>
                  <Button variant="destructive">Decline Booking</Button>
                </>
              )}
              {role === 'researcher' && booking.status === 'Pending' && (
                <Button variant="outline">Cancel Booking</Button>
              )}
              {role === 'admin' && (
                <>
                  <Button variant="outline">Edit Booking</Button>
                  <Button variant="outline">Contact Parties</Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function BookingChatView({ role, bookingId }: { role: string, bookingId: string }) {
  // Mock chat messages
  const messages = [
    {
      id: 1,
      sender: 'Dr. Sarah Johnson',
      role: 'researcher',
      message: 'Hi, I have a question about the sample preparation area.',
      timestamp: '2024-01-12 10:30 AM'
    },
    {
      id: 2,
      sender: 'TechLab Equipment Team',
      role: 'provider',
      message: 'Hello! We can prepare the area for you. What specific setup do you need?',
      timestamp: '2024-01-12 11:15 AM'
    },
    {
      id: 3,
      sender: 'Dr. Sarah Johnson',
      role: 'researcher',
      message: 'I need sterile conditions for cell culture work. Also, do you have the appropriate staining solutions?',
      timestamp: '2024-01-12 11:20 AM'
    },
    {
      id: 4,
      sender: 'TechLab Equipment Team',
      role: 'provider',
      message: 'Yes, we have a sterile hood available and all standard staining solutions. We\'ll have everything ready for your session.',
      timestamp: '2024-01-12 11:25 AM'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Chat - Booking #{bookingId}</h1>
          <p className="text-muted-foreground">High-Resolution Microscope Session</p>
        </div>
        <Button asChild variant="outline">
          <Link href={`/manage?role=${role}&path=bookings&id=${bookingId}`}>
            Back to Booking
          </Link>
        </Button>
      </div>

      <Card className="h-[600px] flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Conversation
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === role ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.role === role
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <User className="h-3 w-3" />
                    <span className="text-xs font-medium">{message.sender}</span>
                    <span className="text-xs opacity-70">{message.timestamp}</span>
                  </div>
                  <p className="text-sm">{message.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button>Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
