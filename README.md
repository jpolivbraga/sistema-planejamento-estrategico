# 🚀 Sistema de Planejamento Estratégico (PE)

Plataforma web executiva para condução de reuniões de consultoria estratégica, registro de definições metodológicas em tempo real, acompanhamento contínuo da execução (RMR) e geração do **Book Estratégico Oficial** em PDF (formato *Landscape*).

---

## 🎯 Objetivo & Proposta de Valor

O sistema foi desenhado especificamente para consultores e lideranças corporativas. Ele substitui planilhas fragmentadas por um ambiente integrado e colaborativo que:
1. **Navega livremente** entre as 11 etapas do planejamento sem bloqueios de ordem.
2. **Separa a formulação da execução**: preserva o plano aprovado em versões congeladas (*v1, v2...*) enquanto alimenta o acompanhamento mensal de metas e entregas.
3. **Métrica Dupla**: diferencia com clareza o *Status da Entrega* (implantação/ação) do *Resultado do Indicador* (impacto mensurado).
4. **Isolamento Multi-tenant**: cada empresa e ciclo anual possuem dados estritamente isolados, com suporte a perfis **Admin (Consultor)** e **Observador (Cliente / Alta Gestão)** via Row Level Security (RLS).

---

## 🧭 As 11 Etapas Metodológicas

| # | Etapa | Descrição & Recursos |
| :-: | :--- | :--- |
| **1** | **Aprendizados do Ano Anterior** | Lições aprendidas com botão de notas/observações expansível para registrar causas-raiz. |
| **2** | **Matriz BCG** | Portfólio de produtos/serviços nos 4 quadrantes clássicos (*Vaca Leiteira, Estrela, Abacaxi, Interrogação*). |
| **3** | **Identidade Organizacional** | Missão (propósito), Visão (horizonte temporal e meta) e Valores em tags corporativas. |
| **4** | **Matriz SWOT (FOFA)** | Grade 2x2 com identificador único em cada item (`[F1]`, `[P1]`, `[O1]`, `[A1]`) para amarração com ações. |
| **5** | **Mapa Estratégico (BSC)** | As 4 perspectivas verticais: *Financeira*, *Mercado/Clientes*, *Processos Internos* e *Aprendizado*. |
| **6** | **Metas de Vendas** | Calendário anual em 3 quadrimestres (4 meses por coluna) com inputs em R$ e sumário do total anual. |
| **7** | **Orçamento Anual & DRE** | Projeções de receita bruta, deduções, receita líquida, custos diretos e margem EBITDA. |
| **8** | **Critérios de PLR / Incentivos** | Regras, gatilhos de EBITDA e fórmulas com observações detalhadas *(Opcional - botão "Não se aplica")*. |
| **9** | **Satisfação de Clientes** | Indicadores de qualidade e notas de relacionamento *(NPS Relacional / CSAT)* *(Opcional)*. |
| **10** | **Processos Core Prioritários** | Processos críticos mapeados por diretoria com responsável e prazos *(Opcional - botão "Não se aplica")*. |
| **11** | **Plano de Ações (5W2H)** | Tabela horizontal de 10 colunas desdobrando cada projeto e iniciativa estratégica. |

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: [Next.js 15 (App Router)](https://nextjs.org/) + [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Estilização & UI**: [Tailwind CSS v3](https://tailwindcss.com/) + [PostCSS](https://postcss.org/) + [Lucide Icons](https://lucide.dev/)
- **Backend & Autenticação**: [Supabase](https://supabase.com/) (PostgreSQL com Row Level Security)
- **Geração de Relatório**: Estilização nativa para impressão/exportação em PDF no formato **Landscape (Horizontal)** com quebra de página automática e isolamento de tela (`@media print`).

---

## 📁 Estrutura do Projeto

```plaintext
├── src/
│   ├── app/
│   │   ├── globals.css          # Estilos globais e regras de impressão (@page Landscape)
│   │   ├── layout.tsx           # Layout raiz com metadados da aplicação
│   │   └── page.tsx             # Workspace principal, modal do Book e fluxo entre telas
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── HomeOverview.tsx # Hub geral com portfólio de empresas e KPIs
│   │   │   └── NewCompanyModal.tsx # Modal de cadastro de novas empresas e ciclos
│   │   ├── layout/
│   │   │   ├── Header.tsx       # Barra superior com auto-save, status e voltar
│   │   │   └── SidebarSteps.tsx # Menu lateral com seções: Dados Gerais, Etapas e Acompanhamento
│   │   └── steps/
│   │       ├── GeneralDataView.tsx  # Barra de progresso consolidado e dados cadastrais
│   │       ├── StepGuidance.tsx     # Bloco de orientações didáticas no topo de cada etapa
│   │       ├── Step1Learnings.tsx   # Etapa 1 com observações expansíveis
│   │       ├── Step2BCG.tsx         # Etapa 2 (Matriz BCG interativa)
│   │       ├── Step3Identity.tsx    # Etapa 3 (Missão, Visão e Valores)
│   │       ├── Step4SWOT.tsx        # Etapa 4 (Matriz SWOT com códigos)
│   │       ├── Step5BSC.tsx         # Etapa 5 (Mapa Estratégico em 4 perspectivas)
│   │       ├── Step6SalesGoals.tsx  # Etapa 6 (Metas em 3 colunas quadrimestrais)
│   │       ├── Step8PLR.tsx         # Etapa 8 (Critérios de PLR com observações)
│   │       ├── Step10ProcessCore.tsx # Etapa 10 (Processos core operacionais)
│   │       └── Step11ActionPlan.tsx # Etapa 11 (Tabela 5W2H com 10 colunas)
│   ├── lib/
│   │   └── supabase/            # Clientes SSR e Browser do Supabase
│   └── types/
│       └── database.ts          # Interfaces TypeScript e definições das 11 etapas
├── .env.example                 # Modelo de variáveis de ambiente
├── .gitignore                   # Blindagem de arquivos sensíveis e caches
└── package.json                 # Dependências e scripts de execução
```

---

## ⚡ Como Rodar o Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- `npm` ou `pnpm`

### 1. Clonar e Instalar Dependências
```bash
git clone https://github.com/jpolivbraga/sistema-planejamento-estrategico.git
cd PE
npm install
```

### 2. Configurar Variáveis de Ambiente
Duplique o arquivo `.env.example` para `.env.local`:
```bash
cp .env.example .env.local
```
Preencha com as credenciais do seu projeto no Supabase:
```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_publica_aqui
```

### 3. Rodar em Modo de Desenvolvimento
No PowerShell (Windows):
```powershell
npm.cmd run dev
```
Ou (Linux/macOS):
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 📄 Geração do Book Estratégico (PDF)

1. No canto superior direito da mesa de trabalho de qualquer empresa, clique em **"Gerar Book em PDF"**.
2. Uma pré-visualização completa do documento será aberta com capa, sumário e **todas as 11 etapas em sequência rigorosa (1 a 11)**.
3. Clique em **"Imprimir / Salvar PDF"**: a tela de impressão do navegador abrirá configurada em modo **Landscape (Horizontal)**, omitindo menus e gerando um relatório executivo pronto para apresentação.

---

## 🔒 Segurança e Controle de Acesso (RBAC)

- **Admin / Consultor**: Gerencia empresas, edita todas as 11 etapas, altera status (*Em Construção*, *Em Validação*, *Aprovado*), atualiza o Acompanhamento Mensal e gera o Book.
- **Observador (Cliente)**: Acesso restrito somente leitura às empresas vinculadas, visualizando apenas planejamentos aprovados ou em validação.

