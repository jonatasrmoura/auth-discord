import Image from "next/image";
import Link from "next/link";

import { getUserGuilds } from "@/lib/get-user-guilds.discord";

export default async function Dashboard() {
  const guilds = await getUserGuilds();

  function redirectMemberProfile(memberId: string): string {
    return `/admin/member-profile/${memberId}`;
  }

  return (
    <main className="flex flex-col gap-4">
      <div className="mt-8">
        <ol className="grid grid-cols-1 px-5 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
          {guilds.length > 0 ? (
            guilds.map((guild) => (
              <li key={guild.id}>
                <Link href={redirectMemberProfile(guild.id)}>
                  <div className="flex items-center gap-2">
                    <div className="col-span-1 border-2 animate-pulse rounded-full p-1">
                      <Image
                        className="w-24 h-24 rounded-full"
                        src={guild.icon!}
                        alt={guild.name}
                        height={500}
                        width={500}
                      />
                    </div>
                    <div className="col-span-1">
                      <strong>{guild.name}</strong>
                      <p>features: {guild.features.length}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <></>
          )}
        </ol>
      </div>
    </main>
  );
}
