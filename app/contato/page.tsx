import type { Metadata } from "next";
import Icone from "@/components/Icone";

export const metadata: Metadata = {
  title: "Contato",
  description: "Entre em contato sobre o projeto Leque de Vagas.",
};

export default function Contato() {
  return (
    <main className="pagina-interna contato-pagina">
      <section className="contato">
        <div className="container contato__grade">
          <div className="contato__apresentacao">
            <span className="etiqueta"><span aria-hidden="true">✦</span> VAMOS CONVERSAR</span>
            <h1>Entre em <span>contato</span></h1>
            <p>Tem alguma dúvida sobre o projeto? Entre em contato.</p>
            <div className="contato__destaques">
              <article>
                <span><Icone nome="pessoas" /></span>
                <div><strong>Conexões que importam</strong><small>Um espaço aberto para trocar ideias.</small></div>
              </article>
              <article>
                <span><Icone nome="raio" /></span>
                <div><strong>Mensagem demonstrativa</strong><small>Este formulário não envia dados.</small></div>
              </article>
            </div>
          </div>

          <form className="contato-form">
            <div className="contato-form__topo">
              <span className="contato-form__icone"><Icone nome="seta" /></span>
              <div><small>FALE COM A GENTE</small><h2>Envie uma mensagem</h2></div>
            </div>
            <label>
              <span>Nome</span>
              <input type="text" name="nome" placeholder="Como podemos chamar você?" autoComplete="name" />
            </label>
            <label>
              <span>Email</span>
              <input type="email" name="email" placeholder="seuemail@exemplo.com" autoComplete="email" />
            </label>
            <label>
              <span>Mensagem</span>
              <textarea name="mensagem" rows={5} placeholder="Escreva sua mensagem aqui..." />
            </label>
            <button className="botao botao--primario" type="button">
              Enviar <Icone nome="seta" tamanho={18} />
            </button>
            <small className="contato-form__aviso">Formulário demonstrativo, sem envio de dados.</small>
          </form>
        </div>
      </section>
    </main>
  );
}
