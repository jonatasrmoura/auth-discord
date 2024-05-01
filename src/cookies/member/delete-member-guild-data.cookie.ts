"use server";
import { cookies } from "next/headers";

export async function deleteMemberGuildDataCookie(): Promise<void> {
  const cookieStore = cookies();
  const hasCookie = cookieStore.has("member-guild-data.discord");
  if (hasCookie) {
    cookies().delete("member-guild-data.discord");
  }
}
