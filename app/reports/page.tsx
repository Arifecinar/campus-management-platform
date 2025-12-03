"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, FileText, Calendar, TrendingUp, TrendingDown, Zap, Bus, Trash2, Building2, ChevronDown } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { format, formatDistanceToNow } from "date-fns"
import { tr } from "date-fns/locale"
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

const faculties = [
  { id: "genel", name: "Genel (Tüm Kampüs)" },
  { id: "muhendislik", name: "Mühendislik Fakültesi" },
  { id: "tip", name: "Tıp Fakültesi" },
  { id: "fen", name: "Fen-Edebiyat Fakültesi" },
  { id: "egitim", name: "Eğitim Fakültesi" },
  { id: "iktisat", name: "İktisadi ve İdari Bilimler Fakültesi" },
  { id: "ilahiyat", name: "İlahiyat Fakültesi" },
  { id: "teknoloji", name: "Teknoloji Fakültesi" },
]

const monthlyComparisonDataByFaculty: Record<string, any[]> = {
  genel: [
    { month: "Ocak", enerji: 21500, ulasim: 8500, atik: 4200 },
    { month: "Şubat", enerji: 22300, ulasim: 8200, atik: 4100 },
    { month: "Mart", enerji: 19800, ulasim: 8800, atik: 4500 },
    { month: "Nisan", enerji: 18900, ulasim: 9200, atik: 4800 },
    { month: "Mayıs", enerji: 20100, ulasim: 9500, atik: 5000 },
    { month: "Haziran", enerji: 19200, ulasim: 9800, atik: 5200 },
  ],
  muhendislik: [
    { month: "Ocak", enerji: 5800, ulasim: 1200, atik: 980 },
    { month: "Şubat", enerji: 6100, ulasim: 1150, atik: 950 },
    { month: "Mart", enerji: 5200, ulasim: 1300, atik: 1100 },
    { month: "Nisan", enerji: 4900, ulasim: 1400, atik: 1180 },
    { month: "Mayıs", enerji: 5300, ulasim: 1450, atik: 1220 },
    { month: "Haziran", enerji: 5100, ulasim: 1500, atik: 1280 },
  ],
  tip: [
    { month: "Ocak", enerji: 7200, ulasim: 2100, atik: 1200 },
    { month: "Şubat", enerji: 7500, ulasim: 2000, atik: 1150 },
    { month: "Mart", enerji: 6800, ulasim: 2200, atik: 1300 },
    { month: "Nisan", enerji: 6500, ulasim: 2400, atik: 1400 },
    { month: "Mayıs", enerji: 6900, ulasim: 2500, atik: 1450 },
    { month: "Haziran", enerji: 6600, ulasim: 2600, atik: 1520 },
  ],
  fen: [
    { month: "Ocak", enerji: 3200, ulasim: 1800, atik: 780 },
    { month: "Şubat", enerji: 3400, ulasim: 1750, atik: 750 },
    { month: "Mart", enerji: 2900, ulasim: 1900, atik: 850 },
    { month: "Nisan", enerji: 2700, ulasim: 2000, atik: 920 },
    { month: "Mayıs", enerji: 3000, ulasim: 2100, atik: 980 },
    { month: "Haziran", enerji: 2800, ulasim: 2200, atik: 1020 },
  ],
  egitim: [
    { month: "Ocak", enerji: 2100, ulasim: 1400, atik: 520 },
    { month: "Şubat", enerji: 2200, ulasim: 1350, atik: 500 },
    { month: "Mart", enerji: 1900, ulasim: 1500, atik: 580 },
    { month: "Nisan", enerji: 1800, ulasim: 1600, atik: 620 },
    { month: "Mayıs", enerji: 2000, ulasim: 1650, atik: 650 },
    { month: "Haziran", enerji: 1900, ulasim: 1700, atik: 680 },
  ],
  iktisat: [
    { month: "Ocak", enerji: 1900, ulasim: 1200, atik: 450 },
    { month: "Şubat", enerji: 2000, ulasim: 1150, atik: 430 },
    { month: "Mart", enerji: 1700, ulasim: 1300, atik: 490 },
    { month: "Nisan", enerji: 1600, ulasim: 1400, atik: 530 },
    { month: "Mayıs", enerji: 1800, ulasim: 1450, atik: 560 },
    { month: "Haziran", enerji: 1700, ulasim: 1500, atik: 590 },
  ],
  ilahiyat: [
    { month: "Ocak", enerji: 800, ulasim: 600, atik: 180 },
    { month: "Şubat", enerji: 850, ulasim: 580, atik: 170 },
    { month: "Mart", enerji: 720, ulasim: 650, atik: 200 },
    { month: "Nisan", enerji: 680, ulasim: 700, atik: 220 },
    { month: "Mayıs", enerji: 750, ulasim: 720, atik: 230 },
    { month: "Haziran", enerji: 700, ulasim: 750, atik: 250 },
  ],
  teknoloji: [
    { month: "Ocak", enerji: 500, ulasim: 200, atik: 92 },
    { month: "Şubat", enerji: 550, ulasim: 220, atik: 150 },
    { month: "Mart", enerji: 580, ulasim: 250, atik: 180 },
    { month: "Nisan", enerji: 720, ulasim: 300, atik: 210 },
    { month: "Mayıs", enerji: 350, ulasim: 330, atik: 240 },
    { month: "Haziran", enerji: 400, ulasim: 350, atik: 260 },
  ],
}

