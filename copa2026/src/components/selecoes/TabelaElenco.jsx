import { useState } from 'react'

const POSICAO_PT  = { GK: 'Goleiro', DEF: 'Defensor', MID: 'Meia', FWD: 'Atacante' }
const POSICAO_COR = {
  GK:  'bg-amber-900/40 text-amber-400 border-amber-800/40',
  DEF: 'bg-blue-900/40 text-blue-400 border-blue-800/40',
  MID: 'bg-green-900/40 text-green-400 border-green-800/40',
  FWD: 'bg-red-900/40 text-red-400 border-red-800/40',
}
const FILTROS = [
  { value: '',    label: 'Todos' },
  { value: 'GK',  label: 'Goleiros' },
  { value: 'DEF', label: 'Defensores' },
  { value: 'MID', label: 'Meias' },
  { value: 'FWD', label: 'Atacantes' },
]
const ORDEM_POS = { GK: 0, DEF: 1, MID: 2, FWD: 3 }

export default function TabelaElenco({ jogadores, loading }) {
  const [filtroPos, setFiltroPos] = useState('')

  const lista = [...(jogadores ?? [])]
    .sort((a, b) => ORDEM_POS[a.posicao] - ORDEM_POS[b.posicao] || (a.numero ?? 99) - (b.numero ?? 99))
    .filter(j => !filtroPos || j.posicao === filtroPos)

  return (
    <div className="space-y-3">
      {/* filtros de posição */}
      <div className="flex gap-1 flex-wrap">
        {FILTROS.map(f => (
          <button
            key={f.value}
            onClick={() => setFiltroPos(f.value)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              filtroPos === f.value
                ? 'bg-copa-green text-white'
                : 'bg-copa-card border border-copa-border text-gray-400 hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
        <span className="ml-auto text-xs text-gray-600 self-center">
          {lista.length} jogador{lista.length !== 1 ? 'es' : ''}
        </span>
      </div>

      {/* tabela */}
      <div className="card p-0 overflow-hidden overflow-x-auto">
        {loading ? (
          <div className="p-4 space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-9 bg-copa-border/40 rounded animate-pulse" />
            ))}
          </div>
        ) : lista.length === 0 ? (
          <div className="py-12 text-center text-gray-500 text-sm">
            Nenhum jogador cadastrado para essa posição.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] text-gray-600 border-b border-copa-border bg-black/20">
                <th className="text-left pl-4 py-2.5 font-normal w-10">#</th>
                <th className="text-left py-2.5 font-normal">Nome</th>
                <th className="text-center py-2.5 font-normal">Pos.</th>
                <th className="text-left py-2.5 font-normal hidden sm:table-cell">Clube</th>
                <th className="text-center py-2.5 pr-4 font-normal">Idade</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((j, i) => (
                <tr
                  key={j.id}
                  className={`border-b border-copa-border/20 hover:bg-white/[0.02] transition-colors
                    ${i % 2 === 0 ? '' : 'bg-black/10'}`}
                >
                  <td className="pl-4 py-2.5 text-gray-500 font-mono text-xs">
                    {j.numero ?? '—'}
                  </td>
                  <td className="py-2.5 pr-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-gray-200">{j.nome}</span>
                      {j.eh_capitao === 1 && (
                        <span
                          title="Capitão"
                          className="text-copa-yellow text-[11px] font-bold"
                        >©</span>
                      )}
                    </div>
                  </td>
                  <td className="py-2.5 text-center">
                    <span className={`text-[10px] border rounded px-1.5 py-0.5 ${POSICAO_COR[j.posicao]}`}>
                      {j.posicao}
                    </span>
                  </td>
                  <td className="py-2.5 text-gray-500 text-xs hidden sm:table-cell">
                    {j.clube ?? '—'}
                  </td>
                  <td className="py-2.5 pr-4 text-center text-gray-500 text-xs">
                    {j.idade ?? '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
