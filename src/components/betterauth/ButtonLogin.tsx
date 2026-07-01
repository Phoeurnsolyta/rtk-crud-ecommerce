"use client";

import { authClient } from "@/lib/auth-client";

export default function ButtonLogin() {
  const handleSignInWithGoogle = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
    console.log(data);
  };

  return (
    <div>
      <button onClick={handleSignInWithGoogle} className="border p-5">
         signup with google
      </button>
    </div>
  );
}
