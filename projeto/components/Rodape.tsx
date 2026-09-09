import Link from "next/link";

export default function Rodape() {
  return (
    <footer className="rodape">
      <div>
        <strong>Leque de Vagas</strong>
        <p>Vagas de tecnologia para quem está construindo um novo caminho.</p>
      </div>
      <nav aria-label="Links institucionais">
        <Link href="/termos">Termos</Link>
        <Link href="/privacidade">Privacidade</Link>
      </nav>
      <p>{new Date().getFullYear()} · Projeto acadêmico</p>
    </footer>
  );
}
