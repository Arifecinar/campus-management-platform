'use client'

import Image from 'next/image'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Zap, Bus, Trash2, BarChart3, Settings, HelpCircle, AlertCircle, TrendingDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useLayoutChrome } from '@/components/layout-chrome-provider'

export function Sidebar({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  const { hidden } = useLayoutChrome()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const homeTab = (searchParams.get('tab') as 'energy' | 'transport' | 'waste' | null) ?? 'energy'

  const isActive = (key: string) => {
    if (pathname === '/') return key === homeTab
    if (pathname?.startsWith('/reports') && key === 'reports') return true
    if (pathname?.startsWith('/alarm-history') && key === 'alarms') return true
    return false
  }

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white/95 backdrop-blur-sm border-r border-border/50 transition-all duration-300 ${
        isOpen ? 'w-72' : 'w-20'
      } z-50 shadow-prominent ${hidden ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible'}`}
    >
      <div className="p-6 h-full flex flex-col">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border/50">
          <div
            className={`${isOpen ? 'w-14 h-14 rounded-2xl' : 'w-10 h-10 rounded-xl'} bg-white/90 dark:bg-background/80 border border-border flex items-center justify-center shrink-0 shadow-elevated overflow-hidden`}
          >
            {(() => {
              const size = isOpen ? 56 : 36
              return (
                <Image
                  src="/pamukkale-logo.png"
                  alt="Pamukkale Üniversitesi"
                  width={size}
                  height={size}
                  className={`${isOpen ? 'rounded-xl' : 'rounded-lg'} object-contain`}
                />
              )
            })()}
          </div>
          {isOpen && (
            <div>
              <h2 className="font-bold text-xl text-foreground leading-tight tracking-tight">Pamukkale Üniversitesi</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">Dijital Kampüs Yönetimi</p>
            </div>
          )}
        </div>

        <nav className="space-y-2 flex-1">
          <button
            onClick={() => router.push('/?tab=energy')}
            className={`w-full flex items-center ${isOpen ? 'gap-4 px-4 py-4' : 'justify-center py-2'} rounded-xl font-semibold transition-all ${
              isOpen
                ? (isActive('energy')
                    ? 'bg-gradient-to-r from-primary to-primary/90 text-white shadow-elevated scale-[1.02]'
                    : 'text-muted-foreground hover:bg-gradient-to-r hover:from-accent/50 hover:to-accent/30 hover:text-foreground hover:scale-[1.01] hover:shadow-professional')
                : 'text-muted-foreground hover:bg-accent/30'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              isOpen
                ? (isActive('energy') ? 'bg-white/20' : 'bg-primary/10')
                : (isActive('energy') ? 'bg-primary text-white' : 'bg-muted')
            }`}>
              <Zap className={`w-5 h-5 ${isOpen ? (isActive('energy') ? 'text-white' : 'text-primary') : (isActive('energy') ? 'text-white' : 'text-muted-foreground')}`} />
            </div>
            {isOpen && <span className="text-base">Enerji Yönetimi</span>}
          </button>
          <button
            onClick={() => router.push('/?tab=transport')}
            className={`w-full flex items-center ${isOpen ? 'gap-4 px-4 py-4' : 'justify-center py-2'} rounded-xl font-semibold transition-all ${
              isOpen
                ? (isActive('transport')
                    ? 'bg-gradient-to-r from-primary to-primary/90 text-white shadow-elevated scale-[1.02]'
                    : 'text-muted-foreground hover:bg-gradient-to-r hover:from-accent/50 hover:to-accent/30 hover:text-foreground hover:scale-[1.01] hover:shadow-professional')
                : 'text-muted-foreground hover:bg-accent/30'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              isOpen
                ? (isActive('transport') ? 'bg-white/20' : 'bg-primary/10')
                : (isActive('transport') ? 'bg-primary text-white' : 'bg-muted')
            }`}>
              <Bus className={`w-5 h-5 ${isOpen ? (isActive('transport') ? 'text-white' : 'text-primary') : (isActive('transport') ? 'text-white' : 'text-muted-foreground')}`} />
            </div>
            {isOpen && <span className="text-base">Ulaşım Yönetimi</span>}
          </button>
          <button
            onClick={() => router.push('/?tab=waste')}
            className={`w-full flex items-center ${isOpen ? 'gap-4 px-4 py-4' : 'justify-center py-2'} rounded-xl font-semibold transition-all ${
              isOpen
                ? (isActive('waste')
                    ? 'bg-gradient-to-r from-primary to-primary/90 text-white shadow-elevated scale-[1.02]'
                    : 'text-muted-foreground hover:bg-gradient-to-r hover:from-accent/50 hover:to-accent/30 hover:text-foreground hover:scale-[1.01] hover:shadow-professional')
                : 'text-muted-foreground hover:bg-accent/30'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              isOpen
                ? (isActive('waste') ? 'bg-white/20' : 'bg-secondary/10')
                : (isActive('waste') ? 'bg-secondary text-white' : 'bg-muted')
            }`}>
              <Trash2 className={`w-5 h-5 ${isOpen ? (isActive('waste') ? 'text-white' : 'text-secondary') : (isActive('waste') ? 'text-white' : 'text-muted-foreground')}`} />
            </div>
            {isOpen && <span className="text-base">Atık Yönetimi</span>}
          </button>

          {isOpen && <div className="border-t border-border/50 my-4" />}

          <button
            onClick={() => router.push('/alarm-history')}
            className={`w-full flex items-center ${isOpen ? 'gap-4 px-4 py-4' : 'justify-center py-2'} rounded-xl font-semibold transition-all ${
              isOpen
                ? (isActive('alarms')
                    ? 'bg-gradient-to-r from-primary to-primary/90 text-white shadow-elevated scale-[1.02]'
                    : 'text-muted-foreground hover:bg-gradient-to-r hover:from-accent/50 hover:to-accent/30 hover:text-foreground hover:scale-[1.01] hover:shadow-professional')
                : 'text-muted-foreground hover:bg-accent/30'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              isOpen ? 'bg-orange-500/10' : (isActive('alarms') ? 'bg-orange-500 text-white' : 'bg-muted')
            }`}>
              <AlertCircle className={`w-5 h-5 ${isOpen ? 'text-orange-500' : (isActive('alarms') ? 'text-white' : 'text-muted-foreground')}`} />
            </div>
            {isOpen && <span className="text-base">Alarm Geçmişi</span>}
          </button>

          <button
            onClick={() => router.push('/reports')}
            className={`w-full flex items-center ${isOpen ? 'gap-4 px-4 py-4' : 'justify-center py-2'} rounded-xl font-semibold transition-all ${
              isOpen
                ? (isActive('reports')
                    ? 'bg-gradient-to-r from-primary to-primary/90 text-white shadow-elevated scale-[1.02]'
                    : 'text-muted-foreground hover:bg-gradient-to-r hover:from-accent/50 hover:to-accent/30 hover:text-foreground hover:scale-[1.01] hover:shadow-professional')
                : 'text-muted-foreground hover:bg-accent/30'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              isOpen ? 'bg-purple-500/10' : (isActive('reports') ? 'bg-purple-500 text-white' : 'bg-muted')
            }`}>
              <BarChart3 className={`w-5 h-5 ${isOpen ? 'text-purple-500' : (isActive('reports') ? 'text-white' : 'text-muted-foreground')}`} />
            </div>
            {isOpen && <span className="text-base">Raporlar</span>}
          </button>
        </nav>

        <div className="space-y-2 mt-auto pt-6 border-t border-border/50">
          <button className={`w-full flex items-center ${isOpen ? 'gap-4 px-4 py-4' : 'justify-center py-2'} rounded-xl text-muted-foreground hover:bg-accent/30 font-semibold transition-all`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isOpen ? 'bg-muted' : 'bg-muted'}`}>
              <Settings className="w-5 h-5 text-muted-foreground" />
            </div>
            {isOpen && <span className="text-base">Ayarlar</span>}
          </button>

          <button className={`w-full flex items-center ${isOpen ? 'gap-4 px-4 py-4' : 'justify-center py-2'} rounded-xl text-muted-foreground hover:bg-accent/30 font-semibold transition-all`}>
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5 text-muted-foreground" />
            </div>
            {isOpen && <span className="text-base">Yardım</span>}
          </button>

          {isOpen && (
            <Card className="bg-gradient-to-br from-secondary/10 via-secondary/5 to-transparent border-secondary/20 p-5 mt-4 shadow-professional">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-professional">
                  <TrendingDown className="w-6 h-6 text-secondary" />
                </div>
                <div className="text-sm">
                  <p className="font-bold text-foreground text-base">Destek Merkezi</p>
                  <p className="text-muted-foreground text-sm">Yardıma mı ihtiyacınız var?</p>
                </div>
              </div>
              <Button className="w-full mt-2 bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary/80 text-white font-semibold shadow-professional text-base py-3">
                İletişime Geç
              </Button>
            </Card>
          )}
        </div>
      </div>

      <button
        onClick={onToggle}
        className="absolute -right-4 top-10 w-9 h-9 bg-white border-2 border-primary/20 rounded-full flex items-center justify-center text-primary hover:text-white hover:bg-primary hover:border-primary transition-all shadow-elevated hover:shadow-prominent hover:scale-110"
      >
        <span className="text-lg font-bold">{isOpen ? '‹' : '›'}</span>
      </button>
    </div>
  )
}


