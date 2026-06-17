"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, ArrowLeft, CheckCircle2, AlertTriangle, XCircle, Download, RotateCcw } from "lucide-react";
import { Logo } from "@/components/logo";

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
  
  // Real Backend State
  const [isFetching, setIsFetching] = useState(false);
  const [transcript, setTranscript] = useState<{role: string, content: string, score?: number}[]>([]);
  const [backendVerdict, setBackendVerdict] = useState<any>(null);

  
  // Negotiation State
  const [messageIndex, setMessageIndex] = useState(0);
  const [verdict, setVerdict] = useState<VerdictType>("ESCALATED");
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
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col relative z-10">
      
      {/* Subtle background glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#cc8b45]/5 blur-[150px] rounded-full pointer-events-none -z-10" />

      {/* HEADER */}
      <header className="border-b border-white/5 bg-background/60 backdrop-blur-3xl sticky top-0 z-50 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)]">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity">
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </Link>
          <Link href="/" className="flex items-center gap-3 group">
            <Logo className="w-6 h-6 group-hover:scale-105 transition-transform" />
            <span className="font-serif text-xl tracking-tight text-foreground/90">Cordane.</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono uppercase tracking-widest opacity-60 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 flex items-center">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-2 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.5)]"></span>
              Mesh Active
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12 flex flex-col relative z-10">
        <AnimatePresence mode="wait">
          
          {/* UPLOAD STATE */}
          {roomState === "UPLOAD" && (
            <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="flex flex-col gap-12 w-full max-w-3xl mx-auto mt-10">
              <div className="text-center">
                <h1 className="font-serif text-5xl mb-4 tracking-tight">Initialize Review Room</h1>
                <p className="text-lg opacity-70">Drop your contract to trigger the autonomous consensus mesh.</p>
              </div>

              {/* Drag and Drop Zone */}
              <div className="border-2 border-dashed border-border/50 rounded-2xl p-20 flex flex-col items-center justify-center text-center bg-background/40 backdrop-blur-md hover:bg-background/60 hover:border-[#cc8b45]/30 transition-all duration-300 cursor-pointer group shadow-2xl">
                <div className="w-20 h-20 rounded-full bg-[#cc8b45]/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#cc8b45]/20 transition-all duration-500 shadow-[0_0_30px_rgba(204,139,69,0.1)]">
                  <Upload className="w-8 h-8 text-[#cc8b45]" />
                </div>
                <h3 className="font-serif text-2xl mb-2">Drag & Drop Contract</h3>
                <p className="text-sm opacity-50 max-w-xs font-mono uppercase tracking-widest">Supports PDF, DOCX, TXT (Max 50MB)</p>
              </div>

              {/* Demo Scenarios */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-border/50"></div>
                  <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-40 text-center">Or Trigger Demo Scenario</h3>
                  <div className="h-px flex-1 bg-border/50"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button onClick={() => handleStartReview("A", "APPROVED")} className="p-6 border border-border/50 rounded-xl bg-background/40 backdrop-blur-md hover:border-[#cc8b45]/30 hover:bg-background/60 transition-all text-left flex flex-col gap-3 group shadow-xl">
                    <span className="font-mono text-[10px] text-green-400 uppercase tracking-widest">Scenario A</span>
                    <span className="font-serif text-xl group-hover:text-[#cc8b45] transition-colors">Clean Approve</span>
                    <span className="text-xs opacity-50">No risky clauses. Fast execution.</span>
                  </button>
                  <button onClick={() => handleStartReview("B", "REJECTED")} className="p-6 border border-border/50 rounded-xl bg-background/40 backdrop-blur-md hover:border-[#cc8b45]/30 hover:bg-background/60 transition-all text-left flex flex-col gap-3 group shadow-xl">
                    <span className="font-mono text-[10px] text-red-400 uppercase tracking-widest">Scenario B</span>
                    <span className="font-serif text-xl group-hover:text-[#cc8b45] transition-colors">Clear Reject</span>
                    <span className="text-xs opacity-50">Adversarial trigger forces halt.</span>
                  </button>
                  <button onClick={() => handleStartReview("C", "ESCALATED")} className="p-6 border border-[#cc8b45]/30 rounded-xl bg-[#cc8b45]/5 backdrop-blur-md hover:bg-[#cc8b45]/10 hover:border-[#cc8b45]/50 transition-all text-left flex flex-col gap-3 relative overflow-hidden group shadow-[0_0_30px_rgba(204,139,69,0.1)]">
                    <div className="absolute top-0 right-0 bg-[#cc8b45] text-black text-[9px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">Demo Default</div>
                    <span className="font-mono text-[10px] text-amber-500 uppercase tracking-widest">Scenario C</span>
                    <span className="font-serif text-xl group-hover:text-[#cc8b45] transition-colors">Ambiguous</span>
                    <span className="text-xs opacity-50">Requires full mesh negotiation.</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* NEGOTIATING STATE */}
          {roomState === "NEGOTIATING" && (
            <motion.div key="negotiating" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col gap-8 w-full h-full">
              
              <div className="flex justify-between items-end border-b border-border/50 pb-6">
                <div>
                  <h2 className="font-serif text-4xl tracking-tight mb-2">Shared Negotiation Room</h2>
                  <p className="text-xs opacity-50 font-mono uppercase tracking-widest">Round 1 of 3 • Evaluating: Scenario {selectedScenario}</p>
                </div>
                <div className="px-5 py-2.5 bg-[#cc8b45]/10 text-[#cc8b45] border border-[#cc8b45]/20 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-3 animate-pulse shadow-[0_0_20px_rgba(204,139,69,0.2)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#cc8b45]"></span>
                  {isFetching ? "Awaiting Backend LLMs..." : "Agents Negotiating..."}
                </div>
              </div>

              {/* Agent Grid (Glassmorphic) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {AGENTS.map((agent) => {
                  const isActive = currentMessage?.role?.toLowerCase() === agent.id.toLowerCase() || currentMessage?.role?.toLowerCase() === agent.name.toLowerCase();
                  return (
                    <div key={agent.id} className={`flex-1 bg-background/60 backdrop-blur-xl border rounded-xl p-6 shadow-2xl flex flex-col items-start relative transition-all duration-500 ${isActive ? 'border-[#cc8b45] shadow-[0_0_30px_rgba(204,139,69,0.3)] bg-background/80 scale-105 z-10' : 'border-border/50 scale-100 opacity-60'}`}>
                      {isActive && <div className="absolute top-6 right-5 w-1.5 h-1.5 rounded-full bg-[#cc8b45] animate-pulse"></div>}
                      <h3 className="font-sans text-xl text-foreground mb-1 font-medium">{agent.name}</h3>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-foreground/50">{agent.role}</p>
                    </div>
                  );
                })}
              </div>

              {/* Live Chat Feed (Cinematic Console) */}
              <div className="flex-1 bg-background/40 backdrop-blur-xl border border-white/5 rounded-2xl p-8 min-h-[350px] flex flex-col justify-end overflow-hidden relative shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]">
                <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background/90 to-transparent z-10"></div>
                <div className="flex flex-col gap-6 relative z-0">
                  <AnimatePresence mode="popLayout">
                    {!isFetching && transcript.slice(Math.max(0, messageIndex - 4), messageIndex + 1).map((msg, idx, arr) => {
                      const isLatest = idx === arr.length - 1;
                      const roleName = msg.role.toUpperCase();
                      return (
                         <motion.div 
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: isLatest ? 1 : 0.4, y: 0 }}
                          className="flex gap-6 items-start"
                        >
                          <div className={`font-mono text-[10px] font-bold pt-1.5 w-16 shrink-0 tracking-widest ${isLatest ? 'text-[#cc8b45]' : 'opacity-40'}`}>
                            {roleName.substring(0, 6)}
                          </div>
                          <div className={`font-sans text-base leading-relaxed ${isLatest ? 'text-foreground/90' : 'text-foreground/60'} ${msg.content.includes('FLAG') || msg.content.includes('RISK') ? 'text-[#cc8b45]' : ''}`}>
                            {msg.content}
                            {isLatest && <span className="inline-block w-1.5 h-4 ml-1 bg-[#cc8b45] animate-pulse align-middle"></span>}
                          </div>
                        </motion.div>
                      );
                    })}
                    {isFetching && (
                       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center text-xs font-mono uppercase tracking-widest opacity-40 py-12 animate-pulse">
                          Initializing agent models...
                       </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}

          {/* VERDICT STATE */}
          {roomState === "VERDICT" && (
            <motion.div key="verdict" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col gap-12 w-full max-w-4xl mx-auto mt-10">
              
              <div className="text-center flex flex-col items-center">
                <div className="relative mb-8">
                  {verdict === "APPROVED" && (
                    <>
                      <div className="absolute inset-0 bg-green-500 blur-3xl opacity-20 rounded-full animate-pulse"></div>
                      <CheckCircle2 className="w-24 h-24 text-green-400 relative z-10" />
                    </>
                  )}
                  {verdict === "ESCALATED" && (
                    <>
                      <div className="absolute inset-0 bg-amber-500 blur-3xl opacity-20 rounded-full animate-pulse"></div>
                      <AlertTriangle className="w-24 h-24 text-amber-500 relative z-10" />
                    </>
                  )}
                  {verdict === "REJECTED" && (
                    <>
                      <div className="absolute inset-0 bg-red-500 blur-3xl opacity-20 rounded-full animate-pulse"></div>
                      <XCircle className="w-24 h-24 text-red-400 relative z-10" />
                    </>
                  )}
                </div>
                
                <h1 className="font-serif text-5xl md:text-6xl mb-6 tracking-tight">
                  {verdict === "APPROVED" && "Consensus Reached"}
                  {verdict === "ESCALATED" && "Decision Deadlock"}
                  {verdict === "REJECTED" && "Review Failed"}
                </h1>
                
                <p className="text-xl opacity-70 max-w-2xl mx-auto leading-relaxed">
                  {backendVerdict?.action_required || (verdict === "APPROVED" ? "All agents aligned mathematically and legally. Safe to sign." : "Agents failed to reach consensus. Executive override required.")}
                </p>
              </div>

              {verdict === "ESCALATED" && (
                <div className="bg-background/40 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="p-5 border-b border-white/5 bg-black/20 flex justify-between items-center">
                    <h3 className="font-bold text-[10px] uppercase tracking-widest opacity-70">Contested Standards</h3>
                    <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest">Extracted from Live Graph</span>
                  </div>
                  <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                     <div className="bg-white/5 rounded-xl p-6 border border-white/5">
                        <h4 className="font-bold text-[#cc8b45] mb-4 uppercase text-[10px] tracking-widest">Internal Constraint</h4>
                        <pre className="font-mono text-xs opacity-70 whitespace-pre-wrap leading-relaxed">{backendVerdict?.contested_standard || "Strict Liability Limits\nMax Cap: $5,000,000"}</pre>
                     </div>
                     <div className="bg-white/5 rounded-xl p-6 border border-white/5">
                        <h4 className="font-bold text-red-400 mb-4 uppercase text-[10px] tracking-widest">Vendor Document</h4>
                        <pre className="font-mono text-xs opacity-70 whitespace-pre-wrap leading-relaxed">{backendVerdict?.vendor_target || "Null or Uncapped Liability\nClause 4.2: Unlimited Indemnification"}</pre>
                     </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-center gap-6 pt-10 border-t border-border/50">
                {verdict === "ESCALATED" && (
                  <>
                    <button className="px-8 py-4 bg-amber-500 text-black font-bold text-xs uppercase tracking-wider rounded-md hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20">
                      Approve Anyway
                    </button>
                    <button className="px-8 py-4 bg-transparent border border-white/10 text-foreground font-bold text-xs uppercase tracking-wider rounded-md hover:bg-white/5 transition-colors">
                      Send for Revision
                    </button>
                  </>
                )}
                
                {verdict !== "ESCALATED" && (
                  <button className="px-8 py-4 bg-white/5 border border-white/10 text-foreground font-bold text-xs uppercase tracking-wider rounded-md hover:bg-white/10 transition-colors flex items-center justify-center gap-3">
                    <Download className="w-4 h-4" /> Download Report
                  </button>
                )}

                <button onClick={() => setRoomState("UPLOAD")} className="px-8 py-4 bg-transparent text-[#cc8b45] font-bold text-xs uppercase tracking-wider rounded-md hover:underline flex items-center justify-center gap-3">
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
