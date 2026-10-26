'use client'

import React from 'react'
import { CheckCircle, Circle, MinusCircle, Clock, BarChart3, Users, BookOpen } from 'lucide-react'
import { METHODOLOGY_STEPS, StepStatus } from '@/types/database'

interface SidebarStepsProps {
  currentStep: number
  activeTab: 'methodology' | 'monthly_tracking' | 'meetings'
  stepsStatus: Record<number, StepStatus>
  onSelectStep: (stepNumber: number) => void
  onSelectTab: (tab: 'methodology' | 'monthly_tracking' | 'meetings') => void
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
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col h-[calc(100vh-65px)] overflow-y-auto">
      {/* Abas Superiores do Menu */}
      <div className="p-3 border-b border-slate-100 flex gap-1 bg-slate-50/70">
        <button
          onClick={() => onSelectTab('methodology')}
          className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
            activeTab === 'methodology'
              ? 'bg-white text-indigo-700 shadow-sm border border-slate-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          Etapas (11)
        </button>
        <button
          onClick={() => onSelectTab('monthly_tracking')}
          className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
            activeTab === 'monthly_tracking'
              ? 'bg-white text-indigo-700 shadow-sm border border-slate-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          RMR Mensal
        </button>
      </div>

      {activeTab === 'methodology' ? (
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
      ) : (
        <div className="p-4 text-xs text-slate-500">
          <p className="font-semibold text-slate-700 mb-2">Reuniões Mensais de Resultados</p>
          <p>Acompanhamento mensal das metas, indicadores e decisões tomadas com a alta gestão.</p>
        </div>
      )}
    </aside>
  )
}
