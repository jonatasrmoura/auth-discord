"use client";
import { usePathname, useRouter } from "next/navigation";
import { ButtonHTMLAttributes } from "react";
import { BsArrowLeft } from "react-icons/bs";

type BackButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

function urlContainsPath(url: string, path: string): boolean {
  return url.includes(path);
}

export function BackButton({ ...rest }: BackButtonProps) {
  const router = useRouter();
  const pathName = usePathname();
  const url = "admin/dashboard";

  function goBack() {
    router.back();
  }

  return (
    <button
      className={`${
        urlContainsPath(pathName, url) ? "hidden" : "flex"
      } bg-transparent border-0 transition-opacity hover:opacity-60`}
      onClick={goBack}
      {...rest}
    >
      <BsArrowLeft className="text-white" size={28} />
    </button>
  );
}
