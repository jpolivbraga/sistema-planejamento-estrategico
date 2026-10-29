'use client'

import React, { useState } from 'react'
import { Plus, Trash2, StickyNote, ChevronDown, ChevronUp } from 'lucide-react'

export interface LearningItem {
  id: string
  order: number
  description: string
  notes?: string
  category?: string
}

interface Step1LearningsProps {
  initialItems?: LearningItem[]
  onSave?: (items: LearningItem[]) => void
}

export function Step1Learnings({ initialItems = [], onSave }: Step1LearningsProps) {
  const [items, setItems] = useState<LearningItem[]>(
    initialItems.length > 0
      ? initialItems
      : [
          {
            id: '1',
            order: 1,
            description: 'Escrever melhor as ações estratégicas com métricas claras',
            notes: 'Inserir métricas e metas para cada ação e projeto.',
          },
          {
            id: '2',
            order: 2,
            description: 'Acompanhar todas as ações mensalmente em reunião formal (Acompanhamento Mensal)',
            notes: 'A cada trimestre fazer reunião para rever as ações/metas com a diretoria.',
          },
          {
            id: '3',
            order: 3,
            description: 'Entender a causa real do problema antes de "sair fazendo"',
            notes: 'Entender para atender e atuar na causa raiz.',
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
    const newItem: LearningItem = {
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
            Lições Aprendidas no Ciclo Anterior
          </h3>
          <p className="text-xs text-slate-500">
            Registre os principais aprendizados para orientar a tomada de decisão do novo ano.
          </p>
        </div>
        <button
          onClick={handleAddItem}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          Adicionar Aprendizado
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
                  placeholder={`Aprendizado #${index + 1} (ex: Não tratar meta de alta prioridade como tarefa simples do dia a dia)...`}
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
                      Observações / Detalhes deste tópico:
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
                    placeholder="Escreva aqui observações, causas-raiz, evidências ou orientações específicas..."
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
