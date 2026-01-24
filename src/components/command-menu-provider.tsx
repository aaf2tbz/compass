"use client"

import * as React from "react"
import { CommandMenu } from "@/components/command-menu"

const CommandMenuContext = React.createContext<{
  open: () => void
}>({ open: () => {} })

export function useCommandMenu() {
  return React.useContext(CommandMenuContext)
}

export function CommandMenuProvider({
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
    <CommandMenuContext.Provider value={value}>
      {children}
      <CommandMenu open={isOpen} setOpen={setIsOpen} />
    </CommandMenuContext.Provider>
  )
}
