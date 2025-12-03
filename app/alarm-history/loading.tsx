export default function Loading() {
  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="h-8 w-56 bg-muted rounded" />
        <div className="bg-card border rounded-xl p-4 md:p-6">
          <div className="flex gap-2 mb-4">
            <div className="h-8 w-24 bg-muted rounded" />
            <div className="h-8 w-28 bg-muted rounded" />
            <div className="h-8 w-28 bg-muted rounded" />
            <div className="h-8 w-24 bg-muted rounded" />
            <div className="ml-auto h-8 w-72 bg-muted rounded" />
          </div>
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-14 w-full bg-muted rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
