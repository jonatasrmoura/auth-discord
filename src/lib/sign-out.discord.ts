import { signOut } from "next-auth/react";
import { deleteAccessTokenCookie } from "@/cookies/access-token/delete-access-token.cookie";
import { deleteMemberGuildDataCookie } from "@/cookies/member/delete-member-guild-data.cookie";

export async function signOutDiscord(): Promise<void> {
  await deleteAccessTokenCookie();
  await deleteMemberGuildDataCookie();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await signOut();
}
