/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/instructit/supabase/server";
import { writeAuditEntry } from "@/lib/instructit/audit";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
  Font,
} from "@react-pdf/renderer";
import React from "react";
import type { MatterRow, InstructionRow } from "@/lib/instructit/types";

Font.registerHyphenationCallback((word) => [word]);

const JURISDICTION_LABELS: Record<string, string> = {
  ontario_superior: "Ontario Superior Court of Justice",
  ontario_ontario_court: "Ontario Court of Justice",
  ontario_divisional: "Ontario Divisional Court",
  ontario_court_of_appeal: "Ontario Court of Appeal",
  federal_court: "Federal Court of Canada",
  supreme_court_canada: "Supreme Court of Canada",
};

const TYPE_LABELS: Record<string, string> = {
  fact: "FACT",
  decision: "DECISION",
  authorization: "AUTHORIZATION",
  constraint: "CONSTRAINT",
  delegation: "DELEGATION",
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    paddingTop: 48,
    paddingBottom: 56,
    paddingHorizontal: 48,
    color: "#111111",
  },
  coverTitle: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    marginBottom: 8,
    textAlign: "center",
  },
  coverSubtitle: {
    fontSize: 11,
    textAlign: "center",
    marginBottom: 4,
    color: "#444444",
  },
  coverMeta: {
    fontSize: 9,
    textAlign: "center",
    marginBottom: 2,
    color: "#666666",
  },
  warningBox: {
    marginTop: 24,
    marginHorizontal: 32,
    padding: 12,
    border: "1pt solid #cc0000",
  },
  warningText: {
    fontSize: 9,
    color: "#cc0000",
    textAlign: "center",
    lineHeight: 1.5,
  },
  sectionHeading: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    marginTop: 20,
    marginBottom: 8,
    borderBottom: "1pt solid #cccccc",
    paddingBottom: 4,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderTop: "1pt solid #cccccc",
    borderBottom: "1pt solid #cccccc",
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "0.5pt solid #e0e0e0",
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  colTimestamp: { width: "17%", paddingRight: 4 },
  colType: { width: "14%", paddingRight: 4 },
  colAuthor: { width: "14%", paddingRight: 4 },
  colAI: { width: "8%", paddingRight: 4, textAlign: "center" as const },
  colContent: { width: "47%" },
  headerText: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
  },
  cellText: {
    fontSize: 8,
    lineHeight: 1.4,
  },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 48,
    right: 48,
    borderTop: "0.5pt solid #cccccc",
    paddingTop: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 7,
    color: "#888888",
  },
  footerConfidential: {
    fontSize: 7,
    color: "#cc0000",
    fontFamily: "Helvetica-Bold",
  },
  metaRow: {
    flexDirection: "row",
    marginBottom: 6,
  },
  metaLabel: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    width: "30%",
  },
  metaValue: {
    fontSize: 9,
    width: "70%",
  },
});

function formatDate(iso: string): string {
  return new Date(iso).toISOString().replace("T", " ").substring(0, 19) + " UTC";
}

