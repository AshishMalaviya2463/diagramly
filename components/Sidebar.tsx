interface SidebarProps {
  onAddNode: () => void;
}

export default function Sidebar({ onAddNode }: SidebarProps) {
  return (
    <div className="w-64 bg-gray-950/80 backdrop-blur-xl border-r border-gray-800 p-6 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight mb-10">
          Diagramly
        </h1>

        <div className="space-y-3">
          <button
            onClick={onAddNode}
            className="w-full bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-xl shadow-lg"
          >
            + Add Node
          </button>

          <button className="w-full bg-gray-800 hover:bg-gray-700 transition px-4 py-2 rounded-xl">
            Saved Diagrams
          </button>
        </div>
      </div>

      <div className="text-xs text-gray-500">v0.1 – Built with ReactFlow</div>
    </div>
  );
}
