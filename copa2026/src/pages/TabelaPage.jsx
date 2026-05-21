import { useState, useMemo } from 'react'
import { useJogos } from '../hooks/useJogos'
import FiltrosJogos from '../components/jogos/FiltrosJogos'
import JogoRow from '../components/jogos/JogoRow'
import JogoModal from '../components/jogos/JogoModal'

// Agrupa jogos por data (horário de Brasília)
function agruparPorData(jogos) {
  const groups = {}
  for (const jogo of jogos) {
    const d = new Date(
      jogo.data_hora_utc.endsWith('Z') ? jogo.data_hora_utc : jogo.data_hora_utc + 'Z'
    )
    const chave = d.toLocaleDateString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      weekday: 'long',
      day: '2-digit',
      month: 'long',
    })
    if (!groups[chave]) groups[chave] = []
    groups[chave].push(jogo)
  }
  return groups
}

function SkeletonRow() {
  return (
    <div className="card animate-pulse space-y-3">
      <div className="hidden sm:flex items-center justify-between gap-4">
        <div className="flex-1 flex justify-end gap-3 items-center">
          <div className="h-3 bg-copa-border rounded w-24" />
          <div className="w-10 h-10 bg-copa-border rounded-full" />
        </div>
        <div className="flex flex-col items-center gap-2 min-w-[120px]">
          <div className="h-6 bg-copa-border rounded w-20" />
          <div className="h-3 bg-copa-border rounded w-14" />
        </div>
        <div className="flex-1 flex gap-3 items-center">
          <div className="w-10 h-10 bg-copa-border rounded-full" />
          <div className="h-3 bg-copa-border rounded w-24" />
        </div>
      </div>
      <div className="h-2 bg-copa-border/50 rounded w-1/2 mt-2" />
    </div>
  )
}

export default function TabelaPage() {
  const [filtros, setFiltros] = useState({
    fase: 'grupo',
    grupo: '',
    status: '',
    data: '',
  })
  const [jogoSelecionado, setJogoSelecionado] = useState(null)

  const params = useMemo(() => {
    const p = { fase: filtros.fase }
    if (filtros.grupo)  p.grupo  = filtros.grupo
    if (filtros.status) p.status = filtros.status
    if (filtros.data)   p.data   = filtros.data
    return p
  }, [filtros])

  const { jogos, loading, error } = useJogos(params)

  const grupos = useMemo(() => agruparPorData(jogos), [jogos])
  const datas  = Object.keys(grupos)

  return (
    <div className="space-y-6 pb-16">
      <div>
        <h1 className="font-display text-4xl tracking-widest text-white">TABELA DE JOGOS</h1>
        <p className="text-gray-500 text-sm mt-1">104 partidas &bull; 11 jun – 19 jul 2026</p>
      </div>

      <FiltrosJogos filtros={filtros} onChange={setFiltros} />

      {/* contador de resultados */}
      {!loading && !error && (
        <p className="text-xs text-gray-600">
          {jogos.length} {jogos.length === 1 ? 'jogo encontrado' : 'jogos encontrados'}
        </p>
      )}

      {/* erro */}
      {error && (
        <div className="card text-center py-10 text-gray-500">
          <p className="text-2xl mb-2">⚠️</p>
          <p>Não foi possível carregar os jogos.</p>
          <p className="text-xs mt-1">{error}</p>
        </div>
      )}

      {/* skeleton */}
      {loading && (
        <div className="space-y-2">
          {Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)}
        </div>
      )}

      {/* lista agrupada por data */}
      {!loading && !error && datas.length === 0 && (
        <div className="card text-center py-16 text-gray-500">
          <p className="text-3xl mb-3">🔍</p>
          <p className="font-medium">Nenhum jogo encontrado para esse filtro.</p>
          <p className="text-sm mt-1">Tente ajustar os filtros acima.</p>
        </div>
      )}

      {!loading && datas.map(data => (
        <section key={data}>
          {/* cabeçalho da data */}
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-sm font-semibold text-gray-400 capitalize">{data}</h2>
            <div className="flex-1 h-px bg-copa-border" />
            <span className="text-xs text-gray-600">{grupos[data].length} jogos</span>
          </div>

          <div className="space-y-2">
            {grupos[data].map(jogo => (
              <JogoRow
                key={jogo.id}
                jogo={jogo}
                onClick={() => setJogoSelecionado(jogo)}
              />
            ))}
          </div>
        </section>
      ))}

      {/* modal de detalhes */}
      {jogoSelecionado && (
        <JogoModal
          jogo={jogoSelecionado}
          onClose={() => setJogoSelecionado(null)}
        />
      )}
    </div>
  )
}
