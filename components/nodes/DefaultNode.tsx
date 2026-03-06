"use client";

import { Handle, Position, useReactFlow } from "reactflow";
import { useState } from "react";

export default function DefaultNode({ id, data, selected }: any) {
  const { setNodes } = useReactFlow();

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(data.label);

  const updateLabel = () => {
    const newValue = value.trim() || "Node";

    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, label: newValue } }
          : node,
      ),
    );

    setIsEditing(false);
  };

  return (
    <div
      onDoubleClick={() => setIsEditing(true)}
      className={`bg-gray-900 rounded-xl px-4 py-2 shadow-md text-white min-w-[120px] border transition-all
      ${selected ? "border-blue-500 shadow-blue-500/30 shadow-lg" : "border-gray-700"}
    `}
    >
      <Handle type="target" position={Position.Top} className="bg-blue-500" />

      <div className="relative text-center text-sm leading-5">
        <div className={isEditing ? "invisible" : ""}>
          {data.label || "\u00A0"}
        </div>

        {isEditing && (
          <input
            autoFocus
            value={value || ""}
            onChange={(e) => setValue(e.target.value)}
            onBlur={updateLabel}
            onKeyDown={(e) => {
              if (e.key === "Enter") updateLabel();
            }}
            className="nodrag absolute inset-0 bg-transparent outline-none text-center caret-white"
          />
        )}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="bg-blue-500"
      />
    </div>
  );
}
