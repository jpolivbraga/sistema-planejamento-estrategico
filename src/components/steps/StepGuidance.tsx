'use client'

import React, { useState } from 'react'
import { HelpCircle, ChevronDown, ChevronUp, ExternalLink, Lightbulb, CheckSquare } from 'lucide-react'

interface StepGuidanceProps {
  stepNumber: number
  title: string
  explanation: string
  questions: string[]
  example?: string
  isOptional?: boolean
  isNotApplicable?: boolean
  onToggleNotApplicable?: () => void
}

export function StepGuidance({
  stepNumber,
  title,
  explanation,
  questions,
  example,
  isOptional,
  isNotApplicable,
  onToggleNotApplicable,
}: StepGuidanceProps) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="bg-gradient-to-r from-indigo-50/70 via-white to-blue-50/40 border border-indigo-100/80 rounded-2xl p-5 mb-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow shrink-0">
            {stepNumber}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-800">{title}</h2>
              {isOptional && (
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  Opcional
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
              {explanation}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {isOptional && (
            <button
              onClick={onToggleNotApplicable}
              className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition flex items-center gap-1.5 ${
                isNotApplicable
                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              {isNotApplicable ? 'Marcado como Não se Aplica' : 'Marcar "Não se Aplica"'}
            </button>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
            title={isOpen ? 'Recolher orientações' : 'Expandir orientações'}
          >
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mt-4 pt-4 border-t border-indigo-100/60 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Perguntas Orientadoras */}
          <div className="bg-white/80 p-3.5 rounded-xl border border-indigo-100/50">
            <h4 className="text-xs font-bold text-indigo-950 flex items-center gap-1.5 mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
              Perguntas para guiar a discussão com a liderança:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
              {questions.map((q, idx) => (
                <li key={idx} className="leading-snug">
                  {q}
                </li>
              ))}
            </ul>
          </div>

          {/* Dica / Exemplo de Referência */}
          {example && (
            <div className="bg-white/80 p-3.5 rounded-xl border border-indigo-100/50">
              <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-2">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                Exemplo e Dica Metodológica:
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed italic whitespace-pre-line">
                {example}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
