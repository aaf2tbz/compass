"use client"

import { Toaster } from "sonner"
import { FilesProvider } from "@/hooks/use-files"

export default function FilesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <FilesProvider>
      {children}
      <Toaster position="bottom-right" />
    </FilesProvider>
  )
}
