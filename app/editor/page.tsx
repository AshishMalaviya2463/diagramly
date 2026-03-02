import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import FlowCanvas from "@/components/FlowCanvas";

export default function EditorPage() {
  return (
    <div className="h-screen flex bg-gray-900">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />
        <FlowCanvas />
      </div>
    </div>
  );
}
