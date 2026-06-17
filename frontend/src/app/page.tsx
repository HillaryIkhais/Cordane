import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/logo";

export default function LandingPage() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground font-sans relative overflow-hidden flex flex-col justify-center">
      
      {/* Top Navigation / Controls */}
      <header className="absolute top-0 w-full p-6 md:p-8 z-50 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto">
          {/* Hidden on mobile to keep focus on center, visible on md+ if needed, but the original design didn't even have a logo in the top left! We'll keep it very minimal */}
        </Link>
        <div className="flex items-center gap-4 ml-auto">
          <ThemeToggle />
        </div>
      </header>

      {/* Main Split Layout */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center relative z-10">
        
        {/* LEFT COLUMN: Copy & CTA */}
        <div className="flex flex-col items-start space-y-8 max-w-xl relative z-20">
          <h1 className="font-serif text-6xl md:text-[5rem] tracking-tight leading-[1.05] text-foreground">
            The Autonomous <br/>
            <span className="italic">Contract Room.</span>
          </h1>

          <p className="text-lg md:text-xl text-foreground/70 font-sans leading-relaxed max-w-md">
            Cordane uses specialized AI agents to review, negotiate, and finalize your enterprise contracts instantly.
          </p>

          <div className="pt-4">
            <Link href="/dashboard">
              <button className="px-8 py-4 bg-[#cc8b45] hover:bg-[#b57a3c] text-black font-sans font-bold text-xs tracking-wider uppercase transition-all rounded-md shadow-lg">
                Deploy Consensus Engine
              </button>
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Orb & Agents */}
        <div className="relative w-full aspect-square max-w-[600px] mx-auto lg:ml-auto flex items-center justify-center">
          
          {/* Glowing Orb Background */}
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <div className="relative w-[80%] h-[80%]">
              <Image 
                src="/orb.png" 
                alt="Liquid Amber Orb" 
                fill 
                className="object-contain drop-shadow-[0_0_60px_rgba(204,139,69,0.3)] animate-pulse-slow"
                priority
              />
            </div>
          </div>

          {/* Glassmorphic Agent Cards */}
          <div className="absolute inset-0 z-10 w-full h-full flex flex-col justify-center gap-4">
            
            {/* Top Row */}
            <div className="flex justify-between w-[110%] -ml-[5%] gap-4 px-4 translate-y-[-40px]">
              <div className="flex-1 bg-background/60 backdrop-blur-xl border border-border/50 rounded-xl p-5 shadow-2xl transition-all hover:scale-105">
                <h3 className="font-sans text-lg text-foreground mb-1">Legal</h3>
                <p className="text-[10px] font-mono uppercase tracking-widest text-foreground/40">Risk Mitigation</p>
              </div>
              <div className="flex-1 bg-background/60 backdrop-blur-xl border border-border/50 rounded-xl p-5 shadow-2xl flex flex-col items-start relative transition-all hover:scale-105">
                <div className="absolute top-6 right-5 w-1.5 h-1.5 rounded-full bg-[#cc8b45] animate-pulse"></div>
                <h3 className="font-sans text-lg text-foreground mb-1">Finance</h3>
                <p className="text-[10px] font-mono uppercase tracking-widest text-foreground/40">Margin Analysis</p>
              </div>
            </div>

            {/* Middle Row */}
            <div className="flex justify-between w-[120%] -ml-[10%] gap-4 px-4 z-20">
              <div className="flex-1 bg-background/90 backdrop-blur-2xl border border-[#cc8b45]/30 rounded-xl p-5 shadow-2xl flex flex-col items-start relative scale-105">
                <div className="absolute top-6 right-5 w-1.5 h-1.5 rounded-full bg-[#cc8b45]"></div>
                <h3 className="font-sans text-lg text-foreground mb-1 font-medium">Risk</h3>
                <p className="text-[10px] font-mono uppercase tracking-widest text-foreground/50">Global Compliance</p>
              </div>
              <div className="flex-1 bg-background/60 backdrop-blur-xl border border-border/50 rounded-xl p-5 shadow-2xl flex flex-col items-start relative transition-all hover:scale-105 translate-y-[20px]">
                <div className="absolute top-6 right-5 w-1.5 h-1.5 rounded-full bg-foreground/20"></div>
                <h3 className="font-sans text-lg text-foreground mb-1">Ops</h3>
                <p className="text-[10px] font-mono uppercase tracking-widest text-foreground/40">SLA Verification</p>
              </div>
            </div>

            {/* Bottom Feed */}
            <div className="w-[105%] -ml-[2.5%] bg-background/80 backdrop-blur-2xl border border-border/50 rounded-xl p-6 shadow-2xl mt-8 flex flex-col gap-3">
              <div className="flex gap-4 items-start">
                <span className="font-mono text-[10px] text-foreground/40 uppercase font-bold pt-0.5">LGL</span>
                <p className="text-xs text-foreground/70">Clause 4.2 limits liability to $1M. Unacceptable for this volume.</p>
              </div>
              <div className="flex gap-4 items-start">
                <span className="font-mono text-[10px] text-foreground/40 uppercase font-bold pt-0.5">FIN</span>
                <p className="text-xs text-foreground/70">Agreed. Raising ceiling to $5M aligns with our risk matrix.</p>
              </div>
              <div className="flex gap-4 items-start">
                <span className="font-mono text-[10px] text-[#cc8b45] uppercase font-bold pt-0.5">RSK</span>
                <p className="text-xs text-foreground font-medium">Checking vendor compliance... OFAC cleared. GDPR compliant.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
