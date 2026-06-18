import asyncio
import os
import os
from .base import BaseAgent
from .band_adapter import BandRoomAdapter
from ..orchestration.mesh_state import EnterpriseContextRegistry, AgentOutput
from ..orchestration.cordane_global_sentinel import GlobalRiskRegistry, run_global_procurement_mesh
from ..orchestration.cordane_optimized_mesh import ContractMeshState, ModelRoutingConfig, process_mesh_negotiation

# Initialize the real LLM agents for hybrid execution
_shared_room = BandRoomAdapter()
legal_agent = BaseAgent("agent-legal", "legal", _shared_room, "Protect company from liability.")
finance_agent = BaseAgent("agent-finance", "finance", _shared_room, "Protect budget and ROI.")
risk_agent = BaseAgent("agent-risk", "risk", _shared_room, "Vendor security.")
ops_agent = BaseAgent("agent-ops", "ops", _shared_room, "Integration feasibility.")

async def execute_mesh_graph(contract_id: str, raw_text: str) -> EnterpriseContextRegistry:
    registry = EnterpriseContextRegistry(contract_id=contract_id)
    
    # 1. Global Sentinel (Macroeconomic & Forensic Validation)
    global_risk = GlobalRiskRegistry(
        jurisdiction="APAC",
        live_inflation_multiplier=1.04,  # Pulled from mock API
        fraud_risk_score=0.1 # Simulate safe document
    )
    sentinel_res = run_global_procurement_mesh({"total_cost": 60000}, global_risk)
    
    registry.audit_stream.append({
        "role": "system",
        "content": sentinel_res["logs"] + f" (Inflation Multiplier: {global_risk.live_inflation_multiplier})",
        "score": 1.0 - global_risk.fraud_risk_score
    })
    
    if sentinel_res["status"] == "CRITICAL_HALT_FRAUD_FLAGGED":
        # Halt execution
        registry.agent_verdicts = {"legal": False, "finance": False, "risk": False, "ops": False}
        return registry

    # 2. Optimized Mesh Configuration
    mesh_state = ContractMeshState()
    models = ModelRoutingConfig()
    
    # 3. Parallel Agent Inference (Live AI/ML API)
    _shared_room.clear()
    await _shared_room.post_message("system", "system", "Executing Deterministic Enterprise State-Machine")
    
    # We run the actual AI models in evaluate() via AI/ML API
    legal_res = await legal_agent.evaluate({"contract_text": raw_text}, 1)
    finance_res = await finance_agent.evaluate({"contract_text": raw_text}, 1)
    risk_res = await risk_agent.evaluate({"contract_text": raw_text}, 1)
    ops_res = await ops_agent.evaluate({"contract_text": raw_text}, 1)
    
    # Apply Veto-And-Revise Loop check
    veto_res = process_mesh_negotiation(raw_text, mesh_state, models)
    if "VETO_TRIGGERED" in veto_res["status"]:
        registry.active_risk_multiplier = mesh_state.dynamic_risk_scalar
        registry.audit_stream.append({
            "role": "system",
            "content": veto_res["logs"],
            "score": 0.5
        })
    
    # Record results
    registry.agent_verdicts = {
        "legal": legal_res.stance == "approve",
        "finance": finance_res.stance == "approve",
        "risk": risk_res.stance == "approve",
        "ops": ops_res.stance == "approve"
    }
    
    # Helper to calculate a rough score out of stance
    def score_from_stance(stance: str) -> float:
        if stance == "approve": return 0.95
        if stance == "conditional": return 0.80
        if stance == "escalate": return 0.40
        return 0.10

    registry.audit_stream.extend([
        {"role": "legal", "content": legal_res.reasoning, "score": score_from_stance(legal_res.stance)},
        {"role": "finance", "content": finance_res.reasoning, "score": score_from_stance(finance_res.stance)},
        {"role": "risk", "content": risk_res.reasoning, "score": score_from_stance(risk_res.stance)},
        {"role": "ops", "content": ops_res.reasoning, "score": score_from_stance(ops_res.stance)}
    ])
    
    return registry
