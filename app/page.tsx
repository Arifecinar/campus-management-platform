"use client"

import { Suspense, useEffect, useState } from "react"
import { EnergyDashboard } from "@/components/energy-dashboard"
import { TransportDashboard } from "@/components/transport-dashboard"
import { WasteDashboard } from "@/components/waste-dashboard"
import { useSearchParams } from "next/navigation"

export default function CampusDashboard() {
  return (
    <Suspense fallback={<div className="p-6 lg:p-8">Yükleniyor...</div>}>
      <HomeContent />
    </Suspense>
  )
}

function HomeContent() {
  const searchParams = useSearchParams()
  const qpTab = searchParams.get("tab") as "energy" | "transport" | "waste" | null
  const [activeTab, setActiveTab] = useState<"energy" | "transport" | "waste">("energy")

  useEffect(() => {
    if (qpTab && ["energy", "transport", "waste"].includes(qpTab)) {
      setActiveTab(qpTab)
    }
  }, [qpTab])

  return (
    <div className="text-foreground">
      <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
          {activeTab === "energy" && <EnergyDashboard />}
          {activeTab === "transport" && <TransportDashboard />}
          {activeTab === "waste" && <WasteDashboard />}
      </div>
    </div>
  )
}
