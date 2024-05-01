"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { BsDiscord } from "react-icons/bs";

import { signOutDiscord } from "@/lib/sign-out.discord";
import { getUserName } from "@/utils/get-user-name";

type DiscordButtonProps = {
  userName?: string;
};

export function DiscordButton({ userName }: DiscordButtonProps) {
  const [loading, setLoading] = useState<boolean>(false);

  async function signInDiscordLoading() {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await signIn("discord");
  }

  async function signOutDiscordLoading() {
    setLoading(true);
    await signOutDiscord();
  }

  return (
    <>
      {!userName ? (
        <button
          className="flex gap-4 md:w-64 justify-between items-center bg-indigo-400 border border-white py-3 px-4 rounded-lg text-lg font-semibold"
          onClick={async () => await signInDiscordLoading()}
        >
          <BsDiscord
            size={32}
            className={`${loading && "animate-spin w-full transition-all"}`}
          />
          {!loading && <span>Login com Discord</span>}
        </button>
      ) : (
        <button
          className="flex gap-4 md:w-40 justify-between items-center bg-green-500 border border-white py-3 px-4 rounded-lg text-lg font-semibold"
          onClick={async () => await signOutDiscordLoading()}
          title="signOut"
        >
          <BsDiscord
            size={32}
            className={`${loading && "animate-spin w-full transition-all"}`}
          />
          {!loading && <span>{getUserName(userName)}</span>}
        </button>
      )}
    </>
  );
}
