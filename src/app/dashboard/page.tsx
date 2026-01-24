import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { IconExternalLink } from "@tabler/icons-react"

const GITHUB_URL =
  "https://github.com/High-Performance-Structures/compass"

const working = [
  "Projects — create and manage projects with D1 database",
  "Schedule — Gantt chart with phases, tasks, dependencies, and baselines",
  "File browser — drive-style UI with folder navigation",
  "Sidebar navigation with contextual project/file views",
]

const inProgress = [
  "User authentication and accounts",
  "Settings page",
  "Search functionality",
  "Notifications",
]

const planned = [
  "Role-based permissions",
  "File uploads and storage (R2)",
  "Project activity feed",
  "Mobile-responsive layout improvements",
]

export default function Page() {
  return (
    <div className="flex flex-1 items-start justify-center p-4 md:p-8">
      <div className="flex w-full max-w-2xl flex-col gap-6 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Compass
          </h1>
          <p className="text-muted-foreground mt-2 text-balance">
            Development preview — features may be incomplete
            or change without notice.
          </p>
        </div>

        <div className="grid gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <span className="inline-block size-2 rounded-full bg-green-500" />
                Working
                <Badge variant="secondary" className="font-normal">
                  {working.length}
                </Badge>
              </CardTitle>
              <CardDescription>
                Features that are functional in this preview
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5 text-sm">
                {working.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-0.5">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <span className="inline-block size-2 rounded-full bg-yellow-500" />
                In Progress
                <Badge variant="secondary" className="font-normal">
                  {inProgress.length}
                </Badge>
              </CardTitle>
              <CardDescription>
                Currently being developed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5 text-sm">
                {inProgress.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-0.5">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <span className="inline-block size-2 rounded-full bg-muted-foreground/50" />
                Planned
                <Badge variant="secondary" className="font-normal">
                  {planned.length}
                </Badge>
              </CardTitle>
              <CardDescription>
                On the roadmap but not started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {planned.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center pt-2">
          <Button variant="outline" asChild>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconExternalLink className="mr-2 size-4" />
              View on GitHub
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
