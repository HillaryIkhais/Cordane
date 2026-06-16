"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center px-4 sm:px-8 min-h-screen justify-center text-[#4e342e] relative overflow-hidden">
      
      {/* Warm Ambient Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#ffd8c4] to-[#f4c2c2] rounded-full blur-[120px] pointer-events-none opacity-60"></div>
      
      {/* Decorative Floating Elements */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[15%] w-32 h-32 rounded-3xl bg-white/40 backdrop-blur-md border border-white/50 shadow-xl"
      />
      <motion.div 
        animate={{ y: [0, 25, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[20%] right-[15%] w-48 h-48 rounded-full bg-white/30 backdrop-blur-lg border border-white/40 shadow-2xl"
      />

      {/* HERO SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center z-10 w-full max-w-4xl"
      >
        <div className="inline-flex items-center gap-2 border border-[#e07a5f]/20 bg-white/60 backdrop-blur-md px-6 py-2 rounded-full mb-8 shadow-sm">
          <Sparkles className="w-4 h-4 text-[#e07a5f]"/> 
          <span className="text-[12px] font-semibold tracking-wider uppercase text-[#e07a5f]">
            Contract Review, Automated
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-light mb-8 mx-auto leading-tight tracking-tight">
          Four experts. <span className="font-serif italic bg-clip-text text-transparent bg-gradient-to-r from-[#e07a5f] to-[#e29578]">One decision.</span>
        </h1>
        <p className="text-xl md:text-2xl text-[#8d6e63] max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          Upload a vendor contract. Legal, Finance, Risk, and Ops each review it independently — then negotiate together until they agree or flag it for you.
        </p>
        
        <Link 
          href="/platform"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-[#e07a5f] to-[#e29578] text-white px-10 py-5 rounded-full text-sm font-semibold tracking-widest uppercase transition-all shadow-[0_8px_30px_rgba(224,122,95,0.3)] hover:shadow-[0_12px_40px_rgba(224,122,95,0.4)] hover:-translate-y-1 group"
        >
          Start a Review
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </main>
  );
}
