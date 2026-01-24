"use client"

import { formatFileSize } from "@/lib/file-utils"
import type { StorageUsage } from "@/lib/files-data"

export function StorageIndicator({ usage }: { usage: StorageUsage }) {
  const percent = Math.round((usage.used / usage.total) * 100)

  return (
    <div className="space-y-2">
      <div className="bg-sidebar-foreground/20 h-1.5 w-full overflow-hidden rounded-full">
        <div
          className="bg-sidebar-primary h-full rounded-full transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-sidebar-foreground/70 text-xs">
        {formatFileSize(usage.used)} of {formatFileSize(usage.total)} used
      </p>
    </div>
  )
}
