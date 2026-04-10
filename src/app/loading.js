export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto animate-pulse">
        <div className="mb-8">
          <div className="h-8 bg-gray-200 rounded w-48 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-24" />
        </div>
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="h-4 bg-gray-200 rounded w-12 mb-2" />
              <div className="h-8 bg-gray-200 rounded w-8" />
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-16" />
            ))}
          </div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="p-4 border-b border-gray-100 flex gap-8">
              {[...Array(6)].map((_, j) => (
                <div key={j} className="h-4 bg-gray-100 rounded w-20" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
