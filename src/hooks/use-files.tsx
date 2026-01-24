"use client"

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type ReactNode,
} from "react"
import { mockFiles, mockStorageUsage, type FileItem } from "@/lib/files-data"

export type FileView =
  | "my-files"
  | "shared"
  | "recent"
  | "starred"
  | "trash"

export type SortField = "name" | "modified" | "size" | "type"
export type SortDirection = "asc" | "desc"
export type ViewMode = "grid" | "list"

type FilesState = {
  viewMode: ViewMode
  currentView: FileView
  selectedIds: Set<string>
  sortBy: SortField
  sortDirection: SortDirection
  searchQuery: string
  files: FileItem[]
}

type FilesAction =
  | { type: "SET_VIEW_MODE"; payload: ViewMode }
  | { type: "SET_CURRENT_VIEW"; payload: FileView }
  | { type: "SET_SELECTED"; payload: Set<string> }
  | { type: "TOGGLE_SELECTED"; payload: string }
  | { type: "CLEAR_SELECTION" }
  | { type: "SET_SORT"; payload: { field: SortField; direction: SortDirection } }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "STAR_FILE"; payload: string }
  | { type: "TRASH_FILE"; payload: string }
  | { type: "RESTORE_FILE"; payload: string }
  | { type: "RENAME_FILE"; payload: { id: string; name: string } }
  | { type: "CREATE_FOLDER"; payload: { name: string; parentId: string | null; path: string[] } }
  | { type: "CREATE_FILE"; payload: { name: string; fileType: FileItem["type"]; parentId: string | null; path: string[] } }
  | { type: "MOVE_FILE"; payload: { id: string; targetFolderId: string | null; targetPath: string[] } }

function filesReducer(state: FilesState, action: FilesAction): FilesState {
  switch (action.type) {
    case "SET_VIEW_MODE":
      return { ...state, viewMode: action.payload }
    case "SET_CURRENT_VIEW":
      return { ...state, currentView: action.payload, selectedIds: new Set() }
    case "SET_SELECTED":
      return { ...state, selectedIds: action.payload }
    case "TOGGLE_SELECTED": {
      const next = new Set(state.selectedIds)
      if (next.has(action.payload)) next.delete(action.payload)
      else next.add(action.payload)
      return { ...state, selectedIds: next }
    }
    case "CLEAR_SELECTION":
      return { ...state, selectedIds: new Set() }
    case "SET_SORT":
      return {
        ...state,
        sortBy: action.payload.field,
        sortDirection: action.payload.direction,
      }
    case "SET_SEARCH":
      return { ...state, searchQuery: action.payload, selectedIds: new Set() }
    case "STAR_FILE":
      return {
        ...state,
        files: state.files.map((f) =>
          f.id === action.payload ? { ...f, starred: !f.starred } : f
        ),
      }
    case "TRASH_FILE":
      return {
        ...state,
        files: state.files.map((f) =>
          f.id === action.payload ? { ...f, trashed: true } : f
        ),
        selectedIds: new Set(),
      }
    case "RESTORE_FILE":
      return {
        ...state,
        files: state.files.map((f) =>
          f.id === action.payload ? { ...f, trashed: false } : f
        ),
      }
    case "RENAME_FILE":
      return {
        ...state,
        files: state.files.map((f) =>
          f.id === action.payload.id
            ? { ...f, name: action.payload.name, modifiedAt: new Date().toISOString() }
            : f
        ),
      }
    case "CREATE_FOLDER": {
      const newFolder: FileItem = {
        id: `folder-${Date.now()}`,
        name: action.payload.name,
        type: "folder",
        size: 0,
        path: action.payload.path,
        createdAt: new Date().toISOString(),
        modifiedAt: new Date().toISOString(),
        owner: { name: "Martine Vogel" },
        starred: false,
        shared: false,
        trashed: false,
        parentId: action.payload.parentId,
      }
      return { ...state, files: [...state.files, newFolder] }
    }
    case "CREATE_FILE": {
      const newFile: FileItem = {
        id: `file-${Date.now()}`,
        name: action.payload.name,
        type: action.payload.fileType,
        size: 0,
        path: action.payload.path,
        createdAt: new Date().toISOString(),
        modifiedAt: new Date().toISOString(),
        owner: { name: "Martine Vogel" },
        starred: false,
        shared: false,
        trashed: false,
        parentId: action.payload.parentId,
      }
      return { ...state, files: [...state.files, newFile] }
    }
    case "MOVE_FILE":
      return {
        ...state,
        files: state.files.map((f) =>
          f.id === action.payload.id
            ? {
                ...f,
                parentId: action.payload.targetFolderId,
                path: action.payload.targetPath,
                modifiedAt: new Date().toISOString(),
              }
            : f
        ),
      }
    default:
      return state
  }
}

