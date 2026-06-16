from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field, ValidationError
from typing import Dict, Any, List
import json
import os
import uuid
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

from .evaluators.tribunes import execute_mesh_graph

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

SCENARIOS_FILE = os.path.join(os.path.dirname(__file__), "data", "scenarios.json")

def load_scenarios():
    if not os.path.exists(SCENARIOS_FILE):
        return []
    with open(SCENARIOS_FILE, "r") as f:
        return json.load(f)

def save_scenarios(scenarios):
    os.makedirs(os.path.dirname(SCENARIOS_FILE), exist_ok=True)
    with open(SCENARIOS_FILE, "w") as f:
        json.dump(scenarios, f, indent=2)

class NegotiateRequest(BaseModel):
    scenarioId: str

class ApproveRequest(BaseModel):
    scenarioId: str
    auth_token: str = Field(default="")
    human_clause_diff: str = Field(default="")

class ScenarioCreateRequest(BaseModel):
    title: str
    contract_text: str

class AgentEvaluation(BaseModel):
    vote: bool = Field(description="True if the contract clause passes internal thresholds.")
    score: float = Field(description="A mathematical risk score between 0.0 (high risk) and 1.0 (perfect).")
    justification: str = Field(description="Detailed structural reasoning for the audit trail.")

@app.get("/api/scenarios")
async def get_scenarios():
    return load_scenarios()

@app.post("/api/scenarios")
async def create_scenario(req: ScenarioCreateRequest):
    scenarios = load_scenarios()
    new_scenario = {
        "id": f"scenario_{str(uuid.uuid4())[:8]}",
        "title": req.title,
        "status": "Ready",
        "date": datetime.now().strftime("%b %d, %Y"),
        "contract": { "raw_text": req.contract_text }
    }
    scenarios.append(new_scenario)
    save_scenarios(scenarios)
    return new_scenario

@app.post("/api/negotiate")
async def negotiate_contract(req: NegotiateRequest):
    # Retrieve the contract
    contract_text = ""
    scenario = next((s for s in load_scenarios() if s["id"] == req.scenarioId), None)
    if scenario:
        if "Adversarial" in scenario["title"]:
            contract_text = "ERROR: Unexpected EOF. [Null] values in Liability array."
        else:
            contract_text = f"Simulated contract body for {scenario['title']}...\n\nLiability Cap: $5,000,000\nPayment Terms: Net-30"

    # 1. Demonstrate Anti-Avalanche Resilience (Catching Pydantic Validation Errors)
    try:
        if "Adversarial" in contract_text or "[Null]" in contract_text:
            # Simulate a malformed LLM extraction that breaks the rigid float schema
            malformed_output = {"vote": "Maybe?", "score": "Not a number", "justification": "Text is corrupted."}
            _ = AgentEvaluation(**malformed_output) # This will purposefully throw ValidationError
            
    except ValidationError as e:
        print("[Quorum Security] Caught Adversarial Extraction Error safely.")
        return {
            "contract": contract_text,
            "transcript": [
                {"role": "system", "id": "sys_err", "content": "CRITICAL RISK: Contract structure is malformed or adversarial. Pydantic extraction failed. Safely halting graph execution."}
            ],
            "verdict": {
                "status": "PENDING_HUMAN_REVIEW",
                "action_required": "Manual Audit Required: Corrupted Document"
            }
        }

    # 2. Execute Deterministic Mesh Parallelism Graph
    if contract_text.lower().find("liability") != -1:
        # Run the Mesh Graph concurrently
        registry = await execute_mesh_graph(req.scenarioId, contract_text)
        
        all_approved = all(registry.agent_verdicts.values())
        
        if not all_approved:
            return {
                "contract": contract_text,
                "transcript": registry.audit_stream + [
                    {"role": "arbiter", "id": "arb_1", "content": f"The review board could not reach a clean consensus (Risk Multiplier: {registry.active_risk_multiplier}). Pausing review for human sign-off.", "score": 0.0}
                ],
                "verdict": {
                    "status": "PENDING_HUMAN_REVIEW",
                    "action_required": "Review agent feedback and make a final decision",
                    "contested_standard": "Liability Cap: $1,000,000\nPayment Terms: Net-30",
                    "vendor_target": "Liability Cap: Unlimited\nPayment Terms: Net-60"
                }
            }
        
        # If all approved
        return {
            "contract": contract_text,
            "transcript": registry.audit_stream,
            "verdict": {
                "status": "APPROVED",
                "action_required": "None"
            }
        }

    raise HTTPException(status_code=404, detail="Scenario not found")

@app.post("/api/approve")
async def approve_override(req: ApproveRequest):
    if req.auth_token != "CORDANE_SECURE_ADMIN_HASH_2026":
        raise HTTPException(status_code=403, detail="Unauthorized access. Admin token required.")
        
    updated_log = f"Manual override by admin: {req.human_clause_diff}"
    
    return {
        "status": "APPROVED_MANUALLY",
        "audit_report": {
            "reasoning": updated_log,
            "final_liability": "Defined by Executive Diff",
            "final_terms": "Defined by Executive Diff",
            "timestamp": datetime.now().isoformat(),
            "authorized_by": "ADMIN_EXEC_01"
        }
    }
