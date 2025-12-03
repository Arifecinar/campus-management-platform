"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Zap,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Activity,
  Building2,
  Download,
  Printer,
  Maximize2,
} from "lucide-react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const dailyEnergyData = [
  { month: "Pzt", tuketim: 850, tasarruf: 720 },
  { month: "Sal", tuketim: 920, tasarruf: 780 },
  { month: "Çar", tuketim: 780, tasarruf: 850 },
  { month: "Per", tuketim: 690, tasarruf: 910 },
  { month: "Cum", tuketim: 720, tasarruf: 950 },
  { month: "Cmt", tuketim: 450, tasarruf: 720 },
  { month: "Paz", tuketim: 380, tasarruf: 680 },
]

const weeklyEnergyData = [
  { month: "Hafta 1", tuketim: 5200, tasarruf: 4800 },
  { month: "Hafta 2", tuketim: 5600, tasarruf: 5200 },
  { month: "Hafta 3", tuketim: 4900, tasarruf: 5400 },
  { month: "Hafta 4", tuketim: 5100, tasarruf: 5600 },
]

const monthlyEnergyData = [
  { month: "Oca", tuketim: 21500, tasarruf: 19200 },
  { month: "Şub", tuketim: 22300, tasarruf: 20100 },
  { month: "Mar", tuketim: 19800, tasarruf: 21500 },
  { month: "Nis", tuketim: 18900, tasarruf: 22800 },
  { month: "May", tuketim: 20100, tasarruf: 23500 },
  { month: "Haz", tuketim: 19200, tasarruf: 24200 },
]

const buildingData = [
  { name: "Fen Fakültesi", consumption: 185, status: "high" },
  { name: "Mühendislik", consumption: 165, status: "normal" },
  { name: "Tıp Fakültesi", consumption: 145, status: "normal" },
  { name: "İdari Bina", consumption: 98, status: "low" },
  { name: "Kütüphane", consumption: 87, status: "low" },
]

