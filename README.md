# Cordane: Enterprise Behavioral Intelligence

Cordane is an autonomous multi-agent consensus engine designed to eliminate enterprise bottlenecks. 

In the real world, contract approvals take weeks of emailing between Legal, Finance, Risk, and Operations. Cordane replaces this bottleneck with **four specialized AI agents** that negotiate live, enforcing strict corporate constraints to reach an instant decision.

## The Choreographed Mesh Architecture
Cordane operates on a Deterministic Mesh Graph, specifically designed to satisfy Palantir-grade state-machine stability:
1. **The Intelligence Engine (Python FastAPI)**: Instead of sequential AI loops, Cordane runs 4 specialized agents concurrently. They execute via `execute_mesh_graph` while reading/writing to a shared `EnterpriseContextRegistry`.
2. **Dynamic Cross-Talk**: When an agent detects an anomaly (e.g., Liability thresholds breached), it dynamically updates the `active_risk_multiplier` in the Registry. The other concurrent agents mathematically adjust their constraint envelopes in real-time, preventing chaotic broadcast storms.
3. **The Tactical Dossier (Next.js)**: A highly immersive, Framer Motion-powered Command Center. It features real-time dynamic UI updates, quad-flashing agent computation nodes, and a Split-View Diff Box for manual conflict resolution.

## Resilience & Escalation Safety
If the Mesh Graph detects unresolvable cross-departmental friction, it safely halts execution. 
It does not hallucinate a compromise. It triggers the **Split-View Diff Box** and explicitly requests a human-in-the-loop adjustment paired with a cryptographic authorization token. This guarantees absolute real-world enterprise viability.

## Quick Start
1. Clone the repository.
2. Add your Anthropic API Key to `backend/.env`.
3. Start the backend: `cd backend && source .venv/bin/activate && uvicorn main:app --reload`
4. Start the frontend: `npm run dev`
5. Open `http://localhost:3000` to access the Command Center.
