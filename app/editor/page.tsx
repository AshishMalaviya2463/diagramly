"use client";

import { useCallback } from "react";
import { nanoid } from "nanoid";
import { useNodesState, useEdgesState, Node, Edge } from "reactflow";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import FlowCanvas from "@/components/FlowCanvas";

const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    data: { label: "Node 1" },
    type: "custom",
  },
];

const initialEdges: Edge[] = [];

export default function EditorPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const addNode = useCallback(() => {
    const lastNode = nodes[nodes.length - 1];

    const newNode: Node = {
      id: nanoid(),
      type: "custom",
      position: lastNode
        ? {
            x: lastNode.position.x + 40,
            y: lastNode.position.y + 40,
          }
        : { x: 100, y: 100 },
      data: {
        label: `Node ${nodes.length + 1}`,
      },
    };

    setNodes((nds) => [...nds, newNode]);
  }, [nodes, setNodes]);

  return (
    <div className="h-screen flex bg-gradient-to-br from-gray-950 to-gray-900 text-gray-200">
      <Sidebar onAddNode={addNode} />

      <div className="flex-1 flex flex-col relative">
        <Topbar />

        <div className="flex-1 relative">
          <FlowCanvas
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            setEdges={setEdges}
          />
        </div>
      </div>
    </div>
  );
}