/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type {
  WorkflowConfig,
  WorkflowNodeStateRow,
} from "@/lib/casekeeper/types";
import { DECISION_HEX_COLORS as DECISION_COLORS } from "@/lib/casekeeper/ui-constants";

const NODE_TYPE_BG: Record<string, string> = {
  action: "#f0fdf4",
  decision: "#faf5ff",
  deadline: "#fef3c7",
  info: "#f0f9ff",
};

interface Props {
  config: WorkflowConfig;
  nodeStates: WorkflowNodeStateRow[];
}

export default function WorkflowSummary({ config, nodeStates }: Props) {
  const stateMap = new Map(nodeStates.map((s) => [s.node_id, s]));
  const nodeIds = Object.keys(config.nodes);

  // Layout: vertical list
  const nodes: Node[] = nodeIds.map((nid, idx) => {
    const node = config.nodes[nid];
    const state = stateMap.get(nid);
    const decided = state && state.decision !== "pending";
    const borderColor = decided
      ? DECISION_COLORS[state!.decision]
      : "#d1d5db";

    return {
      id: nid,
      position: { x: 200, y: idx * 120 },
      data: {
        label: (
          <div className="text-left">
            <div className="text-xs font-semibold" style={{ color: borderColor }}>
              {node.type.toUpperCase()}
              {decided && ` — ${state!.decision.toUpperCase()}`}
            </div>
            <div className="text-sm font-medium text-gray-900 mt-0.5">
              {node.label}
            </div>
            {state?.note && (
              <div className="text-xs text-gray-500 mt-1 truncate max-w-[200px]">
                {state.note}
              </div>
            )}
          </div>
        ),
      },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      style: {
        background: NODE_TYPE_BG[node.type] ?? "#ffffff",
        border: `2px solid ${borderColor}`,
        borderRadius: "8px",
        padding: "12px 16px",
        minWidth: 260,
      },
    };
  });

  const edges: Edge[] = [];
  for (const [nid, node] of Object.entries(config.nodes)) {
    const state = stateMap.get(nid);
    for (const edge of node.edges) {
      const isActive =
        state &&
        (edge.condition === state.decision || edge.condition === "default");
      edges.push({
        id: `${nid}-${edge.next_node_id}-${edge.condition}`,
        source: nid,
        target: edge.next_node_id,
        label: edge.label ?? edge.condition,
        animated: isActive ?? false,
        style: {
          stroke: isActive ? "#111827" : "#d1d5db",
          strokeWidth: isActive ? 2 : 1,
        },
      });
    }
  }

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}
