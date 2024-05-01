"use server";
import { cookies } from "next/headers";
import { type MemberGuild } from "@/lib/get-guild-member-by-user-id.discord";

export async function createMemberGuildDataCookie(data: MemberGuild): Promise<void> {
  cookies().set("member-guild-data.discord", JSON.stringify(data));
}
