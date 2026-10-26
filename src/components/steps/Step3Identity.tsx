'use client'

import React, { useState } from 'react'
import { Target, Eye, Heart, Plus, X } from 'lucide-react'

export function Step3Identity() {
  const [mission, setMission] = useState(
    'Fortalecer o crescimento dos clientes através de soluções móveis para os segmentos da cadeia de abastecimento.'
  )
  const [vision, setVision] = useState(
    'Ser reconhecida como empresa líder em soluções móveis no mercado nacional, superando a receita líquida de 47 milhões até 2021.'
  )
  const [values, setValues] = useState<string[]>([
    'Simplicidade nos relacionamentos',
    'Respeito ao ser humano',
    'Comprometimento com as demandas do cliente e com o resultado',
    'Trabalho em equipe',
  ])
  const [newValue, setNewValue] = useState('')

  const handleAddValue = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newValue.trim()) return
    setValues([...values, newValue.trim()])
    setNewValue('')
  }

  const handleRemoveValue = (index: number) => {
    setValues(values.filter((_, i) => i !== index))
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
      <div>
        <h3 className="text-base font-bold text-slate-800">
          Identidade Organizacional
        </h3>
        <p className="text-xs text-slate-500">
          A base do planejamento: o propósito da empresa, a meta de longo prazo e os valores inegociáveis.
        </p>
      </div>

      {/* Missão */}
      <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/80">
        <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-2">
          <Target className="w-4 h-4 text-indigo-600" />
          Missão (Por que existimos?)
        </label>
        <textarea
          rows={2}
          value={mission}
          onChange={(e) => setMission(e.target.value)}
          placeholder="Descreva a razão de existir da empresa e a quem ela atende..."
          className="w-full text-xs text-slate-800 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
        />
      </div>

      {/* Visão */}
      <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/80">
        <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-2">
          <Eye className="w-4 h-4 text-emerald-600" />
          Visão (Onde queremos chegar e até quando?)
        </label>
        <textarea
          rows={2}
          value={vision}
          onChange={(e) => setVision(e.target.value)}
          placeholder="Onde a empresa quer estar nos próximos 3 a 5 anos (com métrica ou ano claro)..."
          className="w-full text-xs text-slate-800 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
        />
      </div>

      {/* Valores */}
      <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/80">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-rose-600" />
            Valores Organizacionais (Princípios que guiam o comportamento)
          </label>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {values.map((val, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-xs"
            >
              <span>{val}</span>
              <button
                onClick={() => handleRemoveValue(idx)}
                className="text-slate-400 hover:text-rose-500 transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>

        <form onSubmit={handleAddValue} className="flex gap-2">
          <input
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="Adicionar novo valor corporativo..."
            className="flex-1 text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
          />
          <button
            type="submit"
            className="text-xs font-semibold px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition flex items-center gap-1 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            Adicionar
          </button>
        </form>
      </div>
    </div>
  )
}
