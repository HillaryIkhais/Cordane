from pydantic import BaseModel, Field
from typing import Dict, List

class EnterpriseContextRegistry(BaseModel):
    contract_id: str
    base_liability_limit: float = 50000.0
    active_risk_multiplier: float = 1.0  # Shared dynamic state scalar
    agent_verdicts: Dict[str, bool] = {}
    audit_stream: List[str] = []

class AgentOutput(BaseModel):
    approved: bool
    calculated_score: float = Field(ge=0.0, le=1.0)
    remediation_log: str
