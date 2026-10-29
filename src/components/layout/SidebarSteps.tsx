'use client'

import React from 'react'
import {
  CheckCircle,
  Circle,
  MinusCircle,
  Clock,
  BarChart3,
  BookOpen,
  Info
} from 'lucide-react'
import { METHODOLOGY_STEPS, StepStatus } from '@/types/database'

export type ActiveTabType = 'general_data' | 'methodology' | 'monthly_tracking'

interface SidebarStepsProps {
  currentStep: number
  activeTab: ActiveTabType
  stepsStatus: Record<number, StepStatus>
  onSelectStep: (stepNumber: number) => void
  onSelectTab: (tab: ActiveTabType) => void
}

export function SidebarSteps({
  currentStep,
  activeTab,
  stepsStatus,
  onSelectStep,
  onSelectTab,
}: SidebarStepsProps) {
  const getStatusIcon = (status?: StepStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
      case 'in_progress':
        return <Clock className="w-4 h-4 text-amber-500 shrink-0" />
      case 'not_applicable':
        return <MinusCircle className="w-4 h-4 text-slate-400 shrink-0" />
      default:
        return <Circle className="w-4 h-4 text-slate-300 shrink-0" />
    }
  }

  return (
    <aside className="w-80 bg-white border-r border-slate-200 flex flex-col h-[calc(100vh-65px)] overflow-y-auto">
      {/* Abas Superiores do Menu: Dados Gerais (à esquerda), Etapas (11), Acompanhamento Mensal */}
      <div className="p-2 border-b border-slate-100 grid grid-cols-3 gap-1 bg-slate-50/70">
        {/* 1. Dados Gerais (posicionada à esquerda) */}
        <button
          type="button"
          onClick={() => onSelectTab('general_data')}
          className={`py-2 px-1.5 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 transition ${
            activeTab === 'general_data'
              ? 'bg-white text-indigo-700 shadow-xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
          title="Dados Gerais do Planejamento"
        >
          <Info className="w-3.5 h-3.5" />
          <span>Gerais</span>
        </button>

        {/* 2. Etapas (11) */}
        <button
          type="button"
          onClick={() => onSelectTab('methodology')}
          className={`py-2 px-1.5 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 transition ${
            activeTab === 'methodology'
              ? 'bg-white text-indigo-700 shadow-xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
          title="As 11 Etapas Metodológicas"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Etapas (11)</span>
        </button>

        {/* 3. Acompanhamento Mensal (renomeado de RMR Mensal) */}
        <button
          type="button"
          onClick={() => onSelectTab('monthly_tracking')}
          className={`py-2 px-1.5 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 transition ${
            activeTab === 'monthly_tracking'
              ? 'bg-white text-indigo-700 shadow-xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
          title="Acompanhamento Mensal de Resultados"
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Acompanh.</span>
        </button>
      </div>

      {activeTab === 'methodology' && (
        <div className="p-3 space-y-1">
          <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Ciclo Estratégico
          </div>
          {METHODOLOGY_STEPS.map((step) => {
            const isActive = currentStep === step.step_number
            const status = stepsStatus[step.step_number] || 'not_started'

            return (
              <button
                key={step.step_number}
                onClick={() => onSelectStep(step.step_number)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium transition flex items-center justify-between group ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-900 font-semibold ring-1 ring-indigo-200 shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100/70'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 ${
                      isActive
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                    }`}
                  >
                    {step.step_number}
                  </span>
                  <div className="truncate">
                    <p className="truncate text-slate-800">{step.title}</p>
                    <p className="text-[10px] text-slate-400 font-normal truncate">
                      {step.subtitle}
                    </p>
                  </div>
                </div>
                {getStatusIcon(status)}
              </button>
            )
          })}
        </div>
      )}

      {activeTab === 'general_data' && (
        <div className="p-4 text-xs text-slate-500 space-y-3">
          <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 text-indigo-950">
            <p className="font-bold text-xs mb-1">Seção de Dados Gerais</p>
            <p className="text-[11px] leading-relaxed">
              Consulte e edite os dados cadastrais da empresa, datas do ciclo e participantes. A barra de progresso é atualizada pelas 11 etapas.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'monthly_tracking' && (
        <div className="p-4 text-xs text-slate-500 space-y-3">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
            <p className="font-bold text-xs mb-1">Acompanhamento Mensal</p>
            <p className="text-[11px] leading-relaxed">
              Monitoramento mês a mês das ações estratégicas, indicadores de resultado e decisões tomadas com a alta gestão.
            </p>
          </div>
        </div>
      )}
    </aside>
  )
}
