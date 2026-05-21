import { toHorarioBrasilia } from '../../utils/formatDate'

const STATUS_LABEL = {
  agendado:     'Agendado',
  em_andamento: 'Ao Vivo',
  encerrado:    'Encerrado',
}

export default function JogoCard({ jogo, compact = false }) {
  const { selecao_a, selecao_b, gols_a, gols_b, status, data_hora_utc, estadio, cidade, fase, grupo } = jogo
  const encerrado = status === 'encerrado'
  const aoVivo    = status === 'em_andamento'

  return (
    <div className="card flex flex-col gap-3 min-w-[260px] sm:min-w-0">
      {/* cabeçalho */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>
          {fase === 'grupo' ? `Grupo ${grupo}` : fase.charAt(0).toUpperCase() + fase.slice(1)}
        </span>
        <span className={`badge-${status}`}>{STATUS_LABEL[status]}</span>
      </div>

      {/* placar */}
      <div className="flex items-center justify-between gap-2">
        {/* seleção A */}
        <div className="flex flex-col items-center gap-1 flex-1">
          <span className="text-3xl">{selecao_a?.bandeira_emoji}</span>
          <span className="text-xs text-gray-300 text-center leading-tight">
            {selecao_a?.nome_pt}
          </span>
        </div>

        {/* placar central */}
        <div className="flex flex-col items-center px-2">
          {encerrado || aoVivo ? (
            <span className="font-mono text-2xl font-bold text-white tabular-nums">
              {gols_a ?? 0} — {gols_b ?? 0}
            </span>
          ) : (
            <span className="font-mono text-lg font-semibold text-gray-500">
              {toHorarioBrasilia(data_hora_utc).split(', ')[1] ?? '--:--'}
            </span>
          )}
          {!compact && (
            <span className="text-[10px] text-gray-600 mt-1 text-center">
              {cidade}
            </span>
          )}
        </div>

        {/* seleção B */}
        <div className="flex flex-col items-center gap-1 flex-1">
          <span className="text-3xl">{selecao_b?.bandeira_emoji}</span>
          <span className="text-xs text-gray-300 text-center leading-tight">
            {selecao_b?.nome_pt}
          </span>
        </div>
      </div>

      {/* data e estádio */}
      {!compact && (
        <div className="text-center text-[11px] text-gray-600 border-t border-copa-border pt-2">
          {toHorarioBrasilia(data_hora_utc)} &bull; {estadio}
        </div>
      )}
    </div>
  )
}
