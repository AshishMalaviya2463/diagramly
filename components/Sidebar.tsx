export default function Sidebar() {
  return (
    <div className="w-60 bg-gray-800 text-white p-4 flex flex-col">
      <h1 className="text-xl font-bold mb-6">Diagramly</h1>

      <button className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg mb-3">
        New Diagram
      </button>

      <button className="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg">
        Saved Diagrams
      </button>
    </div>
  );
}
