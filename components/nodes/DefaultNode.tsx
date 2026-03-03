"use client";

import { Handle, Position } from "reactflow";

export default function DefaultNode({ data }: any) {
  return (
    <div
      className="
    bg-gray-800
    border border-gray-700
    rounded-xl
    px-6 py-3
    shadow-lg
    text-white
    min-w-[160px]
    text-center
    transition-all duration-200
    hover:shadow-blue-500/30
    hover:scale-[1.02]
  "
    >
      <Handle type="target" position={Position.Top} className="!bg-blue-500" />

      <div className="font-medium tracking-wide">{data.label}</div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-blue-500"
      />
    </div>
  );
}
