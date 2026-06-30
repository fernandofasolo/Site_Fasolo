import { toHorarioBrasilia } from '../../utils/formatDate'
import { faseLabel, temPenaltis } from '../../utils/fases'
import Bandeira from '../ui/Bandeira'

const STATUS_LABEL = {
  agendado:     'Agendado',
  em_andamento: 'Ao Vivo',
  encerrado:    'Encerrado',
}

export default function JogoCard({ jogo, compact = false }) {
  const { selecao_a, selecao_b, gols_a, gols_b, penaltis_a, penaltis_b, status, data_hora_utc, estadio, cidade, fase, grupo } = jogo
  const encerrado = status === 'encerrado'
  const aoVivo    = status === 'em_andamento'
  const penaltis  = temPenaltis(jogo)

  return (
    <div className="card flex flex-col gap-3 min-w-[260px] sm:min-w-0">
      {/* cabeçalho */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{faseLabel(fase, grupo)}</span>
        <span className={`badge-${status}`}>{STATUS_LABEL[status]}</span>
      </div>

      {/* placar */}
      <div className="flex items-center justify-between gap-2">
        {/* seleção A */}
        <div className="flex flex-col items-center gap-1 flex-1">
          <Bandeira iso={selecao_a?.codigo_iso} className="h-10 w-auto" />
          <span className="text-xs text-gray-300 text-center leading-tight">
            {selecao_a?.nome_pt ?? 'A definir'}
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
          {penaltis && (
            <span className="font-mono text-[11px] text-copa-yellow tabular-nums mt-0.5">
              ({penaltis_a} — {penaltis_b} pên.)
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
          <Bandeira iso={selecao_b?.codigo_iso} className="h-10 w-auto" />
          <span className="text-xs text-gray-300 text-center leading-tight">
            {selecao_b?.nome_pt ?? 'A definir'}
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
