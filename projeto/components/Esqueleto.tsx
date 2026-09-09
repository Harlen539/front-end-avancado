type EsqueletoProps = {
  completo?: boolean;
};

export default function Esqueleto({ completo = false }: EsqueletoProps) {
  if (!completo) {
    return (
      <div
        className="esqueleto esqueletoNumeros"
        aria-label="Carregando números do catálogo"
      />
    );
  }

  return (
    <div className="esqueletoLista" aria-label="Carregando vagas">
      <div className="esqueleto esqueletoFiltro" />
      <div className="esqueletoGrade">
        <div className="esqueleto esqueletoCard" />
        <div className="esqueleto esqueletoCard" />
        <div className="esqueleto esqueletoCard" />
      </div>
    </div>
  );
}
