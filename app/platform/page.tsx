"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, ArrowLeft, CheckCircle2, AlertTriangle, XCircle, Download, RotateCcw } from "lucide-react";

type RoomState = "UPLOAD" | "NEGOTIATING" | "VERDICT";
type VerdictType = "APPROVED" | "ESCALATED" | "REJECTED";

const AGENTS = [
  { id: "LGL", name: "Legal", role: "Risk Mitigation" },
  { id: "FIN", name: "Finance", role: "Margin Analysis" },
  { id: "RSK", name: "Risk", role: "Global Compliance" },
  { id: "OPS", name: "Ops", role: "SLA Verification" },
];

export default function PlatformPage() {
  const [roomState, setRoomState] = useState<RoomState>("UPLOAD");
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  
  // Negotiation State
  const [messageIndex, setMessageIndex] = useState(0);
  const [verdict, setVerdict] = useState<VerdictType>("ESCALATED");

  // Real Backend State
  const [isFetching, setIsFetching] = useState(false);
  const [transcript, setTranscript] = useState<{role: string, content: string, score?: number}[]>([]);
  const [backendVerdict, setBackendVerdict] = useState<any>(null);

  // Auto-advance negotiation animation
  useEffect(() => {
    if (roomState === "NEGOTIATING" && !isFetching && transcript.length > 0) {
      const timer = setInterval(() => {
        setMessageIndex(prev => {
          if (prev >= transcript.length - 1) {
            clearInterval(timer);
            setTimeout(() => setRoomState("VERDICT"), 1500);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);
      return () => clearInterval(timer);
    }
  }, [roomState, isFetching, transcript.length]);

  const handleStartReview = async (scenario: string, demoVerdict: VerdictType) => {
    setSelectedScenario(scenario);
    setRoomState("NEGOTIATING");
    setMessageIndex(0);
    setTranscript([]);
    setIsFetching(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      
      // 1. Create Scenario
      let title = `Scenario ${scenario}`;
      let contract_text = "Standard liability terms apply.";
      
      if (scenario === "B") {
        title = "Scenario B Adversarial"; // Triggers ValidationError in backend
        contract_text = "Adversarial [Null] liability";
      }

      const createRes = await fetch(`${apiUrl}/api/scenarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, contract_text })
      });
      
      const scenarioData = await createRes.json();

      // 2. Negotiate
      const negotiateRes = await fetch(`${apiUrl}/api/negotiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenarioId: scenarioData.id })
      });

      const negotiateData = await negotiateRes.json();
      
      if (negotiateData.transcript) {
        setTranscript(negotiateData.transcript);
      }
      
      if (negotiateData.verdict) {
        setBackendVerdict(negotiateData.verdict);
        if (negotiateData.verdict.status === "APPROVED") setVerdict("APPROVED");
        else if (negotiateData.verdict.status === "PENDING_HUMAN_REVIEW") setVerdict("ESCALATED");
      } else {
        setVerdict(demoVerdict);
      }

    } catch (error) {
      console.error("Backend Error:", error);
      // Fallback
      setTranscript([{ role: "system", content: "Connection to backend failed. Please ensure the FastAPI server is running on port 8000." }]);
      setVerdict("ESCALATED");
    } finally {
      setIsFetching(false);
    }
  };

  const currentMessage = transcript[messageIndex];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      
      {/* HEADER */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider opacity-60 hover:opacity-100 transition-opacity">
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </Link>
          <span className="font-serif text-2xl tracking-tight text-[#e07a5f]">Cordane.</span>
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono uppercase opacity-50"><span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>Mesh Active</span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12 flex flex-col">
        <AnimatePresence mode="wait">
          
          {/* UPLOAD STATE */}
          {roomState === "UPLOAD" && (
            <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-12 w-full max-w-3xl mx-auto mt-10">
              <div className="text-center">
                <h1 className="font-serif text-4xl mb-4">Initialize Review Room</h1>
                <p className="opacity-70">Drop your contract to trigger the autonomous consensus mesh.</p>
              </div>

              {/* Drag and Drop Zone */}
              <div className="border-2 border-dashed border-border rounded-xl p-16 flex flex-col items-center justify-center text-center bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                <div className="w-16 h-16 rounded-full bg-[#e07a5f]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8 text-[#e07a5f]" />
                </div>
                <h3 className="font-bold text-lg mb-2">Drag & Drop Contract</h3>
                <p className="text-sm opacity-60 max-w-xs">Supports PDF, DOCX, and TXT files up to 50MB.</p>
              </div>

              {/* Demo Scenarios */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest opacity-50 mb-4 text-center">Or Trigger Demo Scenario</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button onClick={() => handleStartReview("A", "APPROVED")} className="p-4 border border-border rounded-lg bg-background/50 hover:border-[#e07a5f]/50 transition-colors text-left flex flex-col gap-2">
                    <span className="font-mono text-xs text-green-500">Scenario A</span>
                    <span className="font-bold">Clean Approve</span>
                    <span className="text-xs opacity-60">No risky clauses.</span>
                  </button>
                  <button onClick={() => handleStartReview("B", "REJECTED")} className="p-4 border border-border rounded-lg bg-background/50 hover:border-[#e07a5f]/50 transition-colors text-left flex flex-col gap-2">
                    <span className="font-mono text-xs text-red-500">Scenario B</span>
                    <span className="font-bold">Clear Reject</span>
                    <span className="text-xs opacity-60">Adversarial trigger.</span>
                  </button>
                  <button onClick={() => handleStartReview("C", "ESCALATED")} className="p-4 border border-border rounded-lg bg-[#e07a5f]/10 border-[#e07a5f]/30 transition-colors text-left flex flex-col gap-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-[#e07a5f] text-white text-[9px] font-bold px-2 py-0.5 rounded-bl-lg uppercase tracking-wider">Demo Default</div>
                    <span className="font-mono text-xs text-amber-500">Scenario C</span>
                    <span className="font-bold">Ambiguous</span>
                    <span className="text-xs opacity-60">Requires negotiation.</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* NEGOTIATING STATE */}
          {roomState === "NEGOTIATING" && (
            <motion.div key="negotiating" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-8 w-full h-full">
              
              <div className="flex justify-between items-center border-b border-border pb-4">
                <div>
                  <h2 className="font-serif text-2xl">Shared Negotiation Room</h2>
                  <p className="text-sm opacity-60 font-mono mt-1">Round 1 of 3 • Evaluating: Scenario {selectedScenario}</p>
                </div>
                <div className="px-4 py-2 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 animate-pulse">
                  {isFetching ? "Awaiting Backend LLMs..." : "Agents Negotiating..."}
                </div>
              </div>

              {/* Agent Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {AGENTS.map((agent) => {
                  const isActive = currentMessage?.role?.toLowerCase() === agent.id.toLowerCase() || currentMessage?.role?.toLowerCase() === agent.name.toLowerCase();
                  return (
                    <div key={agent.id} className={`p-4 rounded-lg border transition-all duration-300 ${isActive ? 'bg-background border-[#e07a5f] shadow-[0_0_20px_rgba(224,122,95,0.15)]' : 'bg-background/40 border-border opacity-70'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-serif text-lg">{agent.name}</span>
                        {isActive && <span className="w-2 h-2 rounded-full bg-[#e07a5f] animate-pulse"></span>}
                      </div>
                      <span className="font-mono text-[10px] uppercase opacity-60">{agent.role}</span>
                    </div>
                  );
                })}
              </div>

              {/* Live Chat Feed */}
              <div className="flex-1 bg-black/20 border border-border rounded-xl p-6 min-h-[300px] flex flex-col justify-end overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-background/80 to-transparent z-10"></div>
                <div className="flex flex-col gap-4 relative z-0">
                  <AnimatePresence mode="popLayout">
                    {!isFetching && transcript.slice(Math.max(0, messageIndex - 4), messageIndex + 1).map((msg, idx, arr) => {
                      const isLatest = idx === arr.length - 1;
                      const roleName = msg.role.toUpperCase();
                      return (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: isLatest ? 1 : 0.4, y: 0 }}
                          className="flex gap-4 items-start"
                        >
                          <div className={`font-mono text-[10px] font-bold pt-1 w-14 shrink-0 ${isLatest ? 'text-[#e07a5f]' : 'opacity-50'}`}>
                            {roleName.substring(0, 6)}
                          </div>
                          <div className={`font-sans text-sm leading-relaxed ${msg.content.includes('FLAG') || msg.content.includes('RISK') ? 'text-amber-500' : ''}`}>
                            {msg.content}
                          </div>
                        </motion.div>
                      );
                    })}
                    {isFetching && (
                       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center text-sm opacity-50 py-10">
                          Waiting for Featherless & AI/ML APIs to stream reasoning...
                       </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}

          {/* VERDICT STATE */}
          {roomState === "VERDICT" && (
            <motion.div key="verdict" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-12 w-full max-w-4xl mx-auto mt-10">
              
              <div className="text-center flex flex-col items-center">
                {verdict === "APPROVED" && <CheckCircle2 className="w-20 h-20 text-green-500 mb-6" />}
                {verdict === "ESCALATED" && <AlertTriangle className="w-20 h-20 text-amber-500 mb-6" />}
                {verdict === "REJECTED" && <XCircle className="w-20 h-20 text-red-500 mb-6" />}
                
                <h1 className="font-serif text-4xl mb-4">
                  {verdict === "APPROVED" && "Consensus Reached"}
                  {verdict === "ESCALATED" && "Decision Deadlock"}
                  {verdict === "REJECTED" && "Review Failed"}
                </h1>
                
                <p className="text-lg opacity-80 max-w-xl mx-auto">
                  {backendVerdict?.action_required || (verdict === "APPROVED" ? "All agents aligned. Safe to sign." : "Agents failed to reach consensus.")}
                </p>
              </div>

              {verdict === "ESCALATED" && (
                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-white/10 bg-black/20 flex justify-between items-center">
                    <h3 className="font-bold text-sm uppercase tracking-wider">Contested Standards</h3>
                    <span className="text-xs font-mono opacity-50">Extracted from Live Graph</span>
                  </div>
                  <div className="p-6 grid grid-cols-2 gap-8 text-sm">
                     <div>
                        <h4 className="font-bold text-[#e07a5f] mb-2 uppercase text-xs tracking-wider">Internal Constraint</h4>
                        <pre className="font-mono text-xs opacity-80 whitespace-pre-wrap">{backendVerdict?.contested_standard || "Strict Liability Limits"}</pre>
                     </div>
                     <div>
                        <h4 className="font-bold text-amber-500 mb-2 uppercase text-xs tracking-wider">Vendor Document</h4>
                        <pre className="font-mono text-xs opacity-80 whitespace-pre-wrap">{backendVerdict?.vendor_target || "Null or Uncapped Liability"}</pre>
                     </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8 border-t border-border">
                {verdict === "ESCALATED" && (
                  <>
                    <button className="px-8 py-4 bg-amber-500 text-white font-bold text-sm uppercase tracking-wider rounded-lg hover:bg-amber-600 transition-colors">
                      Approve Anyway
                    </button>
                    <button className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold text-sm uppercase tracking-wider rounded-lg hover:bg-white/5 transition-colors">
                      Send for Revision
                    </button>
                  </>
                )}
                
                {verdict !== "ESCALATED" && (
                  <button className="px-8 py-4 bg-white/10 text-white font-bold text-sm uppercase tracking-wider rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" /> Download Report
                  </button>
                )}

                <button onClick={() => setRoomState("UPLOAD")} className="px-8 py-4 bg-transparent text-[#e07a5f] font-bold text-sm uppercase tracking-wider rounded-lg hover:underline flex items-center justify-center gap-2">
                  <RotateCcw className="w-4 h-4" /> Start New Review
                </button>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
