"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Scale, Shield, Settings, FileText, Upload, LogOut } from "lucide-react";
import { Logo } from "@/components/logo";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { useAuth } from "@/components/auth/AuthContext";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Overview" },
  { href: "/verdicts", icon: Shield, label: "Verdicts" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <AuthGuard>
      <div className="flex h-screen bg-background text-foreground transition-colors duration-500 font-sans overflow-hidden">
        
        {/* Sleek, cinematic sidebar using glassmorphism */}
        <aside className="w-64 border-r border-border/50 bg-background/60 backdrop-blur-3xl flex flex-col items-start pt-8 pb-6 shadow-[10px_0_30px_-15px_rgba(0,0,0,0.5)] z-20 shrink-0">
          <Link href="/" className="px-8 flex items-center gap-3 mb-12 group">
            <Logo className="w-8 h-8 group-hover:scale-105 transition-transform" />
            <span className="font-serif text-xl tracking-tight text-foreground/90">Cordane.</span>
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
                      ? "bg-[#cc8b45]/10 text-[#cc8b45] shadow-[inset_0_1px_1px_rgba(204,139,69,0.1)] border border-[#cc8b45]/20" 
                      : "text-foreground/50 hover:text-foreground/80 hover:bg-foreground/5"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Workspace info and CTA */}
          <div className="mt-auto px-4 w-full flex flex-col gap-4">
            <Link href="/upload" className="w-full">
              <button className="w-full py-3 bg-[#cc8b45] text-black text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-[#b57a3c] transition-colors shadow-[0_0_20px_rgba(204,139,69,0.3)] hover:shadow-[0_0_30px_rgba(204,139,69,0.5)]">
                + New Review
              </button>
            </Link>
            
            <div className="p-4 rounded-xl bg-background/40 border border-border/50 flex flex-col gap-3 mx-2">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono text-foreground/40 uppercase tracking-wider">Workspace</span>
                  <span className="text-sm font-medium text-foreground/90">Acme Corp</span>
                </div>
                <ThemeToggle />
              </div>
              <div className="h-px w-full bg-border/50 my-1"></div>
              <button onClick={logout} className="flex items-center gap-2 text-xs font-medium text-foreground/50 hover:text-red-400 transition-colors py-1">
                <LogOut className="w-3.5 h-3.5" /> Log Out
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 h-screen overflow-y-auto relative z-10">
          {/* Subtle background glow */}
          <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-[#cc8b45]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
          {children}
        </main>
        
      </div>
    </AuthGuard>
  );
}
