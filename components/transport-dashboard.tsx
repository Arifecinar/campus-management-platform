"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Bus,
  MapPin,
  Clock,
  AlertTriangle,
  TrendingUp,
  Users,
  Route,
  Gauge,
  Download,
  Printer,
  Maximize2,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
} from "recharts"

export function TransportDashboard() {
  const [selectedHour, setSelectedHour] = useState(14)

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground tracking-tight">Ulaşım Yönetim Paneli</h1>
          <p className="text-muted-foreground text-lg">Filo takibi ve trafik analizi</p>
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
          <div className="text-right bg-white border border-border rounded-xl px-5 py-3 shadow-professional">
            <p className="text-xs text-muted-foreground font-medium mb-0.5">Son Güncelleme</p>
            <p className="text-foreground font-bold text-lg tracking-tight">14:32</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white border-border p-6 shadow-elevated hover:shadow-prominent transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-muted-foreground text-sm font-medium">Aktif Araçlar</span>
            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
              <Bus className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="text-4xl font-bold text-foreground tracking-tight">12</div>
        </Card>

        <Card className="bg-white border-border p-6 shadow-elevated hover:shadow-prominent transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-muted-foreground text-sm font-medium">Devam Eden Alarmlar</span>
            <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-orange-500" />
            </div>
          </div>
          <div className="text-4xl font-bold text-foreground tracking-tight">3</div>
        </Card>

        <Card className="bg-white border-border p-6 shadow-elevated hover:shadow-prominent transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-muted-foreground text-sm font-medium">Ortalama Gecikme</span>
            <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center">
              <Clock className="w-6 h-6 text-red-500" />
            </div>
          </div>
          <div className="text-4xl font-bold text-foreground mb-2 tracking-tight">4 dk</div>
          <div className="flex items-center gap-1.5 text-red-500 text-sm font-medium">
            <TrendingUp className="w-4 h-4" />
            <span>-5%</span>
            <span className="text-muted-foreground text-xs ml-1">iyileşme</span>
          </div>
        </Card>

        <Card className="bg-white border-border p-6 shadow-elevated hover:shadow-prominent transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-muted-foreground text-sm font-medium">Toplam İhlaller (Bugün)</span>
            <div className="w-11 h-11 rounded-xl bg-yellow-50 flex items-center justify-center">
              <Gauge className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
          <div className="text-4xl font-bold text-foreground mb-2 tracking-tight">8</div>
          <div className="flex items-center gap-1.5 text-secondary text-sm font-medium">
            <TrendingUp className="w-4 h-4" />
            <span>+20%</span>
            <span className="text-muted-foreground text-xs ml-1">dünkü artış</span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-white border-border p-7 shadow-elevated">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-2xl font-bold text-foreground tracking-tight">Canlı Konum Takibi</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Araç veya konum ara"
                className="bg-muted border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary font-medium"
              />
            </div>
          </div>
          <div className="relative w-full h-[500px] bg-accent/20 rounded-2xl overflow-hidden border-2 border-border/50">
            <img
              src="/pamukkale-campus-map.png"
              alt="Pamukkale Üniversitesi Kampüs Haritası"
              className="w-full h-full object-contain"
            />

            <div className="absolute top-[25%] left-[35%] w-5 h-5 bg-primary rounded-full border-4 border-white animate-pulse shadow-lg shadow-primary/50">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white px-2 py-1 rounded-lg text-xs font-bold whitespace-nowrap shadow-elevated">
                Ring 1
              </div>
            </div>
            <div className="absolute top-[45%] left-[55%] w-5 h-5 bg-primary rounded-full border-4 border-white animate-pulse shadow-lg shadow-primary/50">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white px-2 py-1 rounded-lg text-xs font-bold whitespace-nowrap shadow-elevated">
                Ring 2
              </div>
            </div>
            <div className="absolute top-[60%] left-[30%] w-5 h-5 bg-primary rounded-full border-4 border-white animate-pulse shadow-lg shadow-primary/50">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white px-2 py-1 rounded-lg text-xs font-bold whitespace-nowrap shadow-elevated">
                Ring 3
              </div>
            </div>
            <div className="absolute top-[35%] left-[70%] w-5 h-5 bg-red-500 rounded-full border-4 border-white animate-pulse shadow-lg shadow-red-500/50">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold whitespace-nowrap shadow-elevated">
                Ring 4 ⚠️
              </div>
            </div>

            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <path
                d="M 280 150 Q 400 200 440 280 Q 380 350 240 380"
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                fill="none"
                strokeDasharray="8,4"
                opacity="0.6"
              />
            </svg>

            <div className="absolute bottom-6 left-6 right-6 bg-white/98 backdrop-blur-sm p-5 rounded-2xl border-2 border-border/50 shadow-elevated">
              <h4 className="text-foreground font-bold mb-3 text-base">Trafik Yoğunluk Analizi</h4>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Farklı zamanlar için trafik ısı haritalarını görmek için kaydırıcıyı kullanın.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <input
                  type="range"
                  min="8"
                  max="17"
                  value={selectedHour}
                  onChange={(e) => setSelectedHour(Number(e.target.value))}
                  className="flex-1 accent-primary h-2 rounded-lg"
                />
                <div className="min-w-[80px] bg-primary text-primary-foreground px-4 py-2.5 rounded-xl font-bold text-center shadow-professional">
                  {selectedHour}:00
                </div>
              </div>
            </div>

            <div className="absolute top-6 right-6 flex flex-col gap-2">
              <button className="w-11 h-11 bg-white/95 hover:bg-white border border-border rounded-xl flex items-center justify-center text-foreground transition-all shadow-professional hover:shadow-elevated font-bold text-lg">
                +
              </button>
              <button className="w-11 h-11 bg-white/95 hover:bg-white border border-border rounded-xl flex items-center justify-center text-foreground transition-all shadow-professional hover:shadow-elevated font-bold text-lg">
                −
              </button>
              <button className="w-11 h-11 bg-white/95 hover:bg-white border border-border rounded-xl flex items-center justify-center text-foreground transition-all shadow-professional hover:shadow-elevated">
                <MapPin className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Card>

        <Card className="bg-white border-border p-7 shadow-elevated">
          <h3 className="text-2xl font-bold text-foreground mb-5 tracking-tight">Canlı Alarmlar</h3>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-5 shadow-professional hover:shadow-elevated transition-all">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
                  <Gauge className="w-6 h-6 text-red-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-foreground text-base mb-1.5">Hız Aşımı</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">Ana Bulvar'da hız sınırı aşıldı</p>
                  <span className="text-xs text-muted-foreground/70 mt-2 block font-medium">2 dk önce</span>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 rounded-xl p-5 shadow-professional hover:shadow-elevated transition-all">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-orange-500/20 flex items-center justify-center shrink-0">
                  <Route className="w-6 h-6 text-orange-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-foreground text-base mb-1.5">Rota Sapması</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">Araç, Kütüphane rotasından saptı</p>
                  <span className="text-xs text-muted-foreground/70 mt-2 block font-medium">5 dk önce</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-xl p-5 shadow-professional hover:shadow-elevated transition-all">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-yellow-500/20 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-6 h-6 text-yellow-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-foreground text-base mb-1.5">Gecikme Uyarısı</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">Programın 7 dakika gerisinde</p>
                  <span className="text-xs text-muted-foreground/70 mt-2 block font-medium">8 dk önce</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-xl p-5 shadow-professional hover:shadow-elevated transition-all">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-foreground text-base mb-1.5">Hız Aşımı</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">Yurtlar yakınında hız limiti aşıldı</p>
                  <span className="text-xs text-muted-foreground/70 mt-2 block font-medium">12 dk önce</span>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 border-l-4 border-muted-foreground/30 rounded-xl p-5 shadow-professional hover:shadow-elevated transition-all">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-foreground text-base mb-1.5">Bakım Hatırlatması</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">Yakında yağ değişimi zamanı</p>
                  <span className="text-xs text-muted-foreground/70 mt-2 block font-medium">22 dk önce</span>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 border-l-4 border-muted-foreground/30 rounded-xl p-5 shadow-professional hover:shadow-elevated transition-all">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  <Route className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-foreground text-base mb-1.5">Rota Tamamlandı</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">Stadyum yakınında durak tamamlandı</p>
                  <span className="text-xs text-muted-foreground/70 mt-2 block font-medium">30 dk önce</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border-border p-7 shadow-elevated">
          <h3 className="text-2xl font-bold text-foreground mb-5 tracking-tight">Trafik Yoğunluk Analizi (Saatlik)</h3>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart
              data={[
                { time: "08:00", yogunluk: 35 },
                { time: "09:00", yogunluk: 78 },
                { time: "10:00", yogunluk: 45 },
                { time: "11:00", yogunluk: 32 },
                { time: "12:00", yogunluk: 89 },
                { time: "13:00", yogunluk: 92 },
                { time: "14:00", yogunluk: 68 },
                { time: "15:00", yogunluk: 55 },
                { time: "16:00", yogunluk: 82 },
                { time: "17:00", yogunluk: 95 },
              ]}
            >
              <defs>
                <linearGradient id="colorYogunluk" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="time"
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
              <Area
                type="monotone"
                dataKey="yogunluk"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorYogunluk)"
                name="Yoğunluk %"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="bg-white border-border p-7 shadow-elevated">
          <h3 className="text-2xl font-bold text-foreground mb-5 tracking-tight">Hız İhlalleri & Limitler</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={[
                { vehicle: "Ring 1", speed: 45, limit: 50 },
                { vehicle: "Ring 2", speed: 38, limit: 50 },
                { vehicle: "Ring 3", speed: 58, limit: 50 },
                { vehicle: "Ring 4", speed: 42, limit: 50 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="vehicle"
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
              <Bar dataKey="speed" fill="#ef4444" radius={[10, 10, 0, 0]} name="Mevcut Hız (km/h)" />
              <Bar dataKey="limit" fill="hsl(var(--secondary))" radius={[10, 10, 0, 0]} name="Hız Limiti (km/h)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}
