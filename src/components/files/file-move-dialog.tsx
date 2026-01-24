"use client"

import { useState } from "react"
import { IconFolder, IconFolderSymlink } from "@tabler/icons-react"

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
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export function FileMoveDialog({
  open,
  onOpenChange,
  file,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  file: FileItem | null
}) {
  const { dispatch, getFolders } = useFiles()
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null)

  const folders = getFolders().filter((f) => f.id !== file?.id)

  const handleMove = () => {
    if (!file) return

    const targetFolder = folders.find((f) => f.id === selectedFolderId)
    const targetPath = targetFolder
      ? [...targetFolder.path, targetFolder.name]
      : []

    dispatch({
      type: "MOVE_FILE",
      payload: {
        id: file.id,
        targetFolderId: selectedFolderId,
        targetPath,
      },
    })
    toast.success(
      `Moved "${file.name}" to ${targetFolder?.name ?? "My Files"}`
    )
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IconFolderSymlink size={18} />
            Move to
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-64 rounded-md border p-2">
          <button
            className={cn(
              "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent",
              selectedFolderId === null && "bg-accent"
            )}
            onClick={() => setSelectedFolderId(null)}
          >
            <IconFolder size={16} className="text-amber-500" />
            My Files (root)
          </button>
          {folders.map((folder) => (
            <button
              key={folder.id}
              className={cn(
                "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent",
                selectedFolderId === folder.id && "bg-accent"
              )}
              style={{ paddingLeft: `${(folder.path.length + 1) * 12 + 12}px` }}
              onClick={() => setSelectedFolderId(folder.id)}
            >
              <IconFolder size={16} className="text-amber-500" />
              {folder.name}
            </button>
          ))}
        </ScrollArea>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleMove}>Move here</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
