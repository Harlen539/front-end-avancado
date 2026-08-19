import Link from "next/link";

type MarcaProps = {
  variante?: "clara" | "escura";
};

export default function Marca({ variante = "clara" }: MarcaProps) {
  return (
    <Link
      className={`marca marca--${variante}`}
      href="/"
      aria-label="Leque de Vagas — página inicial"
    >
      <span className="marca__simbolo" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span>Leque de Vagas</span>
    </Link>
  );
}
