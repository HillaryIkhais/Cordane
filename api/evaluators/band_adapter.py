import os
import time
import uuid
import logging
import asyncio
from typing import List, Dict, Any

from band import BandLink
from band.runtime.tools import AgentTools

logger = logging.getLogger(__name__)

class BandRoomAdapter:
    """
    A seamless bridge between Cordane's REST architecture and the 
    persistent Band AI websocket network. Ensures compliance with Hackathon Track 1.
    """
    def __init__(self):
        self.messages: List[Dict[str, Any]] = []
        self.room_id = os.environ.get("BAND_ROOM_ID")
        self.is_connected = False
        
        self.links: Dict[str, BandLink] = {}
        
        # Initialize links for all 4 agents if keys are present
        for role in ["LEGAL", "FINANCE", "RISK", "OPS"]:
            agent_id = os.environ.get(f"BAND_{role}_AGENT_ID")
            api_key = os.environ.get(f"BAND_{role}_API_KEY")
            if agent_id and api_key:
                self.links[role.lower()] = BandLink(agent_id=agent_id, api_key=api_key)
                
        if self.links and self.room_id:
            logger.info(f"Initialized Official Band SDK Connections for {len(self.links)} agents.")
            self.is_connected = True

    async def post_message(self, agent_id: str, role: str, content: str) -> Dict[str, Any]:
        """
        Posts a message to the shared context room on the Band platform.
        """
        msg_payload = {
            "id": str(uuid.uuid4())[:8],
            "agentId": agent_id,
            "role": role,
            "content": content,
            "timestamp": int(time.time() * 1000),
            "platform_sync": "local_fallback"
        }
        
        self.messages.append(msg_payload)
        
        link = self.links.get(role.lower())
        if self.is_connected and link:
            try:
                # 1. Fetch participants so the SDK knows who we can mention
                tools = AgentTools(room_id=self.room_id, rest=link.rest)
                participants = await tools.get_participants()
                
                # 2. Find the user to mention them
                user_handle = next((p.handle for p in participants if p.type == 'User'), None)
                
                # 3. Re-instantiate tools with participants dicts to pass validation
                p_dicts = [p.dict() if hasattr(p, 'dict') else p.__dict__ for p in participants]
                tools = AgentTools(room_id=self.room_id, rest=link.rest, participants=p_dicts)
                
                # 4. Send the message!
                mentions = [f"@{user_handle}"] if user_handle else None
                await tools.send_message(content, mentions=mentions)
                
                msg_payload["platform_sync"] = "success"
                logger.info(f"Successfully posted to Band as {role.upper()}")
            except Exception as e:
                logger.warning(f"Band SDK sync failed for {role}: {e}")
                msg_payload["platform_sync"] = "failed"
                
        return msg_payload

    def get_transcript(self) -> List[Dict[str, Any]]:
        return self.messages

    def clear(self):
        self.messages = []
