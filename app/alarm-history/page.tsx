"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Zap, Route, Trash2, Clock, Filter, Search, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import { format, formatDistanceToNow } from "date-fns"
import { tr } from "date-fns/locale"

type AlarmType = "all" | "energy" | "transport" | "waste"
type AlarmSeverity = "all" | "high" | "medium" | "low"

const alarmData = [
  {
    id: 1,
    type: "energy",
    severity: "high",
    title: "Hafta Sonu Yüksek Tüketim",
    description: "Mühendislik Fakültesi'nde normalin üzerinde tüketim tespit edildi.",
    time: "2 saat önce",
    date: "28 Kasım 2024, 12:30",
    status: "active",
  },
  {
    id: 2,
    type: "energy",
    severity: "medium",
    title: "Kaçak Şüphesi",
    description: "Kütüphane Binası su sisteminde anomali saptandı.",
    time: "8 saat önce",
    date: "28 Kasım 2024, 06:30",
    status: "active",
  },
  {
    id: 3,
    type: "transport",
    severity: "high",
    title: "Hız Aşımı",
    description: "Ana Bulvar'da hız sınırı aşıldı",
    time: "2 dk önce",
    date: "28 Kasım 2024, 14:30",
    status: "active",
  },
  {
    id: 4,
    type: "transport",
    severity: "medium",
    title: "Rota Sapması",
    description: "Araç, Kütüphane rotasından saptı",
    time: "5 dk önce",
    date: "28 Kasım 2024, 14:27",
    status: "active",
  },
  {
    id: 5,
    type: "waste",
    severity: "high",
    title: "Kutu Doluluk Uyarısı",
    description: "Kutu #112 (Bölge D) kritik doluluk seviyesinde",
    time: "15 dk önce",
    date: "28 Kasım 2024, 14:17",
    status: "active",
  },
  {
    id: 6,
    type: "energy",
    severity: "low",
    title: "Aşırı Tüketim Uyarısı",
    description: "Spor Salonu anlık tüketim limiti aşıldı.",
    time: "1 gün önce",
    date: "27 Kasım 2024, 14:32",
    status: "resolved",
  },
  {
    id: 7,
    type: "transport",
    severity: "low",
    title: "Bakım Hatırlatması",
    description: "Yakında yağ değişimi zamanı",
    time: "2 gün önce",
    date: "26 Kasım 2024, 10:15",
    status: "resolved",
  },
]

