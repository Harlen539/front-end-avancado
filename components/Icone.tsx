type IconeProps = {
  nome:
    | "busca"
    | "local"
    | "pasta"
    | "nivel"
    | "check"
    | "livro"
    | "pessoas"
    | "alvo"
    | "raio"
    | "vaga"
    | "seta"
    | "relogio"
    | "predio";
  tamanho?: number;
};

export default function Icone({ nome, tamanho = 22 }: IconeProps) {
  const props = {
    width: tamanho,
    height: tamanho,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  const desenhos = {
    busca: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    local: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    pasta: (
      <>
        <path d="M3 7.5h7l2 2h9v9.5H3z" />
        <path d="M3 7.5V5h7l2 2.5" />
      </>
    ),
    nivel: (
      <>
        <path d="M5 20v-6M12 20V9M19 20V4" />
        <path d="M3 20h18" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    livro: (
      <>
        <path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v17H7.5A3.5 3.5 0 0 0 4 22Z" />
        <path d="M20 5.5A3.5 3.5 0 0 0 16.5 2H13v17h3.5A3.5 3.5 0 0 1 20 22Z" />
      </>
    ),
    pessoas: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20c0-4 2.7-7 6-7s6 3 6 7" />
        <path d="M16 4.5a3 3 0 0 1 0 6M17 13c2.5.6 4 3.2 4 6" />
      </>
    ),
    alvo: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
        <path d="m14 10 6-6M16 4h4v4" />
      </>
    ),
    raio: <path d="m13 2-8 12h7l-1 8 8-12h-7z" />,
    vaga: (
      <>
        <rect x="3" y="6" width="18" height="14" rx="2" />
        <path d="M9 6V4h6v2M3 11h18M9 11v2h6v-2" />
      </>
    ),
    seta: (
      <>
        <path d="M5 12h14" />
        <path d="m14 7 5 5-5 5" />
      </>
    ),
    relogio: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    predio: (
      <>
        <path d="M4 21V5l8-3v19M12 8h8v13M2 21h20" />
        <path d="M8 7v1M8 12v1M8 17v1M16 12v1M16 17v1" />
      </>
    ),
  };

  return <svg {...props}>{desenhos[nome]}</svg>;
}
