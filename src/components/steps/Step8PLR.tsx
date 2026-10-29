'use client'

import React, { useState } from 'react'
import { Plus, Trash2, StickyNote, ChevronUp } from 'lucide-react'

export interface PLRItem {
  id: string
  order: number
  description: string
  notes?: string
}

interface Step8PLRProps {
  initialItems?: PLRItem[]
  onSave?: (items: PLRItem[]) => void
}

export function Step8PLR({ initialItems = [], onSave }: Step8PLRProps) {
  const [items, setItems] = useState<PLRItem[]>(
    initialItems.length > 0
      ? initialItems
      : [
          {
            id: '1',
            order: 1,
            description: 'Gatilho de EBITDA anual mínimo de 12% para abertura do pool de premiação',
            notes: 'Caso o EBITDA não alcance o patamar mínimo, o programa não gera distribuição.',
          },
          {
            id: '2',
            order: 2,
            description: 'Prêmio equivalente a 50% do salário nominal do colaborador por ano',
            notes: 'Pagamento trimestral de 0,125 do salário nominal conforme atingimento das metas.',
          },
          {
            id: '3',
            order: 3,
            description: 'Pesquisa de Satisfação NPS Relacional acima de 58 pontos',
            notes: 'Meta por trimestre: 1º Tri 57, 2º Tri 58, 3º Tri 59, 4º Tri 60.',
          },
          {
            id: '4',
            order: 4,
            description: 'Implantação dos 14 processos core de operações homologados no prazo',
            notes: 'Aferido trimestralmente pelo comitê de governança.',
          },
        ]
  )

  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>({})

  const handleChangeDescription = (id: string, text: string) => {
    const updated = items.map((item) => (item.id === id ? { ...item, description: text } : item))
    setItems(updated)
    onSave?.(updated)
  }

  const handleChangeNotes = (id: string, text: string) => {
    const updated = items.map((item) => (item.id === id ? { ...item, notes: text } : item))
    setItems(updated)
    onSave?.(updated)
  }

  const toggleNotes = (id: string) => {
    setExpandedNotes((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleAddItem = () => {
    if (items.length >= 20) return
    const newItem: PLRItem = {
      id: Math.random().toString(),
      order: items.length + 1,
      description: '',
      notes: '',
    }
    const updated = [...items, newItem]
    setItems(updated)
    setExpandedNotes((prev) => ({ ...prev, [newItem.id]: true }))
    onSave?.(updated)
  }

  const handleRemoveItem = (id: string) => {
    const updated = items
      .filter((i) => i.id !== id)
      .map((item, index) => ({ ...item, order: index + 1 }))
    setItems(updated)
    onSave?.(updated)
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-800">
            Critérios e Regras de PLR / Incentivos
          </h3>
          <p className="text-xs text-slate-500">
            Cadastre os critérios, gatilhos de EBITDA e metas exigidas para a premiação dos colaboradores.
          </p>
        </div>
        <button
          onClick={handleAddItem}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          Adicionar Critério / Regra
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => {
          const isNoteOpen = !!expandedNotes[item.id]
          const hasNotes = Boolean(item.notes && item.notes.trim().length > 0)

          return (
            <div
              key={item.id}
              className="bg-slate-50/70 hover:bg-slate-50 border border-slate-200/80 rounded-xl p-3 transition group"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0">
                  {index + 1}
                </span>

                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => handleChangeDescription(item.id, e.target.value)}
                  placeholder={`Regra #${index + 1} (ex: Metas por trimestre com base em EBITDA e NPS)...`}
                  className="flex-1 bg-transparent border-0 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-0"
                />

                <div className="flex items-center gap-1 shrink-0">
                  {/* Ícone de Observações */}
                  <button
                    type="button"
                    onClick={() => toggleNotes(item.id)}
                    className={`p-1.5 rounded-lg transition flex items-center gap-1 text-xs font-medium ${
                      hasNotes
                        ? 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'
                        : 'text-slate-400 hover:text-indigo-600 hover:bg-slate-200/60'
                    }`}
                    title={isNoteOpen ? 'Ocultar observação' : 'Adicionar/Editar observação'}
                  >
                    <StickyNote className="w-4 h-4" />
                    {hasNotes && !isNoteOpen && (
                      <span className="text-[10px] bg-indigo-200 text-indigo-800 px-1 rounded-full">
                        1
                      </span>
                    )}
                  </button>

                  {/* Ícone de Excluir */}
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-slate-400 hover:text-rose-500 transition p-1.5 rounded-lg hover:bg-rose-50"
                    title="Excluir item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Campo Expansível de Observações */}
              {isNoteOpen && (
                <div className="mt-2.5 pt-2.5 border-t border-slate-200/80 pl-9 pr-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-semibold text-indigo-700 flex items-center gap-1">
                      <StickyNote className="w-3 h-3" />
                      Observações / Detalhes deste critério:
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleNotes(item.id)}
                      className="text-[10px] text-slate-400 hover:text-slate-600 flex items-center gap-0.5"
                    >
                      Recolher <ChevronUp className="w-3 h-3" />
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={item.notes || ''}
                    onChange={(e) => handleChangeNotes(item.id, e.target.value)}
                    placeholder="Escreva aqui observações, fórmulas, histórico de anos anteriores ou gatilhos..."
                    className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

