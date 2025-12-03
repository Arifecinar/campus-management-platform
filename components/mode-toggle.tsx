'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" aria-label="Tema değiştir" className="shrink-0">
        <Sun className="size-4" />
      </Button>
    )
  }

  const isDark = (theme ?? resolvedTheme) === 'dark'

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Tema değiştir"
      className="shrink-0"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      title={isDark ? 'Açık tema' : 'Koyu tema'}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  )
}


