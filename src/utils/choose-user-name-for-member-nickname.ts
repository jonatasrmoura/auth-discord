import { getSessionDiscord } from "@/lib/get-session.discord";

export async function chooseUserNameForMemberNickname(
  nickname: string | null
): Promise<void> {
  try {
    const session = await getSessionDiscord();

    if (nickname) {
      session!.user!.name! = nickname;
    }
  } catch (error) {
    console.error(error);
  }
}
