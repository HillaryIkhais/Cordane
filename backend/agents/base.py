from backend.band.room import BandRoom
import anthropic
import json
import os
from pydantic import BaseModel
from typing import List

class EvaluationResult(BaseModel):
    stance: str  # approve, reject, conditional, escalate
    reasoning: str
    constraints: List[str] = []

class BaseAgent:
    def __init__(self, agent_id: str, role: str, room: BandRoom, system_prompt: str):
        self.id = agent_id
        self.role = role
        self.room = room
        self.system_prompt = system_prompt
        # Anthropic key will be loaded from .env when the server starts
        self.client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY", "mock-key"))

    def evaluate(self, contract: dict, round_num: int) -> EvaluationResult:
        transcript = self.room.get_transcript()
        
        prompt = f"""You are the {self.role.upper()} Agent in a company's procurement workflow.
{self.system_prompt}

You are in a live negotiation room with other department agents.
Vendor Contract Details:
{json.dumps(contract, indent=2)}

Negotiation Room Transcript (Round {round_num}/3):
{json.dumps(transcript, indent=2)}

Provide your evaluation in strict JSON format:
{{
  "stance": "approve" | "reject" | "conditional" | "escalate",
  "reasoning": "Short explanation of your decision",
  "constraints": ["Array of specific constraints or amendments you require"]
}}"""

        try:
            if self.client.api_key == "mock-key":
                # ---------------- MOCK MODE (NO API COST) ----------------
                # Dynamically generate a fake response based on the scenario ID
                scenario_id = contract.get("id", "")
                
                if scenario_id == "scenario-1": # Happy Path
                    parsed = {"stance": "approve", "reasoning": f"Everything looks great from a {self.role} perspective.", "constraints": []}
                elif scenario_id == "scenario-2": # Compromise
                    if self.role == "finance":
                        parsed = {"stance": "conditional", "reasoning": "Cost is slightly high. We need a 3-month trial first.", "constraints": ["3-month trial"]}
                    elif self.role == "ops":
                        if "3-month trial" in str(transcript):
                            parsed = {"stance": "approve", "reasoning": "I can adjust the integration timeline to fit the 3-month trial.", "constraints": []}
                        else:
                            parsed = {"stance": "pending", "reasoning": "Waiting for finance approval on budget.", "constraints": []}
                    else:
                        parsed = {"stance": "approve", "reasoning": f"No major {self.role} issues.", "constraints": []}
                else: # Deadlock
                    if self.role == "legal":
                        parsed = {"stance": "reject", "reasoning": "Unacceptable data ownership terms.", "constraints": ["Vendor cannot own derived data"]}
                    elif self.role == "risk":
                        parsed = {"stance": "escalate", "reasoning": "Security score is far too low.", "constraints": ["Requires full security audit"]}
                    else:
                        parsed = {"stance": "approve", "reasoning": "Looks fine to me.", "constraints": []}
                
                # Simulate network delay for the cinematic UI feel
                import time
                time.sleep(1.5)
                # ---------------------------------------------------------
            else:
                response = self.client.messages.create(
                    model="claude-3-haiku-20240307",
                    max_tokens=1024,
                    system="You are an autonomous AI decision agent. Always respond in valid JSON matching the exact requested schema.",
                    messages=[{"role": "user", "content": prompt}]
                )
                content = response.content[0].text
                json_str = content[content.find("{"):content.rfind("}")+1]
                parsed = json.loads(json_str)
            
            result = EvaluationResult(**parsed)
            
            room_message = result.reasoning
            if result.constraints:
                room_message += f" | Required Constraints: {', '.join(result.constraints)}"
            
            self.post_to_room(room_message)
            return result
        except Exception as e:
            print(f"Error in {self.role} agent: {e}")
            return EvaluationResult(stance="escalate", reasoning="Agent encountered an error.", constraints=[])

    def post_to_room(self, content: str):
        self.room.post_message(self.id, self.role, content)
