import { supabase } from "@/integrations/supabase/client";
import type { EmailOtpType } from "@supabase/supabase-js";

const SESSION_CHECK_DELAY_MS = 500;

export function getHashParams(): URLSearchParams | null {
  const hash = globalThis.location.hash?.slice(1);
  return hash ? new URLSearchParams(hash) : null;
}

export function clearAuthTokensFromUrl(): void {
  globalThis.history.replaceState(
    null,
    "",
    globalThis.location.pathname + globalThis.location.search
  );
}

export async function verifyPkceFlow(
  token_hash: string,
  type: EmailOtpType
): Promise<{ success: boolean; errorMessage?: string }> {
  const { error } = await supabase.auth.verifyOtp({ token_hash, type });
  if (error) return { success: false, errorMessage: error.message };
  return { success: true };
}

export async function verifyImplicitFlow(): Promise<boolean> {
  const checkSession = async () => {
    const { data } = await supabase.auth.getSession();
    return !!data.session;
  };

  if (await checkSession()) return true;
  await new Promise((r) => setTimeout(r, SESSION_CHECK_DELAY_MS));
  return checkSession();
}

export type VerifyEmailResult = {
  success: boolean;
  errorMessage?: string;
};


export async function handleEmailVerification(
  token_hash: string | null,
  type: EmailOtpType | null
): Promise<VerifyEmailResult> {
  const hashParams = getHashParams();
  const hasImplicitFlow = hashParams?.get("access_token");

  if (token_hash && type) {
    const result = await verifyPkceFlow(token_hash, type);
    if (result.success) return { success: true };
    return {
      success: false,
      errorMessage:
        result.errorMessage ??
        "There was a problem verifying your email. The link may have expired or is invalid.",
    };
  }

  if (hasImplicitFlow) {
    const sessionFound = await verifyImplicitFlow();
    if (sessionFound) {
      clearAuthTokensFromUrl();
      return { success: true };
    }
    return {
      success: false,
      errorMessage:
        "There was a problem verifying your email. The link may have expired or is invalid.",
    };
  }

  return { success: false, errorMessage: "Invalid verification link. No token provided." };
}

export function signInWithGoogle() {
  return supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${globalThis.location.origin}/auth/callback`,
    },
  });
}
