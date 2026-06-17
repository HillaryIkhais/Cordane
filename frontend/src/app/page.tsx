"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { ThemeToggle } from "@/components/theme-toggle";
import { TypewriterFeed } from "@/components/typewriter-feed";

export default function LandingPage() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeFeedIndex, setActiveFeedIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? (theme === 'system' ? resolvedTheme : theme) : 'dark';

  // Helper to determine if a specific card should be highlighted
  // 0 = LGL (Legal), 1 = FIN (Finance), 2 = RSK (Risk), 3 = OPS (not in feed, so idle)
  const isCardActive = (idx: number) => activeFeedIndex === idx;

  return (
    <main className="min-h-screen w-full bg-background text-foreground font-sans relative overflow-hidden flex flex-col justify-center transition-colors duration-1000 ease-in-out">
      
      {/* Top Navigation / Controls */}
      <header className="absolute top-0 w-full p-6 md:p-8 z-50 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto">
        </Link>
        <div className="flex items-center gap-4 ml-auto">
          <ThemeToggle />
        </div>
      </header>

      {/* Main Split Layout */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center relative z-10">
        
        {/* LEFT COLUMN: Copy & CTA */}
        <div className="flex flex-col items-start space-y-8 max-w-xl relative z-20">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-border bg-foreground/5 backdrop-blur-md mb-6 shadow-sm transition-colors duration-700 ease-in-out">
            <span className="w-2 h-2 rounded-full bg-[#cc8b45] animate-pulse" />
            <span className="text-xs font-mono text-foreground/80 uppercase tracking-widest transition-colors duration-700">Cordane Engine v2.0 Live</span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl tracking-tight leading-[1.05] text-foreground transition-colors duration-700 ease-in-out">
            Surface every risk. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cc8b45] to-[#f4a261] italic font-medium pr-2">
              Resolve every conflict.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-foreground/70 font-sans leading-relaxed max-w-md pt-4 transition-colors duration-700 ease-in-out">
            Cordane puts legal, finance, risk, and ops in the same room — before you sign anything. No more Slack threads. No more decision deadlock.
          </p>

          <div className="pt-6">
            <Link href="/dashboard">
              <button className="px-8 py-4 bg-[#cc8b45] hover:bg-[#b57a3c] text-black font-sans font-bold text-xs tracking-wider uppercase transition-all rounded-md shadow-lg flex items-center gap-2">
                Start a Review <span className="text-lg leading-none">&rarr;</span>
              </button>
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Orb & Agents */}
        <div className="relative w-full aspect-square max-w-[600px] mx-auto lg:ml-auto flex items-center justify-center">
          
          {/* Glowing Orb Background */}
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <div className="relative w-[80%] h-[80%]">
              {mounted && (
                <div 
                  className="absolute inset-0 w-full h-full animate-spin-slow"
                  style={{
                    WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 70%)",
                    maskImage: "radial-gradient(circle at center, black 40%, transparent 70%)"
                  }}
                >
                  <Image 
                    src={currentTheme === "light" ? "/light_orb_scaled.png" : "/dark_orb_premium.png"} 
                    alt="Cordane Orb" 
                    fill 
                    className={`object-contain transition-all duration-1000 ease-in-out ${
                      currentTheme === "light"
                        ? "mix-blend-multiply opacity-90 scale-100"
                        : "mix-blend-screen opacity-100 scale-100"
                    }`}
                    priority
                  />
                </div>
              )}
            </div>
          </div>

          {/* Glassmorphic Agent Cards */}
          <div className="absolute inset-0 z-10 w-full h-full flex flex-col justify-center gap-4">
            
            {/* Top Row */}
            <div className="flex justify-between w-[110%] -ml-[5%] gap-4 px-4 translate-y-[-40px]">
              {/* LEGAL (Index 0) */}
              <div className={`flex-1 bg-background/60 backdrop-blur-xl border rounded-xl p-5 shadow-2xl transition-all duration-500 hover:scale-105 ${isCardActive(0) ? "border-[#cc8b45] shadow-[0_0_30px_rgba(204,139,69,0.3)] bg-background/80 scale-105" : "border-border/50 scale-100"}`}>
                <h3 className="font-sans text-lg text-foreground mb-1">Legal</h3>
                <p className="text-[10px] font-mono uppercase tracking-widest text-foreground/40">Risk Mitigation</p>
              </div>
              {/* FINANCE (Index 1) */}
              <div className={`flex-1 bg-background/60 backdrop-blur-xl border rounded-xl p-5 shadow-2xl flex flex-col items-start relative transition-all duration-500 hover:scale-105 ${isCardActive(1) ? "border-[#cc8b45] shadow-[0_0_30px_rgba(204,139,69,0.3)] bg-background/80 scale-105" : "border-border/50 scale-100"}`}>
                <div className={`absolute top-6 right-5 w-1.5 h-1.5 rounded-full ${isCardActive(1) ? "bg-[#cc8b45] animate-pulse" : "bg-foreground/20"}`}></div>
                <h3 className="font-sans text-lg text-foreground mb-1">Finance</h3>
                <p className="text-[10px] font-mono uppercase tracking-widest text-foreground/40">Margin Analysis</p>
              </div>
            </div>

            {/* Middle Row */}
            <div className="flex justify-between w-[120%] -ml-[10%] gap-4 px-4 z-20">
              {/* RISK (Index 2) */}
              <div className={`flex-1 bg-background/90 backdrop-blur-2xl border rounded-xl p-5 shadow-2xl flex flex-col items-start relative transition-all duration-500 ${isCardActive(2) ? "border-[#cc8b45] shadow-[0_0_30px_rgba(204,139,69,0.3)] scale-110" : "border-border/50 scale-105"}`}>
                <div className={`absolute top-6 right-5 w-1.5 h-1.5 rounded-full ${isCardActive(2) ? "bg-[#cc8b45] animate-pulse" : "bg-foreground/20"}`}></div>
                <h3 className="font-sans text-lg text-foreground mb-1 font-medium">Risk</h3>
                <p className="text-[10px] font-mono uppercase tracking-widest text-foreground/50">Global Compliance</p>
              </div>
              {/* OPS (Index 3 / Idle for now) */}
              <div className={`flex-1 bg-background/60 backdrop-blur-xl border rounded-xl p-5 shadow-2xl flex flex-col items-start relative transition-all duration-500 hover:scale-105 translate-y-[20px] ${isCardActive(3) ? "border-[#cc8b45] shadow-[0_0_30px_rgba(204,139,69,0.3)] bg-background/80 scale-105" : "border-border/50 scale-100"}`}>
                <div className={`absolute top-6 right-5 w-1.5 h-1.5 rounded-full ${isCardActive(3) ? "bg-[#cc8b45] animate-pulse" : "bg-foreground/20"}`}></div>
                <h3 className="font-sans text-lg text-foreground mb-1">Ops</h3>
                <p className="text-[10px] font-mono uppercase tracking-widest text-foreground/40">SLA Verification</p>
              </div>
            </div>

            {/* Bottom Feed */}
            <TypewriterFeed activeIndex={activeFeedIndex} onActiveIndexChange={setActiveFeedIndex} />

          </div>
        </div>
      </div>
    </main>
  );
}
