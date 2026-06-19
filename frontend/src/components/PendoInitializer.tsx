"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/components/auth/AuthContext";

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
    }
  }, [ready, authenticated, user]);

  return null;
}
