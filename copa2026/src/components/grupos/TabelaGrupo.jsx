import { toHora } from '../../utils/formatDate'
import Bandeira from '../ui/Bandeira'

// cores por posição na classificação
function corPosicao(pos, totalJogos) {
  if (pos <= 2) return 'text-copa-green'
  if (pos === 3) return 'text-copa-yellow'
  return 'text-gray-500'
}

function indicadorPosicao(pos) {
  if (pos <= 2) return <span className="w-1 h-full absolute left-0 top-0 bg-copa-green rounded-l" />
  if (pos === 3) return <span className="w-1 h-full absolute left-0 top-0 bg-copa-yellow rounded-l" />
  return null
}

function JogoGrupo({ jogo }) {
  const { selecao_a, selecao_b, gols_a, gols_b, status, data_hora_utc, cidade } = jogo
  const temPlacar = status !== 'agendado'

  return (
    <div className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-white/[0.03] transition-colors">
      {/* seleção A */}
      <div className="flex items-center gap-1.5 flex-1 justify-end">
        <span className="text-xs text-gray-400 text-right truncate max-w-[80px]">{selecao_a?.nome_pt}</span>
        <Bandeira iso={selecao_a?.codigo_iso} className="h-4 w-auto" />
      </div>

      {/* placar / hora */}
      <div className="flex flex-col items-center min-w-[56px]">
        {temPlacar ? (
          <span className="font-mono text-sm font-bold text-white tabular-nums">
            {gols_a} — {gols_b}
          </span>
        ) : (
          <span className="font-mono text-xs text-copa-yellow font-semibold">
            {toHora(data_hora_utc)}
          </span>
        )}
        {status === 'em_andamento' && (
          <span className="text-[9px] text-copa-green animate-pulse">AO VIVO</span>
        )}
        {status === 'encerrado' && (
          <span className="text-[9px] text-gray-600">ENC.</span>
        )}
      </div>

      {/* seleção B */}
      <div className="flex items-center gap-1.5 flex-1">
        <Bandeira iso={selecao_b?.codigo_iso} className="h-4 w-auto" />
        <span className="text-xs text-gray-400 truncate max-w-[80px]">{selecao_b?.nome_pt}</span>
      </div>
    </div>
  )
}

export default function TabelaGrupo({ dados, compact = false }) {
  const { grupo, classificacao, jogos } = dados

  // cabeça de chave = seleção com eh_cabeca_chave=1 (Pote 1)
  const cabecaChave = classificacao.find(s => s.eh_cabeca_chave) ?? classificacao[0]
  const lider = classificacao[0]

  // agrupa jogos por rodada
  const porRodada = {}
  if (!compact && jogos) {
    for (const j of jogos) {
      const r = j.rodada ?? 1
      if (!porRodada[r]) porRodada[r] = []
      porRodada[r].push(j)
    }
  }

  return (
    <div className="card flex flex-col gap-0 overflow-hidden p-0">
      {/* cabeçalho do grupo */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-copa-border bg-black/20">
        <div className="flex items-center gap-2">
          <span className="font-display text-lg text-copa-yellow tracking-widest">
            GRUPO {grupo}
          </span>
          {cabecaChave && (
            <Bandeira iso={cabecaChave.codigo_iso} className="h-6 w-auto" />
          )}
        </div>
        {!compact && cabecaChave && (
          <span className="text-xs text-gray-600">{cabecaChave.nome_pt}</span>
        )}
      </div>

      {/* tabela de classificação */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-gray-600 border-b border-copa-border/50">
              <th className="text-left pl-5 py-2 font-normal w-6">#</th>
              <th className="text-left py-2 font-normal">Seleção</th>
              <th className="text-center py-2 font-normal px-1">J</th>
              <th className="text-center py-2 font-normal px-1">V</th>
              <th className="text-center py-2 font-normal px-1">E</th>
              <th className="text-center py-2 font-normal px-1">D</th>
              {!compact && (
                <>
                  <th className="text-center py-2 font-normal px-1">GP</th>
                  <th className="text-center py-2 font-normal px-1">GC</th>
                </>
              )}
              <th className="text-center py-2 font-normal px-1">SG</th>
              <th className="text-center py-2 font-normal pr-4 font-semibold">Pts</th>
            </tr>
          </thead>
          <tbody>
            {classificacao.map((sel, i) => (
              <tr
                key={sel.selecao_id}
                className="border-b border-copa-border/20 relative hover:bg-white/[0.02]"
              >
                {/* indicador lateral de cor */}
                <td className="relative pl-5 py-2">
                  {indicadorPosicao(i + 1)}
                  <span className={`${corPosicao(i + 1)} font-medium`}>{i + 1}</span>
                </td>
                <td className="py-2 pr-2">
                  <div className="flex items-center gap-1.5">
                    <Bandeira iso={sel.codigo_iso} className="h-4 w-auto" />
                    <span className={`${corPosicao(i + 1)} font-medium`}>
                      {compact ? (sel.nome_pt?.split(' ')[0]) : sel.nome_pt}
                    </span>
                    {sel.eh_cabeca_chave === 1 && !compact && (
                      <span className="text-[9px] bg-copa-yellow/20 text-copa-yellow px-1 rounded">
                        CHAVE
                      </span>
                    )}
                  </div>
                </td>
                <td className="text-center py-2 text-gray-400 px-1">{sel.jogos}</td>
                <td className="text-center py-2 text-gray-400 px-1">{sel.vitorias}</td>
                <td className="text-center py-2 text-gray-400 px-1">{sel.empates}</td>
                <td className="text-center py-2 text-gray-400 px-1">{sel.derrotas}</td>
                {!compact && (
                  <>
                    <td className="text-center py-2 text-gray-400 px-1">{sel.gols_pro}</td>
                    <td className="text-center py-2 text-gray-400 px-1">{sel.gols_contra}</td>
                  </>
                )}
                <td className="text-center py-2 text-gray-400 px-1">
                  {sel.saldo_gols > 0 ? `+${sel.saldo_gols}` : sel.saldo_gols}
                </td>
                <td className={`text-center py-2 pr-4 font-bold ${corPosicao(i + 1)}`}>
                  {sel.pontos}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* legenda compacta */}
      <div className="flex items-center gap-3 px-4 py-2 border-t border-copa-border/30 text-[10px] text-gray-600">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-sm bg-copa-green inline-block" /> Classificado
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-sm bg-copa-yellow inline-block" /> 3º em disputa
        </span>
        {!compact && (
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm bg-gray-700 inline-block" /> Eliminado
          </span>
        )}
      </div>

      {/* jogos por rodada (apenas visão completa) */}
      {!compact && Object.keys(porRodada).sort().map(rodada => (
        <div key={rodada} className="border-t border-copa-border/30">
          <p className="text-[10px] text-gray-600 tracking-widest uppercase px-4 py-2">
            Rodada {rodada}
          </p>
          {porRodada[rodada].map(j => (
            <JogoGrupo key={j.id} jogo={j} />
          ))}
        </div>
      ))}
    </div>
  )
}
