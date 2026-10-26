'use client'

import React, { useState } from 'react'
import { Plus, Trash2, ShieldCheck, AlertTriangle, TrendingUp, Skull } from 'lucide-react'

type SwotType = 'strength' | 'weakness' | 'opportunity' | 'threat'

interface SwotItem {
  id: string
  category: SwotType
  code: string
  description: string
}

export function Step4SWOT() {
  const [items, setItems] = useState<SwotItem[]>([
    { id: '1', category: 'strength', code: 'F1', description: 'Know-how e liderança consolidada no segmento' },
    { id: '2', category: 'strength', code: 'F2', description: 'Soluções móveis integradas com principais ERPs' },
    { id: '3', category: 'weakness', code: 'P1', description: 'Baixa automação de testes e lentidão em novas versões' },
    { id: '4', category: 'weakness', code: 'P2', description: 'Baixa visibilidade da oferta de logística no canal online' },
    { id: '5', category: 'opportunity', code: 'O1', description: 'Consultoria de Trade Marketing e Logística' },
    { id: '6', category: 'opportunity', code: 'O2', description: 'Uso de inteligência de dados e IA nas soluções móveis' },
    { id: '7', category: 'threat', code: 'A1', description: 'Parceiro ERP lançar módulo concorrente interno' },
    { id: '8', category: 'threat', code: 'A2', description: 'Perda de talentos técnicos para o mercado global' },
  ])

  const [activeCategory, setActiveCategory] = useState<SwotType>('strength')
  const [newText, setNewText] = useState('')

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newText.trim()) return

    const categoryPrefix = {
      strength: 'F',
      weakness: 'P',
      opportunity: 'O',
      threat: 'A',
    }[activeCategory]

    const existingCount = items.filter((i) => i.category === activeCategory).length
    const newCode = `${categoryPrefix}${existingCount + 1}`

    setItems([
      ...items,
      {
        id: Math.random().toString(),
        category: activeCategory,
        code: newCode,
        description: newText.trim(),
      },
    ])
    setNewText('')
  }

  const handleRemove = (id: string) => {
    setItems(items.filter((i) => i.id !== id))
  }

  const renderQuadrant = (
    cat: SwotType,
    title: string,
    subtitle: string,
    icon: React.ReactNode,
    colorScheme: { badge: string; border: string; bg: string; codeBg: string }
  ) => {
    const list = items.filter((i) => i.category === cat)

    return (
      <div className={`p-4 rounded-2xl border ${colorScheme.border} ${colorScheme.bg} flex flex-col min-h-[260px]`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className={`p-1.5 rounded-lg ${colorScheme.badge}`}>{icon}</span>
            <div>
              <h4 className="text-xs font-bold text-slate-800">{title}</h4>
              <p className="text-[10px] text-slate-500">{subtitle}</p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-slate-400 bg-white/80 px-2 py-0.5 rounded-full border border-slate-200">
            {list.length}
          </span>
        </div>

        <div className="flex-1 space-y-2 mt-2">
          {list.map((item) => (
            <div
              key={item.id}
              className="bg-white/95 hover:bg-white border border-slate-200/80 p-2.5 rounded-xl text-xs text-slate-800 flex items-start justify-between shadow-xs transition group gap-2"
            >
              <div className="flex items-start gap-2">
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${colorScheme.codeBg}`}>
                  {item.code}
                </span>
                <span className="leading-snug">{item.description}</span>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-slate-300 hover:text-rose-500 transition opacity-0 group-hover:opacity-100 shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          {list.length === 0 && (
            <p className="text-center text-[11px] text-slate-400 py-6 italic">
              Nenhum item adicionado
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="text-base font-bold text-slate-800">
            Matriz SWOT (FOFA)
          </h3>
          <p className="text-xs text-slate-500">
            Mapeie o ambiente interno (Forças e Fraquezas) e externo (Oportunidades e Ameaças). Cada item recebe um código para amarração com o plano de ação.
          </p>
        </div>

        {/* Formulário rápido */}
        <form onSubmit={handleAddItem} className="flex items-center gap-2">
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value as SwotType)}
            className="text-xs px-2.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none"
          >
            <option value="strength">🛡️ Força</option>
            <option value="weakness">⚠️ Fraqueza</option>
            <option value="opportunity">📈 Oportunidade</option>
            <option value="threat">⚡ Ameaça</option>
          </select>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Descreva o ponto da matriz..."
            className="text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-60"
          />
          <button
            type="submit"
            className="text-xs font-semibold px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition flex items-center gap-1 shadow-sm shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            Adicionar
          </button>
        </form>
      </div>

      {/* Grade 2x2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderQuadrant(
          'strength',
          'Pontos Fortes (Ambiente Interno)',
          'Vantagens sobre concorrentes e diferenciais',
          <ShieldCheck className="w-4 h-4 text-emerald-600" />,
          {
            badge: 'bg-emerald-100 text-emerald-700',
            border: 'border-emerald-200/70',
            bg: 'bg-emerald-50/30',
            codeBg: 'bg-emerald-100 text-emerald-800',
          }
        )}

        {renderQuadrant(
          'opportunity',
          'Oportunidades (Ambiente Externo)',
          'Tendências positivas de mercado e tecnologia',
          <TrendingUp className="w-4 h-4 text-blue-600" />,
          {
            badge: 'bg-blue-100 text-blue-700',
            border: 'border-blue-200/70',
            bg: 'bg-blue-50/30',
            codeBg: 'bg-blue-100 text-blue-800',
          }
        )}

        {renderQuadrant(
          'weakness',
          'Pontos Fracos (Ambiente Interno)',
          'Gargalos, fraquezas e desvantagens a superar',
          <AlertTriangle className="w-4 h-4 text-amber-600" />,
          {
            badge: 'bg-amber-100 text-amber-700',
            border: 'border-amber-200/70',
            bg: 'bg-amber-50/30',
            codeBg: 'bg-amber-100 text-amber-800',
          }
        )}

        {renderQuadrant(
          'threat',
          'Ameaças (Ambiente Externo)',
          'Riscos de mercado, concorrentes e crises',
          <Skull className="w-4 h-4 text-rose-600" />,
          {
            badge: 'bg-rose-100 text-rose-700',
            border: 'border-rose-200/70',
            bg: 'bg-rose-50/30',
            codeBg: 'bg-rose-100 text-rose-800',
          }
        )}
      </div>
    </div>
  )
}