export default function AlarmHistoryPage() {
  const [filterType, setFilterType] = useState<AlarmType>("all")
  const [filterSeverity, setFilterSeverity] = useState<AlarmSeverity>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [page, setPage] = useState(1)
  const pageSize = 8
  const [nowTick, setNowTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setNowTick((t) => t + 1), 60000)
    return () => clearInterval(id)
  }, [])

  const filteredAlarms = alarmData.filter((alarm) => {
    const matchesType = filterType === "all" || alarm.type === filterType
    const matchesSeverity = filterSeverity === "all" || alarm.severity === filterSeverity
    const matchesSearch =
      searchQuery === "" ||
      alarm.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alarm.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSeverity && matchesSearch
  })

  const getAlarmIcon = (type: string) => {
    switch (type) {
      case "energy":
        return <Zap className="w-5 h-5" />
      case "transport":
        return <Route className="w-5 h-5" />
      case "waste":
        return <Trash2 className="w-5 h-5" />
      default:
        return <AlertTriangle className="w-5 h-5" />
    }
  }

  const getAlarmColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500/10 border-red-500"
      case "medium":
        return "bg-orange-500/10 border-orange-500"
      case "low":
        return "bg-muted/50 border-muted-foreground"
      default:
        return "bg-muted/50 border-muted-foreground"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "energy":
        return "Enerji"
      case "transport":
        return "Ulaşım"
      case "waste":
        return "Atık"
      default:
        return type
    }
  }

  const totalPages = Math.max(1, Math.ceil(filteredAlarms.length / pageSize))
  const pagedAlarms = filteredAlarms.slice((page - 1) * pageSize, page * pageSize)

  const now = new Date()
  const alarmTimestamps: Record<number, Date> = {
    1: new Date(now.getTime() - 2 * 60 * 60 * 1000),
    2: new Date(now.getTime() - 8 * 60 * 60 * 1000),
    3: new Date(now.getTime() - 2 * 60 * 1000),
    4: new Date(now.getTime() - 5 * 60 * 1000),
    5: new Date(now.getTime() - 15 * 60 * 1000),
    6: new Date(now.getTime() - 24 * 60 * 60 * 1000),
    7: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">Alarm Geçmişi</h1>
            <p className="text-muted-foreground mt-1">Tüm sistem alarmlarını görüntüleyin ve yönetin</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Toplam Alarm</p>
            <p className="text-xl font-semibold text-foreground">{alarmData.length}</p>
          </div>
        </div>

        {/* Filters */}
        <Card className="bg-card border-border p-4 md:p-6">
          <div className="flex items-center gap-3 md:gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium">Filtrele</span>
            </div>

            {/* Type Filter */}
            <div className="flex gap-1.5">
              <Button variant={filterType === "all" ? "default" : "outline"} size="sm" onClick={() => { setPage(1); setFilterType("all") }}>
                Tümü
              </Button>
              <Button variant={filterType === "energy" ? "default" : "outline"} size="sm" onClick={() => { setPage(1); setFilterType("energy") }}>
                <Zap className="w-4 h-4 mr-1" />
                Enerji
              </Button>
              <Button variant={filterType === "transport" ? "default" : "outline"} size="sm" onClick={() => { setPage(1); setFilterType("transport") }}>
                <Route className="w-4 h-4 mr-1" />
                Ulaşım
              </Button>
              <Button variant={filterType === "waste" ? "default" : "outline"} size="sm" onClick={() => { setPage(1); setFilterType("waste") }}>
                <Trash2 className="w-4 h-4 mr-1" />
                Atık
              </Button>
            </div>

            {/* Severity Filter */}
            <div className="flex gap-1.5">
              <Button variant={filterSeverity === "all" ? "default" : "outline"} size="sm" onClick={() => { setPage(1); setFilterSeverity("all") }}>
                Tüm Seviyeler
              </Button>
              <Button variant={filterSeverity === "high" ? "default" : "outline"} size="sm" onClick={() => { setPage(1); setFilterSeverity("high") }} className={filterSeverity === "high" ? "" : ""}>
                Yüksek
              </Button>
              <Button variant={filterSeverity === "medium" ? "default" : "outline"} size="sm" onClick={() => { setPage(1); setFilterSeverity("medium") }}>
                Orta
              </Button>
              <Button variant={filterSeverity === "low" ? "default" : "outline"} size="sm" onClick={() => { setPage(1); setFilterSeverity("low") }}>
                Düşük
              </Button>
            </div>

            {/* Search */}
            <div className="flex-1 min-w-[220px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Alarm ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Alarms Table */}
        <Card className="bg-card border-border overflow-hidden">
          <div className="relative w-full overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr className="text-left">
                  <th className="px-4 py-3 font-medium">Alarm</th>
                  <th className="px-4 py-3 font-medium">Tür</th>
                  <th className="px-4 py-3 font-medium">Öncelik</th>
                  <th className="px-4 py-3 font-medium">Durum</th>
                  <th className="px-4 py-3 font-medium">Zaman</th>
                  <th className="px-4 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {pagedAlarms.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <AlertTriangle className="w-10 h-10 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Seçili filtrelerle eşleşen alarm bulunamadı.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  pagedAlarms.map((alarm) => (
                    <tr key={alarm.id} className="border-t border-border/70 hover:bg-accent/30">
                      <td className="px-4 py-3">
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                              alarm.severity === "high"
                                ? "bg-red-500/15 text-red-500"
                                : alarm.severity === "medium"
                                  ? "bg-orange-500/15 text-orange-500"
                                  : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {getAlarmIcon(alarm.type)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-foreground">{alarm.title}</span>
                            </div>
                            <p className="text-muted-foreground line-clamp-1">{alarm.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge className="bg-primary/10 text-primary border border-primary/30">{getTypeLabel(alarm.type)}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          className={
                            alarm.severity === "high"
                              ? "bg-red-500/15 text-red-600 border border-red-400/40"
                              : alarm.severity === "medium"
                                ? "bg-orange-500/15 text-orange-600 border border-orange-400/40"
                                : "bg-muted text-muted-foreground border"
                          }
                        >
                          {alarm.severity === "high" ? "Yüksek" : alarm.severity === "medium" ? "Orta" : "Düşük"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          className={
                            alarm.status === "active"
                              ? "bg-orange-500/15 text-orange-700 border border-orange-400/40"
                              : "bg-secondary/20 text-secondary border border-secondary/50"
                          }
                        >
                          {alarm.status === "active" ? "Aktif" : "Çözüldü"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span suppressHydrationWarning>
                            {formatDistanceToNow(alarmTimestamps[alarm.id as keyof typeof alarmTimestamps] ?? now, {
                              addSuffix: true,
                              locale: tr,
                            })}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground/80" suppressHydrationWarning>
                          {format(alarmTimestamps[alarm.id as keyof typeof alarmTimestamps] ?? now, "d MMMM yyyy, HH:mm", {
                            locale: tr,
                          })}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {alarm.status === "active" && (
                          <Button size="sm">İncele</Button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-4 py-3 border-t border-border/70">
            <p className="text-xs text-muted-foreground">
              {filteredAlarms.length} kayıt • Sayfa {page}/{totalPages}
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
                <ChevronLeft className="w-4 h-4 mr-1" />
                Geri
              </Button>
              <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                İleri
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
