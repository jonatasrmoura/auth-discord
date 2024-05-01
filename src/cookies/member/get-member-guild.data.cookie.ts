"use server";
import { cookies } from "next/headers";

export async function getMemberGuildDataCookie(): Promise<string | undefined> {
  const cookieStore = cookies();
  const memberGuildData = cookieStore.get("member-guild-data.discord")?.value;
  return memberGuildData;
}
