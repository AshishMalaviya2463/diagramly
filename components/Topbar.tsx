export default function Topbar() {
  return (
    <div className="h-14 bg-gray-800 text-white flex items-center justify-between px-6 border-b border-gray-700">
      <div className="font-medium">Editor</div>

      <div className="flex gap-3">
        <button className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded-lg">
          Save
        </button>

        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded-lg">
          Export
        </button>
      </div>
    </div>
  );
}