function MatterPDF({
  matter,
  instructions,
  exportedAt,
  lawyerName,
}: {
  matter: MatterRow;
  instructions: InstructionRow[];
  exportedAt: string;
  lawyerName: string;
}) {
  return React.createElement(
    Document,
    { title: `InstructIT Export — ${matter.id}` },
    // Cover page
    React.createElement(
      Page,
      { size: "LETTER", style: styles.page },
      React.createElement(
        View,
        { style: { marginTop: 80, marginBottom: 32 } },
        React.createElement(Text, { style: styles.coverTitle }, "MATTERFLOW"),
        React.createElement(
          Text,
          { style: styles.coverSubtitle },
          "Law Society of Ontario — Production Copy"
        ),
        React.createElement(
          Text,
          { style: { ...styles.coverMeta, marginTop: 16 } },
          `Matter ID: ${matter.id}`
        ),
        React.createElement(
          Text,
          { style: styles.coverMeta },
          `Client: ${matter.client_name}`
        ),
        React.createElement(
          Text,
          { style: styles.coverMeta },
          `Type: ${matter.matter_type.charAt(0).toUpperCase() + matter.matter_type.slice(1)}`
        ),
        React.createElement(
          Text,
          { style: styles.coverMeta },
          `Jurisdiction: ${JURISDICTION_LABELS[matter.jurisdiction] ?? matter.jurisdiction}`
        ),
        React.createElement(
          Text,
          { style: styles.coverMeta },
          `Counsel: ${lawyerName}`
        ),
        React.createElement(
          Text,
          { style: { ...styles.coverMeta, marginTop: 12 } },
          `Exported: ${exportedAt}`
        ),
        React.createElement(
          Text,
          { style: styles.coverMeta },
          `Total Instructions: ${instructions.length}`
        )
      ),
      React.createElement(
        View,
        { style: styles.warningBox },
        React.createElement(
          Text,
          { style: styles.warningText },
          "WARNING — LEGAL RECORD\n\n" +
            "This document is a production copy generated by InstructIT for Law Society of Ontario compliance purposes. " +
            "Falsification, alteration, or destruction of this record may constitute professional misconduct " +
            "and may be an offence under applicable law. This document is subject to solicitor-client privilege.\n\n" +
            "DO NOT DISTRIBUTE — CONFIDENTIAL"
        )
      ),
      React.createElement(
        View,
        { style: styles.footer },
        React.createElement(
          Text,
          { style: styles.footerText },
          `Matter ${matter.id} | ${exportedAt}`
        ),
        React.createElement(
          Text,
          { style: styles.footerConfidential },
          "CONFIDENTIAL — SOLICITOR-CLIENT PRIVILEGE"
        )
      )
    ),
    // Instructions page(s)
    React.createElement(
      Page,
      { size: "LETTER", style: styles.page },
      React.createElement(
        Text,
        { style: styles.sectionHeading },
        "Instruction Record"
      ),
      React.createElement(
        View,
        { style: styles.tableHeader },
        React.createElement(
          View,
          { style: styles.colTimestamp },
          React.createElement(Text, { style: styles.headerText }, "Timestamp (UTC)")
        ),
        React.createElement(
          View,
          { style: styles.colType },
          React.createElement(Text, { style: styles.headerText }, "Type")
        ),
        React.createElement(
          View,
          { style: styles.colAuthor },
          React.createElement(Text, { style: styles.headerText }, "Author")
        ),
        React.createElement(
          View,
          { style: styles.colAI },
          React.createElement(Text, { style: styles.headerText }, "AI")
        ),
        React.createElement(
          View,
          { style: styles.colContent },
          React.createElement(Text, { style: styles.headerText }, "Content")
        )
      ),
      ...instructions.map((instr) =>
        React.createElement(
          View,
          { key: instr.id, style: styles.tableRow, wrap: false },
          React.createElement(
            View,
            { style: styles.colTimestamp },
            React.createElement(
              Text,
              { style: styles.cellText },
              formatDate(instr.recorded_at)
            )
          ),
          React.createElement(
            View,
            { style: styles.colType },
            React.createElement(
              Text,
              { style: styles.cellText },
              TYPE_LABELS[instr.instruction_type] ?? instr.instruction_type
            )
          ),
          React.createElement(
            View,
            { style: styles.colAuthor },
            React.createElement(Text, { style: styles.cellText }, instr.author)
          ),
          React.createElement(
            View,
            { style: styles.colAI },
            React.createElement(
              Text,
              { style: styles.cellText },
              instr.ai_generated ? "Yes" : "No"
            )
          ),
          React.createElement(
            View,
            { style: styles.colContent },
            React.createElement(Text, { style: styles.cellText }, instr.content),
            instr.note
              ? React.createElement(
                  Text,
                  { style: { ...styles.cellText, color: "#666666", marginTop: 2 } },
                  `Note: ${instr.note}`
                )
              : null
          )
        )
      ),
      React.createElement(
        View,
        { style: styles.footer, fixed: true },
        React.createElement(
          Text,
          {
            style: styles.footerText,
            render: ({ pageNumber, totalPages }: { pageNumber: number; totalPages: number }) =>
              `Page ${pageNumber} of ${totalPages} | Matter ${matter.id} | ${exportedAt}`,
          }
        ),
        React.createElement(
          Text,
          { style: styles.footerConfidential },
          "CONFIDENTIAL — SOLICITOR-CLIENT PRIVILEGE"
        )
      )
    )
  );
}

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: matter_id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch matter
  const { data: matter, error: matterError } = await supabase
    .from("matters")
    .select("*")
    .eq("id", matter_id)
    .single();

  if (matterError || !matter) {
    return NextResponse.json({ error: "Matter not found" }, { status: 404 });
  }

  // Fetch instructions
  const { data: instructions, error: instrError } = await supabase
    .from("instructions")
    .select("*")
    .eq("matter_id", matter_id)
    .order("recorded_at", { ascending: true });

  if (instrError) {
    return NextResponse.json({ error: "Failed to fetch instructions" }, { status: 500 });
  }

  const exportedAt = new Date().toISOString().replace("T", " ").substring(0, 19) + " UTC";
  const lawyerName = matter.counsel_name ?? user.email ?? user.id;

  // Build JSON export
  const jsonExport = {
    export_version: "1.0",
    exported_at: new Date().toISOString(),
    exported_by: user.email ?? user.id,
    matter,
    instructions: instructions ?? [],
  };

  // Generate PDF
  let pdfBuffer: Buffer;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pdfBuffer = await renderToBuffer(
      MatterPDF({
        matter: matter as MatterRow,
        instructions: (instructions ?? []) as InstructionRow[],
        exportedAt,
        lawyerName,
      }) as any
    );
  } catch (pdfErr) {
    console.error("[InstructIT] PDF generation error:", pdfErr);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }

  await writeAuditEntry({
    supabase,
    matter_id,
    owner_id: user.id,
    event_type: "matter.exported",
    entity_type: "matter",
    entity_id: matter_id,
    payload: {
      exported_at: new Date().toISOString(),
      instruction_count: (instructions ?? []).length,
    },
    actor: user.email ?? user.id,
    actor_id: user.id,
  });

  // Encode PDF as base64 for JSON response
  const pdfBase64 = pdfBuffer.toString("base64");

  return NextResponse.json({
    pdf_base64: pdfBase64,
    json_export: jsonExport,
    filename_stem: `instructit-${matter_id}-${Date.now()}`,
  });
}
