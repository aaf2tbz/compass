import * as React from "react"
import { format, parseISO, isSameDay, subDays, addDays, eachDayOfInterval, min } from "date-fns"
import { Loader2Icon, TrashIcon, DownloadIcon, XIcon, MoreVerticalIcon, UploadIcon, PencilIcon, CheckIcon } from "lucide-react"
import { getProjectPhotos, deleteAsset, updateAssetName } from "@/app/actions/media"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface Asset {
    id: string
    url: string
    thumbnailUrl: string | null
    name: string
    type: string
    createdAt: string
    dailyLogId: string | null
    date: string | null
}

const PhotoPreviewContent = ({ asset, onClose, onDelete, onDownload }: { asset: Asset, onClose: () => void, onDelete: () => void, onDownload: () => void }) => {
    const [isEditing, setIsEditing] = React.useState(false)
    const [name, setName] = React.useState(asset.name)
    const [saving, setSaving] = React.useState(false)

    // Sync name if asset changes
    React.useEffect(() => {
        setName(asset.name)
        setIsEditing(false)
    }, [asset])

    const handleSave = async () => {
        if (!name.trim() || name === asset.name) {
            setIsEditing(false)
            return
        }
        setSaving(true)
        try {
            const result = await updateAssetName(asset.id, name)
            if (result.success) {
                setIsEditing(false)
                toast.success("Photo renamed")
                // Need to refresh parent assets? Ideally yes.
                // But for now let's just update local state or rely on revalidatePath eventually catching up
                // Actually revalidatePath should handling it on next refresh, but optimistic update is better.
                // We'll dispatch an event? Or just let it be.
                window.dispatchEvent(new CustomEvent("project-photo-uploaded")) // Reuse this event to trigger refresh
            } else {
                toast.error("Failed to rename photo")
            }
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="relative flex flex-col w-auto h-auto max-w-full max-h-[90vh] bg-black rounded-lg overflow-hidden shadow-2xl group border border-white/10">
            {/* Header Bar - Always visible on mobile, hover on desktop */}
            <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-3 bg-gradient-to-b from-black/80 to-transparent md:from-black/60 md:to-black/60 md:backdrop-blur-md transition-opacity duration-200 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:focus-within:opacity-100">
                <div className="flex-1 min-w-0 mr-4">
                    {isEditing ? (
                        <div className="flex items-center gap-2">
                            <Input
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="h-8 text-sm bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-1 focus-visible:ring-white/50 min-w-[100px]"
                                autoFocus
                                onKeyDown={e => {
                                    if (e.key === "Enter") handleSave()
                                    if (e.key === "Escape") setIsEditing(false)
                                }}
                                onClick={(e) => e.stopPropagation()}
                            />
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-green-400 hover:text-green-300 hover:bg-white/10 shrink-0" onClick={(e) => { e.stopPropagation(); handleSave() }} disabled={saving}>
                                {saving ? <Loader2Icon className="h-4 w-4 animate-spin" /> : <CheckIcon className="h-4 w-4" />}
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10 shrink-0" onClick={(e) => { e.stopPropagation(); setIsEditing(false) }}>
                                <XIcon className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 group/title cursor-pointer p-1 rounded hover:bg-white/10 transition-colors max-w-full" onClick={(e) => { e.stopPropagation(); setIsEditing(true) }}>
                            <h2 className="text-white font-medium truncate text-sm sm:text-base select-none">
                                {name}
                            </h2>
                            <PencilIcon className="h-3 w-3 text-white/50 opacity-0 group-hover/title:opacity-100 transition-opacity shrink-0" />
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-1 shrink-0">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-white/90 hover:text-white hover:bg-white/20 rounded-full h-8 w-8">
                                <MoreVerticalIcon className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={onDownload}>
                                <DownloadIcon className="mr-2 h-4 w-4" /> Download
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={onDelete} className="text-destructive">
                                <TrashIcon className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="ghost" size="icon" className="text-white/90 hover:text-white hover:bg-white/20 rounded-full h-8 w-8" onClick={onClose}>
                        <XIcon className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Image Container */}
            <div className="relative flex items-center justify-center bg-black/20 min-w-[200px] min-h-[200px] max-w-full max-h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={asset.url}
                    alt={asset.name}
                    className="max-w-full max-h-[85vh] w-auto h-auto object-contain block"
                />
            </div>
        </div>
    )
}

interface PhotoGalleryProps {
    projectId: string
    initialDate?: string
}

export function PhotoGallery({ projectId, initialDate }: PhotoGalleryProps) {
    const [assets, setAssets] = React.useState<Asset[]>([])
    const [loading, setLoading] = React.useState(true)
    const [selectedAsset, setSelectedAsset] = React.useState<Asset | null>(null)
    const [deleteConfirmAsset, setDeleteConfirmAsset] = React.useState<Asset | null>(null)
    const scrollRef = React.useRef<HTMLDivElement>(null)
    const [activeDate, setActiveDate] = React.useState<string>(format(new Date(), "yyyy-MM-dd"))
    const dateStripRef = React.useRef<HTMLDivElement>(null)

    // Fetch assets
    const fetchAssets = React.useCallback(async () => {
        setLoading(true)
        const result = await getProjectPhotos(projectId)
        if (result.success && result.data) {
            setAssets(result.data)
        } else {
            console.error("Failed to load photos", result.error)
        }
        setLoading(false)
    }, [projectId])

    React.useEffect(() => {
        fetchAssets()

        // Listen for upload events to refresh gallery
        const handleRefresh = () => fetchAssets()
        window.addEventListener("project-photo-uploaded", handleRefresh)

        return () => {
            window.removeEventListener("project-photo-uploaded", handleRefresh)
        }
    }, [fetchAssets])

    // Group assets by date
    const groupedAssets = React.useMemo(() => {
        const groups: Record<string, Asset[]> = {}
        assets.forEach(asset => {
            const dateKey = asset.date ?? asset.createdAt.split("T")[0]
            if (!groups[dateKey]) {
                groups[dateKey] = []
            }
            groups[dateKey].push(asset)
        })
        return groups
    }, [assets])

    // Generate continuous date range
    const displayDates = React.useMemo(() => {
        const today = new Date()
        let start = subDays(today, 30) // Default lookback
        const end = addDays(today, 0) // Up to today

        // If we have older assets, extend start
        const assetDates = Object.keys(groupedAssets).map(d => parseISO(d))
        if (assetDates.length > 0) {
            const minAsset = min(assetDates)
            if (minAsset < start) start = minAsset
        }

        // Generate range
        const days = eachDayOfInterval({ start, end })
        // Return reversed (Today first) for horizontal scrolling left-to-right (newest to oldest)
        // OR standard (Oldest to Newest).
        // Standard calendars are Left=Past, Right=Future.
        // But for "scrolling back in time", if we start at Today (Rightmost), we scroll Left.
        // Let's keep Today at the END of the list (Right side), so we can scroll Left to go back.
        return days.map(d => format(d, "yyyy-MM-dd"))
    }, [groupedAssets])

    // Initialize Scroll Position to Today
    React.useEffect(() => {
        if (!loading && displayDates.length > 0 && dateStripRef.current) {
            // Scroll to end (Today)
            // Or better, scroll to active element
            const activeEl = document.getElementById(`date-btn-${activeDate}`)
            if (activeEl) {
                activeEl.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
            } else {
                // Fallback to end
                dateStripRef.current.scrollLeft = dateStripRef.current.scrollWidth
            }
        }
    }, [loading, displayDates, activeDate]) // Re-run when activeDate changes to center it? Maybe too jumping.
    // Actually, only on initial load or external change.

    // External initialDate effect
    React.useEffect(() => {
        if (initialDate && !loading) {
            setActiveDate(initialDate)
        }
    }, [initialDate, loading])

    const handleDelete = (asset: Asset) => {
        // Open confirmation dialog
        setDeleteConfirmAsset(asset)
    }

    const confirmDelete = async () => {
        if (!deleteConfirmAsset) return
        const asset = deleteConfirmAsset
        setDeleteConfirmAsset(null)

        // Optimistic update
        setAssets(prev => prev.filter(a => a.id !== asset.id))
        if (selectedAsset?.id === asset.id) setSelectedAsset(null)

        const result = await deleteAsset(asset.id)
        if (!result.success) {
            toast.error("Failed to delete photo")
            fetchAssets() // Revert
        } else {
            toast.success("Photo deleted")
        }
    }

    const handleDownload = (url: string, filename?: string) => {
        const link = document.createElement('a')
        link.href = url
        link.download = filename || `photo-${Date.now()}.jpg`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12 text-muted-foreground">
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                Loading photos...
            </div>
        )
    }

    const activeAssets = groupedAssets[activeDate] || []
    const isToday = isSameDay(parseISO(activeDate), new Date())

    return (
        <div className="flex flex-col h-full bg-background rounded-lg border overflow-hidden">
            {/* Scrollable Date Strip */}
            <div
                ref={dateStripRef}
                className="flex overflow-x-auto p-2 gap-2 border-b bg-muted/30 scrollbar-hide shrink-0 items-center"
            >
                {displayDates.map((date) => {
                    const hasPhotos = groupedAssets[date]?.length > 0
                    const isActive = activeDate === date
                    const dateObj = parseISO(date)
                    const isDayToday = isSameDay(dateObj, new Date())

                    return (
                        <button
                            key={date}
                            id={`date-btn-${date}`}
                            onClick={() => setActiveDate(date)}
                            className={cn(
                                "flex flex-col items-center justify-center min-w-[4.5rem] p-2 rounded-md transition-all text-sm border flex-shrink-0 cursor-pointer snap-center",
                                isActive
                                    ? "bg-primary text-primary-foreground border-primary shadow-sm scale-105 z-10"
                                    : "bg-background hover:bg-muted border-transparent hover:border-border text-muted-foreground",
                                isDayToday && !isActive && "text-foreground font-semibold border-border/50 bg-background/50"
                            )}
                        >
                            <span className="text-[10px] uppercase tracking-wide opacity-80">
                                {isDayToday ? "Today" : format(dateObj, "EEE")}
                            </span>
                            <span className="font-bold text-lg leading-none my-0.5">
                                {format(dateObj, "d")}
                            </span>
                            <span className="h-1.5 w-1.5 rounded-full overflow-hidden">
                                {hasPhotos && (
                                    <span className={cn(
                                        "block w-full h-full rounded-full",
                                        isActive ? "bg-primary-foreground" : "bg-primary"
                                    )} />
                                )}
                            </span>
                        </button>
                    )
                })}
            </div>

            {/* Main Content Area - Filtered by Active Date */}
            <ScrollArea className="flex-1" ref={scrollRef}>
                <div className="space-y-6 p-4 pb-12 min-h-[300px]">
                    <div className="flex items-center justify-between border-b pb-4">
                        <div>
                            <h3 className="font-semibold text-xl">
                                {isToday ? "Today" : format(parseISO(activeDate), "EEEE")}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                                {format(parseISO(activeDate), "MMMM d, yyyy")}
                            </p>
                        </div>
                        <div className="text-right">
                            <span className="text-xs font-medium bg-muted px-2 py-1 rounded-md text-muted-foreground">
                                {activeAssets.length} Photos
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {/* Always show upload card */}
                        <div
                            className={cn(
                                "flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed rounded-md hover:bg-muted/50 cursor-pointer transition-colors group animate-in fade-in aspect-square",
                                activeAssets.length === 0 && "col-span-full aspect-auto py-16"
                            )}
                            onClick={() => window.dispatchEvent(new CustomEvent("agent-request-photo", { detail: { projectId } }))}
                        >
                            <div className="bg-muted p-3 rounded-full mb-2 group-hover:bg-background transition-colors shadow-sm">
                                <UploadIcon className="h-5 w-5 text-primary" />
                            </div>
                            <h4 className="font-medium text-sm text-foreground">
                                {activeAssets.length === 0 ? "No photos yet" : "Add Photo"}
                            </h4>
                            <p className="text-[10px] max-w-[120px] text-center mt-0.5 line-clamp-2">
                                {activeAssets.length === 0
                                    ? `Click to add photos for ${format(parseISO(activeDate), "MMM d")}`
                                    : "Upload more"}
                            </p>
                        </div>

                        {activeAssets.map(asset => (
                            <div
                                key={asset.id}
                                className="group relative aspect-square bg-muted rounded-md overflow-hidden cursor-pointer border border-border/50 hover:border-primary/50 transition-colors shadow-sm"
                                onClick={() => setSelectedAsset(asset)}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={asset.thumbnailUrl || asset.url}
                                    alt={asset.name}
                                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollArea>


            {/* Fullscreen View */}
            <Dialog open={!!selectedAsset} onOpenChange={(o) => !o && setSelectedAsset(null)}>
                <DialogContent className="w-auto h-auto !max-w-[95vw] max-h-[95vh] p-0 border-none bg-transparent shadow-none outline-none">
                    <DialogTitle className="sr-only">Photo Preview</DialogTitle>
                    {selectedAsset && (
                        <PhotoPreviewContent
                            asset={selectedAsset}
                            onClose={() => setSelectedAsset(null)}
                            onDelete={() => handleDelete(selectedAsset)}
                            onDownload={() => handleDownload(selectedAsset.url, selectedAsset.name)}
                        />
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={!!deleteConfirmAsset} onOpenChange={(open) => !open && setDeleteConfirmAsset(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Photo</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this photo? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
