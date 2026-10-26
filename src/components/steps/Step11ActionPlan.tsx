'use client'

import React, { useState } from 'react'
import { Plus, Trash2, CheckCircle2, AlertCircle, Clock, Calendar, User, ArrowUpRight } from 'lucide-react'

interface ActionItem {
  id: string
  name: string
  bscObjective: string // ex: "F1 - Manter Crescimento"
  swotResolved: string // ex: "P1 (Baixa automação)"
  kpi: string          // Indicador
  target: string       // Meta
  owner: string        // Responsável
  startDate: string
  endDate: string
  deliveryStatus: 'not_started' | 'in_progress' | 'completed' | 'delayed'
  progressPct: number
}

export function Step11ActionPlan() {
  const [actions, setActions] = useState<ActionItem[]>([
    {
      id: '1',
      name: 'Vender via Inside Sales (Venda Interna)',
      bscObjective: 'F3. Aumentar Receitas',
      swotResolved: 'O1 (Trade Marketing)',
      kpi: 'CAC (Custo de Aquisição)',
      target: 'Redução de 20%',
      owner: 'Selva',
      startDate: '2027-01-02',
      endDate: '2027-06-30',
      deliveryStatus: 'completed',
      progressPct: 100,
    },
    {
      id: '2',
      name: 'Implantar área de SQA e automação de testes (Projeto JARVIS)',
      bscObjective: 'PI1. Garantir Qualidade dos Produtos',
      swotResolved: 'P1 (Automação de testes)',
      kpi: 'Produtos Homologados por SQA',
      target: '100% dos releases',
      owner: 'Luciano',
      startDate: '2027-01-15',
      endDate: '2027-05-31',
      deliveryStatus: 'in_progress',
      progressPct: 60,
    },
    {
      id: '3',
      name: 'Criar e implementar a Academia do Conhecimento',
      bscObjective: 'AC1. Atrair e Reter Talentos',
      swotResolved: 'P2 (Líderes não performando)',
      kpi: 'Colaboradores Certificados no Negócio',
      target: '80% da equipe técnica',
      owner: 'Katia + Luciano',
      startDate: '2027-02-01',
      endDate: '2027-12-15',
      deliveryStatus: 'in_progress',
      progressPct: 40,
    },
  ])

  const [isAdding, setIsAdding] = useState(false)
  const [newAction, setNewAction] = useState<Partial<ActionItem>>({
    deliveryStatus: 'not_started',
    progressPct: 0,
  })

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newAction.name?.trim()) return

    const item: ActionItem = {
      id: Math.random().toString(),
      name: newAction.name || '',
      bscObjective: newAction.bscObjective || 'F1. Manter Crescimento',
      swotResolved: newAction.swotResolved || 'Geral',
      kpi: newAction.kpi || 'Conclusão no prazo',
      target: newAction.target || '100%',
      owner: newAction.owner || 'A Definir',
      startDate: newAction.startDate || '2027-01-01',
      endDate: newAction.endDate || '2027-12-31',
      deliveryStatus: newAction.deliveryStatus || 'not_started',
      progressPct: Number(newAction.progressPct || 0),
    }

    setActions([...actions, item])
    setIsAdding(false)
    setNewAction({ deliveryStatus: 'not_started', progressPct: 0 })
  }

  const handleRemove = (id: string) => {
    setActions(actions.filter((a) => a.id !== id))
  }

  const getStatusBadge = (status: ActionItem['deliveryStatus']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="w-3 h-3" /> Concluído
          </span>
        )
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3" /> Em Andamento
          </span>
        )
      case 'delayed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-100 text-rose-800">
            <AlertCircle className="w-3 h-3" /> Atrasado
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
            Não Iniciado
          </span>
        )
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-800">
            Plano de Ações e Projetos Estratégicos (5W2H)
          </h3>
          <p className="text-xs text-slate-500">
            Cada ação é vinculada a uma diretriz do BSC e a uma fraqueza da SWOT, com clara separação entre a entrega física e o resultado medido.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="text-xs font-semibold px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition flex items-center gap-1.5 shadow-sm shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          Nova Ação Estratégica
        </button>
      </div>

      {/* Formulário Modal/Expansível de Nova Ação */}
      {isAdding && (
        <form onSubmit={handleCreate} className="bg-slate-50 p-4 rounded-xl border border-indigo-100 space-y-3">
          <h4 className="text-xs font-bold text-slate-800">Cadastrar Nova Ação / Projeto</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-medium text-slate-600 block mb-1">Nome da Ação</label>
              <input
                type="text"
                placeholder="Ex: Implantar novo modelo de atendimento..."
                value={newAction.name || ''}
                onChange={(e) => setNewAction({ ...newAction, name: e.target.value })}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-slate-600 block mb-1">Objetivo BSC Vinculado</label>
              <input
                type="text"
                placeholder="Ex: PI1. Garantir Qualidade..."
                value={newAction.bscObjective || ''}
                onChange={(e) => setNewAction({ ...newAction, bscObjective: e.target.value })}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-slate-600 block mb-1">O que resolve na SWOT?</label>
              <input
                type="text"
                placeholder="Ex: P1 (Baixa automação de testes)..."
                value={newAction.swotResolved || ''}
                onChange={(e) => setNewAction({ ...newAction, swotResolved: e.target.value })}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-medium text-slate-600 block mb-1">Indicador de Resultado</label>
                <input
                  type="text"
                  placeholder="Ex: NPS ou Tempo de Resposta"
                  value={newAction.kpi || ''}
                  onChange={(e) => setNewAction({ ...newAction, kpi: e.target.value })}
                  className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-slate-600 block mb-1">Meta</label>
                <input
                  type="text"
                  placeholder="Ex: > 60 ou -30%"
                  value={newAction.target || ''}
                  onChange={(e) => setNewAction({ ...newAction, target: e.target.value })}
                  className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white"
                />
              </div>
            </div>
            <div>
              <label className="text-[11px] font-medium text-slate-600 block mb-1">Responsável Principal</label>
              <input
                type="text"
                placeholder="Ex: Katia / Luciano"
                value={newAction.owner || ''}
                onChange={(e) => setNewAction({ ...newAction, owner: e.target.value })}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-medium text-slate-600 block mb-1">Data Início</label>
                <input
                  type="date"
                  value={newAction.startDate || ''}
                  onChange={(e) => setNewAction({ ...newAction, startDate: e.target.value })}
                  className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-slate-600 block mb-1">Data Término</label>
                <input
                  type="date"
                  value={newAction.endDate || ''}
                  onChange={(e) => setNewAction({ ...newAction, endDate: e.target.value })}
                  className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="text-xs font-semibold px-4 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Salvar Ação
            </button>
          </div>
        </form>
      )}

      {/* Tabela de Ações */}
      <div className="overflow-x-auto border border-slate-200 rounded-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider text-[10px] border-b border-slate-200">
            <tr>
              <th className="py-3 px-4 font-bold">Ação / Projeto</th>
              <th className="py-3 px-3 font-bold">Vínculo BSC</th>
              <th className="py-3 px-3 font-bold">Resolve na SWOT</th>
              <th className="py-3 px-3 font-bold">Indicador & Meta</th>
              <th className="py-3 px-3 font-bold">Responsável</th>
              <th className="py-3 px-3 font-bold">Prazo</th>
              <th className="py-3 px-3 font-bold">Status Entrega</th>
              <th className="py-3 px-2 font-bold text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {actions.map((act) => (
              <tr key={act.id} className="hover:bg-slate-50/70 transition group">
                <td className="py-3 px-4 font-semibold text-slate-800">
                  <div className="flex items-center gap-1.5">
                    <span>{act.name}</span>
                  </div>
                </td>
                <td className="py-3 px-3 text-slate-600">
                  <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-medium">
                    {act.bscObjective}
                  </span>
                </td>
                <td className="py-3 px-3 text-slate-600">
                  <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-medium">
                    {act.swotResolved}
                  </span>
                </td>
                <td className="py-3 px-3 text-slate-600">
                  <div>
                    <span className="font-medium text-slate-800">{act.kpi}</span>
                    <span className="text-slate-400 block text-[11px]">Meta: {act.target}</span>
                  </div>
                </td>
                <td className="py-3 px-3 text-slate-700 font-medium flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  {act.owner}
                </td>
                <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                  {act.endDate}
                </td>
                <td className="py-3 px-3">
                  {getStatusBadge(act.deliveryStatus)}
                </td>
                <td className="py-3 px-2 text-right">
                  <button
                    onClick={() => handleRemove(act.id)}
                    className="text-slate-300 hover:text-rose-500 p-1 opacity-0 group-hover:opacity-100 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
