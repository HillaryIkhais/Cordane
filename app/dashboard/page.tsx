"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, AlertTriangle, XCircle, Plus } from "lucide-react";
import { motion } from "framer-motion";

const RECENT_VERDICTS = [
  { id: "REV-892", contract: "Acme Corp Master Services", vendor: "Acme Corp", status: "Approved", date: "June 16, 2026", action: "View" },
  { id: "REV-891", contract: "Stripe Payment Gateway", vendor: "Stripe", status: "Approved", date: "June 15, 2026", action: "View" },
  { id: "REV-890", contract: "AWS Enterprise Support", vendor: "Amazon", status: "Escalated", date: "June 14, 2026", action: "Decide" },
  { id: "REV-889", contract: "ShadyData Analytics", vendor: "ShadyData", status: "Rejected", date: "June 14, 2026", action: "View" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background flex font-sans text-foreground">
      
      {/* LEFT SIDEBAR */}
      <aside className="w-64 border-r border-border bg-background/50 backdrop-blur-md flex flex-col justify-between hidden md:flex">
        <div>
          <div className="p-8">
            <Link href="/" className="font-serif text-2xl tracking-tight text-[#e07a5f]">Cordane.</Link>
          </div>
          <nav className="flex flex-col gap-2 px-4">
            <Link href="/dashboard" className="px-4 py-2 bg-white/5 rounded-md text-sm font-medium border border-white/10">
              Dashboard
            </Link>
            <Link href="/reviews" className="px-4 py-2 text-sm font-medium opacity-60 hover:opacity-100 transition-opacity">
              Reviews
            </Link>
            <Link href="/escalations" className="px-4 py-2 text-sm font-medium opacity-60 hover:opacity-100 transition-opacity flex justify-between items-center">
              Escalations
              <span className="bg-[#e07a5f] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">1</span>
            </Link>
            <Link href="/audit" className="px-4 py-2 text-sm font-medium opacity-60 hover:opacity-100 transition-opacity">
              Audit Logs
            </Link>
          </nav>
        </div>
        <div className="p-4">
          <Link href="/platform">
            <button className="w-full flex items-center justify-center gap-2 bg-[#e07a5f] text-white py-3 rounded-md text-sm font-bold uppercase tracking-wide hover:bg-opacity-90 transition-all shadow-md">
              <Plus className="w-4 h-4" /> New Review
            </button>
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-6 md:p-12 flex flex-col gap-12">
          
          <header className="flex justify-between items-end md:hidden">
            <Link href="/" className="font-serif text-2xl tracking-tight text-[#e07a5f]">Cordane.</Link>
            <Link href="/platform" className="text-[#e07a5f] text-sm font-bold uppercase">New Review &rarr;</Link>
          </header>

          {/* ZONE 1: ATTENTION BANNER */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_30px_-10px_rgba(245,158,11,0.15)]"
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <div>
                <h3 className="text-sm font-bold text-amber-500">Action Required</h3>
                <p className="text-xs opacity-80 mt-0.5">1 contract is deadlocked and waiting on your executive decision.</p>
              </div>
            </div>
            <Link href="/platform">
              <button className="px-4 py-2 bg-amber-500 text-white rounded-md text-xs font-bold uppercase tracking-wider hover:bg-amber-600 transition-colors shrink-0">
                Review Now &rarr;
              </button>
            </Link>
          </motion.div>

          {/* ZONE 2: ACTIVE REVIEWS */}
          <section>
            <h2 className="font-serif text-2xl mb-6">Active Mesh Computations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="relative bg-background/40 border border-border rounded-lg p-6 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#e07a5f]/20 via-[#e07a5f] to-[#e07a5f]/20 animate-pulse"></div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">Salesforce Renewal</h3>
                    <p className="text-sm opacity-60">Salesforce Inc.</p>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-mono bg-white/5 px-2 py-1 rounded border border-white/10">
                    <Clock className="w-3 h-3 text-[#e07a5f]" /> 01:24
                  </span>
                </div>
                
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {["LGL", "FIN", "RSK", "OPS"].map(role => (
                    <div key={role} className="flex flex-col items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#e07a5f] animate-pulse shadow-[0_0_10px_rgba(224,122,95,0.6)]"></div>
                      <span className="text-[10px] font-mono opacity-50">{role}</span>
                    </div>
                  ))}
                </div>

                <Link href="/platform">
                  <button className="w-full py-2 border border-[#e07a5f]/30 text-[#e07a5f] text-xs font-bold uppercase tracking-wider rounded hover:bg-[#e07a5f]/10 transition-colors">
                    View Room &rarr;
                  </button>
                </Link>
              </div>

              {/* Empty State Card */}
              <div className="bg-background/20 border border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center text-center gap-4 min-h-[200px]">
                <p className="text-sm opacity-60 max-w-xs">Your review room has capacity. Drop another contract to spin up a new mesh.</p>
                <Link href="/platform">
                  <button className="text-[#e07a5f] text-xs font-bold uppercase tracking-wider hover:underline">
                    Start a Review
                  </button>
                </Link>
              </div>

            </div>
          </section>

          {/* ZONE 3: RECENT VERDICTS */}
          <section>
            <h2 className="font-serif text-2xl mb-6">Recent Verdicts</h2>
            <div className="bg-background/40 border border-border rounded-lg overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-white/5">
                    <th className="px-6 py-4 font-mono text-xs uppercase tracking-wider opacity-60 font-normal">Contract</th>
                    <th className="px-6 py-4 font-mono text-xs uppercase tracking-wider opacity-60 font-normal hidden sm:table-cell">Vendor</th>
                    <th className="px-6 py-4 font-mono text-xs uppercase tracking-wider opacity-60 font-normal">Verdict</th>
                    <th className="px-6 py-4 font-mono text-xs uppercase tracking-wider opacity-60 font-normal hidden md:table-cell">Date</th>
                    <th className="px-6 py-4 font-mono text-xs uppercase tracking-wider opacity-60 font-normal text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_VERDICTS.map((v) => (
                    <tr key={v.id} className="border-b border-border/50 hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4 font-medium">{v.contract}</td>
                      <td className="px-6 py-4 opacity-70 hidden sm:table-cell">{v.vendor}</td>
                      <td className="px-6 py-4">
                        {v.status === "Approved" && <span className="inline-flex items-center gap-1.5 text-green-500 bg-green-500/10 px-2 py-1 rounded text-xs font-medium"><CheckCircle2 className="w-3.5 h-3.5"/> Approved</span>}
                        {v.status === "Escalated" && <span className="inline-flex items-center gap-1.5 text-amber-500 bg-amber-500/10 px-2 py-1 rounded text-xs font-medium"><AlertTriangle className="w-3.5 h-3.5"/> Escalated</span>}
                        {v.status === "Rejected" && <span className="inline-flex items-center gap-1.5 text-red-500 bg-red-500/10 px-2 py-1 rounded text-xs font-medium"><XCircle className="w-3.5 h-3.5"/> Rejected</span>}
                      </td>
                      <td className="px-6 py-4 opacity-70 hidden md:table-cell font-mono text-xs">{v.date}</td>
                      <td className="px-6 py-4 text-right">
                        <Link href="/platform">
                          <button className={`text-xs font-bold uppercase tracking-wider ${v.action === "Decide" ? "text-amber-500" : "text-white/50 hover:text-white"}`}>
                            {v.action}
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-4 border-t border-border flex justify-center">
                <button className="text-xs font-mono uppercase tracking-wider opacity-50 hover:opacity-100 transition-opacity">
                  Load More
                </button>
              </div>
            </div>
          </section>

        </div>
      </main>

    </div>
  );
}
