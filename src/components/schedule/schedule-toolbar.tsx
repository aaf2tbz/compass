"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  IconSettings,
  IconHistory,
  IconFilter,
  IconPlus,
  IconDots,
} from "@tabler/icons-react"

interface ScheduleToolbarProps {
  onNewItem: () => void
}

export function ScheduleToolbar({ onNewItem }: ScheduleToolbarProps) {
  const [offlineMode, setOfflineMode] = useState(false)

  return (
    <div className="flex items-center justify-between py-1.5 border-b mb-2">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="size-8">
          <IconSettings className="size-4" />
        </Button>
        <Button variant="ghost" size="icon" className="size-8">
          <IconHistory className="size-4" />
        </Button>
        <div className="flex items-center gap-2">
          <Switch
            checked={offlineMode}
            onCheckedChange={setOfflineMode}
            className="scale-75"
          />
          <span className="text-xs text-muted-foreground">
            Schedule Offline
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-xs">
              <IconDots className="size-4 mr-1" />
              More Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Export Schedule</DropdownMenuItem>
            <DropdownMenuItem>Import Schedule</DropdownMenuItem>
            <DropdownMenuItem>Print</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" size="sm" className="text-xs">
          <IconFilter className="size-4 mr-1" />
          Filter
        </Button>
      </div>
      <Button size="sm" onClick={onNewItem}>
        <IconPlus className="size-4 mr-1" />
        New Schedule Item
      </Button>
    </div>
  )
}
