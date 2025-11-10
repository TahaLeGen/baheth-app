"use client"

import { useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect } from "react"

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const role = searchParams.get('role') || 'researcher'
  const path = searchParams.get('path')

  // If there's a path, don't render this page (it will be handled by layout)
  if (path) {
    return null
  }

  const getWelcomeMessage = () => {
    switch (role) {
      case 'provider':
        return {
          title: 'Provider Dashboard',
          description: 'Manage your equipment, bookings, and interact with researchers.',
          color: 'bg-blue-500'
        }
      case 'admin':
        return {
          title: 'Admin Dashboard',
          description: 'Oversee the entire platform, manage users, equipment, and bookings.',
          color: 'bg-red-500'
        }
      default:
        return {
          title: 'Researcher Dashboard',
          description: 'Find equipment, book sessions, and manage your research activities.',
          color: 'bg-green-500'
        }
    }
  }

  const getQuickActions = () => {
    const base = `/dashboard?role=${role}`
    
    switch (role) {
      case 'provider':
        return [
          { title: 'My Equipment', href: `${base}&path=equipments`, description: 'Manage your equipment inventory' },
          { title: 'Bookings', href: `${base}&path=bookings`, description: 'View and manage booking requests' },
          { title: 'Notifications', href: `${base}&path=notifications`, description: 'Check important updates' },
        ]
      case 'admin':
        return [
          { title: 'All Providers', href: `${base}&path=providers`, description: 'Manage equipment providers' },
          { title: 'All Researchers', href: `${base}&path=researchers`, description: 'Manage researchers' },
          { title: 'All Equipment', href: `${base}&path=equipments`, description: 'Oversee all equipment' },
          { title: 'All Bookings', href: `${base}&path=bookings`, description: 'Monitor all bookings' },
        ]
      default:
        return [
          { title: 'Browse Equipment', href: `${base}&path=equipments`, description: 'Find research equipment' },
          { title: 'Find Providers', href: `${base}&path=providers`, description: 'Connect with equipment providers' },
          { title: 'My Bookings', href: `${base}&path=bookings`, description: 'Manage your bookings' },
          { title: 'Notifications', href: `${base}&path=notifications`, description: 'Check important updates' },
        ]
    }
  }

  const welcomeData = getWelcomeMessage()
  const quickActions = getQuickActions()

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{welcomeData.title}</h1>
          <p className="text-muted-foreground">{welcomeData.description}</p>
        </div>
        <Badge className={`${welcomeData.color} text-white`}>
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </Badge>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {quickActions.map((action, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{action.title}</CardTitle>
              <CardDescription className="text-sm">{action.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href={action.href}>
                  Access
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats/Overview Section */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Equipment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">54</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">3 unread</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