const initialState: FilesState = {
  viewMode: "grid",
  currentView: "my-files",
  selectedIds: new Set(),
  sortBy: "name",
  sortDirection: "asc",
  searchQuery: "",
  files: mockFiles,
}

type FilesContextValue = {
  state: FilesState
  dispatch: React.Dispatch<FilesAction>
  getFilesForPath: (path: string[]) => FileItem[]
  getFilesForView: (view: FileView, path: string[]) => FileItem[]
  storageUsage: typeof mockStorageUsage
  getFolders: () => FileItem[]
}

const FilesContext = createContext<FilesContextValue | null>(null)

export function FilesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(filesReducer, initialState)

  const getFilesForPath = useCallback(
    (path: string[]) => {
      return state.files.filter((f) => {
        if (f.trashed) return false
        if (path.length === 0) return f.parentId === null
        const parentFolder = state.files.find(
          (folder) =>
            folder.type === "folder" &&
            folder.name === path[path.length - 1] &&
            JSON.stringify(folder.path) === JSON.stringify(path.slice(0, -1))
        )
        return parentFolder && f.parentId === parentFolder.id
      })
    },
    [state.files]
  )

  const getFilesForView = useCallback(
    (view: FileView, path: string[]) => {
      let files: FileItem[]

      switch (view) {
        case "my-files":
          files = getFilesForPath(path)
          break
        case "shared":
          files = state.files.filter((f) => !f.trashed && f.shared)
          break
        case "recent": {
          const cutoff = new Date()
          cutoff.setDate(cutoff.getDate() - 30)
          files = state.files
            .filter((f) => !f.trashed && new Date(f.modifiedAt) > cutoff)
            .sort((a, b) => new Date(b.modifiedAt).getTime() - new Date(a.modifiedAt).getTime())
          break
        }
        case "starred":
          files = state.files.filter((f) => !f.trashed && f.starred)
          break
        case "trash":
          files = state.files.filter((f) => f.trashed)
          break
        default:
          files = []
      }

      if (state.searchQuery) {
        const q = state.searchQuery.toLowerCase()
        files = files.filter((f) => f.name.toLowerCase().includes(q))
      }

      return sortFiles(files, state.sortBy, state.sortDirection)
    },
    [state.files, state.searchQuery, state.sortBy, state.sortDirection, getFilesForPath]
  )

  const getFolders = useCallback(() => {
    return state.files.filter((f) => f.type === "folder" && !f.trashed)
  }, [state.files])

  return (
    <FilesContext.Provider
      value={{
        state,
        dispatch,
        getFilesForPath,
        getFilesForView,
        storageUsage: mockStorageUsage,
        getFolders,
      }}
    >
      {children}
    </FilesContext.Provider>
  )
}

export function useFiles() {
  const ctx = useContext(FilesContext)
  if (!ctx) throw new Error("useFiles must be used within FilesProvider")
  return ctx
}

function sortFiles(
  files: FileItem[],
  sortBy: SortField,
  direction: SortDirection
): FileItem[] {
  const sorted = [...files].sort((a, b) => {
    // folders always first
    if (a.type === "folder" && b.type !== "folder") return -1
    if (a.type !== "folder" && b.type === "folder") return 1

    let cmp = 0
    switch (sortBy) {
      case "name":
        cmp = a.name.localeCompare(b.name)
        break
      case "modified":
        cmp = new Date(a.modifiedAt).getTime() - new Date(b.modifiedAt).getTime()
        break
      case "size":
        cmp = a.size - b.size
        break
      case "type":
        cmp = a.type.localeCompare(b.type)
        break
    }
    return direction === "asc" ? cmp : -cmp
  })
  return sorted
}
