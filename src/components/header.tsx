import { DiscordButton } from "./discord-button";
import { BackButton } from "./back-button";
import { getSessionDiscord } from "@/lib/get-session.discord";

export async function Header() {
  const session = await getSessionDiscord();

  if (!session) {
    return (
      <header className="w-full flex justify-between items-center border-b-2 border-b-white rounded-b-md p-5">
        <h1>Membro da guilda não encontrado!</h1>
        <DiscordButton userName="Fazer signOut" />
      </header>
    );
  }

  return (
    <header className="w-full flex justify-between items-center border-b-2 border-b-white rounded-b-md p-5">
      <BackButton />
      <h1>Welcome to application</h1>
      <DiscordButton userName={session.user?.name!} />
    </header>
  );
}
