import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { CommandMenuProvider } from "@/components/command-menu-provider"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { getProjects } from "@/app/actions/projects"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const projectList = await getProjects()

  return (
    <CommandMenuProvider>
      <SidebarProvider
        defaultOpen={false}
        className="h-screen overflow-hidden"
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" projects={projectList} />
        <SidebarInset className="overflow-hidden">
          <SiteHeader />
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
            <div className="@container/main flex flex-1 flex-col">
              {children}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </CommandMenuProvider>
  )
}
