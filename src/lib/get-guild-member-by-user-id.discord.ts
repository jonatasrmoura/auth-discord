"use server";
import { getAccessTokenCookie } from "@/cookies/access-token/get-access-token.cookie";
import { getMemberAvatarUrl } from "@/utils/get-member-avatar-url";
import { getUserAvatarUrl } from "@/utils/get-user-avatar-url";

type UserGuildResponse = {
  id: string;
  username: string;
  avatar: string | null;
  discriminator: string;
  public_flags: number;
  flags: number;
  banner: any | null;
  accent_color: number;
  global_name: string;
  avatar_decoration_data: string | null;
  banner_color: string;
  clan: any | null;
};
export type MemberGuildResponse = {
  avatar: string | null;
  communication_disabled_until: any | null;
  flags: number;
  joined_at: Date;
  nick: string | null;
  pending: boolean;
  premium_since: any | null;
  roles: string[];
  unusual_dm_activity_until: any | null;
  user: UserGuildResponse;
  bio: string;
  banner: any | null;
};
type UserGuild = Omit<
  UserGuildResponse,
  | "public_flags"
  | "accent_color"
  | "global_name"
  | "avatar_decoration_data"
  | "banner_color"
> & {
  publicFlags: number;
  accentColor: number;
  globalName: string;
  avatarDecorationData: string | null;
  bannerColor: string;
};
export type MemberGuild = Omit<
  MemberGuildResponse,
  | "communication_disabled_until"
  | "joined_at"
  | "nick"
  | "premium_since"
  | "unusual_dm_activity_until"
  | "user"
> & {
  communicationDisabledUntil: any | null;
  joinedAt: Date;
  nickname: string | null;
  premiumSince: any | null;
  unusualDmActivityUntil: any | null;
  user: UserGuild;
};

export async function getGuildMemberByUserId(
  guildId: string
): Promise<MemberGuild | null> {
  try {
    const accessToken = await getAccessTokenCookie();

    if (!accessToken) {
      return null;
    }

    const response = await fetch(
      `https://discord.com/api/users/@me/guilds/${guildId}/member`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Erro ao obter informações do membro da guilda");
      return null;
    }

    const guildMember = (await response.json()) as MemberGuildResponse;

    return <MemberGuild>{
      avatar: guildMember.avatar
        ? getMemberAvatarUrl(guildId, guildMember.user.id, guildMember.avatar)
        : null,
      communicationDisabledUntil: guildMember.communication_disabled_until,
      flags: guildMember.flags,
      joinedAt: guildMember.joined_at,
      nickname: guildMember.nick,
      pending: guildMember.pending,
      premiumSince: guildMember.premium_since,
      roles: guildMember.roles,
      unusualDmActivityUntil: guildMember.unusual_dm_activity_until,
      bio: guildMember.bio,
      banner: guildMember.banner,
      user: <UserGuild>{
        id: guildMember.user.id,
        username: guildMember.user.username,
        avatar: getUserAvatarUrl(guildMember.user.id, guildMember.user.avatar),
        discriminator: guildMember.user.discriminator,
        publicFlags: guildMember.user.public_flags,
        flags: guildMember.user.flags,
        banner: guildMember.user.banner,
        accentColor: guildMember.user.accent_color,
        globalName: guildMember.user.global_name,
        avatarDecorationData: guildMember.user.avatar_decoration_data,
        bannerColor: guildMember.user.banner_color,
        clan: guildMember.user.clan,
      },
    };
  } catch (error) {
    console.error("Erro ao obter informações do membro da guilda:", error);
    return null;
  }
}
