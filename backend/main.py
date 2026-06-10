from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict, Any
from backend.engine.consensus import ConsensusEngine
import json
import os
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load env variables including ANTHROPIC_API_KEY
load_dotenv()

app = FastAPI(title="Quorum Engine")

# Allow the Next.js frontend to hit this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class NegotiateRequest(BaseModel):
    scenarioId: str

@app.post("/api/negotiate")
def negotiate(request: NegotiateRequest):
    try:
        # Load scenario JSON from the Next.js src/scenarios folder for now
        # We assume main.py is run from the Quorum root
        scenario_path = os.path.join(os.getcwd(), "src", "scenarios", f"{request.scenarioId}.json")
        if not os.path.exists(scenario_path):
            raise HTTPException(status_code=404, detail="Scenario not found")
            
        with open(scenario_path, "r") as f:
            contract = json.load(f)

        engine = ConsensusEngine()
        verdict = engine.run_negotiation(contract, max_rounds=3)
        transcript = engine.get_room_transcript()

        return {
            "verdict": verdict,
            "transcript": transcript,
            "contract": contract
        }
    except Exception as e:
        print(f"Server Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
