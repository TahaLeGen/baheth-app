"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Package,
  Calendar,
  Users,
  Bell,
  MessageSquare,
  UserCheck,
  Shield,
  Tag,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { AppLogo } from "@/components/app-logo"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  role?: string
}

const getNavigationForRole = (role: string) => {
  switch (role) {
    case 'provider':
      return [
        {
          title: "My Equipment",
          url: "/dashboard/equipments",
          icon: Package,
          isActive: false,
          items: [
            {
              title: "View All",
              url: "/dashboard/equipments",
            },
            {
              title: "Add New",
              url: "/dashboard/equipments/new",
            },
          ]
        },
        {
          title: "Categories",
          url: "/dashboard/categories",
          icon: Tag,
          items: [
            {
              title: "View All",
              url: "/dashboard/categories",
            },
            {
              title: "Add New",
              url: "/dashboard/categories/new",
            },
          ]
        },
        {
          title: "Bookings",
          url: "/dashboard/bookings",
          icon: Calendar,
          items: []
        },
        {
          title: "Notifications",
          url: "/dashboard/notifications",
          icon: Bell,
          items: []
        }
      ]
    
    case 'admin':
      return [
        {
          title: "All Equipment",
          url: "/dashboard/equipments",
          icon: Package,
          items: [
            {
              title: "View All",
              url: "/dashboard/equipments",
            },
            {
              title: "Add New",
              url: "/dashboard/equipments/new",
            },
          ]
        },
        {
          title: "Categories",
          url: "/dashboard/categories",
          icon: Tag,
          items: [
            {
              title: "View All",
              url: "/dashboard/categories",
            },
            {
              title: "Add New",
              url: "/dashboard/categories/new",
            },
          ]
        },
        {
          title: "Providers",
          url: "/dashboard/providers",
          icon: Users,
          items: []
        },
        {
          title: "Researchers",
          url: "/dashboard/researchers",
          icon: UserCheck,
          items: []
        },
        {
          title: "Bookings",
          url: "/dashboard/bookings",
          icon: Calendar,
          items: []
        },
        {
          title: "System",
          url: "#",
          icon: Shield,
          items: [
            {
              title: "Analytics",
              url: "#",
            },
            {
              title: "Reports",
              url: "#",
            },
            {
              title: "System Settings",
              url: "#",
            },
          ],
        },
      ]
    
    default: // researcher
      return [
        {
          title: "Browse Equipment",
          url: "/dashboard/equipments",
          icon: Package,
          items: [
            {
              title: "All Equipment",
              url: "/dashboard/equipments",
            },
            {
              title: "By Category",
              url: "#",
            },
            {
              title: "Favorites",
              url: "#",
            },
          ]
        },
        {
          title: "Providers",
          url: "/dashboard/providers",
          icon: Users,
          items: []
        },
        {
          title: "My Bookings",
          url: "/dashboard/bookings",
          icon: Calendar,
          items: []
        },
        {
          title: "Notifications",
          url: "/dashboard/notifications",
          icon: Bell,
          items: []
        },
        {
          title: "Settings",
          url: "#",
          icon: Settings2,
          items: [
            {
              title: "Profile",
              url: "#",
            },
            {
              title: "Preferences",
              url: "#",
            },
            {
              title: "Notifications",
              url: "#",
            },
          ],
        },
      ]
  }
}

export function AppSidebar({ role = 'researcher', ...props }: AppSidebarProps) {
  const navigationItems = getNavigationForRole(role)
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AppLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navigationItems} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