export function EnergyDashboard() {
  const [timeframe, setTimeframe] = useState<"daily" | "weekly" | "monthly">("daily")

  const getEnergyData = () => {
    switch (timeframe) {
      case "daily":
        return dailyEnergyData
      case "weekly":
        return weeklyEnergyData
      case "monthly":
        return monthlyEnergyData
      default:
        return dailyEnergyData
    }
  }

  const handleTimeframeChange = (newTimeframe: "daily" | "weekly" | "monthly") => {
    setTimeframe(newTimeframe)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground tracking-tight">Enerji Yönetim Paneli</h1>
          <p className="text-muted-foreground text-lg">Kampüs geneli enerji tüketimi ve analizi</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Dışa Aktar
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Printer className="w-4 h-4" />
              Yazdır
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Maximize2 className="w-4 h-4" />
              Tam Ekran
            </Button>
          </div>

          <div className="flex gap-2 bg-white border border-border rounded-xl p-1.5 shadow-professional">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleTimeframeChange("daily")}
              className={`px-5 py-2.5 font-semibold transition-all h-auto ${
                timeframe === "daily"
                  ? "bg-gradient-to-r from-secondary to-secondary/90 text-white shadow-elevated hover:bg-secondary"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
              }`}
            >
              Günlük
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleTimeframeChange("weekly")}
              className={`px-5 py-2.5 font-semibold transition-all h-auto ${
                timeframe === "weekly"
                  ? "bg-gradient-to-r from-secondary to-secondary/90 text-white shadow-elevated hover:bg-secondary"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
              }`}
            >
              Haftalık
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleTimeframeChange("monthly")}
              className={`px-5 py-2.5 font-semibold transition-all h-auto ${
                timeframe === "monthly"
                  ? "bg-gradient-to-r from-secondary to-secondary/90 text-white shadow-elevated hover:bg-secondary"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
              }`}
            >
              Aylık
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white border-border p-6 shadow-elevated hover:shadow-prominent transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-muted-foreground text-sm font-medium">Toplam Anlık Tüketim</span>
            <div className="w-11 h-11 rounded-xl bg-yellow-50 flex items-center justify-center">
              <Zap className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
          <div className="text-4xl font-bold text-foreground mb-2 tracking-tight">1.2 MW</div>
          <div className="flex items-center gap-1.5 text-secondary text-sm font-medium">
            <TrendingUp className="w-4 h-4" />
            <span>+2.1%</span>
            <span className="text-muted-foreground text-xs ml-1">son hafta</span>
          </div>
        </Card>

        <Card className="bg-white border-border p-6 shadow-elevated hover:shadow-prominent transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-muted-foreground text-sm font-medium">Günlük Tasarruf Oranı</span>
            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="text-4xl font-bold text-foreground mb-2 tracking-tight">15%</div>
          <div className="flex items-center gap-1.5 text-red-500 text-sm font-medium">
            <TrendingDown className="w-4 h-4" />
            <span>-0.5%</span>
            <span className="text-muted-foreground text-xs ml-1">geçen aya göre</span>
          </div>
        </Card>

        <Card className="bg-white border-border p-6 shadow-elevated hover:shadow-prominent transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-muted-foreground text-sm font-medium">Tasarruf Edilen Miktar</span>
            <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-secondary" />
            </div>
          </div>
          <div className="text-4xl font-bold text-foreground mb-2 tracking-tight">₺12,450</div>
          <div className="flex items-center gap-1.5 text-secondary text-sm font-medium">
            <TrendingUp className="w-4 h-4" />
            <span>+₺300</span>
            <span className="text-muted-foreground text-xs ml-1">bu ay</span>
          </div>
        </Card>

        <Card className="bg-white border-border p-6 shadow-elevated hover:shadow-prominent transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-muted-foreground text-sm font-medium">Aktif Alarm Sayısı</span>
            <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-orange-500" />
            </div>
          </div>
          <div className="text-4xl font-bold text-foreground mb-2 tracking-tight">3</div>
          <div className="flex items-center gap-1.5 text-orange-500 text-sm font-medium">
            <TrendingUp className="w-4 h-4" />
            <span>+1</span>
            <span className="text-muted-foreground text-xs ml-1">son 2 saat</span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-white border-border p-7 shadow-elevated">
          <h3 className="text-2xl font-bold text-foreground mb-5 tracking-tight">Canlı Enerji Tüketimi Haritası</h3>
          <div className="relative w-full h-[500px] bg-accent/20 rounded-2xl overflow-hidden border-2 border-border/50">
            <img
              src="/pamukkale-campus-map.png"
              alt="Pamukkale Üniversitesi Kampüs Haritası"
              className="w-full h-full object-contain"
            />
            <div className="absolute top-[28%] left-[22%] w-20 h-20 bg-red-500/30 border-4 border-red-500 rounded-2xl flex items-center justify-center animate-pulse shadow-prominent backdrop-blur-sm">
              <div className="text-center">
                <Building2 className="w-10 h-10 text-red-500 mx-auto mb-1" />
                <span className="text-xs font-bold text-red-500">Tıp</span>
              </div>
            </div>
            <div className="absolute top-[42%] left-[48%] w-16 h-16 bg-yellow-500/30 border-4 border-yellow-500 rounded-2xl flex items-center justify-center shadow-elevated backdrop-blur-sm">
              <div className="text-center">
                <Building2 className="w-8 h-8 text-yellow-500 mx-auto mb-1" />
                <span className="text-xs font-bold text-yellow-500">Müh.</span>
              </div>
            </div>
            <div className="absolute top-[52%] left-[33%] w-14 h-14 bg-secondary/30 border-4 border-secondary rounded-2xl flex items-center justify-center shadow-elevated backdrop-blur-sm">
              <div className="text-center">
                <Building2 className="w-7 h-7 text-secondary mx-auto" />
                <span className="text-xs font-bold text-secondary">İdari</span>
              </div>
            </div>
            <div className="absolute top-[62%] left-[58%] w-14 h-14 bg-secondary/30 border-4 border-secondary rounded-2xl flex items-center justify-center shadow-elevated backdrop-blur-sm">
              <div className="text-center">
                <Building2 className="w-7 h-7 text-secondary mx-auto" />
                <span className="text-xs font-bold text-secondary">Fen</span>
              </div>
            </div>
            <div className="absolute bottom-6 left-6 bg-white/98 backdrop-blur-sm p-5 rounded-2xl border-2 border-border/50 shadow-elevated">
              <div className="flex items-center gap-5 text-sm font-semibold">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-red-500 rounded-lg shadow-professional"></div>
                  <span className="text-foreground">Yüksek Tüketim</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-yellow-500 rounded-lg shadow-professional"></div>
                  <span className="text-foreground">Normal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-secondary rounded-lg shadow-professional"></div>
                  <span className="text-foreground">Düşük</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-white border-border p-7 shadow-elevated">
          <h3 className="text-2xl font-bold text-foreground mb-5 tracking-tight">Otomatik Alarmlar</h3>
          <div className="space-y-4">
            <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-5 shadow-professional hover:shadow-elevated transition-all">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-foreground text-base mb-1.5">Hafta Sonu Yüksek Tüketim</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Mühendislik Fakültesi'nde normalin üzerinde tüketim tespit edildi.
                  </p>
                  <span className="text-xs text-muted-foreground/70 mt-2 block font-medium">2 saat önce</span>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 rounded-xl p-5 shadow-professional hover:shadow-elevated transition-all">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-foreground text-base mb-1.5">Kaçak Şüphesi</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Kütüphane Binası su sisteminde anomali saptandı.
                  </p>
                  <span className="text-xs text-muted-foreground/70 mt-2 block font-medium">8 saat önce</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-xl p-5 shadow-professional hover:shadow-elevated transition-all">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-foreground text-base mb-1.5">Aşırı Tüketim Uyarısı</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Spor Salonu anlık tüketim limiti aşıldı.
                  </p>
                  <span className="text-xs text-muted-foreground/70 mt-2 block font-medium">1 gün önce</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border-border p-7 shadow-elevated">
          <h3 className="text-2xl font-bold text-foreground mb-5 tracking-tight">Bina Bazlı Anlık Tüketim</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={buildingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 13, fontWeight: 500 }}
                angle={-15}
                textAnchor="end"
                height={90}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))", fontWeight: 500 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  color: "hsl(var(--foreground))",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  padding: "12px",
                }}
              />
              <Bar dataKey="consumption" fill="hsl(var(--primary))" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="bg-white border-border p-7 shadow-elevated">
          <h3 className="text-2xl font-bold text-foreground mb-5 tracking-tight">
            {timeframe === "daily" && "Günlük Enerji Tasarruf Raporu"}
            {timeframe === "weekly" && "Haftalık Enerji Tasarruf Raporu"}
            {timeframe === "monthly" && "Aylık Enerji Tasarruf Raporu"}
          </h3>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={getEnergyData()}>
              <defs>
                <linearGradient id="colorTuketim" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorTasarruf" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="month"
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))", fontWeight: 500 }}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))", fontWeight: 500 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  color: "hsl(var(--foreground))",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  padding: "12px",
                }}
              />
              <Legend wrapperStyle={{ paddingTop: "20px" }} />
              <Area
                type="monotone"
                dataKey="tuketim"
                stroke="#ef4444"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorTuketim)"
                name="Tüketim (kWh)"
              />
              <Area
                type="monotone"
                dataKey="tasarruf"
                stroke="hsl(var(--secondary))"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorTasarruf)"
                name="Tasarruf (kWh)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}
