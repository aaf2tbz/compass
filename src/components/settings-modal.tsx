"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export function SettingsModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { theme, setTheme } = useTheme()
  const [emailNotifs, setEmailNotifs] = React.useState(true)
  const [pushNotifs, setPushNotifs] = React.useState(true)
  const [weeklyDigest, setWeeklyDigest] = React.useState(false)
  const [timezone, setTimezone] = React.useState("America/New_York")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Manage your app preferences.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="mt-2">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger id="timezone" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/New_York">
                    Eastern (ET)
                  </SelectItem>
                  <SelectItem value="America/Chicago">
                    Central (CT)
                  </SelectItem>
                  <SelectItem value="America/Denver">
                    Mountain (MT)
                  </SelectItem>
                  <SelectItem value="America/Los_Angeles">
                    Pacific (PT)
                  </SelectItem>
                  <SelectItem value="Europe/London">
                    London (GMT)
                  </SelectItem>
                  <SelectItem value="Europe/Berlin">
                    Berlin (CET)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>Weekly digest</Label>
                <p className="text-muted-foreground text-sm">
                  Receive a summary of activity each week.
                </p>
              </div>
              <Switch
                checked={weeklyDigest}
                onCheckedChange={setWeeklyDigest}
              />
            </div>
          </TabsContent>

          <TabsContent
            value="notifications"
            className="space-y-4 pt-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <Label>Email notifications</Label>
                <p className="text-muted-foreground text-sm">
                  Get notified about project updates via email.
                </p>
              </div>
              <Switch
                checked={emailNotifs}
                onCheckedChange={setEmailNotifs}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>Push notifications</Label>
                <p className="text-muted-foreground text-sm">
                  Receive push notifications in your browser.
                </p>
              </div>
              <Switch
                checked={pushNotifs}
                onCheckedChange={setPushNotifs}
              />
            </div>
          </TabsContent>

          <TabsContent
            value="appearance"
            className="space-y-4 pt-4"
          >
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select
                value={theme ?? "light"}
                onValueChange={setTheme}
              >
                <SelectTrigger id="theme" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
