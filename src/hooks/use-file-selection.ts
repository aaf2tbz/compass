"use client"

import { useCallback, useRef } from "react"
import type { FileItem } from "@/lib/files-data"

type SelectionAction = {
  select: (ids: Set<string>) => void
}

export function useFileSelection(
  files: FileItem[],
  selectedIds: Set<string>,
  actions: SelectionAction
) {
  const lastClickedRef = useRef<string | null>(null)

  const handleClick = useCallback(
    (id: string, event: React.MouseEvent) => {
      if (event.metaKey || event.ctrlKey) {
        const next = new Set(selectedIds)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        actions.select(next)
        lastClickedRef.current = id
        return
      }

      if (event.shiftKey && lastClickedRef.current) {
        const lastIdx = files.findIndex((f) => f.id === lastClickedRef.current)
        const currIdx = files.findIndex((f) => f.id === id)
        if (lastIdx !== -1 && currIdx !== -1) {
          const start = Math.min(lastIdx, currIdx)
          const end = Math.max(lastIdx, currIdx)
          const range = files.slice(start, end + 1).map((f) => f.id)
          actions.select(new Set([...selectedIds, ...range]))
          return
        }
      }

      actions.select(new Set([id]))
      lastClickedRef.current = id
    },
    [files, selectedIds, actions]
  )

  const selectAll = useCallback(() => {
    actions.select(new Set(files.map((f) => f.id)))
  }, [files, actions])

  const clearSelection = useCallback(() => {
    actions.select(new Set())
    lastClickedRef.current = null
  }, [actions])

  return { handleClick, selectAll, clearSelection }
}
