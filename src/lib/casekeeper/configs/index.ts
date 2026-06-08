/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { WorkflowConfig, MatterType } from "../types";
import { criminalBailV1 } from "./criminal_bail_v1";
import { criminalDisclosureV1 } from "./criminal_disclosure_v1";
import { criminalPretrialV1 } from "./criminal_pretrial_v1";
import { civilAjrV1 } from "./civil_ajr_v1";
import { familySeparationV1 } from "./family_separation_v1";

export const WORKFLOW_CONFIGS: Record<string, WorkflowConfig> = {
  criminal_bail_v1: criminalBailV1,
  criminal_disclosure_v1: criminalDisclosureV1,
  criminal_pretrial_v1: criminalPretrialV1,
  civil_ajr_v1: civilAjrV1,
  family_separation_v1: familySeparationV1,
};

export function getWorkflowConfig(id: string): WorkflowConfig | undefined {
  return WORKFLOW_CONFIGS[id];
}

export function getDefaultWorkflowConfigId(matterType: MatterType): string {
  switch (matterType) {
    case "criminal":
      return "criminal_bail_v1";
    case "civil":
    case "administrative":
      return "civil_ajr_v1";
    case "family":
      return "family_separation_v1";
    default:
      return "criminal_bail_v1";
  }
}

export function getWorkflowConfigsForType(
  matterType: MatterType
): WorkflowConfig[] {
  return Object.values(WORKFLOW_CONFIGS).filter(
    (c) => c.matter_type === matterType
  );
}
