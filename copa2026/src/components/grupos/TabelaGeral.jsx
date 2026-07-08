import { Fragment, useState, useEffect } from 'react'
import Bandeira from '../ui/Bandeira'
import { apiFetch } from '../../utils/api'

const SEPARADORES = {
  1:  '— Pódio —',
  3:  '— Top 16 (zona de classificação hipotética) —',
  16: '— Em disputa (17º–32º) —',
  32: '— Eliminados (33º–48º) —',
}

function corTexto(pos) {
  if (pos === 1)  return 'text-copa-yellow'
  if (pos <= 3)   return 'text-gray-200'
  if (pos <= 16)  return 'text-copa-green'
  if (pos <= 32)  return 'text-gray-400'
  return 'text-gray-600'
}

function barraLateral(pos) {
  if (pos === 1)  return 'bg-copa-yellow'
  if (pos <= 3)   return 'bg-gray-400'
  if (pos <= 16)  return 'bg-copa-green'
  return null
}

export default function TabelaGeral() {
  const [classificacao, setClassificacao] = useState([])
  const [totalJogos, setTotalJogos]       = useState(0)
  const [loading, setLoading]             = useState(true)
  const [error, setError]                 = useState(false)

  useEffect(() => {
    apiFetch('/api/pontos-corridos')
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(data => {
        setClassificacao(data.classificacao || [])
        setTotalJogos(data.total_jogos || 0)
        setLoading(false)
      })
      .catch(() => { setError(true); setLoading(false) })
  }, [])

  if (error) {
    return (
      <div className="card text-center py-12 text-gray-500">
        <p className="text-2xl mb-2">⚠️</p>
        <p>Não foi possível carregar os pontos corridos.</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="card animate-pulse p-0 overflow-hidden">
        <div className="px-4 py-3 border-b border-copa-border bg-black/20 flex gap-2">
          <div className="h-5 bg-copa-border rounded w-32" />
        </div>
        <div className="p-3 space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-7 bg-copa-border/40 rounded" />
          ))}
        </div>
      </div>
    )
  }

  const todas = classificacao

  return (
    <div className="card overflow-hidden p-0">
      <div className="px-4 py-3 border-b border-copa-border bg-black/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-display text-lg text-copa-yellow tracking-widest">PONTOS CORRIDOS</span>
          <span className="text-[10px] text-gray-600 italic">
            48 seleções · grupos + mata-mata{totalJogos ? ` · ${totalJogos} jogos` : ''}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-gray-600 border-b border-copa-border/50">
              <th className="text-left pl-5 py-2 font-normal w-7">#</th>
              <th className="text-left py-2 font-normal">Seleção</th>
              <th className="text-center py-2 font-normal px-1 text-[10px]">GRP</th>
              <th className="text-center py-2 font-normal px-1">J</th>
              <th className="hidden sm:table-cell text-center py-2 font-normal px-1">V</th>
              <th className="hidden sm:table-cell text-center py-2 font-normal px-1">E</th>
              <th className="hidden sm:table-cell text-center py-2 font-normal px-1">D</th>
              <th className="hidden sm:table-cell text-center py-2 font-normal px-1">GP</th>
              <th className="hidden sm:table-cell text-center py-2 font-normal px-1">GC</th>
              <th className="hidden sm:table-cell text-center py-2 font-normal px-1">SG</th>
              <th className="text-center py-2 font-normal pr-4 font-semibold">Pts</th>
            </tr>
          </thead>
          <tbody>
            {todas.map((sel, i) => {
              const pos = i + 1
              const barra = barraLateral(pos)
              return (
                <Fragment key={sel.selecao_id}>
                  <tr className="border-b border-copa-border/20 relative hover:bg-white/[0.02]">
                    <td className="relative pl-5 py-2">
                      {barra && <span className={`w-1 h-full absolute left-0 top-0 ${barra} rounded-l`} />}
                      <span className={`${corTexto(pos)} font-medium`}>{pos}</span>
                    </td>
                    <td className="py-2 pr-2">
                      <div className="flex items-center gap-1.5">
                        <Bandeira iso={sel.codigo_iso} className="h-4 w-auto" />
                        <span className={`${corTexto(pos)} font-medium`}>{sel.nome_pt}</span>
                        {pos === 1 && (
                          <span className="text-[9px] bg-copa-yellow/20 text-copa-yellow px-1 rounded">LÍDER</span>
                        )}
                      </div>
                    </td>
                    <td className="text-center py-2 text-gray-700 px-1 font-mono text-[10px]">{sel.grupo}</td>
                    <td className="text-center py-2 text-gray-400 px-1">{sel.jogos}</td>
                    <td className="hidden sm:table-cell text-center py-2 text-gray-400 px-1">{sel.vitorias}</td>
                    <td className="hidden sm:table-cell text-center py-2 text-gray-400 px-1">{sel.empates}</td>
                    <td className="hidden sm:table-cell text-center py-2 text-gray-400 px-1">{sel.derrotas}</td>
                    <td className="hidden sm:table-cell text-center py-2 text-gray-400 px-1">{sel.gols_pro}</td>
                    <td className="hidden sm:table-cell text-center py-2 text-gray-400 px-1">{sel.gols_contra}</td>
                    <td className="hidden sm:table-cell text-center py-2 text-gray-400 px-1">
                      {sel.saldo_gols > 0 ? `+${sel.saldo_gols}` : sel.saldo_gols}
                    </td>
                    <td className={`text-center py-2 pr-4 font-bold ${corTexto(pos)}`}>{sel.pontos}</td>
                  </tr>
                  {SEPARADORES[pos] && pos < todas.length && (
                    <tr>
                      <td colSpan={11} className="px-4 py-1 text-[9px] text-gray-700 tracking-widest uppercase bg-black/20 border-b border-copa-border/30">
                        {SEPARADORES[pos]}
                      </td>
                    </tr>
                  )}
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2 border-t border-copa-border/30 text-[10px] text-gray-600">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-copa-yellow inline-block" /> Líder</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-gray-400 inline-block" /> Pódio (Top 3)</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-copa-green inline-block" /> Top 16</span>
        <span className="ml-auto italic text-gray-700">★ Brincadeira — todos os jogos · pênaltis = empate · Pts › SG › GP › Ranking FIFA</span>
      </div>
    </div>
  )
}
