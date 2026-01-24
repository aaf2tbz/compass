"use client"

import { useState, useEffect } from "react"
import { IconUpload } from "@tabler/icons-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"

export function FileUploadDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (!open) {
      setProgress(0)
      setUploading(false)
      return
    }

    setUploading(true)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            onOpenChange(false)
            toast.success("File uploaded successfully")
          }, 300)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    return () => clearInterval(interval)
  }, [open, onOpenChange])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IconUpload size={18} />
            Uploading file
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">example-file.pdf</span>
            <span className="text-muted-foreground">
              {Math.min(100, Math.round(progress))}%
            </span>
          </div>
          <Progress value={Math.min(100, progress)} className="h-2" />
          {uploading && progress < 100 && (
            <p className="text-xs text-muted-foreground">
              Uploading to cloud storage...
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
