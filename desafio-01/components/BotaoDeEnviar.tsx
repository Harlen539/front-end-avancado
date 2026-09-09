"use client";

import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export default function BotaoDeEnviar({ children, esperando = "Enviando…", secundario = false }: {
  children: ReactNode;
  esperando?: string;
  secundario?: boolean;
}) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={`botao ${secundario ? "botaoSecundario" : "botaoPrimario"}`} disabled={pending} aria-disabled={pending}>
      {pending ? esperando : children}
    </button>
  );
}
