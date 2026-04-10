export default function SettingsPage() {
  return (
    <div className="p-6 lg:p-8 min-h-screen" style={{ background: '#f8fafc' }}>
      <div className="mb-7">
        <h1 className="text-2xl font-bold" style={{ color: '#0f2044' }}>Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account and AI configuration</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 max-w-lg text-center">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3 text-2xl">
          ⚙️
        </div>
        <p className="text-sm font-medium text-gray-500">Settings coming soon</p>
        <p className="text-xs text-gray-400 mt-1">
          AI response rules, broker profile, and integrations will appear here.
        </p>
      </div>
    </div>
  );
}
