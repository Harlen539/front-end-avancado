import Icone from "./Icone";

export default function BuscaVagas() {
  return (
    <section className="secao busca-secao" aria-labelledby="titulo-busca">
      <div className="container">
        <div className="busca-card">
          <div className="busca-card__cabecalho">
            <div>
              <span className="secao__rotulo">ENCONTRE SEU LUGAR</span>
              <h2 id="titulo-busca">Encontre a vaga certa para você</h2>
            </div>
            <span className="busca-card__selo">+120 novas esta semana</span>
          </div>
          <form className="busca-form" role="search">
            <label className="campo campo--maior">
              <span className="sr-only">Cargo, palavra-chave ou tecnologia</span>
              <Icone nome="busca" />
              <input type="search" placeholder="Cargo, palavra-chave ou tecnologia" />
            </label>
            <label className="campo">
              <span className="sr-only">Localização</span>
              <Icone nome="local" />
              <input type="text" placeholder="Localização" />
            </label>
            <label className="campo campo--select">
              <span className="sr-only">Área de atuação</span>
              <Icone nome="pasta" />
              <select defaultValue="">
                <option value="" disabled>Área de atuação</option>
                <option>Desenvolvimento</option>
                <option>Dados</option>
                <option>Suporte</option>
                <option>Qualidade</option>
              </select>
            </label>
            <label className="campo campo--select">
              <span className="sr-only">Nível</span>
              <Icone nome="nivel" />
              <select defaultValue="">
                <option value="" disabled>Nível</option>
                <option>Estágio</option>
                <option>Júnior</option>
                <option>Pleno</option>
                <option>Sênior</option>
              </select>
            </label>
            <button className="botao botao--primario busca-form__botao" type="button">
              Buscar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
