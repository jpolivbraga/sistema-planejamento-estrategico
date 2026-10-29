'use client'

import React, { useState } from 'react'
import { DollarSign, Calendar, TrendingUp } from 'lucide-react'

const MONTHS = [
  { id: 0, name: 'Janeiro', col: 1 },
  { id: 1, name: 'Fevereiro', col: 1 },
  { id: 2, name: 'Março', col: 1 },
  { id: 3, name: 'Abril', col: 1 },
  { id: 4, name: 'Maio', col: 2 },
  { id: 5, name: 'Junho', col: 2 },
  { id: 6, name: 'Julho', col: 2 },
  { id: 7, name: 'Agosto', col: 2 },
  { id: 8, name: 'Setembro', col: 3 },
  { id: 9, name: 'Outubro', col: 3 },
  { id: 10, name: 'Novembro', col: 3 },
  { id: 11, name: 'Dezembro', col: 3 },
]

export function Step6SalesGoals() {
  // Valores dos 12 meses em centavos ou numérico
  const [monthlyValues, setMonthlyValues] = useState<number[]>([
    329000, 252000, 269000, 329000,
    627000, 397000, 409000, 414000,
    431000, 416000, 403000, 382000,
  ])

  // Formatar número para Moeda Brasileira (R$)
  const formatCurrency = (val: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(val)
  }

  // Tratar alteração do input monetário
  const handleValueChange = (index: number, rawInput: string) => {
    // Limpar caracteres não numéricos
    const cleanNumbers = rawInput.replace(/\D/g, '')
    const numericValue = cleanNumbers ? parseFloat(cleanNumbers) / 100 : 0

    const updated = [...monthlyValues]
    updated[index] = numericValue
    setMonthlyValues(updated)
  }

  // Cálculo automático do total
  const totalSalesGoal = monthlyValues.reduce((acc, curr) => acc + (curr || 0), 0)

  // Separar meses em 3 colunas de 4 meses
  const col1 = MONTHS.filter((m) => m.col === 1)
  const col2 = MONTHS.filter((m) => m.col === 2)
  const col3 = MONTHS.filter((m) => m.col === 3)

  const renderMonthCard = (m: (typeof MONTHS)[0]) => {
    const currentValue = monthlyValues[m.id] || 0
    const formattedDisplay = formatCurrency(currentValue)

    return (
      <div
        key={m.id}
        className="bg-white border border-slate-200/90 rounded-xl p-3 shadow-2xs hover:border-indigo-200 transition"
      >
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-md bg-indigo-50 text-indigo-700 font-bold text-[10px] flex items-center justify-center">
              {m.id + 1}
            </span>
            {m.name}
          </span>
        </div>

        <div className="relative">
          <input
            type="text"
            value={formattedDisplay}
            onChange={(e) => handleValueChange(m.id, e.target.value)}
            className="w-full text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="R$ 0,00"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-800">
            Metas de Vendas (Calendário Anual)
          </h3>
          <p className="text-xs text-slate-500">
            Defina a previsão de receita de vendas mês a mês distribuída nas 3 colunas do ciclo anual.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          Previsão Consolidada
        </div>
      </div>

      {/* Grid em 3 Colunas Horizontais (4 meses em cada) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Coluna 1: Jan, Fev, Mar, Abr */}
        <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              1º Quadrimestre
            </h4>
            <span className="text-[10px] font-semibold text-slate-400">Jan — Abr</span>
          </div>
          <div className="space-y-3">{col1.map(renderMonthCard)}</div>
        </div>

        {/* Coluna 2: Mai, Jun, Jul, Ago */}
        <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              2º Quadrimestre
            </h4>
            <span className="text-[10px] font-semibold text-slate-400">Mai — Ago</span>
          </div>
          <div className="space-y-3">{col2.map(renderMonthCard)}</div>
        </div>

        {/* Coluna 3: Set, Out, Nov, Dez */}
        <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              3º Quadrimestre
            </h4>
            <span className="text-[10px] font-semibold text-slate-400">Set — Dez</span>
          </div>
          <div className="space-y-3">{col3.map(renderMonthCard)}</div>
        </div>
      </div>

      {/* Linha do Total Fixa / Sumário */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-indigo-200 block">
              Sumário Consolidado
            </span>
            <h4 className="text-sm font-semibold text-white">
              Valor total de meta de venda
            </h4>
          </div>
        </div>

        <div className="text-right">
          <span className="text-2xl font-extrabold text-emerald-400 tracking-tight">
            {formatCurrency(totalSalesGoal)}
          </span>
          <span className="text-[10px] text-slate-300 block">
            Soma acumulada dos 12 meses
          </span>
        </div>
      </div>
    </div>
  )
}

