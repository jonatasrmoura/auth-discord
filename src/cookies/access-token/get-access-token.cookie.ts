"use server";
import { cookies } from "next/headers";

export async function getAccessTokenCookie(): Promise<string | undefined> {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access-token.discord")?.value;
  return accessToken;
}
