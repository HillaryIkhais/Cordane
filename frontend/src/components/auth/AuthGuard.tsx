"use client";

import { useAuth } from "./AuthContext";
import { useEffect } from "react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { ready, authenticated, login } = useAuth();

  useEffect(() => {
    if (ready && !authenticated) {
      login();
    }
  }, [ready, authenticated, login]);

  if (!ready) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background">
        <div className="w-8 h-8 rounded-full border-2 border-[#e07a5f] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-white/50 space-y-4">
        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
        </div>
        <p className="text-sm font-medium">Please authenticate to access the application.</p>
        <button 
          onClick={login}
          className="mt-4 px-6 py-2 bg-[#e07a5f] text-white rounded-lg font-bold uppercase tracking-wide text-xs shadow-[0_0_15px_-5px_rgba(224,122,95,0.5)]"
        >
          Open Login
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
