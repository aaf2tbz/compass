"use client"

import {
  IconDownload,
  IconEdit,
  IconFolderSymlink,
  IconShare,
  IconStar,
  IconStarFilled,
  IconTrash,
  IconTrashOff,
} from "@tabler/icons-react"

import type { FileItem } from "@/lib/files-data"
import { useFiles } from "@/hooks/use-files"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { toast } from "sonner"

export function FileContextMenu({
  file,
  children,
  onRename,
  onMove,
}: {
  file: FileItem
  children: React.ReactNode
  onRename: (file: FileItem) => void
  onMove: (file: FileItem) => void
}) {
  const { dispatch } = useFiles()

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        {file.type === "folder" && (
          <ContextMenuItem onClick={() => toast.info("Opening folder...")}>
            <IconFolderSymlink size={16} className="mr-2" />
            Open
          </ContextMenuItem>
        )}
        <ContextMenuItem onClick={() => toast.info("Share dialog coming soon")}>
          <IconShare size={16} className="mr-2" />
          Share
        </ContextMenuItem>
        {!file.trashed && (
          <>
            <ContextMenuItem onClick={() => toast.success("Download started")}>
              <IconDownload size={16} className="mr-2" />
              Download
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem onClick={() => onRename(file)}>
              <IconEdit size={16} className="mr-2" />
              Rename
            </ContextMenuItem>
            <ContextMenuItem onClick={() => onMove(file)}>
              <IconFolderSymlink size={16} className="mr-2" />
              Move to
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => dispatch({ type: "STAR_FILE", payload: file.id })}
            >
              {file.starred ? (
                <>
                  <IconStarFilled size={16} className="mr-2 text-amber-400" />
                  Unstar
                </>
              ) : (
                <>
                  <IconStar size={16} className="mr-2" />
                  Star
                </>
              )}
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem
              className="text-destructive"
              onClick={() => {
                dispatch({ type: "TRASH_FILE", payload: file.id })
                toast.success(`"${file.name}" moved to trash`)
              }}
            >
              <IconTrash size={16} className="mr-2" />
              Delete
            </ContextMenuItem>
          </>
        )}
        {file.trashed && (
          <ContextMenuItem
            onClick={() => {
              dispatch({ type: "RESTORE_FILE", payload: file.id })
              toast.success(`"${file.name}" restored`)
            }}
          >
            <IconTrashOff size={16} className="mr-2" />
            Restore
          </ContextMenuItem>
        )}
      </ContextMenuContent>
    </ContextMenu>
  )
}
