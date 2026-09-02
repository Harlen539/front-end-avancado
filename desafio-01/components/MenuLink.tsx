"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type MenuLinkProps = {
  href: string;
  children: ReactNode;
};

export default function MenuLink({ href, children }: MenuLinkProps) {
  const caminho = usePathname();
  const ativo = href === "/" ? caminho === href : caminho.startsWith(href);

  return (
    <Link
      className={ativo ? "ativo" : undefined}
      href={href}
      aria-current={ativo ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
