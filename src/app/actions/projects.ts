"use server"

import { getCloudflareContext } from "@opennextjs/cloudflare"
import { getDb } from "@/db"
import { projects } from "@/db/schema"
import { asc } from "drizzle-orm"

export async function getProjects(): Promise<{ id: string; name: string }[]> {
  try {
    const { env } = await getCloudflareContext()
    if (!env?.DB) return []

    const db = getDb(env.DB)
    const allProjects = await db
      .select({ id: projects.id, name: projects.name })
      .from(projects)
      .orderBy(asc(projects.name))

    return allProjects
  } catch {
    return []
  }
}
