'use client'

import React, { useState } from 'react'
import { Plus, Trash2, Calendar, User, ArrowUpRight } from 'lucide-react'

export interface ActionItem {
  id: string
  name: string            // 1. Ações Estratégicas
  objective: string       // 2. Objetivo
  kpi: string             // 3. Indicador
  target: string          // 4. Meta
  owner: string           // 5. Quem
  startDate: string       // 6. Data Inicial
  endDate: string         // 7. Data Fim
  bscPerspective: string  // 8. BSC (ex: Fin, Mer, Proc, Pess)
  bscGuideline: string    // 9. Diretriz Estratégica
  swotResolved: string    // 10. O que resolve do SWOT?
}

interface Step11ActionPlanProps {
  actions?: ActionItem[]
  onUpdateActions?: (actions: ActionItem[]) => void
}

export function Step11ActionPlan({
  actions: controlledActions,
  onUpdateActions,
}: Step11ActionPlanProps) {
  const defaultActions: ActionItem[] = [
    {
      id: '1',
      name: 'Gerir orçamento',
      objective: 'Garantir o EBITDA da empresa e manter o orçamento previsto',
      kpi: 'EBITDA',
      target: '13%',
      owner: 'Katia',
      startDate: '2027-01-02',
      endDate: '2027-12-31',
      bscPerspective: 'Fin',
      bscGuideline: 'F.1 Manter o Crescimento com Lucratividade Sustentável',
      swotResolved: 'Manter margem e sustentabilidade financeira',
    },
    {
      id: '2',
      name: 'Vender via Inside Sales (venda interna)',
      objective: 'Reduzir custo de aquisição de clientes (CAC) e o ciclo de venda',
      kpi: 'CAC / Ciclo de Venda',
      target: 'Redução de 20%',
      owner: 'Selva',
      startDate: '2027-01-02',
      endDate: '2027-06-28',
      bscPerspective: 'Fin',
      bscGuideline: 'F.3 Aumentar Receitas',
      swotResolved: 'O1 Consultoria para Vendas em Atacado',
    },
    {
      id: '3',
      name: 'Migrar 240 clientes do Pedido de Venda para o maxPedido',
      objective: 'Aumentar a satisfação e modernizar a carteira de clientes',
      kpi: 'Clientes Migrados',
      target: '240 clientes',
      owner: 'Adriana',
      startDate: '2027-01-10',
      endDate: '2027-12-31',
      bscPerspective: 'Mer',
      bscGuideline: 'M.1 Superar as Expectativas dos Clientes',
      swotResolved: 'F2 Soluções integradas com principais ERPs',
    },
    {
      id: '4',
      name: 'Dar visibilidade das soluções de Logística na 1ª página do Google',
      objective: 'Desenvolver a autoridade da marca no mercado digital',
      kpi: 'Posicionamento de Busca',
      target: '1ª página do Google',
      owner: 'Selva',
      startDate: '2027-01-15',
      endDate: '2027-05-31',
      bscPerspective: 'Mer',
      bscGuideline: 'M.2 Fortalecer a Marca como Líder no Mercado de Atuação',
      swotResolved: '* Baixa visibilidade da oferta Logística no mundo on-line',
    },
    {
      id: '5',
      name: 'Criar e implementar projeto de segurança e blindagem',
      objective: 'Blindar a hospedagem em nuvem e segurança de dados',
      kpi: 'Índice de Vulnerabilidade',
      target: '0 falhas críticas',
      owner: 'Fabiano',
      startDate: '2027-01-15',
      endDate: '2027-06-28',
      bscPerspective: 'Proc',
      bscGuideline: 'PI.1 Garantir Qualidade dos Produtos e Serviços',
      swotResolved: 'Vulnerabilidade na segurança de dados',
    },
    {
      id: '6',
      name: 'Implantar área de SQA e automação de testes (Projeto JARVIS)',
      objective: 'Garantir qualidade contínua e maturidade na liberação de software',
      kpi: 'Produtos Homologados por SQA',
      target: '100% dos releases',
      owner: 'Luciano',
      startDate: '2027-01-15',
      endDate: '2027-05-31',
      bscPerspective: 'Proc',
      bscGuideline: 'PI.1 Garantir Qualidade dos Produtos e Serviços',
      swotResolved: '* Baixo nível de maturidade no processo GCS (Gerência de Configuração)',
    },
    {
      id: '7',
      name: 'Criar e implementar a Academia do Conhecimento',
      objective: 'Certificar a equipe no negócio e aproximar a empresa de universidades',
      kpi: 'Nº de Certificados / Eventos',
      target: '80% da equipe técnica',
      owner: 'Katia + Luciano',
      startDate: '2027-01-15',
      endDate: '2027-12-15',
      bscPerspective: 'Pess',
      bscGuideline: 'AC.1 Atrair e Reter Talentos',
      swotResolved: '* Baixa qualificação em negócio e descumprimento de SLA',
    },
  ]

  const [localActions, setLocalActions] = useState<ActionItem[]>(defaultActions)
  const actions = controlledActions || localActions

  const setActions = (updated: ActionItem[]) => {
    if (onUpdateActions) {
      onUpdateActions(updated)
    } else {
      setLocalActions(updated)
    }
  }

  const [isAdding, setIsAdding] = useState(false)
  const [newAction, setNewAction] = useState<Partial<ActionItem>>({
    bscPerspective: 'Fin',
  })

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newAction.name?.trim()) return

    const item: ActionItem = {
      id: Math.random().toString(),
      name: newAction.name || '',
      objective: newAction.objective || '',
      kpi: newAction.kpi || 'Conclusão no prazo',
      target: newAction.target || '100%',
      owner: newAction.owner || 'A Definir',
      startDate: newAction.startDate || '2027-01-01',
      endDate: newAction.endDate || '2027-12-31',
      bscPerspective: newAction.bscPerspective || 'Fin',
      bscGuideline: newAction.bscGuideline || 'F.1 Manter o Crescimento com Lucratividade',
      swotResolved: newAction.swotResolved || '-',
    }

    setActions([...actions, item])
    setIsAdding(false)
    setNewAction({ bscPerspective: 'Fin' })
  }

  const handleRemove = (id: string) => {
    setActions(actions.filter((a) => a.id !== id))
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-800">
            Plano de Ações e Projetos Estratégicos (Desdobramento)
          </h3>
          <p className="text-xs text-slate-500">
            Cada ação é mapeada rigorosamente com seu objetivo, indicador, meta, responsável, datas, perspectiva BSC, diretriz e amarração na SWOT.
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

      {/* Formulário Modal / Expansível */}
      {isAdding && (
        <form onSubmit={handleCreate} className="bg-slate-50 p-5 rounded-2xl border border-indigo-100 space-y-4">
          <h4 className="text-xs font-bold text-slate-800">Cadastrar Nova Ação Estratégica</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {/* 1. Ação Estratégica */}
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                1. Ação Estratégica
              </label>
              <input
                type="text"
                placeholder="Ex: Implantar novo modelo de atendimento..."
                value={newAction.name || ''}
                onChange={(e) => setNewAction({ ...newAction, name: e.target.value })}
                className="w-full p-2 rounded-lg border border-slate-200 bg-white"
                required
              />
            </div>

            {/* 2. Objetivo */}
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                2. Objetivo
              </label>
              <input
                type="text"
                placeholder="Ex: Garantir atendimento com resoluções mais ágeis..."
                value={newAction.objective || ''}
                onChange={(e) => setNewAction({ ...newAction, objective: e.target.value })}
                className="w-full p-2 rounded-lg border border-slate-200 bg-white"
                required
              />
            </div>

            {/* 3. Indicador */}
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                3. Indicador
              </label>
              <input
                type="text"
                placeholder="Ex: NPS Relacional / CAC / % SLA"
                value={newAction.kpi || ''}
                onChange={(e) => setNewAction({ ...newAction, kpi: e.target.value })}
                className="w-full p-2 rounded-lg border border-slate-200 bg-white"
                required
              />
            </div>

            {/* 4. Meta */}
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                4. Meta
              </label>
              <input
                type="text"
                placeholder="Ex: > 58 pontos / 90% no prazo"
                value={newAction.target || ''}
                onChange={(e) => setNewAction({ ...newAction, target: e.target.value })}
                className="w-full p-2 rounded-lg border border-slate-200 bg-white"
                required
              />
            </div>

            {/* 5. Quem */}
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                5. Quem (Responsável)
              </label>
              <input
                type="text"
                placeholder="Ex: Selva / Adriana / Luciano"
                value={newAction.owner || ''}
                onChange={(e) => setNewAction({ ...newAction, owner: e.target.value })}
                className="w-full p-2 rounded-lg border border-slate-200 bg-white"
                required
              />
            </div>

            {/* 6 e 7. Datas */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  6. Data Inicial
                </label>
                <input
                  type="date"
                  value={newAction.startDate || ''}
                  onChange={(e) => setNewAction({ ...newAction, startDate: e.target.value })}
                  className="w-full p-2 rounded-lg border border-slate-200 bg-white"
                  required
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  7. Data Fim
                </label>
                <input
                  type="date"
                  value={newAction.endDate || ''}
                  onChange={(e) => setNewAction({ ...newAction, endDate: e.target.value })}
                  className="w-full p-2 rounded-lg border border-slate-200 bg-white"
                  required
                />
              </div>
            </div>

            {/* 8. BSC e 9. Diretriz */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  8. BSC
                </label>
                <select
                  value={newAction.bscPerspective || 'Fin'}
                  onChange={(e) => setNewAction({ ...newAction, bscPerspective: e.target.value })}
                  className="w-full p-2 rounded-lg border border-slate-200 bg-white"
                >
                  <option value="Fin">Fin (Financeiro)</option>
                  <option value="Mer">Mer (Mercado)</option>
                  <option value="Proc">Proc (Processos)</option>
                  <option value="Pess">Pess (Aprendizado/Pessoas)</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  9. Diretriz Estratégica
                </label>
                <input
                  type="text"
                  placeholder="Ex: F.1 Manter Crescimento / M.1 Superar..."
                  value={newAction.bscGuideline || ''}
                  onChange={(e) => setNewAction({ ...newAction, bscGuideline: e.target.value })}
                  className="w-full p-2 rounded-lg border border-slate-200 bg-white"
                  required
                />
              </div>
            </div>

            {/* 10. O que resolve do SWOT */}
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                10. O que resolve do SWOT?
              </label>
              <input
                type="text"
                placeholder="Ex: Baixa visibilidade online / P1 Automação de testes..."
                value={newAction.swotResolved || ''}
                onChange={(e) => setNewAction({ ...newAction, swotResolved: e.target.value })}
                className="w-full p-2 rounded-lg border border-slate-200 bg-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-xs px-3.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="text-xs font-semibold px-4 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
            >
              Salvar Ação
            </button>
          </div>
        </form>
      )}

      {/* Tabela de Ações com a Sequência Exata de 10 Colunas Solicitada */}
      <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-2xs">
        <table className="w-full text-left text-xs whitespace-normal">
          <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider text-[10px] border-b border-slate-200">
            <tr>
              <th className="py-3 px-3 font-bold">Ações Estratégicas</th>
              <th className="py-3 px-3 font-bold">Objetivo</th>
              <th className="py-3 px-3 font-bold">Indicador</th>
              <th className="py-3 px-3 font-bold">Meta</th>
              <th className="py-3 px-3 font-bold">Quem</th>
              <th className="py-3 px-2.5 font-bold">Data Inicial</th>
              <th className="py-3 px-2.5 font-bold">Data Fim</th>
              <th className="py-3 px-2 font-bold">BSC</th>
              <th className="py-3 px-3 font-bold">Diretriz Estratégica</th>
              <th className="py-3 px-3 font-bold">O que resolve do SWOT?</th>
              <th className="py-3 px-2 font-bold text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {actions.map((act) => (
              <tr key={act.id} className="hover:bg-slate-50/70 transition group">
                {/* 1. Ações Estratégicas */}
                <td className="py-3 px-3 font-bold text-slate-800 min-w-[160px]">
                  {act.name}
                </td>

                {/* 2. Objetivo */}
                <td className="py-3 px-3 text-slate-600 min-w-[180px] leading-relaxed">
                  {act.objective}
                </td>

                {/* 3. Indicador */}
                <td className="py-3 px-3 font-medium text-slate-700 min-w-[110px]">
                  {act.kpi}
                </td>

                {/* 4. Meta */}
                <td className="py-3 px-3 font-semibold text-emerald-700 min-w-[90px]">
                  {act.target}
                </td>

                {/* 5. Quem */}
                <td className="py-3 px-3 text-slate-800 font-medium whitespace-nowrap">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    {act.owner}
                  </span>
                </td>

                {/* 6. Data Inicial */}
                <td className="py-3 px-2.5 text-slate-500 whitespace-nowrap text-[11px]">
                  {act.startDate}
                </td>

                {/* 7. Data Fim */}
                <td className="py-3 px-2.5 text-slate-500 whitespace-nowrap text-[11px] font-medium">
                  {act.endDate}
                </td>

                {/* 8. BSC */}
                <td className="py-3 px-2 whitespace-nowrap">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800">
                    {act.bscPerspective}
                  </span>
                </td>

                {/* 9. Diretriz Estratégica */}
                <td className="py-3 px-3 text-slate-700 text-xs min-w-[170px] leading-snug">
                  {act.bscGuideline}
                </td>

                {/* 10. O que resolve do SWOT? */}
                <td className="py-3 px-3 text-amber-800 text-[11px] min-w-[150px] leading-snug">
                  <span className="bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60 inline-block">
                    {act.swotResolved}
                  </span>
                </td>

                {/* Ação Excluir */}
                <td className="py-3 px-2 text-right">
                  <button
                    onClick={() => handleRemove(act.id)}
                    className="text-slate-300 hover:text-rose-500 p-1 opacity-0 group-hover:opacity-100 transition"
                    title="Excluir ação"
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
