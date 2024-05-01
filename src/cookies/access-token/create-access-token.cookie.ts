"use server";
import { cookies } from "next/headers";

export async function createAccessTokenCookie(
  accessToken: string
): Promise<void> {
  cookies().set("access-token.discord", accessToken);
}
