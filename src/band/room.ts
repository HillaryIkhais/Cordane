export interface Message {
  id: string;
  agentId: string;
  role: "legal" | "finance" | "risk" | "ops" | "system";
  content: string;
  timestamp: number;
}

export class BandRoom {
  private messages: Message[] = [];

  postMessage(agentId: string, role: Message["role"], content: string) {
    const message: Message = {
      id: Math.random().toString(36).substring(7),
      agentId,
      role,
      content,
      timestamp: Date.now(),
    };
    this.messages.push(message);
    return message;
  }

  getTranscript(): Message[] {
    return this.messages;
  }

  clear() {
    this.messages = [];
  }
}
