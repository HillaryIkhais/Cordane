"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Scale, Shield, Settings, FileText, Upload } from "lucide-react";
import { Logo } from "@/components/logo";
import { AuthGuard } from "@/components/auth/AuthGuard";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Overview" },
  { href: "/room", icon: Scale, label: "The Room" },
  { href: "/upload", icon: Upload, label: "Upload Contract" },
  { href: "/verdicts", icon: Shield, label: "Verdicts" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-background text-foreground transition-colors duration-500 font-sans overflow-hidden">
      
      {/* Sleek, cinematic sidebar using glassmorphism */}
      <aside className="w-64 border-r border-white/5 bg-white/[0.02] backdrop-blur-3xl flex flex-col items-start pt-8 pb-6 shadow-[10px_0_30px_-15px_rgba(0,0,0,0.5)] z-20 shrink-0">
        <Link href="/dashboard" className="px-8 flex items-center gap-3 mb-12 group">
          <Logo className="w-8 h-8 group-hover:scale-105 transition-transform" />
          <span className="font-serif text-xl tracking-tight text-white/90">Cordane.</span>
        </Link>
        
        <nav className="flex-1 w-full flex flex-col gap-1 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive 
                    ? "bg-[#e07a5f]/10 text-[#e07a5f] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" 
                    : "text-white/50 hover:text-white/80 hover:bg-white/5"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Workspace info */}
        <div className="mt-auto px-8 w-full">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1">
            <span className="text-xs font-mono text-white/40 uppercase tracking-wider">Workspace</span>
            <span className="text-sm font-medium text-white/90">Acme Corp</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto relative z-10">
        {/* Subtle background glow */}
        <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-[#e07a5f]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        {children}
      </main>
      
    </div>
    </AuthGuard>
  );
}
