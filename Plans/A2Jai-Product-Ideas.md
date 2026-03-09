# A2Jai / justack.ai — Product Ideas

**Created:** 2026-03-06
**Purpose:** Running list of potential products and features for consideration

---

## Product Ideas

### 1. Open Source License ADR Platform

**Date added:** 2026-03-06
**Source:** Founder observation during licensing research session
**Status:** Idea — not scoped

**Observation:** No community-based Alternative Dispute Resolution (ADR) mechanism exists specifically for Apache 2.0 licensing disputes between private parties. Existing community models address intra-foundation governance, contributor conduct, and GPL compliance, but not commercial disputes over Apache 2.0 terms between a licensor and downstream users.

**Product concept:** A structured ADR mechanism — possibly mediation, arbitration, or tiered escalation — designed specifically for open source licensing disputes between private parties. Could serve the broader open source ecosystem, not just A2Jai's own licensing.

**Why A2Jai is positioned for this:**
- Founder is a lawyer with dispute resolution experience
- A2Jai already operates at the intersection of legal tech and open source
- Access-to-justice mission extends to making dispute resolution accessible, not just legal information
- Could serve as both a product and a community governance tool for A2Jai's own Apache 2.0 ecosystem

**Open questions:**
- Scope: Apache 2.0 only, or all permissive open source licenses?
- Format: Online mediation platform? Structured arbitration? Community panel?
- Revenue model: Fee-per-dispute? Subscription for organizations? Pro bono for individuals?
- Jurisdiction: Multi-jurisdiction (Canada, US, UK) consistent with A2Jai's product scope?

---

### 2. Trustless MCP Auth Layer (DID-Based Agent Identity)

**Date added:** 2026-03-07
**Source:** Founder frustration with repeated OAuth device-flow approvals for Microsoft MCP integration
**Status:** Idea — not scoped

**Problem:** Current MCP authentication relies on OAuth 2.1 flows that require repeated user approval (device codes, browser redirects). Refresh tokens are stored but never used (known Claude Code bug). Every session risks re-authentication. This is a universal pain point — not just Microsoft, but any MCP server requiring OAuth.

**Product concept:** A trust layer for MCP connections using Decentralized Identifiers (DIDs) and Verifiable Credentials (VCs). Authenticate once → receive a cryptographic credential → present it to any MCP server indefinitely. No token expiry. No re-auth. No centralized approval flows.

**Market context (as of March 2026):**
- **MCP-I** — Vouched donated an MCP identity framework to the Decentralized Identity Foundation (DIF) in March 2026. Early stage, not plug-and-play yet.
- **DeMCP** — Decentralized MCP network using TEEs (Trusted Execution Environments) for hardware-verified trust. Developer-oriented.
- **ERC-8004** — Ethereum standard for AI agent identity and reputation. On-chain "agent cards" with MCP endpoints.
- **Gap:** None of these have consumer/prosumer UX. All are developer-oriented or standards-stage. No product exists that makes this "just work" for non-technical users running AI agents.

**Why A2Jai/Humilitas is positioned for this:**
- Founder runs PAI infrastructure daily and experiences the auth pain firsthand
- Legal expertise relevant to identity, delegation, and credential frameworks
- Could integrate with justack.ai's existing auth infrastructure
- Natural extension of "access to justice" mission → "access to trustworthy AI agent infrastructure"

**Open questions:**
- Scope: MCP-only, or broader AI agent auth (A2A protocol, OpenAI function calling)?
- Build vs. contribute: Build a product, or contribute to MCP-I / DIF?
- Revenue model: SaaS credential vault? Per-connection fees? Open-source + hosted?
- Dependencies: Requires MCP ecosystem adoption of DID-based auth — chicken-and-egg?
- Competitive moat: Is this a product or a feature that Anthropic/Microsoft/Google will build natively?
