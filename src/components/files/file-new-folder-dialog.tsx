"use client"

import { useState } from "react"
import { IconFolderPlus } from "@tabler/icons-react"

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

export function FileNewFolderDialog({
  open,
  onOpenChange,
  currentPath,
  parentId,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentPath: string[]
  parentId: string | null
}) {
  const [name, setName] = useState("")
  const { dispatch } = useFiles()

  const handleCreate = () => {
    const trimmed = name.trim()
    if (!trimmed) return

    dispatch({
      type: "CREATE_FOLDER",
      payload: { name: trimmed, parentId, path: currentPath },
    })
    toast.success(`Folder "${trimmed}" created`)
    setName("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IconFolderPlus size={18} />
            New folder
          </DialogTitle>
        </DialogHeader>
        <div className="py-2">
          <Input
            placeholder="Folder name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            autoFocus
          />
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={!name.trim()}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
