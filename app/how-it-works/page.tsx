import Link from "next/link";
import { ArrowLeft, ArrowRight, Shield, Scale, Calculator, Settings, CheckCircle2 } from "lucide-react";

const AGENTS = [
  {
    icon: <Scale className="w-6 h-6 text-[#e07a5f]" />,
    role: "Legal",
    model: "Claude Sonnet 4.6 (AI/ML API)",
    focus: "Contract language, clause identification, legal nuance.",
    action: "Flags uncapped liabilities and data ownership risks."
  },
  {
    icon: <Calculator className="w-6 h-6 text-[#e07a5f]" />,
    role: "Finance",
    model: "QwQ-32B (Featherless AI)",
    focus: "Mathematical precision, budget thresholds, payment terms.",
    action: "Recalibrates budget viability based on identified risks."
  },
  {
    icon: <Shield className="w-6 h-6 text-[#e07a5f]" />,
    role: "Risk",
    model: "DeepSeek-R1 (Featherless AI)",
    focus: "Chain-of-thought multi-factor scoring, vendor assessment.",
    action: "Elevates threat scores based on legal and financial inputs."
  },
  {
    icon: <Settings className="w-6 h-6 text-[#e07a5f]" />,
    role: "Ops",
    model: "Qwen3-235B-A22B (Featherless AI)",
    focus: "Dual-mode reasoning, operational feasibility.",
    action: "Assesses integration timelines and team capacity."
  }
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      
      {/* HEADER */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider opacity-60 hover:opacity-100 transition-opacity">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <span className="font-serif text-2xl tracking-tight text-[#e07a5f]">Cordane.</span>
          <div className="w-16"></div> {/* Spacer for centering */}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-20 flex flex-col gap-32">
        
        {/* SECTION 1: THE PROBLEM */}
        <section className="text-center">
          <h1 className="font-serif text-5xl md:text-6xl tracking-tight mb-8">
            The anatomy of <br/>a <span className="italic font-medium text-[#e07a5f]">failed review.</span>
          </h1>
          <p className="text-lg md:text-xl opacity-80 leading-relaxed max-w-2xl mx-auto">
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
              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-[#e07a5f]/10 p-3 rounded-lg border border-[#e07a5f]/20">
                    {agent.icon}
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl">{agent.role}</h3>
                    <p className="font-mono text-xs opacity-50">{agent.model}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#e07a5f]">Focus</span>
                    <p className="text-sm opacity-80 mt-1">{agent.focus}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#e07a5f]">Action</span>
                    <p className="text-sm opacity-80 mt-1">{agent.action}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: THE MECHANIC */}
        <section>
          <div className="bg-[#e07a5f]/5 border border-[#e07a5f]/20 rounded-2xl p-8 md:p-16">
            <h2 className="font-serif text-4xl tracking-tight mb-6">The Consensus Mechanism</h2>
            <p className="text-lg opacity-80 leading-relaxed mb-12 max-w-2xl">
              Agents in Cordane cannot complete their analysis without reading what other agents post. The negotiation is not a scripted sequence — it is a bounded constraint-satisfaction loop managed via the <b>Band SDK</b>.
            </p>

            <div className="flex flex-col gap-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-background bg-[#e07a5f] text-background font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_20px_rgba(224,122,95,0.4)]">
                  1
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-xl border border-white/10 bg-background/50">
                  <h4 className="font-bold mb-1">Cross-Examination</h4>
                  <p className="text-sm opacity-70">Any agent can veto if a hard constraint is violated (e.g., uncapped liability clause, budget 3x over threshold).</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-background bg-[#e07a5f] text-background font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_20px_rgba(224,122,95,0.4)]">
                  2
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-xl border border-white/10 bg-background/50">
                  <h4 className="font-bold mb-1">Bounded Negotiation</h4>
                  <p className="text-sm opacity-70">Agents negotiate for up to 3 rounds, posting updated positions to the Band room, reacting to each other's parameters.</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-background bg-[#e07a5f] text-background font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_20px_rgba(224,122,95,0.4)]">
                  3
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-xl border border-white/10 bg-background/50">
                  <h4 className="font-bold mb-1">Escalation Protocol</h4>
                  <p className="text-sm opacity-70">If any hard constraint remains violated after 3 rounds, execution halts. The human receives a precise summary of the deadlock.</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 4: THE AUDIT TRAIL */}
        <section className="text-center pb-20">
          <h2 className="font-serif text-4xl tracking-tight mb-6">The Final Output</h2>
          <p className="opacity-80 leading-relaxed mb-12 max-w-xl mx-auto">
            You don't wade through four reports. You get one verdict, one summary, and one action, backed by a cryptographically secure audit trail.
          </p>

          <Link href="/platform">
            <button className="px-10 py-5 bg-[#e07a5f] text-white font-sans font-bold text-sm tracking-wide uppercase hover:bg-opacity-90 transition-all shadow-[0_0_40px_-10px_rgba(224,122,95,0.5)] rounded-full">
              Review Your First Contract
            </button>
          </Link>
        </section>

      </main>

    </div>
  );
}
