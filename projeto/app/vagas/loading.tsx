import Esqueleto from "@/components/Esqueleto";

export default function CarregandoVagas() {
  return (
    <main className="conteudo paginaVagas">
      <div className="topoPagina">
        <span className="etiqueta">Oportunidades abertas</span>
        <div className="esqueleto esqueletoTitulo" />
      </div>
      <Esqueleto completo />
    </main>
  );
}
