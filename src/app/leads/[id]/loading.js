export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-32 mb-6" />
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex justify-between">
            <div>
              <div className="h-7 bg-gray-200 rounded w-40 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-56" />
            </div>
            <div className="text-right">
              <div className="h-9 bg-gray-200 rounded w-16 mb-2" />
              <div className="h-6 bg-gray-200 rounded w-16" />
            </div>
          </div>
        </div>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <div className="h-5 bg-gray-200 rounded w-32 mb-3" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-100 rounded w-full" />
              <div className="h-4 bg-gray-100 rounded w-4/5" />
              <div className="h-4 bg-gray-100 rounded w-3/5" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
