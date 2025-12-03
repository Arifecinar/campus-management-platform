"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Zap, Route, Trash2, Clock, Filter, Search, Home } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-primary hover:text-white border-2 border-border hover:border-primary transition-all shadow-professional hover:shadow-elevated group"
            >
              <Home className="w-5 h-5" />
              <span className="font-semibold text-sm">Anasayfa</span>
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-foreground tracking-tight">Alarm Geçmişi</h1>
              <p className="text-muted-foreground text-lg mt-1">Tüm sistem alarmlarını görüntüleyin ve yönetin</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Toplam Alarm</p>
            <p className="text-2xl font-bold text-foreground">{alarmData.length}</p>
          </div>
        </div>

        {/* Filters */}
        <Card className="bg-white border-border p-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-semibold text-foreground">Filtrele:</span>
            </div>

            {/* Type Filter */}
            <div className="flex gap-2">
              <Badge
                onClick={() => setFilterType("all")}
                className={`cursor-pointer px-4 py-2 ${
                  filterType === "all"
                    ? "bg-primary text-primary-foreground"
                    : "bg-white border border-border text-muted-foreground hover:bg-accent"
                }`}
              >
                Tümü
              </Badge>
              <Badge
                onClick={() => setFilterType("energy")}
                className={`cursor-pointer px-4 py-2 ${
                  filterType === "energy"
                    ? "bg-primary text-primary-foreground"
                    : "bg-white border border-border text-muted-foreground hover:bg-accent"
                }`}
              >
                <Zap className="w-4 h-4 mr-1" />
                Enerji
              </Badge>
              <Badge
                onClick={() => setFilterType("transport")}
                className={`cursor-pointer px-4 py-2 ${
                  filterType === "transport"
                    ? "bg-primary text-primary-foreground"
                    : "bg-white border border-border text-muted-foreground hover:bg-accent"
                }`}
              >
                <Route className="w-4 h-4 mr-1" />
                Ulaşım
              </Badge>
              <Badge
                onClick={() => setFilterType("waste")}
                className={`cursor-pointer px-4 py-2 ${
                  filterType === "waste"
                    ? "bg-primary text-primary-foreground"
                    : "bg-white border border-border text-muted-foreground hover:bg-accent"
                }`}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Atık
              </Badge>
            </div>

            {/* Severity Filter */}
            <div className="flex gap-2">
              <Badge
                onClick={() => setFilterSeverity("all")}
                className={`cursor-pointer px-4 py-2 ${
                  filterSeverity === "all"
                    ? "bg-primary text-primary-foreground"
                    : "bg-white border border-border text-muted-foreground hover:bg-accent"
                }`}
              >
                Tüm Seviyeler
              </Badge>
              <Badge
                onClick={() => setFilterSeverity("high")}
                className={`cursor-pointer px-4 py-2 ${
                  filterSeverity === "high"
                    ? "bg-red-500 text-white"
                    : "bg-white border border-red-300 text-red-600 hover:bg-red-50"
                }`}
              >
                Yüksek
              </Badge>
              <Badge
                onClick={() => setFilterSeverity("medium")}
                className={`cursor-pointer px-4 py-2 ${
                  filterSeverity === "medium"
                    ? "bg-orange-500 text-white"
                    : "bg-white border border-orange-300 text-orange-600 hover:bg-orange-50"
                }`}
              >
                Orta
              </Badge>
              <Badge
                onClick={() => setFilterSeverity("low")}
                className={`cursor-pointer px-4 py-2 ${
                  filterSeverity === "low"
                    ? "bg-gray-500 text-white"
                    : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                Düşük
              </Badge>
            </div>

            {/* Search */}
            <div className="flex-1 min-w-[250px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Alarm ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Alarms List */}
        <div className="space-y-3">
          {filteredAlarms.length === 0 ? (
            <Card className="bg-white border-border p-12 text-center">
              <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Alarm Bulunamadı</h3>
              <p className="text-muted-foreground">Seçili filtrelerle eşleşen alarm bulunmamaktadır.</p>
            </Card>
          ) : (
            filteredAlarms.map((alarm) => (
              <Card key={alarm.id} className={`border-l-4 ${getAlarmColor(alarm.severity)} p-6`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                        alarm.severity === "high"
                          ? "bg-red-500/20 text-red-400"
                          : alarm.severity === "medium"
                            ? "bg-orange-500/20 text-orange-400"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {getAlarmIcon(alarm.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{alarm.title}</h3>
                        <Badge
                          className={`text-xs ${
                            alarm.status === "active"
                              ? "bg-orange-500/20 text-orange-600 border border-orange-500/50"
                              : "bg-secondary/20 text-secondary border border-secondary/50"
                          }`}
                        >
                          {alarm.status === "active" ? "Aktif" : "Çözüldü"}
                        </Badge>
                        <Badge className="bg-primary/10 text-primary border border-primary/30 text-xs">
                          {getTypeLabel(alarm.type)}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">{alarm.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{alarm.time}</span>
                        </div>
                        <span className="text-muted-foreground/50">•</span>
                        <span className="text-muted-foreground">{alarm.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {alarm.status === "active" && (
                      <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-medium transition-colors">
                        İncele
                      </button>
                    )}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
