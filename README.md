<div align="center">
  <img src="./frontend/public/logo-wordmark.png" alt="Cordane Logo" width="220" />
  <h1>Cordane.</h1>
  <p><b>The autonomous consensus engine that surfaces every contract risk before you sign.</b></p>
  
  <p>
    <img src="https://img.shields.io/badge/Track-Internal_Enterprise-cc8b45?style=flat-square" alt="Track 1" />
    <img src="https://img.shields.io/badge/Partner-Band_SDK-blue?style=flat-square" alt="Band SDK" />
    <img src="https://img.shields.io/badge/Partner-AI%2FML_API-green?style=flat-square" alt="AI/ML API" />
  </p>

  <p>
    <a href="https://cordane-theta.vercel.app"><b>🔗 Live Demo</b></a>
  </p>
</div>

---

## 🏆 The Problem

Enterprise contract reviews stall because Legal, Finance, Risk, and Operations can't align. They email in circles. Deals collapse — not because the terms were wrong, but because the right people never agreed in time.

**Cordane puts all four departments in the same room, simultaneously, before you sign anything.**

## 🧠 How It Works

Cordane is a deterministic, multi-agent consensus engine. A vendor contract is submitted. Four specialized AI agents — each powered by the model best suited for its domain — read it at the same time, debate the clauses through a shared Band room, and force a mathematically-grounded verdict. Executives only intervene when agents reach genuine deadlock.

## 🎯 AI/ML API — Mixture of Experts Architecture

Every agent is powered by a different frontier model, routed exclusively through AI/ML API. This is not a single-model wrapper. This is a genuine Mixture of Experts:

| Department | Model | Rationale |
| :--- | :--- | :--- |
| ⚖️ **Legal** | `claude-3-5-sonnet-20240620` | Best-in-class for dense document parsing and legal nuance |
| 💰 **Finance** | `gpt-4o` | Superior numerical reasoning and structured data extraction |
| 🛡️ **Risk** | `deepseek-reasoner` | Deep Chain-of-Thought for compliance edge cases |
| ⚙️ **Ops** | `meta-llama/Llama-3-70b-chat-hf` | Efficient open-weights model for SLA structuring |

## 🔌 Band SDK — The Collaboration Backbone

Band is not a side channel in Cordane. It **is** the negotiation layer.

The FastAPI orchestrator @mentions agents into a shared Band room. Each agent reads the full conversation context from the room, reasons against it, and posts its verdict back. The next agent reads that verdict before it reasons. This creates genuine cross-departmental awareness — Legal's position shapes Finance's calculation, which shapes Risk's threshold.

```mermaid
graph TD
    A[Executive] -->|Uploads Contract| B(Cordane Dashboard)
    B -->|REST API| C{FastAPI Orchestrator}
    
    C -->|@mention| D[Band Shared Room]
    
    D -->|reads context, responds| E[Legal: Claude 3.5 Sonnet]
    D -->|reads context, responds| F[Finance: GPT-4o]
    D -->|reads context, responds| G[Risk: DeepSeek-Reasoner]
    D -->|reads context, responds| H[Ops: Llama 3 70B]
    
    E -->|posts verdict + flags| D
    F -->|posts verdict + flags| D
    G -->|posts verdict + flags| D
    H -->|posts verdict + flags| D
    
    D -->|full conversation log| I{Consensus Evaluator}
    
    I -->|all pass| J[✅ APPROVED]
    I -->|hard veto remains| K[⚠️ ESCALATED]
    I -->|unanimous reject| L[❌ REJECTED]
```

## 🚀 Deployment

Cordane is a clean monorepo. Frontend and backend deploy independently.

### Backend (Render)
1. Push this repository to GitHub.
2. Log in to [Render](https://dashboard.render.com/) → **New Web Service** → select this repo.
3. **Build Command:** `cd api && pip install -r requirements.txt`
4. **Start Command:** `cd api && uvicorn server:app --host 0.0.0.0 --port $PORT`
5. Add Environment Variables: `AIML_API_KEY`, `BAND_API_KEY`.

### Frontend (Vercel)
1. Log in to [Vercel](https://vercel.com/) → import this repository.
2. Set **Root Directory** to `frontend`.
3. Add Environment Variable: `NEXT_PUBLIC_API_URL` → your live Render URL.
4. Deploy. Vercel auto-detects Next.js.

## 🛡️ Escalation Safety

When agents reach deadlock — Legal demands a $5M liability cap, Finance demands $10M — Cordane does not hallucinate a compromise. It does not silently approve. It surfaces the exact contested clauses side-by-side and flags the decision for human executive override. The entire debate is logged as an immutable audit trail.

**Autonomous AI should never silently approve a bad contract. Cordane guarantees it won't.**
