"use client"

import { Suspense } from "react"
import { useParams } from "next/navigation"
import { FileBrowser } from "@/components/files/file-browser"

export default function FilesPathPage() {
  const params = useParams()
  const path = (params.path as string[]) ?? []
  const decodedPath = path.map(decodeURIComponent)

  return (
    <Suspense>
      <FileBrowser path={decodedPath} />
    </Suspense>
  )
}
