# 🚀 Front-end Avançado

Repositório destinado às atividades, desafios e projetos desenvolvidos durante a disciplina de **Front-end Avançado**.

Durante o semestre serão aplicados conceitos modernos de desenvolvimento web utilizando **React, Next.js, TypeScript**, componentização, roteamento, responsividade e deploy.

---

## 🎯 Projeto do semestre — Leque de Vagas

O principal projeto desenvolvido durante a disciplina será o **Leque de Vagas**, uma plataforma web voltada para divulgação de **vagas de tecnologia para pessoas em transição de carreira**.

A proposta é evoluir o projeto durante o semestre, aplicando gradualmente os conteúdos apresentados nas aulas.

### 💡 Objetivo

Criar uma experiência moderna e acessível onde pessoas possam encontrar oportunidades na área de tecnologia, conhecer empresas e acessar conteúdos que auxiliem no desenvolvimento profissional.

---

## 📚 Desafio Técnico — Aula 01

O primeiro desafio tem como objetivo configurar o ambiente de desenvolvimento e colocar em prática os fundamentos iniciais do **Next.js**.

### Requisitos

* ✅ Node.js 20.9 ou superior
* ✅ npm configurado
* ✅ Next.js 16.3+
* ✅ TypeScript
* ✅ ESLint
* ✅ App Router
* ✅ Turbopack
* ✅ CSS tradicional
* ✅ Componentização
* ✅ Navegação com `Link`
* ✅ Build de produção
* ✅ Deploy na Vercel

---

## 🛠️ Tecnologias

<div>
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</div>

---

## 📁 Estrutura inicial

```text
front-end-avancado/
│
├── app/
│   ├── sobre/
│   │   └── page.tsx
│   ├── contato/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── Cabecalho.tsx
│   └── Rodape.tsx
│
├── public/
│
├── README.md
├── package.json
├── package-lock.json
└── tsconfig.json
```

> A estrutura poderá evoluir conforme novos conteúdos forem apresentados durante o semestre.

---

## 🧩 Componentização

Um dos principais conceitos trabalhados na primeira aula é a criação de **componentes reutilizáveis**.

O projeto possui um componente:

```text
components/Cabecalho.tsx
```

que é utilizado pelo layout principal da aplicação.

### 🧠 O que é um componente?

> **TODO:**Um componente é uma parte do site que criamos separadamente para poder reutilizar em outros lugares. Eu entendi que isso deixa o projeto mais organizado e evita repetir código. No caso do cabeçalho, é melhor criar ele uma única vez e usar nas páginas do que copiar o mesmo conteúdo várias vezes, porque qualquer alteração pode ser feita em apenas um arquivo.
---

## 🗺️ Rotas

Inicialmente o projeto possui as seguintes rotas:

| Rota       | Página                                   |
| ---------- | ---------------------------------------- |
| `/`        | Página inicial do Leque de Vagas         |
| `/sobre`   | Página sobre o desenvolvedor e o projeto |
| `/contato` | Página de contato *(extra)*              |

A navegação interna é realizada utilizando o componente:

```tsx
import Link from "next/link";
```

Exemplo:

```tsx
<Link href="/sobre">Sobre</Link>
```

### 🔗 Link x navegação tradicional
Ao comparar os dois, percebi que o <Link> do Next.js deixa a navegação entre as páginas mais rápida e fluida, porque não recarrega o site inteiro. Com o <a>, a página é carregada novamente, o que deixa a troca de páginas menos suave.escrever aqui, com minhas próprias palavras, o que observei ao comparar o `<Link>` do Next.js com uma navegação tradicional utilizando `<a>`.

---

## 💻 Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/Harlen539/front-end-avancado.git
```

### 2. Entre na pasta

```bash
cd front-end-avancado
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Execute o projeto

```bash
npm run dev
```

Depois acesse:

```text
http://localhost:3000
```

---

## 🏗️ Build

Antes de publicar uma nova versão, o projeto deve passar pelo build de produção:

```bash
npm run build
```

Esse processo verifica se a aplicação pode ser compilada corretamente para produção.

---

## 🖥️ Ambiente de desenvolvimento

### Node.js

```bash
node -v
```

Versão mínima exigida:

```text
20.9+
```

### 📸 Print do Node

><img width="667" height="177" alt="version-node" src="https://github.com/user-attachments/assets/d34a0e97-d9fd-447c-af1d-bf4664d4d660" />


---

### npm

```bash
npm -v
```

### 📸 Print do npm

> <img width="665" height="96" alt="version-npm" src="https://github.com/user-attachments/assets/ec9fe1ff-08b6-4db3-988d-bfb3279f558a" />


---

## 🌐 Deploy

O projeto será publicado utilizando a **Vercel**.

### Site

🔗 **Deploy:** `ADICIONAR_LINK_DA_VERCEL`

### Repositório

🔗 **GitHub:** https://github.com/Harlen539/front-end-avancado

---

## 👥 Equipe — Leque de Vagas

O projeto do semestre será desenvolvido em equipe de **3 a 4 integrantes**.

### Integrantes

* Harlen Henrick
* Bruno Venâncio
* Carlos eduardo
---

## 📖 Conteúdos do semestre

Este repositório será atualizado conforme o avanço da disciplina.

### Progresso

* [x] Aula 01 — Ambiente, projeto e deploy
* [ ] Aula 02 — Aguardando conteúdo
* [ ] Próximas aulas
* [ ] Evolução do Leque de Vagas
* [ ] Projeto final

---

## 📌 Desafio da Aula 01

Nesta primeira etapa, o objetivo é garantir que:

* o ambiente esteja configurado;
* o projeto Next.js execute corretamente;
* exista um componente reutilizável;
* existam pelo menos duas rotas;
* a navegação utilize `Link`;
* o projeto passe no `npm run build`;
* o código esteja no GitHub;
* o site esteja publicado na Vercel.

---

## 💭 Maior dificuldade

> **TODO:** A maior dificuldade que enfrentei durante o desafio foi **conciliar o tempo da atividade com a minha rotina**. Como tive pouco tempo disponível, acabei realizando boa parte do projeto com bastante pressa e precisei até **virar uma noite trabalhando para conseguir finalizar tudo dentro do prazo**. Além da questão do tempo, outro desafio foi a **organização e a comunicação com os colegas da equipe**, já que precisávamos conversar, alinhar as ideias e dividir as responsabilidades de forma que todos pudessem participar e contribuir com o projeto. Apesar dessas dificuldades, a experiência foi importante para perceber como organização, comunicação e trabalho em equipe são tão essenciais quanto a parte técnica durante o desenvolvimento de um projeto.

---

[![GitHub](https://img.shields.io/badge/GitHub-Harlen539-181717?style=for-the-badge\&logo=github)](https://github.com/Harlen539)

---

<p align="center">
  Desenvolvido durante a disciplina de <strong>Front-end Avançado</strong> 💻
</p>
