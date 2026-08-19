import Beneficios from "@/components/Beneficios";
import BuscaVagas from "@/components/BuscaVagas";
import ComoFunciona from "@/components/ComoFunciona";
import Conteudos from "@/components/Conteudos";
import CTA from "@/components/CTA";
import Hero from "@/components/Hero";
import VagasDestaque from "@/components/VagasDestaque";

export default function Home() {
  return (
    <main>
      <Hero />
      <BuscaVagas />
      <Beneficios />
      <VagasDestaque />
      <ComoFunciona />
      <Conteudos />
      <CTA />
    </main>
  );
}
