'use client'

import React, { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { SidebarSteps, ActiveTabType } from '@/components/layout/SidebarSteps'
import { StepGuidance } from '@/components/steps/StepGuidance'
import { Step1Learnings } from '@/components/steps/Step1Learnings'
import { Step2BCG } from '@/components/steps/Step2BCG'
import { Step3Identity } from '@/components/steps/Step3Identity'
import { Step4SWOT } from '@/components/steps/Step4SWOT'
import { Step5BSC } from '@/components/steps/Step5BSC'
import { Step6SalesGoals } from '@/components/steps/Step6SalesGoals'
import { Step8PLR } from '@/components/steps/Step8PLR'
import { Step10ProcessCore } from '@/components/steps/Step10ProcessCore'
import { Step11ActionPlan, ActionItem } from '@/components/steps/Step11ActionPlan'
import { GeneralDataView } from '@/components/steps/GeneralDataView'
import { HomeOverview, CompanyCardData } from '@/components/dashboard/HomeOverview'
import { NewCompanyModal } from '@/components/dashboard/NewCompanyModal'
import { CycleStatus, StepStatus, METHODOLOGY_STEPS, GeneralDataState } from '@/types/database'
import { BookOpen, FileCheck, Printer, Users, DollarSign, Target, Calendar, Building2 } from 'lucide-react'

export default function Dashboard() {
  const [viewMode, setViewMode] = useState<'home' | 'workspace'>('home')
  const [userRole, setUserRole] = useState<'admin' | 'observer'>('admin')
  const [isNewCompanyModalOpen, setIsNewCompanyModalOpen] = useState(false)

  // 1. ISOLAMENTO DE DADOS: Status das Etapas por Empresa (company_id)
  const [companyStepsStatus, setCompanyStepsStatus] = useState<Record<string, Record<number, StepStatus>>>({
    maxima: {
      1: 'completed',
      2: 'completed',
      3: 'completed',
      4: 'completed',
      5: 'completed',
      6: 'completed',
      7: 'not_started',
      8: 'completed',
      9: 'not_applicable',
      10: 'completed',
      11: 'in_progress',
    },
    roberta: {
      1: 'completed',
      2: 'completed',
      3: 'completed',
      4: 'completed',
      5: 'completed',
      6: 'completed',
      7: 'completed',
      8: 'completed',
      9: 'completed',
      10: 'not_started',
      11: 'not_started',
    },
    alfa: {
      1: 'completed',
      2: 'completed',
      3: 'completed',
      4: 'completed',
      5: 'completed',
      6: 'completed',
      7: 'completed',
      8: 'completed',
      9: 'completed',
      10: 'completed',
      11: 'completed',
    },
  })

  // 2. ISOLAMENTO DE DADOS: Dados Gerais por Empresa (company_id)
  const [companyGeneralData, setCompanyGeneralData] = useState<Record<string, GeneralDataState>>({
    maxima: {
      startDate: '2026-11-01',
      endDate: '2027-12-31',
      companyName: 'Máxima Sistemas S.A.',
      segment: 'Tecnologia / Supply Chain',
      year: 2027,
      cnpj: '08.123.456/0001-90',
      participants: ['Katia (Diretora)', 'Luciano (Gerente de Produto)', 'Selva (Comercial)', 'Adriana (Serviços)'],
    },
    roberta: {
      startDate: '2026-10-01',
      endDate: '2027-12-31',
      companyName: 'Roberta Advocacia & Consultoria',
      segment: 'Serviços Jurídicos',
      year: 2027,
      cnpj: '12.345.678/0001-00',
      participants: ['Dra. Roberta (Sócia Fundadora)', 'Dr. Felipe (Diretor Tributário)'],
    },
    alfa: {
      startDate: '2025-11-01',
      endDate: '2026-12-31',
      companyName: 'Alfa Logística & Distribuição',
      segment: 'Transportes & Logística',
      year: 2026,
      cnpj: '99.888.777/0001-11',
      participants: ['Marcos (CEO)', 'Fernanda (Diretora de Operações)'],
    },
  })

  // 3. ISOLAMENTO DE DADOS: Ações Estratégicas por Empresa (company_id)
  const [companyActions, setCompanyActions] = useState<Record<string, ActionItem[]>>({
    maxima: [
      {
        id: '1',
        name: 'Gerir orçamento',
        objective: 'Garantir o EBITDA da empresa e manter o orçamento previsto',
        kpi: 'EBITDA',
        target: '13%',
        owner: 'Katia',
        startDate: '2027-01-02',
        endDate: '2027-12-31',
        bscPerspective: 'Fin',
        bscGuideline: 'F.1 Manter o Crescimento com Lucratividade Sustentável',
        swotResolved: 'Manter margem e sustentabilidade financeira',
      },
      {
        id: '2',
        name: 'Vender via Inside Sales (venda interna)',
        objective: 'Reduzir custo de aquisição de clientes (CAC) e o ciclo de venda',
        kpi: 'CAC / Ciclo de Venda',
        target: 'Redução de 20%',
        owner: 'Selva',
        startDate: '2027-01-02',
        endDate: '2027-06-28',
        bscPerspective: 'Fin',
        bscGuideline: 'F.3 Aumentar Receitas',
        swotResolved: 'O1 Consultoria para Vendas em Atacado',
      },
      {
        id: '3',
        name: 'Migrar 240 clientes do Pedido de Venda para o maxPedido',
        objective: 'Aumentar a satisfação e modernizar a carteira de clientes',
        kpi: 'Clientes Migrados',
        target: '240 clientes',
        owner: 'Adriana',
        startDate: '2027-01-10',
        endDate: '2027-12-31',
        bscPerspective: 'Mer',
        bscGuideline: 'M.1 Superar as Expectativas dos Clientes',
        swotResolved: 'F2 Soluções integradas com principais ERPs',
      },
      {
        id: '4',
        name: 'Dar visibilidade das soluções de Logística na 1ª página do Google',
        objective: 'Desenvolver a autoridade da marca no mercado digital',
        kpi: 'Posicionamento de Busca',
        target: '1ª página do Google',
        owner: 'Selva',
        startDate: '2027-01-15',
        endDate: '2027-05-31',
        bscPerspective: 'Mer',
        bscGuideline: 'M.2 Fortalecer a Marca como Líder no Mercado de Atuação',
        swotResolved: '* Baixa visibilidade da oferta Logística no mundo on-line',
      },
      {
        id: '5',
        name: 'Criar e implementar projeto de segurança e blindagem',
        objective: 'Blindar a hospedagem em nuvem e segurança de dados',
        kpi: 'Índice de Vulnerabilidade',
        target: '0 falhas críticas',
        owner: 'Fabiano',
        startDate: '2027-01-15',
        endDate: '2027-06-28',
        bscPerspective: 'Proc',
        bscGuideline: 'PI.1 Garantir Qualidade dos Produtos e Serviços',
        swotResolved: 'Vulnerabilidade na segurança de dados',
      },
      {
        id: '6',
        name: 'Implantar área de SQA e automação de testes (Projeto JARVIS)',
        objective: 'Garantir qualidade contínua e maturidade na liberação de software',
        kpi: 'Produtos Homologados por SQA',
        target: '100% dos releases',
        owner: 'Luciano',
        startDate: '2027-01-15',
        endDate: '2027-05-31',
        bscPerspective: 'Proc',
        bscGuideline: 'PI.1 Garantir Qualidade dos Produtos e Serviços',
        swotResolved: '* Baixo nível de maturidade no processo GCS (Gerência de Configuração)',
      },
      {
        id: '7',
        name: 'Criar e implementar a Academia do Conhecimento',
        objective: 'Certificar a equipe no negócio e aproximar a empresa de universidades',
        kpi: 'Nº de Certificados / Eventos',
        target: '80% da equipe técnica',
        owner: 'Katia + Luciano',
        startDate: '2027-01-15',
        endDate: '2027-12-15',
        bscPerspective: 'Pess',
        bscGuideline: 'AC.1 Atrair e Reter Talentos',
        swotResolved: '* Baixa qualificação em negócio e descumprimento de SLA',
      },
    ],
    roberta: [
      {
        id: 'r1',
        name: 'Estruturação de Área de Controladoria Jurídica',
        objective: 'Garantir cumprimento de 100% dos prazos processuais e audiências',
        kpi: 'Índice de Conformidade de Prazos',
        target: '100%',
        owner: 'Roberta',
        startDate: '2027-01-05',
        endDate: '2027-06-30',
        bscPerspective: 'Proc',
        bscGuideline: 'PI.1 Excelência Operacional',
        swotResolved: 'Eliminação de riscos de perda de prazo processual',
      },
      {
        id: 'r2',
        name: 'Expansão de Clientes Corporativos em Direito Tributário',
        objective: 'Aumentar a carteira de clientes de médio e grande porte',
        kpi: 'Novos Contratos Ativos',
        target: '12 novos clientes',
        owner: 'Felipe',
        startDate: '2027-02-01',
        endDate: '2027-11-30',
        bscPerspective: 'Mer',
        bscGuideline: 'M.1 Ampliação de Market Share',
        swotResolved: 'Oportunidade de recuperação de créditos tributários',
      },
    ],
    alfa: [
      {
        id: 'a1',
        name: 'Renovação e Roteirização da Frota de Distribuição',
        objective: 'Reduzir custos operacionais de diesel e tempo de entrega',
        kpi: 'Lead Time de Entrega / Redução Combustível',
        target: 'Redução de 15% nos custos',
        owner: 'Marcos',
        startDate: '2026-01-10',
        endDate: '2026-10-31',
        bscPerspective: 'Fin',
        bscGuideline: 'F.2 Reduzir Custos Operacionais',
        swotResolved: 'Otimização de rotas com rastreamento IoT',
      },
    ],
  })

  // Lista de Empresas no Portfólio
  const [companies, setCompanies] = useState<CompanyCardData[]>([
    {
      id: 'maxima',
      name: 'Máxima Sistemas S.A.',
      segment: 'Tecnologia / Supply Chain',
      cycleTitle: 'Planejamento Estratégico 2027',
      year: 2027,
      status: 'draft',
      completedStepsCount: 8,
      totalActionsCount: 7,
      kpiHealth: 'good',
      lastMeetingDate: '27/05/2026',
      lastUpdated: 'há 2 horas',
    },
    {
      id: 'roberta',
      name: 'Roberta Advocacia & Consultoria',
      segment: 'Serviços Jurídicos',
      cycleTitle: 'Planejamento Estratégico 2027',
      year: 2027,
      status: 'in_review',
      completedStepsCount: 9,
      totalActionsCount: 2,
      kpiHealth: 'good',
      lastMeetingDate: '15/10/2026',
      lastUpdated: 'ontem',
    },
    {
      id: 'alfa',
      name: 'Alfa Logística & Distribuição',
      segment: 'Transportes & Logística',
      cycleTitle: 'Planejamento Estratégico 2026',
      year: 2026,
      status: 'approved',
      completedStepsCount: 11,
      totalActionsCount: 1,
      kpiHealth: 'good',
      lastMeetingDate: '02/10/2026',
      lastUpdated: 'há 5 dias',
    },
  ])

  // Empresa ativa no momento no Workspace
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('maxima')
  const activeCompany = companies.find((c) => c.id === selectedCompanyId) || companies[0]

  // Aba ativa: 'general_data' (Dados Gerais, à esquerda), 'methodology' (Etapas 11) ou 'monthly_tracking' (Acompanhamento Mensal)
  const [activeTab, setActiveTab] = useState<ActiveTabType>('general_data')
  const [currentStep, setCurrentStep] = useState(1)
  const [isSaved, setIsSaved] = useState(true)
  const [showBookModal, setShowBookModal] = useState(false)

  // Recupera com segurança o status de etapas, dados gerais e ações da empresa ATIVA
  const activeStepsStatus = companyStepsStatus[selectedCompanyId] || {
    1: 'not_started',
    2: 'not_started',
    3: 'not_started',
    4: 'not_started',
    5: 'not_started',
    6: 'not_started',
    7: 'not_started',
    8: 'not_applicable',
    9: 'not_applicable',
    10: 'not_applicable',
    11: 'not_started',
  }

  const activeGeneralData = companyGeneralData[selectedCompanyId] || {
    startDate: `${activeCompany.year}-01-01`,
    endDate: `${activeCompany.year}-12-31`,
    companyName: activeCompany.name,
    segment: activeCompany.segment,
    year: activeCompany.year,
    cnpj: '',
    participants: ['Liderança'],
  }

  const activeActions = companyActions[selectedCompanyId] || []

  // Atualização isolada do status de uma etapa para a empresa ATIVA
  const handleUpdateStepStatus = (stepNumber: number, newStatus: StepStatus) => {
    const updatedCompanySteps = {
      ...activeStepsStatus,
      [stepNumber]: newStatus,
    }

    setCompanyStepsStatus((prev) => ({
      ...prev,
      [selectedCompanyId]: updatedCompanySteps,
    }))

    // Recalcula o número de etapas completadas dessa empresa específica
    const completedCount = METHODOLOGY_STEPS.filter((s) => {
      const st = updatedCompanySteps[s.step_number]
      return st === 'completed' || st === 'not_applicable'
    }).length

    setCompanies((prev) =>
      prev.map((c) => (c.id === selectedCompanyId ? { ...c, completedStepsCount: completedCount } : c))
    )
  }

  // Atualização isolada dos Dados Gerais da empresa ATIVA
  const handleUpdateGeneralData = (updated: GeneralDataState) => {
    setCompanyGeneralData((prev) => ({
      ...prev,
      [selectedCompanyId]: updated,
    }))

    setCompanies((prev) =>
      prev.map((c) =>
        c.id === selectedCompanyId
          ? { ...c, name: updated.companyName, segment: updated.segment, year: updated.year }
          : c
      )
    )
  }

  // Atualização isolada das Ações Estratégicas da empresa ATIVA
  const handleUpdateActions = (updatedActions: ActionItem[]) => {
    setCompanyActions((prev) => ({
      ...prev,
      [selectedCompanyId]: updatedActions,
    }))

    setCompanies((prev) =>
      prev.map((c) => (c.id === selectedCompanyId ? { ...c, totalActionsCount: updatedActions.length } : c))
    )
  }

  // Orientações didáticas
  const guidanceData: Record<
    number,
    { title: string; explanation: string; questions: string[]; example?: string; isOptional?: boolean }
  > = {
    1: {
      title: 'Aprendizados do Ano Anterior',
      explanation:
        'Reflita sobre as lições aprendidas do ciclo anterior. Clique no ícone de nota ao lado do item para registrar causas-raiz e observações detalhadas.',
      questions: [
        'Que atividades, métodos e condições foram úteis?',
        'Os clientes e parceiros ficaram satisfeitos com o processo?',
        'O que não deu certo? Registre observações de causa-raiz para cada tópico.',
      ],
      example:
        'Exemplo real: "Não tratar ação estratégica de alta prioridade apenas como tarefa simples da rotina diária, e sim como Projeto com responsável e cobrança mensal."',
    },
    2: {
      title: 'Matriz BCG (Portfólio de Produtos e Serviços)',
      explanation:
        'Classifique a carteira de produtos/serviços com base na taxa de crescimento de mercado e participação relativa.',
      questions: [
        'Quais sustentam o balanço da empresa com baixo investimento (Vacas Leiteiras)?',
        'Quais geram alta rentabilidade mas demandam investimento (Estrelas)?',
        'Quais têm baixo volume ou margem e devem ser descontinuados (Abacaxis)?',
        'Quais são produtos inovadores com potencial a testar (Interrogações)?',
      ],
      example: 'Classifique com realismo cada serviço prestado pela organização.',
    },
    3: {
      title: 'Identidade Organizacional',
      explanation:
        'A Missão orienta a atuação diária. A Visão descreve onde a empresa quer chegar no futuro com metas claras. Os Valores são as diretrizes de conduta.',
      questions: [
        'Qual o propósito e razão de existir da empresa (Missão)?',
        'Onde queremos estar posicionados nos próximos anos (Visão)?',
        'Quais princípios são inegociáveis para a equipe (Valores)?',
      ],
    },
    4: {
      title: 'Matriz SWOT (Ambiente Interno e Externo)',
      explanation:
        'Mapeie Pontos Fortes, Pontos Fracos, Oportunidades e Ameaças. Cada item recebe um identificador para vínculo com o plano de ação.',
      questions: [
        'Forças: Quais os diferenciais competitivos e vantagens internas?',
        'Fraquezas: Onde ocorrem falhas, atrasos e gargalos a superar?',
        'Oportunidades: Que movimentos externos ou novas tecnologias podemos aproveitar?',
        'Ameaças: Que fatores externos trazem riscos ao negócio?',
      ],
    },
    5: {
      title: 'Mapa Estratégico (BSC)',
      explanation:
        'Formulação em 4 perspectivas: Financeira, Mercado/Clientes, Processos Internos e Aprendizado e Crescimento.',
      questions: [
        'Financeiro: Como garantir crescimento com lucratividade sustentável?',
        'Mercado: Como superar expectativas e fortalecer a marca?',
        'Processos: Onde otimizar qualidade e eliminar retrabalho?',
        'Aprendizado: Como atrair e reter talentos e inovar?',
      ],
    },
    6: {
      title: 'Metas de Vendas (Calendário Anual)',
      explanation:
        'Projeção de vendas distribuída nas 3 colunas quadrimestrais (Jan-Abr, Mai-Ago, Set-Dez) com cálculo automático do total consolidado anual.',
      questions: [
        'Qual a sazonalidade e expectativa de faturamento para cada mês?',
        'Qual o valor total de meta de venda acordado para o ano?',
      ],
    },
    8: {
      title: 'Critérios e Regras de PLR / Incentivos',
      explanation:
        'Cadastre os critérios, gatilhos de EBITDA e metas exigidas para a premiação dos colaboradores. Use o ícone de observação para detalhar regras de apuração.',
      questions: [
        'Qual o gatilho mínimo de EBITDA para abertura do programa?',
        'Qual o percentual ou fórmula de premiação por colaborador?',
      ],
      isOptional: true,
    },
    9: {
      title: 'Satisfação de Clientes (NPS / CSAT)',
      explanation:
        'Mapeamento de indicadores de satisfação de clientes, notas de relacionamento e metas periódicas.',
      questions: ['Qual a meta de NPS anual e a evolução esperada mês a mês?'],
      isOptional: true,
    },
    10: {
      title: 'Processos Core Prioritários',
      explanation:
        'Mapeamento e priorização dos processos operacionais e de atendimento que devem ser melhorados ou padronizados. Pode ser marcado como "Não se Aplica".',
      questions: [
        'Quais processos críticos necessitam de revisão imediata?',
        'Quem é o gestor responsável por cada homologação?',
      ],
      isOptional: true,
    },
    11: {
      title: 'Plano de Ações Estratégicas (Desdobramento 5W2H)',
      explanation:
        'Estruturação detalhada das ações com Objetivo, Indicador, Meta, Quem, Datas, BSC, Diretriz Estratégica e o que resolve da SWOT.',
      questions: [
        'Qual o objetivo específico e a métrica de resultado esperado?',
        'Quem é o responsável único pela entrega?',
        'Qual objetivo do BSC e ponto da SWOT esta ação atende?',
      ],
    },
  }

  const handleToggleStatus = () => {
    let nextStatus: CycleStatus = 'draft'
    if (activeCompany.status === 'draft') nextStatus = 'in_review'
    else if (activeCompany.status === 'in_review') nextStatus = 'approved'
    else nextStatus = 'draft'

    setCompanies(
      companies.map((c) => (c.id === activeCompany.id ? { ...c, status: nextStatus } : c))
    )
  }

  const handleSelectCompanyFromHome = (companyId: string) => {
    setSelectedCompanyId(companyId)
    setViewMode('workspace')
  }

  const handleCreateCompany = (newComp: { name: string; cnpj: string; segment: string; year: number }) => {
    const newId = `comp_${Date.now()}`
    const created: CompanyCardData = {
      id: newId,
      name: newComp.name,
      segment: newComp.segment || 'Geral',
      cycleTitle: `Planejamento Estratégico ${newComp.year}`,
      year: newComp.year,
      status: 'draft',
      completedStepsCount: 1,
      totalActionsCount: 0,
      kpiHealth: 'good',
      lastUpdated: 'agora',
    }

    setCompanies([created, ...companies])
    setSelectedCompanyId(newId)

    // Inicialização isolada da nova empresa
    setCompanyStepsStatus((prev) => ({
      ...prev,
      [newId]: {
        1: 'in_progress',
        2: 'not_started',
        3: 'not_started',
        4: 'not_started',
        5: 'not_started',
        6: 'not_started',
        7: 'not_started',
        8: 'not_applicable',
        9: 'not_applicable',
        10: 'not_applicable',
        11: 'not_started',
      },
    }))

    setCompanyGeneralData((prev) => ({
      ...prev,
      [newId]: {
        startDate: `${newComp.year}-01-01`,
        endDate: `${newComp.year}-12-31`,
        companyName: newComp.name,
        segment: newComp.segment || 'Geral',
        year: newComp.year,
        cnpj: newComp.cnpj || '',
        participants: ['Consultor Líder'],
      },
    }))

    setCompanyActions((prev) => ({
      ...prev,
      [newId]: [],
    }))

    setViewMode('workspace')
  }

  // RENDERIZAÇÃO DA TELA INICIAL (HUB GERAL)
  if (viewMode === 'home') {
    return (
      <>
        <HomeOverview
          companies={companies}
          userRole={userRole}
          onSelectCompany={handleSelectCompanyFromHome}
          onOpenNewCompany={() => setIsNewCompanyModalOpen(true)}
          onToggleUserRole={() => setUserRole(userRole === 'admin' ? 'observer' : 'admin')}
        />
        <NewCompanyModal
          isOpen={isNewCompanyModalOpen}
          onClose={() => setIsNewCompanyModalOpen(false)}
          onSave={handleCreateCompany}
        />
      </>
    )
  }

  // RENDERIZAÇÃO DO WORKSPACE DO CICLO
  const activeGuidance = guidanceData[currentStep] || {
    title: METHODOLOGY_STEPS.find((s) => s.step_number === currentStep)?.title || 'Etapa',
    explanation: 'Preencha as informações desta etapa para compor o Book Estratégico.',
    questions: ['Revise as metas e decisões estratégicas com a liderança.'],
    isOptional: METHODOLOGY_STEPS.find((s) => s.step_number === currentStep)?.is_optional,
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header com Status, Auto-save e Voltar ao Painel Geral */}
      <div className="no-print">
        <Header
          companyName={activeGeneralData.companyName || activeCompany.name}
          cycleTitle={activeCompany.cycleTitle}
          cycleStatus={activeCompany.status}
          isSaved={isSaved}
          onToggleStatus={handleToggleStatus}
          onExportPdf={() => setShowBookModal(true)}
          onBackToHome={() => setViewMode('home')}
        />
      </div>

      <div className="flex-1 flex no-print">
        {/* Menu Lateral com as 3 Seções: Dados Gerais (à esquerda), Etapas (11), Acompanhamento Mensal */}
        <SidebarSteps
          currentStep={currentStep}
          activeTab={activeTab}
          stepsStatus={activeStepsStatus}
          onSelectStep={(step) => {
            setCurrentStep(step)
            setActiveTab('methodology')
          }}
          onSelectTab={(tab) => setActiveTab(tab)}
        />

        {/* Conteúdo Central */}
        <main className="flex-1 p-8 max-w-6xl mx-auto w-full overflow-y-auto no-print">
          {/* ABA 1: DADOS GERAIS (ISOLADO POR EMPRESA) */}
          {activeTab === 'general_data' && (
            <GeneralDataView
              data={activeGeneralData}
              stepsStatus={activeStepsStatus}
              onChange={handleUpdateGeneralData}
            />
          )}

          {/* ABA 2: AS 11 ETAPAS METODOLÓGICAS (ISOLADO POR EMPRESA) */}
          {activeTab === 'methodology' && (
            <>
              {/* Orientações Metodológicas do Topo (com suporte a Não se Aplica nas etapas 8, 9 e 10) */}
              <StepGuidance
                stepNumber={currentStep}
                title={activeGuidance.title}
                explanation={activeGuidance.explanation}
                questions={activeGuidance.questions}
                example={activeGuidance.example}
                isOptional={activeGuidance.isOptional}
                isNotApplicable={activeStepsStatus[currentStep] === 'not_applicable'}
                onToggleNotApplicable={() => {
                  const currentSt = activeStepsStatus[currentStep]
                  handleUpdateStepStatus(
                    currentStep,
                    currentSt === 'not_applicable' ? 'in_progress' : 'not_applicable'
                  )
                }}
              />

              {/* Renderização Condicional da Etapa Ativa */}
              {currentStep === 1 && <Step1Learnings />}
              {currentStep === 2 && <Step2BCG />}
              {currentStep === 3 && <Step3Identity />}
              {currentStep === 4 && <Step4SWOT />}
              {currentStep === 5 && <Step5BSC />}
              {currentStep === 6 && <Step6SalesGoals />}
              {currentStep === 8 && <Step8PLR />}
              {currentStep === 10 && <Step10ProcessCore />}
              {currentStep === 11 && (
                <Step11ActionPlan
                  actions={activeActions}
                  onUpdateActions={handleUpdateActions}
                />
              )}

              {/* Etapas 7 e 9 (Placeholder informativo para orçamento e satisfação) */}
              {(currentStep === 7 || currentStep === 9) && (
                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center py-16">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800 mb-1">
                    {METHODOLOGY_STEPS.find((s) => s.step_number === currentStep)?.title}
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
                    Grade e formulário configurados no banco de dados para projeções do ciclo anual.
                  </p>
                  <button
                    onClick={() => setCurrentStep(11)}
                    className="text-xs font-semibold px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                  >
                    Avançar para o Plano de Ações (Etapa 11) &rarr;
                  </button>
                </div>
              )}
            </>
          )}

          {/* ABA 3: ACOMPANHAMENTO MENSAL (Renomeado de RMR Mensal) */}
          {activeTab === 'monthly_tracking' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-800 mb-1">
                  Painel de Acompanhamento Mensal — {activeGeneralData.companyName}
                </h3>
                <p className="text-xs text-slate-500">
                  Acompanhe a execução contínua com a alta gestão: progresso das ações estratégicas, impedimentos e decisões tomadas mês a mês.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/40">
                  <span className="text-xs font-bold text-emerald-800">Ações Concluídas no Prazo</span>
                  <p className="text-2xl font-black text-emerald-900 mt-1">100%</p>
                  <p className="text-[11px] text-emerald-700 mt-1">Metas homologadas nas reuniões</p>
                </div>
                <div className="p-4 rounded-2xl border border-blue-200 bg-blue-50/40">
                  <span className="text-xs font-bold text-blue-800">Iniciativas Cadastradas</span>
                  <p className="text-2xl font-black text-blue-900 mt-1">{activeActions.length} ações</p>
                  <p className="text-[11px] text-blue-700 mt-1">Monitoramento contínuo</p>
                </div>
                <div className="p-4 rounded-2xl border border-rose-200 bg-rose-50/40">
                  <span className="text-xs font-bold text-rose-800">Atrasadas / Impedimentos</span>
                  <p className="text-2xl font-black text-rose-900 mt-1">0 ações</p>
                  <p className="text-[11px] text-rose-700 mt-1">Nenhum impedimento crítico</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modal e Visualização de PDF do Book Estratégico (Landscape / Horizontal - 100% dos Dados) */}
      {showBookModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
            {/* Barra Superior do Modal (Oculta na impressão) */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 no-print">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-800 text-sm">
                  Book Estratégico {activeGeneralData.year} — {activeGeneralData.companyName} [Formato Landscape]
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="text-xs font-semibold px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Imprimir / Salvar PDF (Landscape)
                </button>
                <button
                  type="button"
                  onClick={() => setShowBookModal(false)}
                  className="text-xs px-3 py-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </div>

            {/* Conteúdo Integral do Book Estratégico do 1 ao 11 sem cortes nem duplicação */}
            <div id="book-print-content" className="p-10 overflow-y-auto space-y-8 text-slate-800 text-xs bg-white">
              {/* Capa Executiva Horizontal (Landscape) */}
              <div className="text-center py-12 border-b-2 border-slate-900 page-break">
                <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-600 block mb-2">
                  DOCUMENTO OFICIAL DE PLANEJAMENTO ESTRATÉGICO
                </span>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                  BOOK ESTRATÉGICO {activeGeneralData.year}
                </h1>
                <h2 className="text-xl font-bold text-slate-700 mt-2">
                  {activeGeneralData.companyName}
                </h2>
                <div className="mt-6 flex items-center justify-center gap-4 text-xs text-slate-500">
                  {activeGeneralData.cnpj && <span>CNPJ: {activeGeneralData.cnpj}</span>}
                  <span>•</span>
                  <span>Setor: {activeGeneralData.segment}</span>
                  <span>•</span>
                  <span>Vigência: {activeGeneralData.startDate} a {activeGeneralData.endDate}</span>
                </div>
                <div className="mt-8 pt-4 border-t border-slate-200 max-w-xl mx-auto">
                  <p className="font-semibold text-slate-700 mb-1">Participantes e Lideranças:</p>
                  <p className="text-slate-600 italic">
                    {(activeGeneralData.participants || []).join(' • ') || 'Diretoria e Gestores'}
                  </p>
                </div>
              </div>

              {/* Etapa 1: Aprendizados do Ano Anterior */}
              <div className="space-y-3 page-break">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <span className="w-6 h-6 rounded bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">1</span>
                  <h3 className="text-base font-bold text-slate-900 uppercase">Aprendizados do Ano Anterior</h3>
                </div>
                <ul className="space-y-2 text-slate-700">
                  <li className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <strong>1. Escrever melhor as ações estratégicas com métricas claras</strong>
                    <p className="text-slate-500 mt-0.5">Observação: Inserir métricas e metas para cada ação e projeto.</p>
                  </li>
                  <li className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <strong>2. Acompanhar todas as ações mensalmente em reunião formal (Acompanhamento Mensal)</strong>
                    <p className="text-slate-500 mt-0.5">Observação: A cada trimestre fazer reunião para rever as ações/metas com a diretoria.</p>
                  </li>
                  <li className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <strong>3. Entender a causa real do problema antes de "sair fazendo"</strong>
                    <p className="text-slate-500 mt-0.5">Observação: Entender para atender e atuar na causa raiz.</p>
                  </li>
                </ul>
              </div>

              {/* Etapa 2: Matriz BCG (Posições Invertidas: Vaca Leiteira <-> Interrogação) */}
              <div className="space-y-3 page-break">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <span className="w-6 h-6 rounded bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">2</span>
                  <h3 className="text-base font-bold text-slate-900 uppercase">Matriz BCG do Portfólio de Produtos e Serviços</h3>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/30">
                    <strong className="text-emerald-800 block mb-1">🐄 Vaca Leiteira (Gera Caixa / Alta Participação):</strong>
                    <p>maxPedido (WinThor), maxGestão</p>
                  </div>
                  <div className="p-3 rounded-xl border border-indigo-200 bg-indigo-50/30">
                    <strong className="text-indigo-800 block mb-1">⭐ Estrela (Alto Crescimento e Alta Participação):</strong>
                    <p>maxRoteirizador, maxMotorista</p>
                  </div>
                  <div className="p-3 rounded-xl border border-rose-200 bg-rose-50/30">
                    <strong className="text-rose-800 block mb-1">🍍 Abacaxi (Baixo Crescimento e Baixa Participação):</strong>
                    <p>maxPronta Entrega, maxFarma</p>
                  </div>
                  <div className="p-3 rounded-xl border border-amber-200 bg-amber-50/30">
                    <strong className="text-amber-800 block mb-1">❓ Interrogação (Em Dúvida / Alta Taxa de Crescimento):</strong>
                    <p>maxPedido (Outros ERPs), maxPromotor</p>
                  </div>
                </div>
              </div>

              {/* Etapa 3: Identidade Organizacional */}
              <div className="space-y-3 page-break">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <span className="w-6 h-6 rounded bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">3</span>
                  <h3 className="text-base font-bold text-slate-900 uppercase">Identidade Organizacional</h3>
                </div>
                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <strong>Missão:</strong> Fortalecer o crescimento dos clientes através de soluções móveis e inteligentes para o ecossistema corporativo.
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <strong>Visão:</strong> Ser reconhecida como líder consolidada no segmento, superando o faturamento previsto com alta governança até o fim do ciclo.
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <strong>Valores:</strong> Simplicidade nos relacionamentos • Respeito ao ser humano • Comprometimento com os clientes e com o resultado • Trabalho em equipe
                  </div>
                </div>
              </div>

              {/* Etapa 4: Matriz SWOT */}
              <div className="space-y-3 page-break">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <span className="w-6 h-6 rounded bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">4</span>
                  <h3 className="text-base font-bold text-slate-900 uppercase">Matriz SWOT (Ambiente Interno e Externo)</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/30">
                    <strong className="text-emerald-800 block mb-1">Pontos Fortes (Forças):</strong>
                    <p>[F1] Know-how consolidado no segmento • [F2] Soluções integradas com múltiplos ERPs • [F3] Base de clientes referência</p>
                  </div>
                  <div className="p-3 rounded-xl border border-blue-200 bg-blue-50/30">
                    <strong className="text-blue-800 block mb-1">Oportunidades (Mercado):</strong>
                    <p>[O1] Consultoria de Vendas e Trade Marketing • [O2] Soluções móveis com Inteligência Artificial • [O3] Parcerias com indústrias</p>
                  </div>
                  <div className="p-3 rounded-xl border border-amber-200 bg-amber-50/30">
                    <strong className="text-amber-800 block mb-1">Pontos Fracos (Fraquezas):</strong>
                    <p>[P1] Baixa automação de testes de novas versões • [P2] Visibilidade online da oferta de Logística • [P3] Deficiência na capacitação de liderança</p>
                  </div>
                  <div className="p-3 rounded-xl border border-rose-200 bg-rose-50/30">
                    <strong className="text-rose-800 block mb-1">Ameaças (Riscos):</strong>
                    <p>[A1] Concorrência direta com soluções substitutas • [A2] Retenção e perda de talentos técnicos para o mercado</p>
                  </div>
                </div>
              </div>

              {/* Etapa 5: Mapa Estratégico BSC */}
              <div className="space-y-3 page-break">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <span className="w-6 h-6 rounded bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">5</span>
                  <h3 className="text-base font-bold text-slate-900 uppercase">Mapa Estratégico (Perspectivas BSC)</h3>
                </div>
                <div className="space-y-2">
                  <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900">
                    <strong>1. Financeira:</strong> F1. Manter Crescimento com Lucratividade Sustentável • F2. Reduzir Custos Operacionais • F3. Aumentar Receitas
                  </div>
                  <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-200 text-blue-900">
                    <strong>2. Clientes / Mercado:</strong> M1. Superar as Expectativas dos Clientes • M2. Fortalecer a Marca como Líder • M3. Consolidar Liderança Setorial
                  </div>
                  <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
                    <strong>3. Processos Internos:</strong> PI1. Garantir Qualidade de Software • PI2. Entender e Atender Demandas do Mercado • PI3. Eficiência Operacional • PI4. Conformidade
                  </div>
                  <div className="p-2.5 bg-purple-50 rounded-xl border border-purple-200 text-purple-900">
                    <strong>4. Aprendizado e Crescimento:</strong> AC1. Atrair e Reter Talentos • AC2. Desenvolver Competências Essenciais • AC3. Cultura Voltada à Inovação
                  </div>
                </div>
              </div>

              {/* Etapa 6: Metas de Vendas (3 Colunas Horizontais + Total) */}
              <div className="space-y-3 page-break">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <span className="w-6 h-6 rounded bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">6</span>
                  <h3 className="text-base font-bold text-slate-900 uppercase">Metas de Vendas (Calendário Anual)</h3>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <strong className="block text-slate-700 mb-1">1º Quadrimestre:</strong>
                    <p>Jan: R$ 329.000 • Fev: R$ 252.000 • Mar: R$ 269.000 • Abr: R$ 329.000</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <strong className="block text-slate-700 mb-1">2º Quadrimestre:</strong>
                    <p>Mai: R$ 627.000 • Jun: R$ 397.000 • Jul: R$ 409.000 • Ago: R$ 414.000</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <strong className="block text-slate-700 mb-1">3º Quadrimestre:</strong>
                    <p>Set: R$ 431.000 • Out: R$ 416.000 • Nov: R$ 403.000 • Dez: R$ 382.000</p>
                  </div>
                </div>
                <div className="p-3 bg-slate-900 text-white rounded-xl flex justify-between font-bold">
                  <span>Valor total de meta de venda anual:</span>
                  <span className="text-emerald-400 font-black">R$ 4.658.000,00</span>
                </div>
              </div>

              {/* Etapa 7: Orçamento Anual (DRE / EBITDA) */}
              <div className="space-y-3 page-break">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <span className="w-6 h-6 rounded bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">7</span>
                  <h3 className="text-base font-bold text-slate-900 uppercase">Orçamento Anual & DRE Projetado</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Receita Bruta Total</span>
                    <strong className="text-slate-800 text-sm">R$ 26.183.000,00</strong>
                    <p className="text-[10px] text-slate-500 mt-0.5">Recorrente + Implantação</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Deduções & Impostos</span>
                    <strong className="text-slate-800 text-sm">R$ 2.657.574,50</strong>
                    <p className="text-[10px] text-slate-500 mt-0.5">Tributos sobre receita</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Receita Líquida</span>
                    <strong className="text-indigo-700 text-sm">R$ 23.525.425,50</strong>
                    <p className="text-[10px] text-slate-500 mt-0.5">Base operacional</p>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                    <span className="text-[10px] text-emerald-700 font-bold uppercase block">EBITDA Projetado</span>
                    <strong className="text-emerald-900 text-sm">R$ 2.834.322,49 (12%)</strong>
                    <p className="text-[10px] text-emerald-700 mt-0.5">Gatilho base de distribuição</p>
                  </div>
                </div>
              </div>

              {/* Etapa 8: Critérios de PLR / Incentivos */}
              <div className="space-y-3 page-break">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <span className="w-6 h-6 rounded bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">8</span>
                  <h3 className="text-base font-bold text-slate-900 uppercase">Critérios e Regras de PLR / Incentivos</h3>
                </div>
                <ul className="space-y-2 text-xs">
                  <li className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <strong>1. Gatilho de EBITDA anual mínimo de 12% para abertura do pool de premiação</strong>
                    <p className="text-slate-500 mt-0.5">Observação: Caso o EBITDA não atinja 12% no consolidado anual, o programa não abre distribuição de bônus.</p>
                  </li>
                  <li className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <strong>2. Prêmio equivalente a 50% do salário nominal do colaborador por ano</strong>
                    <p className="text-slate-500 mt-0.5">Observação: Pagamentos trimestrais de 0,125 do salário nominal conforme atingimento das metas por diretoria.</p>
                  </li>
                  <li className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <strong>3. Pesquisa de Satisfação NPS Relacional acima de 58 pontos</strong>
                    <p className="text-slate-500 mt-0.5">Observação: Metas trimestrais: 1º Tri 57 • 2º Tri 58 • 3º Tri 59 • 4º Tri 60.</p>
                  </li>
                </ul>
              </div>

              {/* Etapa 9: Indicadores de Satisfação de Clientes */}
              <div className="space-y-3 page-break">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <span className="w-6 h-6 rounded bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">9</span>
                  <h3 className="text-base font-bold text-slate-900 uppercase">Satisfação de Clientes & Qualidade (NPS / CSAT)</h3>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-800">Meta Anual de NPS Relacional:</strong>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-lg text-xs">NPS 58+</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Evolução quadrimestral esperada: Q1 (54 a 56) • Q2 (56 a 58) • Q3 (58 a 60). Indicador vinculado ao bônus das diretorias de Atendimento, Produto e Suporte.
                  </p>
                </div>
              </div>

              {/* Etapa 10: Processos Core */}
              <div className="space-y-3 page-break">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <span className="w-6 h-6 rounded bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">10</span>
                  <h3 className="text-base font-bold text-slate-900 uppercase">Processos Core Prioritários</h3>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                  <p><strong>Central de Relacionamento:</strong> Atender e Reter Clientes (Remodelar fluxos proativos via Jira Service Desk).</p>
                  <p><strong>Suporte Técnico:</strong> Gerir Solicitações e SLA (Modelo baseado em níveis de resolução ágil).</p>
                  <p><strong>Implantação:</strong> Projeto Armstrong (Reduzir lead time de virada de sistema em novos clientes).</p>
                  <p><strong>Desenvolvimento e Negócio:</strong> Homologação SQA (100% dos releases certificados) e cerimônias de PO Review.</p>
                </div>
              </div>

              {/* Etapa 11: Plano de Ações Completo (Renderização 100% Completa de TODOS os Registros sem cortes) */}
              <div className="space-y-3 page-break">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">11</span>
                    <h3 className="text-base font-bold text-slate-900 uppercase">Plano de Ações e Projetos Estratégicos (5W2H)</h3>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                    {activeActions.length} {activeActions.length === 1 ? 'iniciativa cadastrada' : 'iniciativas cadastradas'}
                  </span>
                </div>

                <div className="overflow-x-visible border border-slate-300 rounded-xl">
                  <table className="w-full text-left text-[11px] border-collapse">
                    <thead className="bg-slate-100 text-slate-800 font-bold uppercase tracking-wider text-[10px] border-b border-slate-300">
                      <tr>
                        <th className="p-2 border-r border-slate-300">Ações Estratégicas</th>
                        <th className="p-2 border-r border-slate-300">Objetivo</th>
                        <th className="p-2 border-r border-slate-300">Indicador</th>
                        <th className="p-2 border-r border-slate-300">Meta</th>
                        <th className="p-2 border-r border-slate-300">Quem</th>
                        <th className="p-2 border-r border-slate-300">Data Inicial</th>
                        <th className="p-2 border-r border-slate-300">Data Fim</th>
                        <th className="p-2 border-r border-slate-300">BSC</th>
                        <th className="p-2 border-r border-slate-300">Diretriz Estratégica</th>
                        <th className="p-2">O que resolve do SWOT?</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {activeActions.map((act) => (
                        <tr key={act.id}>
                          <td className="p-2 font-bold border-r border-slate-200">{act.name}</td>
                          <td className="p-2 border-r border-slate-200 text-slate-600 leading-snug">{act.objective}</td>
                          <td className="p-2 border-r border-slate-200 font-medium text-slate-700">{act.kpi}</td>
                          <td className="p-2 font-semibold text-emerald-700 border-r border-slate-200">{act.target}</td>
                          <td className="p-2 border-r border-slate-200 whitespace-nowrap">{act.owner}</td>
                          <td className="p-2 border-r border-slate-200 whitespace-nowrap text-slate-500">{act.startDate}</td>
                          <td className="p-2 border-r border-slate-200 whitespace-nowrap text-slate-500">{act.endDate}</td>
                          <td className="p-2 border-r border-slate-200 font-bold text-indigo-700 whitespace-nowrap">{act.bscPerspective}</td>
                          <td className="p-2 border-r border-slate-200 text-slate-700 leading-snug">{act.bscGuideline}</td>
                          <td className="p-2 text-amber-800 text-[10px] leading-snug">{act.swotResolved}</td>
                        </tr>
                      ))}
                      {activeActions.length === 0 && (
                        <tr>
                          <td colSpan={10} className="p-4 text-center text-slate-400 italic">
                            Nenhuma ação estratégica cadastrada para esta empresa.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-300 text-center text-slate-500 text-[10px]">
                Book Estratégico Oficial — {activeGeneralData.companyName} • Gestão Estratégica Integrada
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
