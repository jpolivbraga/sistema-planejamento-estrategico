'use client'

import React, { useState } from 'react'
import {
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  Plus,
  Layers,
  TrendingUp,
  FileText,
  Users,
  Search,
  BookOpen,
  Lock,
  Compass,
  Target,
  BarChart3,
  ListTodo,
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react'
import { CycleStatus } from '@/types/database'

export interface CompanyCardData {
  id: string
  name: string
  segment: string
  cycleTitle: string
  year: number
  status: CycleStatus
  completedStepsCount: number // de 11
  totalActionsCount: number
  kpiHealth: 'good' | 'warning' | 'alert'
  lastMeetingDate?: string
  lastUpdated: string
}

interface HomeOverviewProps {
  companies: CompanyCardData[]
  userRole: 'admin' | 'observer'
  onSelectCompany: (companyId: string) => void
  onOpenNewCompany: () => void
  onToggleUserRole: () => void
}

export function HomeOverview({
  companies,
  userRole,
  onSelectCompany,
  onOpenNewCompany,
  onToggleUserRole,
}: HomeOverviewProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | CycleStatus>('all')

  // Filtros
  const filteredCompanies = companies.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.segment.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter

    // Se for observador, filtra apenas empresas com ciclo em validação ou aprovado
    if (userRole === 'observer' && c.status === 'draft') return false

    return matchesSearch && matchesStatus
  })

  // KPIs
  const totalActive = companies.length
  const totalDraft = companies.filter((c) => c.status === 'draft').length
  const totalReview = companies.filter((c) => c.status === 'in_review').length
  const totalApproved = companies.filter((c) => c.status === 'approved').length

  const getStatusBadge = (status: CycleStatus) => {
    switch (status) {
      case 'draft':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Em Construção
          </span>
        )
      case 'in_review':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-100 text-blue-800 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Em Validação
          </span>
        )
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <Lock className="w-3 h-3 text-emerald-600" />
            Aprovado (Book v1)
          </span>
        )
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Barra de Navegação Superior Global */}
      <header className="bg-white border-b border-slate-200 px-6 py-3.5 sticky top-0 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-700 flex items-center justify-center text-white shadow-md">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-extrabold text-slate-900 text-base leading-tight">
                Sistema de Planejamento Estratégico
              </h1>
              <p className="text-[11px] text-slate-500">
                Hub Executivo de Gestão • Metodologia Integrada
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Alternador de Perfil para Demonstração */}
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2">
                Visão:
              </span>
              <button
                onClick={onToggleUserRole}
                className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition ${
                  userRole === 'admin'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Admin (Consultora)
              </button>
              <button
                onClick={onToggleUserRole}
                className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition ${
                  userRole === 'observer'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Observador (Cliente)
              </button>
            </div>

            {userRole === 'admin' && (
              <button
                onClick={onOpenNewCompany}
                className="text-xs font-semibold px-3.5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Nova Empresa
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Conteúdo Principal do Hub */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 space-y-8">
        {/* Banner de Boas-Vindas */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 mb-3 backdrop-blur-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              {userRole === 'admin' ? 'Acesso Consultoria Master' : 'Portal do Observador / Alta Gestão'}
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight">
              {userRole === 'admin'
                ? 'Condução e Acompanhamento de Planejamentos Estratégicos'
                : 'Acompanhamento do Planejamento Estratégico Corporativo'}
            </h2>
            <p className="text-xs text-indigo-100/90 mt-2 leading-relaxed">
              {userRole === 'admin'
                ? 'Gerencie reuniões com diretores, preencha as 11 etapas do método com auto-save contínuo, compile o Book Estratégico em PDF e acompanhe as metas mensais (RMR) ao longo do ano.'
                : 'Consulte as diretrizes estratégicas aprovadas, o Book Oficial da sua empresa em PDF e os resultados das reuniões mensais de acompanhamento.'}
            </p>
          </div>
        </div>

        {/* 4 Cards de Indicadores do Portfólio (Visível para Admin) */}
        {userRole === 'admin' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Empresas Ativas
                </p>
                <p className="text-2xl font-extrabold text-slate-800 mt-1">{totalActive}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Sob consultoria</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-amber-600">
                  Em Construção
                </p>
                <p className="text-2xl font-extrabold text-slate-800 mt-1">{totalDraft}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Nas 11 etapas</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                  Em Validação
                </p>
                <p className="text-2xl font-extrabold text-slate-800 mt-1">{totalReview}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Revisão com sócios</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                  Planos Aprovados
                </p>
                <p className="text-2xl font-extrabold text-slate-800 mt-1">{totalApproved}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">RMR Mensal ativa</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
          </div>
        )}

        {/* Linha do Tempo Visual do Método (Didática das 4 Fases) */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-600" />
                O Método de Planejamento Estratégico em 4 Fases
              </h3>
              <p className="text-xs text-slate-500">
                Estrutura de condução das reuniões: do diagnóstico à execução mensal com a liderança.
              </p>
            </div>
            <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 self-start sm:self-auto">
              11 Etapas Integradas
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 relative">
              <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center mb-2 shadow-xs">
                1
              </span>
              <h4 className="text-xs font-bold text-slate-800">Diagnóstico & Identidade</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                Aprendizados do ano anterior, Matriz BCG do portfólio, Missão, Visão, Valores e Matriz SWOT.
              </p>
              <div className="mt-3 text-[10px] font-medium text-indigo-600 bg-white px-2 py-1 rounded-md border border-slate-200 inline-block">
                Etapas 1 a 4
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 relative">
              <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center mb-2 shadow-xs">
                2
              </span>
              <h4 className="text-xs font-bold text-slate-800">Diretrizes & Mapa BSC</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                Construção dos objetivos estratégicos em Financeiro, Clientes, Processos Internos e Aprendizado.
              </p>
              <div className="mt-3 text-[10px] font-medium text-indigo-600 bg-white px-2 py-1 rounded-md border border-slate-200 inline-block">
                Etapa 5 (BSC)
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 relative">
              <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center mb-2 shadow-xs">
                3
              </span>
              <h4 className="text-xs font-bold text-slate-800">Metas & Orçamento</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                Metas de Vendas mês a mês, DRE Orçamentário, Regras de PLR, Indicadores de NPS e Processos Core.
              </p>
              <div className="mt-3 text-[10px] font-medium text-indigo-600 bg-white px-2 py-1 rounded-md border border-slate-200 inline-block">
                Etapas 6 a 10
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 relative">
              <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center mb-2 shadow-xs">
                4
              </span>
              <h4 className="text-xs font-bold text-slate-800">Plano 5W2H & RMR</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                Ações com métrica dupla (Entrega vs. Resultado), geração do Book Estratégico e Reunião Mensal.
              </p>
              <div className="mt-3 text-[10px] font-medium text-indigo-600 bg-white px-2 py-1 rounded-md border border-slate-200 inline-block">
                Etapa 11 + Book
              </div>
            </div>
          </div>
        </div>

        {/* Portfólio de Empresas & Ciclos */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-800">
                {userRole === 'admin' ? 'Empresas em Planejamento' : 'Seu Planejamento Estratégico'}
              </h3>
              <p className="text-xs text-slate-500">
                Selecione um ciclo para abrir a mesa de trabalho, editar as etapas ou consultar o Book.
              </p>
            </div>

            {/* Filtros e Busca */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Buscar empresa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-xs pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white w-48"
                />
              </div>

              {userRole === 'admin' && (
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="text-xs px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none"
                >
                  <option value="all">Todos os Status</option>
                  <option value="draft">Em Construção</option>
                  <option value="in_review">Em Validação</option>
                  <option value="approved">Aprovado</option>
                </select>
              )}
            </div>
          </div>

          {/* Grid dos Cards de Empresas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCompanies.map((comp) => {
              const progressPct = Math.round((comp.completedStepsCount / 11) * 100)

              return (
                <div
                  key={comp.id}
                  className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between group"
                >
                  <div>
                    {/* Cabeçalho do Card */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg shadow-2xs group-hover:bg-indigo-600 group-hover:text-white transition">
                          <Building2 className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition">
                            {comp.name}
                          </h4>
                          <span className="text-[11px] text-slate-500">{comp.segment}</span>
                        </div>
                      </div>
                      {getStatusBadge(comp.status)}
                    </div>

                    {/* Ciclo Anual */}
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 mb-4">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                          {comp.cycleTitle}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {comp.completedStepsCount}/11 etapas
                        </span>
                      </div>

                      {/* Barra de Progresso */}
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>

                    {/* Estatísticas Rápidas */}
                    <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                      <div className="p-2 rounded-lg bg-slate-50/70 border border-slate-100">
                        <span className="text-[10px] text-slate-400 block font-medium">
                          Ações Estratégicas
                        </span>
                        <span className="font-bold text-slate-800 text-xs">
                          {comp.totalActionsCount} cadastradas
                        </span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50/70 border border-slate-100">
                        <span className="text-[10px] text-slate-400 block font-medium">
                          Última RMR
                        </span>
                        <span className="font-bold text-slate-800 text-xs">
                          {comp.lastMeetingDate || 'Agendar'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Rodapé e Botão de Ação */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">
                      Atualizado {comp.lastUpdated}
                    </span>
                    <button
                      onClick={() => onSelectCompany(comp.id)}
                      className="text-xs font-semibold px-3.5 py-1.5 rounded-xl bg-slate-900 text-white group-hover:bg-indigo-600 transition flex items-center gap-1 shadow-2xs"
                    >
                      {userRole === 'admin' ? 'Abrir Planejamento' : 'Consultar Book'}
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )
            })}

            {/* Card para Adicionar Nova Empresa (Admin) */}
            {userRole === 'admin' && (
              <button
                onClick={onOpenNewCompany}
                className="rounded-3xl border-2 border-dashed border-slate-200 hover:border-indigo-400 p-6 flex flex-col items-center justify-center text-center text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/20 transition min-h-[260px] group"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-100 group-hover:bg-indigo-100 text-slate-400 group-hover:text-indigo-600 flex items-center justify-center mb-3 transition shadow-xs">
                  <Plus className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-slate-700 group-hover:text-indigo-700">
                  Nova Empresa
                </h4>
                <p className="text-xs text-slate-400 max-w-xs mt-1">
                  Cadastre um novo cliente e inicie um ciclo anual com a metodologia pronta.
                </p>
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

