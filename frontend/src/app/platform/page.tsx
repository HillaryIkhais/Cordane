"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, XCircle, Download, RotateCcw, ArrowLeft, Lock } from "lucide-react";
import { Logo } from "@/components/logo";

type RoomState = "NEGOTIATING" | "VERDICT";
type VerdictType = "APPROVED" | "ESCALATED" | "REJECTED";

const AGENTS = [
  { id: "LGL", name: "Legal", role: "Risk Mitigation" },
  { id: "FIN", name: "Finance", role: "Margin Analysis" },
  { id: "RSK", name: "Risk", role: "Global Compliance" },
  { id: "OPS", name: "Ops", role: "SLA Verification" },
];

export default function PlatformPage() {
  const [roomState, setRoomState] = useState<RoomState>("NEGOTIATING");
  
  // Real Backend State
  const [isFetching, setIsFetching] = useState(false);
  const [transcript, setTranscript] = useState<{role: string, content: string, score?: number}[]>([]);
  const [backendVerdict, setBackendVerdict] = useState<any>(null);

  // Negotiation State
  const [messageIndex, setMessageIndex] = useState(0);
  const [verdict, setVerdict] = useState<VerdictType>("APPROVED");

  // Trigger Negotiation on Mount
  useEffect(() => {
    // In a real app, scenario ID would come from URL params. 
    // Here we auto-trigger Scenario A.
    handleStartReview("A", "APPROVED");
  }, []);

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
    setRoomState("NEGOTIATING");
    setMessageIndex(0);
    setTranscript([]);
    setIsFetching(true);

    try {
      // Point to the environment variable, or fallback to localhost
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      
      // 1. Create the Scenario in the Backend
      const createRes = await fetch(`${apiUrl}/api/scenarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: "Cordane Contract Review", 
          contract_text: "Standard liability terms apply. Unlimited indemnification clause 4.2." 
        })
      });
      
      const scenarioData = await createRes.json();

      // 2. Trigger the AI Negotiation Graph
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
        else setVerdict("REJECTED");
      } else {
        setVerdict(demoVerdict);
      }

    } catch (error) {
      console.error("Backend Error:", error);
      // Removed hardcoded fallback; show actual error state
      setTranscript([
         { role: "SYSTEM", content: "CRITICAL FAILURE: Connection to the active AI Mesh backend failed. Ensure Render backend is running and NEXT_PUBLIC_API_URL is properly configured." }
      ]);
      setVerdict("REJECTED");
    } finally {
      setIsFetching(false);
    }
  };

  const currentMessage = transcript[messageIndex];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col relative z-10">
      
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#cc8b45]/5 blur-[150px] rounded-full pointer-events-none -z-10" />

      {/* HEADER */}
      <header className="border-b border-foreground/5 bg-background/60 backdrop-blur-3xl sticky top-0 z-50 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)]">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity">
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </Link>
          <Link href="/" className="flex items-center gap-3 group">
            <Logo className="w-6 h-6 group-hover:scale-105 transition-transform" />
            <span className="font-serif text-xl tracking-tight text-foreground/90">Cordane.</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono uppercase tracking-widest opacity-60 bg-foreground/5 px-3 py-1.5 rounded-full border border-foreground/10 flex items-center">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#cc8b45] mr-2 animate-pulse shadow-[0_0_10px_rgba(204,139,69,0.5)]"></span>
              Mesh Active
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12 flex flex-col relative z-10">
        <AnimatePresence mode="wait">

          {/* NEGOTIATING STATE */}
          {roomState === "NEGOTIATING" && (
            <motion.div key="negotiating" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col gap-8 w-full h-full">
              
              <div className="flex justify-between items-end border-b border-border/50 pb-6">
                <div>
                  <h2 className="font-serif text-4xl tracking-tight mb-2">Shared Negotiation Room</h2>
                  <p className="text-xs opacity-50 font-mono uppercase tracking-widest">Evaluating: Uploaded Contract</p>
                </div>
                <div className="px-5 py-2.5 bg-[#cc8b45]/10 text-[#cc8b45] border border-[#cc8b45]/20 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-3 animate-pulse shadow-[0_0_20px_rgba(204,139,69,0.2)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#cc8b45]"></span>
                  {isFetching ? "Awaiting LLM Graph..." : "Agents Negotiating..."}
                </div>
              </div>

              {/* Agent Grid */}
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

              {/* Live Chat Feed */}
              <div className="flex-1 bg-background/40 backdrop-blur-xl border border-foreground/5 rounded-2xl p-8 min-h-[350px] flex flex-col justify-end overflow-hidden relative shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]">
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
                {/* CONSENSUS EVALUATOR ROUNDS */}
                <div className="mb-8 w-full max-w-md bg-background/80 backdrop-blur-xl border border-[#cc8b45]/30 rounded-xl p-6 text-left shadow-[0_0_30px_rgba(204,139,69,0.1)]">
                  <h3 className="text-xs font-bold text-[#cc8b45] uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#cc8b45] animate-pulse"></span>
                    Consensus Evaluator
                  </h3>
                  <div className="flex flex-col gap-3 font-mono text-[10px] sm:text-xs">
                    <div className="flex justify-between border-b border-foreground/5 pb-2">
                      <span className="opacity-50">Round 1:</span>
                      <span className="opacity-90">{verdict === 'APPROVED' ? 'Consensus Reached' : 'Deadlock Detected'}</span>
                    </div>
                    {verdict !== 'APPROVED' && (
                      <div className="flex justify-between border-b border-foreground/5 pb-2">
                        <span className="opacity-50">Round 2:</span>
                        <span className="opacity-90">Negotiation Failed</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-1 font-bold">
                      <span className="opacity-50">Decision:</span>
                      <span className={verdict === 'APPROVED' ? 'text-green-400' : verdict === 'REJECTED' ? 'text-red-400' : 'text-amber-400'}>
                        {verdict}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative mb-8 mt-4">
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
                  <div className="p-5 border-b border-foreground/5 bg-foreground/5 flex justify-between items-center">
                    <h3 className="font-bold text-[10px] uppercase tracking-widest opacity-70">Contested Standards</h3>
                    <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest">Extracted from Live Graph</span>
                  </div>
                  <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                     <div className="bg-foreground/5 rounded-xl p-6 border border-foreground/5">
                        <h4 className="font-bold text-[#cc8b45] mb-4 uppercase text-[10px] tracking-widest">Internal Constraint</h4>
                        <pre className="font-mono text-xs opacity-70 whitespace-pre-wrap leading-relaxed">{backendVerdict?.contested_standard || "Strict Liability Limits\nMax Cap: $5,000,000"}</pre>
                     </div>
                     <div className="bg-foreground/5 rounded-xl p-6 border border-foreground/5">
                        <h4 className="font-bold text-red-400 mb-4 uppercase text-[10px] tracking-widest">Vendor Document</h4>
                        <pre className="font-mono text-xs opacity-70 whitespace-pre-wrap leading-relaxed">{backendVerdict?.vendor_target || "Null or Uncapped Liability\nClause 4.2: Unlimited Indemnification"}</pre>
                     </div>
                  </div>
                </div>
              )}

              {/* IMMUTABLE AUDIT LOG */}
              <div className="mt-4 bg-[#0a0a0a] border border-border/50 rounded-2xl overflow-hidden shadow-2xl font-mono text-xs">
                <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Lock className="w-4 h-4 text-[#cc8b45]" />
                    <span className="uppercase tracking-widest font-bold opacity-80">Immutable Audit Log</span>
                  </div>
                  <span className="opacity-40">{new Date().toISOString()}</span>
                </div>
                <div className="p-6 text-foreground/70 flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-white/5 pb-4">
                    <div>
                      <span className="opacity-50 block mb-1">Contract ID:</span>
                      <span className="text-[#cc8b45]">cordane-req-{Math.floor(Math.random() * 10000)}</span>
                    </div>
                    <div>
                      <span className="opacity-50 block mb-1">Participants:</span>
                      <span>LGL (Claude 3.5), FIN (GPT-4o), RSK (DeepSeek), OPS (Llama 3)</span>
                    </div>
                  </div>
                  <div>
                    <span className="opacity-50 block mb-3 uppercase tracking-widest">Negotiation History:</span>
                    <div className="bg-black/50 p-4 rounded-lg border border-white/5 max-h-[300px] overflow-y-auto flex flex-col gap-3">
                      {transcript.map((msg, idx) => (
                        <div key={idx} className="flex gap-4">
                          <span className="w-12 shrink-0 opacity-40">[{msg.role.substring(0,3).toUpperCase()}]</span>
                          <span className={msg.content.includes('FLAG') ? 'text-amber-400/90' : 'opacity-80'}>{msg.content}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-2 flex justify-between items-center">
                    <span className="opacity-50 uppercase tracking-widest">Final Outcome:</span>
                    <span className={`font-bold px-3 py-1 rounded bg-white/5 ${verdict === 'APPROVED' ? 'text-green-400' : verdict === 'REJECTED' ? 'text-red-400' : 'text-amber-400'}`}>
                      {verdict}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-6 pt-10 border-t border-border/50">
                {verdict === "ESCALATED" && (
                  <>
                    <Link href="/dashboard" className="w-full sm:w-auto">
                      <button className="w-full px-8 py-4 bg-amber-500 text-black font-bold text-xs uppercase tracking-wider rounded-md hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20">
                        Approve Anyway
                      </button>
                    </Link>
                    <Link href="/dashboard" className="w-full sm:w-auto">
                      <button className="w-full px-8 py-4 bg-transparent border border-foreground/10 text-foreground font-bold text-xs uppercase tracking-wider rounded-md hover:bg-foreground/5 transition-colors">
                        Send for Revision
                      </button>
                    </Link>
                  </>
                )}
                
                {verdict !== "ESCALATED" && (
                  <Link href="/dashboard" className="w-full sm:w-auto">
                    <button className="w-full px-8 py-4 bg-foreground/5 border border-foreground/10 text-foreground font-bold text-xs uppercase tracking-wider rounded-md hover:bg-foreground/10 transition-colors flex items-center justify-center gap-3">
                      <Download className="w-4 h-4" /> Return to Dashboard
                    </button>
                  </Link>
                )}

                <Link href="/upload" className="w-full sm:w-auto flex items-center">
                  <button className="px-8 py-4 bg-transparent text-[#cc8b45] font-bold text-xs uppercase tracking-wider rounded-md hover:bg-[#cc8b45]/10 hover:border hover:border-[#cc8b45]/30 transition-all flex items-center justify-center gap-3 border border-transparent w-full">
                    <RotateCcw className="w-4 h-4" /> Start New Review
                  </button>
                </Link>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
