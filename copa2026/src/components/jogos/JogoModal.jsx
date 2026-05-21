import { useEffect, useState } from 'react'
import { toHorarioBrasilia } from '../../utils/formatDate'
import { apiFetch } from '../../utils/api'

const STATUS_LABEL = {
  agendado:     'Agendado',
  em_andamento: 'Ao Vivo',
  encerrado:    'Encerrado',
}

function MiniTabela({ letra }) {
  const [dados, setDados] = useState(null)

  useEffect(() => {
    apiFetch(`/api/grupos/${letra}`)
      .then(r => r.json())
      .then(setDados)
      .catch(() => {})
  }, [letra])

  if (!dados) return <div className="h-24 animate-pulse bg-copa-border rounded-lg" />

  return (
    <div>
      <p className="text-xs text-gray-500 tracking-widest uppercase mb-2">Grupo {letra}</p>
      <table className="w-full text-xs">
        <thead>
          <tr className="text-gray-600 border-b border-copa-border">
            <th className="text-left pb-1 font-normal w-6">#</th>
            <th className="text-left pb-1 font-normal">Seleção</th>
            <th className="pb-1 font-normal">J</th>
            <th className="pb-1 font-normal">V</th>
            <th className="pb-1 font-normal">E</th>
            <th className="pb-1 font-normal">D</th>
            <th className="pb-1 font-normal">SG</th>
            <th className="pb-1 font-normal">Pts</th>
          </tr>
        </thead>
        <tbody>
          {dados.classificacao.map((s, i) => (
            <tr
              key={s.selecao_id}
              className={`border-b border-copa-border/30 ${
                i < 2 ? 'text-copa-green' : i === 2 ? 'text-copa-yellow' : 'text-gray-500'
              }`}
            >
              <td className="py-1 text-gray-600">{i + 1}</td>
              <td className="py-1">
                <span className="mr-1">{s.bandeira_emoji}</span>{s.nome_pt}
              </td>
              <td className="py-1 text-center">{s.jogos}</td>
              <td className="py-1 text-center">{s.vitorias}</td>
              <td className="py-1 text-center">{s.empates}</td>
              <td className="py-1 text-center">{s.derrotas}</td>
              <td className="py-1 text-center">{s.saldo_gols > 0 ? '+' : ''}{s.saldo_gols}</td>
              <td className="py-1 text-center font-bold">{s.pontos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function JogoModal({ jogo, onClose }) {
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const { selecao_a, selecao_b, gols_a, gols_b, status, data_hora_utc,
          estadio, cidade, pais_sede, fase, grupo } = jogo
  const temPlacar = status !== 'agendado'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-copa-card border border-copa-border rounded-2xl w-full max-w-lg shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* header */}
        <div className="flex items-center justify-between p-4 border-b border-copa-border">
          <span className="text-xs text-gray-500 tracking-widest uppercase">
            {fase === 'grupo' ? `Fase de Grupos — Grupo ${grupo}` : fase}
          </span>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* placar principal */}
        <div className="p-6 text-center space-y-4">
          <div className="flex items-center justify-center gap-6">
            {/* seleção A */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <span className="text-5xl">{selecao_a?.bandeira_emoji}</span>
              <span className="text-sm font-medium text-gray-200">{selecao_a?.nome_pt}</span>
            </div>

            {/* placar / hora */}
            <div className="flex flex-col items-center gap-1">
              {temPlacar ? (
                <span className="font-mono text-4xl font-bold text-white tabular-nums">
                  {gols_a ?? 0} — {gols_b ?? 0}
                </span>
              ) : (
                <span className="font-mono text-3xl font-bold text-copa-yellow">
                  {toHorarioBrasilia(data_hora_utc).split(', ')[1]}
                </span>
              )}
              <span className={`badge-${status}`}>{STATUS_LABEL[status]}</span>
            </div>

            {/* seleção B */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <span className="text-5xl">{selecao_b?.bandeira_emoji}</span>
              <span className="text-sm font-medium text-gray-200">{selecao_b?.nome_pt}</span>
            </div>
          </div>

          {/* informações */}
          <div className="grid grid-cols-2 gap-3 text-sm text-left mt-4">
            <div className="bg-black/30 rounded-lg p-3">
              <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-1">Data e hora</p>
              <p className="text-gray-300">{toHorarioBrasilia(data_hora_utc)}</p>
              <p className="text-[11px] text-gray-600">horário de Brasília</p>
            </div>
            <div className="bg-black/30 rounded-lg p-3">
              <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-1">Local</p>
              <p className="text-gray-300">{cidade}</p>
              <p className="text-[11px] text-gray-600">{pais_sede}</p>
            </div>
            <div className="bg-black/30 rounded-lg p-3 col-span-2">
              <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-1">Estádio</p>
              <p className="text-gray-300">{estadio}</p>
            </div>
          </div>
        </div>

        {/* mini-tabela do grupo */}
        {fase === 'grupo' && (
          <div className="px-6 pb-6">
            <div className="border-t border-copa-border pt-4">
              <MiniTabela letra={grupo} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
