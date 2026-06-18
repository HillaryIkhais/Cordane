<div align="center">
  <img src="./frontend/public/logo-wordmark.png" alt="Cordane" width="200" />
  <h1>Cordane.</h1>
  <p><b>Four agents. One verdict. No more email chains.</b></p>
  
  <p>
    <img src="https://img.shields.io/badge/Track-Internal_Enterprise_Workflows-C8853A?style=flat-square" alt="Track 1" />
    <img src="https://img.shields.io/badge/Hackathon-Band_of_Agents_2026-1A1A1A?style=flat-square" alt="Hackathon" />
    <img src="https://img.shields.io/badge/Partner-Band_SDK-0066FF?style=flat-square" alt="Band SDK" />
    <img src="https://img.shields.io/badge/Partner-AI%2FML_API-00AA66?style=flat-square" alt="AI/ML API" />
  </p>

  <p>
    <img src="https://img.shields.io/badge/Python-3.11+-blue?style=flat-square" alt="Python" />
    <img src="https://img.shields.io/badge/Next.js-14-black?style=flat-square" alt="Next.js" />
    <img src="https://img.shields.io/badge/FastAPI-0.111-green?style=flat-square" alt="FastAPI" />
  </p>

  <p>
    <a href="https://cordane-theta.vercel.app"><b>Live Demo</b></a>
  </p>
</div>

---

## The Problem

Enterprise contract approvals stall not because people don't care — but because Legal doesn't know what Finance flagged, and Risk doesn't know what Ops needs.

The average vendor contract takes **eleven days** to clear internal review. Eleven days of Slack threads, reply-all emails, and missed deadlines. Nobody reads what the other department surfaced. The contract sits in someone's inbox.

Cordane puts Legal, Finance, Risk, and Ops in the same room — and makes them actually talk to each other.

---

## What Cordane Does

You submit a vendor contract. Four specialized AI agents read it simultaneously, then negotiate through a **Band shared room** — each agent reading what the others flag and recalibrating in real time.

They don't run in parallel and dump four separate reports. They react to each other. When Legal flags an uncapped liability clause, Risk reads it and elevates its threat score. When Finance recalculates the budget threshold, Ops adjusts its integration assessment. The dependencies are real, not theatrical.

**Three possible outputs:**
- **Approved** — agents reached consensus, full audit trail attached
- **Rejected** — specific clause or constraint blocked consensus, exact reason surfaced  
- **Escalated** — agents couldn't agree after 3 negotiation rounds; human gets a precise summary of exactly what's blocking and what each agent needs
- **Approved** — agents reached consensus, full audit trail attached
- **Rejected** — specific clause or constraint blocked consensus, exact reason surfaced
- **Escalated** — agents couldn't agree after 3 negotiation rounds; human gets a precise summary of exactly what's blocking and what each agent needs

The executive doesn't wade through four reports. One verdict. One audit trail. One action.

---

## Agent Roster

| Agent | Model | Provider | Role |
|:---|:---|:---|:---|
| **Legal** | `claude-3-5-sonnet-20240620` | AI/ML API | Parses contract language, flags liability terms, data ownership clauses, indemnification risks |
| **Finance** | `gpt-4o` | AI/ML API | Checks payment terms, cost thresholds, margin calculations, flags budget conflicts |
| **Risk** | `deepseek-reasoner` | AI/ML API | Scores vendor reliability, flags concentration risk, OFAC/GDPR compliance gaps |
| **Ops** | `meta-llama/Llama-3-70b-instruct` | AI/ML API | Assesses integration feasibility, timeline realism, team capacity blockers |
| **Legal** | `claude-3-5-sonnet-20240620` | AI/ML API | Parses contract language, flags liability terms, data ownership clauses, indemnification risks |
| **Finance** | `gpt-4o` | AI/ML API | Checks payment terms, cost thresholds, margin calculations, flags budget conflicts |
| **Risk** | `deepseek-reasoner` | AI/ML API | Scores vendor reliability, flags concentration risk, OFAC/GDPR compliance gaps |
| **Ops** | `meta-llama/Llama-3-70b-instruct` | AI/ML API | Assesses integration feasibility, timeline realism, team capacity blockers |

Each model was selected for the specific cognitive task of that agent — not by popularity. Claude leads every legal benchmark for clause identification and ambiguous language interpretation. GPT-4o handles numerical precision. DeepSeek-Reasoner is built for chain-of-thought multi-factor scoring. Llama 3 70B handles practical operational reasoning at speed.

---

## Why Band Is the Backbone — Not a Wrapper

This is the architectural decision that makes Cordane different from every other multi-agent submission.

Most systems run agents in parallel, collect their outputs, and push a summary to Band at the end. That's a notification channel.

In Cordane, **every agent-to-agent handoff goes through Band's shared room**. The Finance agent cannot set its budget threshold without reading what Legal posted. The Risk agent cannot calibrate its threat score without Finance's constraints. Band is not where results are reported — it's where the negotiation happens.

When a judge looks at the Band room logs, they will see a real conversation: agents @mentioning each other, posting structured context, and changing their positions based on what they read. That's the collaboration criterion. Not simulated — demonstrated.

---

## System Architecture

