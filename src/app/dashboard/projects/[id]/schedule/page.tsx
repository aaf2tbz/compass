import { getCloudflareContext } from "@opennextjs/cloudflare"
import { getDb } from "@/db"
import { projects } from "@/db/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"
import { getSchedule } from "@/app/actions/schedule"
import { ScheduleView } from "@/components/schedule/schedule-view"

export default async function SchedulePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { env } = await getCloudflareContext()
  const db = getDb(env.DB)

  const [project] = await db
    .select()
    .from(projects)
    .where(eq(projects.id, id))
    .limit(1)

  if (!project) notFound()

  const schedule = await getSchedule(id)

  return (
    <div className="p-6">
      <ScheduleView
        projectId={id}
        projectName={project.name}
        initialData={schedule}
      />
    </div>
  )
}
