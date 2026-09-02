# Leque de Vagas

Mural de vagas de tecnologia para pessoas que estão começando ou migrando de carreira. Este repositório reúne as entregas das aulas 1 a 4 de Introdução ao Next.js.

> As vagas e empresas são fictícias e foram criadas para fins didáticos.

## Site e repositório

- Repositório público: [github.com/Harlen539/front-end-avancado](https://github.com/Harlen539/front-end-avancado)
- Site na Vercel: **preencher depois da publicação**

## Equipe e frentes

Os nomes abaixo precisam ser completados pela equipe; eles não podem ser deduzidos do código.

| frente | responsável | entrega principal |
| --- | --- | --- |
| 1 · Vaga | **preencher** | tipo, cards, detalhe, descrição e cópia do link |
| 2 · Empresa | **preencher** | empresas, página dinâmica e abas |
| 3 · Pessoa e candidatura | **preencher** | formulário controlado e tratamento de ausência/erro |
| 4 · Busca e números | **preencher** | busca, filtro, contagens e streaming |

## O que é um componente?

Um componente é uma peça da interface com uma responsabilidade clara, que pode ser combinada com outras peças e reutilizada em mais de uma página. O `Cabecalho`, por exemplo, é escrito uma vez no layout raiz: assim, uma alteração na marca ou na navegação chega a todas as rotas sem copiar o mesmo código.

O `Link` do Next.js faz a navegação interna sem recarregar o documento inteiro. Por isso a troca entre as páginas preserva a interface compartilhada e parece mais rápida que uma navegação interna feita diretamente com `<a href>`.

## Mapa de rotas

| arquivo | URL | finalidade |
| --- | --- | --- |
| `app/page.tsx` | `/` | apresenta o produto |
| `app/sobre/page.tsx` | `/sobre` | explica o projeto |
| `app/contato/page.tsx` | `/contato` | rota extra da aula 1 |
| `app/vagas/page.tsx` | `/vagas` | lista, busca e filtros |
| `app/vagas/[id]/page.tsx` | `/vagas/:id` | detalhe de qualquer vaga |
| `app/empresas/page.tsx` | `/empresas` | lista as empresas |
| `app/empresas/[slug]/page.tsx` | `/empresas/:slug` | perfil e vagas da empresa |
| `app/(institucional)/termos/page.tsx` | `/termos` | termos do projeto |
| `app/(institucional)/privacidade/page.tsx` | `/privacidade` | aviso de privacidade |

A pasta `[id]` representa um segmento dinâmico. Em vez de criar um arquivo para cada vaga, uma única página recebe o valor da URL por `params`, busca a vaga correspondente e monta o conteúdo. A mesma ideia é usada com `[slug]` nas empresas. O route group `(institucional)` organiza páginas sob um layout comum, mas os parênteses não entram na URL.

O menu considera uma seção inteira como ativa: “Vagas” continua destacado em `/vagas/1` e “Empresas” em `/empresas/aurora-tech`. Isso mantém a localização visível durante a navegação; a home é tratada separadamente para não ficar ativa em todas as rotas.

## O estado do projeto

### Por que cada componente é de cliente

- `MenuLink` lê o caminho atual com `usePathname` para marcar o link ativo.
- `DescricaoDaVaga` tem um clique e guarda se a descrição está aberta.
- `BotaoCopiarLink` reage ao clique, usa a API `navigator.clipboard` do navegador e guarda se a cópia terminou.
- `AbasDaEmpresa` guarda o texto `sobre` ou `vagas` para decidir qual painel mostrar.
- `FormularioDeCandidatura` possui campos controlados, uma lista de habilidades e a confirmação temporária do envio.
- `MuralDeVagas` guarda somente a busca e a área escolhida.
- `app/vagas/[id]/error.tsx` precisa do botão que executa `reset()` no navegador.

`Filtros` não leva a diretiva: ele é importado por `MuralDeVagas`, que já define a fronteira de cliente. Nenhum `page.tsx` ou `layout.tsx` foi transformado em Client Component.

### O que decidimos não guardar em estado

A lista filtrada, as áreas disponíveis, as contagens, a validade do e-mail e a disponibilidade do botão de envio são calculadas a partir dos dados já existentes. Guardar esses valores separadamente permitiria que dois estados discordassem e mostrassem, por exemplo, uma contagem diferente da lista visível.

## Dados externos, cache e espera

As fontes editáveis ficam em `dados/vagas.json` e `dados/empresas.json`. Depois do push, o GitHub as publica a partir de `desafio-01/dados` em formato Raw. Somente `lib/api.ts` conhece esse endereço e executa `fetch`; páginas e componentes chamam `listarVagas`, `buscarVaga`, `listarEmpresas` e `buscarEmpresa`.

O `fetch` usa `revalidate: 60` e tags por recurso. Assim, uma vaga nova leva no máximo cerca de **60 segundos** para aparecer depois que a versão anterior do cache vence e uma nova requisição atualiza o conteúdo. Esse intervalo mantém o mural recente sem buscar novamente a cada acesso.

A página `/vagas` possui dois limites de `Suspense`: números e listagem podem chegar de forma independente, com esqueletos do mesmo tamanho do conteúdo. O detalhe também possui `loading.tsx`; `notFound()` atende IDs e slugs inexistentes, enquanto `error.tsx` oferece nova tentativa quando a fonte falha.

Se o projeto for publicado em outro repositório, altere o valor padrão de `FONTE` em `lib/api.ts` ou defina a variável de ambiente `FONTE_DADOS` com a URL da pasta Raw, sem barra no final.

## Metadata

Cada rota estática define título e descrição. Nas rotas dinâmicas, `generateMetadata` usa o nome da vaga ou da empresa, e `generateStaticParams` pré-gera as 12 vagas e as 5 empresas no build.

## Build conferido

Executado com Next.js `16.3.3`, Node.js `v24.12.0` e npm `11.6.2`:

```text
Route (app)                    Revalidate
┌ ○ /
├ ○ /_not-found
├ ○ /contato
├ ○ /empresas                          1m
├   /empresas/[slug]
│ ├ ● /empresas/aurora-tech            1m
│ ├ ● /empresas/ponte-digital          1m
│ ├ ● /empresas/nuvem-clara            1m
│ └ ● [+2 more paths]
├ ○ /privacidade
├ ○ /sobre
├ ○ /termos
├ ○ /vagas                             1m
└   /vagas/[id]
  ├ ● /vagas/1                         1m
  ├ ● /vagas/2                         1m
  ├ ● /vagas/3                         1m
  └ ● [+9 more paths]

○  (Static) prerendered as static content
●  (SSG)    prerendered as static HTML (uses generateStaticParams)
```

## Como executar

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000). Para validar como a Vercel:

