import type { FileType } from "./files-data"

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "—"
  const units = ["B", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  const size = bytes / Math.pow(1024, i)
  return `${size >= 10 ? Math.round(size) : size.toFixed(1)} ${units[i]}`
}

export function getFileTypeFromExtension(filename: string): FileType {
  const ext = filename.split(".").pop()?.toLowerCase()
  if (!ext) return "unknown"

  const typeMap: Record<string, FileType> = {
    // documents
    doc: "document",
    docx: "document",
    txt: "document",
    rtf: "document",
    odt: "document",
    pptx: "document",
    ppt: "document",
    // spreadsheets
    xls: "spreadsheet",
    xlsx: "spreadsheet",
    csv: "spreadsheet",
    ods: "spreadsheet",
    // images
    png: "image",
    jpg: "image",
    jpeg: "image",
    gif: "image",
    svg: "image",
    webp: "image",
    fig: "image",
    // video
    mp4: "video",
    mov: "video",
    avi: "video",
    mkv: "video",
    webm: "video",
    // audio
    mp3: "audio",
    wav: "audio",
    ogg: "audio",
    flac: "audio",
    // pdf
    pdf: "pdf",
    // code
    js: "code",
    ts: "code",
    tsx: "code",
    jsx: "code",
    py: "code",
    go: "code",
    rs: "code",
    md: "code",
    json: "code",
    yaml: "code",
    yml: "code",
    toml: "code",
    html: "code",
    css: "code",
    // archive
    zip: "archive",
    tar: "archive",
    gz: "archive",
    "7z": "archive",
    rar: "archive",
  }

  return typeMap[ext] ?? "unknown"
}

export function formatRelativeDate(isoDate: string): string {
  const date = new Date(isoDate)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60_000)
  const diffHours = Math.floor(diffMs / 3_600_000)
  const diffDays = Math.floor(diffMs / 86_400_000)

  if (diffMins < 1) return "Just now"
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear()
      ? "numeric"
      : undefined,
  })
}

export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}
