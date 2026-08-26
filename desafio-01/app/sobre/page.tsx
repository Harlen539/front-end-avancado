import Link from "next/link";

export default function Sobre() {
  return (
    <main className="conteudo paginaInterna">
      <span className="etiqueta">Sobre mim</span>
      <h2>Aprender, construir e evoluir.</h2>
      <p>
        Olá! Sou Harlen, estudante de desenvolvimento front-end. Gosto de
        transformar ideias em interfaces simples, úteis e agradáveis de usar.
      </p>
      <p>
        Neste semestre, espero fortalecer meus conhecimentos em React e
        Next.js, aprender boas práticas de desenvolvimento e criar projetos
        que possam fazer parte do meu portfólio.
      </p>
      <p>
        Quero terminar essa jornada com mais confiança para trabalhar em
        equipe, resolver problemas e publicar aplicações completas.
      </p>
      <Link className="linkSeta" href="/">
        ← Voltar para o início
      </Link>
    </main>
  );
}
