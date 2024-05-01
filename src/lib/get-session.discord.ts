import { getServerSession } from "next-auth";

type UserAuth = {
  name: string;
  email: string;
  image?: string;
};
type SessionDiscord = {
  user: UserAuth;
  expires?: string;
};

export async function getSessionDiscord(): Promise<SessionDiscord | null> {
  try {
    const session = await getServerSession();
    session?.expires;

    if (!session?.user && !session) return null;

    return <SessionDiscord>{
      user: <UserAuth>{
        name: session.user?.name!,
        email: session.user?.email!,
        image: session.user?.image,
      },
      expires: session.expires,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
