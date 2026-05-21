import { useState, useEffect } from 'react'
import { apiFetch } from '../../utils/api'

function SelecaoChip({ sel }) {
  return (
    <div className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-colors
      ${sel.eh_cabeca_chave
        ? 'bg-copa-yellow/10 border border-copa-yellow/30 text-copa-yellow'
        : 'hover:bg-white/5 text-gray-300'
      }`}
    >
      <span className="text-base">{sel.bandeira_emoji}</span>
      <span className="truncate">{sel.nome_pt}</span>
      {sel.eh_cabeca_chave ? (
        <span className="ml-auto text-[9px] font-bold tracking-wide">CHAVE</span>
      ) : sel.ranking_fifa ? (
        <span className="ml-auto text-[10px] text-gray-600">#{sel.ranking_fifa}</span>
      ) : null}
    </div>
  )
}

export default function PotesSection() {
  const [selecoes, setSelecoes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiFetch('/api/selecoes')
      .then(r => r.json())
      .then(data => { setSelecoes(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(p => (
          <div key={p} className="card animate-pulse space-y-2">
            <div className="h-4 bg-copa-border rounded w-16 mb-3" />
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-7 bg-copa-border/50 rounded" />
            ))}
          </div>
        ))}
      </div>
    )
  }

  const potes = { 1: [], 2: [], 3: [], 4: [] }
  selecoes.forEach(s => {
    if (potes[s.pote]) potes[s.pote].push(s)
  })

  const CONFEDERACOES = ['UEFA', 'CONMEBOL', 'CONCACAF', 'AFC', 'CAF', 'OFC']

  return (
    <div className="space-y-6">
      {/* potes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(pote => (
          <div key={pote} className="card p-0 overflow-hidden">
            <div className={`px-4 py-3 border-b border-copa-border
              ${pote === 1 ? 'bg-copa-yellow/10' : 'bg-black/20'}`}
            >
              <h3 className={`font-display tracking-widest text-lg
                ${pote === 1 ? 'text-copa-yellow' : 'text-gray-300'}`}
              >
                POTE {pote}
              </h3>
              {pote === 1 && (
                <p className="text-[10px] text-copa-yellow/60 tracking-wider">Cabeças de Chave</p>
              )}
            </div>
            <div className="p-2 space-y-0.5">
              {potes[pote]
                .sort((a, b) => (a.ranking_fifa ?? 999) - (b.ranking_fifa ?? 999))
                .map(sel => (
                  <SelecaoChip key={sel.id} sel={sel} />
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* seleções por confederação */}
      <div>
        <h3 className="font-display text-xl tracking-widest text-white mb-4">POR CONFEDERAÇÃO</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CONFEDERACOES.map(conf => {
            const sels = selecoes.filter(s => s.confederacao === conf)
            if (!sels.length) return null
            return (
              <div key={conf} className="card p-3">
                <p className="text-[10px] text-gray-600 tracking-widest uppercase mb-2">{conf}</p>
                <p className="font-display text-2xl text-copa-yellow">{sels.length}</p>
                <div className="mt-2 flex flex-wrap gap-0.5">
                  {sels.map(s => (
                    <span key={s.id} className="text-sm" title={s.nome_pt}>
                      {s.bandeira_emoji}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
