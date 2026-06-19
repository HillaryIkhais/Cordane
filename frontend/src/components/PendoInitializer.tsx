"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/components/auth/AuthContext";

// Module-level flag to deduplicate auth tracking across remounts.
// Resets when user becomes unauthenticated (logout).
let lastAuthState = false;

export function PendoInitializer() {
  const { ready, authenticated, user } = useAuth();
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current) {
      pendo.initialize({
        visitor: { id: '' }
      });
      initializedRef.current = true;
    }
  }, []);

  useEffect(() => {
    if (ready && authenticated && user) {
      const email = user.email?.address || user.google?.email || '';
      const loginMethod = user.google ? 'Google OAuth' : 'Email Login';

      pendo.identify({
        visitor: {
          id: user.id,
          email: email,
          loginMethod: loginMethod,
        }
      });

      if (!lastAuthState) {
        lastAuthState = true;
        pendo.track("user_authenticated", {
          loginMethod: loginMethod,
          email: email,
        });
      }
    } else if (ready && !authenticated) {
      lastAuthState = false;
    }
  }, [ready, authenticated, user]);

  return null;
}
