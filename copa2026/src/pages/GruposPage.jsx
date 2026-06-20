import { useState, useEffect } from 'react'
import TabelaGrupo from '../components/grupos/TabelaGrupo'
import TabelaGeral from '../components/grupos/TabelaGeral'
import PotesSection from '../components/grupos/PotesSection'
import { apiFetch } from '../utils/api'

const LETRAS = 'ABCDEFGHIJKL'.split('')
const ABAS = [
  { key: 'visao-geral',     label: 'Visão Geral' },
  { key: 'pontos-corridos', label: '★ Pontos Corridos' },
  { key: 'potes',           label: 'Potes' },
]

function Skeleton() {
  return (
    <div className="card animate-pulse p-0 overflow-hidden">
      <div className="px-4 py-3 border-b border-copa-border bg-black/20 flex gap-2">
        <div className="h-5 bg-copa-border rounded w-20" />
        <div className="h-5 bg-copa-border rounded-full w-6" />
      </div>
      <div className="p-3 space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-7 bg-copa-border/40 rounded" />
        ))}
      </div>
    </div>
  )
}

export default function GruposPage() {
  const [aba, setAba]               = useState('visao-geral')
  const [grupoAtivo, setGrupoAtivo] = useState(null)   // null = todos
  const [grupos, setGrupos]         = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)

  useEffect(() => {
    apiFetch('/api/grupos')
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(data => { setGrupos(data); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }, [])

  const dadosGrupoAtivo = grupoAtivo
    ? grupos.find(g => g.grupo === grupoAtivo)
    : null

  const handleSelecionarGrupo = (letra) => {
    setGrupoAtivo(letra)
    setAba('visao-geral')
  }

  return (
    <div className="space-y-6 pb-16">
      {/* título */}
      <div>
        <h1 className="font-display text-4xl tracking-widest text-white">GRUPOS</h1>
        <p className="text-gray-500 text-sm mt-1">12 grupos &bull; 48 seleções &bull; Fase de grupos: 11 jun – 2 jul</p>
      </div>

      {/* barra de navegação sticky */}
      <div className="sticky top-14 z-40 bg-copa-dark pt-2 pb-3 border-b border-copa-border space-y-2">
        {/* abas principais */}
        <div className="flex gap-1">
          {ABAS.map(a => (
            <button
              key={a.key}
              onClick={() => { setAba(a.key); setGrupoAtivo(null) }}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                aba === a.key && !grupoAtivo
                  ? 'bg-copa-green text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>

        {/* seletor de grupo individual */}
        {aba !== 'potes' && aba !== 'pontos-corridos' && (
          <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setGrupoAtivo(null)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                !grupoAtivo
                  ? 'bg-copa-card border border-copa-green text-copa-green'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
              }`}
            >
              Todos
            </button>
            {LETRAS.map(letra => (
              <button
                key={letra}
                onClick={() => handleSelecionarGrupo(letra)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  grupoAtivo === letra
                    ? 'bg-copa-green text-white'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                }`}
              >
                {letra}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* erro */}
      {error && (
        <div className="card text-center py-12 text-gray-500">
          <p className="text-2xl mb-2">⚠️</p>
          <p>Não foi possível carregar os grupos.</p>
        </div>
      )}

      {/* ── PONTOS CORRIDOS ── */}
      {aba === 'pontos-corridos' && !error && (
        loading
          ? <Skeleton />
          : <TabelaGeral grupos={grupos} />
      )}

      {/* ── POTES ── */}
      {aba === 'potes' && !error && (
        <PotesSection />
      )}

      {/* ── VISÃO GERAL — TODOS OS GRUPOS ── */}
      {aba === 'visao-geral' && !grupoAtivo && !error && (
        <>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {Array.from({ length: 12 }).map((_, i) => <Skeleton key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {grupos.map(g => (
                <div
                  key={g.grupo}
                  className="cursor-pointer"
                  onClick={() => handleSelecionarGrupo(g.grupo)}
                >
                  <TabelaGrupo dados={g} compact />
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ── DETALHE DE UM GRUPO ── */}
      {aba === 'visao-geral' && grupoAtivo && !error && (
        <>
          {loading ? (
            <Skeleton />
          ) : dadosGrupoAtivo ? (
            <div className="max-w-2xl">
              <TabelaGrupo dados={dadosGrupoAtivo} compact={false} />
            </div>
          ) : (
            <p className="text-gray-500">Grupo não encontrado.</p>
          )}
        </>
      )}
    </div>
  )
}
