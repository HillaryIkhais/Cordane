"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, AlertTriangle, XCircle, Plus, FileText } from "lucide-react";
import { motion } from "framer-motion";

const RECENT_VERDICTS = [
  { id: "REV-892", contract: "Acme Corp Master Services", vendor: "Acme Corp", status: "Approved", date: "June 16, 2026", action: "View" },
  { id: "REV-891", contract: "Stripe Payment Gateway", vendor: "Stripe", status: "Approved", date: "June 15, 2026", action: "View" },
  { id: "REV-890", contract: "AWS Enterprise Support", vendor: "Amazon", status: "Escalated", date: "June 14, 2026", action: "Decide" },
  { id: "REV-889", contract: "ShadyData Analytics", vendor: "ShadyData", status: "Rejected", date: "June 14, 2026", action: "View" },
];

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto p-6 md:p-12 flex flex-col gap-12 relative z-10">
      
      <header className="flex justify-between items-end md:hidden mb-8">
        <Link href="/" className="font-serif text-2xl tracking-tight text-foreground/90">Cordane.</Link>
        <Link href="/upload" className="text-[#cc8b45] text-sm font-bold uppercase tracking-wider">New Review &rarr;</Link>
      </header>

      {/* ZONE 1: ATTENTION BANNER */}
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
            <p className="text-sm opacity-80 mt-1">1 contract is deadlocked and waiting on your executive decision.</p>
          </div>
        </div>
        <Link href="/platform">
          <button className="px-6 py-3 bg-amber-500 text-black rounded-md text-xs font-bold uppercase tracking-wider hover:bg-amber-400 transition-colors shrink-0 shadow-lg shadow-amber-500/20">
            Review Now &rarr;
          </button>
        </Link>
      </motion.div>

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
          
          <div className="relative bg-background/60 backdrop-blur-xl border border-border/50 rounded-xl p-8 overflow-hidden hover:scale-[1.02] transition-transform duration-500 group shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#cc8b45]/10 via-[#cc8b45] to-[#cc8b45]/10 animate-pulse"></div>
            
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#cc8b45]/10 rounded-lg border border-[#cc8b45]/20 group-hover:bg-[#cc8b45]/20 transition-colors">
                  <FileText className="w-5 h-5 text-[#cc8b45]" />
                </div>
                <div>
                  <h3 className="font-serif text-xl">Salesforce Renewal</h3>
                  <p className="text-xs font-mono uppercase tracking-widest opacity-50 mt-1">Salesforce Inc.</p>
                </div>
              </div>
              <span className="flex items-center gap-1.5 text-xs font-mono bg-foreground/5 px-2.5 py-1.5 rounded-md border border-foreground/10">
                <Clock className="w-3.5 h-3.5 text-[#cc8b45] animate-pulse" /> 01:24
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

            <Link href="/upload">
              <button className="flex items-center gap-2 px-4 py-2 bg-foreground/5 border border-foreground/10 text-xs font-bold uppercase tracking-widest rounded-md hover:bg-foreground/10 hover:border-foreground/20 transition-all text-foreground">
                <Plus className="w-4 h-4" /> New Review
              </button>
            </Link>
          </div>

          {/* Empty State Card */}
          <div className="bg-background/20 backdrop-blur-sm border-2 border-dashed border-border/50 rounded-xl p-8 flex flex-col items-center justify-center text-center gap-5 min-h-[250px] hover:bg-background/40 hover:border-[#cc8b45]/30 transition-all cursor-pointer group">
            <div className="p-4 bg-foreground/5 rounded-full group-hover:bg-[#cc8b45]/10 transition-colors">
              <Plus className="w-6 h-6 text-foreground/40 group-hover:text-[#cc8b45] transition-colors" />
            </div>
            <div>
              <h3 className="font-serif text-lg mb-1">Upload Contract</h3>
              <p className="text-sm opacity-50 max-w-xs">Your mesh has capacity. Drop a contract to spin up a new review room.</p>
            </div>
          </div>

        </div>
      </section>

      {/* ZONE 3: RECENT VERDICTS */}
      <section>
        <h2 className="font-serif text-3xl mb-6">Recent Verdicts</h2>
        <div className="bg-background/60 backdrop-blur-xl border border-border/50 rounded-xl overflow-hidden shadow-2xl">
          <table className="w-full text-left text-sm">
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
              {RECENT_VERDICTS.map((v) => (
                <tr key={v.id} className="border-b border-foreground/5 hover:bg-foreground/5 transition-colors group">
                  <td className="px-6 py-5 font-sans font-medium text-foreground/90">{v.contract}</td>
                  <td className="px-6 py-5 font-mono text-xs opacity-60 hidden sm:table-cell">{v.vendor}</td>
                  <td className="px-6 py-5">
                    {v.status === "Approved" && <span className="inline-flex items-center gap-2 text-green-500 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-md text-xs font-medium"><CheckCircle2 className="w-4 h-4"/> Approved</span>}
                    {v.status === "Escalated" && <span className="inline-flex items-center gap-2 text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-md text-xs font-medium"><AlertTriangle className="w-4 h-4"/> Escalated</span>}
                    {v.status === "Rejected" && <span className="inline-flex items-center gap-2 text-red-500 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-md text-xs font-medium"><XCircle className="w-4 h-4"/> Rejected</span>}
                  </td>
                  <td className="px-6 py-5 opacity-50 hidden md:table-cell font-mono text-xs">{v.date}</td>
                  <td className="px-6 py-5 text-right">
                    <Link href="/platform">
                      <button className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-md transition-all ${v.action === "Decide" ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20" : "bg-foreground/5 text-foreground/50 hover:bg-foreground/10 hover:text-foreground"}`}>
                        {v.action}
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 bg-foreground/5 flex justify-center">
            <button className="text-[10px] font-mono uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity flex items-center gap-2">
              Load More <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
