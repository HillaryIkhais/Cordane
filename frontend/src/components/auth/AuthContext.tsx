"use client";

import { PrivyProvider, usePrivy } from "@privy-io/react-auth";
import { createContext, useContext, ReactNode } from "react";

const UniversalAuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const rawAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID || "";
  const appId = rawAppId.replace(/['"]/g, '').trim();

  if (!appId || appId === "clp0w8x53b05z613xckzmsz85" || appId.length < 15) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-white/50 space-y-4">
        <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        </div>
        <p className="text-sm font-medium text-white/90">Privy Authentication Error</p>
        <p className="text-xs text-white/50 max-w-sm text-center">
          The application requires a valid Privy App ID to boot. Please provide your Privy App ID in the chat so it can be added to the environment variables.
        </p>
      </div>
    );
  }

  return (
    <PrivyProvider
      appId={appId}
      clientId={process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID}
      config={{
        loginMethods: ["google", "email"],
        appearance: {
          theme: "dark",
          accentColor: "#cc8b45",
        },
      }}
    >
      <PrivyAuthWrapper>{children}</PrivyAuthWrapper>
    </PrivyProvider>
  );
}

function PrivyAuthWrapper({ children }: { children: ReactNode }) {
  const privy = usePrivy();

  const handleLogout = async () => {
    pendo.track("user_logged_out", {
      logoutSource: "user_action",
    });
    pendo.clearSession();
    await privy.logout();
  };

  return (
    <UniversalAuthContext.Provider
      value={{
        ready: privy.ready,
        authenticated: privy.authenticated,
        user: privy.user,
        login: privy.login,
        logout: handleLogout,
      }}
    >
      {children}
    </UniversalAuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(UniversalAuthContext);
}
