import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";

export const { signIn, signUp, useSession, signOut } = createAuthClient({
  plugins: [emailOTPClient()],
});
