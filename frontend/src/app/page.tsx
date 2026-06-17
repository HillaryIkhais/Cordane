"use client";

import Link from "next/link";
import { ArrowRight, Shield, Scale, Calculator, Settings, CheckCircle2 } from "lucide-react";
import { Logo } from "@/components/logo";

export default function LandingPage() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground font-sans">
      
      {/* Global Header */}
      <header className="absolute top-0 w-full p-6 md:p-12 z-50 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <Logo className="w-8 h-8 group-hover:scale-105 transition-transform" />
          <span className="font-serif text-2xl tracking-tight hidden sm:block">Cordane.</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/how-it-works" className="text-sm font-medium opacity-100 hidden md:block">How It Works</Link>
          <Link href="/dashboard" className="px-5 py-2.5 bg-[#e07a5f] text-white font-bold text-xs tracking-wide uppercase rounded-lg hover:bg-opacity-90 transition-all shadow-[0_0_20px_-5px_rgba(224,122,95,0.4)]">
            Start a Review
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden pt-20">
        
        {/* Cinematic Lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#e07a5f]/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="space-y-8 max-w-5xl z-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-4 shadow-[0_0_15px_-5px_rgba(224,122,95,0.3)]">
            <span className="w-2 h-2 rounded-full bg-[#e07a5f] animate-pulse" />
            <span className="text-xs font-mono text-white/80 uppercase tracking-widest">Cordane Engine v2.0 Live</span>
          </div>
          
          <h1 className="font-serif text-6xl md:text-8xl tracking-tight leading-[1.1] text-white">
            Surface every risk. <br/>
            Resolve every conflict. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e07a5f] to-[#ffb5a7] italic font-medium pr-2">
              Sign the right contracts.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/60 font-sans max-w-3xl mx-auto leading-relaxed pt-4">
            Cordane puts legal, finance, risk, and ops in the same room — before you sign anything. No more Slack threads. No more decision deadlock.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link href="/dashboard">
              <button className="px-8 py-4 bg-[#e07a5f] text-white font-sans font-bold text-sm tracking-wide uppercase hover:bg-opacity-90 transition-all shadow-[0_0_40px_-10px_rgba(224,122,95,0.5)] rounded-lg">
                Start a Review &rarr;
              </button>
            </Link>
            <Link href="/how-it-works">
              <button className="px-8 py-4 bg-transparent text-white font-sans font-bold text-sm tracking-wide uppercase border border-white/20 hover:bg-white/5 transition-all rounded-lg">
                See How It Works
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
