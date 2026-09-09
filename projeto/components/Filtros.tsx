type FiltrosProps = {
  busca: string;
  aoMudarBusca: (valor: string) => void;
  area: string;
  aoMudarArea: (valor: string) => void;
  areas: string[];
};

export default function Filtros({
  busca,
  aoMudarBusca,
  area,
  aoMudarArea,
  areas,
}: FiltrosProps) {
  return (
    <div className="filtros">
      <label htmlFor="busca-vaga">Busque por vaga, empresa ou local</label>
      <input
        id="busca-vaga"
        type="search"
        value={busca}
        onChange={(evento) => aoMudarBusca(evento.target.value)}
        placeholder="Ex.: Front-end remoto"
      />

      <div className="filtroAreas" aria-label="Filtrar por área">
        {areas.map((opcao) => (
          <button
            key={opcao}
            className={area === opcao ? "ativo" : undefined}
            type="button"
            aria-pressed={area === opcao}
            onClick={() => aoMudarArea(opcao)}
          >
            {opcao}
          </button>
        ))}
      </div>
    </div>
  );
}
