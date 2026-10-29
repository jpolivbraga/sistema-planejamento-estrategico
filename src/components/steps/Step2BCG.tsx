'use client'

import React, { useState } from 'react'
import { Plus, Trash2, HelpCircle, Star, DollarSign, AlertCircle } from 'lucide-react'

export type BCGQuadrant = 'cash_cow' | 'star' | 'dog' | 'question_mark'

export interface BCGItem {
  id: string
  name: string
  quadrant: BCGQuadrant
}

export function Step2BCG() {
  const [items, setItems] = useState<BCGItem[]>([
    { id: '1', name: 'maxPedido (WinThor)', quadrant: 'cash_cow' },
    { id: '2', name: 'maxGestão', quadrant: 'cash_cow' },
    { id: '3', name: 'maxRoteirizador', quadrant: 'star' },
    { id: '4', name: 'maxMotorista', quadrant: 'star' },
    { id: '5', name: 'maxPronta Entrega', quadrant: 'dog' },
    { id: '6', name: 'maxFarma', quadrant: 'dog' },
    { id: '7', name: 'maxPedido (Outros ERPs)', quadrant: 'question_mark' },
    { id: '8', name: 'maxPromotor', quadrant: 'question_mark' },
  ])

  const [newItemName, setNewItemName] = useState('')
  const [selectedQuadrant, setSelectedQuadrant] = useState<BCGQuadrant>('cash_cow')

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newItemName.trim()) return
    setItems([
      ...items,
      { id: Math.random().toString(), name: newItemName.trim(), quadrant: selectedQuadrant },
    ])
    setNewItemName('')
  }

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const renderQuadrant = (
    quadrant: BCGQuadrant,
    title: string,
    subtitle: string,
    icon: React.ReactNode,
    badgeColor: string,
    bgColor: string
  ) => {
    const quadrantItems = items.filter((i) => i.quadrant === quadrant)

    return (
      <div className={`p-4 rounded-2xl border ${bgColor} flex flex-col min-h-[220px]`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className={`p-1.5 rounded-lg ${badgeColor}`}>{icon}</span>
            <div>
              <h4 className="text-xs font-bold text-slate-800">{title}</h4>
              <p className="text-[10px] text-slate-500">{subtitle}</p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-slate-400 bg-white/80 px-2 py-0.5 rounded-full border border-slate-200">
            {quadrantItems.length}
          </span>
        </div>

        <div className="flex-1 space-y-2 mt-2">
          {quadrantItems.map((item) => (
            <div
              key={item.id}
              className="bg-white/90 hover:bg-white border border-slate-200/80 p-2 rounded-xl text-xs font-medium text-slate-800 flex items-center justify-between shadow-xs transition group"
            >
              <span>{item.name}</span>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-slate-300 hover:text-rose-500 transition opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          {quadrantItems.length === 0 && (
            <p className="text-center text-[11px] text-slate-400 py-6 italic">
              Nenhum produto alocado
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-slate-800">
            Matriz BCG de Produtos e Serviços
          </h3>
          <p className="text-xs text-slate-500">
            Classifique cada linha de produto/serviço pela taxa de crescimento de mercado e participação.
          </p>
        </div>

        {/* Formulário rápido de alocação */}
        <form onSubmit={handleAddItem} className="flex items-center gap-2">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Nome do produto ou serviço..."
            className="text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-56"
          />
          <select
            value={selectedQuadrant}
            onChange={(e) => setSelectedQuadrant(e.target.value as BCGQuadrant)}
            className="text-xs px-2.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none"
          >
            <option value="cash_cow">🐄 Vaca Leiteira</option>
            <option value="star">⭐ Estrela</option>
            <option value="dog">🍍 Abacaxi</option>
            <option value="question_mark">❓ Interrogação</option>
          </select>
          <button
            type="submit"
            className="text-xs font-semibold px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition flex items-center gap-1 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            Adicionar
          </button>
        </form>
      </div>

      {/* Grid 2x2 da Matriz BCG (Posições Invertidas conforme solicitado: Vaca Leiteira <-> Interrogação) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Quadrante Superior Esquerdo: Vaca Leiteira */}
        {renderQuadrant(
          'cash_cow',
          'Vaca Leiteira',
          'Baixo crescimento de mercado / Alta participação (Gera Caixa)',
          <DollarSign className="w-4 h-4 text-emerald-600" />,
          'bg-emerald-100 text-emerald-700',
          'bg-emerald-50/40 border-emerald-200/60'
        )}

        {/* Quadrante Superior Direito: Estrela */}
        {renderQuadrant(
          'star',
          'Estrela',
          'Alto crescimento de mercado / Alta participação',
          <Star className="w-4 h-4 text-indigo-600" />,
          'bg-indigo-100 text-indigo-700',
          'bg-indigo-50/40 border-indigo-200/60'
        )}

        {/* Quadrante Inferior Esquerdo: Abacaxi */}
        {renderQuadrant(
          'dog',
          'Abacaxi (Cão)',
          'Baixo crescimento de mercado / Baixa participação',
          <AlertCircle className="w-4 h-4 text-rose-600" />,
          'bg-rose-100 text-rose-700',
          'bg-rose-50/40 border-rose-200/60'
        )}

        {/* Quadrante Inferior Direito: Interrogação (Em Dúvida) */}
        {renderQuadrant(
          'question_mark',
          'Interrogação (Em Dúvida)',
          'Alto crescimento de mercado / Baixa participação',
          <HelpCircle className="w-4 h-4 text-amber-600" />,
          'bg-amber-100 text-amber-700',
          'bg-amber-50/40 border-amber-200/60'
        )}
      </div>
    </div>
  )
}
