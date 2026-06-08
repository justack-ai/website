/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

import { useState } from "react";
import type {
  WorkflowConfig,
  WorkflowNode,
  WorkflowNodeStateRow,
  NodeDecisionState,
} from "@/lib/casekeeper/types";
import {
  DECISION_LABELS,
  DECISION_TAILWIND_COLORS as DECISION_COLORS,
} from "@/lib/casekeeper/ui-constants";

const NODE_TYPE_ICONS: Record<string, string> = {
  action: "A",
  decision: "D",
  deadline: "T",
  info: "i",
};

interface Props {
  matterId: string;
  config: WorkflowConfig;
  nodeStates: WorkflowNodeStateRow[];
}

export default function WorkflowWizard({ matterId, config, nodeStates }: Props) {
  const stateMap = new Map(nodeStates.map((s) => [s.node_id, s]));
  const [currentNodeId, setCurrentNodeId] = useState(() => {
    // Find first non-decided node in the workflow path
    let nodeId = config.entry_node_id;
    while (nodeId) {
      const state = stateMap.get(nodeId);
      if (!state || state.decision === "pending") return nodeId;
      const node = config.nodes[nodeId];
      if (!node || node.edges.length === 0) return nodeId;
      // Follow the edge for the current decision
      const edge =
        node.edges.find((e) => e.condition === state.decision) ??
        node.edges.find((e) => e.condition === "default") ??
        node.edges[0];
      nodeId = edge.next_node_id;
    }
    return config.entry_node_id;
  });

  const [saving, setSaving] = useState(false);
  const [note, setNote] = useState("");
  const [nudgeQuestions, setNudgeQuestions] = useState<string[]>([]);
  const [nudgeLoading, setNudgeLoading] = useState(false);

  const currentNode: WorkflowNode | undefined = config.nodes[currentNodeId];
  const currentState = stateMap.get(currentNodeId);

  if (!currentNode) {
    return (
      <div className="text-center text-gray-500 py-8">
        Workflow configuration error — node not found.
      </div>
    );
  }

  async function handleDecision(decision: NodeDecisionState) {
    if (!currentNode) return;
    setSaving(true);
    try {
      const res = await fetch(
        `/api/casekeeper/matters/${matterId}/nodes/${currentNodeId}/decision`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ decision, note: note || undefined }),
        }
      );
      if (!res.ok) {
        console.error("Failed to save decision");
        return;
      }
      const { node_state } = await res.json();
      stateMap.set(currentNodeId, node_state);

      // Advance to next node
      const edge =
        currentNode.edges.find((e) => e.condition === decision) ??
        currentNode.edges.find((e) => e.condition === "default") ??
        currentNode.edges[0];

      if (edge) {
        setCurrentNodeId(edge.next_node_id);
      }
      setNote("");
      setNudgeQuestions([]);
    } finally {
      setSaving(false);
    }
  }

  async function handleNudge() {
    if (!currentNode?.llm_nudge_eligible) return;
    setNudgeLoading(true);
    try {
      const res = await fetch("/api/casekeeper/nudge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matter_id: matterId,
          node_id: currentNodeId,
          current_decision: currentState?.decision ?? "pending",
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setNudgeQuestions(data.questions ?? []);
      }
    } finally {
      setNudgeLoading(false);
    }
  }

  // Build progress list
  const nodeIds = Object.keys(config.nodes);

  return (
    <div className="space-y-6">
      {/* Progress sidebar */}
      <div className="flex gap-1 flex-wrap mb-4">
        {nodeIds.map((nid) => {
          const s = stateMap.get(nid);
          const isCurrent = nid === currentNodeId;
          const isDone = s && s.decision !== "pending";
          return (
            <button
              key={nid}
              onClick={() => setCurrentNodeId(nid)}
              className={`text-xs px-2 py-1 rounded-full border transition-colors ${
                isCurrent
                  ? "bg-gray-900 text-white border-gray-900"
                  : isDone
                    ? "bg-green-50 text-green-700 border-green-300"
                    : "bg-gray-50 text-gray-500 border-gray-200"
              }`}
              title={config.nodes[nid]?.label}
            >
              {NODE_TYPE_ICONS[config.nodes[nid]?.type ?? "info"]}
            </button>
          );
        })}
      </div>

      {/* Current node */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
            {currentNode.type.toUpperCase()}
          </span>
          <h2 className="text-lg font-bold text-gray-900">
            {currentNode.label}
          </h2>
        </div>

        <p className="text-sm text-gray-600 mb-4">{currentNode.description}</p>

        {currentNode.guidance && (
          <div className="bg-blue-50 border border-blue-100 rounded-md px-4 py-3 text-sm text-blue-800 mb-4">
            {currentNode.guidance}
          </div>
        )}

        {currentState && currentState.decision !== "pending" && (
          <div className="bg-green-50 border border-green-200 rounded-md px-4 py-3 text-sm mb-4">
            <span className="font-medium text-green-800">
              Decided: {DECISION_LABELS[currentState.decision]}
            </span>
            {currentState.note && (
              <p className="text-green-700 mt-1">{currentState.note}</p>
            )}
            <p className="text-green-600 text-xs mt-1">
              {currentState.decided_by} &middot;{" "}
              {new Date(currentState.decided_at!).toLocaleString("en-CA")}
            </p>
          </div>
        )}

        {/* Note input */}
        <div className="mb-4">
          <label className="block text-xs text-gray-500 mb-1">
            Note (optional)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            placeholder="Record any notes about this step..."
          />
        </div>

        {/* Decision buttons */}
        <div className="flex flex-wrap gap-2">
          {currentNode.available_decisions.map((d) => (
            <button
              key={d}
              onClick={() => handleDecision(d)}
              disabled={saving}
              className={`text-white text-sm font-medium px-4 py-2 rounded-md transition-colors disabled:opacity-50 ${DECISION_COLORS[d]}`}
            >
              {DECISION_LABELS[d]}
            </button>
          ))}
        </div>

        {/* Nudge button */}
        {currentNode.llm_nudge_eligible && (
          <div className="mt-4 border-t border-gray-100 pt-4">
            <button
              onClick={handleNudge}
              disabled={nudgeLoading}
              className="text-sm text-gray-600 border border-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              {nudgeLoading ? "Thinking..." : "Get follow-up questions"}
            </button>

            {nudgeQuestions.length > 0 && (
              <div className="mt-3 bg-amber-50 border border-amber-100 rounded-md px-4 py-3">
                <p className="text-xs font-medium text-amber-700 mb-2">
                  Suggested follow-up questions:
                </p>
                <ul className="space-y-1">
                  {nudgeQuestions.map((q, i) => (
                    <li key={i} className="text-sm text-amber-800">
                      {q}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-amber-500 mt-2">
                  AI-generated. Review before acting.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
