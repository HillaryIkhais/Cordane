<div align="center">
  <img src="https://via.placeholder.com/150x150/e07a5f/ffffff?text=Cordane" alt="Cordane Logo" width="120" />
  <h1>Cordane.</h1>
  <p><b>Your Personal Advisory Board. Built for the Band of Agents Hackathon.</b></p>
</div>

---

## 🏆 The Vision

In the real world, enterprise contract approvals take weeks of back-and-forth emailing between Legal, Finance, Risk, and Operations. **Cordane eliminates this bottleneck.**

Cordane is an autonomous multi-agent consensus engine. You drop a vendor contract on the table, and four specialized AI agents instantly cross-examine the terms, debate the risks, and negotiate a unified verdict. Instead of replacing humans, Cordane does the heavy lifting so executives only intervene when absolute deadlock occurs.

## 🧠 The Advisory Board

Cordane routes specific domain tasks to the best-in-class models via the **AI/ML API**, ensuring maximum reasoning capability across all vectors:

- ⚖️ **Legal (Claude 3.5 Sonnet):** Scrutinizes indemnification clauses, IP ownership, and data privacy compliance.
- 💰 **Finance (GPT-4o):** Protects the budget, analyzes margin impact, and enforces strict payment SLAs.
- 🛡️ **Risk (DeepSeek Reasoner):** Audits vendor security posture, data breach liability, and global compliance regulations.
- ⚙️ **Ops (Llama 3 70B):** Verifies integration feasibility and operational continuity.

## 🔌 Band SDK Integration (Track 1)

Cordane was built specifically for **Track 1: Internal Enterprise Workflows**. We heavily utilized the official `band-sdk` to bridge our local deterministic state machine with the live Band Chat Room network.

1. **Async Mesh Execution:** The FastAPI backend runs all four agents concurrently.
2. **Live SDK Sync:** The `BandRoomAdapter` leverages the `AgentTools` class from the `band-sdk` to push each agent's reasoning into the shared Band dashboard in real-time.
3. **Targeted Mentions:** Agents dynamically fetch the room `participants` and specifically mention the human user (`@handle`) to ensure high-visibility alerts within the Band UI.

## 🚀 Getting Started

### 1. Environment Setup
Create an `api/.env` file with your Band API credentials and AI/ML API Key:
```bash
AIML_API_KEY="your_aiml_api_key"

BAND_ROOM_ID="your_room_id"
BAND_LEGAL_AGENT_ID="your_agent_id"
BAND_LEGAL_API_KEY="your_api_key"
# ... (repeat for Finance, Risk, and Ops)
```

### 2. Run the Engine
```bash
# Install dependencies
pip install fastapi uvicorn pydantic python-dotenv openai band-sdk

# Start the Cordane Engine
cd api
uvicorn server:app --reload --port 8000
```

### 3. Run the Frontend (Cordane-Next)
Cordane comes with a gorgeous, warm, and highly immersive Next.js frontend to trigger the evaluations. 
*(Ensure your `cordane-next` server is running on port 3000/3007).*

## 🛡️ Resilience & Escalation Safety
If the agents detect unresolvable cross-departmental friction (e.g., Legal demands a $5M cap but Finance demands $10M), the system **safely halts execution**. It does not hallucinate a compromise. Instead, it triggers a `PENDING_HUMAN_REVIEW` flag, requesting a human-in-the-loop executive decision. This guarantees absolute real-world enterprise viability.
