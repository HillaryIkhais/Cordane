"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, FileText, Settings, Play } from "lucide-react";

export default function PlatformPage() {
  const [scenarioId, setScenarioId] = useState("scenario_1_happy_path");
  const [contract, setContract] = useState<any>(null);
  const [transcript, setTranscript] = useState<any[]>([]);
  const [verdict, setVerdict] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeAgentColor, setActiveAgentColor] = useState("rgba(244, 162, 97, 0.4)"); 

  useEffect(() => {
    if (transcript.length > 0) {
      const lastMsg = transcript[transcript.length - 1];
      const colorMap: Record<string, string> = {
        legal: "rgba(42, 157, 143, 0.6)",
        finance: "rgba(233, 196, 106, 0.6)",
        risk: "rgba(231, 111, 81, 0.6)",
        ops: "rgba(244, 162, 97, 0.6)",
        system: "rgba(255, 255, 255, 0.6)"
      };
      setActiveAgentColor(colorMap[lastMsg.role] || "rgba(244, 162, 97, 0.4)");
    } else {
      setActiveAgentColor("rgba(244, 162, 97, 0.4)");
    }
  }, [transcript]);

  const handleRunNegotiation = async () => {
    setLoading(true);
    setVerdict(null);
    setTranscript([]);
    setContract(null);
    setActiveAgentColor("rgba(255, 255, 255, 0.8)");

    try {
      const res = await fetch("http://localhost:8000/api/negotiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenarioId }),
      });
      if (res.ok) {
        const data = await res.json();
        setContract(data.contract);
        setTranscript(data.transcript);
        setVerdict(data.verdict);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setActiveAgentColor("rgba(244, 162, 97, 0.4)");
    }
  };

  return (
    <div className="flex flex-col items-center px-4 sm:px-8 pb-20">
      
      {/* The Breathing Orb (Engine Core) */}
      <motion.div 
        animate={{ 
          background: `radial-gradient(circle, ${activeAgentColor} 0%, rgba(255,255,255,0) 70%)`,
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full blur-[80px] z-[-1] opacity-90"
      />

      {/* Control Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
      >
        <div>
          <h1 className="text-3xl font-light text-[#4e342e]">Consensus Engine</h1>
          <p className="text-[#8d6e63] font-light">Select a scenario to begin multi-agent evaluation.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <select 
            value={scenarioId} 
            onChange={(e) => setScenarioId(e.target.value)}
            className="bg-white/60 backdrop-blur-md border border-white/60 text-[#4e342e] text-sm px-6 py-3 rounded-full outline-none focus:ring-2 ring-white/80 font-medium cursor-pointer shadow-sm"
          >
            <option value="scenario_1_happy_path">Scenario 01: Happy Path</option>
            <option value="scenario_2_compromise">Scenario 02: Compromise</option>
            <option value="scenario_3_deadlock">Scenario 03: Deadlock</option>
          </select>
          <button 
            onClick={handleRunNegotiation}
            disabled={loading}
            className="flex items-center gap-2 bg-gradient-to-r from-[#e07a5f] to-[#e29578] disabled:opacity-50 text-white px-8 py-3 rounded-full text-sm font-semibold transition-all shadow-[0_4px_15px_0_rgba(224,122,95,0.3)] hover:shadow-[0_8px_25px_0_rgba(224,122,95,0.5)] active:scale-95"
          >
            {loading ? <Activity className="w-4 h-4 animate-pulse" /> : <Play className="w-4 h-4 fill-current" />}
            {loading ? "EXECUTING..." : "RUN ENGINE"}
          </button>
        </div>
      </motion.div>

      {/* GLASS GRID LAYOUT */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 z-10">
        
        {/* Card 1: Ingestion */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="col-span-1 bg-white/50 backdrop-blur-2xl border border-white/80 rounded-[2.5rem] p-8 shadow-[0_15px_40px_-10px_rgba(224,122,95,0.1)] flex flex-col h-[650px] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/90 to-transparent blur-3xl rounded-full"></div>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#e07a5f] border border-[#e07a5f]/30 px-3 py-1 rounded-full">/01</span>
            <h2 className="text-xl font-medium text-[#4e342e]">Contract Details</h2>
          </div>
          <div className="flex-1 bg-white/40 rounded-2xl p-6 border border-white/60 overflow-y-auto shadow-inner">
            {contract ? (
              <pre className="text-[11px] font-mono text-[#8d6e63] whitespace-pre-wrap leading-relaxed">
                {JSON.stringify(contract, null, 2)}
              </pre>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-[#a1887f] opacity-70">
                <FileText className="w-12 h-12 mb-3 stroke-[1]" />
                <p className="text-sm font-light">Awaiting contract data.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Card 2: Live Telemetry */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="col-span-1 md:col-span-2 bg-white/50 backdrop-blur-2xl border border-white/80 rounded-[2.5rem] p-8 shadow-[0_15px_40px_-10px_rgba(224,122,95,0.1)] flex flex-col h-[650px] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/90 to-transparent blur-3xl rounded-full"></div>
          
          <div className="flex justify-between items-center mb-8 relative z-10">
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#e07a5f] border border-[#e07a5f]/30 px-3 py-1 rounded-full">/02</span>
              <h2 className="text-xl font-medium text-[#4e342e]">Agent Live Chat</h2>
            </div>
            
            <AnimatePresence>
              {verdict && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-full border border-white shadow-sm flex items-center gap-3"
                >
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#8d6e63]">Consensus:</span>
                  <span className={`font-semibold text-sm ${
                    verdict.status === 'Approved' ? 'text-teal-600' : 
                    verdict.status === 'Conditional Approval' ? 'text-amber-600' : 'text-rose-600'
                  }`}>
                    {verdict.status}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-4 pr-4 relative z-10">
            <AnimatePresence>
              {transcript.length > 0 ? transcript.map((msg, idx) => {
                if (msg.role === 'system') return null;
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] relative overflow-hidden"
                  >
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                          msg.role === 'legal' ? 'bg-[#2a9d8f]' :
                          msg.role === 'finance' ? 'bg-[#e9c46a]' :
                          msg.role === 'risk' ? 'bg-[#e76f51]' : 'bg-[#f4a261]'
                        }`} />

                    <div className="flex justify-between items-center mb-3 ml-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-[#4e342e] opacity-80">{msg.role}</span>
                      </div>
                      <span className="text-[10px] text-[#a1887f] font-mono">{msg.id}</span>
                    </div>
                    <p className="text-sm text-[#4e342e] leading-relaxed font-medium ml-2">{msg.content}</p>
                  </motion.div>
                );
              }) : (
                <div className="h-full flex flex-col items-center justify-center text-[#a1887f] opacity-70">
                  <Settings className="w-12 h-12 mb-3 stroke-[1] animate-[spin_10s_linear_infinite]" />
                  <p className="text-sm font-light">System idle. Ready for intelligence.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
