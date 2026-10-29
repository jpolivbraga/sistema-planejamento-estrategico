export type UserRole = 'admin' | 'observer'
export type CycleStatus = 'draft' | 'in_review' | 'approved'
export type StepStatus = 'not_started' | 'in_progress' | 'completed' | 'not_applicable'

export interface Company {
  id: string
  name: string
  cnpj?: string | null
  segment?: string | null
  logo_url?: string | null
  created_at: string
}

export interface Cycle {
  id: string
  company_id: string
  title: string
  year: number
  status: CycleStatus
  current_version: number
  created_at: string
}

export interface StepInfo {
  step_number: number
  title: string
  subtitle: string
  is_optional?: boolean
}

export interface GeneralDataState {
  startDate: string
  endDate: string
  companyName: string
  segment: string
  year: number
  cnpj: string
  participants: string[]
}

export const METHODOLOGY_STEPS: StepInfo[] = [
  { step_number: 1, title: 'Aprendizados', subtitle: 'Lições do ano anterior' },
  { step_number: 2, title: 'Matriz BCG', subtitle: 'Portfólio de produtos e serviços' },
  { step_number: 3, title: 'Identidade', subtitle: 'Missão, Visão e Valores' },
  { step_number: 4, title: 'Matriz SWOT', subtitle: 'Forças, Fraquezas, Oportunidades e Ameaças' },
  { step_number: 5, title: 'Mapa Estratégico', subtitle: 'Perspectivas do BSC' },
  { step_number: 6, title: 'Metas de Vendas', subtitle: 'Previsão mensal por produto' },
  { step_number: 7, title: 'Orçamento Anual', subtitle: 'Receitas, custos e EBITDA' },
  { step_number: 8, title: 'PLR / Incentivos', subtitle: 'Regras de premiação', is_optional: true },
  { step_number: 9, title: 'Satisfação de Clientes', subtitle: 'NPS e indicadores de qualidade', is_optional: true },
  { step_number: 10, title: 'Processos Core', subtitle: 'Processos prioritários a mapear', is_optional: true },
  { step_number: 11, title: 'Plano de Ações', subtitle: 'Projetos e iniciativas 5W2H' },
]
