"use client";

import { useState } from "react";

export default function BotaoCopiarLink() {
  const [copiado, setCopiado] = useState(false);

  async function copiarLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopiado(true);
  }

  return (
    <button
      className="botao botaoSecundario"
      type="button"
      onClick={copiarLink}
    >
      {copiado ? "✓ Link copiado" : "Copiar link"}
    </button>
  );
}
