"use client"

import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Calendar, Package, MessageSquare, AlertCircle, CheckCircle, Info, Trash2 } from "lucide-react"

export default function NotificationsPage() {
  const searchParams = useSearchParams()
  const role = searchParams.get('role') || 'researcher'

  const getPageTitle = () => {
    return 'Notifications'
  }

  const getPageDescription = () => {
    switch (role) {
      case 'provider':
        return 'Stay updated on booking requests and equipment status'
      case 'admin':
        return 'System notifications and important platform updates'
      default:
        return 'Keep track of your bookings and important updates'
    }
  }

  // Mock notifications data
  const notifications = [
    {
      id: 'n1',
      type: 'booking',
      title: 'Booking Request Received',
      message: 'Dr. Sarah Johnson has requested to book your High-Resolution Microscope for January 20th.',
      timestamp: '2024-01-15 10:30 AM',
      read: false,
      priority: 'high',
      actionRequired: true,
      relatedId: 'bk1'
    },
    {
      id: 'n2',
      type: 'booking',
      title: 'Booking Confirmed',
      message: 'Your booking for Centrifuge X200 has been confirmed for January 18th.',
      timestamp: '2024-01-14 2:15 PM',
      read: false,
      priority: 'medium',
      actionRequired: false,
      relatedId: 'bk2'
    },
    {
      id: 'n3',
      type: 'equipment',
      title: 'Equipment Maintenance Scheduled',
      message: 'Maintenance for Spectrophotometer is scheduled for January 25th. Equipment will be unavailable.',
      timestamp: '2024-01-13 9:00 AM',
      read: true,
      priority: 'medium',
      actionRequired: false,
      relatedId: 'eq3'
    },
    {
      id: 'n4',
      type: 'message',
      title: 'New Message',
      message: 'You have a new message regarding your upcoming booking.',
      timestamp: '2024-01-12 4:45 PM',
      read: true,
      priority: 'low',
      actionRequired: false,
      relatedId: 'bk1'
    },
    {
      id: 'n5',
      type: 'system',
      title: 'Platform Update',
      message: 'New features have been added to improve your booking experience.',
      timestamp: '2024-01-10 11:00 AM',
      read: true,
      priority: 'low',
      actionRequired: false,
      relatedId: null
    },
    {
      id: 'n6',
      type: 'booking',
      title: 'Booking Reminder',
      message: 'Your booking for High-Resolution Microscope is tomorrow at 9:00 AM.',
      timestamp: '2024-01-09 6:00 PM',
      read: true,
      priority: 'medium',
      actionRequired: false,
      relatedId: 'bk1'
    }
  ]

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <Calendar className="h-5 w-5" />
      case 'equipment':
        return <Package className="h-5 w-5" />
      case 'message':
        return <MessageSquare className="h-5 w-5" />
      case 'system':
        return <Info className="h-5 w-5" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case 'medium':
        return <Info className="h-4 w-4 text-yellow-500" />
      default:
        return <CheckCircle className="h-4 w-4 text-blue-500" />
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>
      case 'medium':
        return <Badge variant="secondary">Medium</Badge>
      default:
        return <Badge variant="outline">Low</Badge>
    }
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{getPageTitle()}</h1>
          <p className="text-muted-foreground">{getPageDescription()}</p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Badge variant="destructive">{unreadCount} unread</Badge>
          )}
          <Button variant="outline" size="sm">
            Mark All as Read
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="booking">Booking</SelectItem>
            <SelectItem value="equipment">Equipment</SelectItem>
            <SelectItem value="message">Messages</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
            <SelectItem value="read">Read</SelectItem>
            <SelectItem value="action-required">Action Required</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notification) => (
          <Card 
            key={notification.id} 
            className={`transition-all hover:shadow-md ${
              !notification.read ? 'border-l-4 border-l-primary bg-muted/20' : ''
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    notification.type === 'booking' ? 'bg-blue-100 text-blue-600' :
                    notification.type === 'equipment' ? 'bg-green-100 text-green-600' :
                    notification.type === 'message' ? 'bg-purple-100 text-purple-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg truncate">{notification.title}</CardTitle>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      )}
                    </div>
                    <CardDescription className="mt-1">
                      {notification.message}
                    </CardDescription>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      {getPriorityIcon(notification.priority)}
                      <span>{notification.timestamp}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {getPriorityBadge(notification.priority)}
                  {notification.actionRequired && (
                    <Badge variant="default">Action Required</Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-2">
                {notification.actionRequired && (
                  <Button size="sm">
                    Take Action
                  </Button>
                )}
                {notification.relatedId && (
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                )}
                <Button variant="ghost" size="sm">
                  {notification.read ? 'Mark as Unread' : 'Mark as Read'}
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {notifications.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No notifications</h3>
            <p className="text-muted-foreground">
              You're all caught up! We'll notify you when something important happens.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>
            Manage how you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Email Notifications</h4>
              <div className="space-y-2 text-sm">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked />
                  <span>Booking confirmations</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked />
                  <span>Equipment updates</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" />
                  <span>Marketing updates</span>
                </label>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Push Notifications</h4>
              <div className="space-y-2 text-sm">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked />
                  <span>Real-time messages</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked />
                  <span>Booking reminders</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" />
                  <span>System updates</span>
                </label>
              </div>
            </div>
          </div>
          <Button>Save Settings</Button>
        </CardContent>
      </Card>
    </div>
  )
}
