"use client"

import * as React from "react"
import { SettingsModal } from "@/components/settings-modal"

const SettingsContext = React.createContext<{
  open: () => void
}>({ open: () => {} })

export function useSettings() {
  return React.useContext(SettingsContext)
}

export function SettingsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = React.useState(false)

  const value = React.useMemo(
    () => ({ open: () => setIsOpen(true) }),
    []
  )

  return (
    <SettingsContext.Provider value={value}>
      {children}
      <SettingsModal open={isOpen} onOpenChange={setIsOpen} />
    </SettingsContext.Provider>
  )
}
