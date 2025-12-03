"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Trash2,
  MapPin,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Route,
  Package,
  Download,
  Printer,
  Maximize2,
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const wasteVolumeData = [
  { bolge: "Bölge A", hacim: 862 },
  { bolge: "Bölge B", hacim: 923 },
  { bolge: "Bölge C", hacim: 988 },
  { bolge: "Bölge D", hacim: 1058 },
  { bolge: "Bölge E", hacim: 1123 },
]

const binStatusData = [
  { name: "Dolu (%80+)", value: 8, color: "#ef4444" },
  { name: "Orta (%50-79)", value: 15, color: "#f59e0b" },
  { name: "Boş (%0-49)", value: 23, color: "hsl(var(--secondary))" },
]

export function WasteDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground tracking-tight">Atık Yönetim Paneli</h1>
          <p className="text-muted-foreground text-lg">Akıllı rota planlama ve doluluk takibi</p>
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
            <span className="text-muted-foreground text-sm font-medium">Kampüs Geneli Doluluk</span>
            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
              <Trash2 className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="text-4xl font-bold text-foreground mb-3 tracking-tight">62%</div>
          <div className="w-full bg-muted rounded-full h-3 mb-2">
            <div
              className="bg-gradient-to-r from-primary to-accent h-3 rounded-full shadow-sm"
              style={{ width: "62%" }}
            ></div>
          </div>
          <div className="flex items-center gap-1.5 text-secondary text-sm font-medium">
            <TrendingUp className="w-4 h-4" />
            <span>+2%</span>
            <span className="text-muted-foreground text-xs ml-1">Anlık Veri</span>
          </div>
        </Card>

        <Card className="bg-white border-border p-6 shadow-elevated hover:shadow-prominent transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-muted-foreground text-sm font-medium">Toplam Durak</span>
            <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-purple-500" />
            </div>
          </div>
          <div className="text-4xl font-bold text-foreground tracking-tight">14</div>
        </Card>

        <Card className="bg-white border-border p-6 shadow-elevated hover:shadow-prominent transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-muted-foreground text-sm font-medium">Tahmini Süre</span>
            <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-500" />
            </div>
          </div>
          <div className="text-4xl font-bold text-foreground tracking-tight">48 Dakika</div>
        </Card>

        <Card className="bg-white border-border p-6 shadow-elevated hover:shadow-prominent transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-muted-foreground text-sm font-medium">Toplam Mesafe</span>
            <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
              <Route className="w-6 h-6 text-secondary" />
            </div>
          </div>
          <div className="text-4xl font-bold text-foreground tracking-tight">3.2 km</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-white border-border p-7 shadow-elevated">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-2xl font-bold text-foreground tracking-tight">Güncel Toplama Rotası</h3>
            <input
              type="text"
              placeholder="Lokasyon ara"
              className="bg-muted border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary font-medium"
            />
          </div>
          <div className="relative w-full h-[500px] bg-accent/20 rounded-2xl overflow-hidden border-2 border-border/50">
            <img
              src="/pamukkale-campus-map.png"
              alt="Pamukkale Üniversitesi Kampüs Haritası"
              className="w-full h-full object-contain"
            />

            <div className="absolute top-[20%] left-[30%] w-11 h-11 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm border-4 border-white shadow-prominent">
              95%
            </div>
            <div className="absolute top-[25%] left-[50%] w-11 h-11 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm border-4 border-white shadow-prominent">
              88%
            </div>
            <div className="absolute top-[40%] left-[60%] w-11 h-11 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm border-4 border-white shadow-prominent">
              82%
            </div>
            <div className="absolute top-[50%] left-[35%] w-11 h-11 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm border-4 border-white shadow-prominent">
              65%
            </div>
            <div className="absolute top-[55%] left-[65%] w-11 h-11 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm border-4 border-white shadow-prominent">
              58%
            </div>
            <div className="absolute top-[65%] left-[28%] w-11 h-11 bg-[hsl(var(--secondary))] rounded-full flex items-center justify-center text-white font-bold text-sm border-4 border-white shadow-prominent">
              35%
            </div>
            <div className="absolute top-[70%] left-[55%] w-11 h-11 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm border-4 border-white shadow-prominent">
              72%
            </div>

            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <path
                d="M 240 120 L 400 150 L 480 240 L 280 300 L 520 330 L 224 390 L 440 420"
                stroke="#f59e0b"
                strokeWidth="4"
                fill="none"
                strokeDasharray="10,5"
                opacity="0.8"
              />
            </svg>

            <div className="absolute bottom-6 left-6 right-6 bg-white/98 backdrop-blur-sm p-5 rounded-2xl border-2 border-border/50 shadow-elevated">
              <h4 className="text-foreground font-bold mb-3 text-base">Rota Bilgileri</h4>
              <div className="grid grid-cols-3 gap-6 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs mb-1.5 font-medium">Toplam Durak</p>
                  <p className="text-foreground font-bold text-lg">14</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs mb-1.5 font-medium">Tahmini Süre</p>
                  <p className="text-foreground font-bold text-lg">48 Dakika</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs mb-1.5 font-medium">Toplam Mesafe</p>
                  <p className="text-foreground font-bold text-lg">3.2 km</p>
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
          <h3 className="text-2xl font-bold text-foreground mb-5 tracking-tight">Önerilen Eylemler</h3>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
              <h4 className="font-bold text-red-500 text-base">Acil Toplanması Gereken Kutular</h4>
            </div>
            <div className="space-y-3">
              <div className="bg-red-50 border border-red-500/30 rounded-xl p-4 shadow-professional hover:shadow-elevated transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-red-500" />
                    <span className="text-foreground font-bold text-sm">Kutu #112 (Bölge D)</span>
                  </div>
                  <Badge className="bg-red-500 text-white text-xs font-semibold">95% Dolu</Badge>
                </div>
              </div>

              <div className="bg-red-50 border border-red-500/30 rounded-xl p-4 shadow-professional hover:shadow-elevated transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-red-500" />
                    <span className="text-foreground font-bold text-sm">Kutu #115 (Bölge D)</span>
                  </div>
                  <Badge className="bg-red-500 text-white text-xs font-semibold">88% Dolu</Badge>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-yellow-500" />
              </div>
              <h4 className="font-bold text-yellow-500 text-base">Ekstra Kutu Gereken Lokasyonlar</h4>
            </div>
            <div className="space-y-3">
              <div className="bg-yellow-50 border border-yellow-500/30 rounded-xl p-4 shadow-professional hover:shadow-elevated transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-yellow-500" />
                    <span className="text-foreground font-bold text-sm">Bölge D - Kütüphane</span>
                  </div>
                  <Badge className="bg-yellow-500/20 text-yellow-600 text-xs border border-yellow-500/50 font-semibold">
                    Yüksek Öncelik
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">Hızlı dolum tespit edildi</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-500/30 rounded-xl p-4 shadow-professional hover:shadow-elevated transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-yellow-500" />
                    <span className="text-foreground font-bold text-sm">Bölge C - Kafeterya</span>
                  </div>
                  <Badge className="bg-yellow-500/20 text-yellow-600 text-xs border border-yellow-500/50 font-semibold">
                    Orta Öncelik
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">Öğle saatlerinde yoğunluk</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-500/30 rounded-xl p-4 shadow-professional hover:shadow-elevated transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-yellow-500" />
                    <span className="text-foreground font-bold text-sm">Bölge A - Yurtlar</span>
                  </div>
                  <Badge className="bg-yellow-500/20 text-yellow-600 text-xs border border-yellow-500/50 font-semibold">
                    Düşük Öncelik
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">Hafta sonu artış gözlemlendi</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border-border p-7 shadow-elevated">
          <h3 className="text-2xl font-bold text-foreground mb-5 tracking-tight">Atık Yoğunluk Bölgeleri (Haftalık)</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={wasteVolumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="bolge"
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
              <Bar dataKey="hacim" fill="hsl(var(--primary))" radius={[10, 10, 0, 0]} name="Hacim (kg)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="bg-white border-border p-7 shadow-elevated">
          <h3 className="text-2xl font-bold text-foreground mb-5 tracking-tight">Kutu Doluluk Dağılımı</h3>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={binStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={110}
                fill="#8884d8"
                dataKey="value"
              >
                {binStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
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
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-6 space-y-3">
            {binStatusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-md shadow-sm" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-muted-foreground font-medium">{item.name}</span>
                </div>
                <span className="text-foreground font-bold">{item.value} kutu</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
