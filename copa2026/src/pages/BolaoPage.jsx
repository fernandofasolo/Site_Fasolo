import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { apiFetch } from '../utils/api'
import SimuladorGrupos from '../components/bolao/SimuladorGrupos'
import RodadaElim from '../components/bolao/RodadaElim'
import useAppStore from '../store/useAppStore'
import { computarTodosGrupos, extrairClassificados } from '../utils/classificacao'
import { buildBracket } from '../utils/chaveamento'
import Bandeira from '../components/ui/Bandeira'

const ABAS = ['Grupos', 'Oitavas', 'Quartas', 'Semis', 'Final']

// ── Gestão de bolões ──────────────────────────────────────────────────
function SeletorBolao({ boloes, bolaoAtivo, onSelecionar, onCreate, onDeletar }) {
  const [novoNome, setNovoNome] = useState('')
  const [criando, setCriando] = useState(false)

  const handleCriar = async () => {
    if (!novoNome.trim()) return
    await onCreate(novoNome.trim())
    setNovoNome('')
    setCriando(false)
  }

  return (
    <div className="card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs text-gray-500 uppercase tracking-widest">Meus Bolões</h3>
        <button
          onClick={() => setCriando(v => !v)}
          className="text-xs text-copa-green hover:text-white transition-colors"
        >
          + Novo
        </button>
      </div>

      {criando && (
        <div className="flex gap-2">
          <input
            autoFocus
            type="text"
            value={novoNome}
            onChange={e => setNovoNome(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleCriar()}
            placeholder="Nome do bolão..."
            maxLength={40}
            className="flex-1 bg-black/30 border border-copa-border rounded-lg px-3 py-1.5 text-sm
                       text-gray-200 placeholder-gray-700 focus:outline-none focus:border-copa-green"
          />
          <button onClick={handleCriar} className="btn-primary text-xs px-3">Criar</button>
        </div>
      )}

      <div className="space-y-1">
        {boloes.map(b => (
          <div key={b.id} className="flex items-center gap-2">
            <button
              onClick={() => onSelecionar(b)}
              className={`flex-1 text-left text-sm py-1 px-2 rounded-lg transition-colors ${
                bolaoAtivo?.id === b.id
                  ? 'bg-copa-green/20 text-copa-green font-medium'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {b.nome}
            </button>
            <button
              onClick={() => onDeletar(b.id)}
              className="text-gray-700 hover:text-red-400 text-xs px-1.5 transition-colors"
            >
              ✕
            </button>
          </div>
        ))}
        {!boloes.length && (
          <p className="text-xs text-gray-700 text-center py-2">
            Nenhum bolão criado ainda
          </p>
        )}
      </div>
    </div>
  )
}

// ── Barra de progresso ─────────────────────────────────────────────────
function ProgressoBolao({ totalJogos, preenchidos }) {
  const pct = totalJogos > 0 ? Math.round((preenchidos / totalJogos) * 100) : 0
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 bg-copa-border rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full bg-copa-green transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-gray-500 shrink-0">
        {preenchidos}/{totalJogos} palpites
      </span>
    </div>
  )
}

// ── Campeão ────────────────────────────────────────────────────────────
function CartaoCampeao({ time }) {
  if (!time) return (
    <div className="card text-center py-16 text-gray-600">
      <p className="text-4xl mb-3">🏆</p>
      <p>Defina o campeão simulando todas as fases</p>
    </div>
  )
  return (
    <div className="card text-center py-12"
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #1a3a00 0%, #0A0A0A 70%)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-copa-yellow via-copa-gold to-copa-yellow" />
      <div className="mb-4"><Bandeira iso={time.codigo_iso} className="h-20 w-auto mx-auto" /></div>
      <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Campeão do Mundo</p>
      <h2 className="font-display text-5xl tracking-widest text-copa-yellow">
        {time.nome_pt.toUpperCase()}
      </h2>
      <p className="text-copa-gold text-2xl mt-3">🏆</p>
    </div>
  )
}

// ── Página principal ─────────────────────────────────────────────────
export default function BolaoPage() {
  const sessionId = useAppStore(s => s.sessionId)

  const [aba,            setAba]            = useState('Grupos')
  const [boloes,         setBoloes]         = useState([])
  const [bolaoAtivo,     setBolaoAtivo]     = useState(null)
  const [jogosGrupo,     setJogosGrupo]     = useState([])
  const [selecoes,       setSelecoes]       = useState([])
  const [palpites,       setPalpites]       = useState({})     // jogo_id → {gols_a, gols_b}
  const [knockoutDec,    setKnockoutDec]    = useState({})     // matchId → selecao_id
  const [loadingJogos,   setLoadingJogos]   = useState(true)
  const [salvando,       setSalvando]       = useState(false)
  const debounceRef = useRef({})

  // Carregar jogos e seleções uma vez
  useEffect(() => {
    Promise.all([
      apiFetch('/api/jogos?fase=grupo&per_page=100').then(r => r.json()),
      apiFetch('/api/selecoes').then(r => r.json()),
    ]).then(([jogos, sels]) => {
      setJogosGrupo(Array.isArray(jogos) ? jogos : [])
      setSelecoes(sels)
      setLoadingJogos(false)
    }).catch(() => setLoadingJogos(false))
  }, [])

  // Carregar bolões da sessão
  useEffect(() => {
    if (!sessionId) return
    apiFetch('/api/boloes', { headers: { 'X-Session-Id': sessionId } })
      .then(r => r.json())
      .then(d => {
        const lista = Array.isArray(d) ? d : []
        setBoloes(lista)
        if (lista.length && !bolaoAtivo) setBolaoAtivo(lista[0])
      })
      .catch(() => {})
  }, [sessionId])

  // Carregar palpites do bolão ativo
  useEffect(() => {
    if (!bolaoAtivo) return
    apiFetch(`/api/boloes/${bolaoAtivo.id}/palpites`)
      .then(r => r.json())
      .then(rows => {
        const map = {}
        for (const p of rows) map[p.jogo_id] = { gols_a: p.gols_a, gols_b: p.gols_b }
        setPalpites(map)
      })
      .catch(() => {})

    // Carregar decisões knockout do localStorage
    const raw = localStorage.getItem(`knockout_${bolaoAtivo.id}`)
    setKnockoutDec(raw ? JSON.parse(raw) : {})
  }, [bolaoAtivo?.id])

  // Criar bolão
  const handleCriarBolao = async (nome) => {
    const res = await apiFetch('/api/boloes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Session-Id': sessionId },
      body: JSON.stringify({ nome }),
    })
    if (res.ok) {
      const novo = await res.json()
      setBoloes(prev => [novo, ...prev])
      setBolaoAtivo(novo)
      setPalpites({})
      setKnockoutDec({})
    }
  }

  // Deletar bolão
  const handleDeletarBolao = async (id) => {
    await apiFetch(`/api/boloes/${id}`, {
      method: 'DELETE',
      headers: { 'X-Session-Id': sessionId },
    })
    setBoloes(prev => prev.filter(b => b.id !== id))
    if (bolaoAtivo?.id === id) {
      const restante = boloes.find(b => b.id !== id)
      setBolaoAtivo(restante ?? null)
      setPalpites({})
      setKnockoutDec({})
    }
  }

  // Salvar palpite individual (com debounce por jogo)
  const handleMudarPalpite = useCallback((jogoId, gols_a, gols_b) => {
    setPalpites(prev => ({ ...prev, [jogoId]: { gols_a, gols_b } }))

    if (!bolaoAtivo) return

    clearTimeout(debounceRef.current[jogoId])
    debounceRef.current[jogoId] = setTimeout(async () => {
      setSalvando(true)
      try {
        await apiFetch(`/api/boloes/${bolaoAtivo.id}/palpites`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jogo_id: jogoId, gols_a, gols_b }),
        })
      } catch { /* silencioso */ }
      finally { setSalvando(false) }
    }, 800)
  }, [bolaoAtivo])

  // Decisão knockout (localStorage)
  const handleKnockoutVencedor = useCallback((matchId, selecaoId) => {
    setKnockoutDec(prev => {
      const next = { ...prev }
      if (selecaoId === null) delete next[matchId]
      else next[matchId] = selecaoId
      if (bolaoAtivo) {
        localStorage.setItem(`knockout_${bolaoAtivo.id}`, JSON.stringify(next))
      }
      return next
    })
  }, [bolaoAtivo])

  // Classificação em tempo real
  const grupos = useMemo(
    () => computarTodosGrupos(jogosGrupo, selecoes, palpites),
    [jogosGrupo, selecoes, palpites],
  )

  const classificados = useMemo(() => extrairClassificados(grupos), [grupos])

  const bracket = useMemo(
    () => buildBracket(classificados, knockoutDec),
    [classificados, knockoutDec],
  )

  const preenchidos = Object.keys(palpites).length
  const totalJogos  = jogosGrupo.length

  const semBolao = !bolaoAtivo && !boloes.length

  return (
    <div className="space-y-6 pb-16">
      {/* cabeçalho */}
      <div>
        <h1 className="font-display text-4xl tracking-widest text-white">BOLÃO</h1>
        <p className="text-gray-500 text-sm mt-1">
          Simule a Copa, escolha o campeão e salve seus palpites
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-6 items-start">
        {/* conteúdo principal */}
        <div className="space-y-5">
          {/* barra de progresso */}
          {bolaoAtivo && (
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500 shrink-0">{bolaoAtivo.nome}</span>
              <ProgressoBolao totalJogos={totalJogos} preenchidos={preenchidos} />
              <span className={`text-[10px] shrink-0 transition-opacity ${salvando ? 'opacity-100 text-copa-yellow' : 'opacity-0'}`}>
                Salvando…
              </span>
            </div>
          )}

          {/* aviso sem bolão */}
          {semBolao && !loadingJogos && (
            <div className="card text-center py-10 text-gray-600">
              <p className="text-3xl mb-3">🎯</p>
              <p className="mb-4">Crie um bolão para começar a simular</p>
              <button
                onClick={() => handleCriarBolao('Meu Bolão')}
                className="btn-primary"
              >
                Criar meu bolão
              </button>
            </div>
          )}

          {/* abas de fase */}
          {(bolaoAtivo || boloes.length > 0) && (
            <>
              <div className="flex gap-1 border-b border-copa-border overflow-x-auto">
                {ABAS.map(a => (
                  <button
                    key={a}
                    onClick={() => setAba(a)}
                    className={`px-4 py-2.5 text-sm font-medium transition-colors whitespace-nowrap border-b-2 -mb-px ${
                      aba === a
                        ? 'border-copa-green text-white'
                        : 'border-transparent text-gray-500 hover:text-white'
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>

              {/* conteúdo da aba */}
              {loadingJogos ? (
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-14 bg-copa-border/30 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : (
                <>
                  {aba === 'Grupos' && (
                    <SimuladorGrupos
                      jogosGrupo={jogosGrupo}
                      selecoes={selecoes}
                      palpites={palpites}
                      onMudar={handleMudarPalpite}
                    />
                  )}
                  {aba === 'Oitavas' && (
                    <RodadaElim
                      jogos={bracket.oitavas}
                      onVencedor={handleKnockoutVencedor}
                      colunas={4}
                    />
                  )}
                  {aba === 'Quartas' && (
                    <RodadaElim
                      jogos={bracket.quartas}
                      onVencedor={handleKnockoutVencedor}
                      colunas={2}
                    />
                  )}
                  {aba === 'Semis' && (
                    <div className="space-y-6">
                      <div>
                        <p className="text-xs text-gray-600 uppercase tracking-widest mb-3">Semi-Final</p>
                        <RodadaElim
                          jogos={bracket.semis}
                          onVencedor={handleKnockoutVencedor}
                          colunas={2}
                        />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 uppercase tracking-widest mb-3">Meia-Final</p>
                        <RodadaElim
                          jogos={bracket.meias_finais}
                          onVencedor={handleKnockoutVencedor}
                          colunas={2}
                        />
                      </div>
                    </div>
                  )}
                  {aba === 'Final' && (
                    <div className="space-y-6">
                      <CartaoCampeao time={bracket.final.vencedor} />
                      <div>
                        <p className="text-xs text-gray-600 uppercase tracking-widest mb-3">Disputa de 3° Lugar</p>
                        <RodadaElim
                          jogos={[bracket.terceiro]}
                          onVencedor={handleKnockoutVencedor}
                          colunas={1}
                        />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 uppercase tracking-widest mb-3">Final</p>
                        <RodadaElim
                          jogos={[bracket.final]}
                          onVencedor={handleKnockoutVencedor}
                          colunas={1}
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>

        {/* sidebar: gestão de bolões */}
        <div className="lg:sticky lg:top-20 space-y-4">
          <SeletorBolao
            boloes={boloes}
            bolaoAtivo={bolaoAtivo}
            onSelecionar={b => { setBolaoAtivo(b); setPalpites({}); setKnockoutDec({}) }}
            onCreate={handleCriarBolao}
            onDeletar={handleDeletarBolao}
          />

          {/* resumo do chaveamento */}
          {bracket.final.vencedor && (
            <div className="card text-center py-4">
              <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-1">
                Seu Campeão
              </p>
              <Bandeira iso={bracket.final.vencedor.codigo_iso} className="h-8 w-auto mx-auto" />
              <p className="text-sm text-copa-yellow font-medium mt-1">
                {bracket.final.vencedor.nome_pt}
              </p>
            </div>
          )}

          {/* dica */}
          <div className="text-[11px] text-gray-700 leading-relaxed">
            <p><span className="text-gray-500">Grupos →</span> Preencha os 72 placares da fase de grupos.</p>
            <p className="mt-1"><span className="text-gray-500">Oitavas em diante →</span> Clique numa seleção para indicar o vencedor.</p>
            <p className="mt-1">Os palpites são salvos automaticamente.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
