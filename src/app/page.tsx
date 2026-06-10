"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center px-4 sm:px-8 h-[calc(100vh-150px)] justify-center">
      
      {/* The Breathing Orb (Massive for the landing page) */}
      <motion.div 
        animate={{ 
          background: `radial-gradient(circle, rgba(224, 122, 95, 0.25) 0%, rgba(255,255,255,0) 70%)`,
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px] rounded-full blur-[90px] z-[-1] opacity-90"
      />

      {/* HERO SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center z-10"
      >
        <div className="inline-block border border-[#e07a5f]/30 bg-white/50 backdrop-blur-md px-6 py-2 rounded-full mb-8 shadow-sm">
          <span className="text-[11px] font-bold tracking-widest uppercase text-[#e07a5f]">Meet Cordane. Multi-Agent Collaboration.</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-light text-[#4e342e] mb-8 max-w-5xl mx-auto leading-tight tracking-tight">
          AI Agents that <br/> <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#e07a5f] to-[#e29578]">Negotiate For You.</span>
        </h1>
        <p className="text-xl md:text-2xl text-[#8d6e63] font-light max-w-3xl mx-auto mb-12">
          Upload a contract. Watch four specialized AI agents argue over the details. Get a final decision in 5 seconds instead of 5 weeks.
        </p>
        
        <Link 
          href="/platform"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-[#e07a5f] to-[#e29578] text-white px-10 py-5 rounded-full text-sm font-semibold tracking-widest uppercase transition-all shadow-[0_8px_25px_0_rgba(224,122,95,0.4)] hover:shadow-[0_12px_35px_0_rgba(224,122,95,0.6)] active:scale-95 group"
        >
          ENTER PLATFORM 
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </div>
  );
}
