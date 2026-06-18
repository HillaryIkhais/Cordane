"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import { ThemeToggle } from "@/components/theme-toggle";
import { TypewriterFeed } from "@/components/typewriter-feed";
import { HowItWorksModal } from "@/components/how-it-works-modal";
import { HelpCircle, LogIn, UserCircle2, LayoutDashboard, Settings, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/logo";

export default function LandingPage() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeFeedIndex, setActiveFeedIndex] = useState(0);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const { login, logout, authenticated, user } = useAuth();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    
    // Close menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentTheme = mounted ? (theme === 'system' ? resolvedTheme : theme) : 'dark';

  const isCardActive = (idx: number) => activeFeedIndex === idx;

  const handleStartReview = () => {
    if (authenticated) {
      router.push("/dashboard");
    } else {
      login();
    }
  };

  return (
    <main className="min-h-screen w-full bg-background text-foreground font-sans relative overflow-hidden flex flex-col justify-center transition-colors duration-1000 ease-in-out">
      
      {/* Top Navigation / Controls */}
      <header className="absolute top-0 w-full p-6 md:p-8 z-50 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Logo className="w-8 h-8" />
          <span className="font-serif text-2xl tracking-tight">Cordane.</span>
        </div>
        <div className="flex items-center gap-4 ml-auto">
          <button 
            onClick={() => setShowHelpModal(true)}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-foreground/5 hover:bg-foreground/10 backdrop-blur-md text-sm font-medium transition-colors"
          >
            <HelpCircle className="w-4 h-4" /> How it Works
          </button>
          
          {mounted && (
            authenticated ? (
              <div className="relative" ref={menuRef}>
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#cc8b45]/10 border border-[#cc8b45]/30 text-[#cc8b45] text-sm font-medium hover:bg-[#cc8b45]/20 transition-colors"
                >
                  <UserCircle2 className="w-4 h-4" /> 
                  <span className="max-w-[120px] truncate">{user?.email?.address || user?.google?.email || "Account"}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 bg-background/80 backdrop-blur-xl border border-border/50 rounded-xl shadow-2xl overflow-hidden py-2"
                    >
                      <Link href="/dashboard" onClick={() => setShowUserMenu(false)}>
                        <div className="flex items-center gap-3 px-4 py-2.5 hover:bg-foreground/5 text-sm transition-colors cursor-pointer text-foreground/80 hover:text-foreground">
                          <LayoutDashboard className="w-4 h-4" /> Go to Dashboard
                        </div>
                      </Link>
                      <Link href="/settings" onClick={() => setShowUserMenu(false)}>
                        <div className="flex items-center gap-3 px-4 py-2.5 hover:bg-foreground/5 text-sm transition-colors cursor-pointer text-foreground/80 hover:text-foreground">
                          <Settings className="w-4 h-4" /> Settings Profile
                        </div>
                      </Link>
                      <div className="h-px w-full bg-border/50 my-1"></div>
                      <button 
                        onClick={() => {
                          setShowUserMenu(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-500/10 hover:text-red-400 text-sm transition-colors cursor-pointer text-foreground/80"
                      >
                        <LogOut className="w-4 h-4" /> Log Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button 
                onClick={login}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
              >
                <LogIn className="w-4 h-4" /> Log In
              </button>
            )
          )}
          <ThemeToggle />
        </div>
      </header>

      {/* Main Split Layout */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center relative z-10">
        
        {/* LEFT COLUMN: Copy & CTA */}
        <div className="flex flex-col items-start space-y-8 max-w-xl relative z-20">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-border bg-foreground/5 backdrop-blur-md mb-6 shadow-sm transition-colors duration-700 ease-in-out mt-12 md:mt-0">
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

          <div className="pt-6 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button 
              onClick={handleStartReview}
              className="w-full sm:w-auto px-8 py-4 bg-[#cc8b45] hover:bg-[#b57a3c] text-black font-sans font-bold text-xs tracking-wider uppercase transition-all rounded-md shadow-lg flex items-center justify-center gap-2"
            >
              {mounted && authenticated ? 'Go to Dashboard' : 'Log In / Sign Up'} <span className="text-lg leading-none">&rarr;</span>
            </button>
            
            <button 
              onClick={() => setShowHelpModal(true)}
              className="w-full sm:w-auto px-8 py-4 bg-foreground/5 border border-border hover:bg-foreground/10 text-foreground font-sans font-bold text-xs tracking-wider uppercase transition-all rounded-md shadow-sm"
            >
              How it Works
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Orb & Agents */}
        <div className="relative w-full aspect-square max-w-[600px] mx-auto lg:ml-auto flex items-center justify-center mt-12 lg:mt-0">
          
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
                    src={currentTheme === "light" ? "/light_orb_scaled.png" : "/dark_orb_perfect_match.png"} 
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
            <div className="flex justify-between w-full md:w-[110%] md:-ml-[5%] gap-3 md:gap-4 px-2 md:px-4 translate-y-[-20px] md:translate-y-[-40px]">
              {/* LEGAL (Index 0) */}
              <div className={`flex-1 bg-background/60 backdrop-blur-xl border rounded-xl p-3 md:p-5 shadow-2xl transition-all duration-500 hover:scale-105 ${isCardActive(0) ? "border-[#cc8b45] shadow-[0_0_30px_rgba(204,139,69,0.3)] bg-background/80 scale-105" : "border-border/50 scale-100"}`}>
                <h3 className="font-sans text-sm md:text-lg text-foreground mb-1">Legal</h3>
                <p className="text-[8px] md:text-[10px] font-mono uppercase tracking-widest text-foreground/40">Risk Mitigation</p>
              </div>
              {/* FINANCE (Index 1) */}
              <div className={`flex-1 bg-background/60 backdrop-blur-xl border rounded-xl p-3 md:p-5 shadow-2xl flex flex-col items-start relative transition-all duration-500 hover:scale-105 ${isCardActive(1) ? "border-[#cc8b45] shadow-[0_0_30px_rgba(204,139,69,0.3)] bg-background/80 scale-105" : "border-border/50 scale-100"}`}>
                <div className={`absolute top-4 md:top-6 right-4 md:right-5 w-1.5 h-1.5 rounded-full ${isCardActive(1) ? "bg-[#cc8b45] animate-pulse" : "bg-foreground/20"}`}></div>
                <h3 className="font-sans text-sm md:text-lg text-foreground mb-1">Finance</h3>
                <p className="text-[8px] md:text-[10px] font-mono uppercase tracking-widest text-foreground/40">Margin Analysis</p>
              </div>
            </div>

            {/* Middle Row */}
            <div className="flex justify-between w-full md:w-[120%] md:-ml-[10%] gap-3 md:gap-4 px-2 md:px-4 z-20">
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

      <HowItWorksModal isOpen={showHelpModal} onClose={() => setShowHelpModal(false)} />
    </main>
  );
}
