import { useState, useEffect, useMemo } from 'react'
import { apiFetch } from '../utils/api'
import CartaoSelecao from '../components/selecoes/CartaoSelecao'
import PerfilSelecao from '../components/selecoes/PerfilSelecao'
import TabelaElenco from '../components/selecoes/TabelaElenco'

const GRUPOS = 'ABCDEFGHIJKL'.split('')
const CONFS  = ['UEFA', 'CONMEBOL', 'CONCACAF', 'AFC', 'CAF', 'OFC']

// ── detalhe de uma seleção ──────────────────────────────────────────
function DetalheSelecao({ selecao, todas, onVoltar, onNavegar }) {
  const [jogadores, setJogadores] = useState([])
  const [jogos,     setJogos]     = useState([])
  const [loadingJ,  setLoadingJ]  = useState(true)
  const [loadingP,  setLoadingP]  = useState(true)

  useEffect(() => {
    setLoadingJ(true)
    setLoadingP(true)
    apiFetch(`/api/selecoes/${selecao.id}/jogadores`)
      .then(r => r.json())
      .then(d => { setJogadores(d); setLoadingJ(false) })
      .catch(() => setLoadingJ(false))

    apiFetch(`/api/selecoes/${selecao.id}/jogos`)
      .then(r => r.json())
      .then(d => { setJogos(d); setLoadingP(false) })
      .catch(() => setLoadingP(false))
  }, [selecao.id])

  const idx    = todas.findIndex(s => s.id === selecao.id)
  const anterior = idx > 0               ? todas[idx - 1] : null
  const proxima  = idx < todas.length - 1 ? todas[idx + 1] : null

  return (
    <div className="space-y-6 pb-16">
      {/* navegação topo */}
      <div className="flex items-center justify-between">
        <button
          onClick={onVoltar}
          className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
        >
          ← Voltar aos elencos
        </button>
        <div className="flex gap-2">
          <button
            disabled={!anterior}
            onClick={() => anterior && onNavegar(anterior)}
            className="text-xs px-3 py-1.5 rounded-lg bg-copa-card border border-copa-border
                       text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed
                       transition-colors flex items-center gap-1"
          >
            ← {anterior?.bandeira_emoji} {anterior?.nome_pt?.split(' ')[0]}
          </button>
          <button
            disabled={!proxima}
            onClick={() => proxima && onNavegar(proxima)}
            className="text-xs px-3 py-1.5 rounded-lg bg-copa-card border border-copa-border
                       text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed
                       transition-colors flex items-center gap-1"
          >
            {proxima?.bandeira_emoji} {proxima?.nome_pt?.split(' ')[0]} →
          </button>
        </div>
      </div>

      {/* perfil */}
      <PerfilSelecao
        selecao={selecao}
        jogos={jogos}
        loadingJogos={loadingP}
      />

      {/* elenco */}
      <div>
        <h3 className="font-display text-2xl tracking-widest text-white mb-4">ELENCO</h3>
        <TabelaElenco jogadores={jogadores} loading={loadingJ} />
      </div>
    </div>
  )
}

// ── grid de seleções ────────────────────────────────────────────────
function GridSelecoes({ selecoes, loading, onSelecionar }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="card animate-pulse h-28 flex flex-col items-center justify-center gap-2">
            <div className="w-10 h-10 bg-copa-border rounded-full" />
            <div className="h-3 bg-copa-border rounded w-20" />
          </div>
        ))}
      </div>
    )
  }

  if (!selecoes.length) {
    return (
      <div className="card text-center py-16 text-gray-500">
        <p className="text-3xl mb-3">🔍</p>
        <p>Nenhuma seleção encontrada para esse filtro.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {selecoes.map(s => (
        <CartaoSelecao key={s.id} selecao={s} onClick={() => onSelecionar(s)} />
      ))}
    </div>
  )
}

// ── página principal ─────────────────────────────────────────────────
export default function ElencoPage() {
  const [todas,     setTodas]     = useState([])
  const [loading,   setLoading]   = useState(true)
  const [busca,     setBusca]     = useState('')
  const [filtroGrupo, setFiltroGrupo] = useState('')
  const [filtroConf,  setFiltroConf]  = useState('')
  const [selecionada, setSelecionada] = useState(null)

  useEffect(() => {
    apiFetch('/api/selecoes')
      .then(r => r.json())
      .then(d => { setTodas(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtradas = useMemo(() => {
    const q = busca.toLowerCase().trim()
    return todas.filter(s =>
      (!q || s.nome_pt.toLowerCase().includes(q) || s.nome?.toLowerCase().includes(q)) &&
      (!filtroGrupo || s.grupo === filtroGrupo) &&
      (!filtroConf  || s.confederacao === filtroConf)
    )
  }, [todas, busca, filtroGrupo, filtroConf])

  const limparFiltros = () => {
    setBusca(''); setFiltroGrupo(''); setFiltroConf('')
  }
  const temFiltro = busca || filtroGrupo || filtroConf

  if (selecionada) {
    return (
      <DetalheSelecao
        selecao={selecionada}
        todas={filtradas.length > 0 ? filtradas : todas}
        onVoltar={() => setSelecionada(null)}
        onNavegar={setSelecionada}
      />
    )
  }

  return (
    <div className="space-y-6 pb-16">
      {/* cabeçalho */}
      <div>
        <h1 className="font-display text-4xl tracking-widest text-white">ELENCOS</h1>
        <p className="text-gray-500 text-sm mt-1">
          48 seleções &bull; clique para ver elenco e jogos na Copa
        </p>
      </div>

      {/* barra de busca e filtros */}
      <div className="sticky top-14 z-40 bg-copa-dark pt-2 pb-3 border-b border-copa-border space-y-3">
        {/* busca */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Buscar seleção..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
            className="w-full bg-copa-card border border-copa-border rounded-xl
                       pl-9 pr-4 py-2.5 text-sm text-gray-200 placeholder-gray-600
                       focus:outline-none focus:border-copa-green transition-colors"
          />
          {busca && (
            <button
              onClick={() => setBusca('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* filtros */}
        <div className="flex gap-2 flex-wrap">
          {/* grupo */}
          <select
            value={filtroGrupo}
            onChange={e => setFiltroGrupo(e.target.value)}
            className="bg-copa-card border border-copa-border text-sm text-gray-300 rounded-lg
                       px-3 py-1.5 focus:outline-none focus:border-copa-green"
          >
            <option value="">Todos os grupos</option>
            {GRUPOS.map(g => <option key={g} value={g}>Grupo {g}</option>)}
          </select>

          {/* confederação */}
          <select
            value={filtroConf}
            onChange={e => setFiltroConf(e.target.value)}
            className="bg-copa-card border border-copa-border text-sm text-gray-300 rounded-lg
                       px-3 py-1.5 focus:outline-none focus:border-copa-green"
          >
            <option value="">Todas as confederações</option>
            {CONFS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          {temFiltro && (
            <button
              onClick={limparFiltros}
              className="text-xs text-gray-500 hover:text-white px-2 py-1.5 transition-colors"
            >
              Limpar ✕
            </button>
          )}

          <span className="ml-auto text-xs text-gray-600 self-center">
            {loading ? '...' : `${filtradas.length} seleções`}
          </span>
        </div>
      </div>

      {/* grid */}
      <GridSelecoes
        selecoes={filtradas}
        loading={loading}
        onSelecionar={setSelecionada}
      />
    </div>
  )
}
