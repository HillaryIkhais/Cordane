"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center py-6 px-4"
    >
      <div className="w-full max-w-7xl flex justify-between items-center bg-white/60 backdrop-blur-2xl border border-white/60 px-8 py-4 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(140,110,100,0.15)]">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="text-2xl font-serif font-medium tracking-wide text-[#3e2723] group-hover:text-[#8c6b5d] transition-colors">Cordane.</div>
        </Link>
        
        <nav className="hidden md:flex gap-8 text-[11px] font-bold text-[#8d6e63] tracking-widest uppercase items-center">
          <Link href="/platform" className={`transition-colors border-b-2 pb-1 ${pathname === '/platform' ? 'text-[#e07a5f] border-[#e07a5f]' : 'border-transparent hover:text-[#e07a5f] hover:border-[#e07a5f]/50'}`}>Platform</Link>
          <Link href="/agents" className={`transition-colors border-b-2 pb-1 ${pathname === '/agents' ? 'text-[#e07a5f] border-[#e07a5f]' : 'border-transparent hover:text-[#e07a5f] hover:border-[#e07a5f]/50'}`}>Agents</Link>
          <Link href="/scenarios" className={`transition-colors border-b-2 pb-1 ${pathname === '/scenarios' ? 'text-[#e07a5f] border-[#e07a5f]' : 'border-transparent hover:text-[#e07a5f] hover:border-[#e07a5f]/50'}`}>Scenarios</Link>
        </nav>

        <Link href="/platform" className="bg-gradient-to-r from-[#e07a5f] to-[#e29578] text-white px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all shadow-[0_4px_15px_0_rgba(224,122,95,0.3)] hover:shadow-[0_8px_25px_0_rgba(224,122,95,0.5)] active:scale-95">
          New Review
        </Link>
      </div>
    </motion.header>
  );
}
