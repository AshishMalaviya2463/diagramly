export default function Topbar() {
  return (
    <div className="h-16 bg-gray-950/60 backdrop-blur-md border-b border-gray-800 flex items-center justify-between px-8">
      <div>
        <h2 className="text-lg font-semibold text-white">Editor</h2>
        <p className="text-xs text-gray-500">
          Drag, connect and build your flow
        </p>
      </div>

      <div className="flex gap-3">
        <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-xl transition">
          Save
        </button>

        <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl shadow-md transition">
          Export
        </button>
      </div>
    </div>
  );
}
