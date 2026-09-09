import type { Estado } from "@/lib/tipos";

type Props = {
  nome: string;
  rotulo: string;
  estado: Estado;
  inicial?: string;
  tipo?: "text" | "email" | "url" | "textarea" | "select";
  opcoes?: { valor: string; rotulo: string }[];
  autoComplete?: string;
};

export default function CampoDeFormulario({ nome, rotulo, estado, inicial = "", tipo = "text", opcoes, autoComplete }: Props) {
  const erro = estado.erros[nome];
  const atributos = {
    id: nome, name: nome, defaultValue: estado.valores[nome] ?? inicial,
    "aria-invalid": Boolean(erro), "aria-describedby": erro ? `${nome}-erro` : undefined,
  };
  return (
    <div className="campoFormulario">
      <label htmlFor={nome}>{rotulo}</label>
      {tipo === "textarea" ? <textarea {...atributos} rows={7} /> : tipo === "select" ? (
        // Remonta quando o servidor devolve outra seleção: o reset nativo do
        // React precisa restaurar essa opção, inclusive depois de uma recusa.
        <select key={atributos.defaultValue} {...atributos}>
          <option value="">Selecione uma empresa</option>
          {opcoes?.map((opcao) => <option key={opcao.valor} value={opcao.valor}>{opcao.rotulo}</option>)}
        </select>
      ) : <input {...atributos} type={tipo} autoComplete={autoComplete} />}
      {erro && <p className="erroCampo" id={`${nome}-erro`} role="alert">{erro}</p>}
    </div>
  );
}
