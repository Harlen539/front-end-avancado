"use client";

import { useState, type FormEvent, type KeyboardEvent } from "react";

type FormularioDeCandidaturaProps = {
  tituloDaVaga: string;
};

export default function FormularioDeCandidatura({
  tituloDaVaga,
}: FormularioDeCandidaturaProps) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [rascunho, setRascunho] = useState("");
  const [habilidades, setHabilidades] = useState<string[]>([]);
  const [enviada, setEnviada] = useState(false);

  const emailParece = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const podeEnviar =
    nome.trim().length >= 2 && emailParece && habilidades.length > 0;

  function adicionarHabilidade() {
    const nova = rascunho.trim();
    const jaExiste = habilidades.some(
      (habilidade) => habilidade.toLowerCase() === nova.toLowerCase(),
    );

    if (!nova || jaExiste) return;

    setHabilidades([...habilidades, nova]);
    setRascunho("");
  }

  function aoPressionarTecla(evento: KeyboardEvent<HTMLInputElement>) {
    if (evento.key === "Enter") {
      evento.preventDefault();
      adicionarHabilidade();
    }
  }

  function removerHabilidade(habilidadeRemovida: string) {
    setHabilidades(
      habilidades.filter((habilidade) => habilidade !== habilidadeRemovida),
    );
  }

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (podeEnviar) setEnviada(true);
  }

  if (enviada) {
    return (
      <section className="sucessoCandidatura" aria-live="polite">
        <span aria-hidden="true">✓</span>
        <h2>Candidatura preparada!</h2>
        <p>
          {nome}, seus dados para <strong>{tituloDaVaga}</strong> e suas {" "}
          {habilidades.length} {habilidades.length === 1 ? "habilidade" : "habilidades"} foram conferidos.
        </p>
        <p className="avisoDidatico">
          Nesta etapa do projeto os dados ficam apenas nesta aba e ainda não são enviados para um servidor.
        </p>
        <button
          className="botao botaoSecundario"
          type="button"
          onClick={() => setEnviada(false)}
        >
          Corrigir alguma coisa
        </button>
      </section>
    );
  }

  return (
    <section className="candidatura" aria-labelledby="titulo-candidatura">
      <div className="cabecalhoSecao">
        <span className="etiqueta">Candidatura</span>
        <h2 id="titulo-candidatura">Mostre seu interesse</h2>
        <p>Preencha seus dados e inclua pelo menos uma habilidade.</p>
      </div>

      <form onSubmit={enviar} noValidate>
        <label>
          Nome
          <input
            name="nome"
            type="text"
            value={nome}
            onChange={(evento) => setNome(evento.target.value)}
            autoComplete="name"
            required
          />
        </label>

        <label>
          E-mail
          <input
            name="email"
            type="email"
            value={email}
            onChange={(evento) => setEmail(evento.target.value)}
            autoComplete="email"
            aria-describedby="aviso-email"
            required
          />
          {email.length > 0 && !emailParece && (
            <small id="aviso-email" className="erroCampo">
              Digite um e-mail completo, incluindo @ e o domínio.
            </small>
          )}
        </label>

        <div className="campoHabilidades">
          <label htmlFor="habilidade">Habilidades</label>
          <div>
            <input
              id="habilidade"
              type="text"
              value={rascunho}
              onChange={(evento) => setRascunho(evento.target.value)}
              onKeyDown={aoPressionarTecla}
              placeholder="Ex.: HTML"
            />
            <button
              className="botao botaoSecundario"
              type="button"
              onClick={adicionarHabilidade}
            >
              Adicionar
            </button>
          </div>
          <small>Pressione Enter ou use o botão para incluir.</small>
        </div>

        {habilidades.length > 0 && (
          <ul className="listaHabilidades" aria-label="Habilidades adicionadas">
            {habilidades.map((habilidade) => (
              <li key={habilidade}>
                {habilidade}
                <button
                  type="button"
                  onClick={() => removerHabilidade(habilidade)}
                  aria-label={`Remover ${habilidade}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}

        <button
          className="botao botaoPrimario"
          type="submit"
          disabled={!podeEnviar}
        >
          Enviar candidatura
        </button>
      </form>
    </section>
  );
}
