"use client"

import { FilesProvider } from "@/hooks/use-files"

export default function FilesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <FilesProvider>
      {children}
    </FilesProvider>
  )
}
