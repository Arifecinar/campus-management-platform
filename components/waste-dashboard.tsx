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
import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LabelList } from "recharts"

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

// Önceki aya göre ayrıştırılma değişimi (pozitif=artış, negatif=azalış)
const separationDelta = [
  { tur: "Kağıt/Karton", delta: 7 },
  { tur: "Plastik", delta: 6 },
  { tur: "Cam", delta: 4 },
  { tur: "Metal", delta: -2 },
]

type BinMarker = {
  id: string
  faculty: string
  top: string
  left: string
  fill: number
  coords: { lat: number; lng: number }
}

// örnek yerleşimler (harita görseline göre yüzdelik)
const binMarkers: BinMarker[] = [
  { id: "A-101", faculty: "Mühendislik", top: "25%", left: "50%", fill: 88, coords: { lat: 37.7438, lng: 29.0946 } },
  { id: "A-102", faculty: "Mühendislik", top: "60%", left: "47%", fill: 65, coords: { lat: 37.7435, lng: 29.0942 } },
  { id: "B-201", faculty: "Fen-Edebiyat", top: "70%", left: "53%", fill: 32, coords: { lat: 37.7428, lng: 29.0961 } },
  { id: "B-202", faculty: "Fen-Edebiyat", top: "72%", left: "58%", fill: 58, coords: { lat: 37.7426, lng: 29.0967 } },
  { id: "C-301", faculty: "Kütüphane", top: "52%", left: "36%", fill: 82, coords: { lat: 37.7442, lng: 29.0907 } },
  { id: "D-401", faculty: "İdari Bina", top: "52%", left: "33%", fill: 41, coords: { lat: 37.7441, lng: 29.0901 } },
  { id: "E-501", faculty: "Tıp Fakültesi", top: "21%", left: "84%", fill: 95, coords: { lat: 37.7439, lng: 29.1043 } },
  { id: "E-502", faculty: "Üni. Hastanesi", top: "29%", left: "86%", fill: 87, coords: { lat: 37.7434, lng: 29.1049 } },
  { id: "F-601", faculty: "Spor Merkezi", top: "78%", left: "23%", fill: 51, coords: { lat: 37.7396, lng: 29.0862 } },
  { id: "G-701", faculty: "Yabancı Diller", top: "70%", left: "63%", fill: 44, coords: { lat: 37.7417, lng: 29.1007 } },
  { id: "H-801", faculty: "Eğitim Fakültesi", top: "38%", left: "55%", fill: 73, coords: { lat: 37.7452, lng: 29.0978 } },
  { id: "I-901", faculty: "Sağlık Bilimleri", top: "43%", left: "52%", fill: 54, coords: { lat: 37.7444, lng: 29.0981 } },
]

function getFillColor(fill: number) {
  if (fill >= 80) return "bg-red-500"
  if (fill >= 50) return "bg-orange-500"
  return "bg-emerald-500"
}

export function WasteDashboard() {
  const [hoverBin, setHoverBin] = useState<BinMarker | null>(null)
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
            <h3 className="text-2xl font-bold text-foreground tracking-tight">Atık Kutuları - Anlık Doluluk</h3>
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

            {binMarkers.map((b) => (
              <div
                key={b.id}
                className={`absolute w-11 h-11 ${getFillColor(b.fill)} rounded-full flex items-center justify-center text-white font-bold text-sm border-4 border-white shadow-prominent cursor-pointer`}
                style={{ top: b.top, left: b.left }}
                onMouseEnter={() => setHoverBin(b)}
                onMouseLeave={() => setHoverBin(null)}
                title={`${b.faculty} • Kutu ${b.id}`}
              >
                {b.fill}%
              </div>
            ))}

            {hoverBin && (
              <div
                className="absolute z-10 bg-white dark:bg-background border border-border rounded-xl shadow-prominent px-3 py-2 text-xs"
                style={{
                  top: `calc(${hoverBin.top} - 48px)`,
                  left: `calc(${hoverBin.left} + 16px)`,
                }}
              >
                <div className="font-semibold text-foreground mb-0.5">{hoverBin.faculty}</div>
                <div className="text-muted-foreground">Kutu No: {hoverBin.id}</div>
                <div className="text-muted-foreground">Koordinat: {hoverBin.coords.lat.toFixed(4)}, {hoverBin.coords.lng.toFixed(4)}</div>
              </div>
            )}

            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm p-4 rounded-2xl border border-border/60 shadow-elevated">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  <span className="text-muted-foreground">Dolu (%80+)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                  <span className="text-muted-foreground">Orta (%50–79)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                  <span className="text-muted-foreground">Boş (%0–49)</span>
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
          <h3 className="text-2xl font-bold text-foreground mb-5 tracking-tight">Ayrıştırılma Değişimi (Önceki Aya Göre)</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={separationDelta}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis
                dataKey="tur"
                stroke="var(--color-muted-foreground)"
                tick={{ fill: "var(--color-muted-foreground)", fontWeight: 600 }}
              />
              <YAxis
                stroke="var(--color-muted-foreground)"
                tick={{ fill: "var(--color-muted-foreground)", fontWeight: 600 }}
                domain={["dataMin - 10", "dataMax + 10"]}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                formatter={(v: number) => [`${v > 0 ? "+" : ""}${v}%`, "Değişim"]}
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "12px",
                  color: "var(--color-foreground)",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  padding: "12px",
                }}
              />
              <Bar dataKey="delta" radius={[8, 8, 0, 0]}>
                {separationDelta.map((d, i) => (
                  <Cell key={`cell-${i}`} fill={d.delta >= 0 ? "#10b981" : "#ef4444"} />
                ))}
                <LabelList dataKey="delta" position="top" fill="var(--color-foreground)" formatter={(v: number) => `${v > 0 ? "+" : ""}${v}%`} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#10b981" }}></span> Artış</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#ef4444" }}></span> Azalış</div>
          </div>
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
