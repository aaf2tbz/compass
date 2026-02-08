"use server"

import { getDb } from "@/lib/db-universal"
import { projects } from "@/db/schema"
import { asc } from "drizzle-orm"

export async function getProjects(): Promise<{ id: string; name: string }[]> {
  try {
    const db = await getDb()
    const allProjects = await db
      .select({ id: projects.id, name: projects.name })
      .from(projects)
      .orderBy(asc(projects.name))

    return allProjects
  } catch {
    return []
  }
}
