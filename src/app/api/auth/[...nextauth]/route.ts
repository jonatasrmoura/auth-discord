import { Account, CallbacksOptions, Profile } from "next-auth";
import NextAuth from "next-auth/next";
import DiscordProvider from "next-auth/providers/discord";

import { createAccessTokenCookie } from "@/cookies/access-token/create-access-token.cookie";
// import { createMemberGuildDataCookie } from "@/cookies/member/create-member-guild-data.cookie";
// import { getGuildMemberByUserId } from "@/lib/get-guild-member-by-user-id.discord";
// import { getGuildIdByUrl } from "@/utils/get-guild-id-by-url";

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
  async redirect({ url, baseUrl }) {
    // const search: string = "/admin/member-profile/";

    console.log("redirect url", url);
    console.log("redirect baseUrl", baseUrl);

    // if (url.includes(search)) {
    //   const guildId = getGuildIdByUrl(url);
    //   const member = await getGuildMemberByUserId(guildId);
    //   if (member) {
    //     await createMemberGuildDataCookie(member);
    //   }
    // }
    return url;
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