```mermaid
graph TD
    A[Executive] -->|Uploads Contract| B(Cordane Dashboard)
    B -->|REST API| C{FastAPI Orchestrator}
    
    C -->|@mention triggers| D[Band Shared Room]
    
    D -->|reads shared context| E[Legal: Claude 3.5 Sonnet]
    D -->|reads shared context| F[Finance: GPT-4o]
    D -->|reads shared context| G[Risk: DeepSeek-Reasoner]
    D -->|reads shared context| H[Ops: Llama 3 70B]
    
    E -->|posts clause flags + risk scalar| D
    F -->|posts budget threshold + payment verdict| D
    G -->|posts threat score + compliance flags| D
    H -->|posts feasibility verdict + timeline| D
    
    D -->|full negotiation log| I{Consensus Evaluator}
    
    I -->|veto + bounded rounds max 3| J{Resolved?}
    
    J -->|all agents pass| K[APPROVED]
    J -->|unresolvable after round 3| L[ESCALATED to Executive]
    J -->|unanimous hard reject| M[REJECTED]
    J -->|all agents pass| K[APPROVED]
    J -->|unresolvable after round 3| L[ESCALATED to Executive]
    J -->|unanimous hard reject| M[REJECTED]
    
    K & L & M -->|immutable audit trail| N[Band Room Log]
```

---

## Consensus Mechanism
## Consensus Mechanism

Cordane's decision logic is deterministic, not probabilistic:

1. **Any agent can veto** if a hard constraint is violated (uncapped liability, budget 3x+ over threshold, OFAC hit)
2. **Agents negotiate for up to 3 rounds** — each round, agents read the full Band room history and post updated positions
3. **If any hard veto remains after round 3** → escalate to human with a precise breakdown of what's blocking and what each agent needs to resolve it
3. **If any hard veto remains after round 3** — escalate to human with a precise breakdown of what's blocking and what each agent needs to resolve it
4. **The human gets three options**: Approve Anyway / Reject / Send Back for Revision

This guarantees Cordane never silently approves a dangerous contract and never hallucinates a compromise.

---

## The Demo Scenarios
## Demo Scenarios

Each scenario is engineered to produce a genuinely different outcome — proving Cordane is a reasoning system, not a scripted demo:

| Scenario | Contract Profile | Expected Outcome |
|:---|:---|:---|
| **A — Clean Approve** | Standard terms, budget within threshold, reliable vendor, realistic timeline | Agents reach consensus in round 1. Fast approval. |
| **B — Clear Reject** | Uncapped liability, budget 4x over threshold, vendor has no track record | Legal and Risk veto in round 1. Escalate with reject recommendation. |
| **C — Ambiguous** | One fixable clause, slightly over budget, mid-tier vendor | Round 2 negotiation. Conditional approval with one contract amendment. |

---

## Tech Stack

| Layer | Technology |
|:---|:---|
| Agent coordination | Band SDK (Python) — shared room, @mention routing, structured context |
| Agent inference | AI/ML API — unified gateway for all four models |
| Backend | Python 3.11 + FastAPI + Pydantic V2 |
| Frontend | Next.js 14 + Tailwind CSS + Framer Motion |
| Dark/Light mode | next-themes |
| Deployment | Render (backend) + Vercel (frontend) |

---

## Project Structure

```
cordane/
├── api/
│   ├── server.py                        # FastAPI app + /api/negotiate endpoint
│   ├── evaluators/
│   │   ├── base.py                      # AI/ML API client, model routing
│   │   └── tribunes.py                  # Four agent definitions + Band room posting
│   └── orchestration/
│       ├── mesh_state.py                # EnterpriseContextRegistry (Pydantic V2)
│       ├── cordane_optimized_mesh.py    # Veto + bounded rounds orchestrator
│       └── cordane_global_sentinel.py   # Pre-flight contract validation
├── frontend/
│   ├── src/app/
│   │   ├── page.tsx                     # Landing page
│   │   ├── platform/page.tsx            # Upload + negotiation room
│   │   └── dashboard/page.tsx           # User dashboard
│   └── process_logo.py                  # Logo processing utility
├── render.yaml
├── .env.example
└── README.md
```

---

## Local Setup

### Prerequisites
- Python 3.11+
- Node.js 18+
- AI/ML API key ([get one here](https://aimlapi.com))
- Band SDK API key ([get one here](https://app.band.ai))

### Backend

```bash
cd api
pip install -r requirements.txt

# .env
AIML_API_KEY=your_key_here
BAND_API_KEY=your_key_here

uvicorn server:app --reload
```

### Frontend

```bash
cd frontend
npm install

# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000

npm run dev
```

---

## Deployment

### Backend → Render
1. Create a new **Web Service** on [Render](https://render.com)
2. Connect this repository
3. **Build Command:** `cd api && pip install -r requirements.txt`
4. **Start Command:** `cd api && uvicorn server:app --host 0.0.0.0 --port $PORT`
5. Add environment variables: `AIML_API_KEY`, `BAND_API_KEY`

### Frontend → Vercel
1. Import this repository on [Vercel](https://vercel.com)
2. Set **Root Directory** to `frontend`
3. Add environment variable: `NEXT_PUBLIC_API_URL` (your live Render URL)
4. Deploy

---

## Resilience & Safety

Cordane is built for regulated enterprise environments:

- **No hallucinated compromises** — if agents can't agree, the system stops and escalates
- **Immutable audit trail** — every agent decision, every negotiation round, every flag is stored in Band's room log and available for legal discovery
- **Human-in-the-loop gate** — no contract is approved or rejected without the option for executive override
- **Pydantic V2 validation** — every agent output is schema-validated before it affects the shared state; malformed outputs are rejected, not passed downstream

---

## Built By

Team **Stratum** · Band of Agents Hackathon 2026  
**Hillary Ikhais** — ML Engineer, CS student at FUPRE, Nigeria
Team **Stratum** · Band of Agents Hackathon 2026
[github.com/HillaryIkhais](https://github.com/HillaryIkhais)

---

<div align="center">
  <p><i>Surface every risk. Resolve every conflict. Sign the right contracts.</i></p>
  <p><b>Cordane.</b></p>
</div>
