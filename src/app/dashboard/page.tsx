import { Button } from "@/components/ui/button"
import { IconExternalLink } from "@tabler/icons-react"

const GITHUB_URL =
  "https://github.com/High-Performance-Structures/compass"

export default function Page() {
  return (
    <div className="flex flex-1 items-start justify-center p-6 md:p-12">
      <div className="w-full max-w-3xl py-8">
        <div className="mb-10 text-center">
          <span
            className="mx-auto mb-3 block size-12 bg-foreground"
            style={{
              maskImage: "url(/logo-black.png)",
              maskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskImage: "url(/logo-black.png)",
              WebkitMaskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
            }}
          />
          <h1 className="text-3xl font-bold tracking-tight">
            Compass
          </h1>
          <p className="text-muted-foreground mt-2">
            Development preview — features may be incomplete
            or change without notice.
          </p>
        </div>

        <div className="space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="mb-3 text-base font-semibold flex items-center gap-2">
              <span className="inline-block size-2 rounded-full bg-green-500" />
              Working
            </h2>
            <ul className="space-y-1.5 pl-4">
              <li>Projects — create and manage projects with D1 database</li>
              <li>Schedule — Gantt chart with phases, tasks, dependencies, and critical path</li>
              <li>File browser — drive-style UI with folder navigation</li>
              <li>Settings — app preferences with theme and notifications</li>
              <li>Sidebar navigation with contextual project/file views</li>
              <li>Command palette search (Cmd+K)</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold flex items-center gap-2">
              <span className="inline-block size-2 rounded-full bg-yellow-500" />
              In Progress
            </h2>
            <ul className="space-y-1.5 pl-4">
              <li>Project auto-provisioning (code generation, CSI folder structure)</li>
              <li>Budget tracking (CSI divisions, estimated vs actual, change orders)</li>
              <li>Document management (S3/R2 storage, metadata, versioning)</li>
              <li>Communication logging (manual entries, timeline view)</li>
              <li>Dashboard — three-column layout (past due, due today, action items)</li>
              <li>User authentication and roles (WorkOS)</li>
              <li>Email notifications (Resend)</li>
              <li>Basic reports (budget variance, overdue tasks, monthly actuals)</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold flex items-center gap-2">
              <span className="inline-block size-2 rounded-full bg-muted-foreground/50" />
              Planned
            </h2>
            <ul className="space-y-1.5 pl-4 text-muted-foreground">
              <li>Client portal with read-only views</li>
              <li>BuilderTrend import wizard (CSV-based)</li>
              <li>Daily logs</li>
              <li>Time tracking</li>
              <li>Report builder (custom fields and filters)</li>
              <li>Bid package management</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold flex items-center gap-2">
              <span className="inline-block size-2 rounded-full bg-muted-foreground/30" />
              Future
            </h2>
            <ul className="space-y-1.5 pl-4 text-muted-foreground">
              <li>Netsuite/QuickBooks API sync</li>
              <li>Payment integration</li>
              <li>RFI/Submittal tracking</li>
              <li>Native mobile apps (iOS/Android)</li>
              <li>Advanced scheduling (resource leveling, baseline comparison)</li>
            </ul>
          </section>
        </div>

        <div className="mt-10 flex justify-center">
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
