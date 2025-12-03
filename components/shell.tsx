'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'

export function Shell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen((v) => !v)} />
      <div className={`relative transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-20'}`}>
        {/* Fixed overlay that stays centered relative to content area even when scrolling */}
        <div aria-hidden="true" className="pointer-events-none select-none fixed inset-0 z-0">
          <div
            className="h-screen flex items-center justify-center"
            style={{
              width: `calc(100vw - ${isSidebarOpen ? '18rem' : '5rem'})`,
              marginLeft: isSidebarOpen ? '18rem' : '5rem',
            }}
          >
            <div className="bg-[url('/arkaplan_logo.png')] bg-center bg-no-repeat bg-contain opacity-[0.07] blur-[2px] w-[min(60vw,720px)] h-[min(60vw,720px)] dark:opacity-[0.06]" />
          </div>
        </div>
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  )
}


