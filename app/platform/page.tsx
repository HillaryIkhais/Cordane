"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload, ChevronRight, FileText, CheckCircle2, AlertTriangle, ShieldAlert, Users } from "lucide-react";

export default function PlatformPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "negotiating" | "human_review" | "approved">("idle");
  const [transcript, setTranscript] = useState<any[]>([]);
  const [verdict, setVerdict] = useState<any>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus("uploading");
      
      // Simulate file upload delay
      setTimeout(async () => {
        setStatus("negotiating");
        
        try {
          const res = await fetch("/api/negotiate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ scenarioId: "scenario_1" })
          });
          const data = await res.json();
          setTranscript(data.transcript || []);
          setVerdict(data.verdict || {});
          setStatus(data.verdict?.status === "PENDING_HUMAN_REVIEW" ? "human_review" : "approved");
        } catch (error) {
          console.error("Negotiation failed", error);
        }
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen text-[#3e2723] p-8 pb-32">
      {/* Warm Creative Background Effect */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-gradient-to-r from-[#ffd8c4] to-[#f4c2c2] rounded-full blur-[100px] opacity-40 pointer-events-none z-[-1]" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-gradient-to-l from-[#e29578]/20 to-[#e07a5f]/10 rounded-full blur-[120px] opacity-60 pointer-events-none z-[-1]" />

      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e07a5f] to-[#e29578] flex items-center justify-center shadow-lg">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-[#4e342e]">Cordane</h1>
              <p className="text-sm text-[#8d6e63]">Contract Review Platform</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Input */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 p-8 rounded-3xl shadow-[0_8px_30px_rgba(140,110,100,0.1)]">
              <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#e07a5f]" /> Upload Contract
              </h2>
              
              <label className="cursor-pointer group flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[#e29578]/40 rounded-2xl bg-white/40 hover:bg-white/80 transition-all">
                <input type="file" className="hidden" onChange={handleUpload} disabled={status !== "idle"} />
                <motion.div whileHover={{ y: -5 }}>
                  <Upload className="w-10 h-10 text-[#e07a5f] mb-3 opacity-80" />
                </motion.div>
                <p className="text-sm font-medium text-[#4e342e]">Drop a contract here</p>
                <p className="text-xs text-[#8d6e63] mt-1">PDF, DOCX, or plain text</p>
              </label>

              {file && (
                <div className="mt-4 p-4 rounded-xl bg-[#e07a5f]/10 border border-[#e07a5f]/20 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#e07a5f] animate-pulse" />
                  <span className="text-sm font-medium truncate">{file.name}</span>
                </div>
              )}
            </div>
          </div>

          {/* Middle/Right Column: Agent Mesh & Verdict */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 p-8 rounded-3xl shadow-[0_8px_30px_rgba(140,110,100,0.1)] min-h-[500px] flex flex-col">
              
              <div className="flex justify-between items-center mb-6 border-b border-[#8d6e63]/10 pb-4">
                <h2 className="text-xl font-medium text-[#4e342e]">Review Board</h2>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status === 'negotiating' ? 'bg-[#e07a5f]' : 'bg-transparent'}`}></span>
                    <span className={`relative inline-flex rounded-full h-3 w-3 ${status === 'idle' ? 'bg-gray-300' : status === 'negotiating' ? 'bg-[#e07a5f]' : 'bg-green-500'}`}></span>
                  </span>
                  <span className="text-sm font-medium uppercase tracking-wider text-[#8d6e63]">
                    {status === "idle" ? "Ready" : status === "negotiating" ? "Reviewing..." : "Done"}
                  </span>
                </div>
              </div>

              {/* Transcript Feed */}
              <div className="flex-1 overflow-y-auto pr-4 space-y-4">
                {transcript.map((msg, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={i} 
                    className="p-4 rounded-2xl bg-white/80 shadow-sm border border-white"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#e07a5f]">
                        {msg.role} Agent
                      </span>
                      {msg.score && (
                        <span className="text-[10px] font-mono bg-[#8d6e63]/10 px-2 py-1 rounded-full">
                          Confidence: {(msg.score * 100).toFixed(0)}%
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#4e342e] leading-relaxed">{msg.content}</p>
                  </motion.div>
                ))}
              </div>

              {/* Final Verdict Box */}
              {status === "human_review" && verdict && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-[#fff0ea] to-[#ffe4d6] border border-[#e07a5f]/30 shadow-inner"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <ShieldAlert className="w-6 h-6 text-[#e07a5f]" />
                    <h3 className="text-lg font-semibold text-[#4e342e]">Needs Your Sign-Off</h3>
                  </div>
                  <p className="text-sm text-[#8d6e63] mb-6">{verdict.action_required}</p>
                  
                  <div className="flex justify-end gap-3">
                    <button className="px-6 py-2 rounded-full border border-[#e07a5f]/50 text-[#e07a5f] hover:bg-[#e07a5f]/10 text-sm font-semibold transition-colors">
                      Reject Contract
                    </button>
                    <button className="px-6 py-2 rounded-full bg-gradient-to-r from-[#e07a5f] to-[#e29578] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm font-semibold transition-all">
                      Authorize Approval
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
