import { getAccessTokenCookie } from "@/cookies/access-token/get-access-token.cookie";
import { getImageUrlGuild } from "@/utils/get-image-url-guild";

type GuildsUser = {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: number;
  permissions_new: string;
  features: string[];
};

export async function getUserGuilds(): Promise<GuildsUser[]> {
  try {
    const accessToken = await getAccessTokenCookie();

    if (!accessToken) {
      return [];
    }

    const response = await fetch("https://discord.com/api/users/@me/guilds", {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Erro ao obter as guildas do usuário");
    }
    const guilds = (await response.json()) as GuildsUser[];
    return <GuildsUser[]>guilds.map(
      (guild) =>
        <GuildsUser>{
          id: guild.id,
          name: guild.name,
          icon: getImageUrlGuild(guild.id, guild.icon),
          owner: guild.owner,
          permissions: guild.permissions,
          permissions_new: guild.permissions_new,
          features: guild.features,
        }
    );
  } catch (error) {
    console.error(error);
    return [];
  }
}
