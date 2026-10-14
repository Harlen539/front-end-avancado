"use client";

import { useEffect, useState } from "react";

type FiltrosProps = {
  busca: string;
  chaveDaBusca: string;
  aoBuscar: (valor: string) => void;
  area: string;
  aoMudarArea: (valor: string) => void;
  areas: string[];
  senioridade: string;
  aoMudarSenioridade: (valor: string) => void;
  senioridades: string[];
  soIniciantes: boolean;
  aoMudarSoIniciantes: (valor: boolean) => void;
  temFiltroAtivo: boolean;
  aoLimpar: () => void;
};

function CampoDeBusca({
  valorInicial,
  aoBuscar,
}: {
  valorInicial: string;
  aoBuscar: (valor: string) => void;
}) {
  const [texto, setTexto] = useState(valorInicial);

  useEffect(() => {
    if (texto.trim() === valorInicial.trim()) return;
    const id = setTimeout(() => aoBuscar(texto), 300);
    return () => clearTimeout(id);
  }, [texto, valorInicial, aoBuscar]);

  return (
    <label>
      Buscar
      <input
        className="mt-2 min-h-[54px] w-full rounded-xl border border-[var(--borda)] bg-[var(--fundo)] px-4 text-[var(--texto)] focus:border-[var(--texto)] focus:bg-white focus:outline-none"
        type="search"
        value={texto}
        onChange={(evento) => setTexto(evento.target.value)}
        placeholder="Título, empresa ou local"
      />
    </label>
  );
}

export default function Filtros(props: FiltrosProps) {
  return (
    <div className="filtros grid gap-4 md:grid-cols-2 lg:grid-cols-4" role="search">
      <CampoDeBusca
        key={props.chaveDaBusca}
        valorInicial={props.busca}
        aoBuscar={props.aoBuscar}
      />

      <label>
        Área
        <select
          className="mt-2 min-h-[54px] w-full rounded-xl border border-[var(--borda)] bg-[var(--fundo)] px-4 text-[var(--texto)] focus:border-[var(--texto)] focus:bg-white focus:outline-none"
          value={props.area}
          onChange={(evento) => props.aoMudarArea(evento.target.value)}
        >
          {props.areas.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </label>

      <label>
        Senioridade
        <select
          className="mt-2 min-h-[54px] w-full rounded-xl border border-[var(--borda)] bg-[var(--fundo)] px-4 text-[var(--texto)] focus:border-[var(--texto)] focus:bg-white focus:outline-none"
          value={props.senioridade}
          onChange={(evento) => props.aoMudarSenioridade(evento.target.value)}
        >
          {props.senioridades.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      <label>
        <input
          className="mr-2 size-4 accent-[var(--texto)]"
          type="checkbox"
          checked={props.soIniciantes}
          onChange={(evento) => props.aoMudarSoIniciantes(evento.target.checked)}
        />
        Aceita iniciante
      </label>

      {props.temFiltroAtivo && (
        <button type="button" onClick={props.aoLimpar}>
          Limpar filtros
        </button>
      )}
    </div>
  );
}
