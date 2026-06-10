from backend.agents.specialized import LegalAgent, FinanceAgent, RiskAgent, OpsAgent
from backend.band.room import BandRoom
from typing import Dict, Any

class ConsensusEngine:
    def __init__(self):
        self.room = BandRoom()
        self.agents = {
            "legal": LegalAgent(self.room),
            "finance": FinanceAgent(self.room),
            "risk": RiskAgent(self.room),
            "ops": OpsAgent(self.room),
        }

    def run_negotiation(self, contract: Dict[str, Any], max_rounds: int = 3) -> Dict[str, Any]:
        self.room.clear()
        self.room.post_message("system", "system", "Negotiation Started.")

        final_stances = {}

        for round_num in range(1, max_rounds + 1):
            self.room.post_message("system", "system", f"--- Round {round_num} ---")
            
            # Agents evaluate. (Sequential execution for simplicity, fast enough for demo)
            legal_res = self.agents["legal"].evaluate(contract, round_num)
            finance_res = self.agents["finance"].evaluate(contract, round_num)
            risk_res = self.agents["risk"].evaluate(contract, round_num)
            ops_res = self.agents["ops"].evaluate(contract, round_num)

            final_stances = {
                "legal": legal_res,
                "finance": finance_res,
                "risk": risk_res,
                "ops": ops_res,
            }

            all_stances = [res.stance for res in final_stances.values()]

            if all(s in ["approve", "conditional"] for s in all_stances):
                return {
                    "status": "Conditional Approval" if "conditional" in all_stances else "Approved",
                    "summary": "All agents aligned.",
                    "roundReached": round_num,
                }
        
        blockers = " | ".join([f"{role.upper()}: {res.reasoning}" for role, res in final_stances.items() if res.stance in ["escalate", "reject"]])
        return {
            "status": "Escalate",
            "summary": f"Deadlock reached after {max_rounds} rounds. Blockers: {blockers}",
            "roundReached": max_rounds,
        }

    def get_room_transcript(self):
        return self.room.get_transcript()
