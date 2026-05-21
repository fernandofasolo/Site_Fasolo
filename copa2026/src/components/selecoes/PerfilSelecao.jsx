import { toHorarioBrasilia } from '../../utils/formatDate'
import Bandeira from '../ui/Bandeira'

function InfoCard({ label, value }) {
  if (!value && value !== 0) return null
  return (
    <div className="bg-black/30 rounded-xl p-3 text-center">
      <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-gray-200 text-sm font-medium">{value}</p>
    </div>
  )
}

function computarStats(jogos, selecaoId) {
  let j = 0, v = 0, e = 0, d = 0, gp = 0, gc = 0
  for (const jogo of jogos ?? []) {
    if (jogo.status !== 'encerrado') continue
    const eA = jogo.selecao_a_id === selecaoId
    const ga = eA ? jogo.gols_a : jogo.gols_b
    const gb = eA ? jogo.gols_b : jogo.gols_a
    if (ga == null) continue
    j++; gp += ga; gc += gb
    if (ga > gb) v++
    else if (ga === gb) e++
    else d++
  }
  return { j, v, e, d, gp, gc, sg: gp - gc, pts: v * 3 + e }
}

export default function PerfilSelecao({ selecao, jogos, loadingJogos }) {
  const stats = computarStats(jogos, selecao.id)
  const temJogos = stats.j > 0

  return (
    <div className="space-y-5">
      {/* banner hero */}
      <div
        className="relative rounded-2xl overflow-hidden py-10 px-6 text-center"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 0%, #002776 0%, #0A0A0A 80%)',
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-copa-green via-copa-yellow to-copa-green" />

        <div className="mb-3"><Bandeira iso={selecao.codigo_iso} className="h-20 w-auto mx-auto" /></div>
        <h2 className="font-display text-4xl sm:text-5xl tracking-widest text-white">
          {selecao.nome_pt.toUpperCase()}
        </h2>
        {selecao.eh_cabeca_chave === 1 && (
          <span className="inline-block mt-2 text-[11px] bg-copa-yellow/20 text-copa-yellow border border-copa-yellow/30 px-3 py-0.5 rounded-full tracking-widest">
            CABEÇA DE CHAVE
          </span>
        )}
        {selecao.eh_sede === 1 && (
          <span className="inline-block mt-2 ml-1 text-[11px] bg-copa-green/20 text-copa-green border border-copa-green/30 px-3 py-0.5 rounded-full tracking-widest">
            PAÍS-SEDE
          </span>
        )}
      </div>

      {/* informações */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <InfoCard label="Confederação"  value={selecao.confederacao} />
        <InfoCard label="Grupo"         value={`Grupo ${selecao.grupo}`} />
        <InfoCard label="Pote"          value={selecao.pote} />
        <InfoCard label="Ranking FIFA"  value={selecao.ranking_fifa ? `#${selecao.ranking_fifa}` : '—'} />
        <InfoCard label="Treinador"     value={selecao.treinador ?? '—'} />
      </div>

      {/* resultados na Copa */}
      {(temJogos || loadingJogos) && (
        <div>
          <h3 className="text-xs text-gray-600 uppercase tracking-widest mb-3">
            Desempenho na Copa
          </h3>
          {loadingJogos ? (
            <div className="h-20 animate-pulse bg-copa-border rounded-xl" />
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {[
                { label: 'J',   value: stats.j },
                { label: 'V',   value: stats.v },
                { label: 'E',   value: stats.e },
                { label: 'D',   value: stats.d },
                { label: 'GP',  value: stats.gp },
                { label: 'GC',  value: stats.gc },
                { label: 'SG',  value: stats.sg > 0 ? `+${stats.sg}` : stats.sg },
                { label: 'Pts', value: stats.pts },
              ].map(({ label, value }) => (
                <div key={label} className="card text-center py-3 px-1">
                  <p className="font-mono text-xl font-bold text-copa-yellow">{value}</p>
                  <p className="text-[10px] text-gray-600 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* jogos da seleção */}
      {!loadingJogos && jogos?.length > 0 && (
        <div>
          <h3 className="text-xs text-gray-600 uppercase tracking-widest mb-3">
            Jogos na Copa
          </h3>
          <div className="space-y-2">
            {jogos.map(jogo => {
              const eA      = jogo.selecao_a_id === selecao.id
              const adversario = eA ? jogo.selecao_b_id : jogo.selecao_a_id
              const gaSelecao  = eA ? jogo.gols_a : jogo.gols_b
              const gaAdvers   = eA ? jogo.gols_b : jogo.gols_a
              const temPlacar  = jogo.status !== 'agendado'

              // dados da seleção adversária vêm do jogo
              const advNome  = eA ? jogo.selecao_b?.nome_pt  : jogo.selecao_a?.nome_pt
              const advIso   = eA ? jogo.selecao_b?.codigo_iso : jogo.selecao_a?.codigo_iso

              return (
                <div
                  key={jogo.id}
                  className="card flex items-center gap-3 py-3 px-4"
                >
                  <div className="text-xs text-gray-600 w-24 shrink-0">
                    {toHorarioBrasilia(jogo.data_hora_utc)}
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    <Bandeira iso={selecao.codigo_iso} className="h-6 w-auto" />
                    {temPlacar ? (
                      <span className="font-mono font-bold text-white text-sm tabular-nums">
                        {gaSelecao} — {gaAdvers}
                      </span>
                    ) : (
                      <span className="text-gray-600 text-sm">vs</span>
                    )}
                    <Bandeira iso={advIso} className="h-6 w-auto" />
                    <span className="text-xs text-gray-400 truncate">{advNome}</span>
                  </div>
                  <span className={`badge-${jogo.status} shrink-0`}>
                    {jogo.status === 'agendado' ? 'Agendado'
                      : jogo.status === 'em_andamento' ? 'Ao Vivo'
                      : 'Enc.'}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
