'use client'

import React, { useState } from 'react'
import { Plus, Trash2, GripVertical } from 'lucide-react'

interface LearningItem {
  id: string
  order: number
  description: string
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
          { id: '1', order: 1, description: 'Escrever melhor as ações estratégicas com métricas claras' },
          { id: '2', order: 2, description: 'Acompanhar todas as ações mensalmente em reunião formal (RMR)' },
          { id: '3', order: 3, description: 'Entender a causa real do problema antes de "sair fazendo"' },
        ]
  )

  const handleChange = (id: string, text: string) => {
    const updated = items.map((item) => (item.id === id ? { ...item, description: text } : item))
    setItems(updated)
    onSave?.(updated)
  }

  const handleAddItem = () => {
    if (items.length >= 15) return
    const newItem: LearningItem = {
      id: Math.random().toString(),
      order: items.length + 1,
      description: '',
    }
    const updated = [...items, newItem]
    setItems(updated)
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
        {items.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center gap-3 bg-slate-50/60 hover:bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 transition group"
          >
            <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0">
              {index + 1}
            </span>
            <input
              type="text"
              value={item.description}
              onChange={(e) => handleChange(item.id, e.target.value)}
              placeholder={`Aprendizado #${index + 1} (ex: Não tratar meta de alta prioridade como tarefa simples do dia a dia)...`}
              className="flex-1 bg-transparent border-0 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-0"
            />
            <button
              onClick={() => handleRemoveItem(item.id)}
              className="text-slate-300 hover:text-rose-500 transition p-1 opacity-0 group-hover:opacity-100"
              title="Excluir item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
