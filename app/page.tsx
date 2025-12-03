"use client"

import { useState } from "react"
import { EnergyDashboard } from "@/components/energy-dashboard"
import { TransportDashboard } from "@/components/transport-dashboard"
import { WasteDashboard } from "@/components/waste-dashboard"
import { Card } from "@/components/ui/card"
import { Zap, Bus, Trash2, BarChart3, Settings, HelpCircle, AlertCircle, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function CampusDashboard() {
  const [activeTab, setActiveTab] = useState<"energy" | "transport" | "waste">("energy")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background text-foreground">
      <div
        className={`fixed left-0 top-0 h-full bg-white/95 backdrop-blur-sm border-r border-border/50 transition-all duration-300 ${isSidebarOpen ? "w-72" : "w-20"} z-50 shadow-prominent`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border/50">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20 flex items-center justify-center shrink-0 shadow-elevated">
              <Image
                src="/pamukkale-logo.png"
                alt="Pamukkale Üniversitesi"
                width={56}
                height={56}
                className="rounded-xl"
              />
            </div>
            {isSidebarOpen && (
              <div>
                <h2 className="font-bold text-xl text-foreground leading-tight tracking-tight">
                  Pamukkale Üniversitesi
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">Dijital Kampüs Yönetimi</p>
              </div>
            )}
          </div>

          <nav className="space-y-2 flex-1">
            <button
              onClick={() => setActiveTab("energy")}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl font-semibold transition-all ${
                activeTab === "energy"
                  ? "bg-gradient-to-r from-primary to-primary/90 text-white shadow-elevated scale-[1.02]"
                  : "text-muted-foreground hover:bg-gradient-to-r hover:from-accent/50 hover:to-accent/30 hover:text-foreground hover:scale-[1.01] hover:shadow-professional"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  activeTab === "energy" ? "bg-white/20" : "bg-primary/10"
                }`}
              >
                <Zap className={`w-5 h-5 ${activeTab === "energy" ? "text-white" : "text-primary"}`} />
              </div>
              {isSidebarOpen && <span className="text-base">Enerji Yönetimi</span>}
            </button>

            <button
              onClick={() => setActiveTab("transport")}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl font-semibold transition-all ${
                activeTab === "transport"
                  ? "bg-gradient-to-r from-primary to-primary/90 text-white shadow-elevated scale-[1.02]"
                  : "text-muted-foreground hover:bg-gradient-to-r hover:from-accent/50 hover:to-accent/30 hover:text-foreground hover:scale-[1.01] hover:shadow-professional"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  activeTab === "transport" ? "bg-white/20" : "bg-primary/10"
                }`}
              >
                <Bus className={`w-5 h-5 ${activeTab === "transport" ? "text-white" : "text-primary"}`} />
              </div>
              {isSidebarOpen && <span className="text-base">Ulaşım Yönetimi</span>}
            </button>

            <button
              onClick={() => setActiveTab("waste")}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl font-semibold transition-all ${
                activeTab === "waste"
                  ? "bg-gradient-to-r from-primary to-primary/90 text-white shadow-elevated scale-[1.02]"
                  : "text-muted-foreground hover:bg-gradient-to-r hover:from-accent/50 hover:to-accent/30 hover:text-foreground hover:scale-[1.01] hover:shadow-professional"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  activeTab === "waste" ? "bg-white/20" : "bg-secondary/10"
                }`}
              >
                <Trash2 className={`w-5 h-5 ${activeTab === "waste" ? "text-white" : "text-secondary"}`} />
              </div>
              {isSidebarOpen && <span className="text-base">Atık Yönetimi</span>}
            </button>

            {isSidebarOpen && <div className="border-t border-border/50 my-4"></div>}

            <button
              onClick={() => router.push("/alarm-history")}
              className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-muted-foreground hover:bg-gradient-to-r hover:from-accent/50 hover:to-accent/30 hover:text-foreground font-semibold transition-all hover:scale-[1.01] hover:shadow-professional"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5 text-orange-500" />
              </div>
              {isSidebarOpen && <span className="text-base">Alarm Geçmişi</span>}
            </button>

            <button
              onClick={() => router.push("/reports")}
              className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-muted-foreground hover:bg-gradient-to-r hover:from-accent/50 hover:to-accent/30 hover:text-foreground font-semibold transition-all hover:scale-[1.01] hover:shadow-professional"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                <BarChart3 className="w-5 h-5 text-purple-500" />
              </div>
              {isSidebarOpen && <span className="text-base">Raporlar</span>}
            </button>
          </nav>

          <div className="space-y-2 mt-auto pt-6 border-t border-border/50">
            <button className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-muted-foreground hover:bg-gradient-to-r hover:from-accent/50 hover:to-accent/30 hover:text-foreground font-semibold transition-all hover:scale-[1.01] hover:shadow-professional">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                <Settings className="w-5 h-5 text-muted-foreground" />
              </div>
              {isSidebarOpen && <span className="text-base">Ayarlar</span>}
            </button>

            <button className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-muted-foreground hover:bg-gradient-to-r hover:from-accent/50 hover:to-accent/30 hover:text-foreground font-semibold transition-all hover:scale-[1.01] hover:shadow-professional">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                <HelpCircle className="w-5 h-5 text-muted-foreground" />
              </div>
              {isSidebarOpen && <span className="text-base">Yardım</span>}
            </button>

            {isSidebarOpen && (
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
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-4 top-10 w-9 h-9 bg-white border-2 border-primary/20 rounded-full flex items-center justify-center text-primary hover:text-white hover:bg-primary hover:border-primary transition-all shadow-elevated hover:shadow-prominent hover:scale-110"
        >
          <span className="text-lg font-bold">{isSidebarOpen ? "‹" : "›"}</span>
        </button>
      </div>

      <div className={`transition-all duration-300 ${isSidebarOpen ? "ml-72" : "ml-20"}`}>
        <div className="p-8 lg:p-10">
          {activeTab === "energy" && <EnergyDashboard />}
          {activeTab === "transport" && <TransportDashboard />}
          {activeTab === "waste" && <WasteDashboard />}
        </div>
      </div>
    </div>
  )
}