```bash
npm run lint
npm run build
npm start
```

Antes do primeiro build com a fonte padrão, envie a pasta `dados/` para a branch `main` do repositório público. A URL Raw precisa responder com JSON puro.

## Evidências para completar antes da entrega

Estes itens dependem da equipe ou da publicação e não devem ser inventados:

- [ ] nomes e frentes dos quatro integrantes;
- [ ] prints de `node -v` e `npm -v`;
- [ ] print do `loading` da listagem;
- [ ] print da tela de erro com “Tentar de novo”;
- [ ] print de `/vagas/999` e do 404 geral;
- [ ] prints de duas abas de empresas com títulos diferentes;
- [ ] descrição de cada Pull Request e evidência de revisão;
- [ ] link final da Vercel;
- [ ] uma reflexão pessoal sobre a parte mais difícil.

## Decisões técnicas

- Componentes de servidor continuam como padrão; `"use client"` aparece apenas nas folhas interativas.
- Um estado textual controla as abas, evitando dois booleanos que poderiam entrar em conflito.
- Habilidades são atualizadas com espalhamento e `filter`, sem mutar a lista com `push`.
- O acesso externo está concentrado em uma camada, para que a fonte possa ser trocada sem alterar as telas.
- As vagas e empresas inexistentes orientam a pessoa com 404; falhas temporárias de rede oferecem nova tentativa.
