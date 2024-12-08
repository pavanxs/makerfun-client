"use client"

import * as React from "react"
import {
  Bot,
  Coins,
  Users,
  Activity,
  MessageSquare,
  Twitter,
  BookOpen,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Paaavam",
    email: "Paavam@CryptoDAO.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "CryptoDAO",
      logo: Coins,
      plan: "Pro Plan",
    },
    {
      name: "NFT Community",
      logo: Users,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Activity,
      isActive: true,
      items: [
        {
          title: "Token Analytics",
          url: "/dashboard/analytics",
        },
        {
          title: "Distribution Metrics",
          url: "/dashboard/performance",
        },
      ],
    },
    {
      title: "AI Agents",
      url: "/ai-agents",
      icon: Bot,
      items: [
        {
          title: "Configure Agents",
          url: "/ai-agents/configure",
        },
        {
          title: "Distribution Rules",
          url: "/ai-agents/rules",
        },
      ],
    },
    {
      title: "Community",
      url: "/community",
      icon: Users,
      items: [
        {
          title: "Contributors",
          url: "/community/contributors",
        },
        {
          title: "Reward History",
          url: "/community/rewards",
        },
      ],
    },
    {
      title: "Token Management",
      url: "/token",
      icon: Coins,
      items: [
        {
          title: "Distribution Settings",
          url: "/token/distribution",
        },
        {
          title: "Token Analytics",
          url: "/token/analytics",
        },
      ],
    },
    {
      title: "Documentation",
      icon: BookOpen,
      href: "/documentation",
      items: [
        {
          title: "Getting Started",
          href: "/documentation/getting-started",
        },

        {
          title: "Guides",
          href: "/documentation/guides",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Content Rewards",
      url: "/projects/content-rewards",
      icon: MessageSquare,
    },
    {
      name: "Developer Rewards",
      url: "/projects/dev-rewards",
      icon: Twitter,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
