"use client";
import { motion } from "framer-motion";
import { Shield, Coins, FileCheck, Cog } from "lucide-react";

export default function AgentsPage() {
  const agents = [
    { id: "agent-legal", role: "Legal", icon: Shield, color: "#2a9d8f", desc: "Enforces strict liability caps and IP ownership clauses." },
    { id: "agent-finance", role: "Finance", icon: Coins, color: "#e9c46a", desc: "Protects budget constraints and payment net terms." },
    { id: "agent-risk", role: "Risk", icon: FileCheck, color: "#e76f51", desc: "Evaluates SLA guarantees and vendor SOC2 compliance." },
    { id: "agent-ops", role: "Operations", icon: Cog, color: "#f4a261", desc: "Ensures technical feasibility and uptime requirements." }
  ];

  return (
    <div className="flex flex-col items-center px-4 sm:px-8 pb-20">
      <motion.div initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}} className="w-full max-w-7xl mb-12 text-center">
        <h1 className="text-4xl font-light text-[#4e342e] mb-4">Autonomous Agents</h1>
        <p className="text-[#8d6e63] font-light text-lg">The Cordane consensus engine is powered by four specialized AI models.</p>
      </motion.div>

      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {agents.map((agent, i) => (
          <motion.div 
            key={agent.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/50 backdrop-blur-xl border border-white/80 rounded-3xl p-8 shadow-[0_10px_30px_-10px_rgba(224,122,95,0.15)] flex flex-col items-center text-center relative overflow-hidden group hover:-translate-y-1 transition-transform"
          >
            <div className={`absolute top-0 w-full h-2 opacity-80`} style={{backgroundColor: agent.color}} />
            <div className="bg-white/60 p-5 rounded-full border border-white/80 mb-6 shadow-sm">
              <agent.icon className="w-10 h-10" style={{color: agent.color}} strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-semibold text-[#4e342e] mb-3">{agent.role}</h2>
            <p className="text-[#8d6e63] text-sm leading-relaxed">{agent.desc}</p>
            <div className="mt-8 bg-white/80 px-5 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase text-emerald-600 border border-white/80 shadow-inner">
              System Online
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
