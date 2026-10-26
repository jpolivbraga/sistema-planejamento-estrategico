'use client'

import React from 'react'
import { Building2, Calendar, CheckCircle2, ChevronRight, FileText, Lock, ArrowLeft } from 'lucide-react'
import { CycleStatus } from '@/types/database'

interface HeaderProps {
  companyName: string
  cycleTitle: string
  cycleStatus: CycleStatus
  isSaved?: boolean
  onExportPdf?: () => void
  onToggleStatus?: () => void
  onBackToHome?: () => void
}

export function Header({
  companyName,
  cycleTitle,
  cycleStatus,
  isSaved = true,
  onExportPdf,
  onToggleStatus,
  onBackToHome,
}: HeaderProps) {
  const getStatusBadge = () => {
    switch (cycleStatus) {
      case 'draft':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Em Construção
          </span>
        )
      case 'in_review':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            Em Validação
          </span>
        )
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <Lock className="w-3 h-3 text-emerald-600" />
            Aprovado (Versão Congelada)
          </span>
        )
    }
  }

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 py-3.5 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Identificação da Empresa e Ciclo */}
        <div className="flex items-center gap-3">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition mr-1"
              title="Voltar ao Painel Geral de Empresas"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            <Building2 className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800 text-base">
                {companyName}
              </span>
              {getStatusBadge()}
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
              <span className="flex items-center gap-1 font-medium text-slate-700">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {cycleTitle}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-emerald-600 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {isSaved ? 'Alterações salvas' : 'Salvando...'}
              </span>
            </div>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleStatus}
            className="text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition flex items-center gap-1.5"
            title="Alterar status do planejamento"
          >
            Mudar Status
          </button>

          <button
            onClick={onExportPdf}
            className="text-xs font-semibold px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm transition flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            Gerar Book em PDF
          </button>
        </div>
      </div>
    </header>
  )
}
