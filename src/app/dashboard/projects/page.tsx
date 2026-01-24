import Link from "next/link"
import { getCloudflareContext } from "@opennextjs/cloudflare"
import { getDb } from "@/db"
import { projects } from "@/db/schema"
import { IconCalendarStats, IconFolder } from "@tabler/icons-react"

export default async function ProjectsPage() {
  const { env } = await getCloudflareContext()
  const db = getDb(env.DB)
  const allProjects = await db.select().from(projects)

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Projects</h1>
      </div>

      {allProjects.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <IconFolder className="mx-auto mb-4 size-12 opacity-50" />
          <p>No projects yet.</p>
          <p className="text-sm mt-1">
            Create a D1 database and seed a demo project to get started.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {allProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-lg border p-4"
            >
              <div className="flex items-center gap-3 mb-3">
                <IconFolder className="size-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{project.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Created{" "}
                    {new Date(project.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Link
                href={`/dashboard/projects/${project.id}/schedule`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <IconCalendarStats className="size-4" />
                Schedule
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
