'use client'

import * as React from 'react'

type LayoutChromeContextType = {
  hidden: boolean
  setChromeHidden: (hidden: boolean) => void
}

const LayoutChromeContext = React.createContext<LayoutChromeContextType | undefined>(undefined)

export function LayoutChromeProvider({ children }: { children: React.ReactNode }) {
  const [hidden, setHidden] = React.useState(false)
  const value = React.useMemo<LayoutChromeContextType>(
    () => ({ hidden, setChromeHidden: setHidden }),
    [hidden],
  )
  return <LayoutChromeContext.Provider value={value}>{children}</LayoutChromeContext.Provider>
}

export function useLayoutChrome(): LayoutChromeContextType {
  const ctx = React.useContext(LayoutChromeContext)
  if (!ctx) {
    throw new Error('useLayoutChrome must be used within LayoutChromeProvider')
  }
  return ctx
}


