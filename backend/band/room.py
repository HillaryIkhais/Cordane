import time
import uuid

class BandRoom:
    def __init__(self):
        self.messages = []

    def post_message(self, agent_id: str, role: str, content: str):
        message = {
            "id": str(uuid.uuid4())[:8],
            "agentId": agent_id,
            "role": role,
            "content": content,
            "timestamp": int(time.time() * 1000)
        }
        self.messages.append(message)
        return message

    def get_transcript(self):
        return self.messages

    def clear(self):
        self.messages = []
