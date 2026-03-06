"use client";

import React, { useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  Connection,
  Edge,
  Node,
  OnNodesChange,
  OnEdgesChange,
} from "reactflow";

import DefaultNode from "@/components/nodes/DefaultNode";

const nodeTypes = {
  custom: DefaultNode,
};

interface FlowCanvasProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}

export default function FlowCanvas({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  setEdges,
}: FlowCanvasProps) {
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="w-full h-full bg-gray-900 shadow-inner">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        deleteKeyCode={["Backspace", "Delete"]}
        fitView
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