const savingsData = [
  { month: "Ocak", tasarruf: 1200 },
  { month: "Şubat", tasarruf: 1450 },
  { month: "Mart", tasarruf: 1680 },
  { month: "Nisan", tasarruf: 1820 },
  { month: "Mayıs", tasarruf: 1950 },
  { month: "Haziran", tasarruf: 2100 },
]

const efficiencyData = [
  { category: "Enerji Verimliliği", value: 87 },
  { category: "Ulaşım Optimizasyonu", value: 92 },
  { category: "Atık Azaltma", value: 78 },
  { category: "Genel Performans", value: 85 },
]

export default function ReportsPage() {
  const [showMonthPicker, setShowMonthPicker] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState<string>(() => {
    const d = new Date()
    return `${String(d.getFullYear())}-${String(d.getMonth() + 1).padStart(2, "0")}`
  })
  const [selectedFaculty, setSelectedFaculty] = useState("genel")
  const [showFacultyDropdown, setShowFacultyDropdown] = useState(false)
  const [exportOpen, setExportOpen] = useState(false)
  const [nowTick, setNowTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setNowTick((t) => t + 1), 60000)
    return () => clearInterval(id)
  }, [])

  const monthlyComparisonData = monthlyComparisonDataByFaculty[selectedFaculty]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">Raporlar</h1>
            <p className="text-muted-foreground mt-1">
              Detaylı analiz ve performans raporları •{" "}
              <span className="text-foreground" suppressHydrationWarning>
                {format(new Date(), "d MMM yyyy, HH:mm", { locale: tr })}
              </span>
            </p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Button variant="outline" onClick={() => setShowMonthPicker((v) => !v)}>
                <Calendar className="w-4 h-4 mr-2" />
                <span className="text-sm">{selectedMonth}</span>
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
              {showMonthPicker && (
                <div className="absolute right-0 top-full mt-2 bg-card border rounded-md shadow-prominent p-3 z-50">
                  <input
                    type="month"
                    value={selectedMonth}
                    onChange={(e) => {
                      setSelectedMonth(e.target.value)
                      setShowMonthPicker(false)
                    }}
                    className="px-3 py-2 bg-background border border-border rounded-md text-sm"
                  />
                </div>
              )}
            </div>
            <div className="relative">
              <Button onClick={() => setExportOpen((v) => !v)}>
                <Download className="w-4 h-4 mr-2" />
                Dışa Aktar
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
              {exportOpen && (
                <div className="absolute right-0 top-full mt-2 bg-card border rounded-md shadow-prominent py-1 z-50 min-w-40">
                  <button className="w-full text-left px-3 py-2 text-sm hover:bg-accent/40">PDF</button>
                  <button className="w-full text-left px-3 py-2 text-sm hover:bg-accent/40">CSV</button>
                  <button className="w-full text-left px-3 py-2 text-sm hover:bg-accent/40">XLSX</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card border-border p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Toplam Tasarruf (Aylık)</span>
              <TrendingUp className="w-5 h-5 text-secondary" />
            </div>
            <div className="text-2xl md:text-3xl font-semibold text-foreground mb-1">₺52,450</div>
            <div className="flex items-center gap-1 text-secondary text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+18.2%</span>
            </div>
          </Card>

          <Card className="bg-card border-border p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Enerji Verimliliği</span>
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div className="text-2xl md:text-3xl font-semibold text-foreground mb-1">87%</div>
            <div className="flex items-center gap-1 text-secondary text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+5.3%</span>
            </div>
          </Card>

          <Card className="bg-card border-border p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Filo Performansı</span>
              <Bus className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-2xl md:text-3xl font-semibold text-foreground mb-1">92%</div>
            <div className="flex items-center gap-1 text-secondary text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+2.8%</span>
            </div>
          </Card>

          <Card className="bg-card border-border p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Atık Azaltma</span>
              <Trash2 className="w-5 h-5 text-accent" />
            </div>
            <div className="text-2xl md:text-3xl font-semibold text-foreground mb-1">78%</div>
            <div className="flex items-center gap-1 text-red-400 text-sm">
              <TrendingDown className="w-4 h-4" />
              <span>-1.2%</span>
            </div>
          </Card>
        </div>

        {/* Available Reports */}
        <Card className="bg-card border-border p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Hazır Raporlar
          </h2>
          <div className="relative w-full overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr className="text-left">
                  <th className="px-4 py-3 font-medium">Rapor</th>
                  <th className="px-4 py-3 font-medium">Dönem</th>
                  <th className="px-4 py-3 font-medium">Kapsam</th>
                  <th className="px-4 py-3 font-medium">Boyut</th>
                  <th className="px-4 py-3 font-medium">Oluşturulma</th>
                  <th className="px-4 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const now = new Date()
                  const rows = [
                    { name: "Enerji Analiz Raporu", icon: <Zap className="w-4 h-4 text-primary" />, period: selectedMonth, scope: faculties.find((f) => f.id === selectedFaculty)?.name, size: "2.1 MB", createdAt: now },
                    { name: "Filo Performans Raporu", icon: <Bus className="w-4 h-4 text-purple-500" />, period: selectedMonth, scope: "Ulaşım", size: "1.2 MB", createdAt: new Date(now.getTime() - 5 * 60 * 1000) },
                    { name: "Atık Yönetim Raporu", icon: <Trash2 className="w-4 h-4 text-accent" />, period: selectedMonth, scope: "Atık", size: "1.0 MB", createdAt: new Date(now.getTime() - 10 * 60 * 1000) },
                    { name: "Genel Performans Raporu", icon: <TrendingUp className="w-4 h-4 text-secondary" />, period: selectedMonth, scope: "Kampüs Geneli", size: "3.6 MB", createdAt: new Date(now.getTime() - 20 * 60 * 1000) },
                  ]
                  return rows
                })().map((r, i) => (
                  <tr key={i} className="border-t border-border/70 hover:bg-accent/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {r.icon}
                        <span className="text-foreground font-medium">{r.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className="bg-primary/10 text-primary border border-primary/30">{r.period}</Badge>
                    </td>
                    <td className="px-4 py-3">{r.scope}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.size}</td>
                    <td className="px-4 py-3 text-muted-foreground" suppressHydrationWarning>
                      {formatDistanceToNow(r.createdAt, { addSuffix: true, locale: tr })}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm">Görüntüle</Button>
                        <Button size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          İndir
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Comparison */}
          <Card className="bg-card border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-foreground">Aylık Sistem Karşılaştırması</h3>
              <div className="relative">
                <button
                  onClick={() => setShowFacultyDropdown(!showFacultyDropdown)}
                  className="flex items-center gap-2 px-3 py-2 bg-background hover:bg-accent/40 border border-border rounded-md text-foreground transition-all text-sm"
                >
                  <Building2 className="w-4 h-4 text-primary" />
                  <span>{faculties.find((f) => f.id === selectedFaculty)?.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showFacultyDropdown && (
                  <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-md shadow-prominent z-50 min-w-[280px]">
                    {faculties.map((faculty) => (
                      <button
                        key={faculty.id}
                        onClick={() => {
                          setSelectedFaculty(faculty.id)
                          setShowFacultyDropdown(false)
                        }}
                        className={`w-full text-left px-3 py-2 hover:bg-accent/40 transition-colors first:rounded-t-md last:rounded-b-md ${
                          selectedFaculty === faculty.id
                            ? "bg-primary/10 text-primary font-semibold"
                            : "text-foreground"
                        }`}
                      >
                        {faculty.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="month"
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="enerji" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} name="Enerji (kWh)" />
                <Bar dataKey="ulasim" fill="#9333ea" radius={[8, 8, 0, 0]} name="Ulaşım (km)" />
                <Bar dataKey="atik" fill="#f97316" radius={[8, 8, 0, 0]} name="Atık (kg)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Savings Trend */}
          <Card className="bg-card border-border p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">Tasarruf Trendi</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={savingsData}>
                <defs>
                  <linearGradient id="colorTasarruf2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="month"
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="tasarruf"
                  stroke="hsl(var(--secondary))"
                  fillOpacity={1}
                  fill="url(#colorTasarruf2)"
                  name="Tasarruf (₺)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Efficiency Metrics */}
          <Card className="lg:col-span-2 bg-card border-border p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">Verimlilik Metrikleri</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={efficiencyData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis
                  dataKey="category"
                  type="category"
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                  width={200}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="value" fill="hsl(var(--secondary))" radius={[0, 8, 8, 0]} name="Verimlilik %" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </div>
  )
}
