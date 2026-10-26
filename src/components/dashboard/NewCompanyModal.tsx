'use client'

import React, { useState } from 'react'
import { X, Building2, Calendar, Sparkles } from 'lucide-react'

interface NewCompanyModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (company: { name: string; cnpj: string; segment: string; year: number }) => void
}

export function NewCompanyModal({ isOpen, onClose, onSave }: NewCompanyModalProps) {
  const [name, setName] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [segment, setSegment] = useState('')
  const [year, setYear] = useState(2027)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    onSave({ name: name.trim(), cnpj: cnpj.trim(), segment: segment.trim(), year })
    setName('')
    setCnpj('')
    setSegment('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Nova Empresa e Ciclo Estratégico</h3>
              <p className="text-[11px] text-slate-500">Cadastre a empresa para iniciar as 11 etapas</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Nome da Empresa / Razão Social</label>
            <input
              type="text"
              placeholder="Ex: Alfa Logística ou Roberta Advocacia..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Setor de Atuação</label>
              <input
                type="text"
                placeholder="Ex: Tecnologia, Varejo, Saúde..."
                value={segment}
                onChange={(e) => setSegment(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Ano do Planejamento</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">CNPJ (Opcional)</label>
            <input
              type="text"
              placeholder="00.000.000/0000-00"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
            />
          </div>

          <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl text-indigo-900 text-[11px] flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <p>
              O novo ciclo será criado com os modelos e orientações da consultora prontos para preenchimento durante as reuniões.
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-lg border border-slate-200 text-slate-600 font-medium hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow-sm"
            >
              Criar Planejamento
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

