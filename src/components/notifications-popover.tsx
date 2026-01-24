"use client"

import {
  IconBell,
  IconMessageCircle,
  IconAlertCircle,
  IconClipboardCheck,
  IconClock,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const notifications = [
  {
    icon: IconClipboardCheck,
    title: "Task assigned",
    description: "You've been assigned to \"Update homepage layout\"",
    time: "2m ago",
  },
  {
    icon: IconMessageCircle,
    title: "New comment",
    description: "Sarah left a comment on the brand assets file",
    time: "15m ago",
  },
  {
    icon: IconAlertCircle,
    title: "Deadline approaching",
    description: "\"Q1 Report\" is due tomorrow",
    time: "1h ago",
  },
  {
    icon: IconClock,
    title: "Status changed",
    description: "\"API Integration\" moved to In Review",
    time: "3h ago",
  },
]

export function NotificationsPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative size-8">
          <IconBell className="size-4" />
          <span className="bg-destructive absolute top-1 right-1 size-1.5 rounded-full" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="border-b px-4 py-3">
          <p className="text-sm font-medium">Notifications</p>
        </div>
        <div className="max-h-72 overflow-y-auto">
          {notifications.map((item) => (
            <div
              key={item.title}
              className="hover:bg-muted/50 flex gap-3 border-b px-4 py-3 last:border-0"
            >
              <item.icon className="text-muted-foreground mt-0.5 size-4 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-muted-foreground truncate text-xs">
                  {item.description}
                </p>
                <p className="text-muted-foreground mt-0.5 text-xs">
                  {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t px-4 py-2">
          <Button variant="ghost" size="sm" className="w-full text-xs">
            Mark all as read
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
