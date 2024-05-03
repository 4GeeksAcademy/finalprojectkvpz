// src/components/SignOut.jsx
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export default function SignOut() {
  const supabase = useSupabaseClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div>
      <button type="button" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
}
