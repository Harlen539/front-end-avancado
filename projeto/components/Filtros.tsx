type FiltrosProps = {
  busca: string;
  aoMudarBusca: (valor: string) => void;
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

export default function Filtros(props: FiltrosProps) {
  return (
    <div className="filtros" role="search">
      <label>
        Buscar
        <input
          type="search"
          value={props.busca}
          onChange={(e) => props.aoMudarBusca(e.target.value)}
          placeholder="Título, empresa ou local"
        />
      </label>

      <label>
        Área
        <select value={props.area} onChange={(e) => props.aoMudarArea(e.target.value)}>
          {props.areas.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </label>

      <label>
        Senioridade
        <select
          value={props.senioridade}
          onChange={(e) => props.aoMudarSenioridade(e.target.value)}
        >
          {props.senioridades.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </label>

      <label>
        <input
          type="checkbox"
          checked={props.soIniciantes}
          onChange={(e) => props.aoMudarSoIniciantes(e.target.checked)}
        />
        Aceita iniciante
      </label>

      {props.temFiltroAtivo && (
        <button type="button" onClick={props.aoLimpar}>Limpar filtros</button>
      )}
    </div>
  );
}
