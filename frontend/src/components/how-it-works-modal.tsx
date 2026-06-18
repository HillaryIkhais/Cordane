"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import Link from "next/link";

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HowItWorksModal({ isOpen, onClose }: HowItWorksModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 font-sans text-foreground">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: 20 }} 
            className="relative bg-background border border-border/50 rounded-3xl p-8 max-w-2xl w-full shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#cc8b45]/10 blur-[100px] pointer-events-none rounded-full" />
            
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-foreground/5 text-foreground/50 hover:text-foreground transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-serif text-3xl mb-2">How Cordane Works</h2>
            <p className="opacity-60 text-sm font-mono uppercase tracking-widest mb-10">The Mixture of Experts Workflow</p>

            <div className="flex flex-col gap-8 relative z-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#cc8b45]/10 border border-[#cc8b45]/30 flex items-center justify-center shrink-0 text-[#cc8b45] font-bold">1</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Upload Contract</h3>
                  <p className="text-sm opacity-70 leading-relaxed">Drag and drop your vendor contract (PDF/DOCX) into the platform. You can configure which LLM acts as which agent in Settings before initializing the mesh.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#cc8b45]/10 border border-[#cc8b45]/30 flex items-center justify-center shrink-0 text-[#cc8b45] font-bold">2</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Agents Negotiate</h3>
                  <p className="text-sm opacity-70 leading-relaxed">Four specialist AI models (Legal, Finance, Risk, Ops) instantly review the document. They argue with each other, identifying risks and margin impacts.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#cc8b45]/10 border border-[#cc8b45]/30 flex items-center justify-center shrink-0 text-[#cc8b45] font-bold">3</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Executive Override</h3>
                  <p className="text-sm opacity-70 leading-relaxed">If the agents reach consensus, the contract is Auto-Approved. If they deadlock over a critical clause, the decision is escalated to you for human override.</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-border/50 flex justify-end relative z-20">
              <Link href="/dashboard" onClick={onClose}>
                <button className="px-6 py-3 bg-[#cc8b45] text-black text-xs font-bold uppercase tracking-widest rounded-md hover:bg-[#b57a3c] transition-colors flex items-center gap-2">
                  Get Started <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
