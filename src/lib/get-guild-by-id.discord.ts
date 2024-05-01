import { getAccessTokenCookie } from "@/cookies/access-token/get-access-token.cookie";

// ARRUMAR ESSA FUNÇÃO, ERRO DE Unauthorized
export async function getGuildById(guildId: string): Promise<any | null> {
  try {
    const accessToken = await getAccessTokenCookie();

    if (!accessToken) {
      return null;
    }

    const response = await fetch(
      `https://discord.com/api/v10/guilds/${guildId}?with_counts=${true}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      console.error(
        "Erro ao obter informações da guilda " + response.statusText
      );
      return null;
    }

    const guild = await response.json();
    return guild;
  } catch (error) {
    console.error("Erro ao obter informações da guilda:", error);
    return null;
  }
}
