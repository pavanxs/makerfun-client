import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <main className="flex-1 overflow-y-auto p-8">
        <div className="container">
          {children}
        </div>
      </main>
  )
}
