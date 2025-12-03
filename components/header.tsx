'use client'

import Link from 'next/link'
import { Search, Bell } from 'lucide-react'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { useLayoutChrome } from '@/components/layout-chrome-provider'

export function Header() {
  const { hidden } = useLayoutChrome()
  return (
    <header
      className={`sticky top-0 z-40 w-full border-b bg-white/80 dark:bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-background/60 transition-opacity ${
        hidden ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="hidden sm:block">
              <p className="text-sm font-semibold leading-tight">Kampüs Dijital Platform</p>
              <p className="text-xs text-muted-foreground -mt-0.5">Enerji • Ulaşım • Atık</p>
            </div>
          </Link>

          <div className="ml-auto flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 rounded-md border bg-background px-3 py-2">
              <Search className="size-4 text-muted-foreground" />
              <input
                placeholder="Hızlı arama..."
                className="bg-transparent outline-none text-sm placeholder:text-muted-foreground w-56"
              />
            </div>
            <Button variant="outline" size="icon" aria-label="Bildirimler" className="shrink-0">
              <Bell className="size-4" />
            </Button>
            <ModeToggle />
            <Button variant="outline" className="hidden sm:inline-flex">Giriş</Button>
          </div>
        </div>
      </div>
    </header>
  )
}


