'use client'

import React, { useState } from 'react'
import {
  Building2,
  Calendar,
  Users,
  Plus,
  Trash2,
  CheckCircle2,
  TrendingUp,
  FileText,
  ShieldCheck,
  Check
} from 'lucide-react'
import { GeneralDataState, StepStatus, METHODOLOGY_STEPS } from '@/types/database'

interface GeneralDataViewProps {
  data: GeneralDataState
  stepsStatus: Record<number, StepStatus>
  onChange: (updated: GeneralDataState) => void
}

export function GeneralDataView({ data, stepsStatus, onChange }: GeneralDataViewProps) {
  const [newParticipant, setNewParticipant] = useState('')

  // Máscara de CNPJ: 00.000.000/0000-00
  const formatCnpj = (value: string) => {
    const numbers = value.replace(/\D/g, '').slice(0, 14)
    return numbers
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
  }

  // Regra de Negócio Crucial:
  // O progresso das 11 ETAPAS é a fonte primária do cálculo.
  // Conta quantas etapas estão completadas (ou marcadas como 'not_applicable')
  const completedSteps = METHODOLOGY_STEPS.filter((s) => {
    const status = stepsStatus[s.step_number]
    return status === 'completed' || status === 'not_applicable'
  }).length

  const totalSteps = 11
  const progressPercentage = Math.round((completedSteps / totalSteps) * 100)

  const handleFieldChange = (field: keyof GeneralDataState, value: any) => {
    onChange({ ...data, [field]: value })
  }

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFieldChange('cnpj', formatCnpj(e.target.value))
  }

  const handleAddParticipant = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newParticipant.trim()) return
    const updated = [...(data.participants || []), newParticipant.trim()]
    handleFieldChange('participants', updated)
    setNewParticipant('')
  }

  const handleRemoveParticipant = (index: number) => {
    const updated = data.participants.filter((_, idx) => idx !== index)
    handleFieldChange('participants', updated)
  }

  return (
    <div className="space-y-6">
      {/* Componente Visual de Barra de Carregamento (Alimentada pelas 11 Etapas) */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-3xl p-6 shadow-md border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-300">
              Progresso Consolidado do Ciclo
            </span>
            <h3 className="text-xl font-extrabold text-white mt-0.5">
              Etapas do Planejamento Estratégico
            </h3>
            <p className="text-xs text-indigo-200 mt-1">
              Alimentado automaticamente conforme o avanço nas 11 etapas metodológicas.
            </p>
          </div>

          <div className="text-left sm:text-right bg-white/10 px-4 py-2.5 rounded-2xl border border-white/10">
            <span className="text-2xl font-black text-emerald-400">
              {progressPercentage}%
            </span>
            <span className="text-xs text-slate-300 block">
              {completedSteps} de {totalSteps} etapas concluídas
            </span>
          </div>
        </div>

        {/* Barra de Progresso Visual */}
        <div className="w-full bg-white/15 h-3.5 rounded-full overflow-hidden p-0.5 border border-white/20">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-emerald-400 transition-all duration-700 shadow-sm"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Indicadores individuais das 11 etapas na barra */}
        <div className="grid grid-cols-6 sm:grid-cols-11 gap-1.5 mt-4 pt-3 border-t border-white/10 text-center">
          {METHODOLOGY_STEPS.map((s) => {
            const st = stepsStatus[s.step_number]
            const isDone = st === 'completed' || st === 'not_applicable'
            return (
              <div
                key={s.step_number}
                className={`py-1 px-1 rounded-lg text-[10px] font-bold border transition ${
                  isDone
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                    : 'bg-white/5 text-slate-400 border-white/10'
                }`}
                title={`Etapa ${s.step_number}: ${s.title}`}
              >
                E{s.step_number} {isDone ? '✓' : '○'}
              </div>
            )
          })}
        </div>
      </div>

      {/* Formulário dos Dados Gerais do Planejamento */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div>
          <h3 className="text-base font-bold text-slate-800">
            Informações e Parâmetros Gerais do PE
          </h3>
          <p className="text-xs text-slate-500">
            Dados cadastrais da empresa cliente, vigência do ciclo e lideranças participantes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Nome da Empresa */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Nome da Empresa / Razão Social
            </label>
            <input
              type="text"
              value={data.companyName}
              onChange={(e) => handleFieldChange('companyName', e.target.value)}
              placeholder="Ex: Máxima Sistemas S.A."
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Setor de Atuação */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Setor de Atuação
            </label>
            <input
              type="text"
              value={data.segment}
              onChange={(e) => handleFieldChange('segment', e.target.value)}
              placeholder="Ex: Tecnologia, Distribuição, Varejo, Jurídico..."
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* CNPJ (com máscara) */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              CNPJ (Opcional)
            </label>
            <input
              type="text"
              value={data.cnpj}
              onChange={handleCnpjChange}
              placeholder="00.000.000/0000-00"
              maxLength={18}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
            />
          </div>

          {/* Ano do Planejamento */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Ano do Planejamento
            </label>
            <input
              type="number"
              value={data.year}
              onChange={(e) => handleFieldChange('year', Number(e.target.value))}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 font-semibold"
            />
          </div>

          {/* Data Início do PE */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Data Início do PE
            </label>
            <input
              type="date"
              value={data.startDate}
              onChange={(e) => handleFieldChange('startDate', e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Data Fim do PE */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Data Fim do PE
            </label>
            <input
              type="date"
              value={data.endDate}
              onChange={(e) => handleFieldChange('endDate', e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Participantes do PE (Lista Dinâmica) */}
        <div className="pt-4 border-t border-slate-100">
          <label className="font-semibold text-slate-800 block text-xs mb-1.5 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-indigo-600" />
            Participantes do PE (Lideranças e Gestores Envolvidos)
          </label>
          <p className="text-[11px] text-slate-500 mb-3">
            Registre diretores, consultores e sócios presentes na condução do planejamento.
          </p>

          {/* Tags de participantes adicionados */}
          <div className="flex flex-wrap gap-2 mb-3">
            {(data.participants || []).map((p, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs"
              >
                <span>{p}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveParticipant(idx)}
                  className="text-slate-400 hover:text-rose-500 transition p-0.5"
                  title="Remover participante"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
            {(data.participants || []).length === 0 && (
              <span className="text-xs text-slate-400 italic">
                Nenhum participante adicionado ainda.
              </span>
            )}
          </div>

          {/* Input para adicionar participante */}
          <form onSubmit={handleAddParticipant} className="flex gap-2 max-w-md">
            <input
              type="text"
              value={newParticipant}
              onChange={(e) => setNewParticipant(e.target.value)}
              placeholder="Nome do participante (ex: Roberto - Diretor Comercial)..."
              className="flex-1 text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="text-xs font-semibold px-4 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition flex items-center gap-1 shadow-sm shrink-0"
            >
              <Plus className="w-4 h-4" />
              Adicionar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

