"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center px-4 sm:px-8 min-h-screen justify-center text-white relative overflow-hidden bg-[#0D0D0D]">
      
      {/* Dark Ambient Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#C8853A]/20 to-[#0D0D0D] rounded-full blur-[120px] pointer-events-none opacity-40"></div>
      
      {/* Decorative Floating Elements */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[15%] w-32 h-32 rounded-3xl bg-[#C8853A]/10 backdrop-blur-md border border-[#C8853A]/20 shadow-xl"
      />
      <motion.div 
        animate={{ y: [0, 25, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[20%] right-[15%] w-48 h-48 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl"
      />

      {/* HERO SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center z-10 w-full max-w-4xl"
      >
        <div className="inline-flex items-center gap-2 border border-[#C8853A]/30 bg-black/40 backdrop-blur-md px-6 py-2 rounded-full mb-8 shadow-sm">
          <Zap className="w-4 h-4 text-[#C8853A]"/> 
          <span className="text-[12px] font-semibold tracking-wider uppercase text-[#C8853A]">
            Enterprise Decision Engine
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-light mb-8 mx-auto leading-tight tracking-tight text-white">
          Four experts. <span className="font-serif italic text-[#C8853A]">One decision.</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          Upload a vendor contract. Legal, Finance, Risk, and Ops each review it independently — then negotiate together until they agree or flag it for you.
        </p>
        
        <Link 
          href="/platform"
          className="inline-flex items-center gap-3 bg-[#C8853A] text-[#0D0D0D] px-10 py-5 rounded-full text-sm font-bold tracking-widest uppercase transition-all shadow-[0_8px_30px_rgba(200,133,58,0.2)] hover:shadow-[0_12px_40px_rgba(200,133,58,0.4)] hover:-translate-y-1 group"
        >
          Initialize Consensus
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </main>
  );
}
