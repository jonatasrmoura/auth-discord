import Image from "next/image";
import { redirect } from "next/navigation";

import { getGuildMemberByUserId } from "@/lib/get-guild-member-by-user-id.discord";

type MemberProfileParams = {
  params: {
    guildId: string;
  };
};

export default async function MemberProfilePage({
  params,
}: MemberProfileParams) {
  const member = await getGuildMemberByUserId(params.guildId);

  if (!member) {
    return redirect("/admin/dashboard");
  }

  return (
    <main className="h-full w-full">
      <div className="flex items-center gap-2">
        <div className="col-span-1 border-2 animate-pulse rounded-full p-1">
          <Image
            className="w-32 h-32 rounded-full"
            src={member?.avatar || member.user?.avatar!}
            alt={member?.nickname || member.user?.globalName!}
            height={500}
            width={500}
          />
        </div>
        <div className="col-span-1">
          <strong>{member?.nickname || member.user?.globalName!}</strong>
          <p>Email: {"EMAIL"}</p>
        </div>
      </div>
    </main>
  );
}
