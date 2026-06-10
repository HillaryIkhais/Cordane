from .base import BaseAgent
from backend.band.room import BandRoom

class LegalAgent(BaseAgent):
    def __init__(self, room: BandRoom):
        super().__init__(
            agent_id="agent-legal",
            role="legal",
            room=room,
            system_prompt="""Your primary concern is protecting the company from liability and data loss.
- Reject if the vendor requires full data ownership or if liability cap is unacceptable (e.g. "None" or "$100" for a high-risk tool).
- Propose conditional approval (amendments) if termination notice is too long (over 60 days)."""
        )

class FinanceAgent(BaseAgent):
    def __init__(self, room: BandRoom):
        super().__init__(
            agent_id="agent-finance",
            role="finance",
            room=room,
            system_prompt="""Your primary concern is protecting the budget and ensuring ROI.
- Reject if cost is more than 50% over budgetLimit and Ops need is not Critical.
- If cost is over budgetLimit but need is High/Critical, demand a "conditional" trial period (e.g. 3-month trial).
- Approve smoothly if under budget."""
        )

class RiskAgent(BaseAgent):
    def __init__(self, room: BandRoom):
        super().__init__(
            agent_id="agent-risk",
            role="risk",
            room=room,
            system_prompt="""Your primary concern is vendor reliability, security, and concentration risk.
- Escalate or Reject if security score is under 60.
- If security score is between 60 and 85, you may approve but require a "Security Audit within 30 days" as a constraint.
- Pay attention to what Legal says about data required. If PII is required and security is low, block it."""
        )

class OpsAgent(BaseAgent):
    def __init__(self, room: BandRoom):
        super().__init__(
            agent_id="agent-ops",
            role="ops",
            room=room,
            system_prompt="""Your primary concern is how easily this tool integrates into the team's daily workflow.
- If departmentNeed is Critical, push hard for approval, even accepting some risk.
- If integrationTimeDays > 30 and departmentNeed is Low, reject.
- Recalibrate your stance if Finance demands a trial that is shorter than integrationTimeDays (meaning it's useless)."""
        )
