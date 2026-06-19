"use client";

import { Shield, Search, Filter, ChevronRight, Database, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function VerdictsPage() {
  const [verdicts, setVerdicts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchVerdicts = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const res = await fetch(`${apiUrl}/api/scenarios`);
        if (res.ok) {
          const data = await res.json();
          // Map scenarios to the verdicts table structure
          const formattedData = Array.isArray(data) ? data.map((s: any) => ({
            id: s.id,
            contract: s.title,
            vendor: s.vendor || "External",
            status: s.status === "Ready" ? "Approved" : s.status, // Fallback mapping for demo
            date: s.date
          })) : [];
          setVerdicts(formattedData);
        } else {
          setVerdicts([]);
        }
      } catch (err) {
        console.error("Failed to fetch verdicts:", err);
        setVerdicts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVerdicts();
  }, []);

  // Debounced search tracking
  useEffect(() => {
    if (!searchQuery) return;
    const timer = setTimeout(() => {
      pendo.track("verdicts_searched", {
        searchQuery: searchQuery.substring(0, 100),
        resultsCount: verdicts.filter((v) => {
          const matchesFilter = filterStatus === "All" || (v.status || "").toUpperCase() === filterStatus.toUpperCase();
          const s = searchQuery.toLowerCase();
          return matchesFilter && ((v.contract || "").toLowerCase().includes(s) || (v.vendor || "").toLowerCase().includes(s) || (v.id || "").toLowerCase().includes(s));
        }).length,
        totalVerdicts: verdicts.length,
        activeFilter: filterStatus,
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery, filterStatus, verdicts]);

  const filteredVerdicts = verdicts.filter((v) => {
    const matchesFilter = filterStatus === "All" || (v.status || "").toUpperCase() === filterStatus.toUpperCase();
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = (v.contract || "").toLowerCase().includes(searchLower) || 
                          (v.vendor || "").toLowerCase().includes(searchLower) ||
                          (v.id || "").toLowerCase().includes(searchLower);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12 flex flex-col gap-8 relative z-10">
      
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4">
        <div>
          <h1 className="font-serif text-4xl tracking-tight mb-2">Verdicts Archive</h1>
          <p className="opacity-60 text-sm font-mono uppercase tracking-widest">Past Contract Reviews</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40 group-focus-within:text-[#cc8b45] transition-colors" />
            <input 
              type="text" 
              placeholder="Search contracts..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-foreground/5 border border-foreground/10 rounded-full py-2.5 pl-11 pr-6 text-sm focus:outline-none focus:border-[#cc8b45]/50 focus:ring-1 focus:ring-[#cc8b45]/50 transition-all w-64"
            />
          </div>
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Filters */}
      <div className="flex items-center gap-3 border-b border-border/50 pb-6 overflow-x-auto">
        {["All", "Approved", "Escalated", "Rejected"].map((status) => (
          <button 
            key={status}
            onClick={() => {
              setFilterStatus(status);
              pendo.track("verdicts_filtered", {
                filterStatus: status,
                resultsCount: verdicts.filter((v) => {
                  const matchesFilter = status === "All" || (v.status || "").toUpperCase() === status.toUpperCase();
                  const s = searchQuery.toLowerCase();
                  return matchesFilter && ((v.contract || "").toLowerCase().includes(s) || (v.vendor || "").toLowerCase().includes(s) || (v.id || "").toLowerCase().includes(s));
                }).length,
                totalVerdicts: verdicts.length,
              });
            }}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest shrink-0 transition-colors ${
              filterStatus === status 
                ? 'bg-[#cc8b45] text-black shadow-[0_0_15px_rgba(204,139,69,0.3)]' 
                : 'bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 text-foreground'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      {verdicts.length > 0 ? (
        <div className="bg-background/40 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden shadow-2xl relative min-h-[300px]">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#cc8b45]/5 blur-[120px] pointer-events-none"></div>

          {filteredVerdicts.length > 0 ? (
            <table className="w-full text-left border-collapse relative z-10">
              <thead>
                <tr className="border-b border-foreground/10 text-[10px] uppercase tracking-widest opacity-50 bg-foreground/5">
                  <th className="py-4 px-6 font-medium">Review ID</th>
                  <th className="py-4 px-6 font-medium hidden sm:table-cell">Contract / Vendor</th>
                  <th className="py-4 px-6 font-medium hidden md:table-cell">Date</th>
                  <th className="py-4 px-6 font-medium">Verdict</th>
                  <th className="py-4 px-6 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredVerdicts.map((v, i) => (
                  <tr key={v.id || i} className="border-b border-foreground/5 hover:bg-foreground/5 transition-colors group cursor-pointer">
                    <td className="py-5 px-6 font-mono text-sm opacity-70">{v.id || `REV-${Math.floor(Math.random() * 10000)}`}</td>
                    <td className="py-5 px-6 font-medium hidden sm:table-cell">
                      <div>{v.contract || "Unknown Contract"}</div>
                      <div className="text-xs font-mono opacity-50 mt-1">{v.vendor || "Unknown Vendor"}</div>
                    </td>
                    <td className="py-5 px-6 font-mono text-sm opacity-60 hidden md:table-cell">{v.date || new Date().toLocaleDateString()}</td>
                    <td className="py-5 px-6">
                      {v.status === "Approved" && <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-full"><CheckCircle2 className="w-3 h-3"/> Approved</span>}
                      {v.status === "Escalated" && <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full shadow-[0_0_10px_rgba(204,139,69,0.2)]"><AlertTriangle className="w-3 h-3"/> Escalated</span>}
                      {v.status === "Rejected" && <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-full"><XCircle className="w-3 h-3"/> Rejected</span>}
                      {(!v.status || !["Approved", "Escalated", "Rejected"].includes(v.status)) && <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground/60 bg-foreground/5 border border-foreground/10 px-3 py-1.5 rounded-full">{v.status || "Unknown"}</span>}
                    </td>
                    <td className="py-5 px-6 text-right">
                      <Link href={`/platform?id=${v.id}`}>
                        <ChevronRight className="w-4 h-4 inline-block opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center relative z-10">
              <Search className="w-8 h-8 text-foreground/20 mb-4" />
              <p className="text-sm opacity-50">No contracts found matching your filters.</p>
            </div>
          )}
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-background/20 backdrop-blur-sm border-2 border-dashed border-border/50 rounded-2xl p-16 flex flex-col items-center justify-center text-center gap-5 min-h-[400px]">
          <div className="p-5 bg-foreground/5 rounded-full">
            <Database className="w-8 h-8 text-foreground/40" />
          </div>
          <div>
            <h3 className="font-serif text-2xl mb-2">{isLoading ? "Loading Historical Data..." : "No Past Contracts"}</h3>
            <p className="text-sm opacity-50 max-w-md mx-auto leading-relaxed">
              {isLoading ? "Querying database for past review outcomes." : "There are no completed contract reviews in the system yet. Upload a contract to initialize a new AI mesh and populate your archive."}
            </p>
          </div>
          {!isLoading && (
            <Link href="/upload">
              <button className="mt-4 px-8 py-3 bg-[#cc8b45] text-black text-xs font-bold uppercase tracking-widest rounded-md hover:bg-[#b57a3c] transition-colors shadow-[0_0_20px_rgba(204,139,69,0.3)]">
                Initialize New Review
              </button>
            </Link>
          )}
        </motion.div>
      )}

    </div>
  );
}

