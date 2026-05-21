import { toHora } from '../../utils/formatDate'

const STATUS_LABEL = {
  agendado:     'Agendado',
  em_andamento: 'Ao Vivo',
  encerrado:    'Encerrado',
}

export default function JogoRow({ jogo, onClick }) {
  const { selecao_a, selecao_b, gols_a, gols_b, status, data_hora_utc, estadio, cidade, fase, grupo } = jogo
  const encerrado = status === 'encerrado'
  const aoVivo    = status === 'em_andamento'
  const temPlacar = encerrado || aoVivo

  return (
    <button
      onClick={onClick}
      className="w-full card hover:border-copa-green/40 hover:bg-white/[0.02] transition-all text-left group"
    >
      {/* layout desktop: três colunas */}
      <div className="hidden sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-4">
        {/* seleção A */}
        <div className="flex items-center gap-3 justify-end">
          <span className="text-sm text-gray-200 font-medium group-hover:text-white transition-colors text-right">
            {selecao_a?.nome_pt}
          </span>
          <span className="text-3xl">{selecao_a?.bandeira_emoji}</span>
        </div>

        {/* centro: hora/placar + info */}
        <div className="flex flex-col items-center min-w-[120px] gap-1">
          {temPlacar ? (
            <span className="font-mono text-2xl font-bold text-white tabular-nums">
              {gols_a ?? 0} &mdash; {gols_b ?? 0}
            </span>
          ) : (
            <span className="font-mono text-xl font-semibold text-copa-yellow">
              {toHora(data_hora_utc)}
            </span>
          )}
          <span className={`badge-${status} text-[10px]`}>{STATUS_LABEL[status]}</span>
          <span className="text-[11px] text-gray-600">{cidade}</span>
        </div>

        {/* seleção B */}
        <div className="flex items-center gap-3">
          <span className="text-3xl">{selecao_b?.bandeira_emoji}</span>
          <span className="text-sm text-gray-200 font-medium group-hover:text-white transition-colors">
            {selecao_b?.nome_pt}
          </span>
        </div>
      </div>

      {/* layout mobile: empilhado */}
      <div className="sm:hidden flex items-center gap-3">
        <div className="flex flex-col items-center w-8">
          <span className="text-2xl">{selecao_a?.bandeira_emoji}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-200 truncate">{selecao_a?.nome_pt}</p>
          <p className="text-sm font-medium text-gray-200 truncate">{selecao_b?.nome_pt}</p>
        </div>
        <div className="flex flex-col items-center w-8">
          <span className="text-2xl">{selecao_b?.bandeira_emoji}</span>
        </div>
        <div className="flex flex-col items-end gap-1 ml-2">
          {temPlacar ? (
            <span className="font-mono text-lg font-bold text-white">{gols_a} — {gols_b}</span>
          ) : (
            <span className="font-mono text-base text-copa-yellow">{toHora(data_hora_utc)}</span>
          )}
          <span className={`badge-${status} text-[10px]`}>{STATUS_LABEL[status]}</span>
        </div>
      </div>

      {/* rodapé sempre visível */}
      <div className="mt-2 flex items-center justify-between text-[11px] text-gray-600 border-t border-copa-border/50 pt-2">
        <span>{estadio} &bull; {cidade}</span>
        <span>{fase === 'grupo' ? `Grupo ${grupo}` : fase}</span>
      </div>
    </button>
  )
}
