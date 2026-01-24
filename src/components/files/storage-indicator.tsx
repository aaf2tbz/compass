"use client"

import { Progress } from "@/components/ui/progress"
import { formatFileSize } from "@/lib/file-utils"
import type { StorageUsage } from "@/lib/files-data"

export function StorageIndicator({ usage }: { usage: StorageUsage }) {
  const percent = Math.round((usage.used / usage.total) * 100)

  return (
    <div className="px-3 py-2">
      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
        <span>Storage</span>
        <span>{percent}% used</span>
      </div>
      <Progress value={percent} className="h-1.5" />
      <p className="text-xs text-muted-foreground mt-1.5">
        {formatFileSize(usage.used)} of {formatFileSize(usage.total)}
      </p>
    </div>
  )
}
