"use client";

import { Shield, Search, Filter, ChevronRight } from "lucide-react";

const VERDICTS = [
  { id: "REV-2938", vendor: "OpenAI Enterprise", date: "2026-06-12", status: "APPROVED", score: 98, time: "14s" },
  { id: "REV-2937", vendor: "Stripe Services", date: "2026-06-11", status: "ESCALATED", score: 62, time: "45s" },
  { id: "REV-2936", vendor: "AWS East Config", date: "2026-06-10", status: "APPROVED", score: 94, time: "12s" },
  { id: "REV-2935", vendor: "Acme Corp MSA", date: "2026-06-08", status: "REJECTED", score: 14, time: "8s" },
  { id: "REV-2934", vendor: "Vercel Enterprise", date: "2026-06-07", status: "APPROVED", score: 99, time: "11s" },
  { id: "REV-2933", vendor: "Datadog SLA", date: "2026-06-05", status: "APPROVED", score: 91, time: "15s" },
  { id: "REV-2932", vendor: "Anthropic API", date: "2026-06-01", status: "ESCALATED", score: 72, time: "38s" },
];

export default function VerdictsPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12 flex flex-col gap-8 relative z-10">
      
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4">
        <div>
          <h1 className="font-serif text-4xl tracking-tight mb-2">Verdicts Archive</h1>
          <p className="opacity-60 text-sm font-mono uppercase tracking-widest">Historical AI Mesh Computations</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#cc8b45] transition-colors" />
            <input 
              type="text" 
              placeholder="Search contracts..." 
              className="bg-black/40 border border-white/10 rounded-full py-2.5 pl-11 pr-6 text-sm focus:outline-none focus:border-[#cc8b45]/50 focus:ring-1 focus:ring-[#cc8b45]/50 transition-all w-64"
            />
          </div>
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Filters */}
      <div className="flex items-center gap-3 border-b border-border/50 pb-6">
        <button className="px-5 py-2 rounded-full bg-[#cc8b45] text-black text-xs font-bold uppercase tracking-widest">All</button>
        <button className="px-5 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold uppercase tracking-widest transition-colors">Approved</button>
        <button className="px-5 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold uppercase tracking-widest transition-colors">Escalated</button>
        <button className="px-5 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold uppercase tracking-widest transition-colors">Rejected</button>
      </div>

      {/* Main Table */}
      <div className="bg-background/40 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#cc8b45]/5 blur-[120px] pointer-events-none"></div>

        <table className="w-full text-left border-collapse relative z-10">
          <thead>
            <tr className="border-b border-white/10 text-[10px] uppercase tracking-widest opacity-50 bg-black/20">
              <th className="py-4 px-6 font-medium">Review ID</th>
              <th className="py-4 px-6 font-medium">Contract / Vendor</th>
              <th className="py-4 px-6 font-medium">Date</th>
              <th className="py-4 px-6 font-medium">Compute Time</th>
              <th className="py-4 px-6 font-medium">Risk Score</th>
              <th className="py-4 px-6 font-medium">Verdict</th>
              <th className="py-4 px-6 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {VERDICTS.map((v, i) => (
              <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors group cursor-pointer">
                <td className="py-5 px-6 font-mono text-sm opacity-70">{v.id}</td>
                <td className="py-5 px-6 font-medium">{v.vendor}</td>
                <td className="py-5 px-6 font-mono text-sm opacity-60">{v.date}</td>
                <td className="py-5 px-6 font-mono text-sm opacity-60">{v.time}</td>
                <td className="py-5 px-6">
                  <span className="font-mono text-sm bg-white/5 px-2 py-1 rounded border border-white/10">{v.score}/100</span>
                </td>
                <td className="py-5 px-6">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border ${
                    v.status === 'APPROVED' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                    v.status === 'ESCALATED' ? 'bg-[#cc8b45]/10 text-[#cc8b45] border-[#cc8b45]/30 shadow-[0_0_10px_rgba(204,139,69,0.2)]' : 
                    'bg-red-500/10 text-red-400 border-red-500/20'
                  }`}>
                    {v.status}
                  </span>
                </td>
                <td className="py-5 px-6 text-right">
                  <ChevronRight className="w-4 h-4 inline-block opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
