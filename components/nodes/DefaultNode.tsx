"use client";

import { Handle, Position } from "reactflow";
import { useState } from "react";

export default function DefaultNode({ data }: any) {
  const [label, setLabel] = useState(data.label);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div
      className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-2 shadow-md text-white min-w-[120px]"
      onDoubleClick={() => setIsEditing(true)}
    >
      <Handle type="target" position={Position.Top} className="bg-blue-500" />

      <div className="relative text-center text-sm leading-5">
        <div className={isEditing ? "invisible" : "visible"}>{label}</div>

        {isEditing && (
          <input
            autoFocus
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setIsEditing(false);
            }}
            className="nodrag absolute inset-0 bg-transparent outline-none text-center"
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
