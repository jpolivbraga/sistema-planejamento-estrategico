'use client'

import React, { useState } from 'react'
import { Plus, Trash2, Cog, CheckCircle2, AlertCircle } from 'lucide-react'

export interface ProcessItem {
  id: string
  area: string
  name: string
  action: string
  owner: string
  status: 'Pendente' | 'Em Andamento' | 'Concluído'
}

export function Step10ProcessCore() {
  const [processes, setProcesses] = useState<ProcessItem[]>([
    { id: '1', area: 'Central de Relacionamento', name: 'Atender Cliente', action: 'Remodelar fluxo de atendimento', owner: 'Adriana', status: 'Em Andamento' },
    { id: '2', area: 'Central de Relacionamento', name: 'Monitorar e Reter Cliente', action: 'Criar régua de acompanhamento proativo', owner: 'Adriana', status: 'Pendente' },
    { id: '3', area: 'Suporte', name: 'Gerir Solicitações e SLA', action: 'Adotar Jira SD e modelo de resolução ágil', owner: 'Adriana', status: 'Em Andamento' },
    { id: '4', area: 'Implantação', name: 'Realizar Implantação (Projeto Armstrong)', action: 'Reduzir lead time de virada de sistema', owner: 'Adriana', status: 'Em Andamento' },
    { id: '5', area: 'Desenvolvimento e Produto', name: 'Planejar Roadmap e Release', action: 'Implantar cerimônia de PO Review', owner: 'Luciano', status: 'Pendente' },
    { id: '6', area: 'Desenvolvimento e Produto', name: 'Realizar Testes e Homologação (SQA)', action: 'Automatizar pipeline de testes de novas versões', owner: 'Luciano', status: 'Em Andamento' },
  ])

  const [newProcess, setNewProcess] = useState({ area: '', name: '', action: '', owner: '' })

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newProcess.name.trim()) return

    setProcesses([
      ...processes,
      {
        id: Math.random().toString(),
        area: newProcess.area || 'Operações',
        name: newProcess.name,
        action: newProcess.action || 'Mapear e padronizar',
        owner: newProcess.owner || 'A Definir',
        status: 'Pendente',
      },
    ])
    setNewProcess({ area: '', name: '', action: '', owner: '' })
  }

  const handleRemove = (id: string) => {
    setProcesses(processes.filter((p) => p.id !== id))
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-800">
            Processos Core Prioritários
          </h3>
          <p className="text-xs text-slate-500">
            Mapeie, padronize ou audite os processos críticos operacionais e de atendimento para garantir conformidade e qualidade.
          </p>
        </div>
      </div>

      {/* Formulário de Inclusão Rápida */}
      <form onSubmit={handleAdd} className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs grid grid-cols-1 md:grid-cols-4 gap-3">
        <div>
          <label className="text-[11px] font-semibold text-slate-600 block mb-1">Área / Diretoria</label>
          <input
            type="text"
            placeholder="Ex: Suporte ou Implantação..."
            value={newProcess.area}
            onChange={(e) => setNewProcess({ ...newProcess, area: e.target.value })}
            className="w-full p-2 rounded-lg border border-slate-200 bg-white"
          />
        </div>
        <div>
          <label className="text-[11px] font-semibold text-slate-600 block mb-1">Processo</label>
          <input
            type="text"
            placeholder="Ex: Atendimento ao Cliente..."
            value={newProcess.name}
            onChange={(e) => setNewProcess({ ...newProcess, name: e.target.value })}
            className="w-full p-2 rounded-lg border border-slate-200 bg-white"
            required
          />
        </div>
        <div>
          <label className="text-[11px] font-semibold text-slate-600 block mb-1">Ação / Desafio</label>
          <input
            type="text"
            placeholder="Ex: Remodelar conforme novo fluxo..."
            value={newProcess.action}
            onChange={(e) => setNewProcess({ ...newProcess, action: e.target.value })}
            className="w-full p-2 rounded-lg border border-slate-200 bg-white"
          />
        </div>
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">Responsável</label>
            <input
              type="text"
              placeholder="Ex: Adriana"
              value={newProcess.owner}
              onChange={(e) => setNewProcess({ ...newProcess, owner: e.target.value })}
              className="w-full p-2 rounded-lg border border-slate-200 bg-white"
            />
          </div>
          <button
            type="submit"
            className="px-3.5 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition flex items-center gap-1 shrink-0"
          >
            <Plus className="w-4 h-4" />
            Adicionar
          </button>
        </div>
      </form>

      {/* Tabela de Processos */}
      <div className="overflow-x-auto border border-slate-200 rounded-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider text-[10px] border-b border-slate-200">
            <tr>
              <th className="py-3 px-4 font-bold">Área / Diretoria</th>
              <th className="py-3 px-3 font-bold">Processo</th>
              <th className="py-3 px-3 font-bold">Desafio / Ação em 2027</th>
              <th className="py-3 px-3 font-bold">Responsável</th>
              <th className="py-3 px-3 font-bold">Situação</th>
              <th className="py-3 px-2 font-bold text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {processes.map((proc) => (
              <tr key={proc.id} className="hover:bg-slate-50/70 transition group">
                <td className="py-3 px-4 font-medium text-slate-700">
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                    {proc.area}
                  </span>
                </td>
                <td className="py-3 px-3 font-bold text-slate-800">{proc.name}</td>
                <td className="py-3 px-3 text-slate-600">{proc.action}</td>
                <td className="py-3 px-3 text-slate-700 font-medium">{proc.owner}</td>
                <td className="py-3 px-3">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                      proc.status === 'Concluído'
                        ? 'bg-emerald-100 text-emerald-800'
                        : proc.status === 'Em Andamento'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {proc.status}
                  </span>
                </td>
                <td className="py-3 px-2 text-right">
                  <button
                    onClick={() => handleRemove(proc.id)}
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

