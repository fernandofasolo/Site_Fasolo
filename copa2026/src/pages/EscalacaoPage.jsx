import { useState, useEffect, useCallback } from 'react'
import { apiFetch } from '../utils/api'
import CampoFutebol from '../components/escalacao/CampoFutebol'
import ListaConvocados from '../components/escalacao/ListaConvocados'
import { FORMACOES, NOMES_FORMACAO, migrarTitulares } from '../utils/formacoes'
import useAppStore from '../store/useAppStore'

const SELECAO_BRASIL_ID = 25

// ── Banco de reservas ────────────────────────────────────────────────
function BancoReservas({ jogadores, titulares }) {
  const alocados = new Set(Object.values(titulares).map(j => j?.id).filter(Boolean))
  const reservas = (jogadores ?? []).filter(j => !alocados.has(j.id))

  if (!reservas.length) return null

  return (
    <div className="mt-4">
      <h3 className="text-xs text-gray-600 uppercase tracking-widest mb-2">
        Banco ({reservas.length})
      </h3>
      <div className="flex flex-wrap gap-2">
        {reservas.map(j => (
          <span
            key={j.id}
            className="text-xs bg-copa-card border border-copa-border rounded-lg px-2.5 py-1.5 text-gray-400"
          >
            <span className="font-mono text-gray-600 mr-1">{j.numero ?? '—'}</span>
            {j.nome_curto ?? j.nome}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Controles de formação ─────────────────────────────────────────────
function SeletorFormacao({ formacao, onChange }) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-xs text-gray-500 uppercase tracking-wider">Formação</span>
      <div className="flex gap-1 flex-wrap">
        {NOMES_FORMACAO.map(f => (
          <button
            key={f}
            onClick={() => onChange(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
              formacao === f
                ? 'bg-copa-green text-white'
                : 'bg-copa-card border border-copa-border text-gray-400 hover:text-white'
            }`}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Seção de salvar / carregar ────────────────────────────────────────
function SecaoSalvar({ titulares, formacao, escalacoes, onSalvar, onCarregar, onDeletar, saving }) {
  const [nome, setNome] = useState('Minha Escalação')

  const titularesCount = Object.values(titulares).filter(Boolean).length

  return (
    <div className="card space-y-3">
      <h3 className="text-xs text-gray-500 uppercase tracking-widest">Salvar escalação</h3>

      <div className="flex gap-2">
        <input
          type="text"
          value={nome}
          onChange={e => setNome(e.target.value)}
          maxLength={40}
          placeholder="Nome da escalação..."
          className="flex-1 bg-black/30 border border-copa-border rounded-lg px-3 py-2 text-sm
                     text-gray-200 placeholder-gray-700 focus:outline-none focus:border-copa-green"
        />
        <button
          onClick={() => onSalvar(nome)}
          disabled={saving || titularesCount < 11}
          className="btn-primary text-sm px-4 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {saving ? 'Salvando…' : 'Salvar'}
        </button>
      </div>

      {titularesCount < 11 && (
        <p className="text-xs text-gray-600">
          Preencha todos os 11 slots para salvar ({titularesCount}/11)
        </p>
      )}

      {escalacoes.length > 0 && (
        <div className="space-y-1 pt-1 border-t border-copa-border">
          <p className="text-xs text-gray-600 uppercase tracking-wider pt-2">Escalações salvas</p>
          {escalacoes.map(e => (
            <div key={e.id} className="flex items-center gap-2 py-1">
              <button
                onClick={() => onCarregar(e)}
                className="text-sm text-gray-300 hover:text-copa-yellow transition-colors flex-1 text-left truncate"
              >
                {e.nome}
                <span className="text-gray-600 text-xs ml-2 font-mono">{e.formacao}</span>
              </button>
              <button
                onClick={() => onDeletar(e.id)}
                className="text-gray-700 hover:text-red-400 text-xs px-2 transition-colors"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Página principal ─────────────────────────────────────────────────
export default function EscalacaoPage() {
  const sessionId = useAppStore(s => s.sessionId)

  const [jogadores,          setJogadores]          = useState([])
  const [loading,            setLoading]             = useState(true)
  const [formacao,           setFormacao]            = useState('4-3-3')
  const [titulares,          setTitulares]           = useState({})
  const [jogadorSelecionado, setJogadorSelecionado]  = useState(null)
  const [dragJogador,        setDragJogador]         = useState(null)
  const [dragOverSlot,       setDragOverSlot]        = useState(null)
  const [escalacoes,         setEscalacoes]          = useState([])
  const [saving,             setSaving]              = useState(false)

  const slots = FORMACOES[formacao]

  // Carregar convocados do Brasil
  useEffect(() => {
    apiFetch(`/api/selecoes/${SELECAO_BRASIL_ID}/jogadores`)
      .then(r => r.json())
      .then(d => { setJogadores(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  // Carregar escalações salvas da sessão
  useEffect(() => {
    if (!sessionId) return
    apiFetch('/api/escalacoes', { headers: { 'X-Session-Id': sessionId } })
      .then(r => r.json())
      .then(d => setEscalacoes(Array.isArray(d) ? d : []))
      .catch(() => {})
  }, [sessionId])

  // Trocar formação preservando jogadores por posição
  const handleFormacao = useCallback((novaFormacao) => {
    const slotsAntigos = FORMACOES[formacao]
    const slotsNovos   = FORMACOES[novaFormacao]
    setTitulares(prev => migrarTitulares(slotsAntigos, slotsNovos, prev))
    setFormacao(novaFormacao)
    setJogadorSelecionado(null)
  }, [formacao])

  // Colocar jogador num slot
  const alocarJogador = useCallback((slotId, jogador) => {
    setTitulares(prev => {
      const next = { ...prev }
      for (const [sid, j] of Object.entries(next)) {
        if (j?.id === jogador.id) delete next[sid]
      }
      next[slotId] = jogador
      return next
    })
    setJogadorSelecionado(null)
  }, [])

  // Remover jogador de slot
  const removerDoSlot = useCallback((slotId) => {
    setTitulares(prev => { const n = { ...prev }; delete n[slotId]; return n })
  }, [])

  // Clique num slot do campo
  const handleSlotClick = useCallback((slotId) => {
    if (jogadorSelecionado) {
      alocarJogador(slotId, jogadorSelecionado)
    } else if (titulares[slotId]) {
      removerDoSlot(slotId)
    }
  }, [jogadorSelecionado, titulares, alocarJogador, removerDoSlot])

  // Clique num jogador da lista
  const handleJogadorClick = useCallback((jogador) => {
    const alocados = new Set(Object.values(titulares).map(j => j?.id).filter(Boolean))
    if (alocados.has(jogador.id)) return
    setJogadorSelecionado(prev => prev?.id === jogador.id ? null : jogador)
  }, [titulares])

  // Drag & drop handlers
  const handleDragStart  = useCallback((jogador) => { setDragJogador(jogador); setJogadorSelecionado(null) }, [])
  const handleDragOver   = useCallback((slotId)  => { setDragOverSlot(slotId) }, [])
  const handleDrop       = useCallback((slotId)  => {
    if (dragJogador) alocarJogador(slotId, dragJogador)
    setDragJogador(null)
    setDragOverSlot(null)
  }, [dragJogador, alocarJogador])

  // Salvar escalação via API
  const handleSalvar = async (nome) => {
    const titularesArr = Object.entries(titulares)
      .filter(([, j]) => j)
      .map(([slot, j]) => ({ slot, jogador_id: j.id }))

    const alocados = new Set(Object.values(titulares).map(j => j?.id).filter(Boolean))
    const reservasArr = jogadores.filter(j => !alocados.has(j.id)).map(j => j.id)

    setSaving(true)
    try {
      const res = await apiFetch('/api/escalacoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-Id': sessionId,
        },
        body: JSON.stringify({
          nome,
          formacao,
          titulares_json: JSON.stringify(titularesArr),
          reservas_json: JSON.stringify(reservasArr),
        }),
      })
      if (res.ok) {
        const nova = await res.json()
        setEscalacoes(prev => [nova, ...prev])
      }
    } catch { /* silencioso */ }
    finally { setSaving(false) }
  }

  // Carregar escalação salva
  const handleCarregar = (escalacao) => {
    try {
      const arr = JSON.parse(escalacao.titulares_json)
      const novosTitulares = {}
      for (const { slot, jogador_id } of arr) {
        const j = jogadores.find(jj => jj.id === jogador_id)
        if (j) novosTitulares[slot] = j
      }
      setFormacao(escalacao.formacao)
      setTitulares(novosTitulares)
      setJogadorSelecionado(null)
    } catch { /* silencioso */ }
  }

  // Deletar escalação salva
  const handleDeletar = async (id) => {
    try {
      await apiFetch(`/api/escalacoes/${id}`, {
        method: 'DELETE',
        headers: { 'X-Session-Id': sessionId },
      })
      setEscalacoes(prev => prev.filter(e => e.id !== id))
    } catch { /* silencioso */ }
  }

  const handleLimpar = () => { setTitulares({}); setJogadorSelecionado(null) }

  return (
    <div className="space-y-6 pb-16">
      {/* cabeçalho */}
      <div className="flex items-end justify-between flex-wrap gap-2">
        <div>
          <h1 className="font-display text-4xl tracking-widest text-white">ESCALAÇÃO 🇧🇷</h1>
          <p className="text-gray-500 text-sm mt-1">
            Monte seu time ideal para a Copa do Mundo 2026
          </p>
        </div>
        <button
          onClick={handleLimpar}
          className="text-xs text-gray-600 hover:text-white transition-colors"
        >
          Limpar campo ✕
        </button>
      </div>

      {/* seletor de formação */}
      <SeletorFormacao formacao={formacao} onChange={handleFormacao} />

      {/* campo + lista de convocados */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 items-start">
        {/* campo */}
        <div>
          <CampoFutebol
            slots={slots}
            titulares={titulares}
            jogadorSelecionado={jogadorSelecionado}
            dragOverSlot={dragOverSlot}
            onSlotClick={handleSlotClick}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
          <BancoReservas jogadores={jogadores} titulares={titulares} />
        </div>

        {/* sidebar */}
        <div
          className="card lg:sticky lg:top-20 overflow-hidden flex flex-col"
          style={{ maxHeight: 'calc(100vh - 8rem)' }}
        >
          <ListaConvocados
            jogadores={jogadores}
            loading={loading}
            titulares={titulares}
            jogadorSelecionado={jogadorSelecionado}
            onJogadorClick={handleJogadorClick}
            onDragStart={handleDragStart}
          />
        </div>
      </div>

      {/* salvar / carregar */}
      <SecaoSalvar
        titulares={titulares}
        formacao={formacao}
        escalacoes={escalacoes}
        onSalvar={handleSalvar}
        onCarregar={handleCarregar}
        onDeletar={handleDeletar}
        saving={saving}
      />
    </div>
  )
}
