import { Account, CallbacksOptions, Profile } from "next-auth";
import NextAuth from "next-auth/next";
import DiscordProvider from "next-auth/providers/discord";

import { createAccessTokenCookie } from "@/cookies/access-token/create-access-token.cookie";

const scopes = [
  "identify",
  "email",
  "guilds",
  "guilds.join",
  "guilds.members.read",
].join(" ");

const callbacks: Partial<CallbacksOptions<Profile, Account>> | undefined = {
  // Permitir a autenticação do usuário
  async signIn({ account }) {
    if (account && account.provider === "discord" && account.access_token) {
      await createAccessTokenCookie(account.access_token);
      return true;
    }
    return false;
  },
};

const handler = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: { params: { scope: scopes } },
    }),
  ],
  callbacks: callbacks,
  pages: {
    error: "/feedback/error",
  },
});

export { handler as GET, handler as POST };
