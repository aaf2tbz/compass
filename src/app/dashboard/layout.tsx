import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { CommandMenuProvider } from "@/components/command-menu-provider"
import { SettingsProvider } from "@/components/settings-provider"
import { FeedbackWidget } from "@/components/feedback-widget"
import { Toaster } from "@/components/ui/sonner"
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
    <SettingsProvider>
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
        <FeedbackWidget>
          <SidebarInset className="overflow-hidden">
            <SiteHeader />
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
              <div className="@container/main flex flex-1 flex-col">
                {children}
              </div>
            </div>
          </SidebarInset>
        </FeedbackWidget>
        <p className="pointer-events-none fixed bottom-3 left-0 right-0 text-center text-xs text-muted-foreground/60">
          Pre-alpha build
        </p>
        <Toaster position="bottom-right" />
      </SidebarProvider>
    </CommandMenuProvider>
    </SettingsProvider>
  )
}
