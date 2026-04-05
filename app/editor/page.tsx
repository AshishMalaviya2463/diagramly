"use client";

import { useCallback, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import {
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  ReactFlowInstance,
} from "reactflow";

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

  // ✅ Store full instance (NOT just project)
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);

  // Clipboard state
  const [copiedNodes, setCopiedNodes] = useState<Node[]>([]);
  const [copiedEdges, setCopiedEdges] = useState<Edge[]>([]);

  // Mouse position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // ➕ Add Node
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

  // 📋 Copy
  const handleCopy = useCallback(() => {
    const selectedNodes = nodes.filter((n) => n.selected);
    const selectedIds = new Set(selectedNodes.map((n) => n.id));

    const relatedEdges = edges.filter(
      (e) => selectedIds.has(e.source) && selectedIds.has(e.target),
    );

    setCopiedNodes(selectedNodes);
    setCopiedEdges(relatedEdges);
  }, [nodes, edges]);

  // 📌 Paste (100% SAFE)
  const handlePaste = useCallback(() => {
    if (!copiedNodes.length || !rfInstance) return;

    let pastePosition = { x: 100, y: 100 };

    try {
      pastePosition = rfInstance.screenToFlowPosition({
        x: mousePosition.x,
        y: mousePosition.y,
      });
    } catch (err) {
      console.error("Projection error:", err);
    }

    const idMap = new Map<string, string>();

    const newNodes: Node[] = copiedNodes.map((node, index) => {
      const newId = nanoid();
      idMap.set(node.id, newId);

      return {
        ...node,
        id: newId,
        position: {
          x: pastePosition.x + index * 20,
          y: pastePosition.y + index * 20,
        },
        data: {
          ...node.data,
          label: `${node.data.label} Copy`,
        },
        selected: true,
      };
    });

    const newEdges: Edge[] = copiedEdges.map((edge) => ({
      ...edge,
      id: nanoid(),
      source: idMap.get(edge.source)!,
      target: idMap.get(edge.target)!,
    }));

    setNodes((nds) => [
      ...nds.map((n) => ({ ...n, selected: false })),
      ...newNodes,
    ]);
    setEdges((eds) => [...eds, ...newEdges]);
  }, [copiedNodes, copiedEdges, mousePosition, rfInstance, setNodes, setEdges]);

  // ⌨️ Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "c") {
        e.preventDefault();
        handleCopy();
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "v") {
        e.preventDefault();
        handlePaste();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleCopy, handlePaste]);

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
            onInitInstance={setRfInstance} // ✅ IMPORTANT
          />
        </div>
      </div>
    </div>
  );
}
