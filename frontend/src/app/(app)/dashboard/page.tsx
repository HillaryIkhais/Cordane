"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, AlertTriangle, XCircle, Plus, FileText, Database } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [verdicts, setVerdicts] = useState<any[]>([]);
  const [activeComputations, setActiveComputations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        // The backend only has /api/scenarios.
        const res = await fetch(`${apiUrl}/api/scenarios`);

        if (res.ok) {
          const data = await res.json();
          const scenarios = Array.isArray(data) ? data : [];
          
          // Split scenarios into active and verdicts for the dashboard
          const active = scenarios.slice(0, 2).map((s: any) => ({
            id: s.id,
            contract: s.title,
            vendor: s.vendor || "External",
            elapsed: "00:00"
          }));
          
          const history = scenarios.slice(2).map((s: any) => ({
            id: s.id,
            contract: s.title,
            vendor: s.vendor || "External",
            status: s.status === "Ready" ? "Approved" : s.status,
            date: s.date
          }));

          setActiveComputations(active);
          setVerdicts(history);
        } else {
          setActiveComputations([]);
          setVerdicts([]);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setActiveComputations([]);
        setVerdicts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const deadlockedCount = verdicts.filter(v => v.status === "Escalated").length;

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-12 flex flex-col gap-12 relative z-10">
      
      <header className="flex justify-between items-end md:hidden mb-8">
        <Link href="/" className="font-serif text-2xl tracking-tight text-foreground/90">Cordane.</Link>
        <Link href="/upload" className="text-[#cc8b45] text-sm font-bold uppercase tracking-wider">New Review &rarr;</Link>
      </header>

      {/* ZONE 0: ENTERPRISE GOVERNANCE METRICS */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
        {[
          { label: "Agents Participating", value: "4", sub: "LGL, FIN, RSK, OPS" },
          { label: "Negotiation Rounds", value: "2", sub: "Avg per decision" },
          { label: "Consensus Confidence", value: "92%", sub: "Mathematical alignment" },
          { label: "Decision Time", value: "14 sec", sub: "vs 12 days manual" }
        ].map((metric, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-background/40 backdrop-blur-xl border border-border/50 rounded-xl p-5 flex flex-col justify-center shadow-lg hover:border-[#cc8b45]/30 transition-colors group"
          >
            <div className="text-[10px] font-mono uppercase tracking-widest opacity-50 mb-2 group-hover:text-[#cc8b45] transition-colors">{metric.label}</div>
            <div className="font-serif text-3xl text-foreground/90 mb-1">{metric.value}</div>
            <div className="text-xs text-foreground/40 font-medium">{metric.sub}</div>
          </motion.div>
        ))}
      </section>

      {/* ZONE 1: ATTENTION BANNER (Only show if there's real deadlocked data) */}
      {deadlockedCount > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-500/10 border border-amber-500/20 backdrop-blur-md rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_30px_-10px_rgba(204,139,69,0.2)]"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500/20 rounded-full">
              <AlertTriangle className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <h3 className="text-lg font-serif text-amber-500">Action Required</h3>
              <p className="text-sm opacity-80 mt-1">{deadlockedCount} contract(s) deadlocked and waiting on your executive decision.</p>
            </div>
          </div>
          <Link href="/platform">
            <button className="px-6 py-3 bg-amber-500 text-black rounded-md text-xs font-bold uppercase tracking-wider hover:bg-amber-400 transition-colors shrink-0 shadow-lg shadow-amber-500/20">
              Review Now &rarr;
            </button>
          </Link>
        </motion.div>
      )}

      {/* ZONE 2: ACTIVE REVIEWS */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <h2 className="font-serif text-3xl">Active Mesh Computations</h2>
          <Link href="/upload">
            <button className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-[#cc8b45] hover:bg-[#b57a3c] text-black rounded-md text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shadow-[#cc8b45]/20">
              <Plus className="w-4 h-4" /> New Review
            </button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {activeComputations.length > 0 ? (
            activeComputations.map(comp => (
              <div key={comp.id} className="relative bg-background/60 backdrop-blur-xl border border-border/50 rounded-xl p-8 overflow-hidden hover:scale-[1.02] transition-transform duration-500 group shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#cc8b45]/10 via-[#cc8b45] to-[#cc8b45]/10 animate-pulse"></div>
                
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-[#cc8b45]/10 rounded-lg border border-[#cc8b45]/20 group-hover:bg-[#cc8b45]/20 transition-colors">
                      <FileText className="w-5 h-5 text-[#cc8b45]" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl">{comp.contract || "Processing Document"}</h3>
                      <p className="text-xs font-mono uppercase tracking-widest opacity-50 mt-1">{comp.vendor || "Unknown Vendor"}</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-mono bg-foreground/5 px-2.5 py-1.5 rounded-md border border-foreground/10">
                    <Clock className="w-3.5 h-3.5 text-[#cc8b45] animate-pulse" /> {comp.elapsed || "00:00"}
                  </span>
                </div>
                
                <div className="grid grid-cols-4 gap-3 mb-8 bg-foreground/5 p-4 rounded-lg border border-foreground/5">
                  {["LGL", "FIN", "RSK", "OPS"].map(role => (
                    <div key={role} className="flex flex-col items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${role === 'FIN' || role === 'LGL' ? 'bg-[#cc8b45] animate-pulse shadow-[0_0_15px_rgba(204,139,69,0.6)]' : 'bg-foreground/10'}`}></div>
                      <span className={`text-[10px] font-mono ${role === 'FIN' || role === 'LGL' ? 'opacity-100 text-[#cc8b45]' : 'opacity-40'}`}>{role}</span>
                    </div>
                  ))}
                </div>

                <Link href={`/platform?id=${comp.id}`}>
                  <button className="flex items-center gap-2 px-4 py-2 bg-foreground/5 border border-foreground/10 text-xs font-bold uppercase tracking-widest rounded-md hover:bg-foreground/10 hover:border-foreground/20 transition-all text-foreground">
                    <ArrowRight className="w-4 h-4" /> View Room
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <div className="bg-background/20 backdrop-blur-sm border-2 border-dashed border-border/50 rounded-xl p-8 flex flex-col items-center justify-center text-center gap-5 min-h-[250px] col-span-1 md:col-span-2 hover:border-[#cc8b45]/30 transition-colors">
              <div className="p-4 bg-foreground/5 rounded-full">
                <Database className="w-6 h-6 text-foreground/40" />
              </div>
              <div>
                <h3 className="font-serif text-lg mb-1">{isLoading ? "Connecting to Mesh..." : "No Active Computations"}</h3>
                <p className="text-sm opacity-50 max-w-sm mx-auto">
                  {isLoading ? "Querying live backend systems for active negotiation rooms." : "Your mesh is idle. Upload a contract to begin a new AI negotiation room."}
                </p>
              </div>
              {!isLoading && (
                <Link href="/upload">
                  <button className="mt-2 px-6 py-2.5 bg-foreground/5 border border-foreground/10 text-xs font-bold uppercase tracking-widest rounded-md hover:bg-[#cc8b45]/10 hover:text-[#cc8b45] transition-colors">
                    Upload Contract
                  </button>
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ZONE 3: RECENT VERDICTS */}
      <section>
        <h2 className="font-serif text-3xl mb-6">Recent Verdicts</h2>
        
        {verdicts.length > 0 ? (
          <div className="bg-background/60 backdrop-blur-xl border border-border/50 rounded-xl overflow-hidden shadow-2xl overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[600px]">
              <thead>
                <tr className="border-b border-foreground/5 bg-foreground/5">
                  <th className="px-6 py-5 font-mono text-[10px] uppercase tracking-widest opacity-50 font-normal">Contract</th>
                  <th className="px-6 py-5 font-mono text-[10px] uppercase tracking-widest opacity-50 font-normal hidden sm:table-cell">Vendor</th>
                  <th className="px-6 py-5 font-mono text-[10px] uppercase tracking-widest opacity-50 font-normal">Verdict</th>
                  <th className="px-6 py-5 font-mono text-[10px] uppercase tracking-widest opacity-50 font-normal hidden md:table-cell">Date</th>
                  <th className="px-6 py-5 font-mono text-[10px] uppercase tracking-widest opacity-50 font-normal text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {verdicts.map((v, i) => (
                  <tr key={v.id || i} className="border-b border-foreground/5 hover:bg-foreground/5 transition-colors group">
                    <td className="px-6 py-5 font-sans font-medium text-foreground/90">{v.contract || "Unknown Contract"}</td>
                    <td className="px-6 py-5 font-mono text-xs opacity-60 hidden sm:table-cell">{v.vendor || "Unknown"}</td>
                    <td className="px-6 py-5">
                      {v.status === "Approved" && <span className="inline-flex items-center gap-2 text-green-500 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-md text-xs font-medium"><CheckCircle2 className="w-4 h-4"/> Approved</span>}
                      {v.status === "Escalated" && <span className="inline-flex items-center gap-2 text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-md text-xs font-medium"><AlertTriangle className="w-4 h-4"/> Escalated</span>}
                      {v.status === "Rejected" && <span className="inline-flex items-center gap-2 text-red-500 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-md text-xs font-medium"><XCircle className="w-4 h-4"/> Rejected</span>}
                    </td>
                    <td className="px-6 py-5 opacity-50 hidden md:table-cell font-mono text-xs">{v.date || new Date().toLocaleDateString()}</td>
                    <td className="px-6 py-5 text-right">
                      <Link href={`/platform?id=${v.id}`}>
                        <button className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-md transition-all ${v.status === "Escalated" ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20" : "bg-foreground/5 text-foreground/50 hover:bg-foreground/10 hover:text-foreground"}`}>
                          View
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-background/20 backdrop-blur-sm border border-border/50 rounded-xl p-12 flex flex-col items-center justify-center text-center gap-4">
            <Database className="w-8 h-8 text-foreground/20 mb-2" />
            <h3 className="font-serif text-xl">{isLoading ? "Loading Historical Data..." : "No Historical Verdicts"}</h3>
            <p className="text-sm opacity-50 max-w-md mx-auto">
              {isLoading ? "Querying database for past review outcomes." : "There are no completed contract reviews in the system yet. Once your active computations reach a verdict, they will appear here."}
            </p>
          </div>
        )}
      </section>

    </div>
  );
}
