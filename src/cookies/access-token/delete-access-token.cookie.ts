"use server";
import { cookies } from "next/headers";

export async function deleteAccessTokenCookie(): Promise<void> {
  const cookieStore = cookies();
  const hasCookie = cookieStore.has("access-token.discord");
  if (hasCookie) {
    cookies().delete("access-token.discord");
  }
}
