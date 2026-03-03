"use client";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import FlowCanvas from "@/components/FlowCanvas";

export default function EditorPage() {
  return (
    <div className="h-screen flex bg-gradient-to-br from-gray-950 to-gray-900 text-gray-200">
      <Sidebar />

      <div className="flex-1 flex flex-col relative">
        <Topbar />
        <div className="flex-1 relative">
          <FlowCanvas />
        </div>
      </div>
    </div>
  );
}
