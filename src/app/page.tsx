'use client'

import React, { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { SidebarSteps } from '@/components/layout/SidebarSteps'
import { StepGuidance } from '@/components/steps/StepGuidance'
import { Step1Learnings } from '@/components/steps/Step1Learnings'
import { Step2BCG } from '@/components/steps/Step2BCG'
import { Step3Identity } from '@/components/steps/Step3Identity'
import { Step4SWOT } from '@/components/steps/Step4SWOT'
import { Step5BSC } from '@/components/steps/Step5BSC'
import { Step11ActionPlan } from '@/components/steps/Step11ActionPlan'
import { HomeOverview, CompanyCardData } from '@/components/dashboard/HomeOverview'
import { NewCompanyModal } from '@/components/dashboard/NewCompanyModal'
import { CycleStatus, StepStatus, METHODOLOGY_STEPS } from '@/types/database'
import { BookOpen, FileCheck, CheckCircle2, ChevronRight, Download, Printer } from 'lucide-react'

export default function Dashboard() {
  // Controle de Navegação: 'home' (Hub Geral) ou 'workspace' (Dentro de uma empresa)
  const [viewMode, setViewMode] = useState<'home' | 'workspace'>('home')
  const [userRole, setUserRole] = useState<'admin' | 'observer'>('admin')
  const [isNewCompanyModalOpen, setIsNewCompanyModalOpen] = useState(false)

  // Lista de Empresas e Ciclos no Portfólio
  const [companies, setCompanies] = useState<CompanyCardData[]>([
    {
      id: 'maxima',
      name: 'Máxima Sistemas',
      segment: 'Tecnologia / Supply Chain',
      cycleTitle: 'Planejamento Estratégico 2027',
      year: 2027,
      status: 'draft',
      completedStepsCount: 6,
      totalActionsCount: 26,
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
      totalActionsCount: 14,
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
      totalActionsCount: 18,
      kpiHealth: 'good',
      lastMeetingDate: '02/10/2026',
      lastUpdated: 'há 5 dias',
    },
  ])

  // Empresa ativa no momento no Workspace
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('maxima')
  const activeCompany = companies.find((c) => c.id === selectedCompanyId) || companies[0]

  const [currentStep, setCurrentStep] = useState(1)
  const [activeTab, setActiveTab] = useState<'methodology' | 'monthly_tracking' | 'meetings'>('methodology')
  const [isSaved, setIsSaved] = useState(true)
  const [showBookModal, setShowBookModal] = useState(false)

  // Status das 11 etapas da empresa ativa
  const [stepsStatus, setStepsStatus] = useState<Record<number, StepStatus>>({
    1: 'completed',
    2: 'completed',
    3: 'completed',
    4: 'completed',
    5: 'completed',
    6: 'in_progress',
    7: 'not_started',
    8: 'not_applicable',
    9: 'in_progress',
    10: 'not_started',
    11: 'in_progress',
  })

  // Orientações didáticas
  const guidanceData: Record<
    number,
    { title: string; explanation: string; questions: string[]; example?: string; isOptional?: boolean }
  > = {
    1: {
      title: 'Aprendizados do Ano Anterior',
      explanation:
        'Aqui você inicia seu planejamento estratégico refletindo sobre as lições aprendidas do ano que passou para evitar repetir erros e alavancar o que deu certo.',
      questions: [
        'Que atividades, métodos e condições foram úteis?',
        'Os clientes e parceiros ficaram satisfeitos com o processo?',
        'O que não deu certo? Dê exemplos práticos e apresente as causas-raiz.',
      ],
      example:
        'Exemplo real da Máxima: "Não tratar ação estratégica de alta prioridade apenas como tarefa simples da rotina diária, e sim como Projeto com responsável e cobrança mensal."',
    },
    2: {
      title: 'Matriz BCG (Portfólio de Produtos e Serviços)',
      explanation:
        'Serve para analisar a carteira de produtos/serviços da empresa com base em Taxa de Crescimento de Mercado e Participação Relativa.',
      questions: [
        'Quais são seus produtos inovadores com alto potencial (Interrogações)?',
        'Quais geram alta rentabilidade mas demandam investimento contínuo (Estrelas)?',
        'Quais sustentam o balanço da empresa com baixo investimento (Vacas Leiteiras)?',
        'Quais têm baixo volume ou margem e devem ser descontinuados (Abacaxis)?',
      ],
      example:
        'Dica da Roberta: Liste todos os produtos/serviços e classifique com realismo sem apego emocional.',
    },
    3: {
      title: 'Identidade Organizacional',
      explanation:
        'A função da Missão é orientar e delimitar a atuação diária. A Visão é onde a empresa quer chegar no futuro com metas claras. Os Valores são as diretrizes de conduta.',
      questions: [
        'Qual o impacto prático que geramos na vida dos nossos clientes?',
        'Onde queremos estar posicionados e com qual faturamento nos próximos 3 a 5 anos?',
        'Quais princípios são inegociáveis para qualquer colaborador da equipe?',
      ],
    },
    4: {
      title: 'Matriz SWOT (Ambiente Interno e Externo)',
      explanation:
        'Identifique e analise os pontos-chave internos (Forças e Fraquezas) e externos (Oportunidades e Ameaças). Cada item recebe um código para alimentar o plano de ação.',
      questions: [
        'Forças: Quais os diferenciais competitivos e produtos de maior sucesso?',
        'Fraquezas: Onde ocorrem falhas operacionais, atrasos ou perda de clientes?',
        'Oportunidades: Que lacunas de mercado ou novas tecnologias podemos explorar?',
        'Ameaças: Que movimentos de concorrentes ou mudanças legais trazem risco?',
      ],
    },
    5: {
      title: 'Mapa Estratégico (BSC)',
      explanation:
        'Formulação do plano em 4 perspectivas: Financeira, Mercado/Clientes, Processos Internos e Aprendizado e Crescimento. Tudo na empresa deve se desdobrar destas macroações.',
      questions: [
        'Financeiro: Como garantir crescimento com lucratividade sustentável?',
        'Mercado: Como queremos fortalecer a marca e superar as expectativas dos clientes?',
        'Processos: Como otimizar a qualidade, conformidade e eliminar retrabalho?',
        'Aprendizado: Como atrair e reter talentos e desenvolver cultura de inovação?',
      ],
    },
    11: {
      title: 'Plano de Ações Estratégicas (Execução e Desdobramento)',
      explanation:
        'Desdobre os objetivos do Mapa Estratégico e as fraquezas da SWOT em projetos com responsável, prazo e métrica dupla (Entrega física vs. Indicador de Resultado).',
      questions: [
        'Qual objetivo do BSC esta ação atende?',
        'Qual fraqueza da SWOT ela ajuda a eliminar?',
        'Quem é o gestor responsável por cobrar e monitorar?',
        'Qual o indicador e a meta numérica esperada ao final?',
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
    const created: CompanyCardData = {
      id: Math.random().toString(),
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
    setSelectedCompanyId(created.id)
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

  // RENDERIZAÇÃO DO WORKSPACE DO CICLO DA EMPRESA SELECIONADA
  const activeGuidance = guidanceData[currentStep] || {
    title: METHODOLOGY_STEPS.find((s) => s.step_number === currentStep)?.title || 'Etapa',
    explanation: 'Preencha as informações desta etapa para compor o Book Estratégico.',
    questions: ['Revise as metas e decisões estratégicas com a liderança.'],
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header com Status, Auto-save e Voltar ao Painel Geral */}
      <Header
        companyName={activeCompany.name}
        cycleTitle={activeCompany.cycleTitle}
        cycleStatus={activeCompany.status}
        isSaved={isSaved}
        onToggleStatus={handleToggleStatus}
        onExportPdf={() => setShowBookModal(true)}
        onBackToHome={() => setViewMode('home')}
      />

      <div className="flex-1 flex">
        {/* Menu Lateral das 11 Etapas */}
        <SidebarSteps
          currentStep={currentStep}
          activeTab={activeTab}
          stepsStatus={stepsStatus}
          onSelectStep={(step) => setCurrentStep(step)}
          onSelectTab={(tab) => setActiveTab(tab)}
        />

        {/* Conteúdo Central da Etapa */}
        <main className="flex-1 p-8 max-w-6xl mx-auto w-full overflow-y-auto">
          {activeTab === 'methodology' ? (
            <>
              {/* Orientações Metodológicas do Topo */}
              <StepGuidance
                stepNumber={currentStep}
                title={activeGuidance.title}
                explanation={activeGuidance.explanation}
                questions={activeGuidance.questions}
                example={activeGuidance.example}
                isOptional={METHODOLOGY_STEPS.find((s) => s.step_number === currentStep)?.is_optional}
                isNotApplicable={stepsStatus[currentStep] === 'not_applicable'}
                onToggleNotApplicable={() => {
                  setStepsStatus({
                    ...stepsStatus,
                    [currentStep]:
                      stepsStatus[currentStep] === 'not_applicable' ? 'in_progress' : 'not_applicable',
                  })
                }}
              />

              {/* Renderização Condicional da Etapa Ativa */}
              {currentStep === 1 && <Step1Learnings />}
              {currentStep === 2 && <Step2BCG />}
              {currentStep === 3 && <Step3Identity />}
              {currentStep === 4 && <Step4SWOT />}
              {currentStep === 5 && <Step5BSC />}
              {currentStep === 11 && <Step11ActionPlan />}

              {/* Etapas 6 a 10 (Placeholder informativo) */}
              {currentStep >= 6 && currentStep <= 10 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center py-16">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800 mb-1">
                    {METHODOLOGY_STEPS.find((s) => s.step_number === currentStep)?.title}
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
                    Grade e formulário configurados no banco de dados para projeções mensais, orçamento e indicadores de acompanhamento.
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
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <h3 className="text-base font-bold text-slate-800 mb-2">
                Painel da Reunião Mensal com a Alta Gestão (RMR)
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Consulte o avanço das ações estratégicas, gargalos, decisões tomadas e comparação Meta vs. Realizado.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40">
                  <span className="text-xs font-bold text-emerald-800">Ações Concluídas</span>
                  <p className="text-2xl font-bold text-emerald-900 mt-1">100% no prazo</p>
                  <p className="text-[11px] text-emerald-700 mt-1">5 de 5 metas batidas</p>
                </div>
                <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40">
                  <span className="text-xs font-bold text-blue-800">Em Andamento</span>
                  <p className="text-2xl font-bold text-blue-900 mt-1">14 iniciativas</p>
                  <p className="text-[11px] text-blue-700 mt-1">Monitoramento mensal ativo</p>
                </div>
                <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40">
                  <span className="text-xs font-bold text-rose-800">Atrasadas / Impedimentos</span>
                  <p className="text-2xl font-bold text-rose-900 mt-1">2 ações</p>
                  <p className="text-[11px] text-rose-700 mt-1">Requerem decisão da diretoria</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modal de Pré-visualização do Book Estratégico */}
      {showBookModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-800 text-sm">
                  Book Estratégico — {activeCompany.name} ({activeCompany.cycleTitle})
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Imprimir / Salvar PDF
                </button>
                <button
                  onClick={() => setShowBookModal(false)}
                  className="text-xs px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200"
                >
                  Fechar
                </button>
              </div>
            </div>

            <div className="p-8 overflow-y-auto space-y-6 text-slate-800 text-xs">
              {/* Capa do Book */}
              <div className="text-center py-10 border-b border-slate-200">
                <span className="text-xs uppercase font-bold tracking-widest text-indigo-600">
                  Documento Oficial de Planejamento
                </span>
                <h1 className="text-2xl font-extrabold text-slate-900 mt-2">
                  BOOK ESTRATÉGICO {activeCompany.year}
                </h1>
                <p className="text-sm font-semibold text-slate-600 mt-1">{activeCompany.name}</p>
                <p className="text-[11px] text-slate-400 mt-4">
                  Versão 01 • Metodologia Executiva de Gestão
                </p>
              </div>

              {/* Sumário */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2">
                  Sumário Executivo
                </h4>
                <ul className="space-y-1 text-slate-600">
                  <li>1. Aprendizados do Ano Anterior</li>
                  <li>2. Matriz BCG do Portfólio de Produtos e Serviços</li>
                  <li>3. Identidade Organizacional (Missão, Visão e Valores)</li>
                  <li>4. Matriz SWOT (Forças, Fraquezas, Oportunidades e Ameaças)</li>
                  <li>5. Mapa Estratégico nas Perspectivas BSC</li>
                  <li>6. Metas e Orçamento Anual</li>
                  <li>7. Plano de Ações Estratégicas e Métricas de Resultado</li>
                </ul>
              </div>

              <p className="text-slate-500 italic text-center text-[11px]">
                O conteúdo aprovado é congelado e fica disponível para os Observadores autorizados consultarem durante todo o ano.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
