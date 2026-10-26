'use client'

import React, { useState } from 'react'
import { Plus, Trash2, Layers, DollarSign, Users, Cog, GraduationCap } from 'lucide-react'

type BSCPerspective = 'financial' | 'market' | 'processes' | 'learning'

interface BSCObjective {
  id: string
  perspective: BSCPerspective
  subArea?: string
  code: string
  title: string
}

export function Step5BSC() {
  const [objectives, setObjectives] = useState<BSCObjective[]>([
    { id: '1', perspective: 'financial', code: 'F1', title: 'Manter o Crescimento com Lucratividade Sustentável' },
    { id: '2', perspective: 'financial', code: 'F2', title: 'Reduzir Custos' },
    { id: '3', perspective: 'financial', code: 'F3', title: 'Aumentar Receitas' },
    { id: '4', perspective: 'market', code: 'M1', title: 'Superar as Expectativas dos Clientes' },
    { id: '5', perspective: 'market', code: 'M2', title: 'Fortalecer a Marca como Líder no Mercado de Atuação' },
    { id: '6', perspective: 'market', code: 'M3', title: 'Consolidar a Liderança no Setor de Distribuição' },
    { id: '7', perspective: 'processes', subArea: 'Atendimento', code: 'PI1', title: 'Garantir Qualidade dos Produtos e Serviços' },
    { id: '8', perspective: 'processes', subArea: 'Atendimento', code: 'PI2', title: 'Entender e Atender às Necessidades do Cliente' },
    { id: '9', perspective: 'processes', subArea: 'Operações', code: 'PI3', title: 'Aumentar Eficiência e Eficácia Operacional' },
    { id: '10', perspective: 'processes', subArea: 'Operações', code: 'PI4', title: 'Garantir a Conformidade dos Processos' },
    { id: '11', perspective: 'learning', code: 'AC1', title: 'Atrair e Reter Talentos' },
    { id: '12', perspective: 'learning', code: 'AC2', title: 'Desenvolver Competências Necessárias para o Negócio' },
    { id: '13', perspective: 'learning', code: 'AC3', title: 'Desenvolver Cultura Voltada à Inovação' },
  ])

  const [newTitle, setNewTitle] = useState('')
  const [selectedPerspective, setSelectedPerspective] = useState<BSCPerspective>('financial')
  const [subArea, setSubArea] = useState('')

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    const prefixMap = { financial: 'F', market: 'M', processes: 'PI', learning: 'AC' }
    const prefix = prefixMap[selectedPerspective]
    const count = objectives.filter((o) => o.perspective === selectedPerspective).length + 1
    const code = `${prefix}${count}`

    setObjectives([
      ...objectives,
      {
        id: Math.random().toString(),
        perspective: selectedPerspective,
        subArea: subArea.trim() || undefined,
        code,
        title: newTitle.trim(),
      },
    ])
    setNewTitle('')
    setSubArea('')
  }

  const handleRemove = (id: string) => {
    setObjectives(objectives.filter((o) => o.id !== id))
  }

  const renderPerspectiveRow = (
    perspective: BSCPerspective,
    title: string,
    subtitle: string,
    icon: React.ReactNode,
    colorScheme: { bg: string; border: string; badge: string; cardBg: string }
  ) => {
    const list = objectives.filter((o) => o.perspective === perspective)

    return (
      <div className={`p-4 rounded-2xl border ${colorScheme.border} ${colorScheme.bg} space-y-3`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`p-1.5 rounded-lg ${colorScheme.badge}`}>{icon}</span>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">{title}</h4>
              <p className="text-[10px] text-slate-500">{subtitle}</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            {list.length} objetivos
          </span>
        </div>

        {/* Cards dos Objetivos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {list.map((obj) => (
            <div
              key={obj.id}
              className={`p-3 rounded-xl border border-slate-200/90 ${colorScheme.cardBg} shadow-xs flex flex-col justify-between group hover:shadow-sm transition`}
            >
              <div className="flex items-start justify-between gap-1 mb-1.5">
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-white/90 text-slate-800 border border-slate-200 shadow-xs">
                  {obj.code}
                </span>
                {obj.subArea && (
                  <span className="text-[9px] font-medium px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700">
                    {obj.subArea}
                  </span>
                )}
                <button
                  onClick={() => handleRemove(obj.id)}
                  className="text-slate-300 hover:text-rose-500 transition opacity-0 group-hover:opacity-100 ml-auto"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs font-semibold text-slate-800 leading-snug">
                {obj.title}
              </p>
            </div>
          ))}
          {list.length === 0 && (
            <p className="col-span-full text-center text-xs text-slate-400 py-3 italic">
              Nenhum objetivo cadastrado nesta perspectiva
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-800">
            Mapa Estratégico (Perspectivas BSC)
          </h3>
          <p className="text-xs text-slate-500">
            Conecte os objetivos de longo prazo nas 4 perspectivas da metodologia. Tudo que a empresa faz deve se desdobrar destas diretrizes.
          </p>
        </div>

        {/* Cadastro rápido */}
        <form onSubmit={handleAdd} className="flex flex-wrap items-center gap-2">
          <select
            value={selectedPerspective}
            onChange={(e) => setSelectedPerspective(e.target.value as BSCPerspective)}
            className="text-xs px-2.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none"
          >
            <option value="financial">💰 Financeira</option>
            <option value="market">👥 Mercado / Clientes</option>
            <option value="processes">⚙️ Processos Internos</option>
            <option value="learning">🎓 Aprendizado e Crescimento</option>
          </select>
          {selectedPerspective === 'processes' && (
            <input
              type="text"
              value={subArea}
              onChange={(e) => setSubArea(e.target.value)}
              placeholder="Subárea (ex: Operações)..."
              className="text-xs px-2.5 py-2 rounded-lg border border-slate-200 w-32 focus:outline-none"
            />
          )}
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Título do objetivo estratégico..."
            className="text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-64"
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

      {/* Camadas BSC Verticais */}
      <div className="space-y-4">
        {renderPerspectiveRow(
          'financial',
          '1. Perspectiva Financeira',
          'Resultados econômicos esperados pelos sócios',
          <DollarSign className="w-4 h-4 text-emerald-700" />,
          {
            bg: 'bg-emerald-50/20',
            border: 'border-emerald-200/60',
            badge: 'bg-emerald-100 text-emerald-800',
            cardBg: 'bg-white',
          }
        )}

        {renderPerspectiveRow(
          'market',
          '2. Perspectiva de Mercado e Clientes',
          'Como agregamos valor e superamos expectativas',
          <Users className="w-4 h-4 text-blue-700" />,
          {
            bg: 'bg-blue-50/20',
            border: 'border-blue-200/60',
            badge: 'bg-blue-100 text-blue-800',
            cardBg: 'bg-white',
          }
        )}

        {renderPerspectiveRow(
          'processes',
          '3. Perspectiva de Processos Internos',
          'Onde precisamos ser excelentes em eficiência e qualidade',
          <Cog className="w-4 h-4 text-amber-700" />,
          {
            bg: 'bg-amber-50/20',
            border: 'border-amber-200/60',
            badge: 'bg-amber-100 text-amber-800',
            cardBg: 'bg-white',
          }
        )}

        {renderPerspectiveRow(
          'learning',
          '4. Perspectiva de Aprendizado e Crescimento',
          'Pessoas, tecnologia, liderança e inovação contínua',
          <GraduationCap className="w-4 h-4 text-purple-700" />,
          {
            bg: 'bg-purple-50/20',
            border: 'border-purple-200/60',
            badge: 'bg-purple-100 text-purple-800',
            cardBg: 'bg-white',
          }
        )}
      </div>
    </div>
  )
}
