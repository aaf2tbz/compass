"use client"

import { useState, useEffect } from "react"
import { IconEdit } from "@tabler/icons-react"

import type { FileItem } from "@/lib/files-data"
import { useFiles } from "@/hooks/use-files"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export function FileRenameDialog({
  open,
  onOpenChange,
  file,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  file: FileItem | null
}) {
  const [name, setName] = useState("")
  const { dispatch } = useFiles()

  useEffect(() => {
    if (file) setName(file.name)
  }, [file])

  const handleRename = () => {
    if (!file) return
    const trimmed = name.trim()
    if (!trimmed || trimmed === file.name) return

    dispatch({ type: "RENAME_FILE", payload: { id: file.id, name: trimmed } })
    toast.success(`Renamed to "${trimmed}"`)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IconEdit size={18} />
            Rename
          </DialogTitle>
        </DialogHeader>
        <div className="py-2">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleRename()}
            autoFocus
          />
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleRename}
            disabled={!name.trim() || name.trim() === file?.name}
          >
            Rename
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
