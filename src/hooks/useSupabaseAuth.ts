import { useState, useEffect, useCallback } from "react";
import type { User } from "@supabase/supabase-js";
import {
  getSupabaseSessionUser,
  signOutSupabase,
  subscribeSupabaseAuth,
} from "@/lib/authUtils";

export function useSupabaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getSupabaseSessionUser().then((nextUser) => {
      if (!cancelled) {
        setUser(nextUser);
        setAuthReady(true);
      }
    });
    const { unsubscribe } = subscribeSupabaseAuth((nextUser) => {
      if (!cancelled) setUser(nextUser);
    });
    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  const signOut = useCallback(() => signOutSupabase(), []);

  return { user, authReady, signOut };
}
