"use client";

import Link from "next/link";
import { ArrowLeft, Shield, Scale, Calculator, Settings } from "lucide-react";
import { Logo } from "@/components/logo";

const AGENTS = [
  {
    icon: <Scale className="w-6 h-6 text-[#cc8b45]" />,
    role: "Legal",
    model: "Claude Sonnet 4.6 (AI/ML API)",
    focus: "Contract language, clause identification, legal nuance.",
    action: "Flags uncapped liabilities and data ownership risks."
  },
  {
    icon: <Calculator className="w-6 h-6 text-[#cc8b45]" />,
    role: "Finance",
    model: "QwQ-32B (Featherless AI)",
    focus: "Mathematical precision, budget thresholds, payment terms.",
    action: "Recalibrates budget viability based on identified risks."
  },
  {
    icon: <Shield className="w-6 h-6 text-[#cc8b45]" />,
    role: "Risk",
    model: "DeepSeek-R1 (Featherless AI)",
    focus: "Chain-of-thought multi-factor scoring, vendor assessment.",
    action: "Elevates threat scores based on legal and financial inputs."
  },
  {
    icon: <Settings className="w-6 h-6 text-[#cc8b45]" />,
    role: "Ops",
    model: "Qwen3-235B-A22B (Featherless AI)",
    focus: "Dual-mode reasoning, operational feasibility.",
    action: "Assesses integration timelines and team capacity."
  }
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative z-10">
      
      {/* Subtle background glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-[#cc8b45]/5 blur-[200px] rounded-full pointer-events-none -z-10" />

      {/* HEADER */}
      <header className="border-b border-white/5 bg-background/60 backdrop-blur-3xl sticky top-0 z-50 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)]">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity">
            <ArrowLeft className="w-4 h-4" /> Back Home
          </Link>
          <Link href="/" className="flex items-center gap-3 group">
            <Logo className="w-6 h-6 group-hover:scale-105 transition-transform" />
            <span className="font-serif text-xl tracking-tight text-foreground/90">Cordane.</span>
          </Link>
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-24 flex flex-col gap-32">
        
        {/* SECTION 1: THE PROBLEM */}
        <section className="text-center">
          <h1 className="font-serif text-5xl md:text-7xl tracking-tight leading-[1.05] text-foreground mb-8">
            The anatomy of <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cc8b45] to-[#f4a261]">
              a failed review.
            </span>
          </h1>
          <p className="text-lg md:text-xl opacity-70 leading-relaxed max-w-2xl mx-auto">
            Every organization faces decisions that require multiple departments to agree. In practice: Legal emails Finance. Finance waits on Risk. Risk waits on Legal's clause extraction. Ops waits on everyone. Three weeks pass. The decision rots in a Slack thread or gets approved blindly to end the suffering. This is decision deadlock.
          </p>
        </section>

        {/* SECTION 2: THE AGENTS */}
        <section>
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl tracking-tight mb-4">The Four Specialists</h2>
            <p className="opacity-70 max-w-lg mx-auto">
              We selected specific, best-in-class models for the cognitive task of each agent — not by popularity or benchmark ranking.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {AGENTS.map((agent, idx) => (
              <div key={idx} className="bg-background/60 backdrop-blur-xl border border-border/50 rounded-2xl p-8 hover:bg-background/80 hover:border-[#cc8b45]/30 hover:scale-[1.02] transition-all duration-500 shadow-2xl group">
                <div className="flex items-center gap-5 mb-8">
                  <div className="bg-[#cc8b45]/10 p-3 rounded-xl border border-[#cc8b45]/20 group-hover:bg-[#cc8b45]/20 group-hover:scale-110 transition-all duration-500 shadow-[0_0_20px_rgba(204,139,69,0.15)]">
                    {agent.icon}
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl mb-1">{agent.role}</h3>
                    <p className="font-mono text-[10px] uppercase tracking-widest opacity-50">{agent.model}</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#cc8b45]">Focus</span>
                    <p className="text-sm opacity-80 mt-2 leading-relaxed">{agent.focus}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#cc8b45]">Action</span>
                    <p className="text-sm opacity-80 mt-2 leading-relaxed">{agent.action}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: THE MECHANIC */}
        <section>
          <div className="bg-background/40 backdrop-blur-3xl border border-border/50 rounded-3xl p-8 md:p-16 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-[#cc8b45]/50 to-transparent"></div>
            
            <h2 className="font-serif text-4xl tracking-tight mb-6">The Consensus Mechanism</h2>
            <p className="text-lg opacity-70 leading-relaxed mb-16 max-w-2xl">
              Agents in Cordane cannot complete their analysis without reading what other agents post. The negotiation is not a scripted sequence — it is a bounded constraint-satisfaction loop managed via the <b>Band SDK</b>.
            </p>

            <div className="flex flex-col gap-12 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#cc8b45]/50 before:via-white/10 before:to-transparent">
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-12 h-12 rounded-full border border-[#cc8b45]/30 bg-background backdrop-blur-xl text-[#cc8b45] font-serif text-xl shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_30px_rgba(204,139,69,0.3)] z-10">
                  1
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-4rem)] p-8 rounded-2xl border border-white/5 bg-black/20 hover:bg-black/40 hover:border-[#cc8b45]/20 transition-all duration-300">
                  <h4 className="font-sans text-xl font-medium mb-3">Cross-Examination</h4>
                  <p className="text-sm opacity-60 leading-relaxed">Any agent can veto if a hard constraint is violated (e.g., uncapped liability clause, budget 3x over threshold).</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-12 h-12 rounded-full border border-[#cc8b45]/30 bg-background backdrop-blur-xl text-[#cc8b45] font-serif text-xl shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_30px_rgba(204,139,69,0.3)] z-10">
                  2
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-4rem)] p-8 rounded-2xl border border-white/5 bg-black/20 hover:bg-black/40 hover:border-[#cc8b45]/20 transition-all duration-300">
                  <h4 className="font-sans text-xl font-medium mb-3">Bounded Negotiation</h4>
                  <p className="text-sm opacity-60 leading-relaxed">Agents negotiate for up to 3 rounds, posting updated positions to the Band room, reacting to each other's parameters.</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-12 h-12 rounded-full border border-[#cc8b45]/30 bg-background backdrop-blur-xl text-[#cc8b45] font-serif text-xl shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_30px_rgba(204,139,69,0.3)] z-10">
                  3
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-4rem)] p-8 rounded-2xl border border-white/5 bg-black/20 hover:bg-black/40 hover:border-[#cc8b45]/20 transition-all duration-300">
                  <h4 className="font-sans text-xl font-medium mb-3">Escalation Protocol</h4>
                  <p className="text-sm opacity-60 leading-relaxed">If any hard constraint remains violated after 3 rounds, execution halts. The human receives a precise summary of the deadlock.</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 4: THE AUDIT TRAIL */}
        <section className="text-center pb-32">
          <h2 className="font-serif text-4xl tracking-tight mb-6">The Final Output</h2>
          <p className="opacity-70 leading-relaxed mb-12 max-w-xl mx-auto text-lg">
            You don't wade through four reports. You get one verdict, one summary, and one action, backed by a cryptographically secure audit trail.
          </p>

          <Link href="/platform">
            <button className="px-10 py-5 bg-[#cc8b45] text-black font-sans font-bold text-xs tracking-widest uppercase hover:bg-[#b57a3c] transition-all shadow-[0_0_40px_-10px_rgba(204,139,69,0.8)] hover:shadow-[0_0_60px_-10px_rgba(204,139,69,1)] rounded-md">
              Review Your First Contract
            </button>
          </Link>
        </section>

      </main>
    </div>
  );
}
